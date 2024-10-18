import { useEffect, useState } from 'react';
import PublicForm from '../components/PublicForm';
import { fetchPosts } from '../services/posts';
import CardPostPet from '../components/DetailsPet/CardPostPet';
import { Link } from 'react-router-dom';

const Feed = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useState({
    name: '',
    pet_type: '',
    pet_gender: ''
  });

  const toggleModal = () => setModalOpen(!isModalOpen);

  const loadPosts = async (params = {}) => {
    const postsData = await fetchPosts(params);
    setPosts(postsData);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSearch = (e) => {
    const { name, value } = e.target;
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
          <PublicForm show={isModalOpen} onClose={toggleModal}/>
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
          <Link to={`/pet/${post.id}`} key={post.id}>
            <CardPostPet
              name={post.name}
              description={post.pet_description}
              imageUrl={post.pictures?.[0]?.url}
              t={(key) => key}
              handleModalToggle={toggleModal}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Feed;
