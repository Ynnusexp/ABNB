import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./SpotPage.css";
import { useState, useEffect } from "react";
import ReviewTile from "../ReviewTile/reviewTile";
//import SpotTile from "../SpotTile/spotTile";
import { addNewSpot } from "../../store/spots";
import { csrfFetch } from "../../store/csrf";
import { SPOTS_ENDPOINT } from "../../api/endpoints";
import ReviewForm from "../ReviewForm/ReviewForm"
import OpenModalButton from "../OpenModalButton/OpenModalButton";

export default function SpotPage() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()
  const [spot, setSpot] = useState("");
  const [canReview, setCanReview] = useState(false);
  const spots = useSelector((state) => {
    return state.spots;
  });

  let { spotId } = useParams();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    fetchSpotDetail(spotId)

  }, [spotId]);

  const fetchSpotDetail = async (spotId) => {
    await csrfFetch(`${SPOTS_ENDPOINT}/${spotId}`, {
      method: "GET",
      headers:{user: sessionUser},

    })
    
    .then(resp => resp.json())
    .then(response => {
      //once we have the record iD weneed to input pictures
      console.log('Successfully fetched spot');
      console.log(response , "11111111111111111111111111111111111111")
      if(response && response.Spots && response.Spots[0]){
        console.log(response.Spots[0])
        dispatch(addNewSpot(response.Spots[0]))
        setSpot(response.Spots[0]);
      }
      //setSpot(spots[spotId]);

      setLoaded(true)
    })
    .catch(err => {
      alert(err)
    }).finally(() => {
      setLoaded(true)
    })
  }

  const generateReviewLanguage = () => {
    const reviewCount = spot?.reviews ? spot.reviews.length : 0
    return reviewCount === 0 || reviewCount > 1
      ? `${reviewCount} Reviews`
      : "1 Review";
  };

  return (
    loaded && spot && (
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
        <hr />
        <div className="rating">
          {spot.avgRating ? (
            <p>
              <FontAwesomeIcon icon={faStar} size="xl" />
               {/* {spot.avgRating} fix should show d3cimals*/}
            </p>
          ) : (
            <p>new</p>
          )}
        </div>
        <div className="review-count">{generateReviewLanguage()}</div>
        <div>
          {sessionUser && canReview && <OpenModalButton
            buttonText="Post Review"
            modalComponent={<ReviewForm spotId={spot.id} />}
          />}
        </div>
        <div>
            {spot.reviews && spot.reviews.length > 0 && spot.reviews.map((singleReview, index) => (
               <ReviewTile key={`${index}-${singleReview.id}`} review={singleReview} />

            ))}
        </div>
        <div className="box">
          <p className="price">${spot.price} night</p>
          <div className="box-rating">
            {spot.avgRating ? (
              <p>
                <FontAwesomeIcon icon={faStar} /> {/* fix avgating fom back, should pass back a dcmical*/}
              </p>
            ) : (
              <p>new</p>
            )}
          </div>
          <div className="box-reviews">{generateReviewLanguage()}</div>
          <button
            className="reserve"
            onClick={() => alert("Feature coming soon")}
          >
            Reserve
          </button>
        </div>
      </div>
    )
  );
}
