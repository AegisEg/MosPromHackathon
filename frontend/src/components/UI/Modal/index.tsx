import React, { useEffect } from 'react';
import './style.scss';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Modal({ isOpen, onClose, children, title, className = '' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Проверяем, есть ли скролл на странице
      const hasScroll = document.body.scrollHeight > window.innerHeight;
      
      if (hasScroll) {
        // Вычисляем ширину скроллбара
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        // Добавляем padding справа, чтобы избежать сдвига контента
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal ${className}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal_header">
          {title && <h2 className="modal_title">{title}</h2>}
          <button className="modal_close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="modal_content">
          {children}
        </div>
      </div>
    </div>
  );
}

