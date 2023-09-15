let form_create_credential = `<!-- Button trigger modal -->
<button type="button" class="btn d-none btn-primary" data-bs-toggle="modal" data-bs-target="#{id_modal}" id="btn_toggle_{id_modal}">
    Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="{id_modal}" tabindex="-1" aria-labelledby="{id_modal}Label" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="{id_modal}Label">Crear credencial</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="mb-3 col-12">
                        <label for="input_server_{id_modal}" class="form-label">Servidor de la credencial (IP o DNS)<a href=""></a></label>
                        <input type="text" class="form-control" id="input_server_{id_modal}" aria-describedby="help_server_{id_modal}">
                        <div id="help_server_{id_modal}" class="form-text"></div>
                    </div>
                    <div class="mb-3 col-12">
                        <label for="input_user_{id_modal}" class="form-label">Usuario<a href=""></a></label>
                        <input type="text" class="form-control" id="input_user_{id_modal}" aria-describedby="help_user_{id_modal}">
                        <div id="help_user_{id_modal}" class="form-text"></div>
                    </div>
                    <div class="mb-3 col-12">
                        <label for="input_password_{id_modal}" class="form-label">Contraseña<a href=""></a></label>
                        <input type="text" class="form-control" id="input_password_{id_modal}" aria-describedby="help_password_{id_modal}">
                        <div id="help_password_{id_modal}" class="form-text"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="btn_savechanges_{id_modal}">Guardar cambios</button>
            </div>
        </div>
    </div>
</div>`

module.exports = {
    form_create_credential
}