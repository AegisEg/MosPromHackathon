import * as React from 'react';
import './style.scss';
import { useState } from 'react';

interface ToggleProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Toggle({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  error,
  className = '',
  name,
  size = 'medium',
}: ToggleProps) {
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

  const toggleClasses = [
    'custom-toggle',
    `custom-toggle--${size}`,
    error && 'custom-toggle--error',
    disabled && 'custom-toggle--disabled',
    checked && 'custom-toggle--checked',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={toggleClasses}>
      <label className="custom-toggle__container">
        <input
          type="checkbox"
          className="custom-toggle__input"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          name={name}
        />
        <span className="custom-toggle__switch">
          <span className="custom-toggle__slider" />
        </span>
        {label && <span className="custom-toggle__label">{label}</span>}
      </label>
      
      {error && (
        <div className="custom-toggle__error">
          {error}
        </div>
      )}
    </div>
  );
}

