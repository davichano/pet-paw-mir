import {formatData} from '../../helpers/formatPostData';
import {usePetData} from '../../hooks/usePetData';
import {createPost, updatePost} from '../../services/posts'; // Asegúrate de tener un servicio para actualizar
import {useParams, useNavigate} from 'react-router-dom';
import {toast} from "sonner";

const PublishButton = () => {
  const {petData, setPetData} = usePetData();
  const user = JSON.parse(localStorage.getItem('user'));
  const {id} = useParams();
  const navigate = useNavigate();

  const handlePublish = async () => {
    try {
      if (id) {
        const response = await updatePost(id, petData);
        console.log('Post actualizado:', response);
        toast.success('Publicación actualizada con éxito');
      } else {
        const response = await createPost(petData);
        console.log('Post creado:', response);
        toast.success('Publicación creada con éxito');
      }

      setPetData(formatData(user || '1'));

      navigate('/post');
      const response = await createPost(petData);
      //console.log('PetData:', petData);
      console.log('Post creado:', response);
      toast.success('Publicación creada con éxito');
      //Limpia el context Pet
      setPetData({});
      //Se inserta la plantilla del context
      setPetData(formatData(user));
    } catch (error) {
      console.error('Error al procesar la publicación:', error);
      toast.error('Error al procesar la publicación');
    }
  };

  return (
    <div className="mt-4">
      <button onClick={handlePublish} className="w-full py-2 bg-[#FF797D] text-white rounded-lg text-lg font-semibold">
        {id ? 'Actualizar' : 'Publicar'} {/* Cambia el texto según el modo */}
      </button>
    </div>
  );
};

export default PublishButton;
