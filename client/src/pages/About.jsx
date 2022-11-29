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
       {isDesktop ? <img className='about-img' src={aboutImg} alt="" srcset="" /> : <img className='about-img-mobile' src={aboutImgMobile} alt="" srcset="" />}
     </div>
     
     <section className="mx-5 my-5">
          <h3 className="text-center mb-4 pb-2 text-primary fw-bold">FAQ</h3>
          <p className="text-center mb-5">
            Find the answers for the most frequently asked questions below
          </p>

          <div className="row">
            <div className="col-md-6 col-lg-4 mb-4">
              <h6 className="mb-3 text-primary"><i class="far fa-paper-plane text-primary "></i> Is payment transation safe?</h6>
              <p>
                <strong><u>Absolutely!</u></strong> We work with top payment companies which guarantees your
                safety and
                security. All billing information is stored on our payment processing partner.
              </p>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <h6 className="mb-3 text-primary"><i class="fas fa-pen-alt text-primary"></i> Is it possible to cancel subscription anytime ?</h6>
              <p>
                <strong><u>Yes, it is possible!</u></strong> You can cancel your subscription anytime in your
                account. Once the subscription is
                cancelled, you will not be charged next month.
              </p>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <h6 className="mb-3 text-primary"><i className="fas fa-user text-primary"></i> Is there any subscription available?
              </h6>
              <p>
                Currently, we only offer monthly subscription. You can upgrade or cancel your monthly
                account at any time with no further obligation.
              </p>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <h6 className="mb-3 text-primary"><i className="fas fa-rocket text-primary"></i> How to change billing information?
              </h6>
              <p>
                Yes. Go to the billing section of your dashboard and update your payment information.
              </p>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <h6 className="mb-3 text-primary"><i className="fas fa-home text-primary"></i> Do you refund?
              </h6>
              <p><strong><u>Unfortunately no</u>.</strong> We do not issue full or partial refunds for any
                reason.</p>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <h6 className="mb-3 text-primary"><i className="fas fa-book-open text-primary"></i> Do you offer any free plan?</h6>
              <p>
                Of course! We’re happy to offer a free plan to anyone who wants to try our service.
              </p>
            </div>
          </div>
        </section>
    </div>
  )
}

export default About