import AvatarChat from "../../components/Chat/AvatarChat";
import MessageBubble from "../../components/Chat/MessageBubble";
import ChatMessage from "../../components/Chat/ChatMessage";
import { HiChevronLeft, HiDotsVertical, HiPaperAirplane, HiEmojiHappy } from 'react-icons/hi';
import { useEffect, useState, useRef } from "react";

import socket from "../../services/socket";

const ChatInterface = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const conversationRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    socket.emit("register", user?.id);
    socket.on("activeSessions", (users) => {
      setActiveUsers(users);
    });

    socket.on("sendMessage", (message) => {
      if (message.chat_id === selectedChat?._id) {
        setMessages((prev) => [...prev, message]);
        scrollToBottom();
      }
    });

    return () => {
      socket.off("activeSessions");
      socket.off("sendMessage");
    };
  }, [selectedChat]);

  useEffect(() => {
    fetch(`http://localhost:3000/chat/user/${user?.id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((err) => console.error("Error al cargar los chats:", err));
  }, [user?.id, token]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    fetch(`http://localhost:3000/menssage/${chat.id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        scrollToBottom();
      })
      .catch((err) => console.error("Error al cargar mensajes:", err));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() && selectedChat) {
      const messageData = {
        chat_id: selectedChat.id,
        sender_id: user.id,
        receiver_id: selectedChat.members.find((id) => id !== user.id).id,
        content: newMessage,
      };
      try {
        const response = await fetch("http://localhost:3000/menssage/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
           },
          body: JSON.stringify(messageData),
        });

        const savedMessage = await response.json();

        socket.emit("sendMessagesPrivate", {
          message: savedMessage,
          recipientUserId: messageData.receiver_id,
        });

        setMessages((prev) => [...prev, savedMessage]);
        setNewMessage("");
        scrollToBottom();
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
      }
    }
  };

  const scrollToBottom = () => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Panel izquierdo */}
      <div className="w-1/4 border-r flex flex-col bg-white">
        <div className="bg-custom-150 p-8 flex items-center gap-3">
          <AvatarChat image={user.avatar} />
          <div>
            <div className="text-custom-350">{user?.fullName}</div>
            <div className="text-sm text-custom-200">@{user?.email}</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => {
            const friend = chat.members.find((member) => member.id !== user.id) || null;

            console.log(chat.members);
            console.log(friend);
            return (
              <div key={chat.id} onClick={() => handleSelectChat(chat)}>
                <ChatMessage
                  userId={friend.id}
                  lastMessage={chat.lastMessage}
                />
              </div>
            );
          })}
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

        {selectedChat && (
          <div className="border-b p-6 flex flex-col items-center">
            <AvatarChat size="lg" image={selectedChat.members.find((id) => id !== user.id).avatar} />
            <h2 className="text-custom-350 mt-2">
              {selectedChat.members.find((id) => id !== user.id).name || "Nombre"}
            </h2>
            <span className="text-custom-200">@{selectedChat.members.find((id) => id !== user.id).email || "Usuario"}</span>
            {/* Mostrar estado en línea/desconectado */}
            <span className="text-sm mt-1">
              {activeUsers.includes(selectedChat.members.find((id) => id !== user.id).id)
                ? "En línea"
                : "Desconectado"}
            </span>
            <button className="mt-2 px-4 py-1 bg-custom-75 text-custom-200 rounded-full text-sm">
              Ver perfil
            </button>
          </div>
        )}

        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto px-4 py-2" ref={conversationRef}>
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              text={msg.content}
              isSender={msg.senderId === user.id}
              timestamp={msg.sentAt}
            />
          ))}
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
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={(e) => handleSendMessage(e)} type="button" className="p-2">
              <HiPaperAirplane className="w-6 h-6 text-custom-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
