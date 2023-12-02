import { useState } from "react";
import DeleteReviewModal from "./DeleteReviewModal";
import { useSelector } from "react-redux";
import "./reviewTile.css";

export default function ReviewTile(props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    isOpen: false,
    reviewId: null,
  });

  const sessionUser = useSelector((state) => state.session.user);

  const handleDelete = (reviewId) => {
    setIsDeleteModalOpen({ isOpen: true, reviewId: reviewId });
  };

  const reviewExists = !!props.review;

  const isUserReviewOwner =
    sessionUser && props.review?.userId === sessionUser.id;

  return (
    <div>
      <div className="user-name mb-2">{props?.owner?.firstName}</div>
      {/* Other review details */}
      <div className="review mb-2">
        <p>{props?.review?.review}</p>
      </div>
      {reviewExists && isUserReviewOwner && (
        <div className="button-container mb-2">
          <button className="btn-secondary mr-2">Update</button>
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
