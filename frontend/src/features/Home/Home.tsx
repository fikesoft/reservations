
import Landing from "./sections/landing/Landing";
import RandomSelection from "./sections/randomSelection/RandomSelection";
import AboutUs from "./sections/aboutUs/AboutUs";
const Home = () => {
  return (
    <div className="d-flex flex-column">
      <div className="container d-flex flex-column align-items-center ">
        <Landing />
        <RandomSelection />
      </div>
      <AboutUs />
    </div>

  )
}

export default Home