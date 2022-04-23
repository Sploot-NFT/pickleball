<script>
    // External dependencies
    import { page } from './stores.js'

    let address = "";

    let twitter_token = "";
    if (localStorage.getItem("twitter_token")) {
        twitter_token = localStorage.getItem("twitter_token");
    }

    let twitter_handle = "";
    if (localStorage.getItem("twitter_handle")) {
        twitter_handle = localStorage.getItem("twitter_handle");
    }

    let ens_name = "";
    if (localStorage.getItem("ens_name")) {
        ens_name = localStorage.getItem("ens_name");
    }

    let pageValue;
    page.subscribe(value => {
        pageValue = value;
    })

    import Team from './Team.svelte';
    import History from './History.svelte';
    import Home from './Home.svelte';
    import { onMount } from 'svelte';

    import config from './config.json';



    function generateRandomString(length){
        let result = "", seeds

        for(let i = 0; i < length - 1; i++){
            seeds = [
                Math.floor(Math.random() * 10) + 48,
                Math.floor(Math.random() * 25) + 65,
                Math.floor(Math.random() * 25) + 97
            ]
            
            result += String.fromCharCode(seeds[Math.floor(Math.random() * 3)])
        }

        return result
    }


    function base64_urlencode(str) {
        return (window.btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, ''));
    }

    function hash(string) {
        const utf8 = new TextEncoder().encode(string);
        return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray
                .map((bytes) => bytes.toString(16).padStart(2, '0'))
                .join('');
            return hashHex;
        });
    }

    function switchPage(component, prettyName) {
        page.set({component, prettyName});
    }

    function connectWallet() {
        ethereum.request({
            method: "wallet_requestPermissions",
            params: [{
                eth_accounts: {}
            }]
        }).then(() => ethereum.request({
            method: 'eth_requestAccounts'
        }).then(response => {
            address = response[0]
            fetch(`${config.hosted_url}/api/ens/reverse_lookup/${address}`).then(response => response.json()).then(json => {
                localStorage.setItem("ens_name", json.ensName);
                ens_name = json.ensName;
            });

        }))

    }
    
    function reconnectWallet() {
        ethereum.request({
            method: 'eth_requestAccounts'
        }).then(response => address = response[0])
    }

    function disconnectWallet() {
        address = "";
    }

    function disconnectTwitter() {
        // TODO - Actually revoke token
        twitter_token = "";
        localStorage.setItem("twitter_token", "");
    }

    async function handleTwitterRedirect() { // Call when user has been redirected after Twitter oauth
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        }); 

        if (params.state != localStorage.getItem("twitter_state")) {
            console.log("Twitter state mismatch");
            alert("CSRF detected when handling Twitter redirect");
            return;
        }

        const response = await fetch(config.hosted_url + "/api/twitter/get_auth_token/" + localStorage.getItem("twitter_pkce") + "/" + params.code);
        const json = await response.json();

        return json;
    }

    const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        }); 

    if (params.state) { // If there is a state parameter, it means that the user has been redirected after Twitter oauth
        handleTwitterRedirect().then(response => {
            twitter_token = response.access_token;
            localStorage.setItem("twitter_token", response.access_token);
            localStorage.setItem("twitter_refresh_token", response.refresh_token);
            localStorage.setItem("twitter_token_expiry", Date.now() + response.expires_in*1000);

            fetch(`${config.hosted_url}/api/twitter/get_handle/${response.access_token}`).then(response => response.json()).then(json => {
                localStorage.setItem("twitter_handle", json.data.username);
                twitter_handle = json.data.username;
                console.log(json);
            });

            window.location.href = "/";
        });
    }

    function connectTwitter() {
        const state = generateRandomString(20).toLowerCase();
        localStorage.setItem("twitter_state", state);

        const code_verifier = generateRandomString(50).toLowerCase();
        hash(code_verifier).then(response => {
            localStorage.setItem("twitter_pkce", code_verifier);

            const code_challenge = base64_urlencode(response);
            localStorage.setItem("code_challenge", code_challenge);   
            let url = "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=" + config.twitter_client_id + "&redirect_uri=" + config.hosted_url + "&scope=tweet.read%20tweet.write%20offline.access%20users.read&state=" + state + "&code_challenge=" + code_verifier + "&code_challenge_method=plain"; // Need to figure out why S256 didn't work
            window.location.href = url;
        });
    }

    onMount(() => {
        ethereum.request({
            method: 'eth_accounts'
        }).then(response => {
            if (response.length != 0 ) {
                reconnectWallet();
            }
        });
    })
</script>


<div class="header">
    <h1 style="text-align: center">Pickleball</h1>

    {#if (address != "" && ens_name != "") }
        <button on:click={disconnectWallet} class="integration-button" style="top:3vw">Disconnect {ens_name}</button>
    {:else if (address != "")}
        <button on:click={disconnectWallet} class="integration-button" style="top:3vw">Disconnect {address}</button>
    {:else}
        <button on:click={connectWallet} class="integration-button" style="top:3vw">Connect Wallet</button>
    {/if}

    {#if (twitter_token != "") }
        <button on:click={disconnectTwitter} class="integration-button" style="top:5vw">Disconnect @{twitter_handle}</button>
    {:else}
        <button on:click={connectTwitter} class="integration-button" style="top:5vw">Connect Twitter</button>
    {/if}
    

    <h2 style="text-align: center"><slot name="currentPage"></slot></h2>

    <b>
        <a class="page-link"
            on:click={() => switchPage(Team, "My Team")}>
            My Team
        </a>

        <a class="page-link"
            on:click={() => switchPage(Home, "Home")}>
            Home
        </a>

        <a class="page-link"
            on:click={() => switchPage(History, "My History")}>
            My History
        </a>
    </b>


</div>

<style>
    .header {
        text-align:center;
        background: rgba(255, 255, 255, 0.05);
        overflow:hidden;
    }

    .page-link {
        padding: 1%;
        text-align: center;
    }

    .page-link:hover {
        text-decoration: underline;
    }

    .integration-button {
        position: absolute;
        right:3vw;
        width: 20vw;
        height: 1.8vw;
    }
</style>