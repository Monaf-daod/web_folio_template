import { Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import style from "../../styles/homePage/style.module.css";
import { useRouter } from "next/router";
import { useState, useEffect, Fragment } from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import FullImage from "../helpers/fullImage";
import useTranslation from "next-translate/useTranslation";
function ProjectCard({ item, url }) {
  // const [scrollTop, setScrollTop] = useState(false);
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
  // const handleScroll = () => {
  //   if (window.scrollY > 970) setScrollTop(true);
  // };
  // useEffect(() => {
  //   if (typeof window === "object")
  //     document.addEventListener("scroll", handleScroll);
  //   return () => {
  //     document.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  return (
    <Box
      // className={
      //   scrollTop == true
      //     ? `${style.projectCard} projectCardMove`
      //     : `${style.projectCard}`
      // }
      className={style.projectCard}
      sx={{ color: "primary.main", backgroundColor: "card.main" }}
    >
      <div>
        <div
          className={`flex-card ${style.ImageSize} ${style.projectImg}`}
          onClick={() => setOpen(true)}
        >
          {item?.mediaItems?.map((img, index) => {
            if (img.isFeature)
              return (
                <img
                  key={index}
                  src={
                    img?.thumbnailUrl
                      ? img?.thumbnailUrl
                      : "/images/no-image.png"
                  }
                  alt="ProjectName"
                  width="100%"
                  height="100%"
                  className={style.projCardIMG}
                />
              );
            else return <Fragment key={index} />;
          })}

          {/* <Box
            sx={{
              backgroundColor: "primary.main",
              height: "100%",
              position: "absolute",
              right: "0px",
              top: "0px",
              width: "5px",
            }}
          ></Box> */}
        </div>
        <Typography
          variant="h6"
          component="h6"
          color="onCard.dark"
          sx={{ my: 1, cursor: "pointer", px: 2, fontWeight: "600" }}
          // onClick={() => Router.push(`/projects/${item.id}`)}
        >
          {item?.title}
        </Typography>
        {/* <FullImage open={open} setOpen={setOpen} image={item?.images[0]} /> for view image in full width*/}
        <Typography
          variant="body2"
          component="p"
          color="onCard.main"
          sx={{
            margin: "15px 0px",
            overflow: "hidden",
            margin: "0px",
            px: 2,
            mb: "25px",
          }}
          // className={scrollTop == true ? "textanimate overFlow" : "overFlow"}
          className="overFlow"
        >
          {convertToPlain(item?.description)}
        </Typography>
        {/* <div
          dangerouslySetInnerHTML={{ __html: item?.description }}
          style={{ height: "auto", overflow: "hidden" }}
        ></div> */}
        {/* <Typography
          variant="caption"
          component="span"
          color="onCard.light"
          sx={{ mt: "10px", position: "absolute", bottom: "8px" }}
        >
          {item?.startDate} - {item?.endDate}
        </Typography> */}
        <Button
          className={style.projectButtonN}
          sx={{
            color: "primary.main",
            backgroundColor: "transparent",
            borderColor: "primary.main",
            borderRadius: "15px 0px",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "onPrimary.main",
              cursor: "pointer",
            },
          }}
          onClick={() => Router.push(url)}
        >
          {t("more")}
          <DoubleArrowIcon className={style.arrow} />
        </Button>
      </div>
    </Box>
  );
}
export default ProjectCard;
