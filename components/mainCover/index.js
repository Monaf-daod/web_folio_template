import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import classes from "../../styles/mainCover/style.module.css";
import { Grid, Typography, Container } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { headerTypes } from "../../constants/enums";
const MainCoverSection = ({
  breadcrumbs,
  title = "",
  description = "",
  image = "",
  headerType,
}) => {
  let { t, lang } = useTranslation("common");

  const breadcrumbsList = breadcrumbs.map((item, index) => {
    if (index + 1 != breadcrumbs?.length)
      return (
        <Link key={index} color="inherit" href={item.link}>
          <Typography
            color="white"
            sx={{
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
              fontWeight: "bold",
            }}
          >
            {t(item?.title)}
          </Typography>
        </Link>
      );
    else
      return (
        <Typography key={index} color="white" sx={{ fontWeight: "bold" }}>
          {t(item?.title || "")}
        </Typography>
      );
  });
  return (
    <div
      className={
        headerType == headerTypes.colored
          ? classes.coverContainer
          : classes.coverContainerHeaderTransparent
      }
    >
      <Image
        src={image}
        className={
          headerType == headerTypes.colored
            ? classes.imageContainer
            : classes.imageContainerHeaderTransparent
        }
        alt="coverImage"
        layout="fill"
        priority
      />
      <div className={classes.overLayDivBehindImage} />
      <Container
        maxWidth="lg"
        sx={{
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100%",
          paddingTop: headerType == headerTypes.colored ? "unset" : "2rem",
        }}
      >
        <Grid container>
          <Grid item xs={8} md={4}>
            <Typography variant="h3" color="white" sx={{ fontWeight: "500" }}>
              {t(title || "")}
            </Typography>
            <Typography
              variant="subtitle1"
              color="white"
              sx={{
                fontWeight: "400",
                display: {
                  sm: "block",
                },
              }}
            >
              {description}
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Stack sx={{ zIndex: 5 }}>
              <Breadcrumbs
                separator={
                  lang == "ar" ? (
                    <ArrowBackIosNewIcon
                      fontSize="small"
                      sx={{ fill: "white" }}
                    />
                  ) : (
                    <ArrowForwardIosIcon
                      fontSize="small"
                      sx={{ fill: "white" }}
                    />
                  )
                }
                aria-label="breadcrumb"
              >
                {breadcrumbsList}
              </Breadcrumbs>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MainCoverSection;
