import { DropDown } from "@/common/components/DropDown";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Formik } from "formik";

export function ModalCustomerAddUpdate({ visible, onClose }) {

  const validateFields = (values)=>{
    const errors = {};

    if (!values.fullName) {
      errors.fullName = "Name Required";
    }

    if (!values.contactNo) {
      errors.contactNo = "Required";
    }else if( !/^\d+$/.test(values.contactNo)){
      errors.contactNo = "Incorrect Format"
    }

    if (!values.email) {
      errors.email = "Email Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
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
  }

  const handleSubmit = (values, { setSubmitting })=>{

    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);

  }



  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{
            fullName: "",
            contactNo: "",
            email: "",
            address: "",
            username: "",
            password: ""
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
