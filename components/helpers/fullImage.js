import { Modal } from "@mui/material";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import classes from "../../styles/projectDetails/style.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Carousel from "react-material-ui-carousel";
import CloseIcon from "@mui/icons-material/Close";

export default function FullImage({ open, setOpen, image, images }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(true);
  const onImgLoad = () => {
    setLoading(false);
  };

  const [currentImg, setCurrentImg] = useState(
    images.findIndex((img) => img.url == image)
  );
  const forwardIMg = () => {
    if (currentImg < images.length - 1) setCurrentImg(() => currentImg + 1);
  };
  const beforeIMg = () => {
    if (currentImg > 0) setCurrentImg(() => currentImg - 1);
  };
  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);
  let xDown = null;
  let yDown = null;

  function getTouches(evt) {
    return (
      evt.touches || // browser API
      evt.originalEvent.touches
    ); // jQuery
  }
  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }
  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* right swipe */ forwardIMg();
      } else {
        /* left swipe */ beforeIMg();
      }
    } else {
      if (yDiff > 0) {
        /* down swipe */
      } else {
        /* up swipe */
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
  return (
    <div className="">
      <Modal
        open={open}
        onClose={(e) => {
          handleClose();
          e.stopPropagation();
        }}
        sx={{
          outline: "none",
          border: "none",
          padding: "15px",
          height: "100vh",
          overflow: "hidden",
        }}
        // className="flex-center"
        // sx={{ outline: "none" }}
      >
        <div
          style={{
            position: "relative",
            outline: "none",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            {loading == true && (
              <CircularProgress
                style={{
                  position: "absolute",
                  width: "50px",
                  height: "50px",
                  top: "50%",
                  left: "50%",
                  zIndex: "10",
                }}
              />
            )}
            <img
              src={images[currentImg].url}
              onLoad={onImgLoad}
              className={classes.imgGalleryCard}
            />

            <ArrowForwardIosIcon
              className={
                loading == true ? `hidden` : `${classes.galleyImgArrow}`
              }
              onClick={() => forwardIMg()}
            />
            <ArrowBackIosIcon
              className={
                loading == true ? `hidden` : `${classes.galleyImgArrowBefore}`
              }
              onClick={() => beforeIMg()}
            />
            <CloseIcon
              className={classes.galleryImgClose}
              onClick={() => handleClose()}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
