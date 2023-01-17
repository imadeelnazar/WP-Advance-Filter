import React, { useState, Fragment, useEffect } from "react";
import axios from 'axios';
import { nanoid } from "nanoid";

import "./App.css";

import AFNewForm from "./components/AFNewForm";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {

  /* Dialog Box Starts*/
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    setDeleteID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === deleteID);

    newContacts.splice(index, 1);
    setParentClassEdit('app-container noData');

    setContacts(newContacts);
    handleClose();
  };

  const handleDisagree = () => {
    handleClose();
  };
  /* Dialog Box Ends */

  const [ loader, setLoader ] = useState( 'Save Settings' );
  const [ addClassEdit, setaddClassEdit ] = useState( '' );
  const [ addParentClassEdit, setParentClassEdit ] = useState( 'app-container' );

  const [ errorMsgName, setErrorMsgName ] = useState( '' );
  const [ errorMsgfacetType, setErrorMsgfacetType ] = useState( '' );
  const [ errorMsgDataSource, setErrorMsgDataSource ] = useState( '' );
  const [ errorMsgDefaultLabel, setErrorMsgDefaultLabel ] = useState( '' );
  const [ errorMsgValueModifier, setErrorMsgValueModifier ] = useState( '' );
  const [ errorMsgpostsperpage, setErrorMsgpostsperpage ] = useState( '' );
  const [ errorMsgWpcfLogic, setErrorMsgWpcfLogic ] = useState( '' );
  const [ errorMsgWpcfSortBy, setErrorMsgWpcfSortBy ] = useState( '' );


 // Use the useState hook to create a state variable 'categories' and the setCategories function to update it.
const [categories, setCategories] = useState([]);

