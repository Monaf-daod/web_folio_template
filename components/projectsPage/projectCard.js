import { Typography } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import Link from "next/link";
import classes from "../../styles/projectsPage/style.module.css";
import Image from "next/image";
const ProjectCard = ({ item }) => {
  return (
    <Link href={`/projects/${item.slug}`}>
      <div className={classes.projectsPageCard}>
        {/* <Typography
          variant="caption"
          color="onCard.light"
          ml={2}
          my={1}
          px={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {item.startDate} <ArrowRightAlt fontSize="small" /> {item.endDate}
        </Typography> */}

        {item?.mediaItems?.map((img, i) => {
          return (
            <div key={i} style={{ overflow: "hidden", width: "100%" }}>
              {img.isFeature == true && (
                <img
                  src={
                    img?.thumbnailUrl
                      ? img?.thumbnailUrl
                      : "/images/no-image.png"
                  }
                  alt="ProjectName"
                  width="100%"
                  height="320px"
                  className="imgEffect"
                />
              )}
            </div>
          );
        })}
        <Typography
          variant="h6"
          color="onBackground.dark"
          ml={2}
          mt={2}
          mb={2}
          px={1}
        >
          {item.title}
        </Typography>
      </div>
    </Link>
  );
};

export default ProjectCard;
