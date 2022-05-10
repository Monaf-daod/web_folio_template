import TeamCard from "../components/Team/teamCard";
import { Grid, Container, Box } from "@mui/material";
import MainCoverSection from "../components/mainCover";
import { useState, useEffect } from "react";
import useFetch from "../components/useFetch/useFetch";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { GET_TEAM } from "../services/endpoints";
import CustomLoader from "../components/customLoader";

export default function Team({ data, theme, headerType }) {
  let { t } = useTranslation("common");
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({
    title: data?.data?.pageDetail?.title || "",
    image: data?.data?.pageDetail?.image,
    description: "",
    breadcrumbs: [
      {
        title: "home",
        link: "/",
      },
      {
        title: "team",
        link: "",
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
          <Container maxWidth="lg" sx={{ paddingBottom: "100px" }}>
            <Head>
              <title>{t("teams")}</title>
            </Head>
            <Grid
              container
              rowSpacing={5}
              columnSpacing={3}
              sx={{
                justifyContent: "flex-start",
              }}
            >
              {data?.data?.pageItems?.map((item) => {
                return (
                  <Grid item xs={12} md={3} key={item?.employeeId}>
                    <TeamCard data={item} theme={theme} />
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>
      </div>
    </div>
  );
}
export async function getStaticProps({ locale }) {
  const [getFetch] = useFetch();
  let data = null;
  try {
    const res = await getFetch(
      GET_TEAM,
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
