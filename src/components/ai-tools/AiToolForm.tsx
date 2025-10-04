"use client";

import type { LucideIcon } from "lucide-react";

interface Option {
  text: string;
  value?: string | number;
}

export interface FormConfig {
  icon: LucideIcon;
  title: string;
  iconColor?: string;
  inputLabel: string;
  inputPlaceholder: string;
  inputType?: "text" | "textarea" | "file";
  inputRows?: number;
  optionsLabel: string;
  options: Option[] | string[];
  selectedColor?: string;
  selectedBgColor?: string;
  buttonIcon: LucideIcon;
  buttonText: string;
  buttonGradientFrom: string;
  buttonGradientTo: string;
}

interface AiToolFormProps<T = string | number | Option> {
  onSubmit: (e: React.FormEvent) => void;
  config: FormConfig;
  inputValue: string;
  onInputChange: (value: string) => void;
  selectedValue: T;
  onSelect: (value: T) => void;
  children?: React.ReactNode;
}

export default function AiToolForm<T = string | number | Option>({
  onSubmit,
  config,
  inputValue,
  onInputChange,
  selectedValue,
  onSelect,
  children,
}: AiToolFormProps<T>) {
  const {
    icon: Icon,
    title,
    iconColor = "text-[#4A7AFF]",
    inputLabel,
    inputPlaceholder,
    inputType = "text",
    inputRows = 4,
    optionsLabel,
    options,
    selectedColor = "text-blue-700",
    selectedBgColor = "bg-blue-50",
    buttonIcon: ButtonIcon,
    buttonText,
    buttonGradientFrom,
    buttonGradientTo,
  } = config;
  const isStringArray = typeof options[0] === "string";

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Icon className={`w-6 ${iconColor}`} />
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      {/* Input */}
      <p className="mt-4 text-sm font-medium">{inputLabel}</p>
      {inputType === "textarea" ? (
        <textarea
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          rows={inputRows}
          required
        />
      ) : inputType === "file" ? (
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onInputChange(file.name);
            }
          }}
          required
        />
      ) : (
        <input
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          required
        />
      )}

      {/* Options */}
      <p className="mt-6 text-sm font-medium">{optionsLabel}</p>
      <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
        {options.map((option, index) => {
          const optionText = isStringArray
            ? (option as string)
            : (option as Option).text;
          const optionValue = isStringArray ? option : (option as Option).value;
          const isSelected = isStringArray
            ? selectedValue === option
            : selectedValue === optionValue;

          return (
            <button
              type="button"
              key={
                isStringArray
                  ? (option as string)
                  : `${(option as Option).text}-${index}`
              }
              onClick={() =>
                onSelect((isStringArray ? option : optionValue) as T)
              }
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                isSelected
                  ? `${selectedBgColor} ${selectedColor}`
                  : "text-gray-500 border-gray-300"
              }`}
            >
              {optionText}
            </button>
          );
        })}
      </div>

      {/* Custom content */}
      {children}

      {/* Button */}
      <button
        type="submit"
        className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r ${buttonGradientFrom} ${buttonGradientTo} text-white px-4 py-2 mt-4 text-sm rounded-lg cursor-pointer`}
      >
        <ButtonIcon className="w-5" />
        {buttonText}
      </button>
    </form>
  );
}
