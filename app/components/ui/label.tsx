import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, ...props }, ref) => {
        return (
            <label
                className={`${className} block text-sm font-medium leading-6 text-gray-200`}
                ref={ref}
                {...props}
            />
        );
    }
); 