import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { headerTypes } from "../constants/enums";
import MenuIcon from "@mui/icons-material/Menu";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Menu,
  Box,
  IconButton,
  Typography,
  MenuItem,
  Container,
  Tooltip,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";
import style from "../styles/header/header.module.css";
function Header(props) {
  const Router = useRouter();
  let { t } = useTranslation("common");
  const {
    pages,
    theme,
    dynamicPages,
    parentLink,
    headerType,
    socialMediaLinks,
  } = props;

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [scrollTop, setScrollTop] = useState(false); //to apply effect on navbar
  const [loading, setLoading] = useState(true);
  const [showDynamicPage, setshowDynaimPage] = useState(false);
  const languages = [
    { name: "English", value: "en-US" },
    { name: "العربية", value: "ar" },
  ];
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleScroll = () => {
    if (window.scrollY < 100) setScrollTop(false);
    if (window.scrollY > 100) setScrollTop(true);
  };
  useEffect(() => {
    if (typeof window === "object")
      document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  function checkLoadImages() {
    if (typeof window == "object") {
      Promise.all(
        Array.from(document.images).map((img) => {
          if (img.complete) return Promise.resolve(img.naturalHeight !== 0);
          return new Promise((resolve) => {
            img.addEventListener("load", () => resolve(true));
            img.addEventListener("error", () => resolve(false));
          });
        })
      ).then((results) => {
        if (results.every((res) => res)) setLoading(false);
        else setLoading(false);
      });
    }
  }

  useEffect(() => {
    checkLoadImages();
  }, []);

  // checking of header type first [colored_background,transparent_background]
  // for determining custom style (background color, color, position)

  const getAppropriateHeaderClasses = () => {
    if (scrollTop) {
      return `${style.globalNav}`;
    } else {
      if (headerType == headerTypes.colored)
        return `${style.fixedHeaderScrollOff}`;
      else return `${style.headerCon}`;
    }
  };

  // rendering social media links
  const renderSocialMediaList = () => {
    return socialMediaLinks.map(({ channel, value }) => {
      switch (channel) {
        case "Facebook":
          if (value != "")
            return (
              <FacebookIcon
                sx={{
                  color:
                    headerType == headerTypes.colored // checking of header type first[colored_background,transparent_background]
                      ? "primary.main"
                      : scrollTop == true
                      ? "primary.main"
                      : "white",
                  fontSize: { xs: "16px", md: "20px" },
                  mr: { xs: "4px", md: "8px" },
                  "&:hover": {
                    color: "primary.main",
                    cursor: "pointer",
                  },
                }}
                onClick={() => window.open(value, "_blank")}
              />
            );
          break;
        case "Instagram":
          if (value != "")
            return (
              <InstagramIcon
                sx={{
                  color:
                    headerType == headerTypes.colored // checking of header type first[colored_background,transparent_background]
                      ? "primary.main"
                      : scrollTop == true
                      ? "primary.main"
                      : "white",
                  fontSize: { xs: "16px", md: "20px" },
                  mr: { xs: "4px", md: "8px" },
                  "&:hover": {
                    color: "primary.main",
                    cursor: "pointer",
                  },
                }}
                onClick={() => window.open(value, "_blank")}
              />
            );
          break;
        case "Twitter":
          if (value != "")
            return (
              <TwitterIcon
                sx={{
                  color:
                    headerType == headerTypes.colored // checking of header type first[colored_background,transparent_background]
                      ? "primary.main"
                      : scrollTop == true
                      ? "primary.main"
                      : "white",
                  fontSize: { xs: "16px", md: "20px" },
                  mr: { xs: "4px", md: "8px" },
                  "&:hover": {
                    color: "primary.main",
                    cursor: "pointer",
                  },
                }}
                onClick={() => window.open(value, "_blank")}
              />
            );
          break;
        default:
          break;
      }
    });
  };

  return (
    <div className={getAppropriateHeaderClasses()} id="navbar">
      <Container maxWidth="lg" sx={{ alignItems: "center" }}>
        <Box
          className={style.supportBarArea}
          sx={{ pb: scrollTop == true && "20px !important" }}
        >
          <Grid
            container
            sx={{
              display: scrollTop == true ? "none" : "flex",
              alignItems: "center",
            }}
          >
            <Grid item xs={3} lg={6}>
              {" "}
              <div style={{ display: "flex", alignItems: "center" }}>
                {socialMediaLinks && renderSocialMediaList()}
              </div>
            </Grid>
            <Grid item xs={9} lg={6}>
              {/* <div className="flex-center" style={{ justifyContent: "end" }}>
                {socialMediaLinks?.find(({ channel }) => channel == "Email")
                  ?.value && (
                  <div className="flex-center">
                    <Typography
                      componet="span"
                      sx={{
                        fontSize: { xs: "16px", md: "20px" },
                        letterSpacing: "0px",
                      }}
                    >
                      {
                        socialMediaLinks.find(
                          ({ channel }) => channel == "Email"
                        ).value
                      }
                    </Typography>
                    <EmailIcon
                      sx={{
                        color: "primary.main",
                        fontSize: "20px",
                        mr: "2px",
                        ml: "4px",
                      }}
                    />
                  </div>
                )}
                {socialMediaLinks?.find(({ channel }) => channel == "Phone")
                  ?.value && (
                  <div className="flex-center">
                    <Typography
                      componet="span"
                      sx={{ fontSize: { xs: "16px", md: "20px" } }}
                    >
                      {
                        socialMediaLinks.find(
                          ({ channel }) => channel == "Phone"
                        ).value
                      }
                    </Typography>
                    <LocalPhoneIcon
                      sx={{
                        color: "primary.main",
                        fontSize: "20px",
                        mr: "2px",
                      }}
                    />
                  </div>
                )}
              </div> */}
              <div
                className="flex-center"
                style={{ position: "relative", justifyContent: "flex-end" }}
              >
                <Tooltip title="Languages">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Image
                      src={
                        Router.locale == "ar"
                          ? "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/ae.svg"
                          : "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/us.svg"
                      }
                      width={30}
                      height={30}
                      priority
                    />
                  </IconButton>
                </Tooltip>
                <Typography
                  variant="subtitle1"
                  component="span"
                  color="white"
                  sx={{ mx: "5px" }}
                >
                  {Router.locale == "ar" ? "Arabic" : "English"}
                </Typography>
              </div>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                disableScrollLock={true}
              >
                {languages.map((language) => (
                  <MenuItem key={language.value} onClick={handleCloseNavMenu}>
                    <Link
                      textAlign="center"
                      href={Router.asPath}
                      locale={language.value}
                    >
                      <Typography textAlign="center">
                        {language.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              mt: { xs: 2, md: 3 },
              position: "relative",
              justifyContent: "space-between",
            }}
          >
            <Grid item xs={0} md={8}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex", justifyContent: "start" },
                }}
              >
                {pages?.map((page, index, elements) => (
                  <Fragment key={page.id}>
                    <Link href={page.link || "/"} passHref>
                      <a
                        style={{
                          textDecoration: "none",
                          color:
                            scrollTop == true
                              ? `${theme?.onBackgroundColor}`
                              : "inherit",
                        }}
                      >
                        <Typography
                          onClick={handleCloseNavMenu}
                          variant="subtitle1"
                          component="h6"
                          color="onBackgound.dark"
                          sx={{
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            padding: "10px 15px",
                            margin: "0px",
                            marginRight: Router.locale == "en-US" && "10px",
                            marginLeft: Router.locale == "ar" && "10px",
                            fontWeight: "600",
                            lineHeight: "1",
                            backgroundColor:
                              page.link == Router.pathname && "primary.main",
                            borderRadius:
                              page.link == Router.pathname && "15px 0px",
                            color: page.link == Router.pathname && "#fff",
                            "&:hover": {
                              borderRadius: "15px 0px",
                              color: theme?.onPrimaryColor,
                              backgroundColor: "primary.main",
                            },
                          }}
                        >
                          {t(page?.name || "")}
                        </Typography>
                      </a>
                    </Link>
                  </Fragment>
                ))}
                <Box className={style.dynamicPagecont}>
                  <Typography
                    onClick={handleCloseNavMenu}
                    variant="subtitle1"
                    component="h6"
                    color="onBackgound.dark"
                    sx={{
                      margin: "0px 20px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      padding: "10px 15px",
                      margin: "0px",
                      fontWeight: "600",
                      lineHeight: "1",
                      borderRadius: "15px 0px",
                      backgroundColor:
                        Router.asPath.startsWith("new_pages") && "primary.main",
                      "&:hover": {
                        borderRadius: "15px 0px",
                        color: "#fff",
                        backgroundColor: "primary.main",
                      },
                    }}
                  >
                    {parentLink}
                  </Typography>
                  <div className={style.dynamiUl}>
                    <ul
                      className={style.dynamicPages}
                      style={{ backgroundColor: `${theme?.backgroundColor}` }}
                    >
                      {dynamicPages?.map((page, index) => {
                        return (
                          <Box
                            sx={{
                              "&:hover": { backgroundColor: "primary.main" },
                            }}
                            key={page.id}
                          >
                            <li className={style.dynamicPageItem}>
                              <Link href={`new_pages/${page.slugName}`}>
                                <Typography
                                  component="span"
                                  className={style.dynamicFont}
                                  sx={{
                                    color: theme?.onBackgroundColor,
                                    "&:hover": { color: theme?.onPrimaryColor },
                                  }}
                                >
                                  {page.name}
                                </Typography>
                              </Link>
                            </li>
                          </Box>
                        );
                      })}
                    </ul>
                  </div>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              sx={{
                display: "flex",
                justifyContent: { xs: "space-between", md: "flex-end" },
                alignItems: "center",
              }}
            >
              {theme?.logo && (
                <Image
                  src={theme.logo}
                  alt="logo"
                  width={80}
                  height={38}
                  className={
                    Router.locale == "ar"
                      ? "responsiveArLOGO"
                      : "responsiveLogo"
                  }
                  priority
                />
              )}

              <Box
                sx={{
                  display: {
                    xs: "flex",
                    md: "none",
                  },
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  sx={{
                    color:
                      scrollTop == false
                        ? headerType == headerTypes.colored
                          ? "black"
                          : "white"
                        : "",
                    padding: "0px",
                  }}
                  onClick={handleOpenNavMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  disableScrollLock={true}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages?.map((page, index) => (
                    <MenuItem
                      key={index}
                      onClick={handleCloseNavMenu}
                      sx={{ justifyContent: "center" }}
                    >
                      <Link href={page.link || "/"}>
                        <Typography
                          textAlign="center"
                          variant="subtitle1"
                          component="h2"
                          color="onBackground.dark"
                        >
                          {t(page?.name || "")}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                  {dynamicPages?.length > 0 && (
                    <Typography
                      variant="subtitle1"
                      component="h6"
                      color="onBackground.dark"
                      sx={{
                        margin: "0px 20px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        padding: "10px 15px",
                        margin: "0px",
                        fontWeight: "600",
                        lineHeight: "1",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={() => setshowDynaimPage(!showDynamicPage)}
                    >
                      {showDynamicPage == true ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowRightIcon />
                      )}
                      {parentLink}
                    </Typography>
                  )}
                  <div
                    id="cont"
                    className={
                      showDynamicPage == false
                        ? `${style.dynamicPageContNone}`
                        : `${style.dynamicPageCont}`
                    }
                  >
                    {showDynamicPage == true &&
                      dynamicPages?.map((page) => {
                        return (
                          <MenuItem
                            key={page.id}
                            onClick={handleCloseNavMenu}
                            sx={{ justifyContent: "center" }}
                          >
                            <Link href={`new_pages/${page.slugName}` || "/"}>
                              <Typography
                                textAlign="center"
                                variant="subtitle1"
                                component="h2"
                                color="onBackground.dark"
                              >
                                {t(page?.name || "")}
                              </Typography>
                            </Link>
                          </MenuItem>
                        );
                      })}
                  </div>
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
export default Header;
