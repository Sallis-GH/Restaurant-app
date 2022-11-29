import "../__style__/footer.css";
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Whatsapp } from 'react-bootstrap-icons';

const Footer = () => {
  return (
    <>
      <div className="footer lightgray px-4">
        <div className="border-bottom border-secondary p-3 pb-lg-0">
          <div className="row">
            <div className="col-6">
              <img src={logo} alt="logo" className="logo-footer" />
            </div>
            <div className="address col-6 text-end">
              <p>ADMS kitchen</p> <br></br>
              <p>Lustgårdsgatan 19 112 51,</p>
              <p>Stockholm</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col d-md-inline-flex">
            <p className="mt-2 fs-6 me-md-3">&#169; ADMS kitchen</p>
            <div className=" d-flex align-items-center mb-3 mt-md-2">
              <Instagram className="me-3" />
              <Facebook className="me-3" />
              <Whatsapp />
            </div>
          </div>
          <div className="col d-flex flex-column flex-md-row justify-content-end mb-2">
            <Link to={'#'} className="mt-2 fs-6 text-decoration-none lightgray hover text-md-end">Menu</Link>
            <Link to={'#'} className="mt-2 fs-6 text-decoration-none lightgray hover mx-md-5 text-md-end">About</Link>
            <Link to={'#'} className="mt-2 fs-6 text-decoration-none lightgray hover text-md-end">Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;