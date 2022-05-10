import { Typography } from "@mui/material";
import Image from "next/image";
import style from "../../styles/homePage/style.module.css";
import { useRouter } from "next/router";
import Stretch from "../helpers/stretch";
function SubServiceCard({ item }) {
  function convertToPlain(html) {
    if (typeof window === "object") {
      let tempDivElement = document.createElement("div");
      tempDivElement.innerHTML = html;
      return tempDivElement.textContent || tempDivElement.innerText || "";
    }
  }

  const Router = useRouter();
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <div
      className={style.subServiceCard}
      onClick={() => Router.push(`/services/${item?.slug}`)}
    >
      {item?.mediaItems?.map((img, i) => {
        return (
          <div key={i} style={{ overflow: "hidden", width: "100%" }}>
            {img.isFeature == true && (
              <img
                src={
                  img?.thumbnailUrl ? img?.thumbnailUrl : "/images/no-image.png"
                }
                alt="ServiceName"
                width="100%"
                className="imgEffect"
                height="200px"
                style={{ borderRadius: "5px", objectFit: "cover" }}
              />
            )}
          </div>
        );
      })}
      <div>
        <Typography
          variant="h6"
          component="h6"
          color="onCard.dark"
          sx={{ my: 1, px: 2 }}
        >
          {item?.title}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          color="onCard.main"
          sx={{
            width: "100%",
            margin: "auto",
            marginTop: "10px",
            overflow: "hidden",
            px: 2,
          }}
          className="overFlow"
        >
          {convertToPlain(item?.description)}
        </Typography>
        {/* <div
          dangerouslySetInnerHTML={{ __html: item?.description }}
          style={{ height: "auto" }}
        ></div> */}
      </div>
    </div>
  );
}
export default SubServiceCard;
