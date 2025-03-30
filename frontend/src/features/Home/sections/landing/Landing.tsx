import firstSmallPhoto from "../../../../assets/img/firstSmallPhoto.png";
import secondSmallPhoto from "../../../../assets/img/secondSmallPhoto.png";
import bigPhotoHome from "../../../../assets/img/bigPhotoHome.png";
import classNames from "classnames";
import style from "./landing.module.scss";
const Landing = () => {
  return (
    <section className="row d-flex justify-content-center gap-3 g-2 mb-4">
        <div className={classNames(style.contentHome, "col-lg-4 d-flex flex-column align-items-lg-start align-items-center justify-content-center gap-3")}>
          <h1 className="text-lg-start">FIND MORE OF THE RANDOM EVENTS</h1>
          <p>Incredible live shows. Upfront pricing. Relevant recommendations. We make going out easy.</p>
          <button>Browse events</button>
        </div>
        <div className=" row col-lg-7 d-flex justify-content-center">
          <div className="row col-6  gap-3">
            <img className="img-fluid" src={firstSmallPhoto} alt="photo" />
            <img className="img-fluid" src={secondSmallPhoto} alt="photo" />
          </div>
          <img className="img-fluid col-5" src={bigPhotoHome} alt="photo" />
        </div>
      </section>
  )
}

export default Landing