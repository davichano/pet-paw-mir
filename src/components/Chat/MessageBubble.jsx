import AvatarChat from "./AvatarChat";
import PropTypes from "prop-types";

const MessageBubble = ({ text }) => (
  <div className="flex gap-2 p-3">
    <div className="flex-shrink-0">
      <AvatarChat />
    </div>
    <div className="bg-custom-75 rounded-lg p-4 text-custom-350 max-w-[80%]">
      {text}
    </div>
  </div>
);

MessageBubble.propTypes = {
  text: PropTypes.string,
}

export default MessageBubble;
