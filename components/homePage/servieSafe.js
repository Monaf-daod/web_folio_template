import { Box, Typography } from "@mui/material";
import style from "../../styles/homePage/style.module.css";
import Link from "next/link";
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
function ServiceSafe({ item }) {
  let { t, lang } = useTranslation("common");
  function convertToPlain(html) {
    if (typeof window === "object") {
      let tempDivElement = document.createElement("div");
      tempDivElement.innerHTML = html;
      return tempDivElement.textContent || tempDivElement.innerText || "";
    }
  }
  return (
    <Box sx={{ color: "primary.light" }}>
      <div className={style.serviceSaifCard}>
        <div className={style.serviceSaifContentCont}>
          <img src={item.image} width="100px" height="100px" />
          <Typography
            variant="h6"
            component="h6"
            className={style.servcieSafeTitle}
            sx={{ color: "primary.main" }}
          >
            {item.title}
          </Typography>
        </div>
        <Box
          sx={{ backgroundColor: "primary.main", width: "100%" }}
          className={style.serviceSaifSecondContentCont}
        >
          <p className={style.serviceSafeText}>
            {convertToPlain(item.description)}
          </p>
          <Link href={`/services/subservices?id=${item.id}`} passHref>
            <a
              className={style.serviceSafeText}
              style={{
                textAlign: "center",
                fontSize: "20px",
              }}
            >
              {t("more")}
            </a>
          </Link>
        </Box>
      </div>
    </Box>
  );
}
export default ServiceSafe;
