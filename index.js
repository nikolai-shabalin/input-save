class InputSave {
  #attributeName = 'localstorage';
  #selectorField = `[data-${this.#attributeName}]:not([type="password"])`;
  #fields = document.querySelectorAll(this.#selectorField);

  constructor() {
    this.init();
  }

  #saveFormData = (field) => {
    const inputId = field.dataset[this.#attributeName];
    const value = field.value;
    localStorage.setItem(`${inputId}`, value);
  };

  #restoreFormData = (field) => {
    const inputId = field.dataset[this.#attributeName];
    const savedValue = localStorage.getItem(inputId);

    if (savedValue !== null) {
      field.value = savedValue;
    }
  };

  #resetFieldValues = (field) => {
    field.value = '';
  };

  #clearLocalStorage = (field) => {
    const inputId = field.dataset[this.#attributeName];
    localStorage.removeItem(inputId);
  };

  #handleInput = (event) => {
    const field = event.target;
    const fieldsArray = [...this.#fields];
    if (fieldsArray.includes(field)) {
      this.#saveFormData(field);
    }
  };

  #resetAndClearField(field) {
    this.#resetFieldValues(field);
    this.#clearLocalStorage(field);
  }

  destroy(formElement) {
    for (const field of this.#fields) {
      if (!formElement || formElement.contains(field)) {
        this.#resetAndClearField(field);
      }
    }
    document.removeEventListener('input', this.#handleInput);
  }

  init() {
    document.addEventListener('input', this.#handleInput);

    if (this.#fields.length) {
      for (const field of this.#fields) {
        this.#restoreFormData(field);
      }
    }
  }
}

export { InputSave };
