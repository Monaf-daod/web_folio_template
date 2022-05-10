import { Typography, Box } from "@mui/material";
import { borderColor } from "@mui/system";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/homePage/style.module.css";
function NewServiceCard({ item }) {
  const Router = useRouter();
  const [scrollTop, setScrollTop] = useState(false);
  function convertToPlain(html) {
    if (typeof window === "object") {
      let tempDivElement = document.createElement("div");
      tempDivElement.innerHTML = html;
      return tempDivElement.textContent || tempDivElement.innerText || "";
    }
  }
  const handleScroll = () => {
    if (window.scrollY < 270) setScrollTop(false);
    if (window.scrollY > 270) setScrollTop(true);
  };
  useEffect(() => {
    if (typeof window === "object")
      document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex-card" style={{ gap: "25px" }}>
      <Box
        sx={{
          borderRadius: "50%",
          border: "1px solid",
          borderColor: "primary.main",
          padding: { xs: "0px 15px", md: "51px 16px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85px",
          background: "#FFFFFF",
          mt: 2,
        }}
        className="serviceImgEffect"
      >
        <img
          src={item.image}
          onClick={() => Router.push(`/services/subservices?id=${item.id}`)}
          className={styles.imageSize}
        />
      </Box>
      <div style={{ width: "200px" }}>
        <Typography
          variant="h6"
          component="h6"
          color="#FFFFFF"
          sx={{ mb: 0, cursor: "pointer" }}
          onClick={() => Router.push(`/services/subservices?id=${item.id}`)}
          className={scrollTop == true ? "titleAnimate" : ""}
        >
          {item.title}
        </Typography>
        {/* <div
          dangerouslySetInnerHTML={{ __html: item?.description }}
          style={{ height: "auto", overflow: "hidden" }}
        ></div> */}
        <Typography
          variant="body2"
          component="p"
          color="#FFFFFF"
          sx={{
            margin: "3px 0px",
          }}
          className={scrollTop == true ? "textanimate overFlow" : "overFlow"}
        >
          {convertToPlain(item?.description)}
        </Typography>
      </div>
    </div>
  );
}
export default NewServiceCard;
