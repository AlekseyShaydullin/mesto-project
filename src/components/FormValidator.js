export default class FormValidator {
	constructor(validationConfig, form) {
		this._validationConfig = validationConfig;
		this._form = form;
		this._buttonElement = this._form.querySelector(this._validationConfig.submitButtonSelector);
		this._inputList = [...this._form.querySelectorAll(this._validationConfig.inputSelector)];
	}

	_showInputError(inputElement) {
		this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(this._validationConfig.inputErrorClass);
		this._errorElement.textContent = inputElement.validationMessage;
		this._errorElement.classList.add(this._validationConfig.errorClass);
	}

	_hideInputError(inputElement) {
		this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove(this._validationConfig.inputErrorClass);
		this._errorElement.classList.remove(this._validationConfig.errorClass);
		this._errorElement.textContent = '';
	}

	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement);
		} else {
			this._hideInputError(inputElement);
		}
	}

	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
			this._buttonElement.disabled = true;
		} else {
			this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
			this._buttonElement.disabled = false;
		}
	}

	_hasInvalidInput() {
		return this._inputList.some((inputElement) => !inputElement.validity.valid);
	}

	_setEventListeners() {
		this._form.addEventListener("submit", (evt => { evt.preventDefault() }));

		this._inputList.forEach(inputElement => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
			});
		});
		this._toggleButtonState();
	}

	_resetValidation() {
		this._errorItems = [...this._form.querySelectorAll(`.${this._validationConfig.errorClass}`)];
		this._inputErrorList = [...this._form.querySelectorAll(`.${this._validationConfig.inputErrorClass}`)];
		this._errorItems.forEach(errorItem => {
			errorItem.classList.remove(this._validationConfig.errorClass);
		});
		this._inputErrorList.forEach(input => {
			input.classList.remove(this._validationConfig.inputErrorClass);
		});
		this._buttonElement.disabled = true;
		this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
	}

	clearValidation() {
		this._resetValidation();
		this._form.reset();
	}

	enableValidation() {
		this._setEventListeners()
	}
}