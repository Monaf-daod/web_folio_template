import { GET_DYNAMIC_PAGE } from "../../services/endpoints";

import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Carousel from "react-material-ui-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Rectangle } from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
import { ArrowRightAlt } from "@mui/icons-material";
import MainCover from "../../components/mainCover";
import classes from "../../styles/projectDetails/style.module.css";
import useFetch from "../../components/useFetch/useFetch";
import CustomLoader from "../../components/customLoader";
import VidoeComp from "../../components/videoComp/videoComp";
import Head from "next/head";

export default function NewPage({ data, headerType }) {
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({
    title: data?.data?.title,
    description: data?.data?.description,
    image: data?.data?.image,
    breadcrumbs: [
      {
        title: "home",
        link: "/",
      },
      {
        title: data?.data?.title,
        link: ``,
      },
    ],
    headerType: headerType,
  });
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
        <title>{data?.data?.item?.title}</title>
        <meta
          name="description"
          content={data?.data?.item?.seoDescription}
        ></meta>
        {data?.data?.item?.seo?.seoTags?.map((item, index) => {
          return <meta name="keywords" content={item} key={index}></meta>;
        })}
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
          <Container maxWidth="lg" sx={{ paddingBottom: "75px" }}>
            <Grid container sx={{ mt: "-40px", py: "50px" }}>
              <Grid item xs={12} md={6}>
                {/* <Typography
                variant="subtitle1"
                color="onCard.main"
                my={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                details :
              </Typography> */}
                {/* <Typography
            variant="body1"
            color="onBackground.main"
            sx={{ lineHeight: "2rem" }}
          >
            {data?.data?.description}
          </Typography> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.data?.description,
                  }}
                  style={{ padding: "6px 12px" }}
                ></div>
              </Grid>
              <Grid item xs={12} md={6} sx={{ color: "primary.main" }}>
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
                    {data?.data?.mediaItems?.map((item, i) => (
                      <div key={i}>
                        {item?.type == 1 && (
                          <img
                            key={i}
                            src={item?.thumbnailUrl}
                            className={classes.carsoulDetails}
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
          </Container>
        </Box>
      </div>
    </div>
  );
}
export const getServerSideProps = async (context) => {
  const [getFetch] = useFetch();
  const addpage = context?.params?.addpage;
  const locale = context?.locale;
  const res = await getFetch(
    GET_DYNAMIC_PAGE(addpage),
    process.env.NEXT_PUBLIC_MERCHANT,
    locale
  );
  const data = await res?.json();
  return {
    props: {
      data: data,
    },
  };
};
