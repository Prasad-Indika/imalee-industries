"use client";
import React, { useState } from "react";
import AppButton from "@/common/components/AppButton";
import { ModalProductAddUpdate } from "../ModalProductAddUpdate";

export default function ProductHome() {

    const [visible,setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-4">

      <div>
        <h1 className="text-3xl mb-3">Product Management</h1>
        <hr className="border-t border-gray-300" />
      </div>
      <div className="flex justify-end">
        <AppButton onClick={()=>{setVisible(true)}} name={"New Product"} />
      </div>

      {visible && 
          <ModalProductAddUpdate
              visible={visible}
              onClose={()=>{setVisible(false)}}
          />
      }
    </div>
  );
}
