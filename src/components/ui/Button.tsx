type Props = {
  children: JSX.Element | string
  btnType?: 'primary' | 'delete'
  className?: string
  // All other props
  [x:string]: any;
}
export default function Button({ children, btnType, className, ...props }: Props) {
  const btnDefaultStyles = 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus-visible:outline-gray-900'
  const btnPrimaryStyles = 'bg-primary text-white hover:bg-primary-hover focus-visible:outline-primary'
  const btnDeleteStyles = 'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600'

  let btnStyles = btnDefaultStyles
  if(btnType === 'primary') btnStyles = btnPrimaryStyles
  if(btnType === 'delete') btnStyles = btnDeleteStyles

  return (
    <button
      className={`${btnStyles} rounded-md px-4 py-2 text-base lg:text-lg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}