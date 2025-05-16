const nextConfig = {
  webpack: (config) => {
    config.target = 'electron-renderer';
    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
