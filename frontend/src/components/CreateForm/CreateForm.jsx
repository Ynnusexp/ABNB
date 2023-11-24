import "./CreateForm.css";
import { useState } from "react";

export default function CreateForm() {
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submit" + country)
  };



  return (
    <div className="formBody">
      <form onSubmit={handleSubmit}>
        <div className="section1">
          <h1> Create a new Spot </h1>
          <h2> Where's your place located? </h2>
          <h3>
            Guests will only get your exact address once they booked a
            reservation.
          </h3>
          <div>
            <h3>Country</h3>
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
            <h3>Street Address</h3>
            <input
              type="text"
              value={streetAddress}
              placeholder="Address"
              onChange={(e) => setStreetAddress(e.target.value)}
              className="address"
            />
          </div>
          <div className="cityState">
            <h3>City</h3>
            <input
              type="text"
              value={city}
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              className="city"
            />

            <h3>State</h3>

            <input
              type="text"
              value={state}
              placeholder="STATE"
              onChange={(e) => setState(e.target.value)}
              className="state"
            />
          </div>

          <div className="ll">
            <h3>Latitude</h3>
            <input
              type="text"
              value={latitude}
              placeholder="Latitude"
              onChange={(e) => setLatitude(e.target.value)}
              className="latitude"
            />
            <h3>Longitude</h3>
            <input
              type="text"
              value={longitude}
              placeholder="Longitude"
              onChange={(e) => setLongitude(e.target.value)}
              className="longitude"
            />
          </div>
        </div>

        <div className="section2">
          <h2> Describe your place to guests </h2>
          <p>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <input
            type="text"
            placeholder="Please write at least 30 characters"
            className="text1"
          />
        </div>

        <div className="section3">
          <h2>Create a title for your spot</h2>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <input
            type="text"
            placeholder="Name of your spot"
            className="text2"
          />
        </div>
        <div className="section4">
          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          $
          <input
            type="text"
            placeholder="Price per night (USD)"
            className="text3"
          />
        </div>
        <div className="section5">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input type="text" placeholder="Preview Image URL" className="url1" />
          <input type="text" placeholder="Image URL" className="url2" />
          <input type="text" placeholder="Image URL" className="url3" />
          <input type="text" placeholder="Image URL" className="url4" />
          <input type="text" placeholder="Image URL" className="url5" />
        </div>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}
