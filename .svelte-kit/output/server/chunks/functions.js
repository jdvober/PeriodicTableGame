import { F as server_api_unavailable } from "./server-errors.js";
// node_modules/@sveltejs/kit/src/utils/functions.js
function noop() {}
/**
* @param {string} name
* @param {string} [parens]
*/
function disallow_on_server(name, parens = "(...)") {
	return () => {
		server_api_unavailable({ name: `${name}${parens}` });
	};
}
export { noop as n, disallow_on_server as t };

//# sourceMappingURL=functions.js.map