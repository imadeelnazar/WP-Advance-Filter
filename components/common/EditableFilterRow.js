import React, { useState, useRef, useEffect } from "react";

const EditableFilterRow = ({
  editFormData,
  handleEditFormChange,
  handleCategories,
  handleDataType,
  errorMsgName,
  errorMsgFacetType,
  errorMsgDataSource,
  errorMsgDefaultLabel,
  errorMsgValueModifier,
  errorMsgPostsPerPage,
  errorMsgWpcfLogic,
  errorMsgWpcfSortBy,
  dismissError
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const _ref = useRef();

  const handleClickCopy = (e) => {
    e.preventDefault();
    _ref.current.select();
    _ref.current.focus();
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(_ref.current.value);
      setIsOpen(true);
    } else {
      document.execCommand('copy');
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      console.log('copied');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  let fullName = editFormData.fullName;
  fullName = fullName.replace(/\s+/g, '_').toLowerCase();

  return (
    <div className="wp-category-form-wrap wp-category-form-wrap-dynamic">
      <div className="wp-category-item-field">
        <label>Label:</label>
        <div className="wp-category-item">
          <input
            type="text"
            required="required"
            placeholder="Enter a name..."
            name="fullName"
            value={editFormData.fullName}
            onChange={handleEditFormChange}
          />
          {errorMsgName && (
            <span className="error">
              {errorMsgName}
              <button type="button" onClick={() => dismissError('errorMsgName')}>x</button>
            </span>
          )}
          <code onClick={handleClickCopy}><input readOnly ref={_ref} type="text" value={fullName} /></code>
        </div>
      </div>
      <div className="wp-category-item-field">
        <label>Facet Type:</label>
        <div className="wp-category-item">
          <select value={editFormData.facetType} name="facetType" required="required" onChange={handleEditFormChange}>
            {handleDataType.map((val, index) => (
              <option value={val.value} key={index}>{val.label}</option>
            ))}
          </select>
          {errorMsgFacetType && (
            <span className="error">
              {errorMsgFacetType}
              <button type="button" onClick={() => dismissError('errorMsgFacetType')}>x</button>
            </span>
          )}
        </div>
      </div>
      <div className="wp-category-item-field">
        <label>Data Source:</label>
        <div className="wp-category-item">
          <select value={editFormData.dataSource} name="dataSource" required="required" onChange={handleEditFormChange}>
            {Object.values(handleCategories).map((category, index) => (
              <option value={category.slug} key={index}>{category.name}</option>
            ))}
          </select>
          {errorMsgDataSource && (
            <span className="error">
              {errorMsgDataSource}
              <button type="button" onClick={() => dismissError('errorMsgDataSource')}>x</button>
            </span>
          )}
        </div>
      </div>
      <hr />
      <div className="wp-category-item-field">
        <label>Default Label:</label>
        <div className="wp-category-item">
          <input
            type="text"
            name="defaultLabel"
            required="required"
            value={editFormData.defaultLabel}
            placeholder="Enter a default label or leave blank"
            onChange={handleEditFormChange}
          />
          {errorMsgDefaultLabel && (
            <span className="error">
              {errorMsgDefaultLabel}
              <button type="button" onClick={() => dismissError('errorMsgDefaultLabel')}>x</button>
            </span>
          )}
        </div>
      </div>
      <div className="wp-category-item-field">
        <label>Empty Category:</label>
        <div className="wp-category-item">
          <select name="valueModifier" value={editFormData.valueModifier} required="required" onChange={handleEditFormChange}>
            <option value="false">Hide</option>
            <option value="true">Show</option>
          </select>
          {errorMsgValueModifier && (
            <span className="error">
              {errorMsgValueModifier}
              <button type="button" onClick={() => dismissError('errorMsgValueModifier')}>x</button>
            </span>
          )}
        </div>
      </div>
      <div className="wp-category-item-field">
        <label>Posts Per Page:</label>
        <div className="wp-category-item">
          <input
            type="text"
            name="postsPerPage"
            required="required"
            placeholder="Enter posts per page or leave blank"
            value={editFormData.postsPerPage}
            onChange={handleEditFormChange}
          />
          {errorMsgPostsPerPage && (
            <span className="error">
              {errorMsgPostsPerPage}
              <button type="button" onClick={() => dismissError('errorMsgPostsPerPage')}>x</button>
            </span>
          )}
        </div>
      </div>
      <div className="wp-category-item-field">
        <label>WP Query:</label>
        <div className="wp-category-item">
          <select name="wpcfLogic" value={editFormData.wpcfLogic} required="required" onChange={handleEditFormChange}>
            <option value="edit">Change Main Query</option>
            <option value="custom">Custom</option>
          </select>
          {errorMsgWpcfLogic && (
            <span className="error">
              {errorMsgWpcfLogic}
              <button type="button" onClick={() => dismissError('errorMsgWpcfLogic')}>x</button>
            </span>
          )}
        </div>
      </div>
      <div className="wp-category-item-field">
        <label>Sort by:</label>
        <div className="wp-category-item">
          <select name="wpcfSortBy" value={editFormData.wpcfSortBy} required="required" onChange={handleEditFormChange}>
            <option value="count">Highest count</option>
            <option value="display_value">Display value</option>
            <option value="raw_value">Raw value</option>
            <option value="term_order">Term order</option>
          </select>
          {errorMsgWpcfSortBy && (
            <span className="error">
              {errorMsgWpcfSortBy}
              <button type="button" onClick={() => dismissError('errorMsgWpcfSortBy')}>x</button>
            </span>
          )}
        </div>
      </div>
      <button className="btn-submit" type="submit">Update</button>
      <div onClick={handleClose} className={`dialog-box ${isOpen ? 'open' : ''}`}>
        <div className="dialog-box-inner">
          <h3>Shortcode is copied!</h3>
          <p className="alert-dialog-description">
            Paste this shortcode anywhere on the frontend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditableFilterRow;