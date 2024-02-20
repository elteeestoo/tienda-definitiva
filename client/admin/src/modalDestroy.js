class ModalDestroy extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    const background = document.querySelector('.background-block')
    // const filterMenu = document.querySelector(".filter-modal");

    document.addEventListener('showDeleteModal', event => {
      background.classList.add('background-block-active')
      this.openModal()
    })
    this.render()
  }

  render () {
    this.shadow.innerHTML =
            /* html */
            `
        <style>
            /* modal de delete VVVVVVVV */
            .modal-delete {
            display: none;
            }

            .modal-delete-active {
            position: fixed;
            z-index: 3;
            height: 100vh;
            width: 100%;
            top: 0;
            left: 0;
            justify-content: center;
            align-items: center;
            display: flex;
            }

            .modal-delete-box {
            border: solid;
            border-color: white;
            border-radius: 10px;
            background-color: hsl(226, 64%, 66%);;
            padding: 1rem;
            box-shadow: 0.25rem 0.25rem 0.5rem rgb(0, 0, 0);
            }

            .modal-delete-box-label {
            padding: 2rem 6rem;
            color: white;
            font-family: "Roboto"
            }

            .modal-delete-box-buttons {
            display: flex;
            width: 100%;
            gap: 2rem;
            }

            .modal-buttons{
            display: flex;
            justify-content: center;
            padding: 0.7rem;
            width: 100%;
            }

            .modal-delete-box-buttons-accept {
            background-color: #02A8B1;
            border: solid 2px white;
            border-radius: 10px;
            color: white;
            }

            .modal-delete-box-buttons-decline {
            background-color: #D74242;
            border: solid 2px white;
            border-radius: 10px;
            color: white;
            }



            /* modal de delete ^^^^^^^^^^ */
        </style>
    
    <section class="modal-delete">
        <div class="modal-delete-box">
            <div class="modal-delete-box-label">
                <h3>Desea eliminar?</h3>
            </div>
            <div class="modal-delete-box-buttons">
                <button class="modal-delete-box-buttons-accept modal-buttons">
                Aceptar
                </button>
                <button class="modal-delete-box-buttons-decline modal-buttons">
                Cancelar
                </button>
            </div>
        </div>
    </section>
        `
    const acceptButton = this.shadow.querySelector('.modal-delete-box-buttons-accept')
    const cancelButton = this.shadow.querySelector('.modal-delete-box-buttons-decline')

    acceptButton?.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('delete-element'))
      this.closeModal()
    })

    cancelButton?.addEventListener('click', () => {
      this.closeModal()
    })
  }

  openModal () {
    const deleteModal = this.shadow.querySelector('.modal-delete')
    deleteModal.classList.add('modal-delete-active')
  }

  closeModal () {
    const deleteModal = this.shadow.querySelector('.modal-delete')
    const background = document.querySelector('.background-block')

    background.classList.remove('background-block-active')
    deleteModal.classList.remove('modal-delete-active')
  }
}

customElements.define('modal-destroy-component', ModalDestroy)
