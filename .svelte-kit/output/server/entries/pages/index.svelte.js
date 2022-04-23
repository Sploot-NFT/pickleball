import { c as create_ssr_component, e as escape, v as validate_component, m as missing_component } from "../../chunks/index-1e0b989c.js";
import { p as page, H as Header } from "../../chunks/Header-6983c8fe.js";
import "../../chunks/config-1c7ca0cd.js";
let score = 0;
const GameResult = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { actionToParse = "null" } = $$props;
  let { handle = "null" } = $$props;
  let actions = actionToParse.split(" ");
  actions.toString().split(":");
  if ($$props.actionToParse === void 0 && $$bindings.actionToParse && actionToParse !== void 0)
    $$bindings.actionToParse(actionToParse);
  if ($$props.handle === void 0 && $$bindings.handle && handle !== void 0)
    $$bindings.handle(handle);
  return `<h2 style="${"text-align: center"}">${escape(handle)}&#39;s Score</h2>
<p style="${"text-align: center"}"><strong>${escape(score)}</strong></p>`;
});
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const handle = localStorage.getItem("twitter_handle");
  return `<h1 style="${"text-align: center"}">Latest Results</h1>
${validate_component(GameResult, "GameResult").$$render($$result, {
    handle,
    actionToParse: "#SLAP12 2075-S1+5568:2376-S2+2106:6870-S2+2106:7332-S1+5568"
  }, {}, {})}

<h1 style="${"text-align: center"}">Upcoming Team</h1>`;
});
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pageValue;
  page.subscribe((value) => {
    pageValue = value;
  });
  page.set({ component: Home, prettyName: "Home" });
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    currentPage: () => {
      return `<span slot="${"currentPage"}">${escape(pageValue.prettyName)}</span>`;
    }
  })} 
${validate_component(pageValue.component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}

${`<p>lol</p>`}`;
});
export { Routes as default };
