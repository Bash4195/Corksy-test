import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string
  field: UseFormRegisterReturn
  errors: FieldErrors
  wrapperClass?: string
  // All other props
  [x:string]: any;
}
export default function Checkbox({ label, field, errors, wrapperClass, ...props }: Props) {
  return (
    <div className={wrapperClass}>
      <div className="relative flex gap-x-2">
        <div className="flex h-6 items-center">
          <input
            {...field}
            name={field.name}
            id={field.name}
            type="checkbox"
            className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
            {...props}
          />
        </div>
        <label htmlFor={field.name} className=" leading-6">
          {label}
        </label>
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