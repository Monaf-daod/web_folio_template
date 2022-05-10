import style from "../../styles/homePage/style.module.css";
import { Container, Button, Box, Typography } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
function ContactUs({ data, theme }) {
  return (
    <Box
      className={style.contactCont}
      sx={{
        background: `url(${data?.items?.image})`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className={style.contactOverlay}></div>
      <Container maxWidth="lg">
        <div className={style.contactInfo}>
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "onBackground.main" }}
            className={style.contactP}
          >
            {data?.items?.title}
          </Typography>
          <Button
            className={style.serviceButton}
            sx={{
              backgroundColor: "primary.main",
              color: "onPrimary.main",
              boxShadow: `0px 0px ${theme?.elevation}px`,
              m: "0px !important",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "onPrimary.main",
              },
            }}
            onClick={() => window.open(data?.items?.buttonUrl, "_blank")}
          >
            <DoubleArrowIcon className={style.arrow} />
            {data?.items?.buttonText}
          </Button>
        </div>
      </Container>
    </Box>
  );
}
export default ContactUs;
