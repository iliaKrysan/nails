document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  mobileMenuBtn.addEventListener('click', function () {
    nav.classList.toggle('active');
  });
  // Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  // Portfolio Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
// Более универсальный вариант с созданием span для года
document.addEventListener('DOMContentLoaded', function () {
  const footerText = document.querySelector('.footer-bottom p');
  if (footerText) {
    // Создаем span для года, если его еще нет
    if (!footerText.querySelector('.current-year')) {
      footerText.innerHTML = footerText.innerHTML.replace('2023', '<span class="current-year">2023</span>');
    }
    // Обновляем год
    const yearElement = footerText.querySelector('.current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
});
//Настройка карты в разделе контакты
ymaps.ready(init);
function init() {
  const map = new ymaps.Map("yandex-map", {
    center: [55.751244, 37.618423],
    zoom: 18,
    controls: ['zoomControl']
  });
  map.geoObjects.add(new ymaps.Placemark([55.751244, 37.618423], {
    hintContent: 'Студия маникюра Luna'
  }, {
    preset: 'islands#goldDotIcon'
  }));
}
//Обработка данных формы записи
document.addEventListener('DOMContentLoaded', function () {
  // Элементы формы
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const datepicker = document.getElementById('datepicker');
  const timeSlots = document.getElementById('time-slots');
  const form = document.getElementById('appointment-form');
  // Текущая дата (без времени)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // --- Функции для работы с Pop-up ---
  function createSuccessPopup(message) {
    // Проверяем, нет ли уже открытого popup
    const existingPopup = document.getElementById('success-popup');
    if (existingPopup) {
      document.body.removeChild(existingPopup);
    }
    // Создаем элементы pop-up
    const popup = document.createElement('div');
    popup.id = 'success-popup';
    popup.className = 'popup-overlay';
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    const popupMessage = document.createElement('p');
    popupMessage.textContent = message;
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'OK';
    closeBtn.className = 'popup-close-btn';
    // Собираем pop-up
    popupContent.appendChild(popupMessage);
    popupContent.appendChild(closeBtn);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
    // Показываем pop-up
    setTimeout(() => {
      popup.classList.add('show');
    }, 10);
    // Обработчики закрытия
    const closePopup = () => {
      popup.classList.remove('show');
      setTimeout(() => {
        if (popup.parentNode) {
          document.body.removeChild(popup);
        }
      }, 300);
    };
    closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup();
      }
    });
  }
  // --- Конец функций для работы с Pop-up ---
  // Инициализация календаря
  function initDatepicker() {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    function renderCalendar(month, year) {
      datepicker.innerHTML = '';
      // Заголовок календаря
      const header = document.createElement('div');
      header.className = 'datepicker-header';
      const prevBtn = document.createElement('button');
      prevBtn.innerHTML = '<';
      prevBtn.type = 'button';
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (month === 0) {
          month = 11;
          year--;
        } else {
          month--;
        }
        renderCalendar(month, year);
      });
      const monthYear = document.createElement('div');
      monthYear.textContent = new Date(year, month).toLocaleDateString('ru', {
        month: 'long',
        year: 'numeric'
      });
      const nextBtn = document.createElement('button');
      nextBtn.innerHTML = '>';
      nextBtn.type = 'button';
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (month === 11) {
          month = 0;
          year++;
        } else {
          month++;
        }
        renderCalendar(month, year);
      });
      header.appendChild(prevBtn);
      header.appendChild(monthYear);
      header.appendChild(nextBtn);
      datepicker.appendChild(header);
      // Дни недели
      const daysHeader = document.createElement('div');
      daysHeader.className = 'datepicker-days';
      ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'day-header';
        dayElement.textContent = day;
        daysHeader.appendChild(dayElement);
      });
      datepicker.appendChild(daysHeader);
      // Ячейки календаря
      const firstDay = new Date(year, month, 1).getDay() || 7;
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysContainer = document.createElement('div');
      daysContainer.className = 'datepicker-days';
      // Пустые ячейки в начале
      for (let i = 1; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'day';
        daysContainer.appendChild(empty);
      }
      // Дни месяца
      for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;
        const date = new Date(year, month, day);
        date.setHours(0, 0, 0, 0);
        if (date < today) {
          dayElement.classList.add('disabled');
        } else {
          dayElement.addEventListener('click', () => {
            const selectedDate = new Date(year, month, day);
            dateInput.value = selectedDate.toLocaleDateString('ru');
            datepicker.style.display = 'none';
            hideError('date-error');
            dateInput.classList.remove('input-error');
            timeInput.value = '';
            generateTimeSlots();
          });
        }
        daysContainer.appendChild(dayElement);
      }
      datepicker.appendChild(daysContainer);
    }
    renderCalendar(currentMonth, currentYear);
  }
  initDatepicker();
  // Функция для получения текущего времени в Москве
  function getMoscowTime() {
    const now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3 * 3600 * 1000));
  }
  // Генерация временных слотов
  function generateTimeSlots() {
    timeSlots.innerHTML = '';
    const slotsContainer = document.createElement('div');
    slotsContainer.className = 'time-slots-container';
    timeSlots.appendChild(slotsContainer);
    const now = getMoscowTime();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const selectedDateValue = dateInput.value;
    let isToday = false;
    if (selectedDateValue) {
      const dateParts = selectedDateValue.split('.');
      const selectedDateObj = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
      selectedDateObj.setHours(0, 0, 0, 0);
      const todayForComparison = new Date();
      todayForComparison.setHours(0, 0, 0, 0);
      isToday = selectedDateObj.getTime() === todayForComparison.getTime();
    }
    let hasAvailableSlots = false;
    for (let hour = 8; hour <= 18; hour++) {
      // Для времени "XX:00"
      if (!isToday || hour > currentHour || (hour === currentHour && 0 > currentMinute)) {
        hasAvailableSlots = true;
        const slotElement = document.createElement('div');
        slotElement.className = 'time-slot';
        slotElement.textContent = `${hour.toString().padStart(2, '0')}:00`;
        slotElement.addEventListener('click', function () {
          timeInput.value = this.textContent;
          timeSlots.style.display = 'none';
          hideError('time-error');
          timeInput.classList.remove('input-error');
        });
        slotsContainer.appendChild(slotElement);
      }
      // Для времени "XX:30"
      if (hour < 18) {
        if (!isToday || hour > currentHour || (hour === currentHour && 30 > currentMinute)) {
          hasAvailableSlots = true;
          const slotElement = document.createElement('div');
          slotElement.className = 'time-slot';
          slotElement.textContent = `${hour.toString().padStart(2, '0')}:30`;
          slotElement.addEventListener('click', function () {
            timeInput.value = this.textContent;
            timeSlots.style.display = 'none';
            hideError('time-error');
            timeInput.classList.remove('input-error');
          });
          slotsContainer.appendChild(slotElement);
        }
      }
    }
    if (!hasAvailableSlots) {
      const noSlotsMessage = document.createElement('div');
      noSlotsMessage.className = 'no-time-slots-message';
      noSlotsMessage.textContent = 'Нет доступных временных слотов на выбранный день.';
      timeSlots.appendChild(noSlotsMessage);
    }
  }
  // Показ календаря при клике
  dateInput.addEventListener('focus', function () {
    datepicker.style.display = 'block';
    timeSlots.style.display = 'none';
  });
  // Показ слотов времени при клике
  timeInput.addEventListener('focus', function () {
    if (dateInput.value) {
      generateTimeSlots();
      timeSlots.style.display = 'block';
      datepicker.style.display = 'none';
    } else {
      showError('date-error', 'Сначала выберите дату');
      dateInput.classList.add('input-error');
      timeSlots.style.display = 'none';
    }
  });
  // Скрытие выпадающих списков при клике вне
  document.addEventListener('click', function (e) {
    if (!e.target.closest('#datepicker') &&
      !e.target.closest('#time-slots') &&
      !e.target.closest('#date') &&
      !e.target.closest('#time')) {
      datepicker.style.display = 'none';
      timeSlots.style.display = 'none';
    }
  });
  // Вспомогательные функции
  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      const inputId = elementId.replace('-error', '');
      const inputElement = document.getElementById(inputId);
      if (inputElement) {
        inputElement.classList.add('input-error');
      }
    }
  }
  function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.style.display = 'none';
      const inputId = elementId.replace('-error', '');
      const inputElement = document.getElementById(inputId);
      if (inputElement) {
        inputElement.classList.remove('input-error');
      }
    }
  }
  // Валидация телефона
  function validatePhone(phone) {
    // Удаляем все нецифровые символы, кроме плюса
    const cleaned = phone.replace(/[^\d+]/g, '');
    // Проверка форматов
    if (/^\+7\d{10}$/.test(cleaned)) return true;
    if (/^8\d{10}$/.test(cleaned)) return true;
    if (/^7\d{10}$/.test(cleaned)) return true;
    if (/^\d{10}$/.test(cleaned)) return true;
    return false;
  }
  // Нормализация номера телефона
  function normalizePhone(phone) {
    const cleaned = phone.replace(/[^\d]/g, '');
    if (cleaned.startsWith('7') && cleaned.length === 11) {
      return '+7' + cleaned.substring(1);
    }
    if (cleaned.startsWith('8') && cleaned.length === 11) {
      return '+7' + cleaned.substring(1);
    }
    if (cleaned.length === 10) {
      return '+7' + cleaned;
    }
    return phone;
  }
  // Отправка формы
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;
    // Сбрасываем ошибки
    document.querySelectorAll('.error-message').forEach(el => {
      el.style.display = 'none';
    });
    document.querySelectorAll('.input-error').forEach(el => {
      el.classList.remove('input-error');
    });
    // Проверка имени
    const nameInput = document.getElementById('name');
    if (!nameInput.value.trim()) {
      showError('name-error', 'Пожалуйста, введите ваше имя');
      isValid = false;
    }
    // Проверка телефона
    const phoneInput = document.getElementById('phone');
    const phoneValue = phoneInput.value.trim();
    if (!phoneValue) {
      showError('phone-error', 'Пожалуйста, введите телефон');
      isValid = false;
    } else if (!validatePhone(phoneValue)) {
      showError('phone-error', 'Введите корректный телефон (+79991234567, 89991234567 или 9991234567)');
      isValid = false;
    } else {
      // Нормализуем номер
      phoneInput.value = normalizePhone(phoneValue);
    }
    // Проверка услуги
    const serviceInput = document.getElementById('service');
    if (!serviceInput.value) {
      showError('service-error', 'Пожалуйста, выберите услугу');
      isValid = false;
    }
    // Проверка даты
    if (!dateInput.value) {
      showError('date-error', 'Пожалуйста, выберите дату');
      isValid = false;
    } else {
      const dateParts = dateInput.value.split('.');
      const selectedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
      selectedDate.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        showError('date-error', 'Нельзя выбрать прошедшую дату');
        isValid = false;
      }
    }
    // Проверка времени
    if (!timeInput.value) {
      showError('time-error', 'Пожалуйста, выберите время');
      isValid = false;
    }
    // Проверка времени для сегодняшней даты
    if (isValid && dateInput.value) {
      const dateParts = dateInput.value.split('.');
      const selectedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
      selectedDate.setHours(0, 0, 0, 0);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      if (selectedDate.getTime() === todayDate.getTime()) {
        const now = getMoscowTime();
        const [hours, minutes] = timeInput.value.split(':').map(Number);
        const selectedTime = new Date(now);
        selectedTime.setHours(hours, minutes, 0, 0);
        if (selectedTime <= now) {
          showError('time-error', 'Нельзя выбрать прошедшее время');
          isValid = false;
        }
      }
    }
    if (isValid) {
      // Собираем данные формы
      const formValues = { // Изменил имя переменной
        name: nameInput.value.trim(),
        phone: phoneInput.value,
        service: serviceInput.options[serviceInput.selectedIndex].text,
        date: dateInput.value,
        time: timeInput.value
      };
      // Формируем сообщение для Telegram
      const message = `📌 Новая заявка!
👩 Имя: ${formValues.name}
📞 Телефон: ${formValues.phone}
💅 Услуга: ${formValues.service}
📅 Дата: ${formValues.date}
⏰ Время: ${formValues.time}`;
      fetch('http://localhost:3000/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatId: '732983471',
          text: message
        })
      })
        .then(response => {
          if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
          return response.json();
        })
        .then(data => {
          console.log('Сообщение отправлено', data);
          // Заменено alert на pop-up
          createSuccessPopup('Ваша заявка успешно отправлена! Скоро мы свяжемся с Вами для уточнения деталей.');
          form.reset();
        })
        .catch(error => {
          console.error('Ошибка отправки:', error);
          // Заменено alert на pop-up
          createSuccessPopup('Ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
        });
    }
  }); // Закрытие addEventListener('submit', ...)
}); // Закрытие DOMContentLoaded для формы