import React, { useState } from "react";
import GenericModal from "../common/Modal";
import GenericForm from "./Form";

const GenericFormWithModal = ({
  title,
  fields,
  children,
  handleSubmit,
  formTitle = "",
  buttonChildren = "Open Modal",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="open-modal-btn" onClick={() => setIsOpen(true)}>
        {buttonChildren}
      </button>

      <GenericModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
      >
        <GenericForm onSubmit={handleSubmit} title={formTitle} fields={fields}>
          {children}
        </GenericForm>
      </GenericModal>
    </>
  );
};

export default GenericFormWithModal;
