import { useState, useEffect } from "react";
import Image from "next/image";
import style from "../../styles/homePage/style.module.css";
import { Typography, Button, Grid, Box, Container } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { headerTypes } from "../../constants/enums";
function FixedBackgroundNew(props) {
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
        position: headerType == headerTypes.colored ? "relative" : null,
        marginBottom: "10vh",
      }}
    >
      <img
        src={data.image?.length > 0 ? data?.image[0] : "/images/background.png"}
        style={{
          width: "100%",
          height:
            headerType == headerTypes.colored
              ? `${100 - navbarNodeHeight}vh`
              : "100%",
          objectFit: "cover",
          position: "absolute",
          zIndex: "0",
        }}
      />
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
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <div className="flex-header">
          <Typography
            variant="h1"
            sx={{
              fontWeight: "500",
              marginBottom: "16px",
              textTransform: "capitalize",
              color: "white",
              lineHeight: "1.2",
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
            {data?.description}
          </Typography>
          {data?.buttonText != null && (
            <Button
              onClick={() => Router.push(data?.buttonUrl)}
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
    </div>
  );
}
export default FixedBackgroundNew;
