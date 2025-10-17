import * as React from 'react';
import './style.scss';
import { useState } from 'react';
import { IMaskInput } from 'react-imask';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  mask?: string;
  className?: string;
  maxLength?: number;
  autoFocus?: boolean;
  name?: string;
}

export default function Input({
  label,
  placeholder,
  type = 'text',
  value: controlledValue,
  defaultValue = '',
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  error,
  required = false,
  mask,
  className = '',
  maxLength,
  autoFocus = false,
  name,
}: InputProps) {
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  const handleChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const hasValue = value && value.length > 0;

  const inputClasses = [
    'custom-input',
    isFocused && 'custom-input--focused',
    hasValue && 'custom-input--has-value',
    error && 'custom-input--error',
    disabled && 'custom-input--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={inputClasses}>
      {label && (
        <label className="custom-input__label">
          {label}
          {required && <span className="custom-input__required">*</span>}
        </label>
      )}
      
      <div className="custom-input__wrapper">
        {mask ? (
          <IMaskInput
            className="custom-input__field"
            mask={mask}
            value={value}
            onAccept={(val) => handleChange(val)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={placeholder}
            autoFocus={autoFocus}
            name={name}
          />
        ) : (
          <input
            className="custom-input__field"
            type={type}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={placeholder}
            maxLength={maxLength}
            autoFocus={autoFocus}
            name={name}
          />
        )}
      </div>
      
      {error && (
        <div className="custom-input__error">
          {error}
        </div>
      )}
    </div>
  );
}