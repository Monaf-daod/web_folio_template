import { Typography } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import Link from "next/link";
import classes from "../../styles/projectsPage/style.module.css";
import { useState, useRef } from "react";
import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import FullVideo from "../helpers/fullVideo";
export default function VidoeComp({ video, image }) {
  const [isPlay, setIsPlay] = useState(false);
  const videoRef = useRef();
  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        height: "400px",
        width: "100%",
      }}
    >
      {!isPlay && (
        <img
          src="/images/play.png"
          width="50px"
          height="50px"
          alt=""
          className="videoPlay"
          onClick={() => {
            setIsPlay(true);
          }}
        />
      )}
      <video
        poster={image || "/images/background.png"}
        className={isPlay == false ? "posterVideo" : ""}
        ref={videoRef}
        onClick={() => setIsPlay(true)}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <FullVideo open={isPlay} setOpen={setIsPlay} video={video} />
    </div>
  );
}
