/** Composante Form de TimTools */
export default class Form {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur laquel la composante est instanciée
   */
  constructor(element) {
    this.element = element;
    this.formElements = this.element.elements;
    this.init();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    this.element.setAttribute('novalidate', '');

    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      if (input.required) {
        input.addEventListener('input', this.validateInput.bind(this));
      }
    }

    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      this.showConfirmation();
      // Construire un objet FormData à partir du formulaire
      const formData = new FormData(this.element);

      // Remplacez 'YOUR_GETFORM_IO_URL' par l'URL d'action fournie par Getform.io
      const getformUrl =
        'https://getform.io/f/3a8db9f3-697c-4de3-a4d7-b3b0cc999efd';

      fetch(getformUrl, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Erreur lors de l'envoi du formulaire");
          }
        })
        .then((data) => {
          // Réussite - affichez une confirmation ou effectuez d'autres actions
          console.log('Succès', data);
          this.showConfirmation();
        })
        .catch((error) => {
          // Gestion des erreurs
          console.error('Erreur', error);
        });
    } else {
      console.log('Échec de la validation');
    }
  }

  /**
   * method description
   * @return {boolean} status de la validation
   */
  validate() {
    let isValid = true;

    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      if (input.required && !this.validateInput(input)) {
        isValid = false;
      }
    }
    return isValid;
  }

  validateInput(event) {
    const input = event.currentTarget || event;

    if (input.validity.valid) {
      this.removeError(input);
    } else {
      this.addError(input);
    }

    return input.validity.valid;
  }

  addError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');
    container.classList.add('error');
  }

  removeError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');
    container.classList.remove('error');
  }

  showConfirmation() {
    this.element.classList.add('is-sent');
  }
}
