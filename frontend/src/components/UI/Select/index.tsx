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
      color: '#393649',
      background: '#FFFFFF',
      border: error ? '2px solid #FF3B30' : '2px solid #C7C7CC',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
      boxShadow: 'none',
      minHeight: '48px',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      '&:hover': {
        border: error ? '2px solid #FF3B30' : '2px solid #C7C7CC',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      background: '#FFFFFF',
      border: '2px solid #C7C7CC',
      borderRadius: '12px',
      overflow: 'hidden',
      marginTop: '4px',
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: '20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#48484A' : state.isFocused ? 'rgba(72, 72, 74, 0.1)' : 'transparent',
      color: state.isSelected ? '#FFFFFF' : '#48484A',
      padding: '12px 16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: '1px solid #C7C7CC',
      borderRadius: '8px',
      textAlign: 'center',
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
      backgroundColor: '#C7C7CC',
      borderRadius: '6px',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: '#393649',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: '#393649',
      '&:hover': {
        backgroundColor: 'transparent',
        color: '#393649',
      },
    }),
    placeholder: (provided: any, state: any) => ({
      ...provided,
      color: '#929292',
    }),
    input: (provided: any, state: any) => ({
      ...provided,
      color: '#393649',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: '#393649',
      transition: 'color 0.3s ease',
      '&:hover': {
        color: '#48484A',
      },
    }),
    clearIndicator: (provided: any, state: any) => ({
      ...provided,
      color: '#393649',
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
      textAlign: 'center',
      padding: '20px',
      fontSize: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      gridColumn: '1 / -1',
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
          noOptionsMessage={() => 'Ничего нет'}
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