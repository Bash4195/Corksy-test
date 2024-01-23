import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string
  field: UseFormRegisterReturn
  options: {
    label: string
    value: string
    selected?: boolean
  }[]
  defaultOption?: string
  errors: FieldErrors
  wrapperClass?: string
  // All other props
  [x:string]: any;
}
export default function Input({ label, field, options, defaultOption, errors, wrapperClass, ...props }: Props) {
  return (
    <div className={wrapperClass}>
      <label htmlFor={field.name} className="block text-sm lg:text-base font-medium text-gray-900">
        {label}
      </label>
      <div>
        <select
          {...field}
          name={field.name}
          id={field.name}
          className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 ${errors[field.name] ? 'ring-red-500' : ''}`}
          {...props}
          defaultValue={defaultOption}
        >
          <option value="">Select one</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} selected={option.selected}>{option.label}</option>
          ))}
        </select>
      </div>

      {errors[field.name] && (
        <label className="block text-sm font-medium text-red-500" htmlFor={field.name}>
          {/* @ts-ignore */}
          {errors[field.name].message}
        </label>
      )}
    </div>
  )
}