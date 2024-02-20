class TableRecords extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.rows = null
  }

  connectedCallback () {
    this.loadData().then(() => this.render())
    document.addEventListener('refresh-table', this.handleRefreshTable.bind(this))
  }

  handleRefreshTable (event) {
    this.loadData().then(() => this.render())
  }

  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`)
    const data = await response.json()
    this.rows = data.rows
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
            .filter {
  align-items: center;
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.2rem 0;
}

.filter-button button svg {
  width: 2rem;
}

.filter-button button svg path {
  fill: hsl(227, 51%, 31%);
}

.filter-button button:hover svg path {
  fill: hsl(227, 51%, 71%);
}

.table-component {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem
}

.table-records{
  padding: 0.5rem;
  border-radius: 10px;
  max-height: 600px;
  margin-left: -2rem;
  padding-left: 1rem;
  padding-right: 1.5rem;
  overflow-x: hidden;
  overflow-y: scroll;
}
/* width */
::-webkit-scrollbar {
  width: 12px;
  border-radius: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
  border: solid 2px black
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: hsl(228, 71%, 51%);
  border-radius: 10px;
  border: solid 2px hsl(226, 64%, 66%)
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: hsl(227, 51%, 21%);
}
.table-record{
  border: solid 3px white;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 1rem
}

.table-record:hover{
  transform: scale(1.03);
  transition: 0.2s;
  box-shadow: 0 0 0.5rem 0 rgb(255, 255, 255);
}

.table-buttons {
  background-color: hsl(207, 85%, 69%);
  display: flex;
  border-radius: 7.5px 7.5px 0 0;
  gap: 0.5rem;
  justify-content: flex-end;
}

.edit-button button svg,
.delete-button button svg {
  width: 2rem;
}

.edit-button button svg path,
.delete-button button svg path {
  fill: hsl(0, 0%, 100%);
}

.edit-button button:hover svg path,
.delete-button button:hover svg path {
  fill: hsl(227, 51%, 31%);
}

.table-data {
  background-color: hsl(226, 64%, 66%);
  border-radius: 0 0 7.5px 7.5px;
  padding: 0.5rem;
}

.table-data ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.table-data ul li span {
  font-weight: 700;
}

.table-data ul li span::after {
  content: ":";
  margin-right: 0.5rem;
}
        </style>
    

        <section class="table-component">
          <section class="filter">
            <div class="filter-button">
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>filter-menu</title>
                    <path
                    d="M11 11L16.76 3.62A1 1 0 0 0 16.59 2.22A1 1 0 0 0 16 2H2A1 1 0 0 0 1.38 2.22A1 1 0 0 0 1.21 3.62L7 11V16.87A1 1 0 0 0 7.29 17.7L9.29 19.7A1 1 0 0 0 10.7 19.7A1 1 0 0 0 11 18.87V11M13 16L18 21L23 16Z" />
                </svg>
                </button>
            </div>
          </section>
        </section>
        <section class="table-records">

        </section>
        `
    this.rows.forEach(row => {
    // Crear elementos dinámicamente con JavaScript
      const section = this.shadow.querySelector('.table-records')

      const article = document.createElement('article')
      article.classList.add('table-record')

      const buttonsDiv = document.createElement('div')
      buttonsDiv.classList.add('table-buttons')

      const editButtonDiv = document.createElement('div')
      editButtonDiv.classList.add('edit-button')
      editButtonDiv.dataset.id = row.id
      const editButton = document.createElement('button')
      editButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>'
      editButtonDiv.appendChild(editButton)

      const deleteButtonDiv = document.createElement('div')
      deleteButtonDiv.classList.add('delete-button')
      deleteButtonDiv.dataset.id = row.id
      const deleteButton = document.createElement('button')
      deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>'
      deleteButtonDiv.appendChild(deleteButton)

      buttonsDiv.appendChild(editButtonDiv)
      buttonsDiv.appendChild(deleteButtonDiv)

      const tableDataDiv = document.createElement('div')
      tableDataDiv.classList.add('table-data')

      const ul = document.createElement('ul')
      const nameLi = document.createElement('li')
      nameLi.innerHTML = '<span>Nombre</span>' + row.name
      const emailLi = document.createElement('li')
      emailLi.innerHTML = '<span>Email</span>' + row.email

      ul.appendChild(nameLi)
      ul.appendChild(emailLi)

      tableDataDiv.appendChild(ul)

      article.appendChild(buttonsDiv)
      article.appendChild(tableDataDiv)
      section.appendChild(article)
    })

    const filterButton = this.shadow.querySelector('.filter-button')

    filterButton?.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('showFilterModal', {
      }))
    })

    const tableRecord = this.shadow.querySelector('.table-records')

    tableRecord?.addEventListener('click', async (event) => {
      if (event.target.closest('.edit-button')) {
        const editButtonDiv = event.target.closest('.edit-button')
        const id = editButtonDiv.dataset.id
        const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/${id}`)
        const data = await response.json()

        document.dispatchEvent(new CustomEvent('showElement', {
          detail: {
            data
          }
        }))
      }

      if (event.target.closest('.delete-button')) {
        document.dispatchEvent(new CustomEvent('showDeleteModal', {

        }))
      }
    })
  }
}

customElements.define('table-records-component', TableRecords)
