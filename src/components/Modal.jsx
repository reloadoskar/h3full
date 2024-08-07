const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modalfondo">
      <div className="modalcontenido">
        {children}
      </div>
    </div>
  );
};

export default Modal;
