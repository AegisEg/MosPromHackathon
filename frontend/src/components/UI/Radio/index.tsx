import * as React from 'react';
import './style.scss';
import { useState } from 'react';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  name?: string;
  direction?: 'vertical' | 'horizontal';
}

export default function Radio({
  label,
  options,
  value: controlledValue,
  defaultValue = '',
  onChange,
  disabled = false,
  error,
  className = '',
  name,
  direction = 'vertical',
}: RadioProps) {
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  const handleChange = (newValue: string) => {
    if (disabled) return;
    
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const radioClasses = [
    'custom-radio',
    error && 'custom-radio--error',
    disabled && 'custom-radio--disabled',
    direction === 'horizontal' && 'custom-radio--horizontal',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={radioClasses}>
      {label && (
        <div className="custom-radio__label">
          {label}
        </div>
      )}
      
      <div className="custom-radio__options">
        {options.map((option) => {
          const isChecked = value === option.value;
          const isDisabled = disabled || option.disabled;
          
          return (
            <label
              key={option.value}
              className={`custom-radio__option ${isDisabled ? 'custom-radio__option--disabled' : ''} ${isChecked ? 'custom-radio__option--checked' : ''}`}
            >
              <input
                type="radio"
                className="custom-radio__input"
                value={option.value}
                checked={isChecked}
                onChange={() => handleChange(option.value)}
                disabled={isDisabled}
                name={name}
              />
              <span className="custom-radio__circle">
                {isChecked && <span className="custom-radio__dot" />}
              </span>
              <span className="custom-radio__option-label">{option.label}</span>
            </label>
          );
        })}
      </div>
      
      {error && (
        <div className="custom-radio__error">
          {error}
        </div>
      )}
    </div>
  );
}

