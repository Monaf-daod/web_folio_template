import { useState, useEffect } from "react";
import { Grid, Typography, Container, Divider, Box } from "@mui/material";
import MainCover from "../components/mainCover";
import GalleryImage from "../components/galleryItem";
import { GET_GALLERY } from "../services/endpoints";
import useFetch from "../components/useFetch/useFetch";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import FullImage from "../components/helpers/fullImage";
import CustomLoader from "../components/customLoader";

const gallery = ({ data, headerType }) => {
  let { t } = useTranslation("common");
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({
    title: data?.data?.pageDetail?.title,
    image: data?.data?.pageDetail?.image,
    description: "",
    breadcrumbs: [
      {
        title: "home",
        link: "/",
      },
      {
        title: "gallery",
        link: "",
      },
    ],
    headerType: headerType,
  });
  const handlegalleryImages = (imagesArr) => {
    let tempArrays = [];
    let temp = [...imagesArr];
    while (temp.length) {
      tempArrays.push(temp.splice(0, 3));
    }
    return tempArrays;
  };
  const [galleryImages, setGalleryImages] = useState(
    handlegalleryImages(data?.data?.pageItems)
  );

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
        <Head>
          <title>{t("gallery")}</title>
        </Head>
        <MainCover
          breadcrumbs={pageInfo.breadcrumbs}
          title={pageInfo.title}
          description={pageInfo.description}
          image={pageInfo.image}
          headerType={headerType}
        />
        <Box sx={{ backgroundColor: "background.main" }}>
          <Container maxWidth="lg" sx={{ paddingBottom: "100px" }}>
            <Grid container rowSpacing={5} columnSpacing={3} mt={"-40px"}>
              {galleryImages.map((arrItem, index) => {
                if (index % 2 === 0)
                  return arrItem.map((galleryItem, ind) => (
                    <Grid
                      item
                      xs={ind + 1 == arrItem.length ? 12 : 6}
                      md={4}
                      key={ind}
                    >
                      <GalleryImage
                        item={galleryItem}
                        images={data?.data?.pageItems}
                      />
                    </Grid>
                  ));
                else
                  return arrItem.map((galleryItem, ind) => {
                    if (ind % 2 === 0)
                      return (
                        <Grid
                          item
                          xs={ind + 1 == arrItem.length ? 12 : 6}
                          md={3}
                          key={ind}
                        >
                          <GalleryImage
                            item={galleryItem}
                            images={data?.data?.pageItems}
                          />
                        </Grid>
                      );
                    else
                      return (
                        <Grid
                          item
                          xs={ind + 1 == arrItem.length ? 12 : 6}
                          md={6}
                          key={index}
                        >
                          <GalleryImage
                            item={galleryItem}
                            images={data?.data?.pageItems}
                          />
                        </Grid>
                      );
                  });
              })}
            </Grid>
          </Container>
        </Box>
      </div>
    </div>
  );
};

export default gallery;
export async function getStaticProps({ locale }) {
  const [getFetch] = useFetch();
  // const data = null;

  const res = await getFetch(
    GET_GALLERY,
    process.env.NEXT_PUBLIC_MERCHANT,
    locale
  );
  const data = await res?.json();
  // } catch (e) {}
  return {
    props: {
      data: data || "",
    },
  };
}
