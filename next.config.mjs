/** @type {import('next').NextConfig} */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const nextConfig = {
  webpack: (config) => {
    // Push the MiniCssExtractPlugin into the plugins array
    config.plugins.push(new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }));

    // Return the modified config
    return config;
  },
};

export default nextConfig;
