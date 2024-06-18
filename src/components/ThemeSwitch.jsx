"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const themes = [
  {
    value: "default",
    label: "Standaard",
  },
  // {
  //   value: "studio100",
  //   label: "Studio 100",
  // },
  {
    value: "disney",
    label: "Disney",
  },
  // {
  //   value: "piraten",
  //   label: "Piraten",
  // },
];

export function ThemeSwitch({ changeTheme }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("default");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between "
        >
          {value
            ? themes.find((theme) => theme.value === value)?.label
            : "Selecteerd een thema..."}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 ">
        <Command>
          <CommandInput placeholder="Zoek thema..." />
          <CommandList>
            <CommandEmpty>Geen thema gevonden</CommandEmpty>
            <CommandGroup>
              {themes.map((theme) => (
                <CommandItem
                  key={theme.value}
                  value={theme.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    changeTheme(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === theme.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {theme.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
