import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./SpotPage.css";
import { useState, useEffect } from "react";
import ReviewTile from "../ReviewTile/reviewTile";
//import SpotTile from "../SpotTile/spotTile";
import { addNewSpot } from "../../store/spots";
import { csrfFetch } from "../../store/csrf";
import { SPOTS_ENDPOINT } from "../../api/endpoints";
import ReviewForm from "../ReviewForm/ReviewForm";
import OpenModalButton from "../OpenModalButton/OpenModalButton";


export default function SpotPage() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [spot, setSpot] = useState("");
  const [canReview, setCanReview] = useState(true);
  const spots = useSelector((state) => {
    return state.spots;
  });

  console.log(spots)

  let { spotId } = useParams();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    fetchSpotDetail(spotId);
  }, [spotId]);

  useEffect(() => {
    spot?.reviews?.forEach((spotItem) => {
      if (spotItem.userId == spot.Owner.id) {
        setCanReview(false);
      }

    });
    console.log(canReview)
  }, []);

  const fetchSpotDetail = async (spotId) => {
    await csrfFetch(`${SPOTS_ENDPOINT}/${spotId}`, {
      method: "GET",
      headers: { user: sessionUser },
    })
      .then((resp) => resp.json())
      .then((response) => {

        if (response && response.Spots && response.Spots[0]) {
          console.log(response.Spots[0]);
          dispatch(addNewSpot(response.Spots[0]));
          setSpot(response.Spots[0]);
        }

        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoaded(true);
      });
  };

  const generateReviewLanguage = () => {
    const reviewCount = spot?.reviews ? spot.reviews.length : 0;
    if (reviewCount == 1) {
      return "·  1 Review";
    } else if (reviewCount > 1) {
      return `·  ${reviewCount} Reviews`;
    } else {
      return;
    }
  };
  let usersArr = []

  const calculateAverage = (reviews) => {
    if (reviews.length === 0) {
      return "New";
    }
    let total = 0;
    reviews.forEach((review) => {
      total = total + review.stars;
      usersArr.push(review.userId)
    });

    const average = total / reviews.length;
    return average.toFixed(1);
  };
  console.log("!!!!!!!!!!!!!spot: ", spot)

  return (
    loaded &&
    spot && (
      <div className="body-container">
      <div className="spotPageMain">
      <div className="spotHeading">
        <h1 className=" spotName">{spot.name}</h1>
        <h3 className="subHeading">
          {spot.city}, {spot.state}, {spot.country}
        </h3>
      </div>
      <div className="picBody">
        <div className="banner-image-wrapper">
          <img className="bannerImage" src={spot.previewImage} />
        </div>
        <div className="spot-images">
          <div className="smallPic">
            <img className="smallImgs" src={spot.SpotImages[1]?.url} />
          </div>
          <div className="smallPic">
            <img className="smallImgs" src={spot.SpotImages[2]?.url} />
          </div>
          <div className="smallPic">
            <img className="smallImgs" src={spot.SpotImages[3]?.url} />
          </div>
          <div className="smallPic">
            <img className="smallImgs" src={spot.SpotImages[4]?.url} />
          </div>
        </div>
      </div>

      <div className="spot-body d-flex">
        <div className="spot-content">
          {/* <h1> Hostcd by {spot.name}</h1> */}
          <h1> Hosted by {`${spot.Owner.firstName} ${spot.Owner.lastName}`}</h1>
          <p className="pb-2"> {spot.description} </p>

          <div className="reviews-wrapper d-flex align-center">
          <div className="rating mr-2">
            {spot.avgRating ? (
              <p>
                {/* <FontAwesomeIcon className="mr-2" icon={faStar} /> */}
                {/* <i className="fa-solid fa-sun mr-2" ></i> */}
                {/* <i className="fa-solid fa-face-grin-stars mr-2"></i> */}
                <i className="fa-solid fa-star mr-2"></i>
                {calculateAverage(spot.reviews)}
              </p>
            ) : (
              <p>New</p>
            )}
          </div>
          {spot.avgRating && <div className="dot mr-2"></div>}
          <div className="review-count">{generateReviewLanguage()}</div>
          </div>
          <div className="mb-2">
            {sessionUser &&
              !spot.hasReview &&
              spot?.reviews.length < 1 && sessionUser.id !== spot.ownerId && (
                <p className="mb-2">Be the first to post a review!</p>
              )}
            {sessionUser &&
              spot?.ownerId !== sessionUser?.id && !usersArr.includes(sessionUser.id) && (
                <OpenModalButton
                  buttonText="Post Your Review"
                  modalComponent={<ReviewForm spotId={spot.id} />}
                />
              )}
          </div>
          <div className="mb-2">
{spot.reviews &&
  spot.reviews.length > 0 &&
  spot.reviews
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort reviews by createdAt in descending order
    .map((singleReview, index) => (
      <ReviewTile
        key={`${index}-${singleReview.id}`}
        review={singleReview}
        owner={spot.Owner}
        spotId={spot.id}
      />
    ))}
</div>
        </div>
        <div className="box">
        <div className="star-header">
        <span className="price">${spot.price} </span> <span className="name"> night </span>

        <div className="box-rating-wrapper">
          <div className="box-rating pl-50">
            {spot.hasReview || spot?.reviews.length > 0 ? (
              <span>
                {/* <i className="fa-solid fa-sun mr-2" ></i> */}
                {/* <i className="fa-solid fa-face-grin-stars mr-2"></i> */}
                <i className="fa-solid fa-star mr-2"></i>
                {calculateAverage(spot.reviews)}
              </span>
            ) : (
              <span>
                {/* <i className="fa-solid fa-sun mr-2" ></i> New */}
                {/* <i className="fa-solid fa-face-grin-stars mr-2"></i> New */}
                <i className="fa-solid fa-star mr-2"></i> New


              </span>
            )}
          </div>

          {spot.reviews.length > 0 && <div className="box-dot"></div>}
          <div className="box-reviews">{generateReviewLanguage()}</div>
        </div>
        </div>
        <button
          className="reserve"
          onClick={() => alert("Feature coming soon")}
        >
          Reserve
        </button>
        </div>
      </div>


    </div>
      </div>

    )
  );
}
