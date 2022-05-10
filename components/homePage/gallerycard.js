import style from "../../styles/homePage/style.module.css";
import { Box } from "@mui/material";
import Image from "next/image";
import FullImage from "../../components/helpers/fullImage";
import { useState } from "react";
function GalleryCard(props) {
  const { width, height, image } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      >
        <div
          className={style.galleryCard}
          style={{
            width: width,
            height: `${height}px`,
            position: "relative",
          }}
        >
          <img
            src={image ? image : "/images/no-image.png"}
            alt="galleryIMg"
            width="100%"
            className="imgEffect"
            style={{ height: "100%" }}
          />
        </div>
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <div
          className={style.galleryCard}
          style={{
            width: width,
            height: `${height - 192}px`,
            position: "relative",
          }}
        >
          <img
            src={image ? image : "/images/no-image.png"}
            alt="galleryIMg"
            layout="cover"
          />
        </div>
        {open == true && (
          <FullImage open={open} setOpen={setOpen} image={image} />
        )}
      </Box>
    </>
  );
}
export default GalleryCard;
