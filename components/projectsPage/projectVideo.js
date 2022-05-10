import { Typography } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import Link from "next/link";
import classes from "../../styles/projectsPage/style.module.css";
import { useState, useRef } from "react";
const ProjectVideo = ({ item }) => {
  const [isPlay, setIsPlay] = useState(false);
  const videoRef = useRef();
  return (
    <div className={classes.projectsPageCard}>
      <Typography variant="h6" color="text.primary" ml={2} mt={2}>
        {item?.title}
      </Typography>
      <div className="flex-between" style={{ width: "95%" }}>
        <Typography
          variant="caption"
          color="error"
          ml={2}
          my={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {item?.startDate}
          <ArrowRightAlt fontSize="medium" /> {item?.endDate}
        </Typography>
        <Link sx={{ ml: 2, color: "#0000ffbf" }} href={`/projects/${item.id}`}>
          See details
        </Link>
      </div>
      <div style={{ overflow: "hidden", position: "relative" }}>
        {!isPlay && (
          <img
            src="/images/play.png"
            width="50px"
            height="50px"
            alt=""
            className="videoPlay"
            onClick={() => {
              videoRef.current.play();
              setIsPlay(true);
            }}
          />
        )}
        <video
          controls={isPlay}
          poster="/images/background.png"
          className={isPlay == false ? "posterVideo" : ""}
          ref={videoRef}
          onClick={() => setIsPlay(true)}
        >
          <source src={item?.featuredVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default ProjectVideo;
