import { Typography, Grid, Popover } from "@mui/material";
import style from "../../styles/orders/style.module.css";
import StarRatings from "react-star-ratings";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
export default function Item({ data, theme }) {
  const changeRating = () => {};
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid item md={2}>
            <Typography variant="h6" component="h6">
              Order ID
            </Typography>
          </Grid>
          <Grid item md={3}>
            <StarRatings
              rating={3}
              starRatedColor={theme?.primaryColor}
              starSelectingHoverColor={theme?.primaryColor}
              changeRating={changeRating}
              numberOfStars={6}
              starDimension="14px"
              starSpacing="1px"
              name="cartRating"
            />
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="h6">
                Total
              </Typography>
              <MoreVertIcon
                className={style.optionIcon}
                onClick={handleClick}
              />
              <Popover
                id={data?.id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <div>
                  <Typography
                    variant="subtitle2"
                    component="h6"
                    className={style.optiontext}
                  >
                    Edit
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="h6"
                    className={style.optiontext}
                  >
                    Delete
                  </Typography>
                </div>
              </Popover>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
