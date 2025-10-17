import * as React from 'react';
import './style.scss';
import { useState } from 'react';

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  className?: string;
  autoFocus?: boolean;
  name?: string;
  rows?: number;
  maxLength?: number;
}

export default function Textarea({
  label,
  placeholder,
  value: controlledValue,
  defaultValue = '',
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  error,
  required = false,
  className = '',
  autoFocus = false,
  name,
  rows = 4,
  maxLength,
}: TextareaProps) {
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

  const textareaClasses = [
    'custom-textarea',
    isFocused && 'custom-textarea--focused',
    hasValue && 'custom-textarea--has-value',
    error && 'custom-textarea--error',
    disabled && 'custom-textarea--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={textareaClasses}>
      {label && (
        <label className="custom-textarea__label">
          {label}
          {required && <span className="custom-textarea__required">*</span>}
        </label>
      )}
      
      <div className="custom-textarea__wrapper">
        <textarea
          className="custom-textarea__field"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          autoFocus={autoFocus}
          name={name}
          rows={rows}
          maxLength={maxLength}
        />
        {maxLength && (
          <div className="custom-textarea__counter">
            {value.length} / {maxLength}
          </div>
        )}
      </div>
      
      {error && (
        <div className="custom-textarea__error">
          {error}
        </div>
      )}
    </div>
  );
}

