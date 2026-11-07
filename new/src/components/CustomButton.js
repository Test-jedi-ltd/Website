const CustomButton = ({ children, className = "button", onClick, type = "button" }) => (
  <button type={type} className={className} onClick={onClick}>
    {children}
  </button>
);

export default CustomButton;
