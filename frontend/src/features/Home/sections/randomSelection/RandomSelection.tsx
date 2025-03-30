import styles from "./randomSelection.module.scss";
import photoEvent from "../../../../assets/img/eventPhoto.png";
import classNames from "classnames";

const RandomSelection = () => {
    return (
        <section className="row d-flex flex-column  align-items-center mt-5 w-100">
            {/* Title Row */}
            <div className="w-100 text-center">
                <h1 className={styles.titleRandom}>RANDOM SELECTION</h1>
            </div>

            {/* Event Container */}
            <div className={classNames(styles.eventContainer, "d-flex flex-column align-items-center gap-4")}>
                {/* Image Row */}
                <div className="row d-flex flex-row justify-content-center flex-wrap w-100 gap-3 mt-5">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="col-lg-2 col-md-4 col-6 d-flex flex-column align-items-center">
                            <img className="img-fluid" src={photoEvent} alt="photoEvent" style={{ maxWidth: "100%", height: "auto" }} />
                            <div className={classNames(styles.textEvent, "text-lg-start text-center mt-2")}>
                                <p>Beach Please Festival 4 days pass</p>
                                <p>Madrid, Plaza de Sol</p>
                                <p>Monday 18 Jun.</p>
                                <p>From 85 $</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Description & Button */}
                <div className={classNames(styles.textStyle, "col-lg-3 text-lg-start d-flex  flex-column gap-4 text-center mt-4 w-100 mb-2")}>
                    <p className="text-center">Check out some of the most popular events coming up in your city, from festivals to small events.</p>
                    <button>Browse events</button>
                </div>
            </div>
        </section>
    );
};

export default RandomSelection;
