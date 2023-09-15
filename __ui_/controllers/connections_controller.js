const fs = require('fs');

const filePath = __dirname.split(
  process.platform.includes("win") ? 'resources\\app.asar' :'ui.tunnmanagment.munakdigital.app'
)[0] + "/data.json"

const icons = require("./icons_controller")

const form_edit_connection = require("../views/form_edit_connection").form_edit_connection
const form_delete_connection = require("../views/form_delete_connection").form_delete_connection

// Switch conexión
function toggle_connection(
  category_name,
  connection
) {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return false
    } else {
      const jsonData = JSON.parse(data);
      jsonData['data'][category_name][connection]['state'] = jsonData['data'][category_name][connection]['state'] ? 0 : 1
      fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (error) => {
        if (!error) {
          location.reload()
        }
      });
    }
  })
}

// Switch conexión
function delete_connection(
  category_name,
  connection
) {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return false
    } else {
      const jsonData = JSON.parse(data);
      delete jsonData['data'][category_name][connection]
      fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (error) => {
        if (!error) {
          location.reload()
        }
      });
    }
  })
}

// Editar conexión
function edit_connection(
  category_name,
  key,
  connection_name,
  plocal,
  pbridge,
  pserver,
  trace
) {
  connection_name = connection_name.replace(/\ /g, "_")
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return false
    } else {
      const jsonData = JSON.parse(data);
      jsonData['data'][category_name][key]["ports"]["local"] = plocal
      jsonData['data'][category_name][key]["ports"]["bridge"] = pbridge
      jsonData['data'][category_name][key]["ports"]["server"] = pserver
      jsonData['data'][category_name][key]["trace"] = trace.replace(/\ /g, "").split(',')

      if (connection_name != key) {
        jsonData['data'][category_name][connection_name] = jsonData['data'][category_name][key]
        delete jsonData['data'][category_name][key]
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
function create_connection(
  category_name,
  connection_name,
  plocal,
  pbridge,
  pserver,
  trace
) {
  connection_name = connection_name.replace(/\ /g, "_")
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return false
    } else {
      const jsonData = JSON.parse(data);
      if (connection_name in jsonData['data'][category_name]) {
        return false
      }
      jsonData['data'][category_name][connection_name] = {}
      jsonData['data'][category_name][connection_name]["state"] = 0
      jsonData['data'][category_name][connection_name]["ports"] = {}
      jsonData['data'][category_name][connection_name]["ports"]["local"] = plocal
      jsonData['data'][category_name][connection_name]["ports"]["bridge"] = pbridge
      jsonData['data'][category_name][connection_name]["ports"]["server"] = pserver
      jsonData['data'][category_name][connection_name]["trace"] = trace.replace(/\ /g, "").split(',')

      fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (error) => {
        if (!error) {
          location.reload()
        }
      });
    }
  })
}

