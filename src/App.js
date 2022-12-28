import React, { useState, Fragment, useEffect } from "react";
import axios from 'axios';


import { nanoid } from "nanoid";
import "./App.css";

import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {

    const [ loader, setLoader ] = useState( 'Save Settings' );
    const [ addClassEdit, setaddClassEdit ] = useState( '' );
    const [ addParentClassEdit, setParentClassEdit ] = useState( 'app-container' );


    const [categories, setCategories] = useState([]);
    useEffect(() => {
    fetch(appLocalizer.apiUrl + "/wp/v2/taxonomies")
        .then(response => response.json())
        .then(data => {
            setCategories(data);
        })
    }, []);


    const url = `${appLocalizer.apiUrl}/wprk/v1/settings`;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader( 'Saving...' );
        // console.log(inputFields[0]);
        axios.post( url, contacts, {
            headers: {
                'content-type': 'application/json',
                'X-WP-NONCE': appLocalizer.nonce
            }
        } )
        .then( ( res ) => {
            setLoader( 'Save Settings' );
        } )
    }
    const [contacts, setContacts] = useState();
    const [information, setinformation] = useState();
    useEffect( () => {
        axios.get( url )
        .then( ( res ) => {
            setinformation(res.data.ciwp_title);
            setContacts(res.data.ciwp_title);
        }).catch((err) => {
            console.log(err);
        });
    }, [] )

// console.log(contacts)


  const [addFormData, setAddFormData] = useState({
    fullName: "",
    facetType: "",
    dataSource: "",
    defaultLabel: "",
    valueModifier: "",
    parentTerm: "",
    wpcfLogic: "",
    wpcfSortBy: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    facetType: "",
    dataSource: "",
    defaultLabel: "",
    valueModifier: "",
    parentTerm: "",
    wpcfLogic: "",
    wpcfSortBy: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };


  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      facetType: addFormData.facetType,
      dataSource: addFormData.dataSource,
      defaultLabel: addFormData.defaultLabel,
      valueModifier: addFormData.valueModifier,
      parentTerm: addFormData.parentTerm,
      wpcfLogic: addFormData.wpcfLogic,
      wpcfSortBy: addFormData.wpcfSortBy,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);

    setParentClassEdit('app-container savingData');
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      facetType: editFormData.facetType,
      dataSource: editFormData.dataSource,
      defaultLabel: editFormData.defaultLabel,
      valueModifier: editFormData.valueModifier,
      parentTerm: editFormData.parentTerm,
      wpcfLogic: editFormData.wpcfLogic,
      wpcfSortBy: editFormData.wpcfSortBy,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;
    setaddClassEdit('saveClass')
    setParentClassEdit('app-container savingData');
    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);
    setParentClassEdit('app-container updatingData');
    setaddClassEdit('updateClass')

    const formValues = {
      fullName: contact.fullName,
      facetType: contact.facetType,
      dataSource: contact.dataSource,
      defaultLabel: contact.defaultLabel,
      valueModifier: contact.valueModifier,
      parentTerm: contact.parentTerm,
      wpcfLogic: contact.wpcfLogic,
      wpcfSortBy: contact.wpcfSortBy,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
    setaddClassEdit('noUpdate')
    setParentClassEdit('app-container noData');
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);
    setParentClassEdit('app-container noData');

    setContacts(newContacts);
  };

  const handleAddNewFormClick = () => {
    setParentClassEdit('app-container addNewElement');
  }

  const handleCancelFormClick = () => {
    setParentClassEdit('app-container');
  }

  const dataType_o = [
      { value: 'checkboxes', label: 'Checkboxes' },
      { value: 'dropdown', label: 'Dropdown' },
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
          <li>Template</li>
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
        <button type="submit" onClick={handleAddNewFormClick}>Add New</button>
        <button className="cancel-btn" type="submit" onClick={handleCancelFormClick}>Back</button>
      </div>
      <form className="edit-form" onSubmit={handleEditFormSubmit}>
        <div className={addClassEdit}>
          <div className="edit-simple-header">
            <div className="edit-simple-item"><strong>Label</strong></div>
            <div className="edit-simple-item"><strong>Data Type</strong></div>
            <div className="edit-simple-item"><strong>Source Type</strong></div>
            <div className="edit-simple-item"><strong>Parent Term</strong></div>
            <div className="edit-simple-item"><strong>Action</strong></div>
          </div>
            {contacts && contacts.map((contact) => (
              <Fragment key={contact.id}>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    handleCategories={categories}
                    handleDataType={dataType_o}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleCategories={categories}
                    handleDataType={dataType_o}
                  />
                )}
              </Fragment>
            ))}
          </div>
      </form>
      <form className="add-form">
        {/* {(evnt)=>handleChange(index, evnt)} */}
        <div className="wp-category-form-wrap">
          <div className="wp-category-item-field">
            <label>Label:</label>
            <input
              type="text"
              name="fullName"
              required="required"
              placeholder="Enter a name..."
              onChange={handleAddFormChange}
            />
          </div>
          <div className="wp-category-item-field">
            <label>Facet type::</label>
            <select name="facetType" required="required" onChange={handleAddFormChange}>
              {dataType_o.map(( val, label ) => <option key={label} >{val.label}</option>)}
            </select>
          </div>
          <div className="wp-category-item-field">
            <label>Data source:</label>
            <select name="dataSource" required="required" onChange={handleAddFormChange}>
              {Object.values(categories).map((category, i) => (
                  <option key={i}>{category.name}</option>
              ))}
            </select>
          </div>
          <hr />
          <div className="wp-category-item-field">
            <label>Default Label:</label>
            <input
              type="text"
              name="defaultLabel"
              required="required"
              placeholder="Enter an default label or leave blank"
              onChange={handleAddFormChange}
            />
          </div>
          <div className="wp-category-item-field">
            <label>Value Modifiers:</label>
            <select name="valueModifier" required="required" onChange={handleAddFormChange}>
              <option value="off">Off</option>
              <option value="exclude">Exclude these values</option>
              <option value="include">Show only these values</option>
            </select>
          </div>
          <div className="wp-category-item-field">
            <label>Parent term:</label>
            <input
              type="text"
              name="parentTerm"
              required="required"
              placeholder="Enter an term ID or leave blank"
              onChange={handleAddFormChange}
            />
          </div>
          <div className="wp-category-item-field">
            <label>Logic:</label>
            <select name="wpcfLogic" required="required" onChange={handleAddFormChange}>
              <option value="and">AND (match all)</option>
              <option value="or">OR (match any)</option>
            </select>
          </div>
          <div className="wp-category-item-field">
            <label>Sort by:</label>
            <select name="wpcfSortBy" required="required" onChange={handleAddFormChange}>
              <option value="count">Highest count</option>
              <option value="display_value">Display value</option>
              <option value="raw_value">Raw value</option>
              <option value="term_order">Term order</option>
            </select>
          </div>
          <button onClick={handleAddFormSubmit} type="submit">Save Filter</button>
        </div>
      </form>
      <strong className="footer-pull-right">Design and Developed by <a href="">WPScience</a></strong>
    </div>
  );
};

export default App;
