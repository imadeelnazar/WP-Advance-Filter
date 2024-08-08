import React from 'react';

const AddNewFilterForm = ({
  addFormData,
  handleAddFormChange,
  handleAddFormSubmit,
  dataTypeOptions,
  categories,
  selectedOption,
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
  return (
    <form onSubmit={handleAddFormSubmit}>
      <div className="wp-category-item-field">
        <label>Label:</label>
        <div className="wp-category-item">
          <input
            type="text"
            name="fullName"
            required="required"
            placeholder="Enter a name..."
            value={addFormData.fullName}
            onChange={handleAddFormChange}
          />
          {errorMsgName && (
            <span className="error">
              {errorMsgName}
              <button type="button" onClick={() => dismissError(setErrorMsgName)}>x</button>
            </span>
          )}
        </div>
      </div>
      <div className="wp-category-item-field">
        <label>Facet Type:</label>
        <div className="wp-category-item">
          <select
            name="facetType"
            required="required"
            value={addFormData.facetType}
            onChange={handleAddFormChange}
          >
            {dataTypeOptions.map((val, index) => (
              <option value={val.value} key={index}>{val.label}</option>
            ))}
          </select>
          {errorMsgFacetType && (
            <span className="error">
              {errorMsgFacetType}
              <button type="button" onClick={() => dismissError(setErrorMsgFacetType)}>x</button>
            </span>
          )}
        </div>
      </div>
      <div className="wp-category-item-field">
        <label>Data Source:</label>
        <div className="wp-category-item">
          <select
            name="dataSource"
            required="required"
            value={addFormData.dataSource}
            onChange={handleAddFormChange}
          >
            {categories.map((category, index) => (
              <option value={category.slug} key={index}>{category.name}</option>
            ))}
          </select>
          {errorMsgDataSource && (
            <span className="error">
              {errorMsgDataSource}
              <button type="button" onClick={() => dismissError(setErrorMsgDataSource)}>x</button>
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
            value={addFormData.defaultLabel}
            placeholder="Enter a default label or leave blank"
            onChange={handleAddFormChange}
          />
          {errorMsgDefaultLabel && (
            <span className="error">
              {errorMsgDefaultLabel}
              <button type="button" onClick={() => dismissError(setErrorMsgDefaultLabel)}>x</button>
            </span>
          )}
        </div>
      </div>
      <div className="wp-category-item-field">
        <label>Empty Category:</label>
        <div className="wp-category-item">
          <select
            name="valueModifier"
            required="required"
            value={addFormData.valueModifier}
            onChange={handleAddFormChange}
          >
            <option value="false">Hide</option>
            <option value="true">Show</option>
          </select>
          {errorMsgValueModifier && (
            <span className="error">
              {errorMsgValueModifier}
              <button type="button" onClick={() => dismissError(setErrorMsgValueModifier)}>x</button>
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
            value={addFormData.postsPerPage}
            onChange={handleAddFormChange}
          />
          {errorMsgPostsPerPage && (
            <span className="error">
              {errorMsgPostsPerPage}
              <button type="button" onClick={() => dismissError(setErrorMsgPostsPerPage)}>x</button>
            </span>
          )}
        </div>
      </div>
      <div className="wp-category-item-field">
        <label>WP Query:</label>
        <div className="wp-category-item">
          <select
            name="wpcfLogic"
            required="required"
            value={addFormData.wpcfLogic}
            onChange={handleAddFormChange}
          >
            <option value="edit">Change Main Query</option>
            <option value="custom">Custom</option>
          </select>
          {errorMsgWpcfLogic && (
            <span className="error">
              {errorMsgWpcfLogic}
              <button type="button" onClick={() => dismissError(setErrorMsgWpcfLogic)}>x</button>
            </span>
          )}
        </div>
      </div>
      <div className="wp-category-item-field">
        <label>Sort by:</label>
        <div className="wp-category-item">
          <select
            name="wpcfSortBy"
            required="required"
            value={addFormData.wpcfSortBy}
            onChange={handleAddFormChange}
          >
            <option value="count">Highest count</option>
            <option value="display_value">Display value</option>
            <option value="raw_value">Raw value</option>
            <option value="term_order">Term order</option>
          </select>
          {errorMsgWpcfSortBy && (
            <span className="error">
              {errorMsgWpcfSortBy}
              <button type="button" onClick={() => dismissError(setErrorMsgWpcfSortBy)}>x</button>
            </span>
          )}
        </div>
      </div>
      <button className="btn-submit" type="submit">Add</button>
    </form>
  );
};

export default AddNewFilterForm;
