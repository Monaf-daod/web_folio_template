import MainCoverSection from "../../components/mainCover";
import SubServiceCard from "../../components/homePage/subserviceCard";
import { useState, useEffect } from "react";
import { Grid, Typography, Container, Divider, Box } from "@mui/material";
import useFetch from "../../components/useFetch/useFetch";
import { SubServicesAPI } from "../../services/endpoints";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import AutoPagination from "../../components/customPagination";
import CustomLoader from "../../components/customLoader";
import { useRouter } from "next/router";
import ProjectCard from "../../components/homePage/projectCard";
export default function SubServices(props) {
  const { data, headerType } = props;
  const [loading, setLoading] = useState(true);
  const Router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(data?.pageItems?.totalPages);
  let { t } = useTranslation("common");
  const [pageInfo, setPageInfo] = useState({
    title: data?.data?.pageDetail?.title,
    description: data?.data?.pageDetail?.description,
    image: data?.data?.pageDetail?.image,
    breadcrumbs: [
      {
        title: "home",
        link: "/",
      },
      {
        title: "services",
        link: "/services",
      },
    ],
    headerType: headerType,
  });
  const handleChangeCurrentPage = (e, value) => {
    setCurrentPage(value);
    Router.push(`${Router.asPath}?p=${currentPage}`);
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
        <MainCoverSection
          breadcrumbs={pageInfo.breadcrumbs}
          title={pageInfo.title}
          description={pageInfo.description}
          image={pageInfo.image}
          headerType={headerType}
        />
        <Box sx={{ backgroundColor: "background.main" }}>
          <Container maxWidth="lg" sx={{ paddingBottom: "75px" }}>
            <Head>
              <title>{t("services")}</title>
            </Head>
            <Grid container rowSpacing={5} columnSpacing={3}>
              {data?.data?.pageItems?.items?.map((item) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <ProjectCard item={item} url={`/services/${item.slug}`} />
                  </Grid>
                );
              })}
            </Grid>
            <Grid container mt={3}>
              <Grid
                item
                xs={12}
                md={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <AutoPagination
                  currentPage={currentPage}
                  pageCount={pageCount}
                  onChangeCurrentPage={handleChangeCurrentPage}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
    </div>
  );
}
export const getServerSideProps = async (context) => {
  let page = context?.query?.p || 1;
  let id = context?.query?.id || 0;
  let locale = context?.locale;
  const [getFetch] = useFetch();
  const res = await getFetch(
    SubServicesAPI(id, page, 6),
    process.env.NEXT_PUBLIC_MERCHANT,
    locale
  );
  const data = await res?.json();
  return {
    props: {
      data: data || "",
    },
  };
};
