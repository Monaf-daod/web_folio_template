import { Typography, Button } from "@mui/material";
import style from "../../styles/seeFullDetails/style.module.css";
export default function DetailInfo({ theme }) {
  return (
    <div style={{ padding: "0px 15px" }}>
      <Typography
        variant="h6"
        component="h6"
        sx={{ color: "onBackground.dark", mb: 5 }}
      >
        Color Item Type / Name
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        sx={{
          color: "onBackground.main",
          mb: 2,
          fontWeight: "400",
          lineHeight: "163%",
        }}
      >
        19.99 AED
      </Typography>
      <Typography
        variant="body2"
        component="p"
        sx={{ color: "onBackground.light", lineHeight: 2.6 }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Typography>
      <div className={style.deailButonCont}>
        <Button
          className={style.detailButton}
          sx={{
            backgroundColor: "primary.main",
            color: "onPrimary.main",
            borderRadius: theme?.radius,
            border: "1px solid transparent",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "onPrimary.main",
              borderColor: "primary.main",
            },
          }}
        >
          Add to Cart
        </Button>
        <Button
          className={style.detailButton}
          sx={{
            "&:hover": {
              backgroundColor: "primary.main",
              color: "onPrimary.main",
              borderRadius: theme?.radius,
            },
            border: "1px solid transparent",

            color: "primary.main",
            backgroundColor: "onPrimary.main",
            borderColor: "primary.main",
          }}
        >
          Wishlist
        </Button>
      </div>
    </div>
  );
}
