import Image from "next/image";
import { Typography, Box } from "@mui/material";
import style from "../../styles/teamPage/style.module.css";
export default function TeamCard({ data, theme }) {
  return (
    <Box
      className={style.teamCard}
      sx={{
        backgroundColor: "card.main",
        color: "onCard.main",
        boxShadow: `0px 0px ${theme?.elevation}px`,
        borderRadius: theme?.radius,
      }}
    >
      <div className="flex-column">
        <div style={{ height: "200px" }} className="flex-center">
          <Image
            src={data?.image ?? "/images/team.png"}
            alt="teamImage"
            className={style.teamImage}
            width={90}
            height={90}
          />
        </div>
        <Typography
          variant="h6"
          component="h6"
          color="onCard.dark"
          sx={{ px: 2 }}
        >
          {data?.fullName}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          color="onCard.main"
          align="center"
          sx={{ px: 2, my: 1 }}
        >
          {data?.position}
        </Typography>
      </div>
    </Box>
  );
}
