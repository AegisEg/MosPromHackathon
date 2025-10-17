import * as React from 'react';
import './style.scss';
import { useState } from 'react';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  name?: string;
}

export default function Checkbox({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  error,
  className = '',
  name,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);
  
  const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;
  
  const handleChange = () => {
    if (disabled) return;
    
    const newChecked = !checked;
    if (controlledChecked === undefined) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  const checkboxClasses = [
    'custom-checkbox',
    error && 'custom-checkbox--error',
    disabled && 'custom-checkbox--disabled',
    checked && 'custom-checkbox--checked',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={checkboxClasses}>
      <label className="custom-checkbox__container">
        <input
          type="checkbox"
          className="custom-checkbox__input"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          name={name}
        />
        <span className="custom-checkbox__checkmark">
          {checked && (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M1 5L4.5 8.5L11 1" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        {label && <span className="custom-checkbox__label">{label}</span>}
      </label>
      
      {error && (
        <div className="custom-checkbox__error">
          {error}
        </div>
      )}
    </div>
  );
}

