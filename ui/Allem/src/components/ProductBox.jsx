import Button from './Button'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const ProductBox = ({ title, description, isSoon = false, route = '/' }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (!isSoon) {
      navigate(route)
    }
  }

  return (
    <div className='flex flex-col border-1 border-[#411F6C] bg-black hover:bg-gradient-to-b hover:from-black hover:to-[#292053] rounded-lg h-[600px] w-[600px] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl'>
      <div className='flex flex-col justify-between h-full pt-34 pr-10'>
        <div className='flex flex-col justify-start pr-6 pt-10'>
          <h1 className='text-white text-3xl font-bold transition-all duration-300 hover:scale-110'>{title}</h1>
          <p className='text-white text-lg font-light pt-6 text-right transition-all duration-300 hover:scale-110'>
            {description}
          </p>
        </div>
        <div className='flex justify-end items-end pl-10 pb-10'>
          <Button 
            className='text-xl' 
            disabled={isSoon}
            onClick={handleClick}
          >
            {isSoon ? 'قريباً' : 'جرّب الان'}
          </Button>
        </div>
      </div>
    </div>
  )
}

ProductBox.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isSoon: PropTypes.bool,
  route: PropTypes.string
}

export default ProductBox 