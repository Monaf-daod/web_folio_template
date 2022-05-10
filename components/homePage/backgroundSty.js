// import Carousel from "react-material-ui-carousel";
import { Typography, Button, Grid, Box, Container } from "@mui/material";
import style from "../../styles/homePage/style.module.css";
import { Rectangle } from "@mui/icons-material";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import CircleIcon from "@mui/icons-material/Circle";
import { useState, useRef, useEffect } from "react";
import { backgroundParams } from "../helpers/backgroundParamCarsoul";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import "swiper/css/controller";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { headerTypes } from "../../constants/enums";
export default function BackgroundStyle(props) {
  const { data, headerType } = props;
  const [active, setActive] = useState(0);
  const [navbarNodeHeight, setNavbarNodeHeight] = useState(0);
  const Router = useRouter();
  let { t, lang } = useTranslation("common");
  const [activeIndex, setActiveIndex] = useState(1);
  const [swiper, setSwiper] = useState(0);
  const swiperbackRef = useRef(null);
  const [displayNavigationArrows, setDislayNavigationArrows] = useState(false);

  /// handling and calculate hero section height (%vh of cleint screen)
  useEffect(() => {
    if (typeof window === "object") {
      let temp =
        document.getElementById("navbar").offsetHeight *
        (100 / document.documentElement.clientHeight);
      setNavbarNodeHeight(temp);
    }
  }, []);

  SwiperCore.use([Navigation, Pagination, Autoplay]);
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

  const toggleDisolayArrows = () =>
    +setDislayNavigationArrows(!displayNavigationArrows);
  return (
    <div style={{ position: "relative", marginBottom: "48px" }}>
      <div
        className={style.backgroundSty}
        onMouseEnter={toggleDisolayArrows}
        onMouseLeave={toggleDisolayArrows}
      >
        <Box
          sx={{ color: "primary.main", backgroundColor: "primary.main" }}
          id="backsliders"
        >
          <ArrowBackIosIcon
            onClick={() => goPrev(swiperbackRef)}
            style={{
              backgroundColor: "transparent",
              color: "inherit",
              position: "absolute",
              top: "50%",
              left: "0px",
              zIndex: "2",
              cursor: "pointer",
              transform: "translateY(-50%)",
              padding: "0px 17px",
              width: "80px",
              height: "80px",
              opacity: `${displayNavigationArrows ? "1" : "0"}`,
            }}
            className="hideArrowMobile"
          />
          <ArrowForwardIosIcon
            onClick={() => goNext(swiperbackRef)}
            style={{
              backgroundColor: "transparent",
              color: "inherit",
              position: "absolute",
              top: "50%",
              right: "0px",
              zIndex: "2",
              cursor: "pointer",
              transform: "translateY(-50%)",
              padding: "0px 17px",
              width: "80px",
              height: "80px",
              opacity: `${displayNavigationArrows ? "1" : "0"}`,
            }}
            className="hideArrowMobile"
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "4vh",
              right: "0px",
              zIndex: "3",
              padding: "0px 17px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { sx: "row", md: "column" },
            }}
          >
            {data.map((item, index) => {
              return (
                <CircleIcon
                  style={{
                    margin: "4px 8px",
                    color:
                      activeIndex == 0 && index == 0
                        ? "inherit"
                        : activeIndex <= data.length
                        ? activeIndex - 1 == index
                          ? "inherit"
                          : "#c4c4c4"
                        : (activeIndex % data.length) - 1 == index
                        ? "inherit"
                        : "#c4c4c4",
                    cursor: "pointer",
                  }}
                  key={index}
                  onClick={() => swiper.slideTo(index + 1)}
                />
              );
            })}
          </Box>
          <Swiper
            {...backgroundParams}
            ref={swiperbackRef}
            speed={1500}
            onSlideChange={(swiperCore) => {
              const { activeIndex, snapIndex, previousIndex, realIndex } =
                swiperCore;
              setActiveIndex(activeIndex);
            }}
            onSwiper={(swiper) => setSwiper(swiper)}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="swipperWrapper"
            dir="ltr"
          >
            {data?.map((item, i) => (
              <SwiperSlide
                key={item.id}
                dir={Router.locale == "ar" ? "rtl" : "ltr"}
              >
                <div
                  style={{
                    width: "100%",
                    height:
                      headerType == headerTypes.colored
                        ? `${100 - navbarNodeHeight}vh`
                        : "100vh",
                  }}
                >
                  <img
                    src={item?.images ? item?.images : "/images/no-image.png"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      zIndex: "-1",
                      top: "0px",
                      left: "0px",
                      right: "0px",
                      bottom: "0px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      height: "100%",
                      width: "100%",
                      backgroundColor: "#00000082",
                      opacity: "0.55",
                      zIndex: "-1",
                    }}
                  ></div>
                  <Container maxWidth="lg" sx={{ height: "100%" }}>
                    <div
                      className={
                        activeIndex == 0
                          ? "flex-header textanimate"
                          : activeIndex > data.length
                          ? (activeIndex % data.length) - 1 == i
                            ? "flex-header textanimate"
                            : "flex-header"
                          : activeIndex - 1 == i
                          ? "flex-header textanimate"
                          : "flex-header"
                      }
                    >
                      <Typography
                        variant="h1"
                        componet="h1"
                        sx={{
                          fontWeight: "500",
                          marginBottom: "16px",
                          textTransform: "capitalize",
                          color: "white",
                          lineHeight: "1.2",
                          paddingRight: {
                            md: Router.locale !== "ar" ? "40%" : "",
                          },
                          paddingLeft: {
                            md: Router.locale == "ar" ? "40%" : "",
                          },
                          textAlign: "start",
                        }}
                        className="fontHeaderSize"
                      >
                        {item?.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="p"
                        sx={{
                          fontSize: { xs: "12px", md: "22px" },
                          fontWeight: "400",
                          lineHeight: "1.4",
                          color: "white",
                          margin: "0px",
                          maxWidth: "50%",
                          textAlign: "start",
                        }}
                      >
                        {item?.description}
                      </Typography>
                      {item?.buttonText != null && (
                        <Button
                          onClick={() => window.open(item?.buttonUrl, "_blank")}
                          className="heroButton"
                          sx={{
                            background: "transparent",
                            "&:hover": {
                              backgroundColor: "primary.main",
                              borderColor: "primary.main",
                            },
                          }}
                        >
                          {item?.buttonText}
                        </Button>
                      )}
                    </div>
                  </Container>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </div>
    </div>
  );
}
