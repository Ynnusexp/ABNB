import { useState } from "react";
import DeleteReviewModal from "./DeleteReviewModal";
import { useSelector } from "react-redux";
import "./reviewTile.css";
import { useResolvedPath } from "react-router-dom";

export default function ReviewTile(props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    isOpen: false,
    reviewId: null,
  });
  console.log("props: ", props)
  const sessionUser = useSelector((state) => state.session.user);

  const handleDelete = (reviewId) => {
    setIsDeleteModalOpen({ isOpen: true, reviewId: reviewId });
  };

  const reviewExists = !!props.review;

  const isUserReviewOwner =
    sessionUser && props.review?.userId === sessionUser.id;

  return (
    <div>
      <div className="user-name mb-2">{}</div>
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
        />
      )}
    </div>
  );
}
