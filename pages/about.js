import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Carousel from "react-material-ui-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleIcon from "@mui/icons-material/Circle";
import { ArrowRightAlt } from "@mui/icons-material";
import MainCover from "../components/mainCover";
import classes from "../styles/projectDetails/style.module.css";
import useFetch from "../components/useFetch/useFetch";
import useTranslation from "next-translate/useTranslation";
import { AboutUS } from "../services/endpoints";
import VidoeComp from "../components/videoComp/videoComp";
import CustomLoader from "../components/customLoader";
import Image from "next/image";
import FullImage from "../components/helpers/fullImage";

const About = (props) => {
  const { data, headerType } = props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [urlImage, setImageUrl] = useState();
  const router = useRouter();
  let { t, lang } = useTranslation("common");
  const [pageInfo, setPageInfo] = useState({
    title: data?.data?.pageDetail?.title,
    image: data?.data?.pageDetail?.image,
    description: data?.data?.pageDetail?.description,
    breadcrumbs: [
      {
        title: "home",
        link: "/",
      },
      {
        title: "about",
        link: "",
      },
    ],
    headerType: headerType,
  });

  const about = {
    id: 4,
    title: data?.data?.pageItems?.title,
    description: data?.data?.pageItems?.description,
    images: data?.data?.pageItems?.mediaItems,
  };
  function checkLoadImages() {
    if (typeof window == "object") {
      Promise.all(
        Array.from(document.images).map((img) => {
          if (img.complete) return Promise.resolve(img.naturalHeight !== 0);
          return new Promise((resolve) => {
            img.addEventListener("load", () => resolve(true));
            img.addEventListener("error", () => resolve(false));
          });
        })
      ).then((results) => {
        if (results.every((res) => res)) setLoading(false);
        else setLoading(false);
      });
    }
  }
  useEffect(() => {
    checkLoadImages();
  }, []);
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "#fcfcfc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: "1000",
        }}
        className={loading == false && "none"}
      >
        <CustomLoader />
      </div>
      <MainCover
        breadcrumbs={pageInfo.breadcrumbs}
        description={pageInfo.description}
        title={pageInfo.title}
        image={pageInfo.image}
        headerType={headerType}
      />
      <Box sx={{ backgroundColor: "background.main" }}>
        <Container maxWidth="lg" sx={{ paddingBottom: "75px" }}>
          <Grid container pt={5} mt={"-40px"}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                color="onBackground.light"
                mt={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                {t("about")} :
              </Typography>
              <Grid item xs={12} md={10}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: about?.description,
                  }}
                  style={{ padding: "6px 12px", height: "auto" }}
                ></div>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ color: "primary.main" }}>
                <Carousel
                  IndicatorIcon={<CircleIcon fontSize="10px" />}
                  indicatorIconButtonProps={{
                    style: {
                      margin: "4px 4px", // 4 px for top,down  and 5 for right,left
                      color: "#c4c4c4",
                      fontSize: "10px",
                    },
                  }}
                  activeIndicatorIconButtonProps={{
                    style: {
                      color: "inherit", // it takes its color from Box parent
                    },
                  }}
                  indicatorContainerProps={{
                    style: {
                      marginTop: "0px", // 5
                      textAlign: "center", // 4
                    },
                  }}
                  navButtonsProps={{
                    // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                    style: {
                      backgroundColor: "transparent",
                      borderRadius: 0,
                      color: "inherit",
                      top: "50% !important",
                      transform: "translateY(-50%)",
                    },
                  }}
                  navButtonsWrapperProps={{
                    // Move the buttons to the bottom. Unsetting top here to override default style.
                    style: {
                      bottom: "0",
                      top: "unset",
                    },
                  }}
                  NextIcon={
                    <ArrowForwardIosIcon
                      style={{ fontSize: "40px", color: "inherit" }}
                    />
                  }
                  PrevIcon={
                    <ArrowBackIosIcon
                      style={{ fontSize: "40px", color: "inherit" }}
                    />
                  }
                >
                  {about?.images?.map((item, i) => (
                    <>
                      {item?.type == 1 && (
                        <img
                          key={item?.thumbnailUrl}
                          src={item?.thumbnailUrl}
                          className={classes.carsoulDetails}
                          onClick={() => {
                            setOpen(true);
                            setImageUrl(item.url);
                          }}
                        />
                      )}
                      {item?.type == 2 && (
                        <VidoeComp
                          video={item?.thumbnailUrl}
                          image={item?.coverImage}
                        />
                      )}
                    </>
                  ))}
                </Carousel>
              </Box>
            </Grid>
          </Grid>
          {open == true && (
            <FullImage
              open={open}
              setOpen={setOpen}
              image={urlImage}
              images={about.images}
            />
          )}
        </Container>
      </Box>
    </div>
  );
};

export default About;
export async function getStaticProps({ locale }) {
  const [getFetch] = useFetch();
  const res = await getFetch(AboutUS, process.env.NEXT_PUBLIC_MERCHANT, locale);
  const data = await res?.json();
  return {
    props: {
      data: data || "",
    },
  };
}
