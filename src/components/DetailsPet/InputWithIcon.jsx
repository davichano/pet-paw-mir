
const InputConIconos = () => {
  return (
    <div className="flex items-center p-3 bg-red-100 rounded-9 w-full">
      <input
        type="text"
        placeholder="Escribe un comentario..."
        className="bg-transparent flex-1 outline-none border-none	 text-red-500 placeholder-red-300"
      />

      {/* Emoji */}
      <button className="flex items-center justify-center text-red-500 mr-2">
        <img src="/src/assets/img/Icons/icon_happy.svg" className="w-8 h-8"/>
      </button>

      {/* Botón con flecha */}
      <button className="flex items-center justify-center text-red-500">
      <img src="/src/assets/img/Icons/submit_message.svg" className="w-8 h-8"/>
      </button>
    </div>
  );
};

export default InputConIconos;
