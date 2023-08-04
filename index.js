class InputSave {
  #attributeName = 'localstorage';
  #fields = document.querySelectorAll(`[data-${this.#attributeName}]`);
  #inputListeners = new Map();

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

  #removeInputListeners = (field) => {
    const inputListener = this.#inputListeners.get(field);
    field.removeEventListener('input', inputListener);
  };

  #clearLocalStorage = (field) => {
    const inputId = field.dataset[this.#attributeName];
    localStorage.removeItem(inputId);
  };

  destroy() {
    for (const field of this.#fields) {
      this.#resetFieldValues(field);
      this.#removeInputListeners(field);
      this.#clearLocalStorage(field);
    }
  }

  init() {
    if (this.#fields.length) {
      for (const field of this.#fields) {
        const inputListener = this.#saveFormData.bind(this, field);
        this.#inputListeners.set(field, inputListener);
        field.addEventListener('input', inputListener);

        this.#restoreFormData(field);
      }
    }
  }
}

export { InputSave };
