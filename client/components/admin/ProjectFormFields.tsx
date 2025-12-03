"use client";

import { ReactNode } from "react";

type FieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export function Field({ label, value, placeholder, onChange, required }: FieldProps) {
  return (
    <label className="block space-y-2 text-sm text-white/80">
      <span className="text-xs uppercase tracking-wide text-white/40">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none"
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
    <label className="block space-y-2 text-sm text-white/80">
      <span className="text-xs uppercase tracking-wide text-white/40">{label}</span>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none"
      />
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
    <div className="space-y-3 rounded-lg border border-dashed border-white/20 bg-black/20 p-4">
      <label className="block space-y-2 text-sm text-white/80">
        <span className="text-xs uppercase tracking-wide text-white/40">{label}</span>
        <input
          type="file"
          accept="image/*"
          required={required && !preview}
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
          className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-2 text-xs text-white file:mr-4 file:rounded-md file:border-0 file:bg-white file:px-3 file:py-2 file:text-xs file:font-semibold file:text-black focus:border-white/40 focus:outline-none"
        />
      </label>
      {helper ? <p className="text-xs text-white/50">{helper}</p> : null}
      <div className="overflow-hidden rounded-lg border border-white/10 bg-black/30 text-center">
        {preview ? (
          <img src={preview} alt={fileName ?? label} className="h-28 w-full object-cover" />
        ) : (
          <div className="flex h-28 items-center justify-center text-xs uppercase tracking-wide text-white/30">
            No image selected
          </div>
        )}
      </div>
      {fileName ? <p className="truncate text-xs text-white/60">{fileName}</p> : null}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="text-xs font-semibold text-red-400 transition hover:text-red-300"
        >
          Remove image
        </button>
      ) : null}
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
    <div className="space-y-4 rounded-md border border-white/10 bg-black/30 p-4">
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="text-xs text-white/40">{description}</p>
      </div>
      {children}
    </div>
  );
}


