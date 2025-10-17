import * as React from 'react';
import './style.scss';
import { IMaskInput } from 'react-imask';
import { useRef, useState } from 'react';

export default function Mask() {
  const [value, setValue] = useState('');
  const ref = useRef(null);
  const inputRef = useRef(null);

  return (
    <IMaskInput 
      mask="00.00.0000"
      radix="."
      unmask={true}
      placeholder="DD.MM.YYYY"
      value={value}
      onAccept={(value) => setValue(value)}
      ref={ref}
      inputRef={inputRef}
    />
  );
}