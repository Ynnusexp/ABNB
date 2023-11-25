// import { useDispatch } from 'react-redux';
import "./spotTile.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

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
          {avgRating ? <p><FontAwesomeIcon icon={faStar} /> {avgRating}</p> : <p>new</p>}
        </div>
      </div>
      <div className="price">
        <p>{price ?? "no-price"}</p>
      </div>
    </div>
  );
}
