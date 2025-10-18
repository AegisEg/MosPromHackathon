import * as React from 'react';
import './style.scss';
import { useState } from 'react';

interface PasswordProps {
  label?: string;
  labelColor?: 'black' | 'white';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  maxLength?: number;
  autoFocus?: boolean;
  name?: string;
}

export default function Password({
  label,
  labelColor = 'black',
  placeholder,
  value: controlledValue,
  defaultValue = '',
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  error,
  className = '',
  maxLength,
  autoFocus = false,
  name,
}: PasswordProps) {
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
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
    'custom-password',
    isFocused && 'custom-password--focused',
    hasValue && 'custom-password--has-value',
    error && 'custom-password--error',
    disabled && 'custom-password--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={inputClasses}>
      {label && (
        <label className={`custom-password__label custom-password__label--${labelColor}`}>
          {label}
        </label>
      )}
      
      <div className="custom-password__wrapper">
        <input
          className="custom-password__field"
          type="password"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          autoFocus={autoFocus}
          name={name}
        />
      </div>
      
      {error && (
        <div className="custom-password__error">
          {error}
        </div>
      )}
    </div>
  );
}