// Use the useEffect hook to fetch data from the API when the component is loaded.
// This effect only runs once when the component is first loaded.
useEffect(() => {
  // Use the async/await pattern to handle the promise returned by the fetch call
  const fetchData = async () => {
    try {
      const response = await fetch(appLocalizer.apiUrl + "/wp/v2/taxonomies");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, []);


// Define a variable 'url' that contains the API endpoint for saving settings.
const url = `${appLocalizer.apiUrl}/wprk/v1/settings`;

// Define a function 'handleSubmit' that makes a post request to the API when called.
const handleSubmit = async (e) => {
  e.preventDefault(); // prevent the form from submitting
  setLoader('Saving...'); // update the text on a button or a span to 'Saving...'
  try {
    // Use axios to make a post request to the API with the specified contacts and headers
    const response = await axios.post(url, contacts, {
      headers: {
        'content-type': 'application/json',
        'X-WP-NONCE': appLocalizer.nonce
      }
    });
    setLoader('Save Settings'); // update the text on a button or a span to 'Save Settings'
    window.location.reload(true); // reload the page
  } catch (error) {
    console.error(error); // log the error to the console
  }
}

// Use the useState hook to create a state variable 'contacts' and the setContacts function to update it
const [contacts, setContacts] = useState();

// Use the useState hook to create a state variable 'information' and the setInformation function to update it
const [information, setInformation] = useState();

// Use the useEffect hook to fetch data from the API when the component is loaded
// This effect only runs once when the component is first loaded.
useEffect(() => {
  // use axios to make a get request to the specified url
  axios
    .get(url)
    .then((res) => {
      // update the 'information' state variable with the data from the API
      setInformation(res.data.wprk_settings);
      // update the 'contacts' state variable with the data from the API
      setContacts(res.data.wprk_settings);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);


  // Use the useState hook to create a state variable
  // 'addFormData'
  // and the setAddFormData function to update it
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    facetType: "",
    dataSource: "",
    defaultLabel: "",
    valueModifier: "",
    postsperpage: "",
    wpcfLogic: "",
    wpcfSortBy: "",
  });

  // Use the useState hook to create a state variable
  // 'editFormData'
  // and the setEditFormData function to update it
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    facetType: "",
    dataSource: "",
    defaultLabel: "",
    valueModifier: "",
    postsperpage: "",
    wpcfLogic: "",
    wpcfSortBy: "",
  });

  // Use the useState hook to create a state variable 'editContactId' and the setEditContactId function to update it
  const [editContactId, setEditContactId] = useState(null);

  // Handle change events for the add form
  const handleAddFormChange = (event) => {
      event.preventDefault();

      // Get the name and value of the input field that triggered the event
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;

      // Create a new object that is a copy of the current form data
      const newFormData = { ...addFormData };
      // Update the value of the field in the new object that corresponds to the input field that triggered the event
      newFormData[fieldName] = fieldValue;

      // Update the form data state variable with the new object
      setAddFormData(newFormData);
  };

  // Handle change events for the edit form
  const handleEditFormChange = (event) => {
      event.preventDefault();

      // Get the name and value of the input field that triggered the event
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;

      // Create a new object that is a copy of the current form data
      const newFormData = { ...editFormData };
      // Update the value of the field in the new object that corresponds to the input field that triggered the event
      newFormData[fieldName] = fieldValue;

      // Update the form data state variable with the new object
      setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    // if(addFormData.fullName === ''){
    //   setErrorMsgName('Label cannot be left empty!');
    //   return false;
    // }
    // setErrorMsgName('');

    // if ( addFormData.facetType === '' ){
    //   setErrorMsgfacetType('Facet Type cannot be left empty!');
    //   return false;
    // }
    // setErrorMsgfacetType('');

    // if(addFormData.dataSource === ''){
    //   setErrorMsgDataSource('Data Source cannot be left empty!');
    //   return false;
    // }
    // setErrorMsgDataSource('');

    // if(addFormData.defaultLabel === ''){
    //   setErrorMsgDefaultLabel('Data Source cannot be left empty!');
    //   return false;
    // }
    // setErrorMsgDefaultLabel('');

    // if(addFormData.valueModifier === ''){
    //   setErrorMsgValueModifier('Data Source cannot be left empty!');
    //   return false;
    // }
    // setErrorMsgValueModifier('');

    // if(addFormData.postsperpage === ''){
    //   setErrorMsgpostsperpage('Data Source cannot be left empty!');
    //   return false;
    // }
    // setErrorMsgpostsperpage('');

    // if(addFormData.wpcfLogic === ''){
    //   setErrorMsgWpcfLogic('Data Source cannot be left empty!');
    //   return false;
    // }
    // setErrorMsgWpcfLogic('');

    // if(addFormData.wpcfSortBy === ''){
    //   setErrorMsgWpcfSortBy('Data Source cannot be left empty!');
    //   return false;
    // }
    // setErrorMsgWpcfSortBy('');

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      facetType: addFormData.facetType,
      dataSource: addFormData.dataSource,
      defaultLabel: addFormData.defaultLabel,
      valueModifier: addFormData.valueModifier,
      postsperpage: addFormData.postsperpage,
      wpcfLogic: addFormData.wpcfLogic,
      wpcfSortBy: addFormData.wpcfSortBy,
    };

    const newContacts = [...contacts, newContact] || newContact;
    setContacts(newContacts);

    setParentClassEdit('app-container savingData');
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    const newContacts = [...contacts];
    newContacts[index] = {...newContacts[index], ...editFormData};

    setaddClassEdit('saveClass')
    setParentClassEdit('app-container savingData');
    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);
    setParentClassEdit('app-container updatingData');
    setaddClassEdit('updateClass');

    // extract the properties from the contact object that need to be used to populate the form
    const { fullName, facetType, dataSource, defaultLabel, valueModifier, postsperpage, wpcfLogic, wpcfSortBy } = contact;

    // create an object with the properties that will be used to set the form data
    const formValues = { fullName, facetType, dataSource, defaultLabel, valueModifier, postsperpage, wpcfLogic, wpcfSortBy };

    setEditFormData(formValues);
  };

  // Function to handle the cancel button click event
const handleCancelClick = () => {
    // Reset the edit contact ID to null
    setEditContactId(null);
    // Set the class for update button to 'noUpdate'
    setaddClassEdit('noUpdate')
    // Set the parent container class to 'app-container noData'
    setParentClassEdit('app-container noData');
  };

