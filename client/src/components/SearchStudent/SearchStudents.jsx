import React, { useState } from "react";
import "./SearchStudents.css";

const SearchStudents = ({ searchStudents }) => {
  const [value, setValue] = useState("");

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    searchStudents(inputValue);
  };

  return (
    <input
      type="text"
      placeholder="Filter by name..."
      name="name"
      value={value}
      onChange={onChangeHandler}
      className="Search-Student-Input"
    />
  );
};

export default SearchStudents;
