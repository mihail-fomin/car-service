'use client'

import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import { FieldValues, Path, UseFormSetValue, PathValue } from 'react-hook-form'

type Option = {
    id: string;
    label: string;
}

type Props<T extends FieldValues> = {
    options: Option[],
    name?: Path<T>,
    setValue?: UseFormSetValue<T>,
    defaultValue?: Option,
}

export default function SelectMenu<T extends FieldValues>({ options, name, setValue, defaultValue }: Props<T>) {
  const [selected, setSelected] = useState<Option | null>(defaultValue || null)

  const handleChange = (value: Option) => {
    setSelected(value)
    if (setValue && name) {
      setValue(name, value.id as PathValue<T, Path<T>>)
    }
  }

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative flex-1">
        <ListboxButton className="block w-full p-2 text-gray-200 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
          <span className="flex items-center justify-between">
            <span className="block truncate">
              {selected ? selected.label : 'Выберите...'}
            </span>
            <ChevronUpDownIcon
              aria-hidden="true"
              className="text-gray-400 size-5"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute left-0 right-0 z-10 w-full py-1 mt-1 overflow-auto text-base bg-gray-800 rounded-md shadow-lg max-h-56 ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="relative px-3 py-2 text-gray-200 cursor-default select-none group data-focus:bg-indigo-800 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className="block font-normal truncate group-data-selected:font-semibold">
                  {option.label}
                </span>
                {selected?.id === option.id && (
                  <CheckIcon className="ml-2 text-indigo-400 size-5" aria-hidden="true" />
                )}
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
