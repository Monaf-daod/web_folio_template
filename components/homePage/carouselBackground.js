import Image from "next/image";
import style from "../../styles/homePage/style.module.css";
import { Typography, Button, Grid, Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Rectangle } from "@mui/icons-material";
function CarouselBackground(props) {
  const { images } = props;
  return (
    <div>
      <img
        src="/images/background.png"
        width="100%"
        height="200px"
        className={style.headerBackground}
      />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {" "}
          <Box p={3} mt={10}>
            <Typography
              variant="h4"
              component="h4"
              color="onBackground.dark"
              sx={{ mb: 2, fontWeight: "500" }}
            >
              We build
              <br /> mobile applications
              <br /> and websites from idea to launch
            </Typography>
            <Typography
              variant="subtitle1"
              color="onBackground.main"
              component="p"
            >
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before the final copy
            </Typography>
            <Button variant="outlined" color="" sx={{ mt: 2 }}>
              Check our work
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mt={8}>
            <Carousel
              NextIcon={<ArrowForwardIosIcon style={{ fontSize: "14px" }} />}
              PrevIcon={<ArrowBackIosIcon style={{ fontSize: "14px" }} />}
              IndicatorIcon={<Rectangle />}
              next={(next, active) => {
                // console.log(`we left ${active}, and are now at ${next}`)
              }}
              prev={(prev, active) => {
                // console.log(`we left ${active}, and are now at ${prev}`);
              }}
            >
              {images.map((item, i) => (
                <img
                  key={i}
                  src={item ? item : "/images/no-image.png"}
                  width="100%"
                  height="400px"
                />
              ))}
            </Carousel>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
export default CarouselBackground;
