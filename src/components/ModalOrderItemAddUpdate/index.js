import { DropDown } from "@/common/components/DropDown"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { saveOrder } from "@/service/Order"
import { useDispatch, useSelector } from "react-redux"
import { Formik } from "formik";
import FormInputField from "@/common/components/FormInputField"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function ModalOrderItemAddUpdate({visible,onClose,orderId}) {

    const router = useRouter()
    const dispatch = useDispatch();
    const [loader,setLoader] = useState(false)
    // const saveOrderData = useSelector((state)=>state.saveOrderSlice.order);

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

  

    const handleSubmit = (values, { setSubmitting })=>{
     
        // setLoader(true);
        // dispatch(saveOrder({customer:'6707aa0aa2405bfacfdb538a',order:values}));  
        // setSubmitting(true);
        
        console.log(values);
        
    }

    const validateFields = (values)=>{
      const errors = {};
  
      if (!values.description) {
        errors.description = "Required";
      }
     
      return errors;
  }

//   useEffect(()=>{
//     if(loader){
//       if(saveOrderData.isSuccess && !saveOrderData.isLoading){
//          // dispatch(getAllCustomer())
//          console.log(saveOrderData.data);

//           setLoader(false);
//           onClose();
//           router.push(`Orders/${saveOrderData?.data._id}`)
//       }else{
//           console.log("data Not saved..");
//           setLoader(false);
//       }
//     }
//   },[saveOrderData.data,saveOrderData.errorMessage])


  return (
    <Dialog open={visible} onOpenChange={onClose}>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Order Item {orderId}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">


        <Formik
          initialValues={{
            description:  "",
            qty: "10",
            unitPrice:  "0",
            status: "pending",
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

                {/* <FormInputField
                  label={"Customer Name"}
                  name={"customerName"}
                  value={customer}
                  onChange={handleCustomerNameChange}
                  error={customerError}
                  touched={true}
                  onBlur={handleBlur}
                /> */}

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
                  Create Order
                </Button>
              </DialogFooter>
            </form>
          )}
        </Formik>
      
        </div>
       
      </DialogContent>
    </Dialog>
  )
}
