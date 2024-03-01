import { createPortal } from "react-dom";
import "./modal.css";

interface ModalProps {
    children: any;
    open: boolean;
  }

function Modal( {children, open}: ModalProps ) {
    return createPortal(
        <dialog open={open}>
            {children}
        </dialog>,
        document.getElementById('modal') as Element
    );
}

export default Modal;