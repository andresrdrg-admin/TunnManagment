const fs = require('fs');

const filePath = __dirname.split(
    process.platform.includes("win") ? 'resources\\app.asar' :'ui.tunnmanagment.munakdigital.app'
  )[0] + "/data.json"
  
const icons = require("./icons_controller")
const connection_controller = require("./connections_controller")

const form_create_connection = require("../views/form_create_connection").form_create_connection
const form_edit_category = require("../views/form_edit_category").form_edit_category
const form_delete_category = require("../views/form_delete_category").form_delete_category

// Eliminar categorias
function delete_category(
    category_name
) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return false
        } else {
            const jsonData = JSON.parse(data);
            delete jsonData['data'][category_name]
            fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (error) => {
                if (!error) {
                    location.reload()
                }
            });
        }
    })
}

// Editar categorias
function toggle_category(
    category_name
) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return false
        } else {
            const jsonData = JSON.parse(data);
            jsonData['data'][category_name]['state'] = jsonData['data'][category_name]['state'] ? 0 : 1
            fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (error) => {
                if (!error) {
                    location.reload()
                }
            });
        }
    })
}

// Editar categorias
function edit_name_category(
    category_name,
    category_name_new
) {
    category_name_new = category_name_new.replace(/\ /g, "_")
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return false
        } else {
            const jsonData = JSON.parse(data);
            if (category_name_new in jsonData['data']) {
                return false
            }
            jsonData['data'][category_name_new] = jsonData['data'][category_name]
            delete jsonData['data'][category_name]
            fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (error) => {
                if (!error) {
                    location.reload()
                }
            });
        }
    })
}

// Editar categorias
function create_category(
    category_name
) {
    category_name = category_name.replace(/\ /g, "_")
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return false
        } else {
            const jsonData = JSON.parse(data);
            if (category_name in jsonData['data']) {
                return false
            }
            jsonData['data'][category_name] = {"state":0}
            fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (error) => {
                if (!error) {
                    location.reload()
                }
            });
        }
    })
}

// Validar herramientas de las categorias
function print_tools_category() {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
        } else {
            const jsonData = JSON.parse(data);
            for (const cat_key in jsonData['data']) {
                if (Object.hasOwnProperty.call(jsonData['data'], cat_key)) {
                    const cat_data = jsonData['data'][cat_key];

                    let tools_content = document.getElementById(`tools_${cat_key}`)

                    let button_start = document.createElement('button')
                    button_start.classList = `px-2 pt-1 btn ${cat_data.state == 1 ? 'btn-outline-danger' : 'btn-outline-success'}`
                    button_start.innerHTML = `${cat_data.state == 1 ? icons.icons['pause'] : icons.icons['play']} ${cat_data.state == 1 ? "Pausar" : "Iniciar"}`
                    button_start.onclick = function () {
                        toggle_category(cat_key)
                    }

                    let button_edit = document.createElement('button')
                    button_edit.classList = `px-2 pt-1 btn btn-outline-warning ms-2`
                    button_edit.innerHTML = `${icons.icons['pencil']} Editar`
                    button_edit.onclick = function () {
                        const template = form_edit_category 
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
                                edit_name_category(cat_key, document.getElementById(`input_name___modal_${cat_key}`).value)
                                document.getElementById(`btn_savechanges___modal_${cat_key}`).classList.remove("btn-success")
                                document.getElementById(`btn_savechanges___modal_${cat_key}`).classList.add("btn-danger")
                                document.getElementById(`btn_savechanges___modal_${cat_key}`).textContent = "Acción incorrecta"
                            }
                        }
                        document.getElementById(`btn_toggle___modal_${cat_key}`).click()
                        document.getElementById(`input_name___modal_${cat_key}`).value = cat_key
                            

                    }

                    let button_add_conn = document.createElement('button')
                    button_add_conn.classList = `px-2 pt-1 btn btn-outline-dark ms-2`
                    button_add_conn.innerHTML = `${icons.icons['plus']} Agregar conexión`
                    button_add_conn.onclick = function () {
                        const template = form_create_connection 
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
                            connection_controller.create_connection(
                                cat_key,
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
        
                      }

                    let button_expand = document.createElement('button')
                    button_expand.classList = `px-2 pt-1 btn btn-outline-info mx-2`
                    button_expand.innerHTML = `${icons.icons['expand']} Expandir`
                    button_expand.onclick = function () {
                        document.getElementById(`table_conxns_${cat_key}`).classList.toggle("d-none")
                    }

                    let button_delete = document.createElement('button')
                    button_delete.classList = `px-2 pt-1 btn btn-outline-danger`
                    button_delete.innerHTML = `${icons.icons['backspace']} Eliminar`
                    button_delete.onclick = function () {
                        const template = form_delete_category 
                        const contenido = template.replace(/\{id_modal}/g, `__modal_delete_${cat_key}`)
                        document.getElementById(`modal_delete_${cat_key}`)?.remove()
                        let modal = document.createElement("div")
                        modal.innerHTML = contenido
                        modal.id = `modal_edit_${cat_key}`
                        document.body.appendChild(modal)
                        document.getElementById(`btn_savechanges___modal_delete_${cat_key}`).onclick = function () {
                            document.getElementById(`btn_savechanges___modal_delete_${cat_key}`).classList.remove("btn-primary")
                            document.getElementById(`btn_savechanges___modal_delete_${cat_key}`).classList.add("btn-success")
                            document.getElementById(`btn_savechanges___modal_delete_${cat_key}`).textContent = "Confirmar"
                            document.getElementById(`btn_savechanges___modal_delete_${cat_key}`).onclick = function () {
                                delete_category(cat_key)
                                document.getElementById(`btn_savechanges___modal_delete_${cat_key}`).classList.remove("btn-success")
                                document.getElementById(`btn_savechanges___modal_delete_${cat_key}`).classList.add("btn-danger")
                                document.getElementById(`btn_savechanges___modal_delete_${cat_key}`).textContent = "Acción incorrecta"
                            }
                        }
                        document.getElementById(`btn_toggle___modal_delete_${cat_key}`).click()
                        document.getElementById(`input_name___modal_delete_${cat_key}`).value = cat_key
                                 

                    }

                    tools_content.appendChild(button_start)
                    tools_content.appendChild(button_add_conn)
                    tools_content.appendChild(button_edit)
                    tools_content.appendChild(button_expand)
                    tools_content.appendChild(button_delete)
                }
            }
        }
    });
}

module.exports = {
    create_category,
    print_tools_category,
};