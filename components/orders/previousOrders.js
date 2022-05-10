import { Box, Typography, Grid } from "@mui/material";
import Item from "./item";
import style from "../../styles/orders/style.module.css";
export default function PreviousOrders({ theme }) {
  const data = [1, 2, 3, 4];
  return (
    <Box
      sx={{
        backgroundColor: "card.main",
        color: "onCard.main",
        boxShadow: `0px 0px ${theme?.elevation}px`,
        borderRadius: theme?.radius,
        padding: "30px",
      }}
    >
      <Box>
        <Grid container>
          <Grid item md={2}>
            <Typography variant="h6" component="h6">
              Order ID
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6" component="h6">
              Rating
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6" component="h6">
              Date
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant="h6" component="h6">
              Status
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant="h6" component="h6">
              Total
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <hr
        className={style.orderDivider}
        style={{ borderColor: theme?.dividerColor }}
      />
      {data?.map((item, index) => {
        return (
          <div key={index}>
            <Item theme={theme} />
            {index != data?.length - 1 && (
              <hr
                className={style.orderDivider}
                style={{ borderColor: theme?.dividerColor }}
              />
            )}
          </div>
        );
      })}
    </Box>
  );
}
