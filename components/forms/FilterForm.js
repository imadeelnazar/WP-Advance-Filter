import React from 'react';
import classNames from 'classnames'; // Use classnames library for dynamic class management

const AddNewFilterForm = ({
  addFormData,
  handleAddFormChange,
  handleAddFormSubmit,
  dataTypeOptions,
  handleCategories,
  selectedOption,
  errorMsgName,
  errorMsgFacetType,
  errorMsgDataSource,
  errorMsgDefaultLabel,
  errorMsgValueModifier,
  errorMsgPostsPerPage,
  errorMsgWpcfLogic,
  errorMsgWpcfSortBy,
  errorMsgParentTerm,
  errorMsgHierarchical,
  errorMsgShowExpanded,
  errorMsgShowGhosts,
  errorMsgPreserveShowGhosts,
  errorMsgCount,
  errorMsgEmptyCategory,
  errorMsgFacetLogic,
  dismissError,
  setErrorMsgName,
  setErrorMsgFacetType,
  setErrorMsgDataSource,
  setErrorMsgDefaultLabel,
  setErrorMsgValueModifier,
  setErrorMsgPostsPerPage,
  setErrorMsgWpcfLogic,
  setErrorMsgWpcfSortBy,
  setErrorMsgParentTerm,
  setErrorMsgHierarchical,
  setErrorMsgShowExpanded,
  setErrorMsgShowGhosts,
  setErrorMsgPreserveShowGhosts,
  setErrorMsgCount,
  setErrorMsgEmptyCategory,
  setErrorMsgFacetLogic
}) => {

  // Helper function to add/remove error class
  const getErrorClass = (error) => error ? 'has-error' : '';

  let fullName = addFormData.fullName;

  // Check if there is a space and replace it with an underscore
  fullName = fullName.replace(/\s+/g, '_');

  // Convert the text to lowercase
  fullName = fullName.toLowerCase();

  return (
    <form className="add-form" onSubmit={handleAddFormSubmit}>
      <div className={classNames("wp-category-item-field", getErrorClass(errorMsgName))}>
        <label>Label:</label>
        <div className="wp-category-item">
          <div className="wp-category-item-inner">
            <input
              type="text"
              name="fullName"
              required="required"
              placeholder="Enter a name..."
              value={addFormData.fullName}
              onChange={handleAddFormChange}
            />
            {addFormData.fullName && <code className="short-code">{fullName}</code>}
          </div>
          {errorMsgName && (
            <span className="error">
              {errorMsgName}
              <button type="button" onClick={() => dismissError(setErrorMsgName)}>x</button>
            </span>
          )}
        </div>
      </div>
      <div className={classNames("wp-category-item-field", getErrorClass(errorMsgFacetType))}>
        <label>Facet Type:</label>
        <div className="wp-category-item">
          <select
            name="facetType"
            required="required"
            value={addFormData.facetType}
            onChange={handleAddFormChange}
          >
            <option value="">Select a facet type...</option> {/* Add empty option */}
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
      <div className={classNames("wp-category-item-field", getErrorClass(errorMsgDataSource))}>
        <label>Data Source:</label>
        <div className="wp-category-item">
          <select
            name="dataSource"
            required="required"
            value={addFormData.dataSource}
            onChange={handleAddFormChange}
          >
            <option value="">Select a data source...</option> {/* Add empty option */}
            {(Array.isArray(handleCategories) ? handleCategories : []).map((category, index) => (
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
      {['dropdown', 'link'].includes(selectedOption) && (
        <div className={classNames("wp-category-item-field", getErrorClass(errorMsgDefaultLabel))}>
          <label>Default Label:<span>Customize the "Any" label</span></label>
          <div className="wp-category-item">
            <input
              type="text"
              name="defaultLabel"
              required="required"
              placeholder="Enter a default label or leave blank"
              value={addFormData.defaultLabel}
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
      )}
      {['dropdown', 'link', 'checkbox'].includes(selectedOption) && (
        <div className={classNames("wp-category-item-field", getErrorClass(errorMsgParentTerm))}>
          <label>Parent term:<span>To show only child terms, enter the parent term ID. Otherwise, leave blank.</span></label>
          <div className="wp-category-item">
            <input
              type="text"
              name="parentTerm"
              required="required"
              placeholder=""
              value={addFormData.parentTerm}
              onChange={handleAddFormChange}
            />
            {errorMsgParentTerm && (
              <span className="error">
                {errorMsgParentTerm}
                <button type="button" onClick={() => dismissError(setErrorMsgParentTerm)}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['dropdown', 'link', 'checkbox'].includes(selectedOption) && (
        <div className={classNames("wp-category-item-field", getErrorClass(errorMsgValueModifier))}>
          <label>Value modifiers:<span>Include or exclude certain values?</span></label>
          <div className="wp-category-item">
            <select name="valueModifier" required="required" onChange={handleAddFormChange}>
              <option value="off">Off</option>
              <option value="exclude">Exclude these values</option>
              <option value="include">Show only these values</option>
            </select>
            {errorMsgValueModifier && (
              <span className="error">
                {errorMsgValueModifier}
                <button type="button" onClick={() => dismissError(setErrorMsgValueModifier)}>x</button>
              </span>
            )}
            {(addFormData.valueModifier === 'exclude' || addFormData.valueModifier === 'include') && (
              <textarea
                type="text"
                name="valueModifierItems"
                required="required"
                placeholder=""
                value={addFormData.valueModifierItems}
                onChange={handleAddFormChange}
              />
            )}
          </div>
        </div>
      )}
      {['dropdown', 'link', 'checkbox'].includes(selectedOption) && (
        <div className={classNames("wp-category-item-field", getErrorClass(errorMsgHierarchical))}>
          <label>Hierarchical:<span>Is this a hierarchical taxonomy?</span></label>
          <div className="wp-category-item">
            <select name="hierarchical" required="required" onChange={handleAddFormChange}>
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
            {errorMsgHierarchical && (
              <span className="error">
                {errorMsgHierarchical}
                <button type="button" onClick={() => dismissError(setErrorMsgHierarchical)}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['checkbox'].includes(selectedOption) && addFormData.hierarchical === 'on' && (
        <div className={classNames("wp-category-item-field", getErrorClass(errorMsgShowExpanded))}>
          <label>Show expanded:<span>Should child terms be visible by default?</span></label>
          <div className="wp-category-item">
            <select name="showExpanded" required="required" onChange={handleAddFormChange}>
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
            {errorMsgShowExpanded && (
              <span className="error">
                {errorMsgShowExpanded}
                <button type="button" onClick={() => dismissError(setErrorMsgShowExpanded)}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['link'].includes(selectedOption) && (
        <div className={classNames("wp-category-item-field", getErrorClass(errorMsgFacetLogic))}>
          <label>Facet logic:<span>How should multiple selections affect the results?</span></label>
          <div className="wp-category-item">
            <select name="facetLogic" required="required" onChange={handleAddFormChange}>
              <option value="and">AND (match all)</option>
              <option value="or">OR (match any)</option>
            </select>
            {errorMsgFacetLogic && (
              <span className="error">
                {errorMsgFacetLogic}
                <button type="button" onClick={() => dismissError(setErrorMsgFacetLogic)}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['link', 'checkbox'].includes(selectedOption) && (
        <div className={classNames("wp-category-item-field", getErrorClass(errorMsgShowGhosts))}>
          <label>Show ghosts:<span>Show choices that would return zero results?</span></label>
          <div className="wp-category-item">
            <select name="showGhosts" required="required" onChange={handleAddFormChange}>
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
            {errorMsgShowGhosts && (
              <span className="error">
                {errorMsgShowGhosts}
                <button type="button" onClick={() => dismissError(setErrorMsgShowGhosts)}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['link', 'checkbox'].includes(selectedOption) && addFormData.showGhosts === 'on' && (
        <div className={classNames("wp-category-item-field", getErrorClass(errorMsgPreserveShowGhosts))}>
          <label>Preserve ghost order:<span>Keep ghost choices in the same order?</span></label>
          <div className="wp-category-item">
            <select name="preserveShowGhosts" required="required" onChange={handleAddFormChange}>
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
            {errorMsgPreserveShowGhosts && (
              <span className="error">
                {errorMsgPreserveShowGhosts}
                <button type="button" onClick={() => dismissError(setErrorMsgPreserveShowGhosts)}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['dropdown', 'link', 'checkbox'].includes(selectedOption) && (
        <div className={classNames("wp-category-item-field", getErrorClass(errorMsgCount))}>
          <label>Count:<span>The maximum number of choices to show (-1 for no limit)</span></label>
          <div className="wp-category-item">
            <input
              type="text"
              name="count"
              required="required"
              placeholder=""
              value={addFormData.count}
              onChange={handleAddFormChange}
            />
            {errorMsgCount && (
              <span className="error">
                {errorMsgCount}
                <button type="button" onClick={() => dismissError(setErrorMsgCount)}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['link'].includes(selectedOption) && (
        <div className={classNames("wp-category-item-field", getErrorClass(errorMsgEmptyCategory))}>
          <label>Empty Category:</label>
          <div className="wp-category-item">
            <select name="emptyCategory" required="required" onChange={handleAddFormChange}>
              <option value="false">Hide</option>
              <option value="true">Show</option>
            </select>
            {errorMsgEmptyCategory && (
              <span className="error">
                {errorMsgEmptyCategory}
                <button type="button" onClick={() => dismissError(setErrorMsgEmptyCategory)}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['link'].includes(selectedOption) && (
        <div className={classNames("wp-category-item-field", getErrorClass(errorMsgPostsPerPage))}>
          <label>Posts Per Page:</label>
          <div className="wp-category-item">
            <input
              type="text"
              name="postsPerPage"
              required="required"
              placeholder="Enter posts per page"
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
      )}
      {['link'].includes(selectedOption) && (
        <div className={classNames("wp-category-item-field", getErrorClass(errorMsgWpcfLogic))}>
          <label>WP Query:</label>
          <div className="wp-category-item">
            <select name="wpcfLogic" required="required" onChange={handleAddFormChange}>
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
      )}
      {['dropdown', 'link', 'checkbox'].includes(selectedOption) && (
        <div className={classNames("wp-category-item-field", getErrorClass(errorMsgWpcfSortBy))}>
          <label>Sort by:</label>
          <div className="wp-category-item">
            <select name="wpcfSortBy" required="required" onChange={handleAddFormChange}>
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
      )}
      <button className="btn-submit" type="submit">Add</button>
    </form>
  );
};

export default AddNewFilterForm;
