import { Typography, Button, Grid, Box, Container } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FAB from "@fortawesome/free-brands-svg-icons";
import * as FAS from "@fortawesome/free-solid-svg-icons";
import * as FAR from "@fortawesome/free-regular-svg-icons";
import style from "../../styles/homePage/style.module.css";

export function Approach({ data, theme }) {
  let stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body;
  };
  const getIcon = (name) => {
    const str = name;
    const newStr = "f" + str?.slice(1);
    return newStr;
  };
  return (
    <div className="sectionHeight">
      <Grid container rowSpacing={5}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography
              variant="h6"
              component="h6"
              className={style.sectionTitle}
              sx={{ textAlign: "start", color: "onBackground.light" }}
            >
              {data?.detail.title}
            </Typography>
            <Typography
              variant="h5"
              component="h5"
              className={style.sectionSummary}
              sx={{ textAlign: "start", color: "onBackground.main" }}
            >
              {data?.detail?.subTitle}
            </Typography>
            <Button
              className={style.sectionButton}
              sx={{
                color: "primary.main",
                // backgroundColor: "transparent",
                whiteSpace: "nowrap",
                textAlign: "center",
                borderColor: "primary.main",
                backgroundColor: theme?.backgroundColor,
                borderRadius: theme?.radius,
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: theme?.onPrimaryColor,
                },
              }}
              onClick={() => window.open(data?.detail?.buttonUrl, "_blank")}
            >
              {data?.detail?.button}
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          {data?.items?.map((item, index) => {
            return (
              <div className={style.sectionCont} key={index}>
                <Box
                  className={style.sectionIcon}
                  sx={{
                    color: "primary.main",
                    backgroundColor: theme?.backgroundColor,
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: theme?.onPrimaryColor,
                    },
                  }}
                >
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
                    style={{ width: "35px", height: "35px" }}
                  />
                </Box>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      component="h6"
                      className={style.sectionH4}
                      sx={{ color: "onBackground.main" }}
                    >
                      {item.tilte}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      component="p"
                      className={` ${style.sectionP} overFlow`}
                      sx={{ color: "onBackground.light" }}
                    >
                      {item.subTilte}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}
export default Approach;
