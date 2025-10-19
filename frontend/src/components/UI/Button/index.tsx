import * as React from 'react';
import './style.scss';
import LoaderSmall from '../../default/LoaderSmall';

export enum ButtonType {
  RED = 'red',
  BLACK = 'black',
  GRAY = 'gray',
  OUTLINE = 'outline',
  SECONDARY = 'secondary',
  DANGER = 'danger',
}

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  variant?: ButtonType;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({ 
  onClick, 
  disabled, 
  children, 
  variant = ButtonType.RED,
  type = 'button',
  className = '',
  loading = false
}: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled || loading}
      type={type}
      className={`button ${variant} ${className}`}
    >
      {loading ? <LoaderSmall /> : children}
    </button>
  );
}