import Image from "next/image";
import style from "../../styles/homePage/style.module.css";
import { Typography, Button, Grid, Box, Container } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import Head from "next/head";
import Particles from "react-tsparticles";
import { useRouter } from "next/router";
import { headerTypes } from "../../constants/enums";
function FixedBackgroundNewParticles(props) {
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
              : "100vh",
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
          backgroundColor: "#00000050",
          opacity: "0.55",
          zIndex: "0",
        }}
      ></div>
      <Particles
        options={{
          style: {
            position: "absolute",
            opacity: "0.8",
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "bubble",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
            },
            modes: {
              bubble: {
                opacity: 0.8,
                size: 10,
                color: {
                  value: "#C2D7ED",
                },
              },
            },
          },
          particles: {
            links: {
              enable: true,
            },
            move: {
              enable: true,
            },
            size: {
              value: 2,
            },
          },
        }}
      />
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
              userSelect: "none",
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
              userSelect: "none",
              zIndex: 4,
            }}
          >
            {data?.description}
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
    </div>
  );
}
export default FixedBackgroundNewParticles;
