<script>
	import Home from '../Home.svelte'
	import { page } from '../stores.js'
	import Header from '../Header.svelte'
	import { browser } from '$app/env'

	let pageValue;
	page.subscribe(value => {
		pageValue = value;
	})

	page.set({component: Home, prettyName: "Home"});

</script>

<Header> 
	<span slot="currentPage">{pageValue.prettyName}</span>
</Header> 
<svelte:component this={pageValue.component}/>