import React, { useState, useRef } from 'react';
import './style.scss';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button, { ButtonType } from '../Button';

interface FileUploadProps {
  accept?: string;
  onFileSelect: (file: File) => void;
  maxSize?: number; // в MB
  currentImage?: string;
}

export default function FileUpload({ 
  accept = 'image/*', 
  onFileSelect, 
  maxSize = 5,
  currentImage 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, загрузите изображение');
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`Размер файла не должен превышать ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (!validateFile(file)) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    onFileSelect(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="file-upload">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="file-upload_input"
      />

      {preview ? (
        <div className="file-upload_preview">
          <img src={preview} alt="Preview" className="file-upload_image" />
          <div className="file-upload_actions">
            <Button variant={ButtonType.GRAY} onClick={handleRemove}>
              Удалить
            </Button>
            <Button variant={ButtonType.RED} onClick={handleButtonClick}>
              Изменить фото
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`file-upload_dropzone ${isDragging ? 'dragging' : ''} ${error ? 'error' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <CloudUploadIcon className="file-upload_icon" />
          <p className="file-upload_text">
            Перетащите изображение сюда или нажмите для выбора
          </p>
          <p className="file-upload_hint">
            Поддерживаются: JPG, PNG, GIF (макс. {maxSize}MB)
          </p>
        </div>
      )}

      {error && <p className="file-upload_error">{error}</p>}
    </div>
  );
}