// Validar herramientas de las conexiones
function print_tools_conections() {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
    } else {
      const jsonData = JSON.parse(data);
      for (const cat_key in jsonData['data']) {
        if (Object.hasOwnProperty.call(jsonData['data'], cat_key)) {
          const cat_data = jsonData['data'][cat_key];
          for (const conx_key in cat_data) {
            if (Object.hasOwnProperty.call(cat_data, conx_key) && conx_key != 'state') {
              const connxn = cat_data[conx_key]
              let tools_content = document.getElementById(`conxns_tools_${cat_key}_${conx_key}`)
              let button_start = document.createElement('button')
              button_start.classList = `px-2 pt-1 btn ${connxn.state == 1 ? 'btn-outline-danger' : 'btn-outline-success'}`
              button_start.innerHTML = `${connxn.state == 1 ? icons.icons['pause'] : icons.icons['play']} ${connxn.state == 1 ? "Parar" : "Iniciar"}`
              button_start.onclick = function () {
                toggle_connection(cat_key, conx_key)
              }
              let button_edit = document.createElement('button')
              button_edit.classList = `px-2 pt-1 btn btn-outline-warning ms-2`
              button_edit.innerHTML = `${icons.icons['pencil']} Editar`
              button_edit.onclick = function () {
                const template = form_edit_connection 
                const contenido = template.replace(/\{id_modal}/g, `conx__modal_${cat_key}`)
                document.getElementById(`modal_edit_${cat_key}`)?.remove()
                let modal = document.createElement("div")
                modal.innerHTML = contenido
                modal.id = `modal_edit_${cat_key}`
                document.body.appendChild(modal)
                document.getElementById(`btn_savechanges_conx__modal_${cat_key}`).onclick = function () {
                  document.getElementById(`btn_savechanges_conx__modal_${cat_key}`).classList.remove("btn-primary")
                  document.getElementById(`btn_savechanges_conx__modal_${cat_key}`).classList.add("btn-success")
                  document.getElementById(`btn_savechanges_conx__modal_${cat_key}`).textContent = "Confirmar"
                  document.getElementById(`btn_savechanges_conx__modal_${cat_key}`).onclick = function () {
                    edit_connection(
                      cat_key,
                      conx_key,
                      document.getElementById(`input_name_conx__modal_${cat_key}`).value,
                      document.getElementById(`input_plocal_conx__modal_${cat_key}`).value,
                      document.getElementById(`input_pbridge_conx__modal_${cat_key}`).value,
                      document.getElementById(`input_pserver_conx__modal_${cat_key}`).value,
                      document.getElementById(`input_trace_conx__modal_${cat_key}`).value
                    )
                    document.getElementById(`btn_savechanges_conx__modal_${cat_key}`).classList.remove("btn-success")
                    document.getElementById(`btn_savechanges_conx__modal_${cat_key}`).classList.add("btn-danger")
                    document.getElementById(`btn_savechanges_conx__modal_${cat_key}`).textContent = "Acción incorrecta"
                  }
                }
                document.getElementById(`btn_toggle_conx__modal_${cat_key}`).click()
                document.getElementById(`input_name_conx__modal_${cat_key}`).value = conx_key
                document.getElementById(`input_plocal_conx__modal_${cat_key}`).value = connxn['ports']['local']
                document.getElementById(`input_pbridge_conx__modal_${cat_key}`).value = connxn['ports']['bridge']
                document.getElementById(`input_pserver_conx__modal_${cat_key}`).value = connxn['ports']['server']

                document.getElementById(`input_trace_conx__modal_${cat_key}`).value = connxn['trace']
                

              }

              let button_expand = document.createElement('button')
              button_expand.classList = `px-2 pt-1 btn btn-outline-info mx-2`
              button_expand.innerHTML = `${icons.icons['terminal']} Consola`
              button_expand.onclick = function () {
              }

              let button_delete = document.createElement('button')
              button_delete.classList = `px-2 pt-1 btn btn-outline-danger`
              button_delete.innerHTML = `${icons.icons['backspace']} Eliminar`
              button_delete.onclick = function () {
                const template = form_delete_connection 
                const contenido = template.replace(/\{id_modal}/g, `modal_delete_${cat_key}_${conx_key}`)
                document.getElementById(`modal_delete_${cat_key}_${conx_key}`)?.remove()
                let modal = document.createElement("div")
                modal.innerHTML = contenido
                modal.id = `modal_edit_${cat_key}`
                document.body.appendChild(modal)
                document.getElementById(`btn_savechanges_modal_delete_${cat_key}_${conx_key}`).onclick = function () {
                  document.getElementById(`btn_savechanges_modal_delete_${cat_key}_${conx_key}`).classList.remove("btn-primary")
                  document.getElementById(`btn_savechanges_modal_delete_${cat_key}_${conx_key}`).classList.add("btn-success")
                  document.getElementById(`btn_savechanges_modal_delete_${cat_key}_${conx_key}`).textContent = "Confirmar"
                  document.getElementById(`btn_savechanges_modal_delete_${cat_key}_${conx_key}`).onclick = function () {
                    delete_connection(cat_key, conx_key)
                    document.getElementById(`btn_savechanges_modal_delete_${cat_key}_${conx_key}`).classList.remove("btn-success")
                    document.getElementById(`btn_savechanges_modal_delete_${cat_key}_${conx_key}`).classList.add("btn-danger")
                    document.getElementById(`btn_savechanges_modal_delete_${cat_key}_${conx_key}`).textContent = "Acción incorrecta"
                  }
                }
                document.getElementById(`btn_toggle_modal_delete_${cat_key}_${conx_key}`).click()
                document.getElementById(`input_name_modal_delete_${cat_key}_${conx_key}`).value = conx_key
          

              }

              tools_content.appendChild(button_start)
              tools_content.appendChild(button_edit)
              tools_content.appendChild(button_expand)
              tools_content.appendChild(button_delete)
            }
          }
        }
      }
    }
  });
}

module.exports = {
  create_connection,
  print_tools_conections
}