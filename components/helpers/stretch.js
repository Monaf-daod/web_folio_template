import { Modal, Box } from "@mui/material";
import React from "react";
export default function Stretch({ image = "" }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="stretchIcon">
      <Box
        sx={{ color: "primary.main" }}
        onClick={(e) => {
          handleOpen();
          e.stopPropagation();
        }}
      >
        <img src="/images/stretch.png" width="25px" height="25px" />
      </Box>
      <Modal
        open={open}
        onClose={(e) => {
          handleClose();
          e.stopPropagation();
        }}
        className="flex-center"
        sx={{ outline: "none" }}
      >
        <img src={image} alt="no-image" style={{ objectFit: "contain" }} />
      </Modal>
    </div>
  );
}
