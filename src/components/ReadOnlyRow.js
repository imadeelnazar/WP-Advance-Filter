import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <div className="wp-category-form-wrap-static" key={Math.random()}>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.fullName}</div>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.facetType}</div>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.dataSource}</div>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.parentTerm}</div>
      <div>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          X
        </button>
      </div>
    </div>
  );
};

export default ReadOnlyRow;
