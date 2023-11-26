import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as spots from '../../store/spots';
import './ReviewForm.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { csrfFetch } from '../../store/csrf';
import { SPOTS_ENDPOINT } from "../../api/endpoints.js";
import { addNewReview } from '../../store/spots';


function ReviewForm(props) {
  const dispatch = useDispatch();
  const [review, setReview,] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [enableSubmit, setEnableSubmit ] = useState(false)

  const sessionUser = useSelector((state) => state.session.user);

  const onStarChange = (value) => {
    setStars(value)
    setEnableSubmit(isValidForm())

  }
  const onReviewChange = (value) => {
    setReview(value)
    setEnableSubmit(isValidForm())

  }


  const isValidForm = () => {
    if(review.length < 30){
      return false
    }
    if(stars < 0){
      return false
    }
    return true
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      setErrors({});
      addReview()

     }
  };
  const addReview = () => {

    csrfFetch(`${SPOTS_ENDPOINT}/${props.spotId}/reviews`, {
      method: "POST",
      headers:{user: sessionUser},
      body: JSON.stringify({
        review: review, stars: stars
      })
    })
    .then(resp => resp.json())

    .then(async response => {
console.log("in r3sp", response)
      dispatch(addNewReview(response));

      closeModal()
    })
    .catch(err => {
      console.log("in err", err)
      setErrors({server: err.statusText})
    })
  }
  return (
    <div className='review-submit-form'>
      <h1>How was your stay?</h1>
       {errors.server && <p className='errors'>{errors.server}</p>}
      <form onSubmit={handleSubmit}>

      <div className='review-text'>
      <textarea
            type="textArea"
            rows={4}
            cols={30}
            value={review}
            placeholder='Leave your review here...'
            onChange={(e) => onReviewChange(e.target.value)}
            required
          />
      </div>

        <div className="star-rating">
          <label>

      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= stars ? "star-on" : "star-off"}
            onClick={() => onStarChange(index)}
          >
            <FontAwesomeIcon className="star-icon" icon={faStar} />
          </button>
        );
      })}
      Stars
       </label>
    </div>
        <button
        type="submit"
        disabled={!enableSubmit}
        className={enableSubmit ? "enable-submit" : ""}

        >Submit Your Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;
