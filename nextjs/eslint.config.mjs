import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    // 除外
    {
        ignores: [
            ".next/**",   // Next.js ビルド成果物
            "dist/**",    // CommonJS／Rollup 出力
            "out/**",     // 静的書き出し
            "docs/**",     // GitHub Pages用の静的書き出し
            "build/**"    // その他ビルド成果物
        ],
    },

    // 既存の Next.js + TypeScript 推奨設定
    ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
