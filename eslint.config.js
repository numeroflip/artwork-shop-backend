import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";



export default [
  {files: ["**/*.ts"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  {ignores: ['dist/**/*']},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,  
];
 
