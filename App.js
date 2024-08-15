import React, { useState, Fragment, useEffect } from "react";
import axios from 'axios';
import { nanoid } from "nanoid";
import AddNewFilterForm from "./components/forms/FilterForm";
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


  // Method to dismiss error messages
  const dismissError = (setError) => {
    setError('');
  };

const [categories, setCategories] = useState([]);
const [loadingCategories, setLoadingCategories] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(appLocalizer.apiUrl + "/wp/v2/taxonomies");
      const data = await response.json();
      console.log('Fetched categories response:', data); // Logging the fetched data to verify structure
      if (Array.isArray(data)) {
        setCategories(data);
      } else if (typeof data === 'object' && data !== null) {
        // If the data is an object, you might need to get the values from the object
        setCategories(Object.values(data));
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
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
    parentTerm: "",
    valueModifierItems: "",
    hierarchical: "",
    showExpanded: "",
    showGhosts: "",
    preserveShowGhosts: "",
    count: "",
    emptyCategory: "",
    postsPerPage: "",
    wpcfLogic: "",
    wpcfSortBy: "",
    facetLogic: ""
  });

  const [errorMsgName, setErrorMsgName] = useState('');
  const [errorMsgFacetType, setErrorMsgFacetType] = useState('');
  const [errorMsgDataSource, setErrorMsgDataSource] = useState('');
  const [errorMsgDefaultLabel, setErrorMsgDefaultLabel] = useState('');
  const [errorMsgValueModifier, setErrorMsgValueModifier] = useState('');
  const [errorMsgPostsPerPage, setErrorMsgPostsPerPage] = useState('');
  const [errorMsgWpcfLogic, setErrorMsgWpcfLogic] = useState('');
  const [errorMsgWpcfSortBy, setErrorMsgWpcfSortBy] = useState('');
  const [errorMsgParentTerm, setErrorMsgParentTerm] = useState('');
  const [errorMsgHierarchical, setErrorMsgHierarchical] = useState('');
  const [errorMsgShowExpanded, setErrorMsgShowExpanded] = useState('');
  const [errorMsgShowGhosts, setErrorMsgShowGhosts] = useState('');
  const [errorMsgPreserveShowGhosts, setErrorMsgPreserveShowGhosts] = useState('');
  const [errorMsgCount, setErrorMsgCount] = useState('');
  const [errorMsgEmptyCategory, setErrorMsgEmptyCategory] = useState('');
  const [errorMsgFacetLogic, setErrorMsgFacetLogic] = useState('');


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

  // Clear the respective error message
  switch (fieldName) {
    case 'fullName':
      setErrorMsgName('');
      break;
    case 'facetType':
      setErrorMsgFacetType('');
      break;
    case 'dataSource':
      setErrorMsgDataSource('');
      break;
    case 'defaultLabel':
      setErrorMsgDefaultLabel('');
      break;
    case 'valueModifier':
      setErrorMsgValueModifier('');
      break;
    case 'parentTerm':
      setErrorMsgParentTerm('');
      break;
    case 'hierarchical':
      setErrorMsgHierarchical('');
      break;
    case 'showExpanded':
      setErrorMsgShowExpanded('');
      break;
    case 'showGhosts':
      setErrorMsgShowGhosts('');
      break;
    case 'preserveShowGhosts':
      setErrorMsgPreserveShowGhosts('');
      break;
    case 'count':
      setErrorMsgCount('');
      break;
    case 'emptyCategory':
      setErrorMsgEmptyCategory('');
      break;
    case 'postsPerPage':
      setErrorMsgPostsPerPage('');
      break;
    case 'wpcfLogic':
      setErrorMsgWpcfLogic('');
      break;
    case 'wpcfSortBy':
      setErrorMsgWpcfSortBy('');
      break;
    case 'facetLogic':
      setErrorMsgFacetLogic('');
      break;
    default:
      break;
  }
};


  const handleEditFormChange = (event) => {
  event.preventDefault();
  const fieldName = event.target.getAttribute("name");
  const fieldValue = event.target.value;

  const newFormData = { ...editFormData };
  newFormData[fieldName] = fieldValue;
  setEditFormData(newFormData);

  // Clear the respective error message
  switch (fieldName) {
    case 'fullName':
      setErrorMsgName('');
      break;
    case 'facetType':
      setErrorMsgFacetType('');
      break;
    case 'dataSource':
      setErrorMsgDataSource('');
      break;
    case 'defaultLabel':
      setErrorMsgDefaultLabel('');
      break;
    case 'valueModifier':
      setErrorMsgValueModifier('');
      break;
    case 'postsPerPage':
      setErrorMsgPostsPerPage('');
      break;
    case 'wpcfLogic':
      setErrorMsgWpcfLogic('');
      break;
    case 'wpcfSortBy':
      setErrorMsgWpcfSortBy('');
      break;
    default:
      break;
  }
};


const handleAddFormSubmit = (event) => {
  event.preventDefault();
  let hasError = false;

  if (addFormData.fullName === '') {
    setErrorMsgName('Label cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgName('');
  }
  if (addFormData.facetType === '') {
    setErrorMsgFacetType('Facet Type cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgFacetType('');
  }
  if (addFormData.dataSource === '') {
    setErrorMsgDataSource('Data Source cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgDataSource('');
  }
  if (addFormData.defaultLabel === '') {
    setErrorMsgDefaultLabel('Default Label cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgDefaultLabel('');
  }
  if (addFormData.valueModifier === '') {
    setErrorMsgValueModifier('Value Modifier cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgValueModifier('');
  }
  if (addFormData.parentTerm === '') {
    setErrorMsgParentTerm('Parent term cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgParentTerm('');
  }
  if (addFormData.hierarchical === '') {
    setErrorMsgHierarchical('Hierarchical cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgHierarchical('');
  }
  if (addFormData.showExpanded === '') {
    setErrorMsgShowExpanded('Show expanded cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgShowExpanded('');
  }
  if (addFormData.showGhosts === '') {
    setErrorMsgShowGhosts('Show ghosts cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgShowGhosts('');
  }
  if (addFormData.preserveShowGhosts === '') {
    setErrorMsgPreserveShowGhosts('Preserve ghost order cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgPreserveShowGhosts('');
  }
  if (addFormData.count === '') {
    setErrorMsgCount('Count cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgCount('');
  }
  if (addFormData.emptyCategory === '') {
    setErrorMsgEmptyCategory('Empty category cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgEmptyCategory('');
  }
  if (addFormData.postsPerPage === '') {
    setErrorMsgPostsPerPage('Posts per Page cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgPostsPerPage('');
  }
  if (addFormData.wpcfLogic === '') {
    setErrorMsgWpcfLogic('WP Query Logic cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgWpcfLogic('');
  }
  if (addFormData.wpcfSortBy === '') {
    setErrorMsgWpcfSortBy('Sort by cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgWpcfSortBy('');
  }
  if (addFormData.facetLogic === '') {
    setErrorMsgFacetLogic('Facet logic cannot be left empty!');
    hasError = true;
  } else {
    setErrorMsgFacetLogic('');
  }

  // console.log(hasError)

  // if (hasError) {
  //   return false;
  // }

  const newContact = {
    id: nanoid(),
    fullName: addFormData.fullName,
    facetType: addFormData.facetType,
    dataSource: addFormData.dataSource,
    defaultLabel: addFormData.defaultLabel,
    valueModifier: addFormData.valueModifier,
    parentTerm: addFormData.parentTerm,
    valueModifierItems: addFormData.valueModifierItems,
    hierarchical: addFormData.hierarchical,
    showExpanded: addFormData.showExpanded,
    showGhosts: addFormData.showGhosts,
    preserveShowGhosts: addFormData.preserveShowGhosts,
    count: addFormData.count,
    emptyCategory: addFormData.emptyCategory,
    postsPerPage: addFormData.postsPerPage,
    wpcfLogic: addFormData.wpcfLogic,
    wpcfSortBy: addFormData.wpcfSortBy,
    facetLogic: addFormData.facetLogic
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

  // Destructuring all necessary fields from contact
  const {
    fullName, facetType, dataSource, defaultLabel, valueModifier,
    parentTerm, valueModifierItems, hierarchical, showExpanded,
    showGhosts, preserveShowGhosts, count, emptyCategory,
    postsPerPage, wpcfLogic, wpcfSortBy, facetLogic
  } = contact;

  // Creating formValues object with all fields
  const formValues = {
    fullName, facetType, dataSource, defaultLabel, valueModifier,
    parentTerm, valueModifierItems, hierarchical, showExpanded,
    showGhosts, preserveShowGhosts, count, emptyCategory,
    postsPerPage, wpcfLogic, wpcfSortBy, facetLogic
  };

  // Setting the form data for editing
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
                  errorMsgParentTerm={errorMsgParentTerm}
                  errorMsgHierarchical={errorMsgHierarchical}
                  errorMsgShowExpanded={errorMsgShowExpanded}
                  errorMsgShowGhosts={errorMsgShowGhosts}
                  errorMsgPreserveShowGhosts={errorMsgPreserveShowGhosts}
                  errorMsgCount={errorMsgCount}
                  errorMsgEmptyCategory={errorMsgEmptyCategory}
                  errorMsgFacetLogic={errorMsgFacetLogic}
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
        handleCategories={categories}
        selectedOption={option}
        errorMsgName={errorMsgName}
        errorMsgFacetType={errorMsgFacetType}
        errorMsgDataSource={errorMsgDataSource}
        errorMsgDefaultLabel={errorMsgDefaultLabel}
        errorMsgValueModifier={errorMsgValueModifier}
        errorMsgPostsPerPage={errorMsgPostsPerPage}
        errorMsgWpcfLogic={errorMsgWpcfLogic}
        errorMsgWpcfSortBy={errorMsgWpcfSortBy}
        setErrorMsgName={setErrorMsgName}
        setErrorMsgFacetType={setErrorMsgFacetType}
        setErrorMsgDataSource={setErrorMsgDataSource}
        setErrorMsgDefaultLabel={setErrorMsgDefaultLabel}
        setErrorMsgValueModifier={setErrorMsgValueModifier}
        setErrorMsgPostsPerPage={setErrorMsgPostsPerPage}
        setErrorMsgWpcfLogic={setErrorMsgWpcfLogic}
        setErrorMsgWpcfSortBy={setErrorMsgWpcfSortBy}
        dismissError={dismissError}
      />
      <strong className="footer-pull-right">Designed and Developed by <a href="https://wpscience.com">WPScience</a></strong>
    </div>
  );
};

export default App;
