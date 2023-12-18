import { useState, useEffect } from "react";
import DeleteReviewModal from "./DeleteReviewModal";
import { useSelector, useDispatch } from "react-redux";
import "./reviewTile.css";
//import { useResolvedPath } from "react-router-dom";
import { thunkGetReviews } from '../../store/spots'

export default function ReviewTile(props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    isOpen: false,
    reviewId: null,
  });
  const reviews = useSelector(state => state?.spots.Reviews)
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunkGetReviews(props.spotId))
  }, [dispatch, props.spotId])

  const handleDelete = (reviewId) => {
    setIsDeleteModalOpen({ isOpen: true, reviewId: reviewId });
  };

  const reviewExists = !!props.review;

  const isUserReviewOwner =
    sessionUser && props.review?.userId === sessionUser.id;

  return (
    <div>
      {/* <div className="user-name mb-2">{}</div> */}
      <div className="user-name mb-2">{reviews?.[props?.review?.id]?.User?.firstName}</div>
       <div className="date mb-2">
        {Intl.DateTimeFormat("en", { month: "long" }).format(
          new Date(props?.review?.createdAt.split("-")[1])
        )}{" "}

        {props?.review?.createdAt.split("-")[0]}
      </div>
      {/* Other review details */}
      <div className="review mb-2">
        <p>{props?.review?.review}</p>
      </div>
      {reviewExists && isUserReviewOwner && (
        <div className="button-container mb-2">

          <button
            className="btn-secondary"
            onClick={() => handleDelete(props.review.id)}
          >
            Delete
          </button>
        </div>
      )}
      {isDeleteModalOpen.isOpen && isUserReviewOwner && (
        <DeleteReviewModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          spotId={props?.spotId}
        />
      )}
    </div>
  );
}
