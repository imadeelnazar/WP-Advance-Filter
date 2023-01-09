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
  const [ errorMsgParentTerm, setErrorMsgParentTerm ] = useState( '' );
  const [ errorMsgWpcfLogic, setErrorMsgWpcfLogic ] = useState( '' );
  const [ errorMsgWpcfSortBy, setErrorMsgWpcfSortBy ] = useState( '' );


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
          window.location.reload(true);

      } )
  }

  const [contacts, setContacts] = useState();
  const [information, setinformation] = useState();
  useEffect( () => {
      axios.get( url )
      .then( ( res ) => {
          setinformation(res.data.wprk_settings);
          setContacts(res.data.wprk_settings);
      }).catch((err) => {
          console.log(err);
      });
  }, [] )




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

    // if(addFormData.parentTerm === ''){
    //   setErrorMsgParentTerm('Data Source cannot be left empty!');
    //   return false;
    // }
    // setErrorMsgParentTerm('');

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
      parentTerm: addFormData.parentTerm,
      wpcfLogic: addFormData.wpcfLogic,
      wpcfSortBy: addFormData.wpcfSortBy,
    };

    const newContacts = [...contacts, newContact] || newContact;
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
      <strong className="footer-pull-right">Design and Developed by <a href="">WPScience</a></strong>
    </div>
  );
};

export default App;
