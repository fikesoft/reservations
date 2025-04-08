import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import style from "./favorite.module.scss";
import { useState } from "react";

const Favorite = () => {
  const [isLiked, setIsLiked] = useState(false); 
  const [isHovered, setIsHovered] = useState(false); 

  return (
    <div
      className={style.favorite}
      onClick={() => setIsLiked((prev) => !prev)} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
    >
      {/* Render the appropriate icon based on the state */}
      {isLiked || isHovered ? (
        <IoMdHeart
          className={style.iconHeart}
        />
      ) : (
        <IoIosHeartEmpty className={style.icon} />
      )}
    </div>
  );
};

export default Favorite;