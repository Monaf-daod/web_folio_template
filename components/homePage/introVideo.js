import { Box, Typography } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import Link from "next/link";
import style from "../../styles/homePage/style.module.css";
import { useState, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
const IntroVideo = ({ video, image }) => {
  const [isPlay, setIsPlay] = useState(false);
  const videoRef = useRef();
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        overflow: "hidden",
        position: "relative",
        height: "100%",
      }}
    >
      {video != "" && video != null && !isPlay && (
        <div className={style.videoPlayCont}>
          {/* <img
            src="/images/play.png"
            width="40px"
            height="40px"
            alt=""
            className={style.videoPlay}
            onClick={() => {
              videoRef.current.play();
              setIsPlay(true);
            }}
          /> */}
          <PlayArrowIcon
            onClick={() => {
              videoRef.current.play();
              setIsPlay(true);
            }}
            className={style.videoPlay}
          />
        </div>
      )}
      <video
        controls={isPlay}
        poster={image}
        className={isPlay == false ? "posterVideo" : ""}
        ref={videoRef}
        onClick={() => setIsPlay(true)}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};
export default IntroVideo;
