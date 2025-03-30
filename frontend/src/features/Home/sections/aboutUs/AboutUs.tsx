import classNames from "classnames";
import style from "./aboutUs.module.scss";

const AboutUs = () => {
  return (
    <section className={classNames(style.aboutUs,"mt-5")}>
      <div className="container d-flex flex-column justify-content-center align-items-center text-center ">
            <h3 className="display-4">RANDOM EVENTS OFFERS BEST EXPERIENCE OF CREATING</h3>
            <h2 className="display-1fw-bold">YOUR EVENT RESERVATION EASY</h2>
            <p className="display-6">
              We’ve always believed that random can change lives. So we created a platform for fans to experience
              more of the shows they love in the most hassle-free way possible.
            </p>
            <a href="#" >About us</a>
      </div>
    </section>
  );
};

export default AboutUs;