import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
	{
		input: "./src/spotprice.single.js",
		output: {
			file: "dist/spotprice.cjs",
			format: "umd",
			name: "spotprice",
			exports: "default"
		},
		plugins: [nodeResolve()]
	},
	{	
		input: "./src/spotprice.js",
		output: {
			file: "dist/spotprice.mjs",
			format: "es"
		},
		plugins: [nodeResolve()]
	}
];