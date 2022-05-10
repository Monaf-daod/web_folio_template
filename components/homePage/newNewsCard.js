import { Box, Typography } from "@mui/material";
import style from "../../styles/homePage/style.module.css";

export default function NNewsCard({ item }) {
  function convertToPlain(html) {
    if (typeof window === "object") {
      let tempDivElement = document.createElement("div");
      tempDivElement.innerHTML = html;
      return tempDivElement.textContent || tempDivElement.innerText || "";
    }
  }
  return (
    <Box
      sx={{ position: "relative", height: "270px", mb: 4, overflow: "hidden" }}
    >
      <img
        src={item?.images?.length > 0 ? item?.images[0] : ""}
        width="100%"
        height="100%"
        className="imgEffect"
      />
      <Box
        sx={{
          background: "#C9A20970",
          position: "absolute",
          bottom: "0px",
          height: "108px",
          p: 1,
        }}
      >
        <Typography variant="h6" component="h6" color="onBackground.dark">
          {item?.title}
        </Typography>
        {/* <div
          dangerouslySetInnerHTML={{ __html: item?.description }}
          style={{ height: "auto", background: "transparent" }}
        ></div> */}
        <Typography
          variant="body2"
          component="p"
          color="onBackground.main"
          sx={{
            margin: "3px 0px",
            overflow: "hidden",
          }}
          className="overFlow"
        >
          {convertToPlain(item?.description)}
        </Typography>
      </Box>
    </Box>
  );
}
