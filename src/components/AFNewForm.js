import React from "react";


const AFNewForm = ({ addFormData, handleAddFormSubmit, handleAddFormChange, dataType_o, categories, selectedOption,
  errorMsgName,
  errorMsgfacetType,
  errorMsgDataSource,
  errorMsgDefaultLabel,
  errorMsgValueModifier,
  errorMsgpostsperpage,
  errorMsgWpcfLogic,
  errorMsgWpcfSortBy,
  dismissError
}) => {

  let fullName = addFormData.fullName;

  // Check if there is a space and replace it with an underscore
  fullName = fullName.replace(/\s+/g, '_');

  // Convert the text to lowercase
  fullName = fullName.toLowerCase();

  return (

        <form className="add-form">
        {/* {(evnt)=>handleChange(index, evnt)} */}
        <div className="wp-category-form-wrap">
          <div className="wp-category-item-field wp-category-item-title">
            <label>Label:</label>
            <div className="wp-category-item">
              <input
              type="text"
              name="fullName"
              required="required"
              placeholder="Enter a name..."
              onChange={handleAddFormChange}
            />
            {addFormData.fullName && <code className="short-code">{fullName}</code>}
            </div>
            {errorMsgName && (
              <span className="error">
                {errorMsgName}
                <button type="button" onClick={() => dismissError(errorMsgName)}>x</button>
              </span>
            )}

          </div>
          <div className="wp-category-item-field">
            <label>Type:</label>
            <div className="wp-category-item">
            <select name="facetType" required="required" onChange={handleAddFormChange}>
              {dataType_o.map(( val, label ) => <option value={val.value} key={label} >{val.label}</option>)}
            </select>

            </div>
            {errorMsgfacetType && (
              <span className="error">
                {errorMsgfacetType}
                <button type="button" onClick={() => dismissError(errorMsgfacetType)}>x</button>
              </span>
            )}
          </div>
          <div className="wp-category-item-field">
            <label>Data Source:</label>
            <div className="wp-category-item">
            <select name="dataSource" required="required" onChange={handleAddFormChange}>
              {Object.values(categories).map((category, i) => (
                  <option value={category.slug} key={i}>{category.name}</option>
              ))}
            </select>

            </div>
            {errorMsgDataSource && (
              <span className="error">
                {errorMsgDataSource}
                <button type="button" onClick={() => dismissError(errorMsgDataSource)}>x</button>
              </span>
            )}
          </div>
          <hr />
          {['dropdown', 'link'].includes(selectedOption) && (
          <div className="wp-category-item-field">
            <label>Default Label:<span>Customize the "Any" label</span></label>
            <div className="wp-category-item">
               <input
              type="text"
              name="defaultLabel"
              required="required"
              placeholder="Enter an default label or leave blank"
              onChange={handleAddFormChange}
            />
            </div>
          </div>
          )}

          {['dropdown', 'link', 'checkbox'].includes(selectedOption) && (
          <div className="wp-category-item-field">
            <label>Parent term:<span>To show only child terms, enter the parent term ID. Otherwise, leave blank.</span></label>
            <div className="wp-category-item">
            <input
              type="text"
              name="parentTerm"
              required="required"
              placeholder=""
              onChange={handleAddFormChange}
            />
            </div>
          </div>
          )}

          {['dropdown', 'link', 'checkbox'].includes(selectedOption) && (
          <div className="wp-category-item-field">
            <label>Value modifiers: <span>Include or exclude certain values?</span></label>
            <div className="wp-category-item">
            <select name="valueModifier" required="required" onChange={handleAddFormChange}>
              <option value="off">Off</option>
              <option value="exclude">Exclude these values</option>
              <option value="include">Show only these values</option>
            </select>
            {(addFormData.valueModifier === 'exclude' || addFormData.valueModifier === 'include') && (
              <textarea
                type="text"
                name="valueModifierItems"
                required="required"
                placeholder=""
                onChange={handleAddFormChange}
              />
            )}
            </div>
          </div>
          )}

          {['dropdown', 'link', 'checkbox'].includes(selectedOption) && (
          <div className="wp-category-item-field">
            <label>Hierarchical: <span>Is this a hierarchical taxonomy?</span></label>
            <div className="wp-category-item">
            <select name="hierarchical" required="required" onChange={handleAddFormChange}>
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
            </div>
          </div>
          )}

          {['checkbox'].includes(selectedOption) && addFormData.hierarchical === 'on' && (
          <div className="wp-category-item-field">
            <label>Show expanded: <span>Should child terms be visible by default?</span></label>
            <div className="wp-category-item">
            <select name="showExpanded" required="required" onChange={handleAddFormChange}>
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
            </div>
          </div>
          )}

          {[ 'link'].includes(selectedOption) && (
          <div className="wp-category-item-field">
            <label>Multi-select: <span>Allow multiple selections?</span></label>
            <div className="wp-category-item">
            <select name="hierarchical" required="required" onChange={handleAddFormChange}>
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
            </div>
          </div>
          )}

          {['link','checkbox'].includes(selectedOption) && (
          <div className="wp-category-item-field">
            <label>Show ghosts: <span>Show choices that would return zero results?</span></label>
            <div className="wp-category-item">
            <select name="showGhosts" required="required" onChange={handleAddFormChange}>
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
            </div>
          </div>
          )}

          {['link','checkbox'].includes(selectedOption) && addFormData.showGhosts === 'on' && (
          <div className="wp-category-item-field">
            <label>Preserve ghost order: <span>Keep ghost choices in the same order?</span></label>
            <div className="wp-category-item">
            <select name="preserveShowGhosts" required="required" onChange={handleAddFormChange}>
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
            </div>
          </div>
          )}

          {['link','checkbox'].includes(selectedOption) && (
          <div className="wp-category-item-field">
            <label>Facet logic: <span>How should multiple selections affect the results?</span></label>
            <div className="wp-category-item">
            <select name="hierarchical" required="required" onChange={handleAddFormChange}>
              <option value="and">AND (match all)</option>
              <option value="or">OR (match any)</option>
            </select>
            </div>
          </div>
          )}

          {['dropdown', 'link','checkbox'].includes(selectedOption) && (
          <div className="wp-category-item-field">
            <label>Sort by:</label>
            <div className="wp-category-item">
              <select name="wpcfSortBy" required="required" onChange={handleAddFormChange}>
                <option value="count">Highest count</option>
                <option value="display_value">Display value</option>
                <option value="raw_value">Raw value</option>
                <option value="term_order">Term order</option>
              </select>
            </div>
          </div>
          )}


          {['dropdown', 'link','checkbox'].includes(selectedOption) && (
          <div className="wp-category-item-field">
            <label>Count: <span>The maximum number of choices to show (-1 for no limit)</span></label>
            <div className="wp-category-item">
            <input
              type="text"
              name="count"
              required="required"
              placeholder=""
              onChange={handleAddFormChange}
            />
            </div>
          </div>
            )}
          {['link'].includes(selectedOption) && (
          <div className="wp-category-item-field">
            <label>Empty Category:</label>
            <div className="wp-category-item">
            <select name="emptyCategory" required="required" onChange={handleAddFormChange}>
              <option value="false">Hide</option>
              <option value="true">Show</option>
            </select>
            </div>
          </div>
            )}
            {['link'].includes(selectedOption) && (
          <div className="wp-category-item-field">
            <label>Posts Per Page:</label>
            <div className="wp-category-item">
            <input
              type="text"
              name="postsperpage"
              required="required"
              placeholder="Enter an Posts per page"
              onChange={handleAddFormChange}
            />
            </div>
          </div>
          )}
            {['link'].includes(selectedOption) && (
          <div className="wp-category-item-field">
            <label>WP Query:</label>
            <div className="wp-category-item">
            <select name="wpcfLogic" required="required" onChange={handleAddFormChange}>
              <option value="edit">Change Main Query</option>
              <option value="custom">Custom</option>
            </select>
            </div>
          </div>
          )}
          <button className="btn-submit" onClick={handleAddFormSubmit} type="submit">Save Filter</button>
        </div>
      </form>
  );
};

export default AFNewForm;
