// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const checkBoxFul = document.querySelector('[value="fulfilled"]');
const checkBoxRej = document.querySelector('[value="rejected"]');
const delayInput = document.querySelector('[name="delay"]');
const pageForm = document.querySelector(".form");

pageForm.addEventListener("submit", event => {
    event.preventDefault();
    const promise = new Promise((resolve, reject) => { 
        let delay = delayInput.value;
        setTimeout(() => {
            if (checkBoxFul.checked) {
                resolve(delay);
            }
            else {
                reject(delay);
            }
        }, delay);
    }); 
    promise
        .then(value => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${value}ms`,
            });
        })
        .catch(error => {
            iziToast.error({
                message: `❌ Rejected promise in ${error}ms`,
            }); 
        });
});
   
