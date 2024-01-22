type Props = {
  children: JSX.Element | string
  // All other props
  [x:string]: any;
}
export default function Button({ children, ...props }: Props) {
  return (
    <button
      className="rounded-md bg-primary px-4 py-2 lg:text-lg font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      {...props}
    >
      {children}
    </button>
  )
}