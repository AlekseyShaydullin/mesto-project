import { validationConfig } from '../index.js';
import { setEventListeners } from './units.js';

const showInputError = (formElement, inputElement, validationConfig) => {
  const { inputErrorClass, errorClass } = validationConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

const hideInputError = (formElement, inputElement, validationConfig) => {
  const { inputErrorClass, errorClass } = validationConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  const { inactiveButtonClass, ...anyConfig } = validationConfig;
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

const enableValidation = () => {
  const { formSelector, ...anyConfig } = validationConfig;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => setEventListeners(formElement, anyConfig));
};

const resetValidation = (formElement, validationConfig) => {
  const { errorClass, inputErrorClass, inactiveButtonClass, submitButtonSelector, ...anyConfig } = validationConfig;
  const errorItems = Array.from(formElement.querySelectorAll(`.${errorClass}`));
  const inputList = Array.from(formElement.querySelectorAll(`.${inputErrorClass}`));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  errorItems.forEach(errorItems => {
    errorItems.classList.remove(errorClass);
  });
  inputList.forEach(inputList => {
    inputList.classList.remove(inputErrorClass);
  });
  buttonElement.disabled = true;
  buttonElement.classList.add(inactiveButtonClass);
}

const clearValidation = (formItem) => {
  const { formSelector, ...anyConfig } = validationConfig;
  const formList = Array.from(formItem.querySelectorAll(formSelector));
  formList.forEach(formElement => {
    resetValidation(formElement, anyConfig);
    formElement.reset();
  });
}

export { toggleButtonState, checkInputValidity, enableValidation, clearValidation }