"use client";

import { type ReactNode } from "react";

type FieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export function Field({ label, value, placeholder, onChange, required }: FieldProps) {
  return (
    <label className="block space-y-2 text-sm text-gray-700">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
      />
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  value: string;
  rows?: number;
  placeholder?: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export function TextAreaField({
  label,
  value,
  rows = 3,
  placeholder,
  onChange,
  required,
}: TextAreaFieldProps) {
  return (
    <label className="block space-y-2 text-sm text-gray-700">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</span>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
      />
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export function SelectField({
  label,
  value,
  options,
  placeholder,
  onChange,
  required,
}: SelectFieldProps) {
  return (
    <label className="block space-y-2 text-sm text-gray-700">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
      >
        {placeholder ? (
          <option value="">{placeholder}</option>
        ) : null}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type NumberFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  min?: number;
  max?: number;
  suffix?: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export function NumberField({
  label,
  value,
  placeholder,
  min,
  max,
  suffix,
  onChange,
  required,
}: NumberFieldProps) {
  return (
    <label className="block space-y-2 text-sm text-gray-700">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          required={required}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
        {suffix ? <span className="shrink-0 text-sm text-gray-500">{suffix}</span> : null}
      </div>
    </label>
  );
}

type ImageUploadFieldProps = {
  label: string;
  helper?: string;
  preview: string | null;
  fileName: string | null;
  required?: boolean;
  onChange: (file: File | null) => void;
  onRemove?: () => void;
};

export function ImageUploadField({
  label,
  helper,
  preview,
  fileName,
  required,
  onChange,
  onRemove,
}: ImageUploadFieldProps) {
  return (
    <div className="space-y-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
      <label className="block space-y-2 text-sm text-gray-700">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</span>
        <input
          type="file"
          accept="image/*"
          required={required && !preview}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-brand-primary file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
      </label>
      {helper ? <p className="text-xs text-gray-500">{helper}</p> : null}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white text-center">
        {preview ? (
          <img src={preview} alt={fileName ?? label} className="h-28 w-full object-cover" />
        ) : (
          <div className="flex h-28 items-center justify-center text-xs uppercase tracking-wide text-gray-400">
            No image selected
          </div>
        )}
      </div>
      {fileName ? <p className="truncate text-xs text-gray-600">{fileName}</p> : null}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="text-xs font-semibold text-brand-primary transition hover:text-brand-primary/80"
        >
          Remove image
        </button>
      ) : null}
    </div>
  );
}

type StringListFieldProps = {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  addLabel?: string;
  emptyMessage?: string;
};

export function StringListField({
  label,
  value,
  onChange,
  placeholder = "Enter item…",
  addLabel = "Add item",
  emptyMessage = "No items yet.",
}: StringListFieldProps) {
  const updateAt = (index: number, text: string) => {
    const next = [...value];
    next[index] = text;
    onChange(next);
  };
  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };
  const append = () => onChange([...value, ""]);

  return (
    <div className="block space-y-2 text-sm text-gray-700">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</span>
      <div className="space-y-2">
        {value.length === 0 ? (
          <p className="rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-xs text-gray-500">
            {emptyMessage}
          </p>
        ) : (
          value.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateAt(index, e.target.value)}
                placeholder={placeholder}
                className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="shrink-0 rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:text-red-600"
                aria-label="Remove"
              >
                Remove
              </button>
            </div>
          ))
        )}
        <button
          type="button"
          onClick={append}
          className="rounded-md border border-dashed border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-600 transition hover:border-brand-primary hover:text-brand-primary"
        >
          {addLabel}
        </button>
      </div>
    </div>
  );
}

type CardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function Card({ title, description, children }: CardProps) {
  return (
    <div className="space-y-4 rounded-xl border-0 bg-white p-6 shadow-md">
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      {children}
    </div>
  );
}
