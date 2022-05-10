import { Typography } from "@mui/material";
import Image from "next/image";
import style from "../../styles/homePage/style.module.css";
import { useRouter } from "next/router";
import Stretch from "../helpers/stretch";
function ServiceCard({ item }) {
  const Router = useRouter();
  function convertToPlain(html) {
    if (typeof window === "object") {
      let tempDivElement = document.createElement("div");
      tempDivElement.innerHTML = html;
      return tempDivElement.textContent || tempDivElement.innerText || "";
    }
  }
  return (
    <div
      className={style.serviceCard}
      onClick={() => Router.push(`/services/subservices?id=${item?.id}`)}
    >
      <img
        src={item?.image ? item?.image : "/images/no-image.png"}
        alt="ServiceName"
        layout="cover"
        width="70px"
        height="70px"
      />
      <div>
        <Typography
          variant="h6"
          component="h6"
          color="onCard.dark"
          align="center"
          sx={{ my: 1 }}
        >
          {item?.title}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          color="onCard.main"
          sx={{
            margin: "15px 0px",
            pr: 2,
            lineHeight: "2",
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
export default ServiceCard;
