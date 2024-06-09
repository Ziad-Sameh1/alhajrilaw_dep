import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AddStaff, UpdateStaff } from "./StaffMethods";
import { useDropzone } from "react-dropzone";
import AddJobDialog from "./AddJobDialog";
import { deleteAllJobs, getJobs } from "../../../services/JobService";
const StaffUpdateDialog = (props) => {
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
  const [addJobDialog, setAddJobDialog] = useState(false);
  const [jobs, setJobs] = useState([]);
  const lang = useSelector((state) => state.language);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    console.log("submitting");
    console.log(values);
    isAdd
      ? await AddStaff(
          values,
          entitySetter,
          numericSetter,
          graphSetter,
          size,
          num,
          t
        )
      : await UpdateStaff(values, entitySetter, size, num, t);
    setSubmitting(false);
    resetForm();
    setOpen(false);
  };
  const fetchJobs = async () => {
    const res = await getJobs(t);
    console.log(res);
    setJobs(res);
  };
  const selectHandleChange = async (event) => {
    console.log(event.target.value);
    if (event.target.value === "add-another-job") {
      setAddJobDialog(true);
    } else if (event.target.value === "delete-all-jobs") {
      await deleteAllJobs(t);
      await fetchJobs();
    } else {
      formik.handleChange(event);
    }
  };
  const validationSchema = yup.object({
    name: yup.string(t("enter-name")).required(t("name-required")),
  });
  const formik = useFormik({
    initialValues: {
      _id: "",
      name: "",
      position: "",
      profilePic: {},
      imgLink: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (!addJobDialog) {
      fetchJobs();
    }
  }, [addJobDialog]);
  useEffect(() => {
    if (open) {
      console.log("Dialog Showed");
      fetchJobs();
      formik.setFieldValue("_id", data._id);
      formik.setFieldValue("name", data.name);
      formik.setFieldValue("position", data.position);
      formik.setFieldValue("imgLink", data.imgLink);
    }
  }, [open]);
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    formik.setFieldValue("profilePic", acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Dialog
      open={open}
      onClose={() => {
        setData({});
        setOpen(false);
        formik.resetForm();
      }}
    >
      <AddJobDialog open={addJobDialog} setOpen={setAddJobDialog} />
      <DialogTitle>{isAdd ? t("add-new-admin") : t("update")}</DialogTitle>
      <form onSubmit={formik.handleSubmit} className="crud-dialog">
        {formik.values.imgLink !== "" && (
          <img
            src={`${process.env.REACT_APP_SERVER}/${formik.values.imgLink}`}
            style={{ width: "100px", margin: "32px" }}
          />
        )}
        <div {...getRootProps()} className="drop-zone">
          <input {...getInputProps()} name="profilePic" />
          {isDragActive ? (
            <p>{t("drag-image")}</p>
          ) : (
            <p>{t("drag-drop-image")}</p>
          )}
        </div>
        <TextField
          id="name"
          name="name"
          label={t("full-name")}
          value={formik.values.name}
          style={{ margin: "32px", width: "200px" }}
          required
          multiline
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="form-position"
          name="position"
          label={t("select-position")}
          value={formik.values.position}
          style={{ margin: "32px", width: "200px" }}
          select
          required
          defaultValue={formik.values.position}
          onChange={(e) => selectHandleChange(e)}
          onBlur={formik.handleBlur}
          error={formik.touched.position && Boolean(formik.errors.position)}
          helperText={formik.touched.position && formik.errors.position}
        >
          {jobs.map((job) => (
            <MenuItem key={job._id} value={job.value}>
              {lang === "ar" ? job.labelAR : job.labelEN}
            </MenuItem>
          ))}
          <MenuItem value="add-another-job">{t("add-another-job")}</MenuItem>
          <MenuItem value="delete-all-jobs">{t("delete-all-jobs")}</MenuItem>
        </TextField>
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

export default StaffUpdateDialog;
