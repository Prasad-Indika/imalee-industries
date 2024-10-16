import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommandCom } from "../CommandCom";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";

export function PopoverDemo({data}) {
  const [selectValue, setSelectValue] = useState("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline"  className="w-[250px] justify-between">
          {selectValue
            ? data.find((val) => val.value === selectValue)
                ?.label
            : "Select Value..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <div className="h-40">
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {data.map((val) => (
                <CommandItem
                  key={val.value}
                  value={val.value}
                  onSelect={(val) => {
                    console.log("ggg", val);
                    setSelectValue(val);
                  }}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{val.label}</span>
                </CommandItem>
              ))}

              {/* <CommandItem
                key={"Calendar"}
                value={"Calendar"}
                onSelect={(val)=>{console.log("ggg",val);
                }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem> */}
            </CommandList>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  );
}
