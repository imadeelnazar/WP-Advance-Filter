import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick, handleClickOpen }) => {
  return (
    <div className="wp-category-form-wrap-static" key={Math.random()}>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.fullName}</div>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.facetType}</div>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.dataSource}</div>
        <div><code>[{contact.fullName}]</code></div>
      <div>
        <button type="button" onClick={() => handleClickOpen(contact.id)}>
          X
        </button>
      </div>

    </div>
  );
};

export default ReadOnlyRow;
