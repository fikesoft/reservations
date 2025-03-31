import classNames from "classnames";
import style from "./aboutUs.module.scss";
import { useNavigate } from "react-router-dom";
const AboutUs = () => {
  const navigate = useNavigate()
  return (
    <section className={classNames(style.aboutUs,"mt-5")}>
      <div className="container d-flex flex-column justify-content-center align-items-center text-center ">
            <h3 className="display-4">RANDOM EVENTS OFFERS BEST EXPERIENCE OF CREATING</h3>
            <h2 className="display-1fw-bold">YOUR EVENT RESERVATION EASY</h2>
            <p className="display-6">
              We’ve always believed that random can change lives. So we created a platform for fans to experience
              more of the shows they love in the most hassle-free way possible.
            </p>
            <a  onClick={() => {navigate("/about")}} style={{cursor:"pointer", textDecoration:"underline"}}>About us</a>
      </div>
    </section>
  );
};

export default AboutUs;