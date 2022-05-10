const hoistNonReactStatics = require("hoist-non-react-statics");
module.exports = {
  locales: ["ar", "en-US"],
  defaultLocale: "en-US",
  localeDetection: false,
  pages: {
    "*": ["common"],
    "/projects": ["projects"],
  },
  staticsHoc: hoistNonReactStatics,
};
