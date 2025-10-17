import React, { useState } from 'react';
import './style.scss';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Textarea from '../../components/UI/Textarea';
import Checkbox from '../../components/UI/Checkbox';
import Radio from '../../components/UI/Radio';
import Toggle from '../../components/UI/Toggle';
import Button from '../../components/UI/Button';
import DateInput from '../../components/UI/DateInput';
import Slider from '../../components/UI/Slider';
import type { DefaultValue } from '../../types/default.types';

function UI() {
  // Input states
  const [input1, setInput1] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [input2, setInput2] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [input3, setInput3] = useState<DefaultValue<string>>({ value: '', success: false, error: 'Это поле обязательно для заполнения', isDisabled: false });
  const [input4, setInput4] = useState<DefaultValue<string>>({ value: 'Нельзя редактировать', success: true, error: '', isDisabled: true });
  const [inputPhone, setInputPhone] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [inputEmail, setInputEmail] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });

  // Select states
  const [select1, setSelect1] = useState<DefaultValue<any>>({ value: null, success: false, error: '', isDisabled: false });
  const [select2, setSelect2] = useState<DefaultValue<any>>({ value: null, success: false, error: '', isDisabled: false });
  const [select3, setSelect3] = useState<DefaultValue<any>>({ value: null, success: false, error: 'Выберите значение из списка', isDisabled: false });
  const [select4, setSelect4] = useState<DefaultValue<any>>({ value: null, success: false, error: '', isDisabled: true });
  const [selectMulti, setSelectMulti] = useState<DefaultValue<any>>({ value: null, success: false, error: '', isDisabled: false });
  const [selectSearch, setSelectSearch] = useState<DefaultValue<any>>({ value: null, success: false, error: '', isDisabled: false });

  // Textarea states
  const [textarea1, setTextarea1] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [textarea2, setTextarea2] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [textarea3, setTextarea3] = useState<DefaultValue<string>>({ value: '', success: false, error: 'Текст слишком короткий', isDisabled: false });
  const [textarea4, setTextarea4] = useState<DefaultValue<string>>({ value: 'Нельзя редактировать', success: true, error: '', isDisabled: true });

  // Checkbox states
  const [checkbox1, setCheckbox1] = useState<DefaultValue<boolean>>({ value: false, success: false, error: '', isDisabled: false });
  const [checkbox2, setCheckbox2] = useState<DefaultValue<boolean>>({ value: true, success: true, error: '', isDisabled: false });
  const [checkbox3, setCheckbox3] = useState<DefaultValue<boolean>>({ value: false, success: false, error: 'Необходимо согласиться с условиями', isDisabled: false });
  const [checkbox4, setCheckbox4] = useState<DefaultValue<boolean>>({ value: false, success: false, error: '', isDisabled: true });
  const [checkbox5, setCheckbox5] = useState<DefaultValue<boolean>>({ value: true, success: true, error: '', isDisabled: true });

  // Radio states
  const [radio1, setRadio1] = useState<DefaultValue<string>>({ value: 'option1', success: true, error: '', isDisabled: false });
  const [radio2, setRadio2] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
  const [radio3, setRadio3] = useState<DefaultValue<string>>({ value: '', success: false, error: 'Выберите один из вариантов', isDisabled: false });
  const [radio4, setRadio4] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: true });

  // Toggle states
  const [toggle1, setToggle1] = useState<DefaultValue<boolean>>({ value: false, success: false, error: '', isDisabled: false });
  const [toggle2, setToggle2] = useState<DefaultValue<boolean>>({ value: false, success: false, error: '', isDisabled: false });
  const [toggle3, setToggle3] = useState<DefaultValue<boolean>>({ value: true, success: true, error: '', isDisabled: false });
  const [toggle4, setToggle4] = useState<DefaultValue<boolean>>({ value: false, success: false, error: '', isDisabled: false });
  const [toggle5, setToggle5] = useState<DefaultValue<boolean>>({ value: false, success: false, error: 'Необходимо включить эту опцию', isDisabled: false });
  const [toggle6, setToggle6] = useState<DefaultValue<boolean>>({ value: false, success: false, error: '', isDisabled: true });
  const [toggle7, setToggle7] = useState<DefaultValue<boolean>>({ value: true, success: true, error: '', isDisabled: true });

  // DateInput state
  const [date1, setDate1] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });

  // Slider states
  const [slider1, setSlider1] = useState<DefaultValue<number>>({ value: 50, success: false, error: '', isDisabled: false });
  const [slider2, setSlider2] = useState<DefaultValue<[number, number]>>({ value: [20, 80], success: false, error: '', isDisabled: false });
  const [slider3, setSlider3] = useState<DefaultValue<number>>({ value: 30, success: false, error: 'Выберите значение больше 50', isDisabled: false });
  const [slider4, setSlider4] = useState<DefaultValue<number>>({ value: 75, success: false, error: '', isDisabled: true });
  const [slider5, setSlider5] = useState<DefaultValue<number>>({ value: 100000, success: false, error: '', isDisabled: false });

  const selectOptions = [
    { value: 'option1', label: 'Опция 1' },
    { value: 'option2', label: 'Опция 2' },
    { value: 'option3', label: 'Опция 3' },
    { value: 'option4', label: 'Опция 4' },
  ];

  const radioOptions = [
    { value: 'option1', label: 'Первая опция' },
    { value: 'option2', label: 'Вторая опция' },
    { value: 'option3', label: 'Третья опция' },
  ];

  return (
    <div className="main-page">
      <div className="main-page__container">
        <h1 className="main-page__title">UI Компоненты</h1>
        <p className="main-page__description">
          Набор переиспользуемых UI компонентов с единой стилистикой
        </p>

        {/* Input */}
        <section className="main-page__section">
          <h2 className="main-page__section-title">Input</h2>
          <div className="main-page__grid">
            <Input
              label="Обычный инпут"
              placeholder="Введите текст"
              value={input1.value}
              onChange={(value) => setInput1({ ...input1, value, success: true, error: '' })}
              error={input1.error}
              disabled={input1.isDisabled}
            />
            <Input
              label="Обязательное поле"
              placeholder="Введите текст"
              value={input2.value}
              onChange={(value) => setInput2({ ...input2, value, success: true, error: '' })}
              error={input2.error}
              disabled={input2.isDisabled}
              required
            />
            <Input
              label="С ошибкой"
              placeholder="Введите текст"
              value={input3.value}
              onChange={(value) => setInput3({ ...input3, value, success: !!value, error: value ? '' : 'Это поле обязательно для заполнения' })}
              error={input3.error}
              disabled={input3.isDisabled}
            />
            <Input
              label="Отключенный"
              placeholder="Введите текст"
              value={input4.value}
              onChange={(value) => setInput4({ ...input4, value, success: true, error: '' })}
              disabled={input4.isDisabled}
            />
            <Input
              label="Телефон"
              placeholder="+7 (999) 999-99-99"
              mask="+7 (000) 000-00-00"
              value={inputPhone.value}
              onChange={(value) => setInputPhone({ ...inputPhone, value, success: true, error: '' })}
              error={inputPhone.error}
              disabled={inputPhone.isDisabled}
            />
            <Input
              label="Email"
              type="email"
              placeholder="example@mail.com"
              value={inputEmail.value}
              onChange={(value) => setInputEmail({ ...inputEmail, value, success: true, error: '' })}
              error={inputEmail.error}
              disabled={inputEmail.isDisabled}
            />
          </div>
        </section>

        {/* Select */}
        <section className="main-page__section">
          <h2 className="main-page__section-title">Select</h2>
          <div className="main-page__grid">
            <Select
              label="Обычный селект"
              options={selectOptions}
              value={select1.value}
              onChange={(value) => setSelect1({ ...select1, value, success: true, error: '' })}
              error={select1.error}
              isDisabled={select1.isDisabled}
            />
            <Select
              label="Обязательное поле"
              options={selectOptions}
              value={select2.value}
              onChange={(value) => setSelect2({ ...select2, value, success: true, error: '' })}
              error={select2.error}
              isDisabled={select2.isDisabled}
              required
            />
            <Select
              label="С ошибкой"
              options={selectOptions}
              value={select3.value}
              onChange={(value) => setSelect3({ ...select3, value, success: !!value, error: value ? '' : 'Выберите значение из списка' })}
              error={select3.error}
              isDisabled={select3.isDisabled}
            />
            <Select
              label="Отключенный"
              options={selectOptions}
              value={select4.value}
              onChange={(value) => setSelect4({ ...select4, value, success: true, error: '' })}
              isDisabled={select4.isDisabled}
            />
            <Select
              label="Мульти-выбор"
              options={selectOptions}
              value={selectMulti.value}
              onChange={(value) => setSelectMulti({ ...selectMulti, value, success: true, error: '' })}
              isDisabled={selectMulti.isDisabled}
              isMulti
              closeMenuOnSelect={false}
            />
            <Select
              label="С поиском"
              options={selectOptions}
              value={selectSearch.value}
              onChange={(value) => setSelectSearch({ ...selectSearch, value, success: true, error: '' })}
              isDisabled={selectSearch.isDisabled}
              isSearchable
              isClearable
            />
          </div>
        </section>

        {/* Textarea */}
        <section className="main-page__section">
          <h2 className="main-page__section-title">Textarea</h2>
          <div className="main-page__grid">
            <Textarea
              label="Обычное текстовое поле"
              placeholder="Введите несколько строк текста"
              value={textarea1.value}
              onChange={(value) => setTextarea1({ ...textarea1, value, success: true, error: '' })}
              error={textarea1.error}
              disabled={textarea1.isDisabled}
              rows={4}
            />
            <Textarea
              label="С лимитом символов"
              placeholder="Максимум 200 символов"
              value={textarea2.value}
              onChange={(value) => setTextarea2({ ...textarea2, value, success: true, error: '' })}
              error={textarea2.error}
              disabled={textarea2.isDisabled}
              maxLength={200}
              rows={4}
            />
            <Textarea
              label="С ошибкой"
              placeholder="Введите текст"
              value={textarea3.value}
              onChange={(value) => setTextarea3({ ...textarea3, value, success: value.length >= 10, error: value.length >= 10 ? '' : 'Текст слишком короткий' })}
              error={textarea3.error}
              disabled={textarea3.isDisabled}
              rows={4}
            />
            <Textarea
              label="Отключенное"
              placeholder="Введите текст"
              value={textarea4.value}
              onChange={(value) => setTextarea4({ ...textarea4, value, success: true, error: '' })}
              disabled={textarea4.isDisabled}
              rows={4}
            />
          </div>
        </section>

        {/* Checkbox */}
        <section className="main-page__section">
          <h2 className="main-page__section-title">Checkbox</h2>
          <div className="main-page__checkboxes">
            <Checkbox
              label="Обычный чекбокс"
              checked={checkbox1.value}
              onChange={(value) => setCheckbox1({ ...checkbox1, value, success: value, error: '' })}
              error={checkbox1.error}
              disabled={checkbox1.isDisabled}
            />
            <Checkbox
              label="Выбранный по умолчанию"
              checked={checkbox2.value}
              onChange={(value) => setCheckbox2({ ...checkbox2, value, success: value, error: '' })}
              disabled={checkbox2.isDisabled}
            />
            <Checkbox
              label="С ошибкой"
              checked={checkbox3.value}
              onChange={(value) => setCheckbox3({ ...checkbox3, value, success: value, error: value ? '' : 'Необходимо согласиться с условиями' })}
              error={checkbox3.error}
              disabled={checkbox3.isDisabled}
            />
            <Checkbox
              label="Отключенный"
              checked={checkbox4.value}
              onChange={(value) => setCheckbox4({ ...checkbox4, value, success: value, error: '' })}
              disabled={checkbox4.isDisabled}
            />
            <Checkbox
              label="Отключенный и выбранный"
              checked={checkbox5.value}
              onChange={(value) => setCheckbox5({ ...checkbox5, value, success: value, error: '' })}
              disabled={checkbox5.isDisabled}
            />
          </div>
        </section>

        {/* Radio */}
        <section className="main-page__section">
          <h2 className="main-page__section-title">Radio</h2>
          <div className="main-page__grid">
            <Radio
              label="Вертикальное расположение"
              options={radioOptions}
              value={radio1.value}
              onChange={(value) => setRadio1({ ...radio1, value, success: true, error: '' })}
              error={radio1.error}
              disabled={radio1.isDisabled}
              name="radio-vertical"
              required
            />
            <Radio
              label="Горизонтальное расположение"
              options={radioOptions}
              value={radio2.value}
              onChange={(value) => setRadio2({ ...radio2, value, success: true, error: '' })}
              disabled={radio2.isDisabled}
              direction="horizontal"
              name="radio-horizontal"
            />
            <Radio
              label="С ошибкой"
              options={radioOptions}
              value={radio3.value}
              onChange={(value) => setRadio3({ ...radio3, value, success: !!value, error: value ? '' : 'Выберите один из вариантов' })}
              error={radio3.error}
              disabled={radio3.isDisabled}
              name="radio-error"
            />
            <Radio
              label="Отключенные"
              options={radioOptions}
              value={radio4.value}
              onChange={(value) => setRadio4({ ...radio4, value, success: true, error: '' })}
              disabled={radio4.isDisabled}
              name="radio-disabled"
            />
          </div>
        </section>

        {/* Toggle */}
        <section className="main-page__section">
          <h2 className="main-page__section-title">Toggle</h2>
          <div className="main-page__toggles">
            <Toggle
              label="Обычный переключатель"
              checked={toggle1.value}
              onChange={(value) => setToggle1({ ...toggle1, value, success: value, error: '' })}
              error={toggle1.error}
              disabled={toggle1.isDisabled}
            />
            <Toggle
              label="Маленький"
              size="small"
              checked={toggle2.value}
              onChange={(value) => setToggle2({ ...toggle2, value, success: value, error: '' })}
              disabled={toggle2.isDisabled}
            />
            <Toggle
              label="Средний"
              size="medium"
              checked={toggle3.value}
              onChange={(value) => setToggle3({ ...toggle3, value, success: value, error: '' })}
              disabled={toggle3.isDisabled}
            />
            <Toggle
              label="Большой"
              size="large"
              checked={toggle4.value}
              onChange={(value) => setToggle4({ ...toggle4, value, success: value, error: '' })}
              disabled={toggle4.isDisabled}
            />
            <Toggle
              label="С ошибкой"
              checked={toggle5.value}
              onChange={(value) => setToggle5({ ...toggle5, value, success: value, error: value ? '' : 'Необходимо включить эту опцию' })}
              error={toggle5.error}
              disabled={toggle5.isDisabled}
            />
            <Toggle
              label="Отключенный"
              checked={toggle6.value}
              onChange={(value) => setToggle6({ ...toggle6, value, success: value, error: '' })}
              disabled={toggle6.isDisabled}
            />
            <Toggle
              label="Отключенный и включенный"
              checked={toggle7.value}
              onChange={(value) => setToggle7({ ...toggle7, value, success: value, error: '' })}
              disabled={toggle7.isDisabled}
            />
          </div>
        </section>

        {/* DateInput */}
        <section className="main-page__section">
          <h2 className="main-page__section-title">DateInput</h2>
          <div className="main-page__grid">
            <DateInput
              label="Выберите дату"
              placeholder="ДД.ММ.ГГГГ"
              onChange={(value) => setDate1({ ...date1, value, success: true, error: '' })}
              error={date1.error}
              disabled={date1.isDisabled}
            />
          </div>
        </section>

        {/* Slider */}
        <section className="main-page__section">
          <h2 className="main-page__section-title">Slider</h2>
          <div className="main-page__grid">
            <Slider
              label="Обычный слайдер"
              value={slider1.value as number}
              onChange={(_e, value) => setSlider1({ ...slider1, value: value as number, success: true, error: '' })}
              min={0}
              max={100}
              step={1}
              disabled={slider1.isDisabled}
            />
            <Slider
              label="Диапазон значений (Range)"
              value={slider2.value as [number, number]}
              onChange={(_e, value) => setSlider2({ ...slider2, value: value as [number, number], success: true, error: '' })}
              min={0}
              max={100}
              step={5}
              disabled={slider2.isDisabled}
              disableSwap
            />
            <Slider
              label="С ошибкой"
              value={slider3.value as number}
              onChange={(_e, value) => {
                const numValue = value as number;
                setSlider3({ ...slider3, value: numValue, success: numValue >= 50, error: numValue >= 50 ? '' : 'Выберите значение больше 50' });
              }}
              min={0}
              max={100}
              error={slider3.error}
              disabled={slider3.isDisabled}
            />
            <Slider
              label="Отключенный"
              value={slider4.value as number}
              onChange={(_e, value) => setSlider4({ ...slider4, value: value as number, success: true, error: '' })}
              min={0}
              max={100}
              disabled={slider4.isDisabled}
            />
            <Slider
              label="Зарплата (с форматированием)"
              value={slider5.value as number}
              onChange={(_e, value) => setSlider5({ ...slider5, value: value as number, success: true, error: '' })}
              min={50000}
              max={500000}
              step={10000}
              formatValue={(val) => `${val.toLocaleString('ru-RU')} ₽`}
              disabled={slider5.isDisabled}
            />
          </div>
        </section>

        {/* Button */}
        <section className="main-page__section">
          <h2 className="main-page__section-title">Button</h2>
          <div className="main-page__buttons">
            <Button onClick={() => {
              alert(`
                Input 1: ${input1.value}
                Select 1: ${JSON.stringify(select1.value)}
                Textarea 1: ${textarea1.value}
                Checkbox 1: ${checkbox1.value}
                Radio 1: ${radio1.value}
                Toggle 1: ${toggle1.value}
                Date 1: ${date1.value}
                Slider 1: ${slider1.value}
                Slider 2: ${JSON.stringify(slider2.value)}
              `);
            }}>
              Показать значения
            </Button>
            <Button disabled>
              Отключенная кнопка
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UI;
