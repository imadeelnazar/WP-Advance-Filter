import React from "react";

const AFNewForm = ({ addFormData, handleAddFormSubmit, handleAddFormChange, dataType_o, categories }) => {
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
            {addFormData.fullName && <code className="short-code">{addFormData.fullName}</code>}
            </div>
          </div>
          <div className="wp-category-item-field">
            <label>Type:</label>
            <div className="wp-category-item">
            <select name="facetType" required="required" onChange={handleAddFormChange}>
              {dataType_o.map(( val, label ) => <option key={label} >{val.label}</option>)}
            </select>

            </div>
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
          </div>
          <hr />
          <div className="wp-category-item-field">
            <label>Default Label:</label>
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
          <div className="wp-category-item-field">
            <label>Value Modifiers:</label>
            <div className="wp-category-item">
            <select name="valueModifier" required="required" onChange={handleAddFormChange}>
              <option value="off">Off</option>
              <option value="exclude">Exclude these values</option>
              <option value="include">Show only these values</option>
            </select>
            </div>
          </div>
          <div className="wp-category-item-field">
            <label>Parent term:</label>
            <div className="wp-category-item">
            <input
              type="text"
              name="parentTerm"
              required="required"
              placeholder="Enter an term ID or leave blank"
              onChange={handleAddFormChange}
            />
            </div>
          </div>
          <div className="wp-category-item-field">
            <label>Logic:</label>
            <div className="wp-category-item">
            <select name="wpcfLogic" required="required" onChange={handleAddFormChange}>
              <option value="and">AND (match all)</option>
              <option value="or">OR (match any)</option>
            </select>
            </div>
          </div>
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
          <button onClick={handleAddFormSubmit} type="submit">Save Filter</button>
        </div>
      </form>
  );
};

export default AFNewForm;
