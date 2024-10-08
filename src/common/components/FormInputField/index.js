import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'

export default function FormInputField({label ,name,value,onBlur,onChange,error,touched,...rest}) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right text-[14px]">
            {label}
        </Label>

        <div className="col-span-3">
            <Input
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                {...rest}
            />
            {error && touched && (
                <Label className="text-red-500 text-[8px] mt-1">
                    {error}
                </Label>
            )}
        </div>
    </div>
  )
}
