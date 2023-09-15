const fs = require('fs');

const filePath = __dirname.split(
  process.platform.includes("win") ? 'resources\\app.asar' :'ui.tunnmanagment.munakdigital.app'
)[0] + "/data.json"

const category_controller = require("./controllers/category_controller")
const connection_controller = require("./controllers/connections_controller")
const credentials_controller = require("./controllers/credentials_controller")

const form_create_category = require("./views/form_create_category").form_create_category
const form_create_credential = require("./views/form_create_credential").form_create_credential

function create_category() {
  const template =  form_create_category
  const cat_key = 'new_category'
  const contenido = template.replace(/\{id_modal}/g, `__modal_${cat_key}`)
  document.getElementById(`modal_edit_${cat_key}`)?.remove()
  let modal = document.createElement("div")
  modal.innerHTML = contenido
  modal.id = `modal_edit_${cat_key}`
  document.body.appendChild(modal)
  document.getElementById(`btn_savechanges___modal_${cat_key}`).onclick = function () {
      document.getElementById(`btn_savechanges___modal_${cat_key}`).classList.remove("btn-primary")
      document.getElementById(`btn_savechanges___modal_${cat_key}`).classList.add("btn-success")
      document.getElementById(`btn_savechanges___modal_${cat_key}`).textContent = "Confirmar"
      document.getElementById(`btn_savechanges___modal_${cat_key}`).onclick = function () {
          category_controller.create_category(document.getElementById(`input_name___modal_${cat_key}`).value)
          document.getElementById(`btn_savechanges___modal_${cat_key}`).classList.remove("btn-success")
          document.getElementById(`btn_savechanges___modal_${cat_key}`).classList.add("btn-danger")
          document.getElementById(`btn_savechanges___modal_${cat_key}`).textContent = "Acción incorrecta"
      }
  }
  document.getElementById(`btn_toggle___modal_${cat_key}`).click()
  document.getElementById(`input_name___modal_${cat_key}`).value = cat_key

}


function create_credential() {
  const cat_key = 'new_credential'
  const template = form_create_credential
  const contenido = template.replace(/\{id_modal}/g, `__modal_${cat_key}`)
  document.getElementById(`modal_edit_${cat_key}`)?.remove()
  let modal = document.createElement("div")
  modal.innerHTML = contenido
  modal.id = `modal_edit_${cat_key}`
  document.body.appendChild(modal)
  document.getElementById(`btn_savechanges___modal_${cat_key}`).onclick = function () {
      document.getElementById(`btn_savechanges___modal_${cat_key}`).classList.remove("btn-primary")
      document.getElementById(`btn_savechanges___modal_${cat_key}`).classList.add("btn-success")
      document.getElementById(`btn_savechanges___modal_${cat_key}`).textContent = "Confirmar"
      document.getElementById(`btn_savechanges___modal_${cat_key}`).onclick = function () {
          credentials_controller.create_credential(
            document.getElementById(`input_server___modal_${cat_key}`).value,
            document.getElementById(`input_user___modal_${cat_key}`).value,
            document.getElementById(`input_password___modal_${cat_key}`).value,
            )
          document.getElementById(`btn_savechanges___modal_${cat_key}`).classList.remove("btn-success")
          document.getElementById(`btn_savechanges___modal_${cat_key}`).classList.add("btn-danger")
          document.getElementById(`btn_savechanges___modal_${cat_key}`).textContent = "Acción incorrecta"
      }
  }
  document.getElementById(`btn_toggle___modal_${cat_key}`).click()
  document.getElementById(`input_server___modal_${cat_key}`).value = cat_key


}

