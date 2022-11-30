import pizza from '../images/pizza.avif'
import pasta from '../images/pasta.jpg'
import choco_sweet from '../images/choco_sweet.jpg'
import lemon_meringue from '../images/lemon_meringue.jpg'
import mobile_pizza from '../images/mobile_pizza.jpg';
import mobile_pasta from '../images/mobile_pasta.jpg';
import mobile_dessert from '../images/mobile_dessert.jpg';
import mobile_donuts from '../images/mobile_donuts.jpg';
import '../__style__/carousel.css';

const Carousel = () => (
  <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner carousel-high">
      <div className="carousel-item active">
        <img src={mobile_pizza} srcSet={`${mobile_pizza} 300w, ${mobile_pizza} 769w, ${pizza} 1280w`} className="d-block w-100" alt="image1" />
      </div>
      <div className="carousel-item">
        <img src={mobile_pasta} srcSet={`${mobile_pasta} 300w, ${mobile_pasta} 769w, ${pasta} 1280w`} className="d-block w-100" alt="image2" />
      </div>
      <div className="carousel-item">
        <img src={mobile_dessert} srcSet={`${mobile_dessert} 300w, ${mobile_dessert} 769w, ${choco_sweet} 1280w`} className="d-block w-100" alt="image3" />
      </div>
      <div className="carousel-item">
        <img src={mobile_donuts} srcSet={`${mobile_donuts} 300w, ${mobile_donuts} 76w, ${lemon_meringue} 1280w`} className="d-block w-100" alt="image4" />
      </div>
    </div>
  </div>
);

export default Carousel;