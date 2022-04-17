<script>
    import { createEventDispatcher } from 'svelte'

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

    // Show first 50 characters
    let initial_characters = [];
    for (let i=0;i<50/row_length;i++) {
        let row = [];
        for (let j=0;j<row_length;j++) {
            row.push(i*row_length+j);
        }
        initial_characters.push(row);
    }

    let row_num = 5; // Furthest row number downloaded

    function streamTable() { // Add to table as user scrolls (avoids loading all images at once)
        if (row_num >= selected_characters.length/row_length) {
            return;
        }
        let table = document.getElementById("card-browser-table");
        let row = table.insertRow(-1);
        for (let i=0;i<row_length;i++) {
            let cell = row.insertCell(i);
            cell.innerHTML = `<img style="width:12vw" src="/cards/${selected_characters[row_num][i]}.png">`;
        }
        row_num++;
    }

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var element_being_dragged = "";
    let original_position = {left: 0, top: 0};

    function getOffset(el) { // Helper function to get absolute position of element
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    var detectOverlap = (function () { // Helper function to check if two elements overlap
        function getPositions(elem) {
            var pos = elem.getBoundingClientRect();
            return [[pos.left, pos.right], [pos.top, pos.bottom], pos.width];
        }

        function comparePositions(p1, p2, dimension) {
            var r1, r2;
            if (p1[0] < p2[0]) {
            r1 = p1;
            r2 = p2;
            } else {
            r1 = p2;
            r2 = p1;
            }
            return (r1[1] - r2[0] > dimension/3); // Only activate if more than 1/3 of the element is overlapping
        }

        return function (a, b) {
            var pos1 = getPositions(a),
                pos2 = getPositions(b);
            return comparePositions(pos1[0], pos2[0], pos1[2]) && comparePositions(pos1[1], pos2[1], pos1[2]);
        };
    })();

    function moveTo(element, left, top, target_time, callback) { // Helper function to move an element to a position in a fixed time
        let current_position = getOffset(element);

        let x_change = left - current_position.left;
        let y_change = top - current_position.top;

        let x_step = 0;
        let y_step = 0;

        if (Math.abs(x_change) > Math.abs(y_change)) {
            if (x_change != 0) {
                y_step = Math.abs(y_change/x_change);
            }
            x_step = 1;
        } else {
            if (y_change != 0) {
                x_step = Math.abs(x_change/y_change);
            }
            y_step = 1;
        }

        let multiplication_const = 1;
        if (x_change != 0) {
            multiplication_const = Math.abs(target_time / ((x_change/x_step)*10));
        } else if (y_change != 0) {
            multiplication_const = Math.abs(target_time / ((y_change/y_step)*10));
        } else {
            return;
        }
        x_step /= multiplication_const;
        y_step /= multiplication_const;

        let id = null;
        clearInterval(id);
        id = setInterval(frame, 10);
        function frame() {
            if (x_change > 0) {
                x_change -= x_step
                element.style.left = (parseFloat(element.style.left.toString().replace("px", "")) + x_step) + "px";
            } else if (x_change < 0) {
                x_change += x_step
                element.style.left = (parseFloat(element.style.left.toString().replace("px", "")) - x_step) + "px";
            }

            if (y_change > 0) {
                y_change -= y_step;
                element.style.top = (parseFloat(element.style.top.toString().replace("px", "")) + y_step) + "px";
            } else if (y_change < 0) {
                y_change += y_step;
                element.style.top = (parseFloat(element.style.top.toString().replace("px", "")) - y_step) + "px";
            }

            if (x_step == 0 && y_step == 0) {
                callback();
                clearInterval(id);
                return;
            } else if (x_change > -x_step && x_change < x_step) {
                x_step = 0;
            } else if (y_change > -y_step && y_change < y_step) {
                y_step = 0;
            }
        }
    }


    function startDrag(event) {
        event.preventDefault();

        pos3 = event.clientX;
        pos4 = event.clientY;

        let card = document.getElementById(event.target.id + "-div");
        let new_card = card.cloneNode(true);
        card.style.opacity = "0.2";
        new_card.addEventListener("mousemove", drag);
        new_card.addEventListener("mouseup", stopDrag);
        let abs_position = getOffset(card);
        original_position = abs_position;
        new_card.style.position = "absolute";
        new_card.style.left = abs_position.left + "px";
        new_card.style.top = abs_position.top + "px";
        new_card.style.zIndex = 1;
        new_card.id = new_card.id + "-copy"
        document.body.appendChild(new_card);

        element_being_dragged = event.target.id
    }


    function stopDrag(event) {
        event.preventDefault();
        element_being_dragged = "";

        let element = document.getElementById(event.target.id + "-div-copy");

        let divs = Array.from(document.getElementsByTagName('img'));
        let forEach = Array.prototype.forEach
        let regex = /character-/;

        var target = null;
        if (!divs.every(function (d) {
            if (d.id !== undefined && regex.test(d.id)) {
                if (detectOverlap(d, element)) {
                    d.src = element.children[0].src;
                    target = d;
                    return false;
                }
            }
            return true;
        })) {
            moveTo(element, getOffset(target).left, getOffset(target).top, 150, (function () {
                let old_element = document.getElementById(event.target.id + "-div");
                old_element.style.opacity = "1";
                element.parentNode.removeChild(element);
            }));
            return;
        }

        // Return card to original position
        // You may be wondering why I didn't just use an animation. I tried that but it jumped at the beginning of the animation
        // and I couldn't figure out why, so I did this instead.

        moveTo(element, original_position.left, original_position.top, 150, (function () {
            let old_element = document.getElementById(event.target.id + "-div");
            old_element.style.opacity = "1";
            element.parentNode.removeChild(element);
        }));
    }

    function drag(event) {
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;

        if (element_being_dragged == event.target.id) { // If left-click held down
            let element = document.getElementById(event.target.id + "-div-copy");
            element.style.left = (parseInt(element.style.left.replace("px", "")) -  pos1).toString() + "px"
            element.style.top = (parseInt(element.style.top.replace("px", "")) -  pos2).toString() + "px"
        } 
    }
</script>

<h2 style="text-align:center; margin-bottom:-1vh">Roster</h2>
<div class="card-browser" >
    <div on:scroll={streamTable} style="overflow-y:scroll; height:72.5vh">
        <table id="card-browser-table">
            {#each initial_characters as row}
                <tr>
                    {#each row as character}
                        <td>
                            <div id="{character}-div" on:mousedown={startDrag} on:mousemove={drag} on:mouseup={stopDrag} style="cursor:move;position:relative;left:0">
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
    }
</style>