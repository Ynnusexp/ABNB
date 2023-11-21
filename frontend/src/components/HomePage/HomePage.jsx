import { useSelector } from "react-redux";
import SpotTile from "../SpotTile/spotTile";

export default function HomePage () {

    const spots = useSelector( (state) => {
      console.log(state.spots);
      return state.spots
    })
    // console.log(spots)

    const spotsArr = Object.values(spots)
    // console.log(spotsArr)

    const tiles = spotsArr.map(spot => (
      <SpotTile
        key={`spotTile-${spot.id}`}
        id={spot.id}
        image={spot.previewImage}
        name={spot.name}
        city={spot.city}
        state={spot.state}
        avgRating={spot.avgRating}
        price={spot.price}
      />
    ))
    // console.log(tiles)

    return (

        <div>

          <h1>Welcome to the HomePage</h1>

          {tiles}

        </div>

      );

}
