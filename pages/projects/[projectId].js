import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Carousel from "react-material-ui-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleIcon from "@mui/icons-material/Circle";
import { ArrowRightAlt } from "@mui/icons-material";
import MainCover from "../../components/mainCover";
import classes from "../../styles/projectDetails/style.module.css";
import { PROJECT_DETAIL, GET_PROJECTS } from "../../services/endpoints";
import useFetch from "../../components/useFetch/useFetch";
import Image from "next/image";
import VidoeComp from "../../components/videoComp/videoComp";
import CustomLoader from "../../components/customLoader";
import Head from "next/head";
import FullImage from "../../components/helpers/fullImage";
import useTranslation from "next-translate/useTranslation";

const ProjectDetails = ({ data, headerType }) => {
  const router = useRouter();
  let { t } = useTranslation("common");
  const [loading, setLoading] = useState(true);
  const [urlImage, setImageUrl] = useState();
  const [open, setOpen] = useState(false);
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
        title: t("projects"),
        link: "/projects",
      },
      {
        title: data?.data?.item?.title,
        link: "",
      },
    ],
    headerType: headerType,
  });

  const projectDetails = {
    id: data?.data?.item?.id,
    title: data?.data?.item?.title,
    startDate: data?.data?.item?.startDate,
    endDate: data?.data?.item?.endDate,
    images: data?.data?.item?.mediaItems,
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
          <Container maxWidth="lg" sx={{ paddingBottom: "75px", mt: "-40px" }}>
            <Grid container pt={5} mt={5}>
              <Grid item xs={12} md={6}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.data?.item?.description,
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
                    {data?.data?.item?.mediaItems?.map((item, i) => (
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
                        {open == true && (
                          <FullImage
                            open={open}
                            setOpen={setOpen}
                            image={urlImage}
                            images={data?.data?.item?.mediaItems}
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

export default ProjectDetails;
export async function getServerSideProps(context) {
  const [getFetch] = useFetch();
  const id = context.params.projectId;
  let locale = context?.locale;
  const res = await getFetch(
    PROJECT_DETAIL(id),
    process.env.NEXT_PUBLIC_MERCHANT,
    locale
  );
  const data = await res?.json();
  return {
    props: {
      data: data || "",
    },
  };
}
