import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { ReactSortable } from "react-sortablejs";

import placeholder from './img/placeholder-image.jpg'; // Tell webpack this JS file uses this image
import Sortable from './components/Sortable';

const Template = () => {
  const [ loader, setLoader ] = useState( 'Save Templates' );
  const [preset, setPreset] = React.useState([
    { id: 1, pre_type: "simple" },
    { id: 2, pre_type: "modern" },
    { id: 3, pre_type: "classic" },
    { id: 4, pre_type: "vintage" },
    { id: 5, pre_type: "popular" },
  ]);


  // Define a variable 'url' that contains the API endpoint for saving templates.
const url = `${appLocalizer.apiUrl}/wpaf/v1/templates`;

// Define a function 'handleSubmit' that makes a post request to the API when called.
const handleSubmit = async (e) => {
  e.preventDefault(); // prevent the form from submitting
  setLoader('Saving...'); // update the text on a button or a span to 'Saving...'
  try {
    // Use axios to make a post request to the API with the specified contacts and headers
    const response = await axios.post(url, state, {
      headers: {
        'content-type': 'application/json',
        'X-WP-NONCE': appLocalizer.nonce
      }
    });
    setLoader('Save Templates'); // update the text on a button or a span to 'Save templates'

  } catch (error) {
    console.error(error); // log the error to the console
  }
}

// Use the useEffect hook to fetch data from the API when the component is loaded
// This effect only runs once when the component is first loaded.
useEffect(() => {
  // use axios to make a get request to the specified url
  axios
    .get(url)
    .then((res) => {
      // update the 'contacts' state variable with the data from the API
      setState(res.data.wpaf_templates);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  return (

    <div className="template-main-wrapper">
        <button className="btn-submit" onClick={handleSubmit}>{loader}</button>
        <div className='preset-wrap'>
        {preset && preset.map((main) => (
        <div key={main.id} className="preset">
          <label>
            <input type="radio" name="preset_template" />
            {main.pre_type}
          </label>
          <Sortable main={main} />
        </div>
        ))}
        </div>
    </div>

  )
}
export default Template;
