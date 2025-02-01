import PropTypes from 'prop-types';

const Button = ({ children, onClick, className = "" }) => {
    return (
      <button
        onClick={onClick}
        className={`
          bg-black 
          text-white 
          px-6 
          py-2 
          rounded-4xl 
          border 
          border-[#411F6C]
          hover:opacity-90
          hover:bg-white
          hover:text-[#411F6C]
          transition-opacity
          cursor-pointer
          ${className}
        `}
      >
        {children}
      </button>
    );
  };
  
  Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string
  };
  
  export default Button;