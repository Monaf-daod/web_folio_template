import style from "../../styles/shop/shop.module.css";
import { Box, Typography } from "@mui/material";
import StarRatings from "react-star-ratings";
export default function ShopCard({ theme, data }) {
  const changeRating = () => {};
  return (
    <Box
      className={style.shopCard}
      sx={{
        boxShadow: `0px 0px ${theme?.elevation}px`,
        borderRadius: theme?.radius,
        backgroundColor: theme?.card,
        color: theme?.onCard,
      }}
    >
      <img src="/images/shop.png" width="100%" height="200px" />
      <div style={{ padding: "10px 20px" }}>
        <Typography
          variant="subtitle1"
          component="h6"
          className={style.shopTitle}
          sx={{ color: "onCard.main" }}
        >
          Vintage Typewriter to post awesome stories about UI design and webdev.
        </Typography>
        <Typography
          variant="h6"
          component="h6"
          className={style.shopPrice}
          sx={{ color: "onCard.dark", my: 2 }}
        >
          499 AED
        </Typography>
        <Typography
          variant="subtitle2"
          component="h6"
          className={style.shopText}
          sx={{ color: "onCard.light", mb: 2 }}
        >
          Eligible for Shipping To Mars or somewhere else
        </Typography>
        <div className={style.shopRatCont}>
          <StarRatings
            rating={3}
            starRatedColor={theme?.primaryColor}
            starSelectingHoverColor={theme?.primaryColor}
            changeRating={changeRating}
            numberOfStars={6}
            starDimension="14px"
            starSpacing="1px"
            name="rating"
          />
          <img
            src="/images/cart.jpg"
            width="30px"
            height="30px"
            style={{ objectFit: "cover", cursor: "pointer" }}
          />
        </div>
      </div>
    </Box>
  );
}
