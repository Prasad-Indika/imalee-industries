import { DropDown } from "@/common/components/DropDown";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik } from "formik";
import FormInputField from "@/common/components/FormInputField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, saveUser } from "@/service/User";

export function ModalUserAddUpdate({ visible, onClose }) {

  const dispatch = useDispatch();
  const [loader,setLoader] = useState(false);
  const saveUserData =  useSelector((state)=>state.addUserSlice.user)
  
  const validateFields = (values)=>{
    const errors = {};

    return errors;
  }

  const handleSubmit = (values, { setSubmitting })=>{
    setLoader(true);
    dispatch(saveUser(values))
    setSubmitting(false)
  }

  useEffect(()=>{
    if(loader){
      if(saveUserData.isSuccess && !saveUserData.isLoading){
          dispatch(getAllUsers());
          setLoader(false);
          onClose();
      }else{
          console.log("data Not saved..");
          setLoader(false);
      }
    }
  },[saveUserData.data,saveUserData.errorMessage])


  return (
    <Dialog open={visible} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Formik
            initialValues={{
              fullName: "",
              contactNo: "",
              nic: "",
              userName: "",
              password: "",
              role: "",
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
              setFieldValue,
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
                    label={"NIC"}
                    name={"nic"}
                    value={values.nic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.nic}
                    touched={touched.nic}
                  />

                  <FormInputField
                    label={"Username"}
                    name={"userName"}
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.userName}
                    touched={touched.userName}
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

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-[14px]">
                    Role
                  </Label>

                  <div className="col-span-3">
                    <Select
                      name="role"
                      value={values.role}
                      onValueChange={(value) => setFieldValue("role", value)}                 
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select The Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Staff">Staff</SelectItem>
                        <SelectItem value="Stock">Stock</SelectItem>
                      </SelectContent>
                    </Select>

                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            )}
          </Formik>

        </div>
      </DialogContent>
    </Dialog>
  );
}
