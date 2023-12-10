import "./UpdateForm.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addNewSpot, getSpotById, updateSpotApi } from "../../store/spots.js";
import { SPOTS_ENDPOINT } from "../../api/endpoints.js";
import { csrfFetch } from "../../store/csrf.js";
import { useDispatch } from "react-redux";

const validForm = {
  streetAddress: true,
  city: true,
  state: true,
  country: true,
  description: true,
  price: true,
  spotName: true,
  picture: true,
};

export default function UpdateForm() {
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
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    async function getSpot() {
      let currentSpot = await dispatch(getSpotById(spotId));

      setStreetAddress(currentSpot.Spots[0].address);
      setCity(currentSpot.Spots[0].city);
      setState(currentSpot.Spots[0].state);
      setCountry(currentSpot.Spots[0].country);
      setDescription(currentSpot.Spots[0].description);
      setPrice(currentSpot.Spots[0].price);
      setSpotName(currentSpot.Spots[0].name);
      setPicture(currentSpot.Spots[0].previewImage);
      setLongitude(currentSpot.Spots[0].lng);
      setLatitude(currentSpot.Spots[0].lat);

    }

    getSpot();
  }, []);

  const isValidForm = () => {
    const checkForm = {
      streetAddress: streetAddress.length,
      city: city.length,
      state: state.length,
      country: country.length,
      latitude: latitude !=='',
      longitude: longitude !=='',
      description: description.length > 30,
      price: price.length,
      spotName: spotName.length,
      picture: picture.length,
    };

    setValidation(checkForm);
    if (!Object.values(checkForm).some((value) => value === 0)) {
      return true;
    }

    return false;
  };

  const validateAndSubmit = () => {
    if (isValidForm()) {
      updateSpot();
    }
  };
  let previewImage = picture
  const updateSpot = async () => {
    csrfFetch(SPOTS_ENDPOINT + "/" + spotId, {
      method: "PUT",
      headers: { user: sessionUser },
      body: JSON.stringify({
        address: streetAddress,
        city,
        state,
        country,
        lat: latitude,
        lng: longitude,
        name: spotName,
        description,
        price: Number(price).toFixed(2),
        previewImage,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        navigate(`/spots/${data.id}`);
      });
  };

  return (
    <div className="formBody">
      <div className="section">
        <h1> Update your Spot </h1>
        <h2> Where's your place located? </h2>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
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
          <label>City
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

          <label>State
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
        {/* <div className="cityState d-flex w-100">
          <div className="form-group w-70 mr-2">
            <label>
              City
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
          </div>

          <div className="form-group w-30">
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
        </div> */}
        <div className="ll">
        <label>
        Latitude  </label>
        <label>
        {!validation.latitude && latitude === '' && (
          <span className="invalid"> Latitude is required </span>
        )}
        {+latitude < -90 || +latitude > 90 || Number.isNaN(Number(latitude)) && (
          <span className='invalid'>Latitude must be between -90 and 90</span>
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
          Longitude  </label>
          <label>
          {!validation.longitude && longitude === '' && (
            <span className="invalid"> Longitude is required </span>
          )}
          {+longitude < -180 || +longitude > 180 || Number.isNaN(Number(longitude)) && (
          <span className='invalid'>Longitude must be between -180 and 180</span>
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

      <div className="section">
        <h2>Describe your place to guests</h2>
        <p>
          Mention the best features of your space, any special amentities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <textarea
          type="text"
          placeholder=" Please write at least 30 characters"
          className="text1 w-100"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        {!validation.description && (
          <span className="invalid">
            {" "}
            Description needs a minimum of 30 characters{" "}
          </span>
        )}
      </div>

      <div className="section">
        <h2> Create a title for your spot </h2>
        <p>
          Catch guests' attention with a spot title that highlights what makes
          your place special.
        </p>
        <input
          type="text"
          placeholder="Name of your spot"
          className="text2"
          value={spotName}
          onChange={(e) => setSpotName(e.target.value)}
          required
        />
        <label>
          {!validation.spotName && (
            <span className="invalid d-block"> Name is required</span>
          )}
        </label>
      </div>
      <div className="section">
        <h2>Set a base price for your spot </h2>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>
        <span className="d-flex align-center">
          <span className="d-block mr-2">$</span>
          <input
            type="Number"
            placeholder="Price per night (USD)"
            className="text3"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </span>
        {!validation?.price && (
          <span className="invalid"> Price is required</span>
        )}
      </div>
      <div className="section">
        {/* <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p> */}
        {/* {!validation.picture && (
          <span className="invalid"> Preview image is required</span>
        )}{" "} */}

        {/* <input
          type="text"
          placeholder="Preview Image URL"
          className="url1"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        />
        <label>
          {!validation.picture && (
            <span className="invalid d-block"> Preview image is required</span>
          )}
        </label>
        <input type="text" placeholder="Image URL" className="url2" />
        <input type="text" placeholder="Image URL" className="url3" />
        <input type="text" placeholder="Image URL" className="url4" />
        <input type="text" placeholder="Image URL" className="url5" /> */}
      </div>
      <button type="button" onClick={validateAndSubmit}>
        Update your Spot
      </button>
    </div>
  );
}
