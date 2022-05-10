import {
  Typography,
  Container,
  Box,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import IntroVideo from "./introVideo";
import style from "../../styles/homePage/style.module.css";
function Intro({ data, theme }) {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ backgroundColor: "primary.main" }}>
          <div className={style.introCont}>
            <Typography
              varaint="subtitle1"
              component="span"
              className={style.introTitle}
              style={{ color: `${theme?.onPrimaryColor}` }}
            >
              {data?.items?.title}
            </Typography>
            <Typography
              variant="h6"
              component="h6"
              className={style.introText}
              style={{ color: `${theme?.onPrimaryColor}` }}
            >
              {data?.items?.subTitle}
            </Typography>
            <Button
              className={style.introButton}
              sx={{
                boxShadow: `0px 0px ${theme?.elevation}px`,
                borderRadius: theme?.radius,
              }}
              onClick={() => window.open(data?.items?.buttonUrl, "_blank")}
            >
              <DoubleArrowIcon className={style.arrow} /> {data?.items?.button}
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <IntroVideo video={data?.items?.video} image={data?.items?.image} />
        </Grid>
      </Grid>
    </div>
  );
}
export default Intro;
