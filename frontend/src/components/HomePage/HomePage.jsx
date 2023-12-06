import { useDispatch, useSelector } from "react-redux";
import SpotTile from "../SpotTile/spotTile";
import { useEffect } from "react";
import { getSpotsFetch } from "../../store/spots";

export default function HomePage () {

    const dispatch = useDispatch()
    const spots = useSelector( (state) => {
      //console.log(state.spots);
      return state.spots
    })

    // useEffect(() => {
    //   dispatch(getSpotsFetch())
    // }, [dispatch])

    const spotsArr = Object.values(spots)

    const tiles = spotsArr.map(spot => (

      <SpotTile
        key={`spotTile-${spot.id}`}
        spot={spot}
        // id={spot.id}
        // image={spot.previewImage}
        // name={spot.name}
        // city={spot.city}
        // state={spot.state}
        // avgRating={spot.avgRating}
        // price={spot.price}
        // reviews={spot.reviews}
      />
    ))
     console.log(tiles, "tiles")

    return (

        <div className="tiles" >

          {tiles}

        </div>

      );

}
