import { n as noop, a as safe_not_equal, c as create_ssr_component, e as escape } from "./index-1e0b989c.js";
import { c as config } from "./config-1c7ca0cd.js";
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
const page = writable();
const selected_position_store = writable();
var CardBrowser_svelte_svelte_type_style_lang = "";
var TeamSelect_svelte_svelte_type_style_lang = "";
var Header_svelte_svelte_type_style_lang = "";
const css = {
  code: ".header.svelte-10dp8tc{text-align:center;background:#eee;overflow:hidden}.page-link.svelte-10dp8tc{padding:1%;text-align:center}.page-link.svelte-10dp8tc:hover{text-decoration:underline}.integration-button.svelte-10dp8tc{position:absolute;right:3vw;width:20vw;height:1.8vw}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let twitter_token = "";
  if (localStorage.getItem("twitter_token")) {
    twitter_token = localStorage.getItem("twitter_token");
  }
  let twitter_handle = "";
  if (localStorage.getItem("twitter_handle")) {
    twitter_handle = localStorage.getItem("twitter_handle");
  }
  if (localStorage.getItem("ens_name")) {
    localStorage.getItem("ens_name");
  }
  page.subscribe((value) => {
  });
  async function handleTwitterRedirect() {
    const params2 = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop)
    });
    if (params2.state != localStorage.getItem("twitter_state")) {
      console.log("Twitter state mismatch");
      alert("CSRF detected when handling Twitter redirect");
      return;
    }
    const response = await fetch(config.hosted_url + "/api/twitter/get_auth_token/" + localStorage.getItem("twitter_pkce") + "/" + params2.code);
    const json = await response.json();
    return json;
  }
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  });
  if (params.state) {
    handleTwitterRedirect().then((response) => {
      twitter_token = response.access_token;
      localStorage.setItem("twitter_token", response.access_token);
      localStorage.setItem("twitter_refresh_token", response.refresh_token);
      localStorage.setItem("twitter_token_expiry", Date.now() + response.expires_in * 1e3);
      fetch(`${config.hosted_url}/api/twitter/get_handle/${response.access_token}`).then((response2) => response2.json()).then((json) => {
        localStorage.setItem("twitter_handle", json.data.username);
        twitter_handle = json.data.username;
        console.log(json);
      });
      window.location.href = "/";
    });
  }
  $$result.css.add(css);
  return `<div class="${"header svelte-10dp8tc"}"><h1 style="${"text-align: center"}">Pickleball</h1>

    ${`${`<button class="${"integration-button svelte-10dp8tc"}" style="${"top:3vw"}">Connect Wallet</button>`}`}

    ${twitter_token != "" ? `<button class="${"integration-button svelte-10dp8tc"}" style="${"top:5vw"}">Disconnect @${escape(twitter_handle)}</button>` : `<button class="${"integration-button svelte-10dp8tc"}" style="${"top:5vw"}">Connect Twitter</button>`}
    

    <h2 style="${"text-align: center"}">${slots.currentPage ? slots.currentPage({}) : ``}</h2>

    <b><a class="${"page-link svelte-10dp8tc"}">My Team
        </a>

        <a class="${"page-link svelte-10dp8tc"}">Home
        </a>

        <a class="${"page-link svelte-10dp8tc"}">My History
        </a></b>


</div>`;
});
export { Header as H, page as p, selected_position_store as s };
