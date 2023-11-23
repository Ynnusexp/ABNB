import "./CreateForm.css";
import { useState } from "react";

export default function CreateForm() {
  const [city, setCity] = useState("");
    //console.log(city)


  return (
    <div>
      <input type="text"
      value={city}
       onChange={(e) => setCity(e.target.value)}
       className="city">
      </input>
    </div>
  );
}
