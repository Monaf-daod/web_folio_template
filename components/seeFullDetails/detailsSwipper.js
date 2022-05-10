import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useRef, useEffect } from "react";
import { detailsParam } from "./detailsParamCrsoul";
import style from "../../styles/seeFullDetails/style.module.css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import "swiper/css/controller";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
export default function DetailSwipper({ data, theme }) {
  const [swiper, setSwiper] = useState(0);
  const swiperDetailRef = useRef(null);
  const Router = useRouter();
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
  SwiperCore.use([Navigation, Pagination]);

  return (
    <div style={{ position: "relative" }}>
      <Box
        className={style.leftArrow}
        sx={{
          color: `${theme?.primaryColor}`,
          "&:hover": {
            color: `${theme?.onPrimaryColor}`,
            backgroundColor: theme?.primaryColor,
          },
        }}
      >
        <ArrowForwardIosIcon
          onClick={() => goPrev(swiperDetailRef)}
          sx={{ transform: "rotate(180deg) translate(1px, 0px)" }}
        />
      </Box>
      <Box
        className={style.rightArrow}
        sx={{
          color: `${theme?.primaryColor}`,
          "&:hover": {
            color: `${theme?.onPrimaryColor}`,
            backgroundColor: theme?.primaryColor,
          },
        }}
      >
        <ArrowForwardIosIcon onClick={() => goNext(swiperDetailRef)} />
      </Box>
      <Swiper
        {...detailsParam}
        ref={swiperDetailRef}
        speed={1500}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        dir="ltr"
      >
        {[1, 2, 3, 4]?.map((item, i) => (
          <SwiperSlide
            key={item.id}
            dir={Router.locale == "ar" ? "rtl" : "ltr"}
          >
            <div>
              <img
                src={item?.images ? item?.images : "/images/no-image.png"}
                width="100%"
                height="400px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
