import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DropDown() {
  return (
    <Select>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Select The Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Admin">Admin</SelectItem>
        <SelectItem value="Staff">Staff</SelectItem>
        <SelectItem value="Stock">Stock</SelectItem>         
      </SelectContent>
    </Select>
  )
}
