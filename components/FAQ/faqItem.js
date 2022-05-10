import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import style from "../../styles/FAQ/style.module.css";
import { Collapse, Box, Typography } from "@mui/material";
import { useState } from "react";
function FAQItem({ data }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className={style.faqContainer} onClick={() => handleClick()}>
      <Box
        className={style.boxContainer}
        sx={{
          color: "onCard.main",
          backgroundColor: "card.main",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "onPrimary.main",
          },
        }}
      >
        <Typography
          variant="h6"
          component="h6"
          className={style.question}
          sx={{ color: "onCard.main" }}
        >
          {data?.question}
        </Typography>
        {open ? <RemoveIcon /> : <AddIcon />}
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ backgroundColor: "card.main" }}>
          <Typography
            variant="p"
            component="p"
            className={style.text}
            sx={{ color: "onCard.main" }}
          >
            {data?.answer}
          </Typography>
          {/* <Typography
            component="span"
            sx={{ color: "onCard.light" }}
            className={style.date}
          >
            {data?.createdAt}
          </Typography> */}
        </Box>
      </Collapse>
    </div>
  );
}
export default FAQItem;
