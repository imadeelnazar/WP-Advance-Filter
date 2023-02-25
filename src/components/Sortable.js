import React from 'react'
import { ReactSortable } from "react-sortablejs";
import placeholder from './img/placeholder-image.jpg'; 

const Sortable = ({ main }) => {
  const [state, setState] = React.useState([
    { id: 1, type: "image", content: 'Dummy Image' },
    { id: 2, type: "title", content: 'Dummy Title' },
    { id: 3, type: "description", content: 'This is dummy description' },
    { id: 4, type: "author", content: 'Author Name' },
    { id: 5, type: "readmore", content: 'Read More' },
    { id: 6, type: "category", content: 'Category' },
    { id: 7, type: "price", content: 'Price' },
  ]);
  return (
    <ReactSortable
      animation={250}
      delayOnTouchStart={true}
      delay={3}
      className="preset-inner"
      list={state}
      setList={setState}>
      {state && state.map((item) => (
        <div key={item.id + main.id} className={"preset-item " + item.type}>
          {(item.type === 'image' && (
            <img className="item-n-ele" src={placeholder} alt={item.type} />)
          ) || (item.type === 'title' && (
            <div className={"item-n-ele n-shop-" + item.type}>{item.content}</div>
          )) || (item.type === 'description' && (
            <div className={"item-n-ele n-shop-" + item.type}>{item.content}</div>
          )) || (item.type === 'author' && (
            <div className={"item-n-ele n-shop-" + item.type}>{item.content}</div>
          )) || (item.type === 'readmore' && (
            <div className={"item-n-ele n-shop-" + item.type}>{item.content}</div>
          )) || (item.type === 'category' && (
            <div className={"item-n-ele n-shop-" + item.type}>{item.content}</div>
          )) || (item.type === 'price' && (
            <div className={"item-n-ele n-shop-" + item.type}>{item.content}</div>
          ))}
        </div>
      ))}
    </ReactSortable>
  )
}

export default Sortable