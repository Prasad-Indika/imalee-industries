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
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import FormInputField from "@/common/components/FormInputField";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getOrderItemByOrder,
  saveOrderItem,
  updateOrderItem,
} from "@/service/OrderDetails";

export function ModalOrderItemAddUpdate({
  visible,
  onClose,
  orderId,
  edit = false,
  orderItem,
}) {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const saveOrderItemData = useSelector(
    (state) => state.saveOrderDetailSlice.orderDetail
  );
  const updateOrderItemData = useSelector(
    (state) => state.updateOrderItemSlice.orderDetail
  );

  const handleSubmit = (values, { setSubmitting }) => {
    const tot = Number(values.qty) * Number(values.unitPrice);
    const newData = {
      description: values.description,
      qty: values.qty,
      unitPrice: values.unitPrice,
      total: tot.toString(),
      status: edit ? orderItem.status : "pending",
    };

    if (edit) {
      setLoader(true);
      dispatch(
        updateOrderItem({ orderItemId: orderItem._id, updateditem: newData })
      );
      setSubmitting(true);
    } else {
      setLoader(true);
      dispatch(saveOrderItem({ order: orderId, orderitem: newData }));
      setSubmitting(true);
    }
  };

  const validateFields = (values) => {
    const errors = {};

    if (!values.description) {
      errors.description = "Required";
    }

    return errors;
  };

  useEffect(() => {
    if (loader) {
      if (saveOrderItemData.isSuccess && !saveOrderItemData.isLoading) {
        dispatch(getOrderItemByOrder(orderId));
        setLoader(false);
        onClose();
      } else {
        setLoader(false);
      }
    }
  }, [saveOrderItemData.data, saveOrderItemData.errorMessage]);

  useEffect(() => {
    if (loader) {
      if (updateOrderItemData.isSuccess && !updateOrderItemData.isLoading) {
        dispatch(getOrderItemByOrder(orderId));
        setLoader(false);
        onClose();
      } else {
        setLoader(false);
      }
    }
  }, [updateOrderItemData.data, updateOrderItemData.errorMessage]);

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{edit ? "Update Item" : "New Order Item"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Formik
            initialValues={{
              description: edit ? orderItem.description : "",
              qty: edit ? orderItem.qty : "",
              unitPrice: edit ? orderItem.unitPrice : "",
              status: edit ? orderItem.status : "pending",
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
                    label={"Description"}
                    name={"description"}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.description}
                    touched={touched.description}
                  />

                  <FormInputField
                    label={"Qty"}
                    name={"qty"}
                    value={values.qty}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.qty}
                    touched={touched.qty}
                  />

                  <FormInputField
                    label={"Unit Price"}
                    name={"unitPrice"}
                    value={values.unitPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.unitPrice}
                    touched={touched.unitPrice}
                  />
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {edit ? "Update" : "Add Item"}
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
