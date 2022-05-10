import { Grid, Typography, Box } from "@mui/material";
import style from "../../styles/orders/style.module.css";
export default function DetailInfo({ theme }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            component="h6"
            sx={{ pt: 2, fontWeigh: "500" }}
          >
            SubTotal
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" component="h6" sx={{ pt: 2 }}>
            220.00 AED
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            component="h6"
            sx={{ pt: 2, fontWeigh: "500" }}
          >
            Shipping
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" component="h6" sx={{ pt: 2 }}>
            220.00 AED
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            component="h6"
            sx={{ pt: 2, fontWeigh: "500" }}
          >
            Tax
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" component="h6" sx={{ pt: 2 }}>
            220.00 AED
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            component="h6"
            sx={{ pt: 2, fontWeigh: "500" }}
          >
            Payment Method
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" component="h6" sx={{ pt: 2 }}>
            Cash
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle2"
            component="h6"
            sx={{ pt: 2, fontWeigh: "500" }}
          >
            Total
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" component="h6" sx={{ pt: 2 }}>
            220.00 AED
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}></Grid>
      </Grid>
    </div>
  );
}
