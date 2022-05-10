import Head from "next/head";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { GET_HOME_INFO } from "../services/endpoints";
import {
  checkLoadImages,
  getSEOKeywordsContent,
} from "../utilies/utiliesFuctions";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Container, Box, Typography } from "@mui/material";
import FixedBackgroundNew from "../components/homePage/FixedBackgroundNew";
import BackgroundStyle from "../components/homePage/backgroundSty";
import ProjectCard from "../components/homePage/projectCard";
import GalleryCard from "../components/homePage/gallerycard";
import VideoBackground from "../components/homePage/videoBackground";
import useFetch from "../components/useFetch/useFetch";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Approach from "../components/homePage/approach";
import Intro from "../components/homePage/intro";
import Services from "../components/homePage/servicesN";
import Feature from "../components/homePage/feature";
import Statistics from "../components/homePage/statistics";
import Testimonial from "../components/homePage/testimonial";
import { projectParams } from "../components/helpers/projectsParamCarsoul";
import { clientParams } from "../components/helpers/clientParamCarsoul";
import { testimonialParams } from "../components/helpers/TestimonilaParamCarsoul";
import { serviceParamCarsoul } from "../components/helpers/serviceParamCarsoul";
import ContactUs from "../components/homePage/contactus";
import FixedBackgroundNewParallex from "../components/homePage/FixedBackgroundNewParallex";
import FixedBackgroundNewParticles from "../components/homePage/FixedBackgroundParticles";
import CustomLoader from "../components/customLoader";
import ClientCard from "../components/homePage/clientCard";
import style from "../styles/homePage/style.module.css";
import classes from "../styles/override/overrideCarsoul.module.css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import "swiper/css/controller";

