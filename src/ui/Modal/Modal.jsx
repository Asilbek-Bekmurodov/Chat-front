import { RiCloseFill } from "react-icons/ri";
import styles from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { setIsOpenModal } from "../../app/features/uiSlice";

function Modal({ children, isOpenModal }) {
  const dispatch = useDispatch();
  return (
    <div
      className={`${styles.modal} ${isOpenModal ? styles.open : styles.hidden}`}
    >
      <div className={styles.modal__content}>
        <RiCloseFill
          onClick={() => dispatch(setIsOpenModal(false))}
          className={styles.icon}
        />
        {children}
      </div>
    </div>
  );
}
export default Modal;
