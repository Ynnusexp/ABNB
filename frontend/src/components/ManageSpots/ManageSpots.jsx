import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserSpots } from "../../store/spots";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";

const ManageSpots = () => {
  const [currentUserSpots, setCurrentUserSpots] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    isOpen: false,
    spotId: null
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
      total = total + review.stars
    })

    average = total / reviews.length;

    return average;
  }

  const handleDelete = (spotId) => {
    //show the deletemodal
setIsDeleteModalOpen({isOpen: true, spotId: spotId});
  }

  return (
    <div>
      <h1>Manage your Spots</h1>
      {currentUserSpots.length == 0 && <Link to="/spots/create">Create a New Spot</Link>}
            <div className="current-user-spots">
        {currentUserSpots?.map((spot, index) => (
            <div key={index}>
                <Link to={`/spots/${spot.id}`}>
                <img src={spot.previewImage} alt={spot.name} />
                </Link>
                <div className="current-user-header">
                <div>
                <h2>{spot.city}, {spot.state}</h2>
              <h3>${spot.price} night</h3>
              </div>

              {spot.reviews && spot.reviews.length > 0 &&  <div className="review-count">
              <FontAwesomeIcon icon={faStar} size="xl" />  {calculateAverage(spot.reviews)}</div>}
                    </div>

              <div className="button-container">
                <button>Update</button>
                <button onClick={() => handleDelete(spot.id)}>Delete</button>
            </div>
            </div>
          ))}
      </div>

      {isDeleteModalOpen.isOpen && <DeleteModal isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen}/>}
    </div>
  );
};

export default ManageSpots;
