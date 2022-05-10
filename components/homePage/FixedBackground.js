import Image from "next/image";
import style from "../../styles/homePage/style.module.css";
import { Typography, Button, Grid, Box } from "@mui/material";
import useTranslation from "next-translate/useTranslation";

function FixedBackground(props) {
  const { title, description, images } = props;
  let { t, lang } = useTranslation("common");
  return (
    <div>
      <img
        src="/images/background.png"
        width="100%"
        height="360px"
        className={style.headerBackground}
      />
      {/* <Grid container spacing={4}>
        <Grid item xs={12}> */}{" "}
      <Box p={3} mt={6}>
        <Typography
          variant="h6"
          component="h6"
          color="onBacground.dark"
          sx={{ mb: 2, fontWeight: "500", mt: "4%" }}
        >
          {title}
        </Typography>
        <Typography variant="subtitle1" color="onBacground.main" component="p">
          {description}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 5 }}
          onClick={() => Router.push("/projects")}
        >
          {t("CheckWork")}
        </Button>
      </Box>
      {/* </Grid> */}
      {/* <Grid item xs={12} md={6}>
          <Box mt={8}>
            <img src="/images/background.png" width="517px" height="517px" />
          </Box>
        </Grid> */}
      {/* </Grid> */}
    </div>
  );
}
export default FixedBackground;
