import { Typography, Grid, Box, Button, Radio } from "@mui/material";
import style from "../../styles/payment/style.module.css";
export default function PaymentForm({ theme }) {
  return (
    <Box
      sx={{
        backgroundColor: "card.main",
        boxShadow: `0px 0px ${theme?.elevation}px`,
        borderRadius: theme?.radius,
        p: 3,
      }}
    >
      <Box
        sx={{
          boxShadow: `0px 0px ${theme?.elevation}px`,
          borderRadius: theme?.radius,
          mb: 5,
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <Typography
            variant="subtitle1"
            component="h6"
            sx={{ color: "onCard.dark", fontWeight: "500" }}
          >
            Payment options
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "onCard.light" }}
          >
            Be sure to click on correct payment option
          </Typography>
        </div>
        <div style={{ marginBottom: "30px" }}>
          <Typography
            variant="subtitle1"
            component="h6"
            sx={{ color: "onCard.dark", fontWeight: "500" }}
          >
            John Doe
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "onCard.light" }}
          >
            US Unlocked Debit Card 12XX XXXX XXXX 0000
          </Typography>
        </div>
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
          }}
        >
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "onCard.light", mr: "10px" }}
          >
            Enter CVV:
          </Typography>
          <input type="password" className={style.inputPay} />
          <Button
            className={style.btn}
            sx={{
              backgroundColor: "primary.main",
              color: "onPrimary.main",
              me: "10px",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "onPrimary.main",
                borderColor: "primary.main",
              },
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          boxShadow: `0px 0px ${theme?.elevation}px`,
          borderRadius: theme?.radius,
          mb: 5,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Radio name="paymentRadio" size="medium" sx={{ p: "0px" }} />
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "onCard.light", mx: "10px" }}
          >
            Enter CVV: Credit / Debit / ATM Card
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Radio name="paymentRadio" size="medium" sx={{ p: "0px" }} />
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "onCard.light", mx: "10px" }}
          >
            Enter CVV: Credit / Debit / ATM Card
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Radio name="paymentRadio" size="medium" sx={{ p: "0px" }} />
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "onCard.light", mx: "10px" }}
          >
            Enter CVV: Credit / Debit / ATM Card
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Radio name="paymentRadio" size="medium" sx={{ p: "0px" }} />
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "onCard.light", mx: "10px" }}
          >
            Enter CVV: Credit / Debit / ATM Card
          </Typography>
        </div>
      </Box>
    </Box>
  );
}
