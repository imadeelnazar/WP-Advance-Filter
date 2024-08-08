import React, { useState, Fragment, useEffect, useRef } from "react";

import axios from 'axios';
import { nanoid } from "nanoid";
import AddNewFilterForm from "./FilterPage";
import ReadOnlyFilterRow from "./components/common/ReadOnlyFilterRow";
import EditableFilterRow from "./components/common/EditableFilterRow";


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

  const [loader, setLoader] = useState('Save Settings');
  const [addClassEdit, setAddClassEdit] = useState('');
  const [addParentClassEdit, setParentClassEdit] = useState('app-container');
  const [errorMsgName, setErrorMsgName] = useState('');
  const [errorMsgFacetType, setErrorMsgFacetType] = useState('');
  const [errorMsgDataSource, setErrorMsgDataSource] = useState('');
  const [errorMsgDefaultLabel, setErrorMsgDefaultLabel] = useState('');
  const [errorMsgValueModifier, setErrorMsgValueModifier] = useState('');
  const [errorMsgPostsPerPage, setErrorMsgPostsPerPage] = useState('');
  const [errorMsgWpcfLogic, setErrorMsgWpcfLogic] = useState('');
  const [errorMsgWpcfSortBy, setErrorMsgWpcfSortBy] = useState('');

  // Method to dismiss error messages
  const dismissError = (setError) => {
    setError('');
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
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

  const url = `${appLocalizer.apiUrl}/wpaf/v1/settings`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader('Saving...');
    try {
      await axios.post(url, contacts, {
        headers: {
          'content-type': 'application/json',
          'X-WP-NONCE': appLocalizer.nonce
        }
      });
      setLoader('Save Settings');
    } catch (error) {
      console.error(error);
    }
  };

  const [contacts, setContacts] = useState([]);
  const [information, setInformation] = useState([]);

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setInformation(res.data.wpaf_settings);
        setContacts(res.data.wpaf_settings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [addFormData, setAddFormData] = useState({
    fullName: "",
    facetType: "",
    dataSource: "",
    defaultLabel: "",
    valueModifier: "",
    postsPerPage: "",
    wpcfLogic: "",
    wpcfSortBy: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    facetType: "",
    dataSource: "",
    defaultLabel: "",
    valueModifier: "",
    postsPerPage: "",
    wpcfLogic: "",
    wpcfSortBy: "",
  });

  const [option, setOption] = useState('link');
  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    if (fieldName === 'facetType') {
      setOption(event.target.value);
    }
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
    if (addFormData.fullName === '') {
      setErrorMsgName('Label cannot be left empty!');
      return false;
    }
    if (addFormData.facetType === '') {
      setErrorMsgFacetType('Facet Type cannot be left empty!');
      return false;
    }
    if (addFormData.dataSource === '') {
      setErrorMsgDataSource('Data Source cannot be left empty!');
      return false;
    }
    if (addFormData.defaultLabel === '') {
      setErrorMsgDefaultLabel('Default Label cannot be left empty!');
      return false;
    }
    if (addFormData.valueModifier === '') {
      setErrorMsgValueModifier('Value Modifier cannot be left empty!');
      return false;
    }
    if (addFormData.postsPerPage === '') {
      setErrorMsgPostsPerPage('Posts per Page cannot be left empty!');
      return false;
    }
    if (addFormData.wpcfLogic === '') {
      setErrorMsgWpcfLogic('WP Query Logic cannot be left empty!');
      return false;
    }
    if (addFormData.wpcfSortBy === '') {
      setErrorMsgWpcfSortBy('Sort by cannot be left empty!');
      return false;
    }

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      facetType: addFormData.facetType,
      dataSource: addFormData.dataSource,
      defaultLabel: addFormData.defaultLabel,
      valueModifier: addFormData.valueModifier,
      postsPerPage: addFormData.postsPerPage,
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
    newContacts[index] = { ...newContacts[index], ...editFormData };
    setAddClassEdit('saveClass');
    setParentClassEdit('app-container savingData');
    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);
    setParentClassEdit('app-container updatingData');
    setAddClassEdit('updateClass');
    const { fullName, facetType, dataSource, defaultLabel, valueModifier, postsPerPage, wpcfLogic, wpcfSortBy } = contact;
    const formValues = { fullName, facetType, dataSource, defaultLabel, valueModifier, postsPerPage, wpcfLogic, wpcfSortBy };
    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
    setAddClassEdit('noUpdate');
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
  };

  const handleCancelFormClick = () => {
    setParentClassEdit('app-container');
  };

  const dataTypeOptions = [
    { value: 'link', label: 'Link' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'cselect', label: 'Dropdown (cSelect)' },
    { value: 'hierarchy', label: 'Hierarchy' },
    { value: 'search', label: 'Search' },
  ];

  return (
    <div className={addParentClassEdit}>
      <div className="middle-wrap">
        <h4 className="wp-af-heading">WP AdvanceFilter</h4>
        <button className="add-new-btn-submit btn-submit" type="button" onClick={handleAddNewFormClick}>Add New</button>
        <button className="cancel-btn" type="button" onClick={handleCancelFormClick}>Cancel</button>
        <button className="cancel-btn-edit" type="button" onClick={handleCancelClick}>Cancel</button>
        <div className="topbar-right">
          <button className="btn-submit" onClick={handleSubmit}>{loader}</button>
        </div>
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
                <EditableFilterRow
                  editFormData={editFormData}
                  handleEditFormChange={handleEditFormChange}
                  handleClickOpen={handleClickOpen}
                  handleCategories={categories}
                  handleDataType={dataTypeOptions}
                  errorMsgName={errorMsgName}
                  errorMsgFacetType={errorMsgFacetType}
                  errorMsgDataSource={errorMsgDataSource}
                  errorMsgDefaultLabel={errorMsgDefaultLabel}
                  errorMsgValueModifier={errorMsgValueModifier}
                  errorMsgPostsPerPage={errorMsgPostsPerPage}
                  errorMsgWpcfLogic={errorMsgWpcfLogic}
                  errorMsgWpcfSortBy={errorMsgWpcfSortBy}
                  dismissError={dismissError}
                />
              ) : (
                <ReadOnlyFilterRow
                  contact={contact}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                  handleClickOpen={handleClickOpen}
                  handleCategories={categories}
                  handleDataType={dataTypeOptions}
                />
              )}
            </Fragment>
          ))}
        </div>
        <div className="dialog-box" open={open} onClose={handleClose}>
          <div className="dialog-box-inner">
            <h3>Are you sure you want to do this?</h3>
            <p className="alert-dialog-description">
              Deleting this will remove it from the list.
              You need to save the settings to update the database record.
            </p>
            <div className="dialog-footer">
              <button className="dialog-no" onClick={handleDisagree}>No</button>
              <button className="dialog-yes" onClick={handleAgree} autoFocus>Yes</button>
            </div>
          </div>
        </div>
      </form>
      <AddNewFilterForm
        addFormData={addFormData}
        handleAddFormSubmit={handleAddFormSubmit}
        handleAddFormChange={handleAddFormChange}
        dataTypeOptions={dataTypeOptions}
        categories={categories}
        selectedOption={option}
        errorMsgName={errorMsgName}
        errorMsgFacetType={errorMsgFacetType}
        errorMsgDataSource={errorMsgDataSource}
        errorMsgDefaultLabel={errorMsgDefaultLabel}
        errorMsgValueModifier={errorMsgValueModifier}
        errorMsgPostsPerPage={errorMsgPostsPerPage}
        errorMsgWpcfLogic={errorMsgWpcfLogic}
        errorMsgWpcfSortBy={errorMsgWpcfSortBy}
        dismissError={dismissError}
      />
      <strong className="footer-pull-right">Designed and Developed by <a href="https://wpscience.com">WPScience</a></strong>
    </div>
  );
};

export default App;
