loading = {}
$(document).ready(function () {
    init();
    loading = FLUIGC.loading(window);
});

function init() {
    if(ATIVIDADE==5||ATIVIDADE==0){
        wdkAddChild('tabledetailname1')
        $('#div_03').hide()
        $('#div_04').hide()
        $('#div_05').hide()
        $('#div_06').hide()
        $('#div_07').hide()
    }
    if(ATIVIDADE==6){
        $('#div_04').hide()
        $('#div_05').hide()
        $('#div_06').hide()
        $('#div_07').hide()
    }
    if(ATIVIDADE==43){
        $('#div_05').hide()
        $('#div_06').hide()
        $('#div_07').hide()
    }
    if(ATIVIDADE==12){
        $('#div_06').hide()
        $('#div_07').hide()
    }
    if(ATIVIDADE==19){
        $('#div_07').hide()
    }
    if(ATIVIDADE==29){

    }
    if(ATIVIDADE==16){

    }
}

function carregarLink(){
    let projectId = $("[name='id_do_projeto']").val();
    let link = (projectId == "" || projectId == null)
        ? "" : "https://system.scopi.com.br/#/projects/"+projectId+"/actions";
    $("[name='link_scopi']").val(link);
	$("#btAbrirScopi").prop('href', link);
    // $('#link_scopi').trigger('change');
}

function carregarUsuarioFluig(scopiUserId){
    listaUsuarios=carregarListaUsuarios()
    loading.show();
    valor = ''
    
    if(listaUsuarios != null){
        loading.hide();
        let email = listaUsuarios[scopiUserId].email;
        let constraints = [ DatasetFactory.createConstraint("mail", email, email, ConstraintType.MUST) ];
        let dataset = DatasetFactory.getDataset("colleague", ["colleagueId"], constraints, null)
        setTimeout(()=>{
            $("[name='matricula_resp_pelo_proj']").val(dataset.values[0].colleagueId);
        }, 500);
    }
    else{
        loading.hide();
        console.log('erro')
    }
    return valor
}

function carregarListaUsuarios(){
    loading.show();
    listaUsuarios = {};
    let dataset = DatasetFactory.getDataset("scopi_consulta_usuarios", null, null, null)
    for(var i = 0; i < dataset.values.length; i++) {
        let user = dataset.values[i];
        listaUsuarios[user.id] = user;
    }
    loading.hide();
    return listaUsuarios
}

function carregarObjetivoEstrategico(objective_id){
    let constraints = [ DatasetFactory.createConstraint("codigoObjetivo", objective_id, objective_id, ConstraintType.MUST) ];
    let dataset = DatasetFactory.getDataset("sest_objetivos_estrategicos", null, constraints, null)
    setTimeout(()=>{
        $("[name='matricula_GOE']").val(dataset.values[0].matriculaResponsavel);
        $("[name='GOE']").val(dataset.values[0].responsavel);
        $("[name='id_OE']").val(dataset.values[0].codigoObjetivo);
        $("[name='OE']").val(dataset.values[0].objetivoEstrategico);
    }, 300);
    
}

function setSelectedZoomItem(selectedItem) {
    if (selectedItem.inputId == "Nome_do_projeto") {
        $("[name='id_do_projeto']").val(selectedItem.ID);
        $("[name='data_inicio']").val(moment(
            selectedItem.prevision_start
            , 'YYYY-MM-DD', true).format('DD/MM/YYYY'));
        $("[name='data_fim']").val(moment(
            selectedItem.prevision_end
            , 'YYYY-MM-DD', true).format('DD/MM/YYYY'));
        $("[name='Descri_projeto']").val(selectedItem.description);
        $("[name='id_area_responsavel']").val(selectedItem.division_id);
		$("[name='area_responsave']").val(selectedItem.division_name);
		$("[name='resp_pelo_proj']").val(selectedItem.coordinator_name);

        carregarUsuarioFluig(selectedItem.coordinator_id)
        carregarObjetivoEstrategico(selectedItem.objective_id)
        carregarLink()
    }

}

function removedZoomItem(removedItem) {
    $("[name='id_do_projeto']").val('');
    $("[name='data_inicio']").val('');
    $("[name='data_fim']").val('');
    $("[name='Descri_projeto']").val('');
    $("[name='id_area_responsavel']").val('');
	$("[name='area_responsave']").val('');
    $("[name='matricula_resp_pelo_proj']").val('');
	$("[name='resp_pelo_proj']").val('');
    $("[name='matricula_GOE']").val('');
    $("[name='GOE']").val('');
    $("[name='id_OE']").val('');
    $("[name='OE']").val('');

    carregarLink();
}