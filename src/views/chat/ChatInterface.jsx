import AvatarChat from "../../components/Chat/AvatarChat";
import MessageBubble from "../../components/Chat/MessageBubble";
import ChatMessage from "../../components/Chat/ChatMessage";
import { HiChevronLeft, HiDotsVertical, HiPaperAirplane, HiEmojiHappy } from 'react-icons/hi';
import  { useState } from "react";

const ChatInterface = () => {
  const [messages] = useState([
    { id: 1, name: 'Nombre', time: '50 min' },
    { id: 2, name: 'Nombre', time: '50 min' },
    { id: 3, name: 'Nombre', time: '50 min' },
    { id: 4, name: 'Nombre', time: '50 min' }
  ]);

  return (
    <div className="flex h-screen">
  {/* Panel izquierdo */}
  <div className="w-1/4 border-r flex flex-col bg-white">
    <div className="bg-custom-150 p-8 flex items-center gap-3">
      <AvatarChat/>
      <div>
        <div className="text-custom-350">Nombre</div>
        <div className="text-sm text-custom-200">@Usuario</div>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto">
      {messages.map(msg => (
        <ChatMessage key={msg.id} {...msg} />
      ))}
    </div>
  </div>

  {/* Panel derecho */}
  <div className="flex-1 flex flex-col bg-white">
    {/* Header */}
    <div className="bg-white px-4 py-3 flex justify-between items-center border-b">
      <div className="flex items-center gap-4">
        <button className="lg:hidden">
          <HiChevronLeft className="w-6 h-6 text-custom-350" />
        </button>
        <span className="text-custom-350 text-lg">Mensajes</span>
      </div>
      <button>
        <HiDotsVertical className="w-6 h-6 text-pink-500" />
      </button>
    </div>

    {/* Perfil del usuario activo */}
    <div className="border-b p-6 flex flex-col items-center">
      <AvatarChat size="lg" />
      <h2 className="text-custom-350 mt-2">Nombre</h2>
      <span className="text-custom-200">@Usuario</span>
      <button className="mt-2 px-4 py-1 bg-custom-75 text-custom-200 rounded-full text-sm">
        Ver perfil
      </button>
    </div>

    {/* Área de mensajes */}
    <div className="flex-1 overflow-scroll-y px-4 py-2">
      <MessageBubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
    </div>

    {/* Input area */}
    <div className="p-4 border-t">
      <div className="bg-custom-75 rounded-lg flex items-center p-2">
        <button className="p-2">
          <HiEmojiHappy className="w-6 h-6 text-custom-200" />
        </button>
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-transparent outline-none px-3"
        />
        <button className="p-2">
          <HiPaperAirplane className="w-6 h-6 text-custom-200" />
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default ChatInterface;
