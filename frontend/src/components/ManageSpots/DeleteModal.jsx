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
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <div className="buttons">
        <button className="button-danger" onClick={handleDelete}>
          Yes (Delete Spot)
        </button>
        <button
          className="button-secondary"
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
