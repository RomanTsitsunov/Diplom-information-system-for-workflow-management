import { createPortal } from "react-dom";
import "./modal2.css";

interface ModalProps {
    children: any;
    open: boolean;
  }

function Modal2( {children, open}: ModalProps ) {
    return createPortal(
        <dialog open={open}>
            {children}
        </dialog>,
        document.getElementById('modal2') as Element
    );
}

export default Modal2;