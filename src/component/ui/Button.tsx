"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "highlight"
    | "ghost"
    | "outline"
    | "error"
    | "success"
    | "warning"
    | "subtle";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ReuseButtonProps {
    url?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    htmlType?: "button" | "submit" | "reset";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    fullWidth?: boolean;
    rounded?: "sm" | "md" | "lg" | "full";
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-primary-color text-base-color border border-base-color hover:opacity-90",
    secondary:
        "bg-secondary-color text-primary-color border border-secondary-color hover:opacity-90",
    highlight:
        "bg-transparent text-base-color border border-base-color hover:bg-base-color hover:text-primary-color",
    ghost:
        "bg-transparent text-lighter-color border border-transparent hover:bg-base-color/10 hover:text-primary-color hover:border-base-color/20",
    outline:
        "bg-transparent text-base-color border border-base-color hover:bg-base-color hover:text-primary-color",
    error:
        "bg-error text-primary-color border border-error hover:opacity-90",
    success:
        "bg-green-500 text-white border border-green-500 hover:bg-green-600 hover:border-green-600",
    warning:
        "bg-yellow-400 text-gray-900 border border-yellow-400 hover:bg-yellow-500 hover:border-yellow-500",
    subtle:
        "bg-base-color/10 text-base-color border border-transparent hover:bg-base-color/20",
};

const sizeStyles: Record<ButtonSize, string> = {
    xs: "py-1 px-3 text-xs gap-1",
    sm: "py-1.5 px-4 text-sm gap-1.5",
    md: "py-2.5 px-6 text-base gap-2",
    lg: "py-3.5 px-8 text-lg gap-2",
    xl: "py-4 px-10 text-xl gap-2.5",
};

const roundedStyles = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
};

// Spinner shown during loading state
const Spinner = () => (
    <svg
        className="animate-spin w-4 h-4 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
        />
    </svg>
);

const baseStyles = `
  inline-flex items-center justify-center
  font-medium leading-none
  cursor-pointer select-none
  ring-0 outline-none
  transition-all duration-200 ease-in-out
  focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-base-color/50
  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  active:scale-[0.97]
`;

const ReuseButton = ({
    url,
    variant = "primary",
    size = "md",
    className,
    disabled = false,
    loading = false,
    htmlType = "button",
    onClick,
    children,
    iconLeft,
    iconRight,
    fullWidth = true,
    rounded = "md",
}: ReuseButtonProps) => {
    const classes = cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        roundedStyles[rounded],
        fullWidth ? "w-full" : "w-auto",
        className
    );

    const content = (
        <>
            {loading ? (
                <Spinner />
            ) : (
                iconLeft && <span className="shrink-0">{iconLeft}</span>
            )}
            <span>{children}</span>
            {!loading && iconRight && (
                <span className="shrink-0">{iconRight}</span>
            )}
        </>
    );

    if (url) {
        return (
            <Link
                href={url}
                className={cn(classes, (disabled || loading) && "pointer-events-none opacity-50")}
                aria-disabled={disabled || loading}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type={htmlType}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
            aria-busy={loading}
        >
            {content}
        </button>
    );
};

export default ReuseButton;