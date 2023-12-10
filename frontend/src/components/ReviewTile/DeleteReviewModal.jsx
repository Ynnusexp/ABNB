import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/spots";

const DeleteReviewModal = ({ isDeleteModalOpen, setIsDeleteModalOpen, spotId }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteReview(isDeleteModalOpen.reviewId, spotId));
    setIsDeleteModalOpen({
      ...isDeleteModalOpen,
      isOpen: false,
    });
  };

  return (
    <div className="center-item modal">
      <h2 className="mb-2">Confirm Delete</h2>
      <p className="mb-2">Are you sure you want to delete this review?</p>
      <div className="modal-buttons">
        <button className="btn-primary w-100" onClick={handleDelete}>
          Yes (Delete Review)
        </button>
        <button
          className="btn-secondary w-100"
          onClick={() =>
            setIsDeleteModalOpen({
              ...isDeleteModalOpen,
              isOpen: false,
            })
          }
        >
          No (Keep Review)
        </button>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
