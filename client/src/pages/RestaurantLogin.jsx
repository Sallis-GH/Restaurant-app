import LoginButton from "../components/LoginButton";
// import logo from '../images/logo.png';
import logo from '../images/logo.svg';
import "../__style__/restaurantLogin.css";

const RestaurantLogin = () => {
  return (
    <div className="d-flex justify-content-center my-5">
      <div className="container border shadow p-1 p-md-5 m-md-5 m-2 rounded-5 d-flex align-items-center flex-column width" >
        <img src={logo} alt="logo" className="my-md-5 my-4 pb-4 pb-md-5 border-bottom border-secondary img-width" />
        <LoginButton />
      </div>
    </div>
  );
}

export default RestaurantLogin;