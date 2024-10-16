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

export function CommandCom({ data ,onSelect }) {

  return (
    <div className="h-40">
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {data.map((val) => (
            <CommandItem
              key={val.value}
              value={val}
              onSelect={() => {
                onSelect(val)
              }}
            >
              <span>{val.label}</span>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  );
}
