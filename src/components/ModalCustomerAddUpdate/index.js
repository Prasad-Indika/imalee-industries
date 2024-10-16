import FormInputField from "@/common/components/FormInputField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getAllCustomer,
  saveCustomer,
  updateCustomer,
} from "@/service/Customer";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function ModalCustomerAddUpdate({
  visible,
  onClose,
  edit = false,
  customer,
}) {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const saveCustomerData = useSelector(
    (state) => state.saveCustomerSlice.customer
  );
  const updateCustomerData = useSelector(
    (state) => state.updateCustomerSlice.customer
  );

  const validateFields = (values) => {
    const errors = {};

    if (!values.fullName) {
      errors.fullName = "Name Required";
    }

    if (!values.contactNo) {
      errors.contactNo = "Required";
    } else if (!/^\d+$/.test(values.contactNo)) {
      errors.contactNo = "Incorrect Format";
    }

    if (!values.email) {
      errors.email = "Email Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.address) {
      errors.address = "Required";
    }

    if (!values.username) {
      errors.username = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (edit) {
      setLoader(true);
      dispatch(updateCustomer({ id: customer._id, updateCustomer: values }));
      setSubmitting(false);
    } else {
      setLoader(true);
      dispatch(saveCustomer(values));
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (loader) {
      if (saveCustomerData.isSuccess && !saveCustomerData.isLoading) {
        dispatch(getAllCustomer());
        setLoader(false);
        onClose();
      } else {
        setLoader(false);
      }
    }
  }, [saveCustomerData.data, saveCustomerData.errorMessage]);

  useEffect(() => {
    if (loader) {
      if (updateCustomerData.isSuccess && !updateCustomerData.isLoading) {
        dispatch(getAllCustomer());
        setLoader(false);
        onClose();
      } else {
        setLoader(false);
      }
    }
  }, [updateCustomerData.data, updateCustomerData.errorMessage]);

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {edit ? "Edit Customer" : "Add New Customer"}
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{
            fullName: edit ? customer.fullName : "",
            contactNo: edit ? customer.contactNo : "",
            email: edit ? customer.email : "",
            address: edit ? customer.address : "",
            username: edit ? customer.username : "",
            password: edit ? customer.password : "",
          }}
          validate={validateFields}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <FormInputField
                  label={"Full Name"}
                  name={"fullName"}
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.fullName}
                  touched={touched.fullName}
                />

                <FormInputField
                  label={"Contatct No"}
                  name={"contactNo"}
                  value={values.contactNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.contactNo}
                  touched={touched.contactNo}
                />

                <FormInputField
                  label={"Email"}
                  name={"email"}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                />

                <FormInputField
                  label={"Address"}
                  name={"address"}
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.address}
                  touched={touched.address}
                />

                <FormInputField
                  label={"Username"}
                  name={"username"}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.username}
                  touched={touched.username}
                />

                <FormInputField
                  type={"password"}
                  label={"Password"}
                  name={"password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touched={touched.password}
                />
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
