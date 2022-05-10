import { Typography, Box } from "@mui/material";
import style from "../../styles/homePage/style.module.css";
export default function ClientCard({ item, theme }) {
  return (
    <Box
      className={style.clientCont}
      sx={{
        color: "primary.main",
        boxShadow: `0px 0px ${theme?.elevation}px`,
        borderRadius: theme?.radius,
      }}
    >
      <div className={style.clientCardImgCont}>
        <img
          src={item?.logo}
          width="100%"
          height="100%"
          style={{ objectFit: "contain" }}
        />
      </div>
      <Box
        className={style.clientTextCont}
        sx={{ backgroundColor: "primary.light", color: "onPrimary.main" }}
      >
        <Typography variant="h6" component="h6">
          {item?.name}
        </Typography>
      </Box>
    </Box>
  );
}
