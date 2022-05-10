import React, { Fragment, useEffect, useState } from "react";
import useTheme from "../components/useTheme/useTheme";
import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import { useRouter } from "next/router";
import {
  ThemeProvider,
  responsiveFontSizes,
  createTheme,
} from "@mui/material/styles";
import "../styles/globals.css";
import AOS from "aos";
import "aos/dist/aos.css";
///
const scale = 0.8;
const [getTheme] = useTheme();

async function fetchTheme(
  setThemeData,
  setPages,
  setDynamicPages,
  setParentLink,
  setSocialMediaLinks,
  language,
  setNavbarType
) {
  let theme = await getTheme(language);
  setThemeData(theme?.data?.theme);
  setPages(theme?.data?.navbarItems);
  setDynamicPages(theme?.data?.dynamicMenuItems);
  setParentLink(theme?.data?.parentLink);
  setSocialMediaLinks(theme?.data?.contacts);
  setNavbarType(theme?.data?.theme?.navbarType);
}

function MyApp({ Component, pageProps }) {
  const Router = useRouter();
  const [pages, setPages] = useState([]);
  const [themeData, setThemeData] = useState();
  const [dynamicPages, setDynamicPages] = useState([]);
  const [parentLink, setParentLink] = useState("");
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [language, setLanguage] = useState("en-US");
  const [navbarType, setNavbarType] = useState(0);
  useEffect(() => {
    AOS.init({
      disable: "mobile",
      duration: 1500,
    });
  }, []);

  useEffect(() => {
    if (Router.locale == "en-US") {
      document.body.dir = "ltr";
      setLanguage(Router.locale);
    } else {
      document.body.dir = "rtl";
      setLanguage(Router.locale);
    }
  }, [Router.locale]);
  useEffect(() => {
    fetchTheme(
      setThemeData,
      setPages,
      setDynamicPages,
      setParentLink,
      setSocialMediaLinks,
      language,
      setNavbarType
    );
  }, [language]);
  let theme = createTheme({
    palette: {
      primary: {
        main: `${themeData?.primaryColor || "#eee"}`,
        light: `${themeData?.primaryColor}`.concat("a6"),
      },
      onPrimary: { main: `${themeData?.onPrimaryColor}` || "black" },
      background: { main: `${themeData?.backgroundColor}` || "black" },
      onBackground: {
        light: `${themeData?.onBackgroundColor}`.concat("a6"),
        main: `${themeData?.onBackgroundColor}`,
        dark: `${themeData?.onBackgroundColor}`.concat("e5"),
      },
      card: { main: `${themeData?.cardColor}` } || "black",
      onCard: {
        light: `${themeData?.onCardColor}`.concat("a6") || "black",
        main: `${themeData?.onCardColor}`,
        dark: `${themeData?.onCardColor}`.concat("e5") || "black",
      },
      dividerColor: `${themeData?.dividerColor}`,
    },
    typography: {
      fontFamily: themeData?.fontFamily,
      fontSize: 14 * themeData?.fontScale,
    },
  });
  theme = responsiveFontSizes(theme);

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} theme={themeData} />);
  }
  return (
    <Fragment>
      <Head>
        <link rel="icon" type="image/x-icon" href={`${themeData?.favicon}`} />
      </Head>
      <ThemeProvider theme={theme}>
        <Header
          pages={pages}
          theme={themeData}
          dynamicPages={dynamicPages}
          parentLink={parentLink}
          headerType={navbarType}
          socialMediaLinks={socialMediaLinks}
        />
        <Component {...pageProps} theme={themeData} headerType={navbarType} />
        <Footer theme={themeData} />
      </ThemeProvider>
    </Fragment>
  );
}

export default MyApp;
