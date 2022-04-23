<script>
    import { selected_position_store } from './stores.js';

    var selected_position;
    selected_position_store.subscribe(value => {
        selected_position = value;
    })

    // Generate a list of ids to be shown in browser (1-10,000 for now, no filtering yet)
    let selected_characters = [];
    const row_length = 4;
    for (let i=0;i<10000/row_length;i++) {
        let row = [];
        for (let j=0;j<row_length;j++) {
            row.push(i*row_length+j);
        }
        selected_characters.push(row);
    }


    let row_num = 5; // Furthest row number downloaded

    function streamTable() { // Add to table as user scrolls (avoids loading all images at once)
        if (row_num >= selected_characters.length/row_length) {
            return;
        }
        let table = document.getElementById("card-browser-table");
        let row = table.rows[table.rows.length-1];
        let clone = row.cloneNode(true);
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

    function onCardClick(event) {
        console.log(selected_position);
        let card = document.getElementById(selected_position);
        card.src = event.target.src;
        localStorage.setItem(selected_position, event.target.id);
    }
</script>

<h2 style="text-align:center; margin-bottom:-1vh">Roster</h2>
<div class="card-browser" >
    <div style="overflow-y:scroll; height:72.5vh;" on:scroll={streamTable}>
        <table id="card-browser-table" style="table-layout: fixed">
            {#each selected_characters.slice(0,row_num*row_length) as row}
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
        height:72vh;
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