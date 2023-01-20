import React from 'react';
import logo from './img/img1.jpg'; // Tell webpack this JS file uses this image
import Sortable from 'react-sortablejs';

const _array = ["Image","Title","Description"]

const Template = () => {
  const [data, setData] = React.useState(_array);
  const handleItem = (a,value) => {
    if (a < data.length) {
      var _data = data;
      _data.splice(a-1,1)
      _data.splice(a,0,value);
      setData([..._data]);
    }
  }
  return (

    <div className="template-main-wrapper">
        {data && data.map((item,k) =>
          <div onClick={(e) => handleItem(k+1,item)} key={k}>{item}</div>
          )}

        <div className="preset">
          <div className="af-image"><img src={logo} alt="abc" /></div>
          <div className="af-content">
            <div className="af-title">Title</div>
            <div className="af-des">description</div>
          </div>
          <div className="af-post-meta">
            <div className="af-author">Author</div>
            <div className="af-date">Date</div>
            <div className="af-time">Time</div>
            <div className="af-price">$250</div>
          </div>
          <div className="af-read-more-or-add-to-cart">Read More</div>
        </div>

    </div>

  )
}
export default Template;
