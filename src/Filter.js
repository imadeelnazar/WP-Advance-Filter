import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { ReactSortable } from "react-sortablejs";

import placeholder from './img/placeholder-image.jpg'; // Tell webpack this JS file uses this image

const Filter = () => {
  const [ loader, setLoader ] = useState( 'Save Filters' );
  const [preset, setPreset] = React.useState([
    { id: 1, pre_type: "simple" },
    { id: 2, pre_type: "modern" },
    { id: 3, pre_type: "classic" },
    { id: 4, pre_type: "vintage" },
    { id: 5, pre_type: "popular" },
  ]);

  const [state, setState] = React.useState([
    { id: 1, type: "image", content: 'Dummy Image' },
    { id: 2, type: "title", content: 'Dummy Title' },
    { id: 3, type: "description", content: 'This is dummy description' },
    { id: 4, type: "author", content: 'Author Name' },
    { id: 5, type: "readmore", content: 'Read More' },
    { id: 6, type: "category", content: 'Category' },
    { id: 7, type: "price", content: 'Price' },
  ]);

  // Define a variable 'url' that contains the API endpoint for saving Filters.
const url = `${appLocalizer.apiUrl}/wpaf/v1/filters`;

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
    setLoader('Save Filters'); // update the text on a button or a span to 'Save Filters'

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
      setState(res.data.wpaf_Filters);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  return (

    <div className="Filter-main-wrapper">
        <button className="btn-submit" onClick={handleSubmit}>{loader}</button>
        <div className='preset-wrap'>
        {preset && preset.map((main) => (
        <div key={main.id} className="preset">
          <label>
            <input type="radio" name="preset_Filter" />
            {main.pre_type}
          </label>
          <ReactSortable
            animation={250}
            delayOnTouchStart={true}
            delay={3}
            className="preset-inner"
            list={state}
            setList={setState}>
             {state && state.map((item) => (
              <div key={item.id + main.id} className={"preset-item " + item.type}>
                {(item.type === 'image' && (
                <img className="item-n-ele" src={placeholder} alt={item.type} />)
                ) || (item.type === 'title' && (
                  <div className={"item-n-ele n-shop-" + item.type }>{item.content}</div>
                )) || (item.type === 'description' && (
                  <div className={"item-n-ele n-shop-" + item.type }>{item.content}</div>
                )) || (item.type === 'author' && (
                  <div className={"item-n-ele n-shop-" + item.type }>{item.content}</div>
                )) || (item.type === 'readmore' && (
                  <div className={"item-n-ele n-shop-" + item.type }>{item.content}</div>
                )) || (item.type === 'category' && (
                  <div className={"item-n-ele n-shop-" + item.type }>{item.content}</div>
                )) || (item.type === 'price' && (
                  <div className={"item-n-ele n-shop-" + item.type }>{item.content}</div>
                ))}
              </div>
             ))}
          </ReactSortable>
        </div>
        ))}
        </div>
    </div>

  )
}
export default Filter;
