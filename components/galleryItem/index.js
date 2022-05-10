import { Typography } from "@mui/material";
import { ZoomIn } from "@mui/icons-material";
import classes from "../../styles/galleryItem/style.module.css";
import Image from "next/image";
import FullImage from "../../components/helpers/fullImage";
import { useState } from "react";
const GalleryIamge = ({ item, images }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.mainContainer}>
      <div className={classes.gallerySize}>
        <img
          src={item?.thumbnailUrl ? item?.thumbnailUrl : "/images/no-image.png"}
          className={classes.galleryImage}
          width="100%"
          height="250px"
          layout="fill"
        />
        <div className={classes.imageOverlay}>
          <ZoomIn
            className={classes.zoomInIcon}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
      {/* <div className={classes.content}>
        <Typography variant="h6" color="#ffffff">
          El poder de la lampara
        </Typography>
        <Typography variant="subtitle1" color="#ffffff">
          20/3/2022
        </Typography>
      </div> */}
      {open == true && (
        <FullImage
          open={open}
          setOpen={setOpen}
          image={item.url}
          images={images}
        />
      )}
    </div>
  );
};

export default GalleryIamge;
