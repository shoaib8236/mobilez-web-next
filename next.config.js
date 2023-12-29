const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["www.mobilezmarket.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;