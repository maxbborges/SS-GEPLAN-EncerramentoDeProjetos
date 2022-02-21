loading = {}
var data = new Date().toLocaleDateString('pt-BR');
var horario = new Date().toLocaleTimeString('pt-BR');

$(document).ready(function () {
    init();
    loading = FLUIGC.loading(window);
    $("#div_gerar_pdf").hide()

    $("#id_escopo").change(function() {
        if($("#id_escopo").val()=='Escopo concluído parcialmente'){
            $('[data-field-name="just_escopo"] label').append('<span class="required text-danger"><strong>*</strong></span>')
        } else {
            $('[data-field-name="just_escopo"] span').remove()
        }
    });

    $("#id_prazo").change(function() {
        if($("#id_prazo").val()!='Concluído dentro do prazo'){
            $('[data-field-name="just_prazo"] label').append('<span class="required text-danger"><strong>*</strong></span>')
        } else {
            $('[data-field-name="just_prazo"] span').remove()
        }
    });

    $("[name='Aprov_Dir_Exec']").change(function(){
        if ($(this).val()=='Sim'){
            $("#div_gerar_pdf").show()
        } else {
            $("#div_gerar_pdf").hide()
        }
    })
});

function init() {
    if (ATIVIDADE!=5&&ATIVIDADE!=0&&ATIVIDADE!=16){
        setTimeout(()=>{
            linhasColunas=$('[name="Quanto_aos_resu"] tbody tr input')
            for(i=4;i<linhasColunas.length;i++){
                $(linhasColunas[i]).prop("readonly",true);
            }
            if (MODE!='VIEW'){
            	$('tr:first-child>th:first-child').remove()
                $(".bpm-mobile-trash-column").remove()
            }
            
            $('[data-field-name="Quanto_aos_resu"] .btn').hide()
            
        },500)

        setTimeout(()=>{
            linhasColunas=$('[name="Quanto_ao_resul"] tbody tr input')
            for(i=4;i<linhasColunas.length;i++){
                $(linhasColunas[i]).prop("readonly",true);
            }
            $('[data-field-name="Quanto_ao_resul"] .btn').hide()
        },500)
    }
    
     if(ATIVIDADE==5||ATIVIDADE==0){
        setTimeout(()=>{
            $('tbody tr i')[1].remove()
        },500)
         wdkAddChild('tabledetailname1')
         $('#div_03').hide()
         $('#div_04').hide()
         $('#div_05').hide()
         $('#div_06').hide()
         $('#div_07').hide()
         $('#div_08').hide()
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
        if (MODE!='VIEW'){
            setTimeout(()=>{
                $('tbody tr i')[1].remove()
            },500)
        }
     }
}

function carregarLink() {
    let projectId = $("[name='id_do_projeto']").val();
    let link = (projectId == "" || projectId == null) ?
        "" : "https://system.scopi.com.br/#/projects/" + projectId + "/actions";
    $("[name='link_scopi']").val(link);
    $("#btAbrirScopi").prop('href', link);
    // $('#link_scopi').trigger('change');
}

function carregarUsuarioFluig(scopiUserId) {
    listaUsuarios = carregarListaUsuarios()
    loading.show();
    valor = ''

    if (listaUsuarios != null) {
        loading.hide();
        let email = listaUsuarios[scopiUserId].email;
        let constraints = [DatasetFactory.createConstraint("mail", email, email, ConstraintType.MUST)];
        let dataset = DatasetFactory.getDataset("colleague", ["colleagueId"], constraints, null)
        setTimeout(() => {
            $("[name='matricula_resp_pelo_proj']").val(dataset.values[0].colleagueId);
        }, 500);
    } else {
        loading.hide();
        console.log('erro')
    }
    return valor
}

function carregarListaUsuarios() {
    loading.show();
    listaUsuarios = {};
    let dataset = DatasetFactory.getDataset("scopi_consulta_usuarios", null, null, null)
    for (var i = 0; i < dataset.values.length; i++) {
        let user = dataset.values[i];
        listaUsuarios[user.id] = user;
    }
    loading.hide();
    return listaUsuarios
}

