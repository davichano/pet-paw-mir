import {useEffect, useState} from 'react';
import {fetchPosts} from '../services/posts';
import CardPostPet from '../components/DetailsPet/CardPostPet';
import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
import ModalFormulario from '../components/PublicForm';
import { useTranslation } from 'react-i18next';

const Feed = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useState({
    name: '',
    pet_type: '',
    pet_gender: ''
  });

  const [selectedPost, setSelectedPost] = useState(null); // Para manejar el post seleccionado

  const toggleModal = () => setModalOpen(!isModalOpen);
  // const navigate = useNavigate();

  // const handleRedirect = () => {
  //   navigate("/post");
  // }

  const loadPosts = async (params = {}) => {
    const postsData = await fetchPosts(params);
    setPosts(postsData);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSearch = (e) => {
    const {name, value} = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    loadPosts(searchParams);
  }, [searchParams]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleEditClick = (post) => {
    setSelectedPost(post); // Selecciona el post para editar
    setModalOpen(true); // Abre el modal
  };

  return (
    <>
      <div className="flex justify-center items-center h-20 space-x-2 px-5">
        <div className="w-1/2">
          <button
            onClick={toggleFilters}
            className="bg-custom-250 text-white px-4 py-2 rounded-xl w-full h-full"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        <div className="w-1/2">
          <button
            className="bg-custom-250 text-white px-4 py-2 rounded-xl w-full h-full"
            onClick={() => {
              setSelectedPost(null);
              setModalOpen(true);
            }}
          >
            Crear Post
          </button>
        </div>
      </div>
      <div className="mx-10">
        {showFilters && (
          <div className="mb-4">
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Search by name"
              name="name"
              value={searchParams.name}
              onChange={handleSearch}
            />
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Search by pet type"
              name="pet_type"
              value={searchParams.pet_type}
              onChange={handleSearch}
            />
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Search by gender"
              name="pet_gender"
              value={searchParams.pet_gender}
              onChange={handleSearch}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {posts.map((post) => (
          <div key={post.id} className="relative">
            <Link to={`/pet/${post.id}`}>
              <CardPostPet
                name={post.name}
                description={post.pet_description}
                imageUrl={post.pictures?.[0]?.url}
                handleModalToggle={toggleModal}
                t={t}/>
            </Link>

            <button
              className="absolute top-2 right-2 bg-custom-250 text-white px-4 py-1 rounded"
              onClick={() => handleEditClick(post)}
            >
              Editar
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ModalFormulario
          post={selectedPost}
          onClose={() => {
            setModalOpen(false);
            setSelectedPost(null);
            loadPosts();
          }}
        />
      )}
    </>
  );
};


export default Feed;

