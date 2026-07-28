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
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            }
            else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    }); 
    promise
        .then(value => {
            iziToast.success({
                message: value,
            });
        })
        .catch(error => {
            iziToast.error({
                message: error,
            }); 
        });
});
   
