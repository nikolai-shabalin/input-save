const attributeName = 'localstorage';

const saveFormData = (field) => {
  const inputId = field.dataset[attributeName];
  const value = field.value;

  localStorage.setItem(`${inputId}`, value);
}

const restoreFormData = (field) => {
  const inputId = field.dataset[attributeName];
  const savedValue = localStorage.getItem(inputId);

  if (savedValue !== null) {
    field.value = savedValue;
  }
}

const initInputSave = () => {
  const fields = document.querySelectorAll(`[data-${attributeName}]`);

  if (fields.length) {
    for (const field of fields) {
      field.addEventListener('input', () => {
        saveFormData(field);
      })
    }

    window.addEventListener('DOMContentLoaded', () => {
      for (const field of fields) {
        restoreFormData(field);
      }
    })
  }
}

export {initInputSave};
