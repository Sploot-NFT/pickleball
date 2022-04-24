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
        personality : "",
        vice: "",
        phobia: "",
    }

    var current_sort = "";

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
                    name: current_filters.name,
                    role: role,
                    vice: "",
                    phobia: current_filters.phobia,
                }

                let role_filter = document.getElementById("filter-role");
                role_filter.value = role;

                console.log(characters);
                let cards = filterCards(characters, current_filters);
                cards = sortCards(cards, current_sort);
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
        let clone = row.cloneNode(true, true);
        console.log(selected_characters)
        clone.style.display = "table-row";
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

    function sortCards(to_sort, sort) {
        if (sort == "") {
            return to_sort;
        } else {
            to_sort = to_sort.sort((a,b) => {
                let a_card = characters[a];
                let b_card = characters[b];

                return b_card[sort] - a_card[sort];
            });
            return to_sort;
        }
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

    function filterHandler(event) {
        let filter = event.target.id.replace("filter-", "");
        current_filters[filter] = event.target.value;
        let cards = filterCards(characters, current_filters);
        cards = sortCards(cards, current_sort);
        redrawTable(cards);
    }

    function sortHandler(event) {
        let sort = event.target.value;
        current_sort = sort;
        let cards = filterCards(characters, current_filters);
        cards = sortCards(cards, current_sort);
        redrawTable(cards);
    }

    function redrawTable(cards) { // cards is a list of IDs
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

        table.rows[0].style.display = "none"; // Need to keep one row to be cloned later.
    }

    function onCardClick(event) {
        let card = document.getElementById(selected_position);
        if (!characters[event.target.id].role.includes(selected_position.split("-")[1])) {
            return;
        }
        card.src = event.target.src;
        localStorage.setItem(selected_position, event.target.id);
    }
</script>

<h2 style="text-align:center; margin-bottom:-1vh; margin-top:-0.5vh">Roster</h2>
<div class="card-browser" >
    <div style="background-color: #121212; padding:0vh; margin:1vh; border-radius: 1vh; border-color: rgba(255,255,255,0.05)">
        <div style="background-color: rgba(255, 255, 255, 0.05); border-radius: 1vh; padding:1vh">
            <table>
                <td>
                    <input class="input-box" type="text" id="filter-name" on:keyup={filterHandler} placeholder="Name">
                </td>
                <td>
                    <select name="Role" id="filter-role" on:change={filterHandler} class="input-box">
                        <option value="">Any</option>
                        <option value="fan">Superfan</option>
                        <option value="player">Player</option>
                        <option value="staff">Staff</option>
                    </select>
                </td>
                <td>
                    <input class="input-box" type="text" id="filter-vice" on:keyup={filterHandler} placeholder="Vice">
                </td>
                <td>
                    <input class="input-box" type="text" id="filter-phobia" on:keyup={filterHandler} placeholder="Phobia">
                </td>
                <td>
                    <select name="Sort" type="text" on:change={sortHandler} class="input-box">
                        <option value="">No sort</option>
                        <option value="ovr">Overall</option>
                        <option value="body">Body</option>
                        <option value="soul">Soul</option>
                        <option value="ovr">Mind</option>
                    </select>
                </td>
            </table>
        </div>

    </div>

    <div id="card-browser-scroller" style="overflow-y:scroll; height:80.5vh;" on:scroll={streamTable}>
        <table id="card-browser-table" style="table-layout: fixed" on:click={onCardClick}>
            {#each initial_characters.slice(0,row_num*row_length) as row}
                <tr>
                    {#each row as character}
                        <td>
                            <div id="{character}-div" style="cursor:move;position:relative;left:0">
                                <img id="{character}" style="width:12vw;" src="/cards/{character}.png" /> 
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
    
    .input-box {
        background-color: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.1);
    }
    .input-box{
        color: white;
    }

    select option {color: white;}
</style>