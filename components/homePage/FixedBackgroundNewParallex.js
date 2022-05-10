import { useState, useEffect } from "react";
import Image from "next/image";
import style from "../../styles/homePage/style.module.css";
import { Typography, Button, Grid, Box, Container } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { Parallax } from "react-parallax";
import { useRouter } from "next/router";
import { headerTypes } from "../../constants/enums";
function FixedBackgroundParallex(props) {
  const { data, headerType } = props;
  const [navbarNodeHeight, setNavbarNodeHeight] = useState(0);
  const Router = useRouter();
  let { t, lang } = useTranslation("common");

  /// handling and calculate hero section height (%vh of cleint screen)
  useEffect(() => {
    if (typeof window === "object") {
      let temp =
        document.getElementById("navbar").offsetHeight *
        (100 / document.documentElement.clientHeight);
      setNavbarNodeHeight(temp);
    }
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height:
          headerType == headerTypes.colored
            ? `${100 - navbarNodeHeight}vh`
            : "100vh",
        marginBottom: "10vh",
      }}
    >
      <Parallax
        bgImage={
          data.image?.length > 0 ? data?.image[0] : "/images/background.png"
        }
        bgImageAlt="parallex"
        strength={500}
        style={{ height: "100%", scrollBehavior: "smooth" }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            height:
              headerType == headerTypes.colored
                ? `${100 - navbarNodeHeight}vh`
                : "100vh",
            width: "100%",
            backgroundColor: "#00000082",
            opacity: "0.55",
            zIndex: "0",
          }}
        ></div>
        <Container
          maxWidth="lg"
          sx={{
            height:
              headerType == headerTypes.colored
                ? `${100 - navbarNodeHeight}vh`
                : "100vh",
          }}
        >
          <div className="flex-header">
            <Typography
              variant="h1"
              sx={{
                fontWeight: "500",
                lineHeight: "1.2",
                color: "white",
                paddingRight: Router.locale !== "ar" ? "40%" : "",
                paddingLeft: Router.locale == "ar" ? "40%" : "",
                zIndex: 4,
              }}
              className="fontHeaderSize"
            >
              {data?.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "12px", md: "22px" },
                fontWeight: "400",
                lineHeight: "1.4",
                color: "white",
                margin: "0px",
                maxWidth: "50%",
                zIndex: 4,
              }}
            >
              {data?.description} hello monaf
            </Typography>
            {data?.buttonText != null && (
              <Button
                onClick={() => window.open(data?.buttonUrl, "_blank")}
                className="heroButton"
                sx={{
                  background: "transparent",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    borderColor: "primary.main",
                  },
                }}
              >
                {data?.buttonText}
              </Button>
            )}
          </div>
        </Container>
      </Parallax>
    </div>
    // <div>
    //   <img
    //     src="/images/background.png"
    //     width="100%"
    //     height="360px"
    //     className={style.headerBackground}
    //   />
    //   {/* <Grid container spacing={4}>
    //     <Grid item xs={12}> */}{" "}
    //   <Box p={3} mt={6}>
    //     <Typography
    //       variant="h6"
    //       component="h6"
    //       color="onBacground.dark"
    //       sx={{ mb: 2, fontWeight: "500", mt: "4%" }}
    //     >
    //       {title}
    //     </Typography>
    //     <Typography variant="subtitle1" color="onBacground.main" component="p">
    //       {description}
    //     </Typography>
    //     <Button
    //       variant="outlined"
    //       color="primary"
    //       sx={{ mt: 5 }}
    //       onClick={() => Router.push("/projects")}
    //     >
    //       {t("CheckWork")}
    //     </Button>
    //   </Box>
    //   {/* </Grid> */}
    //   {/* <Grid item xs={12} md={6}>
    //       <Box mt={8}>
    //         <img src="/images/background.png" width="517px" height="517px" />
    //       </Box>
    //     </Grid> */}
    //   {/* </Grid> */}
    // </div>
  );
}
export default FixedBackgroundParallex;
