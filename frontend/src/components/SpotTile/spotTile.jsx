// import { useDispatch } from 'react-redux';
import './spotTile.css';
import { useNavigate } from 'react-router-dom';

export default function SpotTile({ image, name, city, state, avgRating, price, id }) {

    const navigate = useNavigate()

    return (

        <div onClick={() => {

            navigate(`/spots/${id}`)

        }}>

            <img src={image} alt='Spot Image'/>
            <p>{`${city}, ${state}`}</p>
            <p>{avgRating}</p>
            <p>{price}</p>

        </div>

    )
}
