import { useState } from 'react';
import Modal from '../components/ModalForm';
import Form from '../components/Form';

const Feed = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <div className="App">

      <Modal show={isModalOpen} onClose={toggleModal}>
        <Form />
      </Modal>
    </div>
  );
};

export default Feed;
