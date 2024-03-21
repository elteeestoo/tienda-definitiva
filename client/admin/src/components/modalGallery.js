class Gallery extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.activeTab = 1
  }

  connectedCallback () {
    this.render()
    this.addEventListeners()
    this.getThumbnails()
    this.shadow.querySelector('.upload-button').addEventListener('click', this.sendImage)
  }

  sendImage () {
    alert('Se envió la imagen')
  }

  async getThumbnails () {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/images`)
      const thumbnails = await result.json()
      this.printThumbnails(thumbnails)
    } catch (error) {
      console.error('Error al obtener miniaturas:', error)
    }
  }

  printThumbnails (thumbnails) {
    console.log(thumbnails)
    thumbnails.rows.forEach(thumbnail => {
      const uploadDiv = this.shadow.querySelector('.gallery-container')

      const cardContainer = document.createElement('div')
      cardContainer.classList.add('card-container')
      uploadDiv.appendChild(cardContainer)

      const imgElement = document.createElement('img')
      imgElement.src = `${import.meta.env.VITE_API_URL}/api/admin/images/${thumbnail.filename}`
      cardContainer.appendChild(imgElement)

      const closeIcon = document.createElement('div')
      closeIcon.dataset.filename = thumbnail.filename
      closeIcon.classList.add('close-icon')
      closeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="14" fill="red"/><path fill="white" d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"/></svg>'
      cardContainer.appendChild(closeIcon)

      cardContainer.imgElement = imgElement
      this.setupImageContainerEvents(cardContainer)

      imgElement.addEventListener('click', () => {
        this.toggleImageSelection(imgElement)
      })
    })
  }

  toggleImageSelection (imgElement) {
    const images = this.shadow.querySelectorAll('.card-container img')
    const isSelected = imgElement.classList.contains('selected')

    if (isSelected) {
      imgElement.classList.remove('selected')
      this.shadow.querySelector('.upload-button').classList.remove('active')
      this.shadow.querySelector('.upload-button').disabled = true
    } else {
      images.forEach(image => {
        image.classList.remove('selected')
      })

      imgElement.classList.add('selected')
      this.shadow.querySelector('.upload-button').classList.add('active')
      this.shadow.querySelector('.upload-button').disabled = false
    }

    this.displayImageData(imgElement)
  }

  // async displayImageData (imgElement) {
  //   alert('Pillar datos de Nombre y Nombre Alternativo')
  // }

  addEventListeners () {
    const fileDiv = this.shadow.querySelector('.uploadFile')
    fileDiv.addEventListener('click', () => {
      const fileInput = this.shadow.querySelector('.imagen')
      fileInput.click()
    })

    const input = this.shadow.querySelector('input[type="file"]')
    input.addEventListener('change', (event) => {
      this.uploadImage(event.target.files[0])
    })

    const modal = this.shadow.querySelector('.modal-gallery-back')
    document.addEventListener('showGalleryModal', event => {
      modal.classList.add('active')
    })

    const closeButton = this.shadow.querySelector('.close-button')
    closeButton.addEventListener('click', () => this.toggleModal())

    const imageContainers = this.shadow.querySelectorAll('.card-container')
    imageContainers.forEach(container => this.setupImageContainerEvents(container))
  }

  setupImageContainerEvents (container, imgElement) {
    const closeIcon = container.querySelector('.close-icon')
    const imgSrc = container.querySelector('img').src
    closeIcon.addEventListener('click', () => {
      const filename = imgSrc.substring(imgSrc.lastIndexOf('/') + 1)
      this.deleteImage(filename)
    })
    container.addEventListener('click', () => {
      this.toggleImageSelection(imgElement)
    })
  }

  async deleteImage (filename) {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/images/${filename}`, {
        method: 'DELETE'
      })

      if (result.ok) {
        const cardContainers = this.shadow.querySelectorAll('.card-container')
        cardContainers.forEach(container => {
          const imgElement = container.querySelector('img')
          if (imgElement.src.includes(filename)) {
            container.remove()
          }
        })
      } else {
        alert('Error al eliminar la imagen de la base de datos')
      }
    } catch (error) {
      console.error('Error al eliminar la imagen:', error)
    }
  }

  toggleModal () {
    const modal = this.shadow.querySelector('.modal-gallery-back')
    modal.classList.toggle('active')
  }

  render () {
    this.shadow.innerHTML = /* html */ `
    <style>
      * {
        margin: 0;
        padding: 0;
        font-family: "Roboto";
      }

      img {
        border-radius: 10px;
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
        z-index: 10;
        display: none;
      }

      .modal-gallery-back.active {
        display: flex;
      }

      .modal-gallery {
        position: relative;
        width: 80%;
        height: 80vh;
        background-color: hsl(216, 49%, 81%);
        border-radius: 1rem;
        z-index: 10;
        padding-top: 1rem;
        overflow: hidden;
      }

      .menu-icon {
        position: absolute;
        height: 6rem;
        left: 1rem;
        top: 0rem;
        fill: hsl(227, 51%, 21%);
      }

      .modal-gallery-title{
        margin-bottom: 2rem;
        cursor: default;
      }

      .close-button {
        position: absolute;
        top: 0px;
        right: 100px;
        cursor: pointer;
        font-size: 40px;
        color: hsl(227, 51%, 21%);
        font-family: monospace;
      }

      .close-button svg{
        transition: all 0.3s ease;
        fill: hsl(227, 51%, 21%);
        width: 4rem;
      }

      .close-button svg:hover {
        transform: scale(1.1);
        fill: crimson;
      }

      .tabs {
        display: flex;
        justify-content: start;
        align-items: start;
        background-color: hsl(227, 51%, 21%);
      }

      .tab {
        font-size: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: default;
        padding: 25px;
        background-color: hsl(227, 51%, 21%);
        color: white;
      }

      .modal-gallery-title{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1rem;
        font-size: 1.5rem;
        color: white;
        font-size: 56px;
        font-weight: bolder;
      }

      .tab-content {
        display: none;
        height: 100%;
      }

      .tab-content.active{
        width: 100%;
        display: flex;
      }

      .tab-content-images {
        overflow: auto;
        padding-left: 1rem;
        padding-top: 1rem;
        flex: 3;
        height: 40rem;
      }

      .tab-content-images::-webkit-scrollbar {
        display: none;
      }

      .tab-content-form {
        padding-right: 1rem;
        padding-left: 1rem;
        padding-top: 1rem;
        background-color: hsl(227, 51%, 21%);
        color: white;
        box-sizing: border-box;
      }

      .card-container {
        position: relative;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        font-weight: bold;
        font-size: 1.2em;
        cursor: pointer;
        color: #ffffff;
        display: flex;
        height: 180px;
        width: 180px;
        transition: all 0.3s;
        border: 5px solid hsl(207, 45%, 69%);  
        padding:0;
      }

      .close-icon {
        position: absolute;
        cursor: pointer;
        color: white;
        right: 10px;
        top: 10px;
        transition: all 0.3s;
        opacity: 0;
      }

      .card-container:hover .close-icon{
        opacity: 1;
      }

      .close-icon svg{
        width: 1.5rem;
      }

      .close-icon:hover {
        transform: scale(1.2);
      }

      .card-container img {
        width: 180px; 
        height: 180px;    
      }

      .gallery-container {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 1rem;
        position: relative;
        justify-content:start;
        align-items:center;
        gap:0.5rem;
      }

      .gallery {
        flex-direction: column;
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
      }

      .title-form {
        justify-content: center;
        display: flex;
      }

      .upload-button {
        text-shadow: 1px 1px 2px black;
        transition: all 0.3s ease;
        justify-content: center;
        align-items: center;
        height: fit-content;
        position: absolute;
        width: fit-content;
        font-size: 24px;
        display: flex;
        padding: 1rem;
        bottom: 2rem;
        border-radius: 10px;
        right: 2rem;
        color:white;
        filter: brightness(50%);
      }

      .upload-button.active{
        filter: brightness(100%);
      }

      <!-- .upload-button .active:hover {
        filter: brightness(1.1);
      } -->

      .tab-content-upload {
        padding: 1rem 5rem 0rem 5rem;
        background-color: hsl(207, 45%, 69%);
        text-align: center;
        color: white;
      }

      button {
        background-color: hsl(216, 49%, 81%);
        transition: all 0.3s;
        padding: 10px 40px;
        cursor: pointer;
        margin-top: 1rem;
        font-size: 16px;
        color: green;
        border: none;
        border-radius: 10px;
      }

      input[type="file"] {
        display: none;
      }

      input[type="text"] {
        height: 3rem;
        font-size: 2rem;
        text-indent: 0.3rem;
        border-radius: 10px;
        padding: 0.5rem;
        border: none;
        outline: none;
      }

      input[type="text"]:focus {
        outline: none;
      }

      label {
        font-size: 18px;
      }

      .uploadFile {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border: hsl(227, 51%, 21%) dashed 5px;
        transition: transform 0.3s ease;
        width: 170px;
        height: 170px;
        margin: 10px;
        border-radius: 10px;
        cursor: pointer;
      }

      .uploadFile:hover {
        background-color: hsl(207, 45%, 69%);
        transform: scale(1.02)
      }

      .uploadFile svg {
        width: 5rem;
        fill: hsl(227, 51%, 21%);
        position: static;
      }

      .selected {
        border: 8px solid steelblue;
      }

    </style>
    
    <div class="modal-gallery-back">
      <div class="modal-gallery">
        <span class="close-button">
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" /></svg>
        </span>
        <span>
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8M9,11A1,1 0 0,1 10,12A1,1 0 0,1 9,13A1,1 0 0,1 8,12A1,1 0 0,1 9,11M15,11A1,1 0 0,1 16,12A1,1 0 0,1 15,13A1,1 0 0,1 14,12A1,1 0 0,1 15,11M11,14H13L12.3,15.39C12.5,16.03 13.06,16.5 13.75,16.5A1.5,1.5 0 0,0 15.25,15H15.75A2,2 0 0,1 13.75,17C13,17 12.35,16.59 12,16V16H12C11.65,16.59 11,17 10.25,17A2,2 0 0,1 8.25,15H8.75A1.5,1.5 0 0,0 10.25,16.5C10.94,16.5 11.5,16.03 11.7,15.39L11,14Z" /></svg>
        </span>
        <div class="modal-gallery-title">Galería de Imágenes</div>
        <div class="tabs">
          <div class="tab active" data-tab="gallery">Imágenes Disponibles</div>
        </div>
    
        <div class="tab-content active" data-tab="gallery">
          <div class="tab-content-images">
            <div class="gallery-container">
              <div class="upload">

              <div class="uploadFile">
                <input type="file" class="imagen" name="file" accept="image/*">
                  <svg width="389" height="324" viewBox="0 0 389 324" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M164.9 164.301L228.6 212.101L260.5 196.201L324.2 234.401V259.901H133V196.201L164.9 164.301Z"/>
                    <path d="M324.3 156.3C324.3 169.5 313.6 180.2 300.4 180.2C287.2 180.2 276.5 169.5 276.5 156.3C276.5 143.1 287.2 132.4 300.4 132.4C313.6 132.4 324.3 143.1 324.3 156.3Z"/>
                    <path d="M64 0H106.7V170.7H64V0Z"/>
                    <path d="M0 64H170.7V106.7H0V64Z"/>
                    <path d="M356.2 68.6992H207.3V100.599H356.2V291.799H101.2V207.699H69.2998V291.799C69.2998 309.299 83.5998 323.699 101.2 323.699H356.2C373.7 323.699 388.1 309.399 388.1 291.799V100.499C388 82.9992 373.7 68.6992 356.2 68.6992Z"/>
                  </svg>
                </div>
              </div>

            </div>
          </div>
          <div class="tab-content-form">
            <form class="gallery">
              <label class="title">Nombre:</label>
              <input type="text">
              <br>
              <label class="alternative">Nombre Alternativo:</label>
              <input type="text">
            </form>
            <button class="upload-button">Subir Imágenes</button>
          </div>
        </div>

        <div class="tab-content" data-tab="images">
          <div class="tab-content-upload">
            <label for="imagen">Choose image:</label><br>
            <button class="buttonInput">Upload image</button>
          </div>
        </div>
      </div>
    </div>
    `
  }

  uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    const result = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/images`, {
      method: 'POST',
      body: formData
    })

    const filenames = await result.json()

    filenames.forEach(filename => {
      this.appendImage(filename)
    })
  }

  async appendImage (filename) {
    const uploadDiv = this.shadow.querySelector('.gallery-container')

    const images = uploadDiv.querySelectorAll('img')
    images.forEach(image => {
      image.classList.remove('selected')
    })

    const cardContainer = document.createElement('div')
    cardContainer.classList.add('card-container')
    uploadDiv.appendChild(cardContainer)

    const imgElement = document.createElement('img')
    imgElement.src = `${import.meta.env.VITE_API_URL}/api/admin/images/${filename}`
    imgElement.classList.add('selected')
    cardContainer.appendChild(imgElement)

    const closeIcon = document.createElement('div')
    closeIcon.classList.add('close-icon')
    closeIcon.dataset.filename = filename
    closeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="14" fill="red"/><path fill="white" d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"/></svg>'
    cardContainer.appendChild(closeIcon)

    this.setupImageContainerEvents(cardContainer)

    const uploadButton = this.shadow.querySelector('.upload-button')
    if (!uploadButton.classList.contains('active')) {
      uploadButton.classList.add('active')
    }

    imgElement.addEventListener('click', () => {
      this.toggleImageSelection(imgElement)
    })
  }
}

customElements.define('gallery-modal-component', Gallery)
