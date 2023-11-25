import { SPOTS_ENDPOINT } from "../api/endpoints";
import { csrfFetch } from './csrf';


const GET_ALL_SPOTS = "spots/getAllSpots";
const ADD_SPOT = "spots/addNewSpot";
//const UPDATE_SPOT_IMG = "spots/updateSpot";

const getAllSpots = (spots) => {

    return {
        type: GET_ALL_SPOTS,
        spots
    }

}

export const addNewSpot = (spot) => {

    return {
        type: ADD_SPOT,
        spot
    }

}

// export const updateSpot = (spot) => {

//     return {
//         type: ADD_SPOT,
//         spot
//     }

// }

export const getSpotsFetch = () => async (dispatch) => {

    const res = await csrfFetch(SPOTS_ENDPOINT + "?page=2")

    if (res.ok) {

        const allSpots = await res.json()
        //console.log(allSpots)
        dispatch(getAllSpots(allSpots))
        return allSpots

    }

}

// export const getSpotFetch = (spotId) => async (dispatch) => {

//     const res = await csrfFetch(`${SPOTS_ENDPOINT}/${spotId}`)

//     if (res.ok) {

//         const spot = await res.json()
//         //console.log(allSpots)
//         //dispatch(updateSpot(spot))
//         return spot

//     }

// }
// export const createSpot = (request) => async (dispatch) => {
//     console.log("THIS IS CR3at")
//     debugger;
//     console.log(request)
//     const res = await csrfFetch(SPOTS_ENDPOINT, {
//       method: "POST",
//       headers:{user: request.sessionUser},
//       body: JSON.stringify(request.spot)
//     })
//     console.log(res)
//     debugger;
//     if (res.created) {

//         const newSpot = await res.json()

//         dispatch(addNewSpot(newSpot))
//         return newSpot

//     }
//     console.log("THIS IS 3nd of m3thod")

//     .then(resp => resp.json())
//     .then(async response => {
//         //TODO
//       //once we have the record iD weneed to input pictures
//       //if we have pictures add them in

//       dispatch(getSpotsFetch()); //populates store with all spots
//       if (picture){
//         await addSpot3s(response.id);
//       }
//       navigate(`/spots/${response.id}`);
//     })
//     .catch(err => {
//       alert(err)
//     })
  //}


const initialState = {}
const spotsReducer = (state = initialState, action) => {


    switch (action.type) {

        case GET_ALL_SPOTS: {

    //console.log(action.spots)
     const newState = {...state}
     action.spots.Spots.forEach(spot => newState[spot.id] = spot);
     console.log(newState)
     return newState

        }

        case ADD_SPOT: {
            const newState = {...state}
            console.log(newState)

            newState[action.spot.id] = action.spot;
            console.log(newState)
            return newState

                }

        default:

            return state

    }

}



export default spotsReducer
