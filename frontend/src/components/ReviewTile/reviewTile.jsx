import { useState } from "react";
import DeleteReviewModal from "./DeleteReviewModal";
import { useSelector } from "react-redux";
import "./reviewTile.css"

export default function ReviewTile(props) {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    isOpen: false,
    reviewId: null,
  });

  const sessionUser = useSelector((state) => state.session.user);

  const handleDelete = (reviewId) => {
    console.log(reviewId);
    //show the deletemodal
    setIsDeleteModalOpen({ isOpen: true, reviewId: reviewId });
  };
  return (
    <div>
      <div className="user-name mb-2">{props?.owner?.firstName}</div>
      <div className="date mb-2">
        {Intl.DateTimeFormat("en", { month: "long" }).format(
          new Date(props?.review?.createdAt.split("-")[1])
        )}{" "}
        {props?.review?.createdAt.split("-")[0]}
      </div>
      <div className="review mb-2">
        <p>{props?.review?.review}</p>
      </div>
      {props?.review?.userId == sessionUser?.id && sessionUser &&
      <div className="button-container mb-2">
        <button className="btn-secondary mr-2">Update</button>
        <button className="btn-secondary" onClick={() => handleDelete(props?.review?.id)}>Delete</button>
      </div>
      }
      {isDeleteModalOpen.isOpen && props?.review?.userId == sessionUser.id && sessionUser && (
        <DeleteReviewModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
    </div>
  );
}
