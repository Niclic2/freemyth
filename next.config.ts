import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',

  // basePath: Должен быть только путь к репозиторию, начинающийся со слэша.
  // Без домена, без протокола.
  basePath: process.env.NODE_ENV === 'production' ? '/freemyth' : '',

  // assetPrefix: Должен быть полный, валидный URL, включая протокол и завершающий слэш.
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://niclic2.github.io/freemyth/' : '',

  images: {
    unoptimized: true, // Важно, если используете next/image
  },
};

export default nextConfig;
