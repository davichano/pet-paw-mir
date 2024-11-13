import PropTypes from "prop-types";
import AvatarChat  from "./AvatarChat";

const ChatMessage = ({ name, time }) => (
  <div className="flex items-center gap-3 p-3 hover:bg-pink-50">
    <AvatarChat />
    <div className="flex flex-col">
      <span className="text-custom-350">{name}</span>
      <span className="text-sm text-custom-200">{time}</span>
    </div>
  </div>
);

ChatMessage.propTypes = {
  name: PropTypes.string,
  time: PropTypes.string
}

export default ChatMessage;
