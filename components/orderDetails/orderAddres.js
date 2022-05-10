import { Typography, Box } from "@mui/material";
import style from "../../styles/orders/style.module.css";

export default function OrderAddress({ theme }) {
  return (
    <Box sx={{ backgroundColor: "card.main", p: 3 }}>
      {" "}
      <div>
        <Typography
          variant="subtitle1"
          component="h6"
          sx={{ color: "onCard.main", mb: 3, fontWeight: "500" }}
        >
          Billing Address
        </Typography>
        <Typography
          variant="body2"
          component="h6"
          sx={{ color: "onCard.main", mb: 3 }}
        >
          9447 Glen Eagles Drive
        </Typography>
        <Typography
          variant="body2"
          component="h6"
          sx={{ color: "onCard.main", mb: 3 }}
        >
          Dubai
        </Typography>
        <Typography
          variant="body2"
          component="h6"
          sx={{ color: "onCard.main", mb: 3 }}
        >
          +971 56655665
        </Typography>
        <Typography
          variant="body2"
          component="h6"
          sx={{ color: "onCard.main", mb: 3 }}
        >
          John@gmail.com
        </Typography>
        <hr
          className={style.orderDiv}
          style={{ borderColor: theme?.dividerColor }}
        />
      </div>
      <div>
        <Typography
          variant="subtitle1"
          component="h6"
          sx={{
            color: "onCard.main",
            mb: 3,
            fontWeight: "500",
            color: "onCard.main",
          }}
        >
          Shipping Address
        </Typography>
        <Typography
          variant="body2"
          component="h6"
          sx={{ color: "onCard.main", mb: 3, color: "onCard.main" }}
        >
          9447 Glen Eagles Drive
        </Typography>
        <Typography
          variant="body2"
          component="h6"
          sx={{ color: "onCard.main", mb: 3, color: "onCard.main" }}
        >
          Dubai
        </Typography>
        <Typography
          variant="body2"
          component="h6"
          sx={{ color: "onCard.main", mb: 3, color: "onCard.main" }}
        >
          +971 56655665
        </Typography>
        <Typography
          variant="body2"
          component="h6"
          sx={{ color: "onCard.main", mb: 3, color: "onCard.main" }}
        >
          John@gmail.com
        </Typography>
      </div>
    </Box>
  );
}
