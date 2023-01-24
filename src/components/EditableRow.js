import React, {useState,useRef,useEffect} from "react";


const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCategories,
  handleDataType
}) => {
  const [isOpen, setisOpen] = useState(false)
  const _ref = useRef();
  const handleClickCopy = (e) => {
    e.preventDefault();
    _ref.current.select();
    _ref.current.focus();
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(_ref.current.value);
      setisOpen(true);
    } else {
      document.execCommand('copy');
      setisOpen(true);
    }
  }
    const handleClose = () => {
    setisOpen(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setisOpen(false);
      console.log('copied')
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
            <code onClick={handleClickCopy}><input readOnly ref={_ref} type="text" defaultValue={editFormData.fullName} /></code>
            </div>
          </div>
          <div className="wp-category-item-field">
            <label>Facet type::</label>
            <div className="wp-category-item">
            <select value={editFormData.facetType} name="facetType" required="required" onChange={handleEditFormChange}>
              {handleDataType.map(( val, label ) => <option value={val.value} key={label} >{val.label}</option>)}
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
            <label>Empty Category:</label>
            <div className="wp-category-item">
            <select name="valueModifier" value={editFormData.valueModifier} required="required" onChange={handleEditFormChange}>
              <option value="false">Hide</option>
              <option value="true">Show</option>
            </select>
            </div>
          </div>
          <div className="wp-category-item-field">
            <label>Posts Per Page:</label>
            <div className="wp-category-item">
            <input
              type="text"
              name="postsperpage"
              required="required"
              placeholder="Enter an term ID or leave blank"
              value={editFormData.postsperpage}
              onChange={handleEditFormChange}
            ></input>
            </div>
          </div>
          <div className="wp-category-item-field">
            <label>WP Query:</label>
            <div className="wp-category-item">
            <select name="wpcfLogic" value={editFormData.wpcfLogic} required="required" onChange={handleEditFormChange}>
              <option value="edit">Change Main Query</option>
              <option value="custom">Custom</option>
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
          <button className="btn-submit" type="submit">Update</button>
<div onClick={handleClose} className="dialog-box" open={isOpen}>
        <div className="dialog-box-inner">
          <h3>Shortcode is copied!</h3>
          <p className="alert-dialog-description">
          Paste this shortcode anywhere on frontend.
          </p>
        </div>
      </div>
        </div>
  );
};

export default EditableRow;
