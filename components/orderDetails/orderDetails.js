import { Grid, Typography, Box } from "@mui/material";
import style from "../../styles/orders/style.module.css";
import DetailItem from "./detailItem";
import DetailInfo from "./detailinfo";
export default function Details({ theme }) {
  return (
    <Box sx={{ backgroundColor: "card.main", p: 3 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h6" sx={{ color: "onCard.main" }}>
            Product
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" component="h6" sx={{ color: "onCard.main" }}>
            Total
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" component="h6" sx={{ color: "onCard.main" }}>
            Status
          </Typography>
        </Grid>
        <hr
          className={style.orderDiv}
          style={{ borderColor: theme?.dividerColor }}
        />
      </Grid>
      {[1, 2, 3, 4].map((item) => {
        return <DetailItem theme={theme} />;
      })}
      <hr
        className={style.orderDiv}
        style={{ borderColor: theme?.dividerColor }}
      />
      <DetailInfo />
    </Box>
  );
}
