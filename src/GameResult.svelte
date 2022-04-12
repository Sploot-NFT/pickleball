<script>
    export let actionToParse = "null";
    export let handle = "null";
    let score = 0;  

    let game,actions = actionToParse.split(" ");
    let supportsToParse = actions.toString().split(":");

    let athletes = [];

    for (athletes in supportsToParse) {

    }

</script>

<h2 style="text-align: center">{handle}'s Score</h2>
<p style="text-align: center"><strong>{score}</strong></p>