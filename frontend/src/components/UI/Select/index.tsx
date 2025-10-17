import * as React from 'react';
import './style.scss';
import { useState } from 'react';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  defaultValue?: { value: string; label: string }[];
  value?: { value: string; label: string } | { value: string; label: string }[];
  onChange?: (value: any) => void;
  isMulti?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  error?: string;
  required?: boolean;
  className?: string;
  closeMenuOnSelect?: boolean;
}

export default function Select({
  label,
  placeholder = 'Выберите значение',
  options,
  defaultValue,
  value: controlledValue,
  onChange,
  isMulti = false,
  isDisabled = false,
  isSearchable = true,
  isClearable = false,
  isLoading = false,
  error,
  required = false,
  className = '',
  closeMenuOnSelect = true,
}: SelectProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const animatedComponents = makeAnimated();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const hasValue = controlledValue !== undefined 
    ? (isMulti ? (Array.isArray(controlledValue) && controlledValue.length > 0) : controlledValue !== null)
    : (defaultValue !== undefined && defaultValue.length > 0);

  const selectClasses = [
    'custom-select',
    isFocused && 'custom-select--focused',
    hasValue && 'custom-select--has-value',
    error && 'custom-select--error',
    isDisabled && 'custom-select--disabled',
    className,
  ].filter(Boolean).join(' ');

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: '100%',
      padding: '4px 8px',
      fontSize: '16px',
      lineHeight: '24px',
      color: state.hasValue || state.isFocused ? '#48484A' : '#C7C7CC',
      background: 'transparent',
      border: error ? '2px solid #FF3B30' : (state.hasValue || state.isFocused ? '2px solid #48484A' : '2px solid #C7C7CC'),
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
      boxShadow: 'none',
      minHeight: '48px',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      '&:hover': {
        borderColor: error ? '#FF3B30' : '#48484A',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      background: 'transparent',
      border: '2px solid #48484A',
      borderRadius: '12px',
      overflow: 'hidden',
      marginTop: '4px',
      backdropFilter: 'blur(10px)',
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: 0,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#48484A' : state.isFocused ? 'rgba(72, 72, 74, 0.1)' : 'transparent',
      color: state.isSelected ? '#FFFFFF' : '#48484A',
      padding: '12px 16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      borderBottom: '1px solid rgba(72, 72, 74, 0.2)',
      '&:last-child': {
        borderBottom: 'none',
      },
      '&:active': {
        backgroundColor: '#48484A',
        color: '#FFFFFF',
      },
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: state.selectProps.menuIsOpen ? '#48484A' : '#48484A',
      transition: 'all 0.2s ease',
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#48484A',
      borderRadius: '6px',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: '#FFFFFF',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: '#FF3B30',
        color: '#FFFFFF',
      },
    }),
    placeholder: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? '#48484A' : '#C7C7CC',
    }),
    input: (provided: any, state: any) => ({
      ...provided,
      color: state.selectProps.menuIsOpen ? '#48484A' : '#C7C7CC',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused || state.selectProps.menuIsOpen ? '#48484A' : '#C7C7CC',
      transition: 'color 0.3s ease',
      '&:hover': {
        color: '#48484A',
      },
    }),
    clearIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? '#48484A' : '#C7C7CC',
      '&:hover': {
        color: '#FF3B30',
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '2px 8px',
    }),
    loadingIndicator: (provided: any) => ({
      ...provided,
      color: '#48484A',
    }),
    noOptionsMessage: (provided: any) => ({
      ...provided,
      color: '#48484A',
    }),
    loadingMessage: (provided: any) => ({
      ...provided,
      color: '#48484A',
    }),
  };

  const customTheme = (theme: any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: '#48484A',
      primary75: '#48484A',
      primary50: '#48484A',
      primary25: '#48484A',
      danger: '#FF3B30',
      dangerLight: '#FF3B30',
      neutral0: 'transparent',
      neutral5: 'transparent',
      neutral10: 'transparent',
      neutral20: '#C7C7CC',
      neutral30: '#C7C7CC',
      neutral40: '#C7C7CC',
      neutral50: '#C7C7CC',
      neutral60: '#C7C7CC',
      neutral70: '#C7C7CC',
      neutral80: '#48484A',
      neutral90: '#48484A',
    },
  });

  return (
    <div className={selectClasses}>
      {label && (
        <label className="custom-select__label">
          {label}
          {required && <span className="custom-select__required">*</span>}
        </label>
      )}
      
      <div className="custom-select__wrapper">
        <ReactSelect
          classNamePrefix="react-select"
          closeMenuOnSelect={closeMenuOnSelect}
          components={animatedComponents}
          defaultValue={defaultValue}
          value={controlledValue}
          onChange={onChange}
          isDisabled={isDisabled}
          isMulti={isMulti}
          options={options}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isLoading={isLoading}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          styles={customStyles}
          theme={customTheme}
        />
      </div>
      
      {error && (
        <div className="custom-select__error">
          {error}
        </div>
      )}
    </div>
  );
}