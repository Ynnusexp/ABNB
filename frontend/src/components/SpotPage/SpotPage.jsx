import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./SpotPage.css";
//import SpotTile from "../SpotTile/spotTile";

export default function SpotPage() {
  const spots = useSelector((state) => {
    return state.spots;
  });

  let { spotId } = useParams();
  const spot = spots[spotId];
  //console.log(spot)
  return (
    spot && (
      <div className="spotPageMain">
        <div className="spotHeading">
          <h1 className=" spotName">{spot.name}</h1>
          <h3 className="subHeading">
            {spot.city}, {spot.state}, {spot.country}
          </h3>
        </div>
        <div className="picBody">
          <div className="div1">
            <img className="bigImg" src={spot.previewImage} />
            <div> </div>
          </div>
          <div className="div2">
            <div className="row1">
              <div className="smallPic">
                <img className="smallImgs" src={spot.previewImage} />
              </div>
              <div className="smallPic">
                <img className="smallImgs" src={spot.previewImage} />
              </div>
            </div>

            <div className="row2">
              <div className="smallPic">
                <img className="smallImgs" src={spot.previewImage} />
              </div>
              <div className="smallPic">
                <img className="smallImgs" src={spot.previewImage} />
              </div>
            </div>
          </div>
        </div>
        <h1> Hostcd by {spot.name}</h1>
        <p> {spot.description} </p>
        <div className="box">
          <p className="price">
            ${spot.price} night
          </p>
          {spot.avgRating && <div className="newStar" >
            {Array(spot.avgRating).fill().map((_,index) => <span key={index}> * </span>)}
          </div>}
          <button className="reserve" onClick={() => alert("Feature coming soon") }>
            Reserve
          </button>
        </div>
      </div>
    )
  );
}
