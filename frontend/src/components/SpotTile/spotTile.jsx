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
      <img className="img" src={image} alt="Spot Image" />
      <div className="nameRating">
        <div className="cityState">
          <p>{`${city}, ${state}`}</p>
        </div>
        <div className="rating">
          <p>{avgRating ? avgRating : "new"}</p>
        </div>
      </div>
      <div className="price">
        <p>{price ?? "no-price"}</p>
      </div>
    </div>
  );
}
