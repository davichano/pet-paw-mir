import {useEffect, useState} from 'react';
import {fetchPosts} from '../services/posts';
import CardPostPet from '../components/DetailsPet/CardPostPet';
import {Link, useParams} from 'react-router-dom';
import ModalFormulario from '../components/PublicForm';
import {useTranslation} from 'react-i18next';
import pawPlusSVG from "../assets/img/Icons/SVG/3pawplus.svg";
import SavePost from "../components/PostPet/SavePost.jsx";

const Feed = () => {
  const {filter} = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const {t} = useTranslation();
  const showFilters = filter === "true"
  const [searchParams, setSearchParams] = useState({
    name: '',
    pet_type: '',
    pet_gender: ''
  });

  const [selectedPost, setSelectedPost] = useState(null);

  const toggleModal = () => setModalOpen(!isModalOpen);

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

  return (
    <>
      <div className="flex justify-center items-center h-20 space-x-2 px-5 border-b-2 border-custom-200">
        <div className="w-1/2">
          <button
            className="bg-transparent text-custom-250 px-4 py-2 w-full h-full text-2xl border-b-2 border-custom-200"
          >
            {'Para ti'}
          </button>
        </div>
        <div className="w-1/2">
          <button
            className="bg-transparent text-custom-250 px-4 py-2 w-full h-full text-2xl"
          >
            {'Siguiendo'}
          </button>
        </div>
      </div>

      <div className="mx-10">
        {showFilters && (
          <div className="mb-4 mt-8">
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
        {posts.length > 0 && posts.map((post) => (
          <div key={post.id} className="relative">
            <Link to={`/pet/${post.id}`}>
              <CardPostPet
                name={post.pet.name}
                description={post.pet.description}
                imageUrl={post.pet.imageUrl}
                handleModalToggle={toggleModal}
                t={t}
              />
            </Link>
            <SavePost post={post} pos_x={90} pos_y={50}/>
          </div>
        ))}
      </div>
      <Link to={`/post`}>
        <button
          className="fixed w-[74px] h-[74px] bottom-[100px] right-4 bg-custom-250 text-white p-3 rounded-full shadow-lg hover:bg-custom-300 focus:outline-none">
          <img src={pawPlusSVG} className="w-full mx-auto" alt="Foto"/>
        </button>
      </Link>
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
