import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";

const getAllSpots = (spots) => {

    return {
        type: GET_ALL_SPOTS,
        spots
    }

}

export const getSpotsFetch = () => async (dispatch) => {

    const res = await csrfFetch("/api/spots")

    if (res.ok) {

        const allSpots = await res.json()
        //console.log(allSpots)
        dispatch(getAllSpots(allSpots))
        return allSpots

    }

}

const initialState = {

}
const spotsReducer = (state = initialState, action) => {


    switch (action.type) {

        case GET_ALL_SPOTS: {

    //console.log(action.spots)
     const newState = {...initialState}
     action.spots.Spots.forEach(spot => newState[spot.id] = spot);
     console.log(newState)
     return newState

        }

        default:

            return state

    }

}

export default spotsReducer
