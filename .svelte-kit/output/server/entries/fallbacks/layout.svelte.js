import "../../chunks/server.js";
// node_modules/@sveltejs/kit/src/runtime/components/layout.svelte
function Layout($$renderer, $$props) {
	const { children } = $$props;
	children($$renderer);
	$$renderer.push(`<!---->`);
}
export { Layout as default };

//# sourceMappingURL=layout.svelte.js.map