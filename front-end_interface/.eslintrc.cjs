module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked", // Stricter type checking
        "plugin:react/recommended", // React linting rules
        "plugin:react-hooks/recommended", // React Hooks linting
        "plugin:react/jsx-runtime", // JSX runtime
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
    },
    plugins: ["react-refresh", "@typescript-eslint"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
};
