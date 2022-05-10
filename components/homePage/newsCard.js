import { Typography, Box } from "@mui/material";
import Image from "next/image";
import style from "../../styles/homePage/style.module.css";
import { useRouter } from "next/router";
import Stretch from "../helpers/stretch";
function NewsCard({ item }) {
  const Router = useRouter();
  return (
    <div
      className={style.newsCard}
      onClick={() => Router.push(`/news/${item.id}`)}
    >
      <Stretch
        image={item?.images[0] ? item?.images[0] : "/images/no-image.png"}
      />
      <Typography
        variant="h6"
        component="h6"
        color="onCard.dark"
        align="left"
        sx={{
          whiteSpace: "nowrap",
          width: "90%",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {item?.title}
      </Typography>
      <Typography
        variant="caption"
        component="span"
        align="left"
        color="onCard.light"
        sx={{ mt: "10px" }}
      >
        {item?.publishingDate}
      </Typography>

      <div
        className={`flex-center ${style.ImageSize}`}
        style={{ margin: "15px 0px" }}
      >
        <img
          src={
            item?.images?.length > 0 ? item?.images[0] : "/images/no-image.png"
          }
          alt="ProjectName"
          layout="fill"
          className="imgEffect"
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: item?.description }}
        style={{ height: "auto", overflow: "hidden" }}
      ></div>
      {/* <Typography
        variant="caption"
        component="p"
        align="left"
        color="onCard.main"
        sx={{ lineHeight: "1.8", letterSpacing: "0.8px" }}
      >
        {item?.description}
      </Typography> */}
    </div>
  );
}
export default NewsCard;
