class ImageComponent extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    // this.title = this.getAttribute('title')
  }

  connectedCallback () {
    const modalContainer = this.shadow.querySelector('.modal-container')
    // const filterMenu = document.querySelector(".filter-modal");

    this.shadow.addEventListener('showImageModal', event => {
      modalContainer.classList.add('active')
      this.openModal()
    })
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */
      `
            <style>
                * {
                margin: 0;
                padding: 0;
                }

                section {
                margin: 0;
                padding: 0;
                }

                .none {
                display: none;
                }

                button {
                background: transparent;
                border: none;
                cursor: pointer;
                }

                a {
                text-decoration: none;
                }

                ul {
                list-style: none;
                }

                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                color: hsl(0, 0%, 100%);
                font-family: 'Roboto', sans-serif;
                }

                input,
                label,
                select,
                textarea,
                li,
                span,
                p {
                color: hsl(0, 0%, 100%);
                font-family: 'Roboto', sans-serif;
                
                }

                /* mdoal filtro VVVVVVVV*/
                .image-button svg{
                  width: 10rem;
                  fill: white;
                }

            </style>
        
            <!-- ventana modal del filtro -->
            <button class="image-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>open-in-app</title><path d="M12,10L8,14H11V20H13V14H16M19,4H5C3.89,4 3,4.9 3,6V18A2,2 0 0,0 5,20H9V18H5V8H19V18H15V20H19A2,2 0 0,0 21,18V6A2,2 0 0,0 19,4Z" /></svg>
            </button>
            <div class="modal-container">
              <div class="image-modal">
                
              </div>
            </div>

            `
    // modal
    const imageButton = this.shadow.querySelector('.image-button')

    imageButton?.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('showImageModal', {
      }))
    })

    const buttonAccept = this.shadow.querySelector('.filter-inside-buttons-accept')
    const buttonDecline = this.shadow.querySelector('.filter-inside-buttons-decline')

    buttonAccept?.addEventListener('click', () => {
      this.closeModal()
    })

    buttonDecline?.addEventListener('click', () => {
      this.closeModal()
    })
  }

  openModal () {
    const filterMenu = this.shadow.querySelector('.filter-modal')
    filterMenu.classList.add('filter-modal-active')
  }

  closeModal () {
    // const background = this.shadow.querySelector(".background-block");
    const filterMenu = this.shadow.querySelector('.filter-modal')
    const background = document.querySelector('.background-block')

    background.classList.remove('background-block-active')
    filterMenu.classList.remove('filter-modal-active')
  }
}

customElements.define('image-component', ImageComponent)
