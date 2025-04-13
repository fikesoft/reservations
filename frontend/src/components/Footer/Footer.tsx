import { RiLinkedinFill } from "react-icons/ri";
import Logo from "../Logo/Logo"
import { FaArrowRight, FaTwitter } from "react-icons/fa6";
import { ImFacebook } from "react-icons/im";
import classNames from "classnames";
import style from "./Footer.module.scss"
import { useNavigate } from "react-router-dom";
const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className={classNames(
            style.footerContainer,
            "d-flex flex-column align-items-center justify-content-center pt-5 pb-5 gap-5 text-center"
        )}>
            {/* First Section */}
            <div className={classNames(
                style.footerInfo,
                "row gap-5 align-items-center justify-content-center w-100 text-center pb-5"
            )}>
                <div className="col-md-3 col-12 d-flex flex-column gap-3 text-md-start text-center">
                    <div>
                        <Logo />
                    </div>
                    <p>+1 763 547-12-97</p>
                    <p>support@random-events.agency </p>
                </div>
                <div className="col-md-2 col-12 d-flex flex-column gap-3">
                    <p><b>Quick links</b></p>
                    <a style={{ cursor: "pointer" }} onClick={() => { navigate("/home") }}>Home</a>
                    <a style={{ cursor: "pointer" }}>Events</a>
                    <a style={{ cursor: "pointer" }} onClick={() => { navigate("/about") }} >About us</a>
                </div>
                <div className="col-md-5 col-12 d-flex flex-column gap-3" style={{ maxWidth: "300px" }}>
                    <p><b>Subscribe</b></p>
                    <div className={style.footerSubscribe}>
                        <input placeholder="Get product" />
                        <FaArrowRight className={style.icon} />
                    </div>
                </div>
            </div>

            {/* Second Section */}
            <div className="row gap-5 align-items-center justify-content-center w-100 text-center">
                <div className="col-md-3 col-12 d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                    <div className="rounded-circle border border-white d-flex align-items-center justify-content-center align-items-center " style={{ width: "30px", height: "30px" }}>
                        <RiLinkedinFill size={16} color="white" />
                    </div>
                    <div className="rounded-circle border border-white d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px" }}>
                        <ImFacebook size={16} color="white" />
                    </div>
                    <div className="rounded-circle border border-white d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px" }}>
                        <FaTwitter size={16} color="white" />
                    </div>
                </div>

                <div className="col-md-3 col-12 d-flex flex-column align-items-center text-center">
                    <p>A product of</p>
                    <Logo />
                </div>

                <div className="col-md-3 col-12 text-center">
                    © 2025 RANDOM EVENTS. All rights reserved
                </div>
            </div>
        </div>


    )
}

export default Footer