import React from 'react';
import './style.scss';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
  error,
}) => {
  return (
    <div className={`custom-checkbox ${className}`}>
      <label className="custom-checkbox__label">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="custom-checkbox__input"
        />
        <span className="custom-checkbox__checkmark"></span>
        {label && <span className="custom-checkbox__text">{label}</span>}
      </label>
      {error && <span className="custom-checkbox__error">{error}</span>}
    </div>
  );
};

export default Checkbox;