import React, {useState, useRef, useEffect} from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick, handleClickOpen }) => {
  const _ref = useRef();
  const [open, setisOpen] = useState(false)
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

  let fullName = contact.fullName;
  // Check if there is a space and replace it with an underscore
  fullName = fullName.replace(/\s+/g, '_');
  // Convert the text to lowercase
  fullName = fullName.toLowerCase();

  return (
    <div className="wp-category-form-wrap-static" key={Math.random()}>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.fullName}</div>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.facetType}</div>
        <div onClick={(event) => handleEditClick(event, contact)}>{contact.dataSource}</div>
        <div><code onClick={handleClickCopy}><input readOnly ref={_ref} type="text" defaultValue={fullName} /></code></div>
      <div>
        <button className="btn-submit" type="button" onClick={() => handleClickOpen(contact.id)}>
          X
        </button>
      </div>
      <div onClick={handleClose} className="dialog-box" open={open}>
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

export default ReadOnlyRow;
