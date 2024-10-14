'use client'
import React, { useState } from 'react'
import AppButton from '@/common/components/AppButton'
import Link from 'next/link'
import { ModalOrderAdd } from '../ModalOrderAdd'
import { Toggle } from "@/components/ui/toggle"


export default function OrderHome() {

  const [visible,setVisible] = useState();


  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl mb-3">Products</h1>
          <AppButton
            name={"Add New Order"}
            onClick={() => {
              setVisible(true);
            }}
          />
          {/* <Link href={'/Orders/10'}>new</Link> */}
        </div>

        <hr className="border-t border-gray-300" />
      </div>

      <div>
        {/* <AppTable columns={columns} data={productTableData} /> */}
      </div>

      {visible && (
        <ModalOrderAdd
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
        />
      )}

    </div>
  )
}