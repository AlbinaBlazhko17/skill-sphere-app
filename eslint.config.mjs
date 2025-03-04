import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ languageOptions: { globals: globals.node } },
	{
		rules: {
			'arrow-parens': ['error', 'always'],
			curly: ['error', 'all'],
			eqeqeq: ['error', 'always'],
			'max-params': ['error', 3],
			'no-console': ['error'],
			'no-multiple-empty-lines': [
				'error',
				{
					max: 1,
				},
			],
			'no-restricted-syntax': [
				'error',
				{
					message: 'Export/Import all (*) is forbidden.',
					selector: 'ExportAllDeclaration,ImportAllDeclaration',
				},
				{
					message: 'Exports should be at the end of the file.',
					selector: 'ExportNamedDeclaration[declaration!=null]',
				},
				{
					message:
						"Avoid import/export type { Type } from './module'. Prefer import/export { type Type } from './module'.",
					selector:
						'ImportDeclaration[importKind=type],ExportNamedDeclaration[exportKind=type]',
				},
			],
			'object-shorthand': ['error'],
			'prefer-destructuring': ['error'],
			quotes: ['error', 'single'],
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	'prettier',
];
