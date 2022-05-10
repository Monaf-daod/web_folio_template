import { Grid, Typography, Box } from "@mui/material";
import style from "../../styles/orders/style.module.css";
export default function DetailItem({ theme }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box>
            <div
              style={{
                display: "flex",
              }}
            >
              <img
                src="/images/1.png"
                width="80px"
                height="80px"
                style={{ objectFit: "cover" }}
              />
              <Typography
                variant="subtitle2"
                component="h6"
                sx={{ margin: "0px 15px", pt: 2, color: "onCard.main" }}
              >
                Cedar Horse Subha
              </Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography
            variant="subtitle2"
            component="h6"
            sx={{ pt: 2, color: "onCard.main" }}
          >
            220.00 AED
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography
            variant="subtitle2"
            component="h6"
            sx={{ pt: 2, color: "onCard.main" }}
          >
            Confirmed
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
