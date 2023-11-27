import { useSelector } from "react-redux";
import SpotTile from "../SpotTile/spotTile";

export default function HomePage () {

    const spots = useSelector( (state) => {
      //console.log(state.spots);
      return state.spots
    })

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
