"use client";

import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

type ButtonType = "primary" | "secondary" | "tertiary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  text?: string;
  type?: ButtonType;
  size?: ButtonSize;
  className?: string;
  link?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
  hideArrow?: boolean;
  htmlType?: "button" | "submit" | "reset";
  children?: React.ReactNode;
}

export default function Button({
  text,
  type = "primary",
  size = "md",
  className = "",
  link,
  onClick,
  disabled = false,
  icon,
  hideArrow = false,
  htmlType = "button",
  children,
  ...props
}: ButtonProps) {
  const baseClass =
    type === "primary"
      ? "btn-primary"
      : type === "secondary"
      ? "btn-secondary"
      : type === "tertiary"
      ? "btn-tertiary"
      : "";

  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  // Use children if provided, otherwise use text prop
  const content = children || text;

  const buttonContent = (
    <>
      {icon && (
        <Icon
          icon={icon}
          width={size === "sm" ? 16 : size === "lg" ? 20 : 18}
          height={size === "sm" ? 16 : size === "lg" ? 20 : 18}
          className="mr-2"
        />
      )}
      {content}
      {!hideArrow && type !== "tertiary" && (
        <span className="btn-icon">
          <Icon icon="solar:arrow-right-up-linear" width="18" height="18" />
        </span>
      )}
    </>
  );

  if (link && !disabled) {
    return (
      <Link
        href={link}
        className={`${baseClass} ${sizeClass} ${className} ${disabledClass}`}
        onClick={onClick}
        {...props}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={htmlType}
      className={`${baseClass} ${sizeClass} ${className} ${disabledClass}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {buttonContent}
    </button>
  );
}
