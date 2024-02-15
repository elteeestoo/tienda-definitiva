class Gallery extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.activeTab = 1
  }

  connectedCallback () {
    this.render()

    document.addEventListener('showImageModal', this.handleShowGalleryModal.bind(this))
  }

  handleShowGalleryModal (event) {
    const modal = this.shadow.querySelector('.modal-gallery-back')
    modal.classList.add('active')
  }

  render () {
    this.shadow.innerHTML = /* html */ `
      <style>
        * {
          margin: 0;
          padding: 0;
          font-family: "Roboto";
          color: white;
        }

        .modal-gallery-back {
          height: 100vh;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.5);
          z-index:10;
          display:none;
           /* Semi-transparent background */
        }

        .modal-gallery-back.active {
          display: flex;
        }

        .modal-gallery {
          position: relative;
          width: 80%;
          height: 80vh;
          background-color: hsl(207, 45%, 69%);
          z-index: 10;
          border-radius: 10px;
          padding-top:1rem;
          overflow: hidden;
        }
        .modal-gallery-title{
          margin-bottom:2rem;
          color: hsl(227, 51%, 21%)
        }

        .close-button {
          position: absolute;
          top: 15px;
          right: 15px;
          cursor: pointer;
        }

        .tabs{
          display:flex;
          border-bottom:solid 1px;
        }

        .tab {
          margin-left:1rem;
          width: 8rem;
          height: 2rem;
          display:flex;
          font-size: 12px;
          text-align: center;
          align-items: center;
          justify-content:center;
          cursor: pointer;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 1rem;
          background-color: white;
          color: hsl(227, 51%, 21%);
        }

        .tab:hover{
          background-color: hsl(227, 11%, 61%);
          color: white;
        }

        .tab.active{
          background-color: hsl(227, 51%, 21%);
          color: white;

        }
        .modal-gallery-title{
          margin-left:1rem;
          font-size:1.5rem;
        }

        .tab-content {
          display:none;
          background-color: hsl(0, 0%, 90%);
          height:100%;
        }

        .tab-content.active{
          width: 100%;
          display: flex;
        }

        .tab-content-images{
          padding-left:1rem;
          padding-top:1rem;
          flex:3;
        }

        .tab-content-upload{
          padding-left:1rem;
          padding-top:1rem;
        }
        .tab-content-form{
          padding-right:2rem;
          padding-left:2rem;
          padding-top:1rem;
          flex:1;
          background-color:hsl(207, 45%, 69%);
          box-sizing: border-box;
        }

    .avatar {
      width: 100px;
      height: 100px;
      background-color: white;
      margin: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: hsl(227, 51%, 21%);
      font-weight: bold;
      font-size: 1.2em;
      transition: 0.5s;
    }

    .avatar:hover{
      background-color: hsl(227, 51%, 21%);
      color: white;
      transform: scale(1.1);
      transition: 0.5s;
    }

    /* Estilo para el contenedor que envuelve los avatares */
    .avatar-container {
      display: flex;
      flex-wrap: wrap;

    }

    .gallery{
      display:flex;
      flex-direction:column;
      gap:1rem;
      margin-top:2rem;
    }

    .title-form{
      display:flex;
      justify-content:center;
      color: hsl(227, 51%, 21%);
    }

    .upload-button{
      display:flex;
      justify-content:center;
      background-color: white;
      align-items:center;
      width:5rem;
      height:2rem;
      position:absolute;
      bottom:2rem;
      right:2rem;
    }

    .tab-content-upload {
            background-color: #fff;
            padding: 20px;
            text-align: center;
        }

        button {
            background-color: hsl(207, 45%, 69%);
            color: hsl(227, 51%, 21%);
            border: solid 2px black;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #2980b9;
        }

        input[type="file"] {
            display: none;
        }

        .images-preview img {
  max-width: 200px; /* Ancho máximo */
  max-height: 150px; /* Altura máxima */
  width: auto; /* Para mantener la proporción original y ajustar automáticamente el ancho */
  height: auto; /* Para mantener la proporción original y ajustar automáticamente la altura */
  border: 1px solid #ccc; /* Borde opcional para resaltar la imagen */
}

      </style>
      
      <div class="modal-gallery-back">
        <div class="modal-gallery">
          <span class="close-button">X</span>
          <div class = "modal-gallery-title">
          Imagenes
          </div>
          <div class="tabs">
            <div class="tab active" data-tab="gallery">
                Imagenes Subidas
            </div>
            <div class="tab" data-tab="images">
                Subir imagen
            </div>
          </div>


        <div class="tab-content active" data-tab="gallery">
          <div class="tab-content-images">
          <div class="avatar-container">
          <!-- Avatares individuales -->
          <div class="avatar">A</div>
          <div class="avatar">B</div>
          <div class="avatar">C</div>
          <div class="avatar">D</div>
          <!-- Añade más avatares según sea necesario -->
        </div>
          </div>
          <div class="tab-content-form">
          <div class = title-form>
            FORM
          </div>  
            <form class ="gallery">
              <label class="title">
                Titulo
              </label>
              <input type="text">
              <label class="alternative">
                Nombre
              </label>
              <input type="text">
            </form>
            <button class="upload-button">
              Subir
            </button>
          </div>
        </div>
  
  
  
      <div class="tab-content" data-tab="images">
        <div class="tab-content-upload">
        <label for="imagen">Selecciona una imagen:</label>
        <button class="buttonInput">Subir imagen</button>
        <input type="file" class="imagen" name="imagen" accept="image/*">
        </div>
        <div class="images-preview">
        </div>
      </div>
      </div>
      `

    const input = this.shadow.querySelector('.imagen')
    const buttonInput = this.shadow.querySelector('.buttonInput')
    const previewDiv = this.shadow.querySelector('.images-preview')

    buttonInput.addEventListener('click', (event) => {
      input.click()
    })

    input.addEventListener('change', (event) => {
      // Verifica si se seleccionó algún archivo
      if (input.files && input.files[0]) {
        const reader = new FileReader()

        // Configura la función que se ejecutará cuando la lectura del archivo esté completa
        reader.onload = function (e) {
          // Crea un elemento de imagen y establece su src como la vista previa
          const imgPreview = document.createElement('img')
          imgPreview.src = e.target.result

          // Limpia cualquier contenido previo en el div de vista previa
          previewDiv.innerHTML = ''

          // Agrega la imagen al div de vista previa
          previewDiv.appendChild(imgPreview)
        }

        // Lee el archivo como una URL de datos
        reader.readAsDataURL(input.files[0])
      }
    })

    const main = this.shadow.querySelector('.modal-gallery')
    // console.log(main)
    main?.addEventListener('click', (event) => {
      // event.preventDefault()

      if (event.target.closest('.tab')) {
        if (event.target.closest('.tab').classList.contains('active')) {
          return
        }

        const tabClicked = event.target.closest('.tab')
        const tabActive = tabClicked.parentElement.querySelector('.active')

        // console.log(tabClicked)
        tabClicked.classList.add('active')
        tabActive.classList.remove('active')

        this.shadow.querySelector(`.tab-content.active[data-tab="${tabActive.dataset.tab}"]`).classList.remove('active')
        this.shadow.querySelector(`.tab-content[data-tab="${tabClicked.dataset.tab}"]`).classList.add('active')
      }
    })
    const modal = this.shadow.querySelector('.modal-gallery-back')

    const closeButton = this.shadow.querySelector('.close-button')
    closeButton.addEventListener('click', () => modal.classList.remove('active'))

    modal.addEventListener('click', function (event) {
      console.log('Se hizo clic en el contenedor exterior')
      modal.classList.remove('active')
    })

    main.addEventListener('click', function (event) {
      event.stopPropagation() // Evita que el evento se propague al contenedor exterior
      // console.log('Se hizo clic en el contenedor interior')
    })
  }
}

customElements.define('modal-gallery-component', Gallery)
