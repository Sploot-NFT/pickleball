import { c as create_ssr_component, b as each, e as escape, d as add_attribute, v as validate_component } from "../../chunks/index-1e0b989c.js";
import { s as selected_position_store, H as Header } from "../../chunks/Header-6983c8fe.js";
import "../../chunks/config-1c7ca0cd.js";
const css$1 = {
  code: ".card-browser.svelte-1lhufdg{height:72vh;width:50vw;overflow-x:hidden;overflow-y:hidden;padding-left:1.5vw;padding-right:1.5vw;padding-bottom:1.5vw;border-style:solid;position:relative;top:1vh;float:left}",
  map: null
};
const row_length = 4;
const CardBrowser = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  selected_position_store.subscribe((value) => {
  });
  let selected_characters = [];
  for (let i = 0; i < 1e4 / row_length; i++) {
    let row = [];
    for (let j = 0; j < row_length; j++) {
      row.push(i * row_length + j);
    }
    selected_characters.push(row);
  }
  $$result.css.add(css$1);
  return `<h2 style="${"text-align:center; margin-bottom:-1vh"}">Roster</h2>
<div class="${"card-browser svelte-1lhufdg"}"><div style="${"overflow-y:scroll; height:72.5vh"}"><table id="${"card-browser-table"}" style="${"table-layout: fixed"}">${each(selected_characters.slice(0, 50 / row_length), (row) => {
    return `<tr>${each(row, (character) => {
      return `<td><div id="${escape(character) + "-div"}" style="${"cursor:move;position:relative;left:0"}"><img${add_attribute("id", character, 0)} style="${"width:12vw;"}" src="${"/cards/" + escape(character) + ".png"}"></div>
                            
                        </td>`;
    })}
                </tr>`;
  })}
            ${each(selected_characters.slice(50), (row) => {
    return `<tr>${each(row, (character) => {
      return `<td><div id="${escape(character) + "-div"}" style="${"cursor:move;position:relative;left:0"}"><img loading="${"lazy"}"${add_attribute("id", character, 0)} style="${"width:12vw;"}" src="${"/cards/" + escape(character) + ".png"}"></div>
                            
                        </td>`;
    })}
                </tr>`;
  })}</table></div>
</div>`;
});
const css = {
  code: ".team-select.svelte-1pc0oia{height:72vh;width:38.6vw;overflow-x:hidden;overflow-y:hidden;padding-left:1.5vw;padding-right:1.5vw;padding-bottom:1.5vw;margin-right:1.5vw;border-style:solid;position:relative;top:1vh;float:right}.position-card.svelte-1pc0oia{width:12vw;border:3px solid #ffffff}",
  map: null
};
const TeamSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  selected_position_store.subscribe((value) => {
  });
  $$result.css.add(css);
  return `<h2 style="${"text-align:center;margin-bottom:-1vh"}">Team Selection</h2>
<div class="${"team-select svelte-1pc0oia"}"><div style="${"width:39vw;margin:auto"}"><h3 style="${"text-align: center"}">Fans</h3>
        <div style="${"border:dotted; padding:1vh"}"><table id="${"team-selection"}"><tr id="${"fans"}"><td><img id="${"character-fan-1"}" src="${"/cards/blank.png"}" class="${"position-card svelte-1pc0oia"}"></td>
                    <td><img id="${"character-fan-2"}" src="${"/cards/blank.png"}" class="${"position-card svelte-1pc0oia"}"></td>
                    <td><img id="${"character-fan-3"}" src="${"/cards/blank.png"}" class="${"position-card svelte-1pc0oia"}"></td></tr></table></div>

        <div style="${"overflow:hidden;position:relative;left:-1.5vh;width:41vw"}"><div><table><tr><td><h3 style="${"text-align:center"}">Staff</h3>
                            <div style="${"border: dotted; padding:1vh; overflow:hidden"}"><img id="${"character-staff-1"}" src="${"/cards/blank.png"}" class="${"position-card svelte-1pc0oia"}"></div></td>
                        <td><h3 style="${"text-align:center"}">Players</h3>
                            <div style="${"border:dotted;padding:0.7vh;overflow:hidden"}"><table><tr id="${"players"}"><td><img id="${"character-player-1"}" src="${"/cards/blank.png"}" class="${"position-card svelte-1pc0oia"}"></td>
                                        <td><img id="${"character-player-2"}" src="${"/cards/blank.png"}" class="${"position-card svelte-1pc0oia"}"></td></tr></table></div></td></tr></table></div></div></div>

</div>`;
});
const Team = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
<table><tr><td>${validate_component(CardBrowser, "CardBrowser").$$render($$result, {}, {}, {})}</td>
        <td><div style="${"margin-left: 2vw"}">${validate_component(TeamSelect, "TeamSelect").$$render($$result, {}, {}, {})}</div></td></tr></table>`;
});
export { Team as default };
