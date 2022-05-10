import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

import { Box } from "@mui/material";
export default function ContactIcons({ links }) {
  const newContact = links?.filter(
    (item) =>
      item.channel == "Facebook" ||
      item.channel == "Twitter" ||
      item.channel == "Instagram" ||
      item.channel == "WhatsApp"
  );
  return (
    <div className="flex-column iconsPosition">
      {newContact?.map((item, index) => {
        return (
          <Box
            sx={{
              bgcolor: "primary.main",
              padding: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "0px 0px 8px 0px",
            }}
            className="iconContEff"
            onClick={() => window.open(item?.value, "_blank")}
            key={index}
          >
            {item.channel == "Facebook" && (
              <FacebookIcon sx={{ color: "white" }} />
            )}
            {item.channel == "Twitter" && (
              <TwitterIcon sx={{ color: "white" }} />
            )}
            {item.channel == "Instagram" && (
              <InstagramIcon sx={{ color: "white" }} />
            )}
            {item.channel == "WhatsApp" && (
              <WhatsAppIcon sx={{ color: "white" }} />
            )}
          </Box>
        );
      })}
    </div>
  );
}
