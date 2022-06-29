import { validationConfig } from '../index.js';
import { checkInputValidity, toggleButtonState } from './validate.js';

const setEventListeners = (formElement, validationConfig) => {
  const { inputSelector, submitButtonSelector, ...anyConfig } = validationConfig;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  formElement.addEventListener("submit", (evt => { evt.preventDefault() }));

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, anyConfig);
      toggleButtonState(inputList, buttonElement, anyConfig);
    });
  });
  toggleButtonState(inputList, buttonElement, anyConfig);
};

const removeEventListeners = (formElement, validationConfig) => {
  const { inputSelector, submitButtonSelector, ...anyConfig } = validationConfig;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  formElement.removeEventListener("submit", resetDefaultAction);
  inputList.forEach(inputElement => {
    inputElement.removeEventListener('input', () => {
      checkInputValidity(formElement, inputElement, anyConfig);
      toggleButtonState(buttonElement, inputList, anyConfig);
    });
  });
}

export { setEventListeners, removeEventListeners };