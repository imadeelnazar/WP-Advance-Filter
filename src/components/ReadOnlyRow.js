import React, {useState} from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopiedText = () => {

}
const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick, handleClickOpen }) => {

  return (
    <div className="wp-category-form-wrap-static" key={Math.random()}>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.fullName}</div>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.facetType}</div>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.dataSource}</div>
        <div><code><CopyToClipboard text={"[wpaf_" + contact.fullName+"]"} onCopy={() => CopiedText}>
        <span>{"[" + contact.fullName+"]"}</span></CopyToClipboard></code></div>
      <div>
        <button type="button" onClick={() => handleClickOpen(contact.id)}>
          X
        </button>
      </div>

    </div>
  );
};

export default ReadOnlyRow;
