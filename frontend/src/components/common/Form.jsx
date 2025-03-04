import React from "react";
import "./Form.css"; // Importing CSS file

const GenericForm = ({ title, fields, children, onSubmit }) => {
  return (
    <div className="form-container">
      <h5 className="form-heading">{title}</h5>
      <form className="form" onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <div key={index} className="form-group">
            <label>{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                defaultValue={field.defaultValue}
                onChange={field.onChange}
              >
                {field.options.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                defaultValue={field.defaultValue}
                onChange={field.onChange}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                defaultValue={field.defaultValue}
                onChange={field.onChange}
                min={field.min}
              />
            )}
          </div>
        ))}
        {children} {/* Custom elements like submit button */}
      </form>
    </div>
  );
};

export default GenericForm;
