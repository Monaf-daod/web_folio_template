import { Grid, Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import style from "../../styles/homePage/style.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import FullImage from "../helpers/fullImage";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import useTranslation from "next-translate/useTranslation";
function Services({ item, theme }) {
  let { t, lang } = useTranslation("common");
  const Router = useRouter();
  const [open, setOpen] = useState(false);
  function convertToPlain(html) {
    if (typeof window === "object") {
      let tempDivElement = document.createElement("div");
      tempDivElement.innerHTML = html;
      return tempDivElement.textContent || tempDivElement.innerText || "";
    }
  }
  return (
    <div>
      <Box
        className={style.serviceCardN}
        sx={{
          boxShadow: `0px 0px ${theme?.elevation}px`,
          color: "primary.light",
          backgroundColor: "card.main",
        }}
      >
        <div className={style.imgCont}>
          <img src={item.image} alt="service" width="100px" height="100px" />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Typography
            variant="h6"
            component="h6"
            className={style.serviceTitle}
            color="onCard.main"
          >
            {item.title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            className={`${style.serviceText} overFlow`}
            sx={{ color: "onCard.light" }}
          >
            {convertToPlain(item.description)}
          </Typography>
        </div>
        <Button
          className={style.serviceButton}
          sx={{
            backgroundColor: "primary.main",
            color: "onPrimary.main",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "onPrimary.main",
            },
          }}
          onClick={() => Router.push(`/services/subservices?id=${item.id}`)}
        >
          {Router.locale == "ar" && <DoubleArrowIcon className={style.arrow} />}
          {t("readMore" || "")}
          {Router.locale != "ar" && <DoubleArrowIcon className={style.arrow} />}
        </Button>
      </Box>
    </div>
  );
}
export default Services;
