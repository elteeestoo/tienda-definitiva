class ImageModalComponent extends HTMLElement {
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
                .modal-container.active{
                  width: 100%;
                  fill: white;
                }

            </style>
        
            <!-- ventana modal del filtro -->
            <div class="modal-container">
              <div class="image-modal">
                
              </div>
            </div>

            `
    // modal

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

customElements.define('image-modal-component', ImageModalComponent)
