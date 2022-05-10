import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Carousel from "react-material-ui-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Rectangle } from "@mui/icons-material";
import { ArrowRightAlt } from "@mui/icons-material";
import MainCover from "../../components/mainCover";
import classes from "../../styles/projectDetails/style.module.css";
import useFetch from "../../components/useFetch/useFetch";
import { GET_NEWS_DETAILS } from "../../services/endpoints";
import VidoeComp from "../../components/videoComp/videoComp";
import Image from "next/image";
import CircleIcon from "@mui/icons-material/Circle";
import CustomLoader from "../../components/customLoader";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

const NewsDetails = ({ data, headerType }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  let { t } = useTranslation("common");
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
        title: "news",
        link: "/news",
      },
      {
        title: data?.data?.pageDetail?.title,
        link: "",
      },
    ],
    headerType: headerType,
  });

  const NewsDetails = {
    id: data?.data?.item?.id,
    title: data?.data?.item?.title,
    subTitle: data?.data?.item?.subTitle,
    images: data?.data?.item?.mediaItems,
  };
  useEffect(() => {
    if (typeof window === "object")
      document.addEventListener("scroll", window.scrollTo(0, 200));
    return () => {
      document.removeEventListener("scroll", window.scrollTo(0, 200));
    };
  }, []);
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
      <div className={loading == true && "hidden"}>
        <MainCover
          breadcrumbs={pageInfo.breadcrumbs}
          description={pageInfo.description}
          title={pageInfo.title}
          image={pageInfo.image}
          headerType={headerType}
        />
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
        <Box sx={{ backgroundColor: "background.main" }}>
          <Container maxWidth="lg" sx={{ paddingBottom: "75px" }}>
            <Grid container sx={{ mt: "-40px", py: 5 }}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  color="onCard.dark"
                  my={3}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {t("details")}
                </Typography>
                <Grid item xs={12} md={10}>
                  {/* <Typography
                variant="body1"
                color="onBackground.main"
                sx={{ lineHeight: "2rem" }}
              >
                {data?.data?.description}
              </Typography> */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.data?.item?.description,
                    }}
                    style={{ padding: "6px 12px" }}
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
                    {NewsDetails?.images?.map((item, i) => (
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
};

export default NewsDetails;
export async function getServerSideProps(context) {
  const [getFetch] = useFetch();
  let data = null;
  const id = context.params.newsId;
  try {
    const res = await getFetch(
      GET_NEWS_DETAILS(id),
      process.env.NEXT_PUBLIC_MERCHANT
    );
    data = await res.json();
  } catch (e) {}
  return {
    props: {
      data: data,
    },
  };
}
// export async function getStaticPaths() {
//   const res = await fetch('https://.../posts')
//   const projects = await res.json()

//   // Get the paths we want to pre-render based on posts
//   const paths = projects.map((project) => ({
//     params: { id: project.id },
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: blocking } will server-render pages
//   // on-demand if the path doesn't exist.
//   return { paths, fallback: 'true' }
// }