function carregarObjetivoEstrategico(objective_id) {
    let constraints = [DatasetFactory.createConstraint("codigoObjetivo", objective_id, objective_id, ConstraintType.MUST)];
    let dataset = DatasetFactory.getDataset("sest_objetivos_estrategicos", null, constraints, null)
    setTimeout(() => {
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
            selectedItem.prevision_start, 'YYYY-MM-DD', true).format('DD/MM/YYYY'));
        $("[name='data_fim']").val(moment(
            selectedItem.prevision_end, 'YYYY-MM-DD', true).format('DD/MM/YYYY'));
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

function criarPDFAbertura(nr_pasta, nm_arquivo) {
    var pdf = new jsPDF('p', 'pt', 'a4');
    $(window).scrollTop(0);
    pdf.internal.scaleFactor = 2;
    var options = {
        pagesplit: true,
        'background': '#fff'
    };

    pdf.addHTML($('#form_content'), options, function () {
        var out = pdf.output('blob');
        var reader = new FileReader();
        reader.readAsDataURL(out);
        reader.onloadend = function () {
            base64data = reader.result;
            base64 = base64data;
            base64 = base64.split("data:application/pdf;base64,")[1];

            var constraintsDocument = new Array();
            constraintsDocument.push(DatasetFactory.createConstraint("nm_arquivo", nm_arquivo, nm_arquivo, ConstraintType.MUST));
            constraintsDocument.push(DatasetFactory.createConstraint("nr_pasta", nr_pasta, nr_pasta, ConstraintType.MUST));
            constraintsDocument.push(DatasetFactory.createConstraint("base64", base64, base64, ConstraintType.MUST));
            let dsDocument = DatasetFactory.getDataset('ds_grava_documento', null, constraintsDocument, null)

            if (dsDocument != null && dsDocument != undefined) {
                if (dsDocument.values.length > 0) {
                    documentId = dsDocument.values[0]["documentId"];
                    $("[name='doc_id']").val(documentId)
                    FLUIGC.toast({
                        message: 'Formulário do Processo gerado com sucesso.',
                        type: 'success'
                    });
                }
            }
        }
    });
}

function recuperaAssinantes() {
    // var processInstanceId = DatasetFactory.createConstraint('processInstanceId', solicitacao, solicitacao, ConstraintType.MUST);
    // var choosedSequence = DatasetFactory.createConstraint('choosedSequence', 19, 19, ConstraintType.MUST);

    var arraySigners = [];
    var atividades = [43];
    var responsavelEnvio = ''
    var nomeResponsavelEnvio = ''

    for (i = 0; i < atividades.length; i++) {
        let constraints = []
        var choosedSequence = {
            _field: "choosedSequence",
            _finalValue: atividades[i],
            _initialValue: atividades[i],
            _likeSearch: undefined,
            _type: 1
        }

        var processInstanceId = {
            _field: "processInstanceId",
            _finalValue: NUM_PROCESS,
            _initialValue: NUM_PROCESS,
            _likeSearch: undefined,
            _type: 1
        }

        // Busca o id do usuário responsavel por uma tarefa
        var retornoProcessTask = DatasetFactory.getDataset('processTask', ["choosedColleagueId"], [processInstanceId, choosedSequence], null);
        var userId = retornoProcessTask.values[0].choosedColleagueId
        responsavelEnvio = userId

        // Busca o email do usuário baseado no ID
        constraints = [DatasetFactory.createConstraint("colleagueId", userId, userId, ConstraintType.MUST)];
        var retornoColleague = DatasetFactory.getDataset('colleague', ["mail"], constraints, null);
        userMail = retornoColleague.values[0].mail

        // Busca os dados do assinante baseados no email
        constraints = []
        constraints = [DatasetFactory.createConstraint('email', userMail, userMail, ConstraintType.MUST)];
        assinante = DatasetFactory.getDataset('ds_busca_assinante', null, constraints, null);

        arraySigners.push({
            nome: new String(assinante.values[0].nome),
            // nome: new String(assinante.getValue(0, "nome")),
            email: new String(userMail),
            cpf: new String(assinante.values[0].cpf),
            // cpf: new String(assinante.getValue(0, "cpf")),
            tipo: new String(assinante.values[0].tipoAssinatura),
            // tipo: new String(assinante.getValue(0, "tipoAssinatura")), //"E",
            status: "Pendente"
        });
        nomeResponsavelEnvio = assinante.values[0].nome
    }

    if (arraySigners.length > 0) {
        FLUIGC.toast({
            message: arraySigners.length + ' assinantes verificados!',
            type: 'success'
        });
        return {
            'nome': nomeResponsavelEnvio,
            'id': responsavelEnvio,
            'arraySigners': arraySigners
        }
    }

}

function enviaParaAssinatura(nr_pasta, dadosResponsavel, idDocumento, nm_Arquivo, numeroProcesso) {
    // Cria registro de formulario
    var nmArquivo = {
        name: "nmArquivo",
        value: nm_Arquivo
    };
    var codArquivo = {
        name: "codArquivo",
        value: idDocumento
    };
    var vrArquivo = {
        name: "vrArquivo",
        value: '1000'
    };
    var codPasta = {
        name: "codPasta",
        value: nr_pasta
    };
    var codRemetente = {
        name: "codRemetente",
        value: dadosResponsavel.id
    };
    var nmRemetente = {
        name: "nmRemetente",
        value: dadosResponsavel.nome

    };
    var formDescription = {
        name: "formDescription",
        value: nm_Arquivo
    };
    var status = {
        name: "status",
        value: "Enviando para assinatura"
    };
    var metodo = {
        name: "metodo",
        value: "create"
    };

    var dataEnvio = {
        name: "dataEnvio",
        value: data
    };
    var jsonSigners = {
        name: "jsonSigners",
        value: jsonStringify(dadosResponsavel.arraySigners)
    };

    var horaEnvio = {
        name: "horaEnvio",
        value: horario
    };

    var numSolic = {
        name: "numSolic",
        value: numeroProcesso
    };

    var choosedState = {
        name: "choosedState",
        value: "45"
    };


    var constraints = [jsonSigners, nmArquivo, codArquivo, vrArquivo, codPasta, codRemetente, nmRemetente, formDescription, status, metodo, dataEnvio, horaEnvio, numSolic, choosedState];
    rodarDataset(constraints)
}

function anexaDocumentoAssinado(idDocumento, nr_pasta) {

    var constraints = [DatasetFactory.createConstraint('codArquivo', idDocumento, idDocumento, ConstraintType.MUST)];
    chaveArquivoAssinado = DatasetFactory.getDataset('ds_form_aux_vertsign', ["chaveArquivo"], constraints, null);
    var params = {
        // Request parameters
        "includeOriginal": "True",
        "includeManifest": "True",
        "zipped": "False",
    };

    $.ajax({
            url: "https://api-sbx.portaldeassinaturas.com.br/api/v2/document/package?key=" + chaveArquivoAssinado.values[0].chaveArquivo + "&" + $.param(params),
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Token", "0af0b25dd063404f892137a112831b6f");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function (data) {
            var nr_solicitacao = NUM_PROCESS;
            var nm_arquivo = "solic_" + nr_solicitacao + "_assinado.pdf";
            var constraintsDocument = new Array();
            constraintsDocument.push(DatasetFactory.createConstraint("nm_arquivo", nm_arquivo, nm_arquivo, ConstraintType.MUST));
            constraintsDocument.push(DatasetFactory.createConstraint("nr_pasta", nr_pasta, nr_pasta, ConstraintType.MUST));
            constraintsDocument.push(DatasetFactory.createConstraint("base64", data[0].bytes, data[0].bytes, ConstraintType.MUST));
            let dsDocument = DatasetFactory.getDataset('ds_grava_documento', null, constraintsDocument, null)
            if (dsDocument != null && dsDocument != undefined) {
                if (dsDocument.values.length > 0) {
                    documentId = dsDocument.values[0]["documentId"];
                    $("[name='doc_id']").val(documentId)
                    FLUIGC.toast({
                        message: 'Formulário assinado gerado com sucesso.',
                        type: 'success'
                    });
                }
            }
        })
        .fail(function () {
            alert("error");
        });
}

function verificaPDF() {
    $("#div_03").hide();
    $("#div_04").hide();
    $("#div_05").hide();
    $("#div_06").hide();
    $("#div_07").hide();
    $("#div_08").hide();

    var nr_pasta = "6793";
    $("[name='nr_pasta']").val('6793')
    var nr_solicitacao = NUM_PROCESS;
    var nm_arquivo = "solic_" + nr_solicitacao + ".pdf";

    criarPDFAbertura(nr_pasta, nm_arquivo)
    // setTimeout(() => {
    //     idDocumento = $("[name='doc_id']").val()
    //     dadosResponsavel = recuperaAssinantes()
    //     enviaParaAssinatura(nr_pasta, dadosResponsavel, idDocumento, nm_arquivo, nr_solicitacao)
    // }, 500)
    // anexaDocumentoAssinado(idDocumento,nr_pasta)

    $("#div_03").show();
    $("#div_04").show();
    $("#div_05").show();
    $("#div_06").show();
    $("#div_07").show();
    $("#div_08").show();
}

function jsonStringify(obj) {
    if (obj == null) {
        return "null";
    } else if (Object.prototype.toString.call(obj) === '[object Array]') {
        var str = "[";
        if (obj.length > 0) {
            str += jsonStringify(obj[0]);
            for (var i = 1; i < obj.length; i++) {
                str += "," + jsonStringify(obj[i]);
            }
        }
        str += "]";
        return str;
    } else if (Object.prototype.toString.call(obj) === '[object Object]') {
        var str = "{";
        var first = true;
        for (attr in obj) {
            str += (!first ? "," : "") + "\"" + attr + "\":" + jsonStringify(obj[attr]);
            first = false;
        }
        str += "}";
        return str;
    } else {
        return "\"" + obj + "\"";
    }
};

function rodarDataset(params) {
    constraints = []
    params.forEach(function (param) {
        constraints.push(DatasetFactory.createConstraint(param.name, param.value, param.value, ConstraintType.MUST));
    });

    if (constraints.length > 0) {
        var dsAux = DatasetFactory.getDataset("ds_auxiliar_vertsign", null, constraints, null);
        FLUIGC.toast({
            message: 'Documento enviado para Assinatura',
            type: 'success'
        });
    }
}