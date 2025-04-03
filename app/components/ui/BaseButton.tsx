import React from 'react'
import { Button } from '@headlessui/react'

type Props = {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
}

const BaseButton = (props: Props) => {
  return (
    <Button
        type={props.type}
        disabled={props.disabled}
        className={`${props.className} inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white`}
        onClick={props.onClick}
    >
        {props.children}
    </Button>
  )
}

export default BaseButton