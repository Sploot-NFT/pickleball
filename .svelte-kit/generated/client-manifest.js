export { matchers } from './client-matchers.js';

export const components = [
	() => import("../runtime/components/layout.svelte"),
	() => import("../runtime/components/error.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/team.svelte")
];

export const dictionary = {
	"": [[0, 2], [1]],
	"team": [[0, 3], [1]]
};