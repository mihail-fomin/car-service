import React from 'react';

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => {
        return (
            <label className={`${className} block text-sm font-medium leading-6 text-gray-200`} ref={ref} {...props} />
        );
    }
);
