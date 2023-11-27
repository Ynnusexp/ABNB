// import { useDispatch } from 'react-redux';
import "./spotTile.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function SpotTile({
  spot
}) {
  console.log("spot tile", spot)
  const navigate = useNavigate();

  return (
    <div
      className="onClick"
      title={name}
      onClick={() => {
        navigate(`/spots/${spot.id}`);
      }}
    >
      <img className="img" src={spot.previewImage} alt="Spot Image" />
      <div className="nameRating">
        <div className="cityState">
          <p>{`${spot.city}, ${spot.state}`}</p>
        </div>
        <div className="rating">
          {spot?.reviews?.length > 0 ? <p><FontAwesomeIcon icon={faStar} /> {Math.floor(Math.random() * 4 + 1).toFixed(2)}</p> : <p>new</p>}
        </div>
      </div>
      <div className="price">
        <p>{"$"+spot.price.toFixed(2) + " night" ?? "no-price"}</p>
      </div>
    </div>
  );
}
