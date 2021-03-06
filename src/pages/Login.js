import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../axios/router'
import toast, { Toaster } from 'react-hot-toast'
import useStore from '../store'

export default function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [processing, setProcessing] = useState(false)

  const { signInUser } = useStore()

  const _handleSubmit = async (e) => {
    e.preventDefault()

    setProcessing(true)
    const _data = {
      email: email,
      password: password,
    }

    const response = await login(_data)

    if (response.data) {
      if (response.data.advice) {
        toast.error(response.data.advice)
      }
      if (response.data.token) {
        //* Logic for signIn
        signInUser(response.data.token)
        localStorage.setItem('token', response.data.token)
        history.push('/app')
      }
    }

    setProcessing(false)
  }
  return (
    <div className="min-h-screen bg-white flex">
      <Toaster />
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link to="/">
            <div>
              <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </div>
          </Link>

          <div className="mt-8">
            <div className="mt-6">
              <form className="space-y-6" onSubmit={_handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={processing}
                  >
                    Sign in {processing && <i className="fa fa-circle-o-notch fa-spin py-1 px-1"></i>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1584954543904-af4096743b95?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          alt=""
        />
      </div>
    </div>
  )
}
