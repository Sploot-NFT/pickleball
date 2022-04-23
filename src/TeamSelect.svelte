<script>
    import { onMount } from 'svelte';
    import { selected_position_store } from './stores.js';

    var selected_position;
	selected_position_store.subscribe(value => {
		selected_position = value;
	})

    selected_position_store.set("character-fan-1"); // Set default selected card

    function highlightSelectedCard(card_id) {
        let card = document.getElementById(card_id);
        card.style.border = "3px solid #0000ff";
    }

    function unhighlightSelectedCard(card_id) {
        let card = document.getElementById(card_id);
        card.style.border = "3px solid #ffffff";
    }

    function onPositionClick(event) {
        unhighlightSelectedCard(selected_position);
        selected_position_store.set(event.target.id);
        highlightSelectedCard(selected_position);
    }

    onMount(() => { // Highlight default card on load
        highlightSelectedCard(selected_position);
        ["character-fan-1", "character-fan-2", "character-fan-3", "character-player-1", "character-player-2", "character-staff-1"].forEach((element) => {
            var character = document.getElementById(element);
            if (element in localStorage) {
                character.src = `/cards/${localStorage.getItem(element)}.png`;
            }
        })
    })

</script>

<h2 style="text-align:center;margin-bottom:-1vh;margin-top:-0.5vh">Team Selection</h2>
<div class="team-select">
    <div style="width:39vw;margin:auto">
        <h3 style="text-align: center; margin-top:1vh; margin-bottom:-0vh">Fans</h3>
        <div style="border:dotted; padding:0.5vh">
            <table id="team-selection">
                <tr id="fans">
                    <td>
                        <img on:click={onPositionClick} id="character-fan-1" src="/cards/blank.png" class="position-card" />
                    </td>
                    <td>
                        <img on:click={onPositionClick} id="character-fan-2" src="/cards/blank.png" class="position-card" />
                    </td>
                    <td>
                        <img on:click={onPositionClick} id="character-fan-3" src="/cards/blank.png" class="position-card" />
                    </td>
                </tr>
    
            </table>
        </div>

        <div style="overflow:hidden;position:relative;left:-1.5vh;width:41vw">
            <div>
                <table>
                    <tr>
                        <td>
                            <h3 style="text-align:center; margin-top:1vh; margin-bottom:-0vh">Staff</h3>
                            <div style="border: dotted; padding:1vh; overflow:hidden">
                                <img on:click={onPositionClick} id="character-staff-1" src="/cards/blank.png" class="position-card" />
                            </div>
                        </td>
                        <td>
                            <h3 style="text-align:center; margin-top:1vh; margin-bottom:-0vh">Players</h3>
                            <div style="border:dotted;padding:0.7vh;overflow:hidden">
                                <table>
                                    <tr id="players">
                                        <td>
                                            <img on:click={onPositionClick} id="character-player-1" src="/cards/blank.png" class="position-card" />
                                        </td>
                                        <td>
                                            <img on:click={onPositionClick} id="character-player-2" src="/cards/blank.png" class="position-card" />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

</div>

<style>
    .team-select {
        height:79vh;
        width:38.6vw;
        overflow-x:hidden;
        overflow-y:hidden;
        padding-left:1.5vw;
        padding-right:1.5vw;
        padding-bottom:1.5vw;
        margin-right: 1.5vw;
        border-style:solid;
        position:relative;
        top:1vh;
        float: right;
    }
    .position-card {
        width: 12vw;
        border: 3px solid #ffffff;
    }
</style>