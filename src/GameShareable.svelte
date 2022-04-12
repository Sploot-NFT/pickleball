<script>
      import queryString from "query-string";

        export let location;

        let queryParams;
        $: queryParams = queryString.parse(location.search);
</script>

<p>{queryParams}</p>

