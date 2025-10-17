import React from 'react';
import { Slider as MuiSlider, SliderProps as MuiSliderProps, styled } from '@mui/material';
import './style.scss';

interface SliderProps extends Omit<MuiSliderProps, 'color'> {
  label?: string;
  error?: string;
  formatValue?: (value: number) => string;
}

const StyledSlider = styled(MuiSlider, {
  shouldForwardProp: (prop) => prop !== 'error',
})<{ error?: boolean }>(({ error }) => ({
  color: error ? '#FF3B30' : '#48484A',
  height: 6,
  padding: '15px 0',
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: error ? '#FF3B30' : '#48484A',
  },
  '& .MuiSlider-rail': {
    backgroundColor: 'transparent',
    border: `1px solid ${error ? '#FF3B30' : '#C7C7CC'}`,
    opacity: 1,
    height: 6,
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: error ? '#FF3B30' : '#48484A',
    border: `2px solid ${error ? '#FF3B30' : '#48484A'}`,
    '&:hover': {
      boxShadow: 'none',
    },
    '&.Mui-focusVisible': {
      boxShadow: 'none',
    },
    '&.Mui-active': {
      boxShadow: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: error ? '#FF3B30' : '#48484A',
    padding: '4px 8px',
    borderRadius: 6,
    '&:before': {
      border: `4px solid transparent`,
      borderTopColor: error ? '#FF3B30' : '#48484A',
    },
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    color: error ? '#FF3B30' : '#48484A',
  },
}));

export default function Slider({
  label,
  error,
  formatValue,
  className = '',
  min = 0,
  max = 100,
  disabled = false,
  valueLabelDisplay = 'auto',
  ...muiSliderProps
}: SliderProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  const sliderClasses = [
    'custom-slider',
    isFocused && 'custom-slider--focused',
    disabled && 'custom-slider--disabled',
    error && 'custom-slider--error',
    className,
  ].filter(Boolean).join(' ');

  const valueLabelFormat = formatValue || muiSliderProps.valueLabelFormat;

  return (
    <div 
      className={sliderClasses}
      onMouseEnter={() => !disabled && setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      {label && (
        <label className="custom-slider__label">
          {label}
        </label>
      )}

      <div className="custom-slider__container">
        <StyledSlider
          {...muiSliderProps}
          min={min}
          max={max}
          disabled={disabled}
          error={!!error}
          valueLabelDisplay={valueLabelDisplay}
          valueLabelFormat={valueLabelFormat}
        />

        <div className="custom-slider__limits">
          <span className="custom-slider__min">
            {formatValue ? formatValue(min) : min}
          </span>
          <span className="custom-slider__max">
            {formatValue ? formatValue(max) : max}
          </span>
        </div>
      </div>

      {error && (
        <div className="custom-slider__error">
          {error}
        </div>
      )}
    </div>
  );
}
