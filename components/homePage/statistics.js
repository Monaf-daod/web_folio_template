import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import style from "../../styles/homePage/style.module.css";
import { Grid, Container, Typography, Box } from "@mui/material";
import Countup from "react-countup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FAB from "@fortawesome/free-brands-svg-icons";
import * as FAS from "@fortawesome/free-solid-svg-icons";
import * as FAR from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function Statistics({ data, theme }) {
  // const data = [1, 2, 3, 4];
  const getIcon = (name) => {
    const str = name;
    const newStr = "f" + str?.slice(1);
    return newStr;
  };
  const [scrollTop, setScrollTop] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > 2600) setScrollTop(true);
  };
  useEffect(() => {
    if (typeof window === "object") {
      document.addEventListener("scroll", handleScroll);
    }
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={style.statisticsContainer}>
      <div className={style.statisticsOverlay}></div>
      <div className={style.statisticsinner}>
        <Container maxWidth="lg" sx={{ paddingBottom: "100px" }}>
          <Grid container sx={{ justifyContent: "space-evenly" }}>
            {data?.items?.map((item, index) => {
              return (
                <Grid item xs={12} md={6} lg={3} key={index}>
                  <div className={style.statisticsinfoCont}>
                    <Box sx={{ color: "primary.main", position: "relative" }}>
                      <CircularProgressbar
                        value={scrollTop == true ? 100 : 0}
                        strokeWidth={4}
                        className={style.circleProgress}
                        styles={buildStyles({
                          root: {},
                          pathColor: `${theme?.primaryColor}`,
                          pathTransitionDuration: 1.8,
                        })}
                      />

                      {scrollTop == true ? (
                        <Box className={style.numberInc}>
                          <Countup
                            end={item.quantity}
                            prefix="+"
                            duration={1.8}
                            startOnMount={true}
                          />
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                    <div className={style.statisinfo}>
                      <FontAwesomeIcon
                        icon={
                          FAB[getIcon(item.icon)] != null
                            ? FAB[getIcon(item.icon)]
                            : FAS[getIcon(item.icon)] != null
                            ? FAS[getIcon(item.icon)]
                            : FAR[getIcon(item.icon)] != null
                            ? FAR[getIcon(item.icon)]
                            : ""
                        }
                        style={{ color: `${theme?.primaryColor}` }}
                      />
                      <Typography
                        variant="body1"
                        component="span"
                        className={style.statisText}
                      >
                        {item.title}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    </div>
  );
}
export default Statistics;
