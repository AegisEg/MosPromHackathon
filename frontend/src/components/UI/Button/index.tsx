import * as React from 'react';
import './style.scss';

export enum ButtonType {
  RED = 'red',
  BLACK = 'black',
  GRAY = 'gray',
}

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  variant?: ButtonType;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({ 
  onClick, 
  disabled, 
  children, 
  variant = ButtonType.RED,
  type = 'button',
  className = ''
}: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      type={type}
      className={`button ${variant} ${className}`}
    >
      {children}
    </button>
  );
}