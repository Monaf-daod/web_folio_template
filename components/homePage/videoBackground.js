import FullVideo from "../helpers/fullVideo";
import { Typography, Button } from "@mui/material";
import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { headerTypes } from "../../constants/enums";
export default function VideoBackground({ data, headerType }) {
  const [openVideo, setOpenVideo] = useState(false);
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
    <div style={{ position: "relative", marginBottom: "48px" }}>
      <video
        loop={true}
        autoPlay={true}
        muted
        id="videoBackground"
        className="videoBright"
        style={{
          height:
            headerType == headerTypes.colored
              ? `${100 - navbarNodeHeight}vh`
              : "100vh",
        }}
      >
        <source src={data?.content} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <VideoSettingsIcon
        className="vieoControlIcon"
        onClick={() => setOpenVideo(true)}
      /> */}
      <FullVideo
        open={openVideo}
        setOpen={setOpenVideo}
        video={data?.content}
      />
      <div className="flex-column-start videoDescription">
        {/* <Typography
          variant="h4"
          component="h4"
          color="white"
          // className={scrollTop == true ? "titleAnimate" : ""}
          sx={{
            fontWeight: "700",
            marginBottom: "16px",
            textTransform: "capitalize",
            color: "white",
            lineHeight: "1",
            paddingRight: Router.locale !== "ar" ? "40%" : "",
            paddingLeft: Router.locale == "ar" ? "40%" : "",
          }}
        >
          {data?.content}
        </Typography> */}
        {/* <Typography
          variant="h4"
          component="h4"
          color="white"
          className={scrollTop == true ? "titleAnimate" : ""}
        >
          للاعمال الهندسية
        </Typography> */}
        <Button
          // sx={{
          //   color: "primary.main",
          //   border: "1px solid",
          //   borderColor: "primary.main",
          //   fontWeight: "400",
          //   width: "fit-content",
          //   padding: "10px 34px",
          //   mt: 1,
          //   "&:hover": {
          //     color: "white",
          //     backgroundColor: "primary.main",
          //   },
          // }}
          className="heroButton"
          sx={{
            "&:hover": {
              backgroundColor: "primary.main",
              borderColor: "primary.main",
            },
          }}
          onClick={() => window.open(data?.buttonUrl, "_blank")}
          // className={scrollTop == true ? "titleAnimate" : ""}
        >
          {data?.buttonText}
        </Button>
      </div>
    </div>
  );
}
