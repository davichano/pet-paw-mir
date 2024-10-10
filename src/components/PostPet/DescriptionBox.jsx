const DescriptionBox = () => {
  return (
    <div className="mb-4">

    <h3 className="mb-3 text-[#FF4146] font-medium">Descripción</h3>
    <textarea
      className="w-full p-2 border-2 border-[#FFB0A9] rounded-lg"
      maxLength="320"
      rows="4"
    ></textarea>
    <p className="text-right  text-sm text-[#FFB0A9]">00/320</p>
  </div>
  );
};

export default DescriptionBox;
