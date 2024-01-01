import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
//import * as spots from "../../store/spots";
import "./ReviewForm.css";
import { csrfFetch } from "../../store/csrf";
import { SPOTS_ENDPOINT } from "../../api/endpoints.js";
import { addNewReview } from "../../store/spots";


function ReviewForm(props) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [enableSubmit, setEnableSubmit] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    console.log(review, review.length);
     setEnableSubmit(isValidForm());
     }, [review])

  const onStarChange = (value) => {
    setStars(value);
    setEnableSubmit(isValidForm());
  };
  const onReviewChange = (e) => {
    console.log(review)

    setReview(e.target.value);
    //setEnableSubmit(isValidForm());
  };

  const isValidForm = () => {


    if (review.length < 10) {
      return false;
    }
    if (stars < 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      setErrors({});
      addReview();
    }
  };
  const addReview = () => {
    console.log("BEFORE REVIEW SUBMIT");
    csrfFetch(`${SPOTS_ENDPOINT}/${props.spotId}/reviews`, {
      method: "POST",
      headers: { user: sessionUser },
      body: JSON.stringify({
        review: review,
        stars: stars,
      }),
    })
      .then((resp) => {
        console.log("RESP: ", resp);
        return resp.json();
      })

      .then(async (response) => {
        console.log("in r3sp", response);
        dispatch(addNewReview(response));

        closeModal();
      })
      .catch((err) => {
        console.log("in err", err);
        // setErrors(err);// edge case, should never be happening, change to hard code or fix it to be dynamic
        setErrors({ server: "Review already exist for this spot" });////// edge case, should never be happening and should give backend response
      });
  };
  return (
    <div className="review-submit-form">
      <h1>How was your stay?</h1>
      {errors.server && <p className="errors">{errors.server}</p>}
      {review.length >= 200 && <p className="blue d-block" > You have reached the Max Length: 200 character </p>}
      <form onSubmit={handleSubmit}>
        <div className="review-text w-100">
          <textarea
            className="w-100"
            type="textArea"
            value={review}
            placeholder="Leave your review here..."
            onChange={onReviewChange}
            maxLength={200}
            required
          />
        </div>

        <div className="star-rating w-100 d-flex">
          <label className="mr-2">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= stars ? "star-on" : "star-off"}
                  onClick={() => onStarChange(index)}
                >
                  {/* <FontAwesomeIcon className="star-icon" icon={faStar} /> */}
                  {/* <i className="fa-solid fa-sun star-icon mr-2" ></i> */}
                  <i className="fa-solid fa-face-grin-stars mr-2"></i>
                </button>
              );
            })}
          </label>
          <span>Stars</span>
        </div>
        <button
          type="submit"
          disabled={!enableSubmit || stars === 0 }
          // disabled={!enableSubmit || stars === 0 || review.length > 255}
          className={enableSubmit ? "btn-primary w-100 p-5" : "submit-btn w-100 p-5"}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
