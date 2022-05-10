import ForestIcon from "@mui/icons-material/Forest";
import { Typography, Container, Box, Divider, Grid } from "@mui/material";
import style from "../../styles/homePage/style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FAB from "@fortawesome/free-brands-svg-icons";
import * as FAS from "@fortawesome/free-solid-svg-icons";
import * as FAR from "@fortawesome/free-regular-svg-icons";

function Feature({ data, theme, headerType }) {
  const getIcon = (name) => {
    const str = name;
    const newStr = "f" + str?.slice(1);
    return newStr;
  };
  return (
    <div>
      <Container maxWidth="lg" sx={{ display: { xs: "none", md: "block" } }}>
        <div>
          <Grid container>
            {data?.items?.map((item, index) => {
              return (
                <Grid item xs={12} md={3} key={index}>
                  <div className={style.featureCont}>
                    <Box
                      sx={{
                        backgroundColor:
                          index % 2 == 0 ? "primary.main" : "primary.light",
                        padding: "25px 40px",
                        "&::after": {
                          backgroundColor:
                            index % 2 == 0 ? "primary.main" : "primary.light",
                        },
                      }}
                      className={style.boxFeature}
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
                        className={style.featureIcon}
                        style={{ color: `${theme?.onPrimaryColor}` }}
                      />
                      <Typography
                        variant="subtitle1"
                        component="h2"
                        className={style.featureText}
                        style={{ color: `${theme?.onPrimaryColor}` }}
                      >
                        {item?.title}
                      </Typography>
                    </Box>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Container>
    </div>
  );
}
export default Feature;
