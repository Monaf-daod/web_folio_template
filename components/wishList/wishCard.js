import { Typography, Button, Box } from "@mui/material";
import StarRatings from "react-star-ratings";
import style from "../../styles/wishList/style.module.css";
export default function WishCard({ theme }) {
  const changeRating = () => {};
  return (
    <Box sx={{ backgroundColor: "card.main", color: "onCard.main" }}>
      <img src="/images/1.png" width="100%" height="200px" />
      <div
        style={{ padding: "15px", display: "flex", flexDirection: "column" }}
      >
        <div className={style.wishCont}>
          <StarRatings
            rating={2}
            starRatedColor={theme?.primaryColor}
            starSelectingHoverColor={theme?.primaryColor}
            changeRating={changeRating}
            numberOfStars={4}
            starDimension="20px"
            starSpacing="1px"
            name="ratingWish"
          />
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ color: "onCard.main" }}
          >
            12 AED
          </Typography>
        </div>
        <Typography variant="h6" component="h6" sx={{ color: "onCard.dark" }}>
          Syltherine
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ color: "onCard.light" }}
        >
          Plastic useless plugs tubes for high-fidelity prototyping. Fit Eat!
        </Typography>
        <Button
          className={style.wishButton}
          sx={{
            "&:hover": {
              backgroundColor: "primary.main",
              color: "onPrimary.main",
              borderColor: "primary.main",
            },
          }}
        >
          Add to cart
        </Button>
      </div>
    </Box>
  );
}
