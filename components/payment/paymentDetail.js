import { Typography, Box } from "@mui/material";
import style from "../../styles/payment/style.module.css";
export default function PaymentDetails({ theme }) {
  return (
    <Box
      sx={{
        backgroundColor: "card.main",
        p: 3,
        boxShadow: `0px 0px ${theme?.elevation}px`,
        borderRadius: theme?.radius,
      }}
    >
      {" "}
      <div>
        <Typography
          variant="subtitle1"
          component="h6"
          sx={{ color: "onCard.main", mb: 3, fontWeight: "500" }}
        >
          Price Details
        </Typography>
        <Typography
          variant="body2"
          component="p"
          sx={{ color: "onCard.main", mb: 1 }}
        >
          Price of 3 items
        </Typography>
        <Typography
          variant="body2"
          component="p"
          sx={{ color: "onCard.main", mb: 1 }}
        >
          Delivery Charges
        </Typography>
        <hr
          className={style.orderDiv}
          style={{ borderColor: theme?.dividerColor }}
        />
        <Typography
          variant="body2"
          component="p"
          sx={{ color: "onCard.main", mb: 1 }}
        >
          Price of 3 items
        </Typography>
      </div>
    </Box>
  );
}
