import React from 'react';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        return (
            <input
                className={`${className} block w-full rounded-md border-0 py-1.5 px-2 text-gray-700 dark:text-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                ref={ref}
                {...props}
            />
        );
    }
);
