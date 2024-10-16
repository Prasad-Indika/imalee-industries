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
import { getCompleteOrders, getOrderById, getPendingOrders, updateOrderComplete } from "@/service/Order"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export function ModalOrderComplete({visible,onClose,total,orderId}) {

    const dispatch = useDispatch();
    const [loader,setLoader] = useState(false);
    const [paidAmount,setPaidAmount] = useState("");
    const updateData = useSelector((state)=>state.updateOrderCompleteSlice.order);
    const isValid = !!paidAmount

    const handleOrderComplete = ()=>{
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];

      const completeData = {
        status :'complete', 
        totolAmount: total , 
        paidAmount:paidAmount, 
        completeDate:formattedDate
      }

      setLoader(true);
      dispatch(updateOrderComplete({orderId:orderId,updateOrder:completeData}));    
    }

    useEffect(()=>{
      if(loader){
          if(updateData.isSuccess && !updateData.isLoading){
            dispatch(getPendingOrders());
            dispatch(getCompleteOrders());
            dispatch(getOrderById(orderId))
            setLoader(false);
            onClose();
          }else{
            setLoader(false);
          }
      }
  },[updateData.data,updateData.errorMessage])

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Order</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">

        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Total Amount 
            </Label>
            <h1 className="text-2xl mb-3">{total}</h1>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Paid Amount
            </Label>
            <Input
                value={paidAmount}
                className="col-span-3"
                onChange={(e)=>{
                    setPaidAmount(e.target.value)
                }}
            />
          </div>
         
        </div>
        <DialogFooter>
            <Button 
                disabled = {!isValid}
                onClick={()=>{handleOrderComplete()}}
            >Complete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