export default function Home(props) {
  const { data, theme, headerType } = props;
  const Router = useRouter();
  const [loading, setLoading] = useState(true);
  const swiperProjRef = useRef(null);
  const swiperTestRef = useRef(null);
  const swiperServicetRef = useRef(null);
  const swiperClientRef = useRef(null);
  let { t, lang } = useTranslation("common");
  const goNext = (swiperRef) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const goPrev = (swiperRef) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const gallery = data?.data?.sectionsContent?.gallery || [];
  SwiperCore.use([Navigation, Pagination]);
  useEffect(() => {
    checkLoadImages(setLoading);
  }, []);

  return (
    <div style={{ backgroundColor: theme?.backgroundColor }}>
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
        className={!loading ? "none" : undefined}
      >
        <CustomLoader />
      </div>
      <div className={loading ? "hidden" : undefined}>
        <Head>
          <title>{t("home")}</title>
          <meta name="description" content={data?.data?.seo?.seoDescription} />
          {data?.data?.seo?.seoTags.length > 0 ? (
            <meta
              name="keywords"
              content={getSEOKeywordsContent(data.data.seo.seoTags)}
            />
          ) : null}
        </Head>
        <Box>
          {data?.data?.headerSection?.type == 1 && (
            <>
              <FixedBackgroundNew
                data={data?.data?.headerSection?.content}
                headerType={headerType}
              />
              <Feature
                data={data?.data?.sectionsContent?.feature}
                theme={theme}
                headerType={headerType}
              />
            </>
          )}
          {data?.data?.headerSection?.type == 2 && (
            <>
              <BackgroundStyle
                data={data?.data?.headerSection?.content}
                theme={theme}
                headerType={headerType}
              />
              <Feature
                data={data?.data?.sectionsContent?.feature}
                theme={theme}
                headerType={headerType}
              />
            </>
          )}
          {data?.data?.headerSection?.type == 3 && (
            <>
              <VideoBackground
                data={data?.data?.headerSection?.content}
                headerType={headerType}
              />

              <Feature
                data={data?.data?.sectionsContent?.feature}
                theme={theme}
                headerType={headerType}
              />
            </>
          )}
          {data?.data?.headerSection?.type == 5 && (
            <>
              <FixedBackgroundNewParallex
                data={data?.data?.headerSection?.content}
                headerType={headerType}
              />
              <Feature
                data={data?.data?.sectionsContent?.feature}
                theme={theme}
                headerType={headerType}
              />
            </>
          )}
          {(data?.data?.headerSection?.type == 6 ||
            data?.data?.headerSection?.type == 4) && (
            <>
              <FixedBackgroundNewParticles
                data={data?.data?.headerSection?.content}
                headerType={headerType}
              />
              <Feature
                data={data?.data?.sectionsContent?.feature}
                theme={theme}
                headerType={headerType}
              />
            </>
          )}
        </Box>

        {data?.data?.webLayout?.sections.map((section, index) => {
          return (
            <Box key={index}>
              <div style={{ width: "100%" }}>
                {section.name == "services" && (
                  <div style={{ width: "100%" }}>
                    <div
                      data-aos="zoom-in"
                      style={{ width: "100%", marginTop: "1rem" }}
                    >
                      <div>
                        <Typography
                          variant="h6"
                          component="h6"
                          sx={{ color: "onBackground.light" }}
                          className={style.subsectionTitle}
                        >
                          {data?.data?.sectionsContent?.services?.detail?.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component="p"
                          sx={{ color: "onBackground.main" }}
                          className={style.subsectionsubTitle}
                        >
                          {
                            data?.data?.sectionsContent?.services?.detail
                              ?.subTitle
                          }
                        </Typography>
                      </div>
                      <Box
                        color="primary.main"
                        sx={{ position: "relative", paddingBottom: "100px" }}
                        className={classes.boxArrow}
                      >
                        <ArrowBackIosIcon
                          onClick={() => goNext(swiperServicetRef)}
                          className={classes.leftArrow}
                        />
                        <ArrowForwardIosIcon
                          onClick={() => goPrev(swiperServicetRef)}
                          className={classes.rightArrow}
                        />
                        <Container maxWidth="lg">
                          <Swiper
                            {...serviceParamCarsoul}
                            ref={swiperServicetRef}
                            dir={Router.locale == "ar" ? "rtl" : "ltr"}
                            style={{
                              width: "100%",
                              margin: "0px auto",
                              color: "inherit",
                              height: "490px",
                              padding: "0px 20px",
                              paddingTop: "20px",
                            }}
                          >
                            {data?.data?.sectionsContent?.services?.items?.map(
                              (service, index) => {
                                return (
                                  <div key={index}>
                                    <SwiperSlide
                                      dir={
                                        Router.locale == "ar" ? "RTL" : "LTR"
                                      }
                                    >
                                      <Services item={service} theme={theme} />
                                    </SwiperSlide>
                                  </div>
                                );
                              }
                            )}
                          </Swiper>
                        </Container>
                      </Box>
                    </div>
                  </div>
                )}
                {section.name == "introSection" && (
                  <div>
                    <Container maxWidth="lg" sx={{ paddingBottom: "100px" }}>
                      <Intro
                        data={data?.data?.sectionsContent?.introSection}
                        theme={theme}
                      />
                    </Container>
                  </div>
                )}
                {section.name == "testimonial" && (
                  <div style={{ paddingBottom: "100px" }}>
                    <div>
                      <Typography
                        variant="h6"
                        component="h6"
                        sx={{ color: "onBackground.light" }}
                        className={style.subsectionTitle}
                      >
                        {
                          data?.data?.sectionsContent?.testimonial?.detail
                            ?.title
                        }
                      </Typography>
                      <Typography
                        variant="p"
                        component="p"
                        sx={{ color: "onBackground.main" }}
                        className={style.subsectionsubTitle}
                      >
                        {
                          data?.data?.sectionsContent?.testimonial?.detail
                            ?.subTitle
                        }
                      </Typography>
                    </div>
                    <Box
                      color="primary.main"
                      sx={{ position: "relative" }}
                      className={classes.boxArrow}
                    >
                      <ArrowBackIosIcon
                        onClick={() => goNext(swiperTestRef)}
                        className={classes.leftArrow}
                      />
                      <ArrowForwardIosIcon
                        onClick={() => goPrev(swiperTestRef)}
                        className={classes.rightArrow}
                      />
                      <Swiper
                        {...testimonialParams}
                        ref={swiperTestRef}
                        dir={Router.locale == "ar" ? "rtl" : "ltr"}
                        style={{
                          width: "90%",
                          margin: "0px auto",
                          color: "inherit",
                          height: "240px",
                        }}
                        className="swiper-pagination"
                      >
                        <Container
                          maxWidth="lg"
                          sx={{ paddingBottom: "100px" }}
                        >
                          {data?.data?.sectionsContent?.testimonial?.items?.map(
                            (item) => {
                              return (
                                <SwiperSlide
                                  dir={Router.locale == "ar" ? "rtl" : "ltr"}
                                  key={item.id}
                                >
                                  <Testimonial data={item} />
                                </SwiperSlide>
                              );
                            }
                          )}
                        </Container>
                      </Swiper>
                    </Box>
                  </div>
                )}
                {section.name == "projects" && (
                  <div data-aos="fade-down" data-aos-easing="linear">
                    <div>
                      <Typography
                        variant="h6"
                        component="h6"
                        sx={{ color: "onBackground.light" }}
                        className={style.subsectionTitle}
                      >
                        {data?.data?.sectionsContent?.projects?.detail?.title}
                      </Typography>
                      <Typography
                        variant="p"
                        component="p"
                        sx={{ color: "onBackground.main" }}
                        className={style.subsectionsubTitle}
                      >
                        {
                          data?.data?.sectionsContent?.projects?.detail
                            ?.subTitle
                        }
                      </Typography>
                    </div>

                    <Box
                      color="primary.main"
                      sx={{ position: "relative", paddingBottom: "100px" }}
                      className={classes.boxArrow}
                    >
                      <ArrowBackIosIcon
                        onClick={() => goNext(swiperProjRef)}
                        className={classes.leftArrow}
                      />
                      <ArrowForwardIosIcon
                        onClick={() => goPrev(swiperProjRef)}
                        className={classes.rightArrow}
                      />
                      <Container maxWidth="lg">
                        <Swiper
                          {...projectParams}
                          ref={swiperProjRef}
                          dir={Router.locale == "ar" ? "rtl" : "ltr"}
                          style={{
                            width: "100%",
                            margin: "0px auto",
                            color: "inherit",
                            height: "490px",
                          }}
                        >
                          {data?.data?.sectionsContent?.projects?.items?.map(
                            (project, index) => {
                              return (
                                <div key={index}>
                                  <SwiperSlide
                                    dir={Router.locale == "ar" ? "RTL" : "LTR"}
                                  >
                                    <ProjectCard
                                      item={project}
                                      url={`/projects/${project.slug}`}
                                    />
                                  </SwiperSlide>
                                </div>
                              );
                            }
                          )}
                        </Swiper>
                      </Container>
                    </Box>
                  </div>
                )}
                {section.name == "news" && <></>}
                {section.name == "approach" && (
                  <div data-aos="fade-right">
                    <Container maxWidth="lg">
                      <Approach
                        key={index}
                        data={data?.data?.sectionsContent?.approach}
                        theme={theme}
                      />
                    </Container>
                  </div>
                )}
                {section.name == "ourClient" && (
                  <div style={{ width: "100%" }}>
                    <div data-aos="zoom-in" style={{ width: "100%" }}>
                      <div>
                        <Typography
                          variant="h6"
                          component="h6"
                          sx={{ color: "onBackground.light" }}
                          className={style.subsectionTitle}
                        >
                          {
                            data?.data?.sectionsContent?.ourClient?.detail
                              ?.title
                          }
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component="p"
                          sx={{ color: "onBackground.main" }}
                          className={style.subsectionsubTitle}
                        >
                          {
                            data?.data?.sectionsContent?.ourClient?.detail
                              ?.subTitle
                          }
                        </Typography>
                      </div>
                      <Box
                        color="primary.main"
                        sx={{ position: "relative", paddingBottom: "100px" }}
                        className={classes.boxArrow}
                      >
                        <ArrowBackIosIcon
                          onClick={() => goNext(swiperClientRef)}
                          className={classes.leftArrow}
                        />
                        <ArrowForwardIosIcon
                          onClick={() => goPrev(swiperClientRef)}
                          className={classes.rightArrow}
                        />
                        <Container maxWidth="lg">
                          <Swiper
                            {...clientParams}
                            ref={swiperClientRef}
                            dir={Router.locale == "ar" ? "rtl" : "ltr"}
                            style={{
                              width: "100%",
                              margin: "0px auto",
                              color: "inherit",
                              height: "490px",
                              padding: "0px 20px",
                              paddingTop: "20px",
                            }}
                          >
                            {data?.data?.sectionsContent?.ourClient?.items?.map(
                              (client, index) => {
                                return (
                                  <div key={client?.id}>
                                    <SwiperSlide
                                      dir={
                                        Router.locale == "ar" ? "RTL" : "LTR"
                                      }
                                    >
                                      <ClientCard item={client} theme={theme} />
                                    </SwiperSlide>
                                  </div>
                                );
                              }
                            )}
                          </Swiper>
                        </Container>
                      </Box>
                    </div>
                  </div>
                )}
                {section.name == "communicateus" && (
                  <ContactUs
                    data={data?.data?.sectionsContent?.communicateus}
                    theme={theme}
                  />
                )}

                {section.name == "statistic" && (
                  <div>
                    <Statistics
                      data={data?.data?.sectionsContent?.statistic}
                      theme={theme}
                    />
                  </div>
                )}
                {section.name == "gallery" && (
                  <div
                    className="flex-between scrollX"
                    style={{
                      width: "90%",
                      margin: "0px auto",
                      alignItems: "center",
                    }}
                  >
                    {gallery.length > 0 && (
                      <GalleryCard
                        width="350px"
                        height={415}
                        image={gallery[0]}
                      />
                    )}
                    {gallery.length > 1 && (
                      <GalleryCard
                        width="293px"
                        height={333}
                        image={gallery[1]}
                      />
                    )}
                    {gallery.length > 2 && (
                      <GalleryCard
                        width="240px"
                        height={415}
                        image={gallery[2]}
                      />
                    )}
                    {gallery.length > 3 && (
                      <GalleryCard
                        width="208px"
                        height={333}
                        image={gallery[3]}
                      />
                    )}
                  </div>
                )}
              </div>
            </Box>
          );
        })}
      </div>
    </div>
  );
}
export async function getStaticProps({ locale }) {
  const [getFetch] = useFetch();
  let data = null;
  const res = await getFetch(
    GET_HOME_INFO,
    process.env.NEXT_PUBLIC_MERCHANT,
    locale
  );
  data = await res?.json();
  return {
    props: {
      data: data || "",
    },
  };
}
