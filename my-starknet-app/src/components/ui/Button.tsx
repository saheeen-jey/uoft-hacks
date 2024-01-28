import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={`px-2 py-1 bg-blue-800 rounded-md text-white disabled:opacity-50 focus:outline-none focus:ring focus:border-blue-300 active:bg-blue-900 ${props.className}`}            >
            {children}
        </button>
    );
};