const fs = require('fs');

const filePath = __dirname.split(
  process.platform.includes("win") ? 'resources\\app.asar' :'ui.tunnmanagment.munakdigital.app'
)[0] + "/data.json"

const icons = require("./icons_controller")

const form_edit_credential = require("../views/form_edit_credential").form_edit_credential
const form_delete_credential = require("../views/form_delete_credential").form_delete_credential

// Switch conexión
function delete_credential(
  credential
) {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return false
    } else {
      const jsonData = JSON.parse(data);
      delete jsonData['credentials'][credential]
      fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (error) => {
        if (!error) {
          location.reload()
        }
      });
    }
  })
}

// Editar conexión
function edit_credential(
  key,
  credential_name,
  user,
  password
) {
  credential_name = credential_name.replace(/\ /g, "_")
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return false
    } else {
      const jsonData = JSON.parse(data);
      jsonData['credentials'][key]["user"] = user
      jsonData['credentials'][key]["password"] = password

      if (credential_name != key) {
        jsonData['credentials'][credential_name] = jsonData['credentials'][key]
        delete jsonData['credentials'][key]
      }

      fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (error) => {
        if (!error) {
          location.reload()
        }
      });
    }
  })
}

// Crear conexión
function create_credential(
  credential_name,
  user,
  password
) {
  credential_name = credential_name.replace(/\ /g, "_")
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return false
    } else {
      const jsonData = JSON.parse(data);
      if (credential_name in jsonData['credentials']) {
        return false
      }
      jsonData['credentials'][credential_name] = {}
      jsonData['credentials'][credential_name]["user"] = user
      jsonData['credentials'][credential_name]["password"] = password

      fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (error) => {
        if (!error) {
          location.reload()
        }
      });
    }
  })
}

// Validar herramientas de las conexiones
function print_tools_credentials() {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
    } else {
      const jsonData = JSON.parse(data);
      const credentials_data = jsonData['credentials']
      for (const credential_key in credentials_data) {
        if (Object.hasOwnProperty.call(credentials_data, credential_key)) {
          const credential = credentials_data[credential_key]
          let tools_content = document.getElementById(`credential_tools_${credential_key}`)

          let button_edit = document.createElement('button')
          button_edit.classList = `px-2 pt-1 btn btn-outline-warning ms-2`
          button_edit.innerHTML = `${icons.icons['pencil']} Editar`
          button_edit.onclick = function () {
            const template = form_edit_credential 
            const contenido = template.replace(/\{id_modal}/g, `__modal_${cat_key}`)
            document.getElementById(`modal_edit_${credential_key}`)?.remove()
            let modal = document.createElement("div")
            modal.innerHTML = contenido
            modal.id = `modal_edit_${credential_key}`
            document.body.appendChild(modal)
            document.getElementById(`btn_savechanges_credential__modal_${credential_key}`).onclick = function () {
              document.getElementById(`btn_savechanges_credential__modal_${credential_key}`).classList.remove("btn-primary")
              document.getElementById(`btn_savechanges_credential__modal_${credential_key}`).classList.add("btn-success")
              document.getElementById(`btn_savechanges_credential__modal_${credential_key}`).textContent = "Confirmar"
              document.getElementById(`btn_savechanges_credential__modal_${credential_key}`).onclick = function () {
                edit_credential(
                  credential_key,
                  document.getElementById(`input_server_credential__modal_${credential_key}`).value,
                  document.getElementById(`input_user_credential__modal_${credential_key}`).value,
                  document.getElementById(`input_password_credential__modal_${credential_key}`).value,
                )
                document.getElementById(`btn_savechanges_credential__modal_${credential_key}`).classList.remove("btn-success")
                document.getElementById(`btn_savechanges_credential__modal_${credential_key}`).classList.add("btn-danger")
                document.getElementById(`btn_savechanges_credential__modal_${credential_key}`).textContent = "Acción incorrecta"
              }
            }
            document.getElementById(`btn_toggle_credential__modal_${credential_key}`).click()
            document.getElementById(`input_server_credential__modal_${credential_key}`).value = credential_key
            document.getElementById(`input_user_credential__modal_${credential_key}`).value = credential['user']
            document.getElementById(`input_password_credential__modal_${credential_key}`).value = credential['password']

          }

          let button_delete = document.createElement('button')
          button_delete.classList = `px-2 pt-1 btn btn-outline-danger ms-2`
          button_delete.innerHTML = `${icons.icons['backspace']} Eliminar`
          button_delete.onclick = function () {
            const template = form_delete_credential 
            const contenido = template.replace(/\{id_modal}/g, `__modal_${cat_key}`)
            document.getElementById(`modal_delete_${credential_key}`)?.remove()
            let modal = document.createElement("div")
            modal.innerHTML = contenido
            modal.id = `modal_edit_${credential_key}`
            document.body.appendChild(modal)
            document.getElementById(`btn_savechanges___modal_delete_${credential_key}`).onclick = function () {
              document.getElementById(`btn_savechanges___modal_delete_${credential_key}`).classList.remove("btn-primary")
              document.getElementById(`btn_savechanges___modal_delete_${credential_key}`).classList.add("btn-success")
              document.getElementById(`btn_savechanges___modal_delete_${credential_key}`).textContent = "Confirmar"
              document.getElementById(`btn_savechanges___modal_delete_${credential_key}`).onclick = function () {
                delete_credential(credential_key)
                document.getElementById(`btn_savechanges___modal_delete_${credential_key}`).classList.remove("btn-success")
                document.getElementById(`btn_savechanges___modal_delete_${credential_key}`).classList.add("btn-danger")
                document.getElementById(`btn_savechanges___modal_delete_${credential_key}`).textContent = "Acción incorrecta"
              }
            }
            document.getElementById(`btn_toggle___modal_delete_${credential_key}`).click()
            document.getElementById(`input_name___modal_delete_${credential_key}`).value = credential_key
          

          }

          tools_content.appendChild(button_edit)
          tools_content.appendChild(button_delete)
        }
      }
    }
  });
}

module.exports = {
  create_credential,
  print_tools_credentials
}