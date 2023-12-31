import "./UpdateForm.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSpotById, updateSpotApi } from "../../store/spots.js";
import { SPOTS_ENDPOINT } from "../../api/endpoints.js";
import { csrfFetch } from "../../store/csrf.js";
import { useDispatch } from "react-redux";

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

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  console.log(updateSpotApi)

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
    const errs = [];

    if (!country) errs.push("Country is required");
    if (!streetAddress) errs.push("Street Address is required");
    if (!city) errs.push("City is required");
    if (!state) errs.push("State is required");
    if (!latitude || isNaN(latitude)) errs.push("Valid Latitude is required");
    if (latitude < -90 || latitude > 90) errs.push("Invalid Latitude");
    if (!longitude || isNaN(longitude))
      errs.push("Valid Longitude is required");
    if (longitude < -180 || longitude > 180) errs.push("Invalid Longitude");
    if (description.length < 30)
      errs.push("Description must be at least 30 characters");
    if (!spotName) errs.push("Title is required");
    if (!price || price < 1) errs.push("Price is required");
    if (!picture.length) errs.push("Preview Image is required");

    setErrors(errs);

    return errs.length === 0;
  };

  const validateAndSubmit = () => {
    if (isValidForm()) {
      updateSpot();
    }
  };

  const updateSpot = async () => {
    const previewImage = picture;
    csrfFetch(`${SPOTS_ENDPOINT}/${spotId}`, {
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
    <form className="formBody">
      <div className="section">
        <h1> Update your Spot </h1>
        <h2> Where&apos;s your place located? </h2>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        <div>
          <label>
            Country{" "}
            {errors.includes("Country is required") && (
              <span className="invalid"> Country is required </span>
            )}
          </label>
          <input
            type="text"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
            className="country"
            maxLength={30}
            required
          />
          {country.length === 30 && <p className="invalid d-block" > Max Length: 30 characters </p>}
        </div>
        <div>
          <label>
            Street Address{" "}
            {errors.includes("Street Address is required") && (
              <span className="invalid"> Street Address is required </span>
            )}
          </label>
          <input
            type="text"
            value={streetAddress}
            placeholder="Address"
            onChange={(e) => setStreetAddress(e.target.value)}
            className="address"
            maxLength={30} //
            required
          />
          {streetAddress.length === 30 && <p className="invalid d-block" > Max Length: 30 characters </p>}
        </div>

        <div className="cityState  d-flex w-100">
        <div className="form-group w-70 mr-2">
          <label>
            City{" "}
            {errors.includes("City is required") && (
              <span className="invalid"> City is required </span>
            )}
          </label>
          <input
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            className="city"
            maxLength={15} //
            required
          />
          {city.length === 15 && <p className="invalid d-block" > Max Length: 15 characters </p>}
          </div>
          <div className="form-group w-70 mr-2">
          <label>
            State{" "}
            {errors.includes("State is required") && (
              <span className="invalid"> State is required </span>
            )}
          </label>
          <input
            type="text"
            value={state}
            placeholder="State (must be abbreviated)"
            onChange={(e) => setState(e.target.value)}
            className="state"
            maxLength={2} //
            required
          />
          {state.length === 2 && <p className="invalid d-block" > Max Length: 2 characters  </p>}
        </div>
        </div>
        <div className="ll d-flex w-100">
          <div className="form-group w-50 mr-2">
            <label>
              Latitude{" "}
              {errors.includes("Valid Latitude is required") && (
                <span className="invalid"> Valid Latitude is required </span>
              )}
              {errors.includes("Invalid Latitude") && (
                <span className="invalid"> Invalid Latitude </span>
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
            {(latitude > 90 || latitude < -90) && <p className="invalid d-block" > Must be between -90 and 90</p>}
          </div>
          <div className="form-group w-50">
            <label>
              Longitude{" "}
              {errors.includes("Valid Longitude is required") && (
                <span className="invalid"> Valid Longitude is required </span>
              )}
              {errors.includes("Invalid Longitude") && (
                <span className="invalid"> Invalid Longitude </span>
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
            {(longitude > 180 || longitude < -180) && <p className="invalid d-block" > Must be between -180 and 180</p>}
          </div>
        </div>
      </div>
      <div />

      <div className="section">
        <h2>Describe your place to guests</h2>
        <p>
          Mention the best features of your space, any special amenities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <textarea
          type="text"
          placeholder=" Please write at least 30 characters"
          className="text1 w-100"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200} //
          required
        ></textarea>
        {errors.includes("Description must be at least 30 characters") && (
          <span className="invalid">
            {" "}
            Description needs a minimum of 30 characters{" "}
          </span>
        )}
         {description.length >=200 && <p className="invalid d-block"> Max Length: 200 Characters </ p>}
      </div>

      <div className="section">
        <h2> Create a title for your spot </h2>
        <p>
          Catch guests&apos; attention with a spot title that highlights what makes
          your place special.
        </p>
        <input
          type="text"
          placeholder="Name of your spot"
          className="text2"
          value={spotName}
          onChange={(e) => setSpotName(e.target.value)}
          maxLength={20} //
          required
        />
        {errors.includes("Title is required") && (
          <span className="invalid d-block"> Name is required</span>
        )}
         {spotName.length >=20 && <p className="invalid d-block"> Max Length: 20 Characters </ p>}
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
            value={price <= 9999999 ? price >=0 ? price : 0 : 9999999}
            onChange={(e) => setPrice(e.target.value)}
            // onChange={e => {
            //   if (price.length <= 6) {setPrice(e.target.value)}
            //   else setPrice(e.target.value.substring(0,6))}
            //   }
            required
          />
        </span>
        {errors.includes("Price is required") && (
          <span className="invalid"> Price is required</span>
        )}
         {price < 0 && <p className="invalid d-block"> Price cannot be negative or exceed $9,999,999 USD </ p>}
      </div>
      {/* <div className="section">
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input
          type="text"
          placeholder="Preview Image URL"
          className="url1"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        />
        <label>
          {errors.includes("Preview Image is required") && (
            <span className="invalid d-block"> Preview image is required</span>
          )}
        </label>
        <input type="text" placeholder="Image URL" className="url2" />
        <input type="text" placeholder="Image URL" className="url3" />
        <input type="text" placeholder="Image URL" className="url4" />
        <input type="text" placeholder="Image URL" className="url5" />
      </div> */}
      <button type="button" className="btn-primary" onClick={validateAndSubmit}>
        Update your Spot
      </button>
    </form>
  );
}
