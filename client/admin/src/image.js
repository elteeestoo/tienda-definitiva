class ImageComponent extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML = /* html */ `
          <style>
            * {
              margin: 0;
              padding: 0;
            }

      /* Estilo para los divs */
      .form-row{
        width: 100%;
      }

      .form-element{
        display: flex;
        justify-content: space-between;

      }
      .square {
        display: flex;
        justify-content: center;
        width: 150px;
        height: 130px;
        background-color: white;
        border-radius: 10px;
        text-align: center;

        margin: 10px;
        cursor: pointer;  }

    .square svg{
      fill: #1A2651;
      width: 12rem;
    }

    .square svg:hover{
      fill: brown;
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

        .square::before {
    font-size: 30px;
  }

  .square::before {
      font-size: 30px;
    }

        /* mdoal filtro VVVVVVVV*/
        .image-button svg{
          width: 10rem;
          fill: white;
        }

    </style>
            
    <div class="image-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,10L8,14H11V20H13V14H16M19,4H5C3.89,4 3,4.9 3,6V18A2,2 0 0,0 5,20H9V18H5V8H19V18H15V20H19A2,2 0 0,0 21,18V6A2,2 0 0,0 19,4Z" /></svg>
    </div>
      
    `
    const imageButton = this.shadow.querySelector('.image-button')

    imageButton?.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('showImageModal', {
      }))
    })
  }
}

customElements.define('image-component', ImageComponent)
