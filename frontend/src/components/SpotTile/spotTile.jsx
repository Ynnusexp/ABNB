// import { useDispatch } from 'react-redux';
import "./spotTile.css";
import { useNavigate } from "react-router-dom";

export default function SpotTile({
  
  image,
  name,
  city,
  state,
  avgRating,
  price,
  id,

}) {
  const navigate = useNavigate();

  return (
    <div
      className="onClick"
      title={name}
      onClick={() => {
        navigate(`/spots/${id}`);
      }}
    >
      <p>{`${city}, ${state}`}</p>
      <p>{avgRating ? avgRating : "new"}</p>
      <p>{price ?? "no-price"}</p>
      <img className="img" src={image} alt="Spot Image" />

    </div>
  );
}
