import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export", // 静的エクスポートを有効化
    trailingSlash: true, // 必要に応じてURLの末尾にスラッシュを追加
    images: {
        unoptimized: true, // next/imageの最適化を無効化
    },
};

export default nextConfig;
