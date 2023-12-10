import "./CreateForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const [url2, setUrl2] = useState("")
  const [url3, setUrl3] = useState("")
  const [url4, setUrl4] = useState("")
  const [url5, setUrl5] = useState("")

  const [validation, setValidation] = useState(validForm);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  let ending = [ ".jpg", ".jpeg", ".png"]

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
      picture: picture.length && ending.some(extension => picture.endsWith(extension)),
      url2: !url2.length || ending.some(extension => url2.endsWith(extension)),
      url3: !url3.length || ending.some(extension => url3.endsWith(extension)),
      url4: !url4.length || ending.some(extension => url4.endsWith(extension)),
      url5: !url5.length || ending.some(extension => url5.endsWith(extension)),
    };

    console.log(checkForm);

    setValidation(checkForm);
    if (!Object.values(checkForm).some((value) => value === 0)) {
      return true;
    }

    return false;
  };

  const validateAndSubmit = () => {
    if (isValidForm()) {
      createSpot();
    }
  };

  const createSpot = () => {
    csrfFetch(SPOTS_ENDPOINT, {
      method: "POST",
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
      }),
    })
      .then((resp) => resp.json())
      .then(async (response) => {
        dispatch(addNewSpot(response));
        if (picture) {
          await addSpotImages(response.id);
        }
        navigate(`/spots/${response.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addSpotImages = async (spotId) => {
    await csrfFetch(`${SPOTS_ENDPOINT}/${spotId}/images`, {
      method: "POST",
      headers: { user: sessionUser },
      body: JSON.stringify({
        url: picture,
        preview: true,
      }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        console.log("Successfully uploaded image");
      })
      .catch((err) => {
        alert(err);
      });
  };

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };
  */

  return (
    <div className="formBody">
      <div className="section">
        <h1> Create a new Spot </h1>
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
        <div className="cityState d-flex w-100">
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
        </div>
        <div className="ll d-flex w-100">
          <div className="form-group w-50 mr-2">
            <label>
              Latitude
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
             {+latitude < -90 || +latitude > 90  || Number.isNaN(Number(latitude)) && (
          <div className='invalid'>Latitude must be between -90 and 90</div>
        )}
          </div>
          <div className="form-group w-50">
            <label>
              Longitude
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
             {+longitude < -180 || +longitude > 180 && Number.isNaN(Number(longitude)) (
          <div className='invalid'>Longitude must be between -180 and 180</div>
        )}
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Describe your place to guests</h2>
        <p>
          Mention the best features of your space, any special amentities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>

        <textarea
          placeholder=" Please write at least 30 characters"
          className="text1 w-100"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        {!validation.description && (
          <span className="invalid d-block">
            {" "}
            Description needs a minimum of 30 characters{" "}
          </span>
        )}
      </div>

      <div className="section">
        <h2>Create a title for your spot</h2>
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
         {!validation.spotName && (
          <span className="invalid d-block"> Name is required</span>
        )}
      </div>
      <div className="section">
        <h2>Set a base price for your spot</h2>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>

        <span className="d-flex align-center">
          <span className="d-block mr-2">$</span>
          <input
            type="number"
            placeholder="Price per night (USD)"
            className="text3"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </span>
        {!validation.price && (
          <span className="invalid d-block"> Price is required</span>
        )}
      </div>
      <div className="section">
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input
          type="url"
          placeholder="Preview Image URL"
          className="url1"
          onChange={(e) => setPicture(e.target.value)}
        />
        <label>
          {!validation.picture && (
            <span className="invalid d-block"> Preview image is required</span>
          )}
           {picture&& !ending.some(extension => picture.endsWith(extension)) && <span className="invalid d-block"> image must end in .png, jpg, or jpeg </span> }
        </label>
        <input type="url" placeholder="Image URL" className="url2" onChange={(e) => setUrl2(e.target.value)}/>
        {url2 && !ending.some(extension => url2.endsWith(extension)) && <span className="invalid d-block"> image must end in .png, jpg, or jpeg </span> }
        <input type="url" placeholder="Image URL" className="url3" onChange={(e) => setUrl3(e.target.value)}/>
        {url3 && !ending.some(extension => url2.endsWith(extension)) && <span className="invalid d-block"> image must end in .png, jpg, or jpeg </span> }
        <input type="url" placeholder="Image URL" className="url4" onChange={(e) => setUrl4(e.target.value)}/>
        {url4 && !ending.some(extension => url2.endsWith(extension)) && <span className="invalid d-block"> image must end in .png, jpg, or jpeg </span> }
        <input type="url" placeholder="Image URL" className="url5" onChange={(e) => setUrl5(e.target.value)}/>
        {url5 && !ending.some(extension => url2.endsWith(extension)) && <span className="invalid d-block"> image must end in .png, jpg, or jpeg </span> }
      </div>
      <button type="button" className="btn-primary" onClick={validateAndSubmit}>
        Create Spot
      </button>
    </div>
  );
}
