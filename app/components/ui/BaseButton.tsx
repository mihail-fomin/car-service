import React from 'react'

type Props = {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    type?: 'button' | 'submit' | 'reset'
}

const BaseButton = (props: Props) => {
  return (
    <button
        type={props.type}
        className={`${props.className} flex items-center justify-center bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition ounded-md border-[1px] border-gray-200`}
        onClick={props.onClick}
    >
        {props.children}
    </button>
  )
}

export default BaseButton