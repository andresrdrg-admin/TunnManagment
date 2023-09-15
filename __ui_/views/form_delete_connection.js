let form_delete_connection = `<!-- Button trigger modal -->
<button type="button" class="btn d-none btn-primary" data-bs-toggle="modal" data-bs-target="#{id_modal}" id="btn_toggle_{id_modal}">
    Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="{id_modal}" tabindex="-1" aria-labelledby="{id_modal}Label" aria-hidden="true">
    <div class="modal-dialog        ">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="{id_modal}Label">Eliminar Conexión</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>¿Está seguro de eliminar la conexión nombrada a continuación?</p>
                <div class="mb-3">
                    <label for="input_name_{id_modal}" class="form-label">Nombre de la conexión<a href=""></a></label>
                    <input type="text" readonly class="form-control" id="input_name_{id_modal}" aria-describedby="help_name_{id_modal}">
                    <div id="help_name_{id_modal}" class="form-text"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="btn_savechanges_{id_modal}">Eliminar</button>
            </div>
        </div>
    </div>
</div>`

module.exports = {
    form_delete_connection
}