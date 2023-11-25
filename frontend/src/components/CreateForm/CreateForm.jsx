import "./CreateForm.css";
import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { useSelector} from 'react-redux';
import { addNewSpot } from "../../store/spots.js";
import { SPOTS_ENDPOINT } from "../../api/endpoints.js";
import { csrfFetch } from "../../store/csrf.js";
import { useDispatch } from "react-redux";


const validForm = {
  streetAddress: true,
  city: true,
  state: true,
  country: true,
  latitude: true,
  longitude: true,
  description: true,
  price: true,
  spotName: true,
  picture: true,
};

export default function CreateForm() {
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [spotName, setSpotName] = useState("");
  const [picture, setPicture] = useState("");

  const [validation, setValidation] = useState(validForm);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const isValidForm = () => {
    const checkForm = {
      streetAddress: streetAddress.length,
      city: city.length,
      state: state.length,
      country: country.length,
      latitude: latitude.length,
      longitude: longitude.length,
      description: description.length > 30,
      price: price.length,
      spotName: spotName.length,
      picture: picture.length,
    };

    console.log(checkForm);

    setValidation(checkForm);
    if (!Object.values(checkForm).some((value) => value === 0)) {
      return true;
    }

    return false;
  };

  const validateAndSubmit = () => {
    if (isValidForm()){
      createSpot()
      // const newSpot = createSpot(

      //   {
      //     user: sessionUser,
      //     spot: {
      //       address: streetAddress,
      //       city,
      //       state,
      //       country,
      //       lat: latitude,
      //       lng: longitude,
      //       name:spotName,
      //       description,
      //       price
      //     }
      //   }

      //)
      //console.log(newSpot)
      // navigate(`/spots/${newSpot.id}`);

      //navigate(`/spots/`);
    }
  }

  const createSpot = () => {
    csrfFetch(SPOTS_ENDPOINT, {
      method: "POST",
      headers:{user: sessionUser},
      body: JSON.stringify({
        address: streetAddress,
        city,
        state,
        country,
        lat: latitude,
        lng: longitude,
        name:spotName,
        description,
        price
      })
    })
    .then(resp => resp.json())
    .then(async response => {
      //once we have the record iD weneed to input pictures
      //if we have pictures add them in
      dispatch(addNewSpot(response)); //populates store with all spots
      if (picture){
        await addSpotImages(response.id);
      }
      navigate(`/spots/${response.id}`);
    })
    .catch(err => {
      alert(err)
    })
  }

  const addSpotImages = async (spotId) => {
    await csrfFetch(`${SPOTS_ENDPOINT}/${spotId}/images`, {
      method: "POST",
      headers:{user: sessionUser},
      body: JSON.stringify({
        url: picture,
        preview: true
      })
    })
    .then(resp => resp.json())
    .then(response => {
      //once we have the record iD weneed to input pictures
      console.log('Successfully uploaded image');
    })
    .catch(err => {
      alert(err)
    })
  }

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };
  */

  return (
    <div className="formBody">
        <div className="section1">
          <h1> Create a new Spot </h1>
          <h2> Where's your place located? </h2>
          <h3>
            Guests will only get your exact address once they booked a
            reservation.
          </h3>
          <div>
            <label>
              Country{" "}
              {!validation.country && (
                <span className="invalid"> Country is required </span>
              )}
            </label>
            <input
              type="text"
              value={country}
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              className="country"
              required
            />
          </div>
          <div>
            <label>
              Street Address{" "}
              {!validation.streetAddress && (
                <span className="invalid"> Street Address is required </span>
              )}
            </label>
            <input
              type="text"
              value={streetAddress}
              placeholder="Address"
              onChange={(e) => setStreetAddress(e.target.value)}
              className="address"
              required
            />
          </div>
          <div className="cityState">
            <h3>City</h3>
            <label>
              City{" "}
              {!validation.city && (
                <span className="invalid"> City is required </span>
              )}
            </label>
            <input
              type="text"
              value={city}
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              className="city"
              required
            />

            <label>
              State{" "}
              {!validation.state && (
                <span className="invalid"> State is required </span>
              )}
            </label>

            <input
              type="text"
              value={state}
              placeholder="STATE"
              onChange={(e) => setState(e.target.value)}
              className="state"
              required
            />
          </div>

          <div className="ll">
            <label>
              {!validation.latitude && (
                <span className="invalid"> Latitude is required </span>
              )}
            </label>

            <input
              type="text"
              value={latitude}
              placeholder="Latitude"
              onChange={(e) => setLatitude(e.target.value)}
              className="latitude"
              required
            />

            <label>
              {!validation.longitude && (
                <span className="invalid"> Longitude is required </span>
              )}
            </label>
            <input
              type="text"
              value={longitude}
              placeholder="Longitude"
              onChange={(e) => setLongitude(e.target.value)}
              className="longitude"
              required
            />
          </div>
        </div>

        <div className="section2">
          <label>Describe your place to guests</label>
          <p>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>

          <input
            type="text"
            placeholder="Please write at least 30 characters"
            className="text1"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {!validation.description && (
            <span className="invalid">
              {" "}
              Description needs a minimum of 30 characters{" "}
            </span>
          )}
        </div>

        <div className="section3">
          <label>
            {" "}
            Create a title for your spot{" "}
            {!validation.spotName && (
              <span className="invalid"> Name is required</span>
            )}
          </label>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <input
            type="text"
            placeholder="Name of your spot"
            className="text2"
            onChange={(e) => setSpotName(e.target.value)}
            required
          />
        </div>
        <div className="section4">
          <label>
            Set a base price for your spot{" "}
            {!validation.price && (
              <span className="invalid"> Price is required</span>
            )}
          </label>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          $
          <input
            type="text"
            placeholder="Price per night (USD)"
            className="text3"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="section5">

          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            placeholder="Preview Image URL"
            className="url1"
            onChange={(e) => setPicture(e.target.value)}
          />
          <label>
            Liven up your spot with photos
            {!validation.picture && (
              <span className="invalid"> Preview image is required</span>
            )}{" "}
          </label>
          <input type="text" placeholder="Image URL" className="url2" />
          <input type="text" placeholder="Image URL" className="url3" />
          <input type="text" placeholder="Image URL" className="url4" />
          <input type="text" placeholder="Image URL" className="url5" />
        </div>
        <button type="button" onClick={validateAndSubmit}>Create Spot</button>
    </div>
  );
}
