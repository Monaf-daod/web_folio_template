import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Carousel from "react-material-ui-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleIcon from "@mui/icons-material/Circle";
import useFetch from "../../components/useFetch/useFetch";
import MainCover from "../../components/mainCover";
import classes from "../../styles/projectDetails/style.module.css";
import { SERVICE_DETAILS } from "../../services/endpoints";
import VidoeComp from "../../components/videoComp/videoComp";
import CustomLoader from "../../components/customLoader";
import Image from "next/image";
import FullImage from "../../components/helpers/fullImage";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
const ServiceDetails = (props) => {
  const router = useRouter();
  let { t } = useTranslation("common");
  const { data, headerType } = props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [urlImage, setImageUrl] = useState();
  const [pageInfo, setPageInfo] = useState({
    title: data?.data?.pageDetail?.title,
    description: data?.data?.pageDetail?.description,
    image: data?.data?.pageDetail?.image,
    breadcrumbs: [
      {
        title: t("home"),
        link: "/",
      },
      {
        title: t("services"),
        link: "/services",
      },
      {
        title: data?.data?.pageItems?.title,
        link: "",
      },
    ],
    headerType: headerType,
  });
  const imageDetail = data?.data?.pageItems?.mediaItems;
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
      <Head>
        <title>{data?.data?.pageItems?.title}</title>
      </Head>
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
      <div className={loading == true && "hidden"}>
        <MainCover
          breadcrumbs={pageInfo.breadcrumbs}
          description={pageInfo.description}
          title={pageInfo.title}
          image={pageInfo.image}
          headerType={headerType}
        />
        <Box sx={{ backgroundColor: "background.main" }}>
          <Container maxWidth="lg" sx={{ paddingBottom: "75px", mt: "-40px" }}>
            <Grid container pt={5} mt={5}>
              <Grid item xs={12} md={6}>
                <Grid item xs={12} md={10}>
                  {/* <Typography
                variant="body1"
                color="onBackground.main"
                sx={{ lineHeight: "2rem" }}
              >
              </Typography> */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.data?.pageItems?.description,
                    }}
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
                    {data?.data?.pageItems?.mediaItems?.map((item, i) => (
                      <div key={i}>
                        {item?.type == 1 && (
                          <img
                            key={i}
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
                      </div>
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
                images={data?.data?.pageItems?.mediaItems}
              />
            )}
          </Container>
        </Box>
      </div>
    </div>
  );
};
export default ServiceDetails;
export async function getServerSideProps(context) {
  const [getFetch] = useFetch();
  let data = null;
  const id = context.params.serviceId;
  let locale = context?.locale;
  try {
    const res = await getFetch(
      SERVICE_DETAILS(id),
      process.env.NEXT_PUBLIC_MERCHANT,
      locale
    );
    data = await res?.json();
  } catch (e) {}
  return {
    props: {
      data: data || "",
    },
  };
}
