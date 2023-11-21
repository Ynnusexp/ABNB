// import { csrfFetch } from "./csrf";

// const GET_ALL_SPOTS = "spots/getAllSpots";

// const getAllSpots = (spots) => {

//     return {
//         type: GET_ALL_SPOTS,
//         spots
//     }

// }

// export const getSpotsFetch = () => async (dispatch) => {

//     const res = await csrfFetch("/api/spots")

//     if (res.ok) {

//         const allSpots = await res.json()
//         dispatch(getAllSpots(allSpots))
//         return allSpots

//     }

// }


// const spotsReducer = (state = {}, action) => {

//     let newState;

//     switch (action.type) {

//         case GET_ALL_SPOTS:

//             return { ...state, newState: action.payload }
//     }

// }

// export default spotsReducer
