import pizza from '../images/pizza.avif'
import pasta from '../images/pasta.jpg'
import choco_sweet from '../images/choco_sweet.jpg'
import lemon_meringue from '../images/lemon_meringue.jpg'
import mobile_pizza from '../images/mobile_pizza.jpg';
import mobile_pasta from '../images/mobile_pasta.jpg';
import mobile_dessert from '../images/mobile_dessert.jpg';
import mobile_donuts from '../images/mobile_donuts.jpg';
import '../__style__/carousel.css';
import { useEffect, useState } from 'react';

const Carousel = () => {

  const [isDesktop, setDesktop] = useState(window.innerWidth > 1200);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 1200);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [isDesktop]);

  console.log(isDesktop, 'isDesktop');

  return isDesktop ?
    (
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner carousel-high">
          <div className="carousel-item active">
            <img src={pizza} className="d-block w-100" alt="image1" />
          </div>
          <div className="carousel-item">
            <img src={pasta} className="d-block w-100" alt="image2" />
          </div>
          <div className="carousel-item">
            <img src={choco_sweet} className="d-block w-100" alt="image3" />
          </div>
          <div className="carousel-item">
            <img src={lemon_meringue} className="d-block w-100" alt="image4" />
          </div>
        </div>
      </div>
    )
    :
    (
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner carousel-high">
          <div className="carousel-item active">
            <img src={mobile_pizza} className="d-block w-100" alt="image1" />
          </div>
          <div className="carousel-item">
            <img src={mobile_pasta} className="d-block w-100" alt="image2" />
          </div>
          <div className="carousel-item">
            <img src={mobile_dessert} className="d-block w-100" alt="image3" />
          </div>
          <div className="carousel-item">
            <img src={mobile_donuts} className="d-block w-100" alt="image4" />
          </div>
        </div>
      </div>
    );
}


export default Carousel;