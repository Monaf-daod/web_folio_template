import { Grid, Typography, Container, Box } from "@mui/material";
import MainCoverSection from "../../components/mainCover";
import NewsCard from "../../components/news/newsCard";
import { useState, useEffect } from "react";
import { GET_NEWS } from "../../services/endpoints";
import useFetch from "../../components/useFetch/useFetch";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import AutoPagination from "../../components/customPagination";
import CustomLoader from "../../components/customLoader";

export default function Team(props) {
  const { data, theme, headerType } = props;
  const Router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
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
        title: "news",
        link: "",
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
              <title>{t("news")}</title>
            </Head>
            <Grid container spacing={4} sx={{ mt: "-40px" }}>
              {data?.data?.pageItems?.items.map((item) => {
                return (
                  <Grid item xs={12} md={4} key={item.id}>
                    <NewsCard data={item} theme={theme} />
                  </Grid>
                );
              })}
            </Grid>
            <div className="paginationContainer">
              <AutoPagination
                currentPage={currentPage}
                pageCount={pageCount}
                onChangeCurrentPage={handleChangeCurrentPage}
              />
            </div>
          </Container>
        </Box>
      </div>
    </div>
  );
}
export async function getStaticProps(context) {
  let page = context?.query?.p || 1;
  const [getFetch] = useFetch();
  const res = await getFetch(
    GET_NEWS(page, 6),
    process.env.NEXT_PUBLIC_MERCHANT
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}
