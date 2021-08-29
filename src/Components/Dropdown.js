import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ label, optionsProp, selectedProp, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const renderedOptions = optionsProp.map((optionColor) => {
    if (optionColor.value === selectedProp.value) {
      return null;
    }
    return (
      <div
        key={optionColor.value}
        className="item"
        onClick={() => {
          onSelectedChange(optionColor);
        }}
      >
        {optionColor.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="down icon"></i>
          <div className="text">{selectedProp.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
