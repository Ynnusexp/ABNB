import { SPOTS_ENDPOINT } from "../api/endpoints";
import { csrfFetch } from './csrf';


const GET_ALL_SPOTS = "spots/getAllSpots";
const ADD_SPOT = "spots/addNewSpot";
const DELETE_SPOT = `spot/deleteSpot`;
const GET_REVIEWS = 'spot/getReviews';
const ADD_REVIEW = "spots/addNewReview ";
const DELETE_REVIEW = 'spots/deleteReview';

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

export const actionDeleteReview = (reviewId, spotId) => {
    return {
        type: DELETE_REVIEW,
        reviewId,
        spotId
    }
}

export const actionDeleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }

}

export const actionGetReviews =(reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

// export const updateSpot = (spot) => {

//     return {
//         type: ADD_SPOT,
//         spot
//     }

// }

export const getSpotsFetch = () => async (dispatch) => {

    const res = await csrfFetch(SPOTS_ENDPOINT + "?page=1")

    if (res.ok) {
        const allSpots = await res.json()
        console.log('ALLSPOTS', allSpots)
        dispatch(getAllSpots(allSpots))
        return allSpots

    }

}

export const getCurrentUserSpots = () => async (dispatch) => {
    const res = await csrfFetch(SPOTS_ENDPOINT + "/current");
    if (res.ok) {

        const allSpots = await res.json()

        dispatch(getAllSpots(allSpots))
        return allSpots;

    }
}

export const getSpotById = (spotId) =>  async () => {
    const res = await csrfFetch(SPOTS_ENDPOINT + "/" + spotId);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!! im here")
    if (res.ok) {

        const spot = await res.json()
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" , spot , "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        return spot;
    }
}

export const deleteSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(SPOTS_ENDPOINT + "/" + spotId, {
        method: "DELETE"
    })
    if (res.ok) {

        const allSpots = await res.json()
        await dispatch(actionDeleteSpot(spotId))
        return allSpots;

    }
}

export const thunkGetReviews = (spotId) => async(dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const data = await res.json()
        dispatch(actionGetReviews(data))
        return res
    }
}

export const deleteReview = (reviewId, spotId) => async (dispatch) => {
    const res = await csrfFetch( "/api/reviews/" + reviewId, {
        method: "DELETE"
    })
    if (res.ok) {

        const allSpots = await res.json()
        await dispatch(actionDeleteReview(reviewId, spotId))
        await dispatch(getSpotById(spotId))
        return allSpots;

    }
}


export const updateSpotApi = (spot, spotId) => async () => {
    const res = await csrfFetch(SPOTS_ENDPOINT + "/" + spotId, {
        method: "PUT",
        body: JSON.stringify(spot)
    })
    if (res.ok) {
        const data = await res.json();
return data;
    }
}


const initialState = {}
const spotsReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_ALL_SPOTS: {
            console.log(action.spots, "action spots")
            const newState = { ...state }
            action.spots.Spots.forEach(spot => newState[spot.id] = spot);
            console.log(newState)
            return newState

        }

        case ADD_SPOT: {
            const newState = { ...state }
            console.log(newState)

            newState[action.spot.id] = action.spot;
            console.log(newState)
            return newState

        }

        case ADD_REVIEW: {
            const newState = { ...state }
            const spot = newState[action.review.spotId]
            if (spot.reviews) {
                spot.reviews.unshift(action.review)
            } else {
                spot.reviews = [action.review]
            }

            newState[action.review.spotId] = spot;

            return newState

        }

        case DELETE_REVIEW: {
            const newState = {...state}
            const allReviews = newState[action.spotId].reviews

            for (let review in allReviews){
                if (allReviews[review].id === action.reviewId){
                    newState[action.spotId].reviews.splice(review, 1)
                }
            }

            return newState
        }

        case DELETE_SPOT: {
            const newState = {...state}

//console.log( "test!!!!!!!!!!!!!!!!!!!!" , newState)

            delete newState[action.spotId]
            return newState
   }
        case GET_REVIEWS: {
            const newState = {...state, Reviews: {}}

            action.reviews.Reviews.map(review => {
                newState.Reviews[review.id] = review
            })

            return newState
        }

        default:

            return state

    }

}



export default spotsReducer
