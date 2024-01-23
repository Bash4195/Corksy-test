import { Fragment } from "react"
import { Dialog, Transition } from '@headlessui/react'
import { HiMiniXMark } from "react-icons/hi2";

type Props = {
  children: JSX.Element
  title: string
  description?: string
  showClose?: boolean
  open: boolean
  setOpen: (open: boolean) => void
}
export default function Modal({ children, title, description, showClose = true, open, setOpen }: Props) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-4">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <Dialog.Title as="h2" className="text-2xl font-bold mb-2">
                      {title}
                    </Dialog.Title>

                    <Dialog.Description as="p">
                      {description}
                    </Dialog.Description>
                  </div>

                  {showClose && (
                    <button
                      type="button"
                      className="rounded-full text-gray-900 p-1 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
                      onClick={() => setOpen(false)}
                    >
                      <HiMiniXMark size={24} />
                    </button>
                  )}
                </div>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}