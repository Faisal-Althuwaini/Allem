import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import Button from './Button'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="" dir="rtl">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-8 bg-transparent">
        <Link to="/" className="flex items-center space-x-reverse space-x-6">
        <img src={logo} className="h-18" alt="Flowbite Logo" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white pr-4">علّم</span>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-reverse md:space-x-8 md:mt-0 md:border-0 ">
            <li className="mb-2 md:mb-0 md:ml-8">
              <Link to="/" className="block py-2 px-6 text-white text-lg" aria-current="page">من نحن</Link>
            </li>

            <Button onClick={() => navigate('/upload')}>اطلب عرض تجريبي</Button>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar