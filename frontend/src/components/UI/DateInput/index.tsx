import * as React from 'react';
import './style.scss';
import * as datepicker from "@zag-js/date-picker"
import { useMachine, normalizeProps } from "@zag-js/react"
import { useId, useState, useEffect, useCallback, useMemo, useRef } from "react"
import { CalendarDate, parseDate } from "@internationalized/date"

interface DateProps {
  label?: string;
  labelColor?: 'black' | 'white';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  dateFormat?: 'DD.MM.YYYY' | 'MM.DD.YYYY' | 'YYYY-MM-DD';
}

// Функция для парсинга строки даты в объект для datepicker
function parseDateString(dateString: string, format: string): CalendarDate[] | undefined {
  if (!dateString) return undefined;
  
  try {
    let day: number, month: number, year: number;
    
    switch (format) {
      case 'MM.DD.YYYY':
        const [monthStr, dayStr, yearStr] = dateString.split('.');
        day = parseInt(dayStr);
        month = parseInt(monthStr);
        year = parseInt(yearStr);
        break;
      case 'YYYY-MM-DD':
        const [yearStr2, monthStr2, dayStr2] = dateString.split('-');
        day = parseInt(dayStr2);
        month = parseInt(monthStr2);
        year = parseInt(yearStr2);
        break;
      case 'DD.MM.YYYY':
      default:
        const [dayStr3, monthStr3, yearStr3] = dateString.split('.');
        day = parseInt(dayStr3);
        month = parseInt(monthStr3);
        year = parseInt(yearStr3);
        break;
    }
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return undefined;
    }
    
    // Создаем CalendarDate объект
    const calendarDate = new CalendarDate(year, month, day);
    return [calendarDate];
  } catch (error) {
    return undefined;
  }
}

export default function DateInput({
  label,
  labelColor = 'black',
  placeholder = 'ДД.ММ.ГГГГ',
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  error,
  className = '',
  dateFormat = 'DD.MM.YYYY',
}: DateProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const prevValueRef = useRef<string | undefined>(value);

  // Мемоизируем обработчик изменения значения
  const handleValueChange = useCallback((details: any) => {
    const dateValue = details.value;
    if (dateValue && dateValue.length > 0) {
      const d = dateValue[0];
      const day = String(d.day).padStart(2, '0');
      const month = String(d.month).padStart(2, '0');
      const year = d.year;
      
      let formattedDate = '';
      switch (dateFormat) {
        case 'MM.DD.YYYY':
          formattedDate = `${month}.${day}.${year}`;
          break;
        case 'YYYY-MM-DD':
          formattedDate = `${year}-${month}-${day}`;
          break;
        case 'DD.MM.YYYY':
        default:
          formattedDate = `${day}.${month}.${year}`;
      }
      
      onChange?.(formattedDate);
    }
  }, [onChange, dateFormat]);

  // Мемоизируем начальное значение
  const initialValue = useMemo(() => {
    return value ? parseDateString(value, dateFormat) : undefined;
  }, [value, dateFormat]);

  const service = useMachine(datepicker.machine, { 
    id: useId(),
    locale: 'ru-RU',
    disabled,
    value: initialValue,
    onValueChange: handleValueChange,
  });

  const api = datepicker.connect(service, normalizeProps);

  // Синхронизация значения при изменении внешнего value
  useEffect(() => {
    // Проверяем, изменилось ли значение
    if (prevValueRef.current !== value) {
      prevValueRef.current = value;
      
      if (value) {
        const parsedValue = parseDateString(value, dateFormat);
        if (parsedValue) {
          api.setValue(parsedValue);
        }
      } else {
        api.clearValue();
      }
    }
  }, [value, dateFormat]);

  const hasValue = api.value && api.value.length > 0;

  const dateClasses = [
    'custom-date',
    isFocused && 'custom-date--focused',
    hasValue && 'custom-date--has-value',
    error && 'custom-date--error',
    disabled && 'custom-date--disabled',
    className,
  ].filter(Boolean).join(' ');

  const handleWrapperClick = useCallback(() => {
    if (!disabled) {
      api.setOpen(true);
    }
  }, [disabled, api]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  return (
    <div className={dateClasses}>
        {label && (
          <label className={`custom-date__label custom-date__label--${labelColor}`} {...api.getLabelProps()}>
            {label}
          </label>
        )}

        <div className="custom-date__wrapper" onClick={handleWrapperClick}>
          <input 
            className="custom-date__field"
            {...api.getInputProps({ index: 0 })} 
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button 
            type="button"
            className="custom-date__icon-button"
            {...api.getTriggerProps()}
          >
            <svg 
              className="custom-date__icon" 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M15.8333 3.33333H4.16667C3.24619 3.33333 2.5 4.07952 2.5 5V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V5C17.5 4.07952 16.7538 3.33333 15.8333 3.33333Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M13.3333 1.66667V5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M6.66667 1.66667V5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2.5 8.33333H17.5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>

        {api.open && (
          <div className="custom-date__calendar" {...api.getContentProps()}>
            {/*  Day View  */}
            <div hidden={api.view !== "day"}>
              <div className="custom-date__calendar-header">
                <button 
                  type="button"
                  className="custom-date__calendar-nav"
                  {...api.getPrevTriggerProps()}
                >
                  ‹
                </button>
                <button 
                  type="button"
                  className="custom-date__calendar-title"
                  {...api.getViewTriggerProps()}
                >
                  {api.visibleRangeText.start}
                </button>
                <button 
                  type="button"
                  className="custom-date__calendar-nav"
                  {...api.getNextTriggerProps()}
                >
                  ›
                </button>
              </div>

              <table className="custom-date__table" {...api.getTableProps({ view: "day" })}>
                <thead {...api.getTableHeaderProps({ view: "day" })}>
                  <tr {...api.getTableRowProps({ view: "day" })}>
                    {api.weekDays.map((day, i) => (
                      <th 
                        className="custom-date__calendar-weekday"
                        scope="col" 
                        key={i} 
                        aria-label={day.long}
                      >
                        {day.narrow}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody {...api.getTableBodyProps({ view: "day" })}>
                  {api.weeks.map((week, weekIdx) => (
                    <tr key={weekIdx} {...api.getTableRowProps({ view: "day" })}>
                      {week.map((value, dayIdx) => (
                        <td key={dayIdx} {...api.getDayTableCellProps({ value })}>
                          <button
                            type="button"
                            className="custom-date__calendar-day"
                            {...api.getDayTableCellTriggerProps({ value })}
                            onClick={(e) => {
                              // Принудительно обрабатываем клик по дате из другого месяца
                              if (value && !api.isUnavailable(value)) {
                                e.preventDefault();
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();
                                api.setValue([value]);
                                // Закрываем меню после выбора даты
                                setTimeout(() => {
                                  api.setOpen(false);
                                }, 100);
                              }
                            }}
                          >
                            {value?.day || ''}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/*  Month View  */}
            <div hidden={api.view !== "month"}>
              <div className="custom-date__calendar-header">
                <button 
                  type="button"
                  className="custom-date__calendar-nav"
                  {...api.getPrevTriggerProps({ view: "month" })}
                >
                  ‹
                </button>
                <button 
                  type="button"
                  className="custom-date__calendar-title"
                  {...api.getViewTriggerProps({ view: "month" })}
                >
                  {api.visibleRange.start.year}
                </button>
                <button 
                  type="button"
                  className="custom-date__calendar-nav"
                  {...api.getNextTriggerProps({ view: "month" })}
                >
                  ›
                </button>
              </div>

              <table className="custom-date__table" {...api.getTableProps({ view: "month", columns: 4 })}>
                <tbody {...api.getTableBodyProps({ view: "month" })}>
                  {api.getMonthsGrid({ columns: 4, format: "short" }).map((months, row) => (
                    <tr key={row} {...api.getTableRowProps()}>
                      {months.map((month, index) => (
                        <td
                          key={index}
                          {...api.getMonthTableCellProps({ ...month, columns: 4 })}
                        >
                          <button
                            type="button"
                            className="custom-date__calendar-month"
                            {...api.getMonthTableCellTriggerProps({ ...month, columns: 4 })}
                          >
                            {month.label}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/*  Year View  */}
            <div hidden={api.view !== "year"}>
              <div className="custom-date__calendar-header">
                <button 
                  type="button"
                  className="custom-date__calendar-nav"
                  {...api.getPrevTriggerProps({ view: "year" })}
                >
                  ‹
                </button>
                <span className="custom-date__calendar-title">
                  {api.getDecade().start} - {api.getDecade().end}
                </span>
                <button 
                  type="button"
                  className="custom-date__calendar-nav"
                  {...api.getNextTriggerProps({ view: "year" })}
                >
                  ›
                </button>
              </div>

              <table className="custom-date__table" {...api.getTableProps({ view: "year", columns: 4 })}>
                <tbody {...api.getTableBodyProps()}>
                  {api.getYearsGrid({ columns: 4 }).map((years, row) => (
                    <tr key={row} {...api.getTableRowProps({ view: "year" })}>
                      {years.map((year, index) => (
                        <td
                          key={index}
                          {...api.getYearTableCellProps({ ...year, columns: 4 })}
                        >
                          <button
                            type="button"
                            className="custom-date__calendar-year"
                            {...api.getYearTableCellTriggerProps({ ...year, columns: 4 })}
                          >
                            {year.label}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
        
      {error && (
        <div className="custom-date__error">
          {error}
        </div>
      )}
    </div>
  )
}