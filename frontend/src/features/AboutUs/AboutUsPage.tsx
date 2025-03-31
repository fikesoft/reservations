import photoAboutUs from "../../assets/img/aboutUs-img.png"
import style from "./AboutUsPage.module.scss"
const AboutUs = () => {
  return (
    <div className="d-flex flex-column gap-5 text-center p-2">
    <div>
        <h1 className={style.headerAboutUs}>THIS IS RANDOM</h1>
    </div>
    <div>
        <p> We’ve always believed that an event can change lives. At Random Events, we’ve built a 
            platform that lets fans experience shows they love effortlessly and without hassle.</p>
    </div>
    <div className="d-flex flex-column flex-lg-row align-items-center gap-4">
        <div className="d-flex flex-column gap-4 text-start" style={{ maxWidth: "600px" }}>
            <h2 className="display-3">Going out invigorates us.</h2>
            <div className="d-flex flex-column gap-4">
                <p>Whether you’re into intimate basement gigs, energetic club nights, sprawling festivals, 
                    wild raves, comedy shows, or dazzling drag cabarets, live events are where we forge 
                    unforgettable memories, discover our communities, and explore the hidden corners of our cities.</p>
                <p>We understand the significance of these moments, which is why we’ve created an app 
                    that makes it effortless to dive into the events you love.</p>
                <p>Since 2025, Random Events has been revolutionizing the ticketing experience for 
                    fans, artists, and venues—removing barriers to a great time and fostering a fairer, more inclusive industry.</p>
            </div>
        </div>
        <div className="d-flex justify-content-center">
            <img 
                className="img-fluid rounded-3" 
                src={photoAboutUs} 
                alt="about-us-ER" 
                style={{ maxWidth: "100%", height: "auto" }}
            />
        </div>
    </div>
</div>

  )
}

export default AboutUs