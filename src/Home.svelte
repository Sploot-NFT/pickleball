<script>
    import GameResult from "./GameResult.svelte";
    const handle = localStorage.getItem("twitter_handle");
</script>

<h1 style="text-align: center">Latest Results</h1>
<GameResult {handle} actionToParse="#SLAP12 2075-S1+5568:2376-S2+2106:6870-S2+2106:7332-S1+5568"/>

<h1 style="text-align: center">Upcoming Team</h1>