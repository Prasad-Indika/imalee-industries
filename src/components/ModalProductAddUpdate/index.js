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
import { getAllProducts, saveProduct, updateProduct } from "@/service/Product";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function ModalProductAddUpdate({
  visible,
  onClose,
  edit = false,
  product,
}) {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const saveProductData = useSelector(
    (state) => state.saveProductSlice.product
  );
  const updateProductData = useSelector(
    (state) => state.updateProductSlice.product
  );

  const validateFields = (values) => {
    const errors = {};

    if (!values.productName) {
      errors.productName = "Required";
    }
    if (!values.description) {
      errors.description = "Required";
    }
    if (!values.unitPrice) {
      errors.unitPrice = "Required";
    }
    if (!values.cost) {
      errors.cost = "Required";
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (edit) {
      setLoader(true);
      dispatch(updateProduct({ id: product._id, updateProduct: values }));
      setSubmitting(false);
      console.log("edti");
    } else {
      setLoader(true);
      dispatch(saveProduct(values));
      setSubmitting(false);
      console.log("save", values);
    }
  };

  useEffect(() => {
    if (loader) {
      if (saveProductData.isSuccess && !saveProductData.isLoading) {
        dispatch(getAllProducts());
        setLoader(false);
        onClose();
      } else {
        setLoader(false);
      }
    }
  }, [saveProductData.data, saveProductData.errorMessage]);

  useEffect(() => {
    if (loader) {
      if (updateProductData.isSuccess && !updateProductData.isLoading) {
        dispatch(getAllProducts());
        setLoader(false);
        onClose();
      } else {
        setLoader(false);
      }
    }
  }, [updateProductData.data, updateProductData.errorMessage]);

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {" "}
            {edit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Formik
            initialValues={{
              productName: edit ? product.productName : "",
              description: edit ? product.description : "",
              unitPrice: edit ? product.unitPrice : "",
              cost: edit ? product.cost : "",
              profit: edit ? product.profit : "",
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
                    label={"Product Name"}
                    name={"productName"}
                    value={values.productName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.productName}
                    touched={touched.productName}
                  />

                  <FormInputField
                    label={"Product Description"}
                    name={"description"}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.description}
                    touched={touched.description}
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

                  <FormInputField
                    label={"Cost"}
                    name={"cost"}
                    value={values.cost}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.cost}
                    touched={touched.cost}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
