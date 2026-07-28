// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

/*// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";*/


const timerMain = document.querySelector(".timer");
timerMain.style.display = "flex";
timerMain.style.flexDirection = "row";
timerMain.style.gap = "24px";

const timerFields = document.querySelectorAll(".field");
timerFields.forEach(field => {
    field.style.display = "flex";
    field.style.flexDirection = "column";
    field.style.alignItems = "center";
})

const fieldsValues = document.querySelectorAll(".value");
fieldsValues.forEach(value => {
    value.style.fontSize = "40px";
})

const fieldsLabels = document.querySelectorAll(".label");
fieldsLabels.forEach(label => {
    label.style.textTransform = "uppercase";
})

const dateInput = document.querySelector("input");

const pageButton = document.querySelector("button");
// Запретить нажатие
pageButton.disabled = true;


let userSelectedDate = new Date();
/*let todaysDate = new Date();*/

function isItPast(startDate, endDate) {
  if (endDate <= startDate) {
    pageButton.disabled = true;
    iziToast.error({
        message: "Please choose a date in the future"
    });
  }
  else {
    pageButton.disabled = false;
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    isItPast(Date.now(), userSelectedDate);
  },
};

const myDateInput = flatpickr("#datetime-picker", options);
const stopButton = document.querySelector(".stbt");

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


pageButton.addEventListener("click", () => {
  // Запретить нажатие
  pageButton.disabled = true;
  dateInput.disabled = true;

  const intervalId = setInterval(() => {
    /* function*/

    
    let timeLeft = userSelectedDate - Date.now();

    const time = convertMs(timeLeft);
    const values = [
        time.days,
        time.hours,
        time.minutes,
        time.seconds
    ];
    fieldsValues.forEach((field, index) => {
      if (timeLeft <= 0) {
        clearInterval(intervalId);
        dateInput.disabled = false;
        return;
      }  
      field.textContent = String(values[index]).padStart(2, "0");
    })

  }, 1000);
  
  /*stopButton.addEventListener("click", () => {
    clearInterval(intervalId);
    pageButton.disabled = false;
        dateInput.disabled = false;
  });*/
})