function read_file() {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
    } else {
      const jsonData = JSON.parse(data);
      for (const cat_key in jsonData['data']) {
        if (Object.hasOwnProperty.call(jsonData['data'], cat_key)) {
          const cat_data = jsonData['data'][cat_key];

          // Contruir Categoria de la tabla
          let tr_add_category = document.createElement('tr')
          let title = document.createElement('th')
          title.scope = "row"
          title.textContent = cat_key
          tr_add_category.appendChild(title)
          let state = document.createElement('th')
          state.textContent = cat_data.state == 1 ? "Activo" : "Inactivo"
          tr_add_category.appendChild(state)
          let tools = document.createElement('th')
          tools.id = `tools_${cat_key}`
          tr_add_category.appendChild(tools)

          // Contruir Subcategorias de la tabla
          let tr_add_subcategories = document.createElement('tr')
          let td_subcat = document.createElement('td')
          td_subcat.colSpan = 4
          td_subcat.classList = "p-0 m-0"

          // Contruir tabla de las conexiones de la categoria
          let table_subcat = document.createElement('table')
          // Header de tabla
          let thead_table = document.createElement('thead')
          let tr_thead = document.createElement('tr')
          let columns = [
            "Nombre", "P. Local", "P. puente", "P. destino", "Traza", "Herramientas"
          ]
          // Crear Header de las conexiones 
          columns.forEach(elm => {
            let th = document.createElement('th')
            th.textContent = elm
            tr_thead.appendChild(th)
          })
          thead_table.appendChild(tr_thead)
          table_subcat.id = `table_conxns_${cat_key}`
          table_subcat.className = "table mb-2 ms-5 p-0 m-0 table-striped table-hover table-bordered table-md table-responsive-lg"
          table_subcat.appendChild(thead_table)
          let tbody_table = document.createElement('tbody')
          
          // Llenar tabla de conexiones
          for (const conx_key in cat_data) {
            if (Object.hasOwnProperty.call(cat_data, conx_key)) {
              let tr_tbody = document.createElement('tr')
              const connxn = cat_data[conx_key]
              if (conx_key != 'state') {
                let td_name = document.createElement('td')
                td_name.textContent = conx_key
                tr_tbody.appendChild(td_name)

                let td_port_local = document.createElement('td')
                td_port_local.textContent = connxn['ports']['local']
                tr_tbody.appendChild(td_port_local)

                let td_port_bridge = document.createElement('td')
                td_port_bridge.textContent = connxn['ports']['bridge']
                tr_tbody.appendChild(td_port_bridge)

                let td_port_server = document.createElement('td')
                td_port_server.textContent = connxn['ports']['server']
                tr_tbody.appendChild(td_port_server)

                let td_trace = document.createElement('td')
                td_trace.textContent = JSON.stringify(connxn['trace'])
                tr_tbody.appendChild(td_trace)

                let td_tools = document.createElement('td')
                td_tools.id = `conxns_tools_${cat_key}_${conx_key}`
                tr_tbody.appendChild(td_tools)
              }
              tbody_table.appendChild(tr_tbody)
              table_subcat.appendChild(tbody_table)
            }
          }

          let title_connection = document.createElement('p')
          title_connection.classList = "mb-1 mt-2 ms-3 p-0"
          title_connection.textContent = `> Conexiones de la categoría ${cat_key}`
          td_subcat.appendChild(title_connection)
          td_subcat.appendChild(table_subcat)
          tr_add_subcategories.appendChild(td_subcat)

          document.getElementById("body_categories").appendChild(tr_add_category)
          document.getElementById("body_categories").appendChild(tr_add_subcategories)

        }
      }
      category_controller.print_tools_category()
      connection_controller.print_tools_conections()
    }
  });
}

function read_credentials() {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
    } else {
      const jsonData = JSON.parse(data);
      for (const credent_key in jsonData['credentials']) {
        if (Object.hasOwnProperty.call(jsonData['credentials'], credent_key)) {
          const cat_data = jsonData['credentials'][credent_key];

          // Contruir Categoria de la tabla
          let tr_add_credential = document.createElement('tr')
          let server = document.createElement('th')
          server.scope = "row"
          server.textContent = credent_key
          tr_add_credential.appendChild(server)
          
          let user = document.createElement('th')
          user.textContent = cat_data.user
          tr_add_credential.appendChild(user)

          let password = document.createElement('th')
          password.textContent = cat_data.password
          tr_add_credential.appendChild(password)

          let tools = document.createElement('th')
          tools.id = `credential_tools_${credent_key}`
          tr_add_credential.appendChild(tools)

          document.getElementById("body_credentials").appendChild(tr_add_credential)

        }
      }
      credentials_controller.print_tools_credentials()
    }
  });
}

read_file(`${filePath}`);
read_credentials(`${filePath}`);
document.getElementById('add_category').onclick = function(){ create_category()}
document.getElementById('add_credential').onclick = function(){ create_credential()}