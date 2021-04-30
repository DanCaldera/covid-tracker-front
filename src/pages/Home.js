import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Fragment, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { home, register } from '../axios/router'
import useStore from '../store'

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const user = useStore((state) => state.user)
  const { logOutUser } = useStore()

  const [processing, setProcessing] = useState(false)

  //* to verify if backend is online
  useEffect(() => {
    const getHome = async () => {
      const response = await home()
      if (response.data === 'pageok') {
        toast.success('Welcome!')
      } else {
        toast.error('Oooops!')
      }
    }
    getHome()
  }, [])

  const _handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    const _data = {
      name,
      email,
      password,
    }

    const response = await register(_data)

    if (response.data) {
      if (response.data.advice) {
        toast.error(response.data.advice)
      }
      if (response.data.status === 'success') {
        toast.success(response.data.message)
      }
    }

    setProcessing(false)
  }

  const _onClickLogOut = () => {
    localStorage.clear()
    logOutUser()
  }

  return (
    <div className="relative bg-gray-800 overflow-hidden">
      <Toaster />
      <div className="hidden sm:block sm:absolute sm:inset-0" aria-hidden="true">
        <svg
          className="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-700 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
          width={364}
          height={384}
          viewBox="0 0 364 384"
          fill="none"
        >
          <defs>
            <pattern
              id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} fill="currentColor" />
            </pattern>
          </defs>
          <rect width={364} height={384} fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)" />
        </svg>
      </div>
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Popover>
          {({ open }) => (
            <nav>
              <nav
                className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
                aria-label="Global"
              >
                <div className="flex items-center flex-1">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <a href="/">
                      <span className="sr-only">Workflow</span>
                      <img
                        className="h-8 w-auto sm:h-10"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt=""
                      />
                    </a>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex">
                  {!user && (
                    <Link to="/login">
                      <div className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
                        Log in
                      </div>
                    </Link>
                  )}
                  {user && (
                    <>
                      <Link to="/app">
                        <div className="inline-flex items-center mx-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
                          Go to App
                        </div>
                      </Link>
                      <div
                        onClick={_onClickLogOut}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                      >
                        Log out
                      </div>
                    </>
                  )}
                </div>
              </nav>

              <Transition
                show={open}
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  static
                  className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                  <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                          alt=""
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <a
                      href="/login"
                      className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                    >
                      Log in
                    </a>
                  </div>
                </Popover.Panel>
              </Transition>
            </nav>
          )}
        </Popover>

        <main className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <span className="md:block">Covid-19</span> <span className="text-indigo-400 md:block">tracker</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Web App to obtain statistics from covid-19 around the world.
                  </p>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                  {!user && (
                    <div className="px-4 py-8 sm:px-10">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Sign up with Email</p>
                      </div>

                      <div className="mt-6">
                        <form className="space-y-6" onSubmit={_handleSubmit}>
                          <div>
                            <label htmlFor="mobile-or-email" className="sr-only">
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Name"
                              required
                              className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>

                          <div>
                            <label htmlFor="mobile-or-email" className="sr-only">
                              Email
                            </label>
                            <input
                              type="text"
                              name="email"
                              id="email"
                              autoComplete="email"
                              autoCapitalize="none"
                              placeholder="Email"
                              required
                              className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <div>
                            <label htmlFor="password" className="sr-only">
                              Password
                            </label>
                            <input
                              id="password"
                              name="password"
                              type="password"
                              placeholder="Password"
                              autoComplete="current-password"
                              required
                              className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>

                          <div>
                            <button
                              type="submit"
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              disabled={processing}
                            >
                              Create your account
                              {processing && <i className="fa fa-circle-o-notch fa-spin py-1 px-1"></i>}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
