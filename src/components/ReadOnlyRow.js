import React, {useState} from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick, handleClickOpen }) => {
  const _ref = React.useRef();
  const handleClick = (e) => {
    e.preventDefault();
    _ref.current.select();
    _ref.current.focus();
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(_ref.current.value);
    } else {
      document.execCommand('copy');
    }
  }
  return (
    <div className="wp-category-form-wrap-static" key={Math.random()}>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.fullName}</div>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.facetType}</div>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.dataSource}</div>
        <div>
          <code onClick={handleClick}><input readOnly ref={_ref} type="text" defaultValue={contact.fullName} /></code>
          </div>
      <div>
        <button type="button" onClick={() => handleClickOpen(contact.id)}>
          X
        </button>
      </div>

    </div>
  );
};

export default ReadOnlyRow;
