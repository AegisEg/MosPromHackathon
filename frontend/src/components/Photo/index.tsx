import React from 'react';
import './style.scss';
import user from '../../assets/user.png';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

interface PhotoProps {
  photo: string;
  onChange: (file: File) => void;
}

function Photo({ photo, onChange }: PhotoProps) {
  return (
    <div className="photo">
      <div className="photo_container">
        <img className="photo_image" src={photo ?? user} alt="Photo" />
      </div>
      <button onClick={() => onChange(new File([], 'photo.png'))} className="photo_change"><ModeEditIcon /></button>
    </div>
  );
}

export default Photo;
