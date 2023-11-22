import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SpotTile from "../SpotTile/spotTile";


export default function SpotPage() {

    const spots = useSelector((state) => {

        return state.spots

    })


    let { spotId } = useParams();
    const spot = spots[spotId]


    return spot && (<SpotTile

            id={spot.id}
            image={spot.previewImage}
            name={spot.name}
            city={spot.city}
            state={spot.state}
            avgRating={spot.avgRating}
            price={spot.price}

        />)


}