// Function to handle the delete button click event
const handleDeleteClick = (contactId) => {
    // Create a new array of contacts
    const newContacts = [...contacts];

    // Find the index of the contact to be deleted
    const index = contacts.findIndex((contact) => contact.id === contactId);

    // Remove the contact from the array using splice()
    newContacts.splice(index, 1);
    // Set the parent container class to 'app-container noData'
    setParentClassEdit('app-container noData');

    // Update the state with the new array of contacts
    setContacts(newContacts);
  };

  const handleAddNewFormClick = () => {
    setParentClassEdit('app-container addNewElement');
  }

  const handleCancelFormClick = () => {
    setParentClassEdit('app-container');
  }

  const dataType_o = [
      { value: 'link', label: 'Link' },
      { value: 'dropdown', label: 'Dropdown' },
      { value: 'checkbox', label: 'Checkbox' },
      { value: 'cselect', label: 'Dropdown (cSelect)' },
      { value: 'hierarchy', label: 'Hierarchy' },
      { value: 'search', label: 'Search' },
      { value: 'autocomplete', label: 'Autocomplete' },
      { value: 'slider', label: 'Slider' },
      { value: 'date_range', label: 'Date Range' },
      { value: 'number_range', label: 'Number Range' },
      { value: 'proximity', label: 'Proximity' },
      { value: 'radio', label: 'Radio' },
      { value: 'rating', label: 'Star Rating' },
      { value: 'pager', label: 'Pager' },
      { value: 'sort', label: 'Sort' },
  ];

  return (
    <div className={addParentClassEdit}>
      <div className="top-row">
        <div className="topbar-left">
        <div className=""><a href="">WP AdvanceFilter</a><span>Version 1.0</span></div>
        <ul className="nav">
          <li>Advance Filter</li>
          <li>Settings</li>
          <li>Support</li>
        </ul>
        </div>
        <div className="topbar-right">
          <button onClick={handleSubmit}>{loader}</button>
        </div>
      </div>
      <div className="middle-wrap">
        <h4 className="wp-af-heading">WP AdvanceFilter</h4>
        <button className="add-new-btn-submit" type="submit" onClick={handleAddNewFormClick}>Add New</button>
        <button className="cancel-btn" type="submit" onClick={handleCancelFormClick}>Cancel</button>
        <button className="cancel-btn-edit" type="button" onClick={handleCancelClick}>Cancel</button>
      </div>
      <form className="edit-form" onSubmit={handleEditFormSubmit}>
        <div className={addClassEdit}>
          <div className="edit-simple-header">
            <div className="edit-simple-item"><strong>Label</strong></div>
            <div className="edit-simple-item"><strong>Data Type</strong></div>
            <div className="edit-simple-item"><strong>Source Type</strong></div>
            <div className="edit-simple-item"><strong>Shortcode</strong></div>
            <div className="edit-simple-item"><strong>Action</strong></div>
          </div>
            {contacts && contacts.map((contact) => (
              <Fragment key={contact.id}>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleClickOpen={handleClickOpen}
                    handleCategories={categories}
                    handleDataType={dataType_o}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleClickOpen={handleClickOpen}
                    handleCategories={categories}
                    handleDataType={dataType_o}
                  />
                )}
              </Fragment>
            ))}
          </div>
           <div className="dialog-box" open={open} onClose={handleClose}>
            <div className="dialog-box-inner">
              <h3>Are you sure want to do this?</h3>
              <p className="alert-dialog-description">
              Deleting this will remove this from the list
              you need to save the settings to update the database record.
              </p>
              <div className="dialog-footer">
                <button className="dialog-no" onClick={handleDisagree}>No</button>
                <button className="dialog-yes" onClick={() => handleAgree()} autoFocus>Yes</button>
              </div>
            </div>
          </div>
      </form>
      <AFNewForm
        addFormData={addFormData}
        handleAddFormSubmit={handleAddFormSubmit}
        handleAddFormChange={handleAddFormChange}
        dataType_o={dataType_o}
        categories={categories}
      />
      <strong className="footer-pull-right">Design and Developed by <a href="#">WPScience</a></strong>
    </div>
  );
};

export default App;
