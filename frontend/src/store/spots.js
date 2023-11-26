import { SPOTS_ENDPOINT } from "../api/endpoints";
import { csrfFetch } from './csrf';


const GET_ALL_SPOTS = "spots/getAllSpots";
const ADD_SPOT = "spots/addNewSpot";
const ADD_REVIEW = "spots/addNewReview ";

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

export const addNewReview = (review) => {

    return {
        type: ADD_REVIEW,
        review
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

        case ADD_REVIEW: {
        const newState = {...state}
        const spot = newState[action.review.spotId]
        if(spot.reviews){
          spot.reviews.unshift(action.review)
        } else {
            spot.reviews = [action.review]
        }

            newState[action.review.spotId] = spot;

            return newState

                        }

        default:

            return state

    }

}



export default spotsReducer
