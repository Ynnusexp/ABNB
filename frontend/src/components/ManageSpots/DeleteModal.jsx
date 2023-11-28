import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";

const DeleteModal = ({ isDeleteModalOpen, setIsDeleteModalOpen }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteSpot(isDeleteModalOpen.spotId));
    setIsDeleteModalOpen({
      ...isDeleteModalOpen,
      isOpen: false,
    });
  };
  return (
    <div className="center-item modal">
      <h2 className="mb-2">Confirm Delete</h2>
      <p className="mb-2">Are you sure you want to remove this spot from the listings?</p>
      <div className="modal-buttons">
        <button className="btn-primary w-100" onClick={handleDelete}>
          Yes (Delete Spot)
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
          No (Keep Spot)
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
