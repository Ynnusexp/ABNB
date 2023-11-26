import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SPOTS_ENDPOINT } from "../../api/endpoints";
import { csrfFetch } from "../../store/csrf";

const ManageSpots = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  // const spots = useSelector((state) => {
  //   return state.spots;
  // });

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    fetchUserSpots();
  }, []);

  const fetchUserSpots = async () => {
    await csrfFetch(`${SPOTS_ENDPOINT}/current`, {
      method: "GET",
      headers: { user: sessionUser },
    })
      .then((resp) => resp.json())
      .then((response) => {
        //once we have the record iD weneed to input pictures
        // console.log("Successfully fetched spot");
        console.log(response, "11111111111111111111111111111111111111");
        // if (response && response.Spots && response.Spots[0]) {
          // console.log(response.Spots[0]);
        //   dispatch(addNewSpot(response.Spots[0]));
        //   setSpot(response.Spots[0]);
        // }
        //setSpot(spots[spotId]);

        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoaded(true);
      });
  };

  return <div>ManageSpots</div>;
};

export default ManageSpots;
