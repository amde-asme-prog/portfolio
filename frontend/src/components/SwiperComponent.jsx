import { Swiper } from "swiper/react";
import { EffectFade, Pagination, Navigation } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/effect-fade";

const SwiperComponent = ({ children, breakpoints }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      navigation={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      breakpoints={breakpoints}
      modules={[Pagination, EffectFade]}
      effect=""
      autoplay={true}
      rewind={true}
      className="border border-border_primary mySwiper bg-background_container pb-8 relative"
    >
      {children}
    </Swiper>
  );
};

export default SwiperComponent;
