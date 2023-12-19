import  { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { getCurrentUserSpots } from "../../store/spots";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import "./ManageSpots.css";

const ManageSpots = () => {
  const [currentUserSpots, setCurrentUserSpots] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    isOpen: false,
    spotId: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserSpots();
  }, [isDeleteModalOpen]);

  const fetchUserSpots = async () => {
    let currentSpots = await dispatch(getCurrentUserSpots());
    setCurrentUserSpots(currentSpots.Spots);
  };

  const calculateAverage = (reviews) => {
    let average = 0;
    let total = 0;
    reviews.forEach((review) => {
      total = total + review.stars;
    });

    average = total / reviews.length;

    return average.toFixed(1);
  };

  const handleDelete = (spotId) => {
    setIsDeleteModalOpen({ isOpen: true, spotId: spotId });
  };

  return (
    <div>
      <div className="mb-20">
        <h1>Manage Your Spots</h1>
        {currentUserSpots.length == 0 && (
          <Link to="/spots/create" className="btn-secondary">
            Create a New Spot
          </Link>
        )}
      </div>
      <div className="current-user-spots">
        {currentUserSpots?.map((spot, index) => (
          <div key={index}>
            <Link to={`/spots/${spot.id}`}>
              <img src={spot.previewImage} alt={spot.name} />
            </Link>
            <div className="current-user-header d-flex justify-between mb-5">
              <div className="mb-2">
                <h3>
                  {spot.city}, {spot.state}
                </h3>
              </div>
              {spot.reviews && spot.reviews.length > 0 ? (
                <div className="review-count mb-2">
                  <FontAwesomeIcon icon={faStar}/>{" "}
                  {calculateAverage(spot.reviews)}
                </div>
              ) : (
                <div className="review-count mb-2">
                  <span> <FontAwesomeIcon icon={faStar}  /> New</span>
                </div>
              )}
            </div>
            <h4 className="mb-2">${spot.price} night</h4>
            <div className="button-container">
              <Link to={`/spots/${spot.id}/edit`} className="btn-secondary mr-2">Update</Link>
              <button onClick={() => handleDelete(spot.id)} className="btn-secondary">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isDeleteModalOpen.isOpen && (
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
    </div>
  );
};

export default ManageSpots;
