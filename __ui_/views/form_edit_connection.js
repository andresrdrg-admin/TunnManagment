let form_edit_connection = `<!-- Button trigger modal -->
<button type="button" class="btn d-none btn-primary" data-bs-toggle="modal" data-bs-target="#{id_modal}" id="btn_toggle_{id_modal}">
    Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="{id_modal}" tabindex="-1" aria-labelledby="{id_modal}Label" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="{id_modal}Label">Editar conexión</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">

                    <div class="mb-3 col-4">
                        <label for="input_name_{id_modal}" class="form-label">Nombre de la conexión<a href=""></a></label>
                        <input type="text" class="form-control" id="input_name_{id_modal}" aria-describedby="help_name_{id_modal}">
                        <div id="help_name_{id_modal}" class="form-text"></div>
                    </div>
                    <div class="mb-3 col-4">
                        <label for="input_plocal_{id_modal}" class="form-label">Puerto local<a href=""></a></label>
                        <input type="text" class="form-control" id="input_plocal_{id_modal}" aria-describedby="help_plocal_{id_modal}">
                        <div id="help_plocal_{id_modal}" class="form-text"></div>
                    </div>
                    <div class="mb-3 col-4">
                        <label for="input_pbridge_{id_modal}" class="form-label">Puerto puente<a href=""></a></label>
                        <input type="text" class="form-control" id="input_pbridge_{id_modal}" aria-describedby="help_pbridge_{id_modal}">
                        <div id="help_pbridge_{id_modal}" class="form-text"></div>
                    </div>
                    <div class="mb-3 col-4">
                        <label for="input_pserver_{id_modal}" class="form-label">Puerto destino<a href=""></a></label>
                        <input type="text" class="form-control" id="input_pserver_{id_modal}" aria-describedby="help_pserver_{id_modal}">
                        <div id="help_pserver_{id_modal}" class="form-text"></div>
                    </div>
                    <div class="mb-3 col-8">
                        <label for="input_trace_{id_modal}" class="form-label">Traza de IPs</label>
                        <textarea class="form-control" id="input_trace_{id_modal}" rows="1"></textarea>
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
    form_edit_connection
}