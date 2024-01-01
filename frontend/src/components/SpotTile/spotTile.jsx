// import { useDispatch } from 'react-redux';
import "./spotTile.css";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function SpotTile({ spot }) {
  const navigate = useNavigate();

  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", typeof spot.price);
  const calculateAverage = (reviews) => {
    let average = 0;
    let total = 0;
    reviews.forEach((review) => {
      total = total + review.stars;
    });

    average = total / reviews.length; //

    return average.toFixed(1);
  };

  return (
    <div
      className="onClick"
      title={name}
      onClick={() => {
        navigate(`/spots/${spot.id}`);
      }}
    >
      <img className="img" src={spot.previewImage} alt="Spot Image" />
      <span className="tooltiptext">{spot?.name}</span>
      {/* <span className="tooltiptext">{spot?.ownerId}</span> */}
      <div className=" nameRating justify-between pt-10">
        <div className="cityState">
          <p className="city-state-text">{`${spot.city}, ${spot.state}`}</p>
        </div>
        <div className="rating">
          {spot?.reviews?.length > 0 ? (
            <p>
              <i className="fa-solid fa-sun mr-2" ></i>
              {calculateAverage(spot?.reviews)}
            </p>
          ) : (
            <p>
              {" "}
              <i className="fa-solid fa-sun mr-2" ></i> New
            </p>
          )}
        </div>
      </div>
      <div className="price">
        <p>
          {"$" + Number(spot?.price || 0).toFixed(2) + " night" ?? "no-price"}
        </p>
        {/* <p>{"$"+ Number(spot?.price).toFixed(2) + " night" ?? "no-price"}</p> */}
      </div>
    </div>
  );
}
