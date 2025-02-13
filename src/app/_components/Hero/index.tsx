import { Carousel, CarouselContent } from "@/components/ui/carousel";
import FeaturedVideo from "./FeaturedVideo";

const Hero = () => {
  return (
    <Carousel>
      <CarouselContent>
        <FeaturedVideo />
        <FeaturedVideo />
        <FeaturedVideo />
      </CarouselContent>
    </Carousel>
  );
};

export default Hero;
