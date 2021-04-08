import React, {  } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./reuseable/controls/Controls";
import { useForm, Form } from "./reuseable/useForm";

const initialFValues = {
  _id: "",
  name: "",
};

export const NewWord = (props) => {
  const { addNewWord, loading } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addNewWord(values, resetForm);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Controls.Input
            name="name"
            label="Word*"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Controls.Button type="submit" disabled={loading} text="Submit" />
        </Grid>
      </Grid>
    </Form>
  );
}
