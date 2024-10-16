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
import { getPendingOrders, saveOrder } from "@/service/Order";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import FormInputField from "@/common/components/FormInputField";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllCustomer } from "@/service/Customer";
import { CommandCom } from "@/common/components/CommandCom";

export function ModalOrderAdd({ visible, onClose }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState("");
  const [customerError, setCustomerError] = useState("");
  const [loader, setLoader] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const saveOrderData = useSelector((state) => state.saveOrderSlice.order);
  const customerData = useSelector((state) => state.customersSlice.customer);
  const isValid = !!customer;

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const handleSubmit = (values, { setSubmitting }) => {
    setLoader(true);
    dispatch(saveOrder({ customer: customer?.value, order: values }));
    setSubmitting(true);
  };

  const validateFields = (values) => {
    const errors = {};

    if (!values.description) {
      errors.description = "Required";
    }

    return errors;
  };

  useEffect(() => {
    dispatch(getAllCustomer());
  }, []);

  useEffect(() => {
    if (customerData.isSuccess) {
      const data = customerData?.data;
      if (Array.isArray(data)) {
        const array = data.map((val, index) => ({
          value: val._id,
          label: val.fullName,
        }));
        setCustomerList(array);
      }
    }
  }, [customerData.data, customerData.isSuccess]);

  useEffect(() => {
    if (loader) {
      if (saveOrderData.isSuccess && !saveOrderData.isLoading) {
        dispatch(getPendingOrders());
        setLoader(false);
        onClose();
        router.push(`Orders/${saveOrderData?.data._id}`);
      } else {
        setLoader(false);
      }
    }
  }, [saveOrderData.data, saveOrderData.errorMessage]);

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CommandCom
            data={customerList}
            onSelect={(val) => {
              setCustomer(val);
            }}
          />

          <Formik
            initialValues={{
              description: "",
              status: "pending",
              totolAmount: "0",
              paidAmount: "0",
              orderDate: formattedDate,
              completeDate: "0",
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
                    label={"Customer Name"}
                    name={"customerName"}
                    value={customer?.label}
                    touched={true}
                    onBlur={handleBlur}
                  />

                  <FormInputField
                    label={"Order Description"}
                    name={"description"}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.description}
                    touched={touched.description}
                  />
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={!isValid}>
                    Create Order
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
