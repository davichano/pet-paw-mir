import { usePetData } from '../../hooks/usePetData';
import { createPost } from '../../services/posts';
import { toast } from "sonner";

const PublishButton = () => {
  const { petData, setPetData } = usePetData(); // Obtener los datos desde el contexto
  const user = JSON.parse(localStorage.getItem('user'));
  const handlePublish = async () => {
    try {
      const response = await createPost(petData); // Enviar los datos al servidor
      console.log('PetData:', petData);
      console.log('Post creado:', response);
      localStorage.removeItem('petData');
      toast.success('Publicación creada con éxito');
      setPetData({
        title: 'Prueba de mi primer post',
        description: '',
        tags: 'Mi primer tags',
        location: 'Mi casa',
        state: 'LOST',
        userId: user.id,
        petData: {
          name: ' ',
          petType: '',
          gender: '',
          age: '',
          size: '',
          state: '',
          imageUrl: '',
          validated: true
        },
        sightingData: {
          latitude: 0,
          longitude: 0
        }
      });
    } catch (error) {
      console.error('Error al crear el post:', error);
      toast.error('Error al crear la publicación');
    }
  };


  return (
    <div className="mt-4">
    <button onClick={handlePublish} className="w-full py-2 bg-[#FF797D] text-white rounded-lg text-lg font-semibold">
      Publicar
    </button>
  </div>
  );
};

export default PublishButton;
