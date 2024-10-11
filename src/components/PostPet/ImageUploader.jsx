import { useState } from 'react';
import { usePetData } from '../../contexts/post/PetProvider';

const ImageUploader = () => {
  const { petData, setPetData } = usePetData();
  const [imagePreview, setImagePreview] = useState(null);

  // Función para convertir la imagen a base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);

      // Convertir la imagen a base64
      const base64Image = await convertToBase64(file);

      // Actualizamos las imágenes en el contexto, guardando la imagen en base64
      setPetData({
        ...petData,
        pictures: [...petData.pictures, { id: petData.pictures.length + 1, url: base64Image }]
      });
    }
  };

  return (
    <div className="w-full h-full bg-[#ffb0a9] flex items-center justify-center rounded-lg mb-6">
      {imagePreview ? (
        <img src={imagePreview} alt="Uploaded Preview" className="p-8" />
      ) : (
        <label className="cursor-pointer">
          <img src="/src/assets/img/Icons/Camera.svg" alt="camera" className="p-8" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
