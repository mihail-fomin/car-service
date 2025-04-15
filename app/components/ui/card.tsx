import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                className={`${className} rounded-lg border border-gray-700 bg-gray-800 shadow-sm`}
                ref={ref}
                {...props}
            />
        );
    }
);

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                className={`${className} flex flex-col space-y-1.5 p-6`}
                ref={ref}
                {...props}
            />
        );
    }
);

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ className, ...props }, ref) => {
        return (
            <h3
                className={`${className} text-2xl font-semibold leading-none tracking-tight text-white`}
                ref={ref}
                {...props}
            />
        );
    }
);

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                className={`${className} p-6 pt-0`}
                ref={ref}
                {...props}
            />
        );
    }
); 