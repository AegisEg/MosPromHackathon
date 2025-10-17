import React, { useState } from 'react';
import './style.scss';
import user from '../../assets/user.png';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Modal from '../UI/Modal';
import FileUpload from '../UI/FileUpload';

interface PhotoProps {
  photo: string;
  onChange: (file: File) => void;
}

function Photo({ photo, onChange }: PhotoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileSelect = (file: File) => {
    onChange(file);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="photo">
        <div className="photo_container">
          <img className="photo_image" src={photo ?? user} alt="Photo" />
        </div>
        <button onClick={handleOpenModal} className="photo_change">
          <ModeEditIcon />
        </button>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title="Изменить фото профиля"
        className="photo-modal"
      >
        <FileUpload 
          accept="image/*"
          onFileSelect={handleFileSelect}
          maxSize={5}
          currentImage={photo}
        />
      </Modal>
    </>
  );
}

export default Photo;
