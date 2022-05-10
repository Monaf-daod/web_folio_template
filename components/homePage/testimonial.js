import style from "../../styles/homePage/style.module.css";
import { Box, Typography } from "@mui/material";
function Testimonial({ data }) {
  return (
    <Box
      className={style.testimonialCard}
      sx={{ color: "primary.main", backgroundColor: "card.main" }}
    >
      <img
        src={data?.image}
        width="70px"
        height="70px"
        className={style.testimg}
      />
      <div>
        <Typography
          variant="body1"
          component="p"
          sx={{ color: "onCard.main" }}
          className={`${style.testicommet} overflow`}
        >
          {data?.content}
        </Typography>
        <Typography
          variant="subtitle2"
          component="h6"
          sx={{ color: "primary.main" }}
          className={style.testN}
        >
          {data?.name}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ color: "onCard.light" }}
          className={style.testrank}
        >
          {data?.position}
        </Typography>
      </div>
    </Box>
  );
}
export default Testimonial;
