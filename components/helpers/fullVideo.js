import { Modal, Box } from "@mui/material";
import React from "react";
export default function FullVideo({ open, setOpen, video = "" }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let width = 300;
  if (typeof window !== "undefined") {
    width = window.innerWidth;
  }
  return (
    <div className="stretchIcon">
      <Modal
        open={open}
        onClose={(e) => {
          handleClose();
          e.stopPropagation();
        }}
        className="flex-center"
        sx={{ outline: "none" }}
      >
        <div>
          <video controls autoPlay id="FullvideoBackground" width="100vh">
            <source src={`${video}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Modal>
    </div>
  );
}
