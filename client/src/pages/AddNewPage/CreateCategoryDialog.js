import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { addCategory, getCategories } from "../../services/CategoryService";
const CreateCategoryDialog = (props) => {
  const { open, setOpen } = props;
  const { t } = useTranslation();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    values.label = values.category;
    values.value = values.category.toLowerCase().replaceAll(" ", "");
    console.log(values);
    await addCategory(values, t);
    setSubmitting(false);
    resetForm();
    setOpen(false);
  };
  const validationSchema = yup.object({
    category: yup.string(t("enter-category")).required(t("category-required")),
  });
  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        formik.resetForm();
      }}
    >
      <DialogTitle>{t("add-new-category")}</DialogTitle>
      <form onSubmit={formik.handleSubmit} className="crud-dialog">
        <TextField
          id="form-category"
          name="category"
          label={t("enter-category")}
          value={formik.values.category}
          style={{ margin: "32px" }}
          required
          defaultValue={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
        />
        <Button
          disabled={formik.isSubmitting}
          type="submit"
          variant="contained"
          style={{ margin: "32px" }}
        >
          {t("add")}
        </Button>
      </form>
    </Dialog>
  );
};

export default CreateCategoryDialog;
