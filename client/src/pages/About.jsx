import React, { useState, useEffect } from "react";
import aboutImg from '../images/aboutpage.png'
import aboutImgMobile from '../images/aboutpageMobile.png'
import '../__style__/about.css';

const About = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <div className="about-container">
      <div className="vh-50 d-flex justify-content-center">
        {isDesktop ? <img className='about-img' src={aboutImg} alt="" srcSet="" /> : <img className='about-img-mobile' src={aboutImgMobile} alt="" srcSet="" />}
      </div>

      <section className="mx-5 my-5">
        <h3 className="text-center mb-4 pb-2 primary-text-color fw-bold">FAQ</h3>
        <p className="text-center mb-5 secondary-text-color">
          Find the answers for the most frequently asked questions below
        </p>

        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4">
            <h6 className="mb-3 primary-text-color"><i className="far fa-paper-plane text-primary "></i> Lorem ipsum dolor sit amet.?</h6>
            <p className="secondary-text-color">
              <strong><u>Absolutely!</u></strong> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas architecto vero odio vel asperiores facilis incidunt veritatis molestiae officiis quibusdam!
            </p>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">

            <h6 className="mb-3 primary-text-color"><i className="fas fa-pen-alt text-primary"></i> Lorem ipsum dolor sit amet?</h6>
            <p className="secondary-text-color">
              <strong><u>Yes, it is possible!</u></strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum asperiores deserunt corrupti dolorem. Dignissimos quae numquam officiis quod consequuntur vitae, a fuga exercitationem ad eius.
            </p>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <h6 className="mb-3 primary-text-color"><i className="fas fa-user text-primary"></i> Lorem ipsum dolor sit amet?
            </h6>
            <p className="secondary-text-color">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vitae voluptate autem, sit enim culpa ipsum quis distinctio. Quia, doloribus.
            </p>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <h6 className="mb-3 primary-text-color"><i className="fas fa-rocket text-primary"></i> Lorem, ipsum dolor?
            </h6>
            <p className="secondary-text-color">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ullam.
            </p>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <h6 className="mb-3 primary-text-color"><i className="fas fa-home text-primary"></i> Lorem, ipsum dolor.?
            </h6>
            <p className="secondary-text-color"><strong><u>Lorem, ipsum</u>.</strong> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi dolores quaerat accusamus.</p>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <h6 className="mb-3 primary-text-color"><i className="fas fa-book-open text-primary"></i> Lorem ipsum dolor sit?</h6>
            <p className="secondary-text-color">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic itaque sit aperiam molestias laborum soluta!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About