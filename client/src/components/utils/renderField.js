import React from 'react';

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} />
        {touched && error && <span className="red-text">{error}</span>}
      </div>
    </div>
  );
};

export default renderField;
