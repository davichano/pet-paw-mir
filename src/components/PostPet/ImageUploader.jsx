import { useState, useEffect } from 'react';
import { usePetData } from '../../hooks/usePetData';

const ImageUploader = () => {
  const { petData, setPetData } = usePetData();
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const uploadPresent = "uploadpet";
  const cloudName = "dwkizli4g";

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPresent);

    try {
      setUploading(true);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setUploading(false);
      return data.secure_url;
    } catch (error) {
      setUploading(false);
      console.error('Error al subir la imagen a Cloudinary:', error);
      return null;
    }
  };

  // Sincroniza imagePreview con petData.petData.imageUrl
  useEffect(() => {
    if (petData?.petData?.imageUrl) {
      setImagePreview(petData.petData.imageUrl);
    }
  }, [petData?.petData?.imageUrl]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const localImageUrl = URL.createObjectURL(file);
      setImagePreview(localImageUrl);

      const cloudinaryImageUrl = await uploadImageToCloudinary(file);

      if (cloudinaryImageUrl) {
        const updatedPetData = {
          ...petData,
          pictures: [...petData.pictures, { id: petData.pictures.length + 1, url: cloudinaryImageUrl }]
        };
        setPetData(updatedPetData);
        localStorage.setItem('petData', JSON.stringify(updatedPetData));
      }
    }
  };

  return (
    <div className="w-full h-full bg-[#ffb0a9] flex items-center justify-center rounded-lg mb-6">
      {uploading ? (
        <p>Subiendo imagen...</p>
      ) : imagePreview ? (
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
