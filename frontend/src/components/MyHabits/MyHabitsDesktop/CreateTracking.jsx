import React, { useState } from "react";
import axios from "axios";
import { useUserId } from "hooks/useUserId";
import GenericForm from "../../common/Form";
import GenericFormWithModal from "../../common/FormWIthModal";

const CreateTracking = () => {
  const userId = useUserId();
  const [formData, setFormData] = useState({
    type: "habit",
    title: "",
    frequency: "daily",
    repeat_interval: 1,
    goal: 1,
    userId,
    unit: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/trackings/add", formData);
      //   toast.success("Tracking item created!");
      setFormData({
        type: "habit",
        title: "",
        frequency: "daily",
        repeat_interval: 1,
        goal: 1,
      });
    } catch {
      //   toast.error("Failed to create tracking item");
    }
  };

  return (
    <GenericFormWithModal
      onSubmit={handleSubmit}
      title="Create Tracking"
      fields={[
        {
          name: "title",
          value: formData.title,
          onChange: handleChange,
          placeholder: "Title",
          required: true,
        },
        {
          name: "type",
          value: formData.type,
          type: "select",
          onChange: handleChange,
          options: [
            {
              label: "Habit",
              value: "habit",
            },
            {
              label: "Money",
              value: "money",
            },
            {
              label: "Diet",
              value: "diet",
            },
          ],
        },
        {
          name: "repeat_interval",
          value: formData.repeat_interval,
          onChange: handleChange,
          placeholder: "Frequency",
          type: "number",
          min: "1",
        },
        {
          name: "goal",
          value: formData.goal,
          onChange: handleChange,
          placeholder: "Goal",
          type: "number",
          min: "1",
        },
        {
          name: "unit",
          type: "select",
          value: formData.unit,
          onChange: handleChange,
          options: [
            {
              label: "Calories",
              value: "calories",
            },
            {
              label: "Currency",
              value: "currency",
            },
            {
              label: "Times",
              value: "times",
            },
          ],
        },
      ]}
      buttonChildren={"+"}
    >
      <button type="submit">Create</button>
    </GenericFormWithModal>
  );
};

export default CreateTracking;
