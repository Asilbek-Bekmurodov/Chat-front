import { useState } from "react";
import { useCreateChatMutation } from "../../app/services/chatApi";
import styles from "./Create.module.css";
import { useDispatch } from "react-redux";
import { setIsOpenModal } from "../../app/features/uiSlice";

function Create() {
  const [inputData, setInputData] = useState({
    title: "",
  });
  const [createChat, { isLoading: creating }] = useCreateChatMutation();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputData.title.trim()) return;

    let res = await createChat(inputData).unwrap();
    console.log(res);
    if (res) {
      dispatch(setIsOpenModal(false));
    }
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Create a new chat</p>
      <form onClick={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          value={inputData.title}
          required
          onChange={(e) =>
            setInputData((state) => ({ ...state, title: e.target.value }))
          }
          placeholder="Chat title..."
        />
        <button className={styles.button}>
          {creating ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
export default Create;
