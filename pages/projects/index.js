import { useState, useEffect } from "react";
import { Grid, Typography, Container, Divider, Box } from "@mui/material";
import MainCoverSection from "../../components/mainCover";
import AutoPagination from "../../components/customPagination";
import useFetch from "../../components/useFetch/useFetch";
import { GET_PROJECTS } from "../../services/endpoints";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import ProjectVideo from "../../components/projectsPage/projectVideo";
import { useRouter } from "next/router";
import ProjectCard from "../../components/homePage/projectCard";
import CustomLoader from "../../components/customLoader";

const Projects = (props) => {
  const { data, headerType } = props;
  const Router = useRouter();
  const [loading, setLoading] = useState(true);
  let { t } = useTranslation("common");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(data?.pageItems?.totalPages);
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
        link: "",
      },
    ],
    headerType: headerType,
  });

  const handleChangeCurrentPage = (e, value) => {
    setCurrentPage(value);
    Router.push(`${Router.asPath}?p=${currentPage}`);
  };
  const projects = data?.data?.pageItems?.items;

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
          <title>{t("projects")}</title>
        </Head>
        <MainCoverSection
          breadcrumbs={pageInfo.breadcrumbs}
          title={pageInfo.title}
          description={pageInfo.description}
          image={pageInfo.image}
          headerType={headerType}
        />
        <Box sx={{ backgroundColor: "background.main" }}>
          <Container maxWidth="lg" sx={{ paddingBottom: "75px" }}>
            <Grid container rowSpacing={5} columnSpacing={3}>
              {projects?.map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ProjectCard
                    item={project}
                    url={`/projects/${project.slug}`}
                  />
                </Grid>
              ))}
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
};
export default Projects;
export async function getStaticProps(context) {
  let page = context?.query?.p || 1;
  let locale = context?.locale;
  const [getFetch] = useFetch();
  const res = await getFetch(
    GET_PROJECTS(page, 6),
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
