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
  errorMsgParentTerm,
  errorMsgHierarchical,
  errorMsgShowExpanded,
  errorMsgShowGhosts,
  errorMsgPreserveShowGhosts,
  errorMsgCount,
  errorMsgEmptyCategory,
  errorMsgFacetLogic,
  dismissError
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const _ref = useRef();

  const handleClickCopy = (e) => {
    e.preventDefault();
    const textToCopy = `[${_ref.current.value}]`; // Add brackets around the value
    _ref.current.value = textToCopy; // Temporarily set the value with brackets for copying
    _ref.current.select();
    _ref.current.focus();

    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
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
      {['dropdown', 'link'].includes(editFormData.facetType) && (
        <div className="wp-category-item-field">
          <label>Default Label:<span>Customize the "Any" label</span></label>
          <div className="wp-category-item">
            <input
              type="text"
              name="defaultLabel"
              required="required"
              placeholder="Enter a default label or leave blank"
              value={editFormData.defaultLabel}
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
      )}
      {['dropdown', 'link', 'checkbox'].includes(editFormData.facetType) && (
        <div className="wp-category-item-field">
          <label>Parent term:<span>To show only child terms, enter the parent term ID. Otherwise, leave blank.</span></label>
          <div className="wp-category-item">
            <input
              type="text"
              name="parentTerm"
              required="required"
              placeholder=""
              value={editFormData.parentTerm}
              onChange={handleEditFormChange}
            />
            {errorMsgParentTerm && (
              <span className="error">
                {errorMsgParentTerm}
                <button type="button" onClick={() => dismissError('errorMsgParentTerm')}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['dropdown', 'link', 'checkbox'].includes(editFormData.facetType) && (
        <div className="wp-category-item-field">
          <label>Value modifiers:<span>Include or exclude certain values?</span></label>
          <div className="wp-category-item">
            <select name="valueModifier" required="required" value={editFormData.valueModifier} onChange={handleEditFormChange}>
              <option value="off">Off</option>
              <option value="exclude">Exclude these values</option>
              <option value="include">Show only these values</option>
            </select>
            {errorMsgValueModifier && (
              <span className="error">
                {errorMsgValueModifier}
                <button type="button" onClick={() => dismissError('errorMsgValueModifier')}>x</button>
              </span>
            )}
            {(editFormData.valueModifier === 'exclude' || editFormData.valueModifier === 'include') && (
              <textarea
                type="text"
                name="valueModifierItems"
                required="required"
                placeholder=""
                value={editFormData.valueModifierItems}
                onChange={handleEditFormChange}
              />
            )}
          </div>
        </div>
      )}
      {['dropdown', 'link', 'checkbox'].includes(editFormData.facetType) && (
        <div className="wp-category-item-field">
          <label>Hierarchical:<span>Is this a hierarchical taxonomy?</span></label>
          <div className="wp-category-item">
            <select name="hierarchical" required="required" value={editFormData.hierarchical} onChange={handleEditFormChange}>
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
            {errorMsgHierarchical && (
              <span className="error">
                {errorMsgHierarchical}
                <button type="button" onClick={() => dismissError('errorMsgHierarchical')}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['checkbox'].includes(editFormData.facetType) && editFormData.hierarchical === 'on' && (
        <div className="wp-category-item-field">
          <label>Show expanded:<span>Should child terms be visible by default?</span></label>
          <div className="wp-category-item">
            <select name="showExpanded" required="required" value={editFormData.showExpanded} onChange={handleEditFormChange}>
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
            {errorMsgShowExpanded && (
              <span className="error">
                {errorMsgShowExpanded}
                <button type="button" onClick={() => dismissError('errorMsgShowExpanded')}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['link'].includes(editFormData.facetType) && (
        <div className="wp-category-item-field">
          <label>Facet logic:<span>How should multiple selections affect the results?</span></label>
          <div className="wp-category-item">
            <select name="facetLogic" required="required" value={editFormData.facetLogic} onChange={handleEditFormChange}>
              <option value="and">AND (match all)</option>
              <option value="or">OR (match any)</option>
            </select>
            {errorMsgFacetLogic && (
              <span className="error">
                {errorMsgFacetLogic}
                <button type="button" onClick={() => dismissError('errorMsgFacetLogic')}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['link', 'checkbox'].includes(editFormData.facetType) && (
        <div className="wp-category-item-field">
          <label>Show ghosts:<span>Show choices that would return zero results?</span></label>
          <div className="wp-category-item">
            <select name="showGhosts" required="required" value={editFormData.showGhosts} onChange={handleEditFormChange}>
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
            {errorMsgShowGhosts && (
              <span className="error">
                {errorMsgShowGhosts}
                <button type="button" onClick={() => dismissError('errorMsgShowGhosts')}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['link', 'checkbox'].includes(editFormData.facetType) && editFormData.showGhosts === 'on' && (
        <div className="wp-category-item-field">
          <label>Preserve ghost order:<span>Keep ghost choices in the same order?</span></label>
          <div className="wp-category-item">
            <select name="preserveShowGhosts" required="required" value={editFormData.preserveShowGhosts} onChange={handleEditFormChange}>
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
            {errorMsgPreserveShowGhosts && (
              <span className="error">
                {errorMsgPreserveShowGhosts}
                <button type="button" onClick={() => dismissError('errorMsgPreserveShowGhosts')}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['dropdown', 'link', 'checkbox'].includes(editFormData.facetType) && (
        <div className="wp-category-item-field">
          <label>Count:<span>The maximum number of choices to show (-1 for no limit)</span></label>
          <div className="wp-category-item">
            <input
              type="text"
              name="count"
              required="required"
              placeholder=""
              value={editFormData.count}
              onChange={handleEditFormChange}
            />
            {errorMsgCount && (
              <span className="error">
                {errorMsgCount}
                <button type="button" onClick={() => dismissError('errorMsgCount')}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['link'].includes(editFormData.facetType) && (
        <div className="wp-category-item-field">
          <label>Empty Category:</label>
          <div className="wp-category-item">
            <select name="emptyCategory" required="required" value={editFormData.emptyCategory} onChange={handleEditFormChange}>
              <option value="false">Hide</option>
              <option value="true">Show</option>
            </select>
            {errorMsgEmptyCategory && (
              <span className="error">
                {errorMsgEmptyCategory}
                <button type="button" onClick={() => dismissError('errorMsgEmptyCategory')}>x</button>
              </span>
            )}
          </div>
        </div>
      )}
      {['link'].includes(editFormData.facetType) && (
        <div className="wp-category-item-field">
          <label>Posts Per Page:</label>
          <div className="wp-category-item">
            <input
              type="text"
              name="postsPerPage"
              required="required"
              placeholder="Enter posts per page"
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
      )}
      {['link'].includes(editFormData.facetType) && (
        <div className="wp-category-item-field">
          <label>WP Query:</label>
          <div className="wp-category-item">
            <select name="wpcfLogic" required="required" value={editFormData.wpcfLogic} onChange={handleEditFormChange}>
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
      )}
      {['dropdown', 'link', 'checkbox'].includes(editFormData.facetType) && (
        <div className="wp-category-item-field">
          <label>Sort by:</label>
          <div className="wp-category-item">
            <select name="wpcfSortBy" required="required" value={editFormData.wpcfSortBy} onChange={handleEditFormChange}>
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
      )}
      <button className="btn-submit" type="submit">Update</button>
      <div onClick={handleClose} open={isOpen} className={`dialog-box ${isOpen ? 'open' : ''}`}>
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
