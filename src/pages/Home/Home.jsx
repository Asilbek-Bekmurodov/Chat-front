import Modal from "../../ui/Modal/Modal";
import styles from "./Home.module.css";
import { NavLink, Outlet, useNavigate, useMatch } from "react-router-dom";
import {
  useDeleteChatMutation,
  useGetChatsQuery,
} from "../../app/services/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenModal } from "../../app/features/uiSlice";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "../../ui/Loader/Loader";
import Create from "../../ui/Create/Create";
import Join from "../../ui/Join/Join";

function Home() {
  const { data: chats, isLoading } = useGetChatsQuery();
  const { isOpenModal } = useSelector((state) => state.ui);
  const [deleteChat, { isLoading: isDeleting }] = useDeleteChatMutation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const isCreate = useMatch("/home/create");
  const isJoin = useMatch("/home/join");

  console.log(isOpenModal);

  if (isLoading || isDeleting)
    return (
      <div className={styles.loader__box}>
        <Loader />
      </div>
    );

  async function handleDelete(id) {
    console.log(id);
    try {
      let res = await deleteChat(id).unwrap();
      if (res) {
        toast.success("Muvaffaqqiyatli o'chirildi");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong !");
    }
  }

  return (
    <div className={styles.home}>
      <div className={styles.sidebar}>
        <p className={styles.sidebarTitle}>Chats</p>
        <ul>
          {chats &&
            chats.map((chat) => (
              <li
                onClick={() => navigate(`chat/${chat._id}`)}
                className={styles.chat}
                key={chat._id}
              >
                {chat.title}

                <MdDelete onClick={() => handleDelete(chat._id)} />
              </li>
            ))}
        </ul>
        <div
          onClick={() => dispatch(setIsOpenModal(true))}
          className={styles.create}
        >
          +
        </div>
      </div>
      <Outlet />
      <Modal isOpenModal={isOpenModal}>
        <div>
          <nav>
            <ul className={styles.tab}>
              <li className={styles.tab__item}>
                <NavLink to={"/home/create"}>Create</NavLink>
              </li>
              <li className={styles.tab__item}>
                <NavLink to={"/home/join"}>Join</NavLink>
              </li>
            </ul>
          </nav>

          <div>
            {isCreate && <Create />}
            {isJoin && <Join />}
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Home;
