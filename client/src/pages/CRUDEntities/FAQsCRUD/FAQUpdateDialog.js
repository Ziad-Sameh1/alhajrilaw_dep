import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { AddFAQs, UpdateFAQs } from "./FAQMethods";
const FAQsUpdateDialog = (props) => {
  const {
    open,
    setOpen,
    data,
    isAdd,
    setData,
    entitySetter,
    numericSetter,
    graphSetter,
    size,
    num,
  } = props;
  const { t } = useTranslation();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    console.log("submitting");
    console.log(values);
    isAdd
      ? await AddFAQs(
          values,
          entitySetter,
          numericSetter,
          graphSetter,
          size,
          num,
          t
        )
      : await UpdateFAQs(values, entitySetter, size, num, t);
    setSubmitting(false);
    resetForm();
    setOpen(false);
  };
  const validationSchema = yup.object({
    question: yup.string(t("enter-question")).required(t("question-required")),
    answer: yup.string(t("enter-answer")).required(t("answer-required")),
  });
  const formik = useFormik({
    initialValues: {
      _id: "",
      question: "",
      answer: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (open) {
      formik.setFieldValue("_id", data._id);
      formik.setFieldValue("question", data.name);
      formik.setFieldValue("answer", data.email);
    }
  }, [open]);
  return (
    <Dialog
      open={open}
      onClose={() => {
        setData({});
        setOpen(false);
        formik.resetForm();
      }}
    >
      <DialogTitle>{isAdd ? t("add-new-item") : t("update")}</DialogTitle>
      <form onSubmit={formik.handleSubmit} className="crud-dialog">
        <TextField
          id="form-question"
          name="question"
          label={t("question")}
          value={formik.values.question}
          style={{ margin: "32px" }}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.question && Boolean(formik.errors.question)}
          helperText={formik.touched.question && formik.errors.question}
        />
        <TextField
          id="form-answer"
          name="answer"
          label={t("answer")}
          value={formik.values.answer}
          multiline
          style={{ margin: "32px" }}
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.answer && Boolean(formik.errors.answer)}
          helperText={formik.touched.answer && formik.errors.answer}
        />
        <Button
          disabled={formik.isSubmitting}
          type="submit"
          variant="contained"
          style={{ margin: "32px" }}
        >
          {isAdd ? t("add") : t("update")}
        </Button>
      </form>
    </Dialog>
  );
};

export default FAQsUpdateDialog;
