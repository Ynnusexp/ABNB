import { useState } from "react";
import DeleteReviewModal from "./DeleteReviewModal";

export default function ReviewTile(props) {
  console.log("@#$@#$@#$#@", props);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    isOpen: false,
    reviewId: null,
  });

  const handleDelete = (reviewId) => {
    console.log(reviewId);
    //show the deletemodal
    setIsDeleteModalOpen({ isOpen: true, reviewId: reviewId });
  };
  return (
    <div>
      <div className="user-name">{props.owner.firstName}</div>
      <div className="date">
        {Intl.DateTimeFormat("en", { month: "long" }).format(
          new Date(props.review.createdAt.split("-")[1])
        )}{" "}
        {props.review.createdAt.split("-")[0]}
      </div>
      <div className="review">
        <p>{props.review.review}</p>
      </div>
      {props.review.userId == props.owner.id &&
      <div className="button-container">
        <button>Update</button>
        <button onClick={() => handleDelete(props.review.id)}>Delete</button>
      </div>
      }
      {isDeleteModalOpen.isOpen && (
        <DeleteReviewModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
    </div>
  );
}
