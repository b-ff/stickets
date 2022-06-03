import dotenv from "dotenv";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import linaria from "@linaria/rollup";
import css from "rollup-plugin-css-only";
import { string } from "rollup-plugin-string";
import replace from "rollup-plugin-replace";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";

dotenv.config();

const production = !process.env.ROLLUP_WATCH;

function serve() {
  return {
    writeBundle() {},
  };
}

const getTypescriptBundleFor = (name, indexFile) => ({
  input: indexFile,
  output: {
    sourcemap: true,
    format: "iife",
    name: name,
    file: `assets/${name}.bundle.js`,
  },
  plugins: [
    json(),
    string({
      include: "**/*.graphql",
    }),
    image(),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: `${name}.bundle.css` }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript(),
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
});

const getReactTypescriptBundleFor = (name, indexFile) => ({
  input: indexFile,
  output: {
    sourcemap: true,
    format: "iife",
    name: name,
    file: `assets/${name}.bundle.js`,
  },
  plugins: [
    json(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    resolve({
      browser: true,
      extensions: [".ts", ".tsx", ".json"],
    }),
    commonjs(),
    string({
      include: "**/*.graphql",
    }),
    image(),
    linaria({
      sourceMap: !production,
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: `${name}.bundle.css` }),
    typescript(),
    babel({
      babelrc: true,
      babelHelpers: "bundled",
    }),
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
});

export default [
  //react app
  getTypescriptBundleFor("background", "src/background/index.ts"),
  getReactTypescriptBundleFor("options", "src/options/index.tsx"),
  getReactTypescriptBundleFor("popup", "src/popup/index.tsx"),
];
