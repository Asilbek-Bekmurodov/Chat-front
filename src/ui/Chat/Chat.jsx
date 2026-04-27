import { useParams } from "react-router-dom";

function Chat() {
  const param = useParams();
  console.log(param);

  return <div>Chat {param.id}</div>;
}
export default Chat;
