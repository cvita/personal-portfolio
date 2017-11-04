import React from 'react';
import './List.css';


const List = props => {
  const myList = props.list.split(', '); // Must be a comma separated string
  const fontAwesomeIcon = props.icon || 'fa-check-circle';
  return (
    <ul className={`list-unstyled helperList ${props.styleClasses}`}>
      {myList.map((item, i) => {
        return (
          <li key={item + '_' + i}>
            <i className={`fa ${fontAwesomeIcon}`} aria-hidden='true' /> {item}
          </li>
        );
      })}
    </ul>
  );
}


export default List;
