<script>
    import { selected_position_store } from './stores.js';

    const rows_to_load = 5; // Number of rows to load upon initial table draw.

        // Generate a list of ids to be shown in browser (1-10,000 for now, no filtering yet)
        var selected_characters = [];
    const row_length = 4;
    for (let i=0;i<10000/row_length;i++) {
        let row = [];
        for (let j=0;j<row_length;j++) {
            row.push(i*row_length+j);
        }
        selected_characters.push(row);
    }
    let initial_characters = selected_characters;

    var current_filters = {
        name: "",
        role: "",
    }

    var characters = [];
    fetch("/character_index.json").then((result) => {
        result.json().then((data) => {
            characters = data;
            console.log(characters)
            selected_position_store.subscribe(value => {
                selected_position = value;
                console.log("CHANGED")
                if (!selected_position) { // Not defined yet
                    return
                }

                let role = "";
                if (selected_position.includes("fan")) {
                    role = "fan";
                } else if (selected_position.includes("player")) {
                    role = "player";
                } else if (selected_position.includes("staff")) {
                    role = "staff";
                }

                current_filters = {
                    name: "",
                    role: role,
                }
                    console.log(characters);
                    let cards = filterCards(characters, current_filters);
                    console.log("filtered")
                    console.log(cards);
                    redrawTable(cards);
            })
        });
    });

    var selected_position;

    let row_num = rows_to_load; // Furthest row number downloaded
    function streamTable() { // Add to table as user scrolls (avoids loading all images at once)
        console.log("STREAMED")
        if (row_num >= selected_characters.length/row_length) {
            return;
        }
        let table = document.getElementById("card-browser-table");
        let row = table.rows[table.rows.length-1];
        let clone = row.cloneNode(true);
        console.log(selected_characters)
        for (let i=0;i<row_length;i++) {
            let cell = clone.cells[i];
            let div = cell.childNodes[0];
            let img = div.childNodes[0];
            //cell.innerHTML = `<img style="width:12vw" src="/cards/${selected_characters[row_num][i]}.png" onclick="">`;
            div.id = `${selected_characters[row_num][i]}-div`;
            img.id = `${selected_characters[row_num][i]}`;
            img.src = `/cards/${selected_characters[row_num][i]}.png`;
        }
        table.appendChild(clone);
        row_num++;
    }

    function filterCards(to_filter, filters) {
        let filtered_characters = [];
        for (let i=0;i<to_filter.length;i++) {
            let character = to_filter[i];
            let valid = true;
            for (let key in filters) {
                if (filters[key] != "") {
                    if (!character[key].toLowerCase().includes(filters[key].toLowerCase())) {
                        valid = false;
                    }
                }
            }
            if (valid) {
                filtered_characters.push(character.id);
            }
        }
        return filtered_characters;
    }

    function redrawTable(cards) { // cards is a list of IDs
        /*
        let furthest_index = 0;
        let table = document.getElementById('card-browser-table');
        for (let i=0;i<Math.min(cards.length, rows_to_load*row_length);i++) {
            furthest_index++;
            let row = Math.floor(i/row_length);
            let col = i%row_length;
            let cell = table.rows[row].cells[col];
            let div = cell.childNodes[0];
            let img = div.childNodes[0];

            div.id = `${cards[i]}-div`;
            img.id = `${cards[i]}`;
            img.src = `/cards/${cards[i]}.png`;
            console.log(Math.min(cards.length, rows_to_load*row_length))
        }
        let rows_to_remove = table.rows.length - Math.floor(furthest_index/row_length);
        let cells_to_remove = row_length - furthest_index%row_length;

        for (let i=0; i<rows_to_remove; i++) {
            table.deleteRow(-1);
        }
        console.log(cells_to_remove);
        console.log(table.rows[table.rows.length-1].cells.length);
        for (let i=0; i<cells_to_remove; i++) {
            table.rows[table.rows.length-1].deleteCell(-1);
        }
        if (table.rows[table.rows.length-1].cells.length == 0) {
            table.deleteRow(-1);
        }
        */

        row_num = 0;
        selected_characters = [];
        for (let i=0;i<cards.length/row_length;i++) {
            let row = [];
            for (let j=0;j<row_length;j++) {
                row.push(cards[i*row_length+j]);
            }
            selected_characters.push(row);
        }

        let table = document.getElementById('card-browser-table');
        while (table.childNodes.length > 1) {
            table.removeChild(table.childNodes[0]);
        }

        for (let i=0; i<rows_to_load; i++) {
            streamTable();
        }

        table.deleteRow(0);
    }

    function onCardClick(event) {
        console.log(selected_position);
        let card = document.getElementById(selected_position);
        card.src = event.target.src;
        localStorage.setItem(selected_position, event.target.id);
    }
</script>

<h2 style="text-align:center; margin-bottom:-1vh; margin-top:-0.5vh">Roster</h2>
<div class="card-browser" >
    <div id="card-browser-scroller" style="overflow-y:scroll; height:80.5vh;" on:scroll={streamTable}>
        <table id="card-browser-table" style="table-layout: fixed">
            {#each initial_characters.slice(0,row_num*row_length) as row}
                <tr>
                    {#each row as character}
                        <td>
                            <div id="{character}-div" style="cursor:move;position:relative;left:0">
                                <img id="{character}" on:click={onCardClick} style="width:12vw;" src="/cards/{character}.png" /> 
                            </div>
                        </td>
                    {/each}
                </tr>
            {/each}        
        </table>
    </div>
</div>

<style>
    .card-browser {
        height:79vh;
        width:50vw;
        overflow-x:hidden;
        overflow-y:hidden;
        padding-left:1.5vw;
        padding-right:1.5vw;
        padding-bottom:1.5vw;
        border-style:solid;
        position:relative;
        top:1vh;
        float: left;
        background-color: black;
    }
</style>