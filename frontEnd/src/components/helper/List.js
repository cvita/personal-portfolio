import React from 'react';


const List = props => {
  const myList = props.list.split(', '); // Must be a comma separated string
  const fontAwesomeIcon = props.icon || 'fa-check-circle';
  const classNames = props.classes || 'list-unstyled';
  return (
    <ul className={classNames}>
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
