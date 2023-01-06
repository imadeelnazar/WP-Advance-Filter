import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCategories,
  handleDataType,
}) => {
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
            ></input>
            {editFormData.fullName && <code className="short-code">{editFormData.fullName}</code>}
            </div>
          </div>
          <div className="wp-category-item-field">
            <label>Facet type::</label>
            <div className="wp-category-item">
            <select value={editFormData.facetType} name="facetType" required="required" onChange={handleEditFormChange}>
              {handleDataType.map(( val, label ) => <option key={label} >{val.label}</option>)}
            </select>
            </div>
          </div>
          <div className="wp-category-item-field">
            <label>Data source:</label>
            <div className="wp-category-item">
            <select value={editFormData.dataSource}  name="dataSource" required="required" onChange={handleEditFormChange}>
              {Object.values(handleCategories).map((category, i) => (
                  <option value={category.slug} key={i}>{category.name}</option>
              ))}
            </select></div>
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
              placeholder="Enter an default label or leave blank"
              onChange={handleEditFormChange}
            />
            </div>
          </div>
          <div className="wp-category-item-field">
            <label>Value Modifiers:</label>
            <div className="wp-category-item">
            <select name="valueModifier" value={editFormData.valueModifier} required="required" onChange={handleEditFormChange}>
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
              value={editFormData.parentTerm}
              onChange={handleEditFormChange}
            ></input>
            </div>
          </div>
          <div className="wp-category-item-field">
            <label>Logic:</label>
            <div className="wp-category-item">
            <select name="wpcfLogic" value={editFormData.wpcfLogic} required="required" onChange={handleEditFormChange}>
              <option value="and">AND (match all)</option>
              <option value="or">OR (match any)</option>
            </select>
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
            </div>
          </div>
          <button type="submit">Update</button>

        </div>
  );
};

export default EditableRow;
