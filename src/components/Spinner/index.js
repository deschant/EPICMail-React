import React from "react";
import "./spinner.scss";

const Spinner = () => (
  <div className="spinner__container">
    <div className="lds-ripple">
      <div />
      <div />
    </div>
  </div>
);

export default Spinner;
