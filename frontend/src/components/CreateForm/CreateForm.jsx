import "./CreateForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addNewSpot } from "../../store/spots.js";
import { SPOTS_ENDPOINT } from "../../api/endpoints.js";
import { csrfFetch } from "../../store/csrf.js";
import { useDispatch } from "react-redux";

export default function CreateForm() {
  const [streetAddress, setStreetAddress] = useState("");//
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [spotName, setSpotName] = useState("");
  const [picture, setPicture] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [url5, setUrl5] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  let ending = [".jpg", ".jpeg", ".png"];
  const errs = [];
  const isValidForm = () => {
    if (!country) errs.push("Country is required");
    if (!streetAddress) errs.push("Street Address is required");
    if (!city) errs.push("City is required");
    if (!state) errs.push("State is required");
    if (latitude < -90 || latitude > 90) errs.push("Invalid Latitude");
    if (!latitude || isNaN(latitude)) errs.push("Valid Latitude is required");
    if (longitude < -180 || longitude > 180) errs.push("Invalid Longitude");
    if (!longitude || isNaN(longitude))
      errs.push("Valid Longitude is required");
    if (description.length < 30)
      errs.push("Description must be at least 30 characters");
    if (!spotName) errs.push("Name is required");
    if (!price || price < 1) errs.push("Price is required");
    if (
      !picture.length &&
      !ending.some((extension) => picture.endsWith(extension))
    )
      errs.push(
        "Image must have a valid extension",
        "Preview Image is required"
      );
    if (url2.length && !ending.some((extension) => url2.endsWith(extension)))
      errs.push("1Image must have a valid extension");
    if (url3.length && !ending.some((extension) => url3.endsWith(extension)))
      errs.push("2Image must have a valid extension");
    if (url4.length && !ending.some((extension) => url4.endsWith(extension)))
      errs.push("3Image must have a valid extension");
    if (url5.length && !ending.some((extension) => url5.endsWith(extension)))
      errs.push("4Image must have a valid extension");
    setErrors(errs);

    return errs.length === 0;
  };

  // const validateAndSubmit = async (e) => {
  //    e.preventDefault();
  //    if (isValidForm()) {
  //       await createSpot();
  //    }
  // };

  const validateAndSubmit = (e) => {
    e.preventDefault();
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
          await addSpotImages(response.id, {url: picture, preview: true});
        }
        if (url2) {
          await addSpotImages(response.id, {url: url2, preview: false});
        }
        if (url3) {
          await addSpotImages(response.id,  {url: url3, preview: false});
        }
        if (url4) {
          await addSpotImages(response.id,  {url: url4, preview: false});
        }
        if (url5) {
          await addSpotImages(response.id),  {url: url5, preview: false};
        }

        navigate(`/spots/${response.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addSpotImages = async (spotId, picture) => {
    await csrfFetch(`${SPOTS_ENDPOINT}/${spotId}/images`, {
      method: "POST",
      headers: { user: sessionUser },
      body: JSON.stringify({
        url: picture.url,
        preview: picture.preview,
      }),
    })
      .then((resp) => resp.json())
      // .then((response) => {
      //   console.log("Successfully uploaded image");
      // })
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
    <form className="formBody" onSubmit={validateAndSubmit}>
      <div className="section">
        <h1> Create a new Spot </h1>
        <h2> Where&apos;s your place located? </h2>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        <div>
          <label>
            Country
            {errors.includes("Country is required") && (
              <span className="invalid"> Country is required </span>
            )}
          </label>
          {/* <p className="invalid">
            {errors.find((error) => error && error.includes("Country"))}
          </p> */}
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
          <label>Street Address
          {errors.includes("Street Address is required") && (
              <span className="invalid"> Street Address is required </span>
            )}
          </label>
          {/* <p className="invalid">
            {errors.find((error) => error.includes("Street Address"))}
          </p> */}
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
            <label>City
            {errors.includes("City is required") && (
              <span className="invalid"> City is required </span>
            )}
            </label>
            {/* <p className="invalid">
              {errors.find((error) => error.includes("City"))}
            </p> */}
            <input
              type="text"
              value={city}
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              className="city"
              required
            />
          </div>
          <div className="form-group w-70 mr-2">
            <label>State
            {errors.includes("State is required") && (
              <span className="invalid"> State is required </span>
            )}
            </label>
            {/* <p className="invalid">
              {errors.find((error) => error.includes("State"))}
            </p> */}
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
            <label>Latitude
            {errors.includes("Valid Latitude is required") && (
                <span className="invalid"> Valid Latitude is required </span>
              )}
              {errors.includes("Invalid Latitude") && (
                <span className="invalid"> Invalid Latitude </span>
              )}
            </label>
            {/* <p className="invalid">
              {errors.find((error) => error.includes("Invalid Latitude"))}
            </p>
            <p className="invalid">
              {errors.find((error) => error.includes("Valid Latitude"))}
            </p> */}
            <input
              type="text"
              value={latitude}
              placeholder="Latitude"
              onChange={(e) => setLatitude(e.target.value)}
              className="latitude"
              required
            />
          </div>
          <div className="form-group w-50">
            <label>Longitude
            {errors.includes("Valid Longitude is required") && (
                <span className="invalid"> Valid Longitude is required </span>
              )}
              {errors.includes("Invalid Longitude") && (
                <span className="invalid"> Invalid Longitude </span>
              )}
            </label>
            {/* <p className="invalid">
              {errors.find((error) => error.includes("Invalid Longitude"))}
            </p>
            <p className="invalid">
              {errors.find((error) => error.includes("Valid Longitude"))}
            </p> */}
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

        <p className="invalid">
          {errors.find((error) => error.includes("Description"))}
        </p>
      </div>

      <div className="section">
        <h2>Create a title for your spot</h2>
        <p>
          Catch guests&apos; attention with a spot title that highlights what makes
          your place special.
        </p>
        <input
          type="text"
          placeholder="Name of your spot"
          className="text2"
          onChange={(e) => setSpotName(e.target.value)}
          required
        />
        <p className="invalid">
          {errors.find((error) => error.includes("Name"))}
        </p>
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
        <p className="invalid ">
          {errors.find((error) => error.includes("Price"))}
        </p>
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
          <p className="invalid">
            {errors.find((error) => error.includes("Preview"))}
          </p>
          <p className="invalid">
            {errors.find((error) => error.includes("Image"))}
          </p>
          {picture &&
            !ending.some((extension) => picture.endsWith(extension)) && (
              <span className="invalid d-block">
                {" "}
                Image must end in .png, jpg, or jpeg{" "}
              </span>
            )}
        </label>
        <input
          type="url"
          placeholder="Image URL"
          className="url2"
          onChange={(e) => setUrl2(e.target.value)}
        />
        {url2 && !ending.some((extension) => url2.endsWith(extension)) && (
          <span className="invalid d-block">
            {" "}
            Image must end in .png, jpg, or jpeg{" "}
          </span>
        )}
        <input
          type="url"
          placeholder="Image URL"
          className="url3"
          onChange={(e) => setUrl3(e.target.value)}
        />
        {url3 && !ending.some((extension) => url2.endsWith(extension)) && (
          <span className="invalid d-block">
            {" "}
            Image must end in .png, jpg, or jpeg{" "}
          </span>
        )}
        <input
          type="url"
          placeholder="Image URL"
          className="url4"
          onChange={(e) => setUrl4(e.target.value)}
        />
        {url4 && !ending.some((extension) => url2.endsWith(extension)) && (
          <span className="invalid d-block">
            {" "}
            Image must end in .png, jpg, or jpeg{" "}
          </span>
        )}
        <input
          type="url"
          placeholder="Image URL"
          className="url5"
          onChange={(e) => setUrl5(e.target.value)}
        />
        {url5 && !ending.some((extension) => url2.endsWith(extension)) && (
          <span className="invalid d-block">
            {" "}
            Image must end in .png, jpg, or jpeg{" "}
          </span>
        )}
      </div>
      <button type="button" className="btn-primary" onClick={validateAndSubmit}>
        Create Spot
      </button>
    </form>
  );
}
/////////////////////////////////////////////////
