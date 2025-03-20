import useAppSelector from "../../store/hooks/useSelector"
const Home = () => {
  const {role } = useAppSelector((state) => state.user);
  return (
    <div>
      {role === "user" ? "user ": "home"}
      {role === "admin" ? "admin ": "home"}
      {role === "guest" ? "guest ": "home"}

    </div>
  )
}

export default Home