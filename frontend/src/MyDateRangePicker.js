import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { ru } from 'date-fns/locale';
import format from 'date-fns/format';

function MyDateRangePicker() {
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: null,
    key: 'selection'
  });

  // Функция для форматирования даты
  const dateFormat = "dd.MM.yyyy";

  return (
    <DateRange
      onChange={item => setState(item.selection)}
      ranges={[state]}
      direction="vertical"
      months={2}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      locale={ru} // Установка русской локали
      dateDisplayFormat={dateFormat} // Формат даты
      weekStartsOn={1} // Неделя начинается с понедельника
    />
  );
}

export default MyDateRangePicker;
