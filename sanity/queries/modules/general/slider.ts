import { image } from "../../fragments/image";

export const sliderQuery = `
    slides[]{
        image{
            ${image}
        },  
    },
    options{
      loop,
      autoplay,
      autoplayDelay,
      showArrows,
      showDots
    }
`;