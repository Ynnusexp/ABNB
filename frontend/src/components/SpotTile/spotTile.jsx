// import { useSelector } from 'react-redux';
// import './spotTile.css';
// import { useEffect, useState } from 'react';

// export default function SpotTile() {
//  const spots = useSelector(state => state.spots)
//  const [isLoaded, setIsLoaded] = useState(false)

//  useEffect(() => {
//     setIsLoaded(true)
//  }, [])

//     return isLoaded ? (

//         spots.map(spot => (

//             <div key={spot.id}>
//                 {spot.name}
//             </div>

//         ))

//     ) : null
// };
