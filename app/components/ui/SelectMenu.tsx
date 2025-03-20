'use client'

import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import { MaintenanceType } from '@prisma/client'

type Props = {
    fields: MaintenanceType[]
    containerWidth: number
}

export default function SelectMenu({ fields, containerWidth }: Props) {
  const [selected, setSelected] = useState<MaintenanceType | null>(null)
    
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative flex-1">
        <ListboxButton className="block w-full p-2 text-gray-200 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
          <span className="flex items-center justify-between">
            <span className="block truncate">{selected?.name || 'Выберите...'}</span>
            <ChevronUpDownIcon
              aria-hidden="true"
              className="text-gray-400 size-5"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute left-0 right-0 z-10 w-full py-1 mt-1 overflow-auto text-base bg-gray-800 rounded-md shadow-lg max-h-56 ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
          style={{ 
            minWidth: containerWidth > 0 ? `${containerWidth}px` : 'auto', 
            width: containerWidth > 0 ? `${containerWidth}px` : 'auto', 
            '--button-width': containerWidth > 0 ? `${containerWidth}px` : 'auto'
          } as React.CSSProperties}
        >
          {fields.map((field) => (
            <ListboxOption
              key={field.id}
              value={field}
              className="relative py-2 px-3 text-gray-200 cursor-default select-none group data-focus:bg-indigo-800 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className="block font-normal truncate group-data-selected:font-semibold">{field.name}</span>
              </div>

              {field.id === selected?.id &&
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-400 group-data-focus:text-white">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              }
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
