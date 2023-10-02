export default class Modal {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    // Chercher la modal
    this.modal = this.element.querySelector('.modal');
    // Chercher l'image et y ajouter un event
    this.img = this.element.querySelector('.modal-image');
    this.content = this.element.querySelector('.modal-content'); // Ajout de la recherche du contenu spécifique

    this.img.addEventListener('click', this.openModal.bind(this));

    this.modal.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.closeModal();
      }
    });
  }

  // Function pour ouvrir la modal
  openModal() {
    this.modal.style.display = 'block';
    this.modal.classList.add('is-active');
    this.content.style.display = 'block'; // Afficher le contenu spécifique
  }

  // Function pour fermé la modal
  closeModal() {
    this.modal.style.display = 'none';
    this.modal.classList.remove('is-active');
    this.content.style.display = 'none'; // Masquer le contenu spécifique
  }
}
