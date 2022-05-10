const nextTranslate = require("next-translate");

//const { i18n } = require("./i18n");

module.exports = {
  reactStrictMode: true,
  ...nextTranslate(),
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["cdnjs.cloudflare.com", "foliocontent.meta-itech.com"],
  },
};
// const nextTranslate = require("next-translate");

// module.exports = nextTranslate({
//   webpack: (config, { isServer, webpack }) => {
//     return config;
//   },
// });
