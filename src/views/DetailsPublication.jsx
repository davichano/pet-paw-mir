import {useParams} from "react-router-dom";
//import PetInfo from "../components/DetailsPet/PetInfo";
import PetDescription from "../components/DetailsPet/PetDescription";
import {useGetPost} from "../hooks/useGetPosts";
import SavePost from "../components/PostPet/SavePost.jsx";
import SectionCommets from "../components/DetailsPet/SectionCommets.jsx";


const DetailsPublication = () => {
  const {id} = useParams();
  const {post, loading, error} = useGetPost(id);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex place-content-evenly items-center">
      <div className="w-full max-w-4xl h-full relative text-white">
        <PetDescription
          id={id}
          description={post.pet_description}
          name={post.name || "Desconocido"}
          imageUrl={post.picture}
        />
        <SavePost post={post} pos_x={300} pos_y={50}/>
        <SectionCommets postId={id} />
      </div>
    </div>
  );
}

export default DetailsPublication;
