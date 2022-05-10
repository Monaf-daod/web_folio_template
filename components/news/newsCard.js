import { Typography, Box } from "@mui/material";
import Image from "next/image";
import style from "../../styles/news/style.module.css";
import { useRouter } from "next/router";
function NewsCard({ data, theme }) {
  function convertToPlain(html) {
    if (typeof window === "object") {
      let tempDivElement = document.createElement("div");
      tempDivElement.innerHTML = html;
      return tempDivElement.textContent || tempDivElement.innerText || "";
    }
  }
  const Router = useRouter();
  return (
    <Box
      className={style.newsPageCard}
      onClick={() => Router.push(`/news/${data.slug}`)}
      sx={{
        color: "onCard.main",
        backgroundColor: "card.main",
        boxShadow: `0px 0px ${theme?.elevation}px`,
        borderRadius: theme?.radius,
      }}
    >
      <Typography
        variant="h6"
        component="h6"
        color="onCard.dark"
        sx={{ px: "15px" }}
      >
        {data?.title}
      </Typography>
      <Typography
        variant="subtitle1"
        component="span"
        color="onCard.light"
        sx={{ mt: "10px", px: "15px" }}
      >
        {data?.publishingDate}
      </Typography>
      <div
        className="flex-center"
        style={{
          margin: "15px 0px",
          width: "100%",
          height: "200px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={
            data?.mediaItems?.length > 0
              ? data?.mediaItems[0]?.thumbnailUrl
              : "/images/no-image.png"
          }
          alt="ProjectName"
          className="imgEffect"
          width="100%"
          height="200px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <Typography
        variant="body2"
        component="p"
        color="onCard.main"
        sx={{ lineHeight: "1.8", letterSpacing: "0.8px", px: "15px" }}
      >
        {data?.subTitle}
      </Typography>
      {/* <Typography
        variant="caption"
        component="p"
        align="left"
        color="secondary"
        sx={{ lineHeight: "1.8", letterSpacing: "0.8px", px: "15px" }}
      >
        {data?.publishingDate}
      </Typography> */}
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
        {convertToPlain(data?.description)}
      </Typography>
    </Box>
  );
}
export default NewsCard;
