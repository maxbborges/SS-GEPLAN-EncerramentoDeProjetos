function servicetask84(attempt, message) {
	var nr_pasta = hAPI.getCardValue("nr_pasta");
	var idDocumento = hAPI.getCardValue("doc_id")
	var solicitacao = getValue("WKNumProces")
	var nm_Arquivo = "solic_" + solicitacao + "_assinado.pdf";
	
	var data = new Date().toLocaleDateString('pt-BR');
	var horario = new Date().toLocaleTimeString('pt-BR');
	
//	jsonStringify()
	dadosAssinantes=obterAssinantes()
	parametrosAssinatura=enviaParaAssinatura(nr_pasta,dadosAssinantes,idDocumento,nm_Arquivo,solicitacao,data,horario)
	rodarDataset(parametrosAssinatura)
	
}

function obterAssinantes(){
    log.info(">>> ENCERRAMENTO DE PROCESSOS TASK84")
    var solicitacao = getValue("WKNumProces")
    var arraySigners = [];
    var emails=[]
    var atividades = [19,29];
    var responsavelEnvio = ''
    var nomeResponsavelEnvio = ''
    var processInstanceId = DatasetFactory.createConstraint('processInstanceId', solicitacao, solicitacao, ConstraintType.MUST);
    
    for (var i = 0; i < atividades.length; i++) {
    	var constraints = new Array();
        var userMail = ''

        // Busca a atividade inserida
    	var choosedSequence = DatasetFactory.createConstraint('choosedSequence', atividades[i], atividades[i], ConstraintType.MUST);
        
        // Busca o id do usuário responsavel por uma tarefa
        constraints.push(processInstanceId)
        constraints.push(choosedSequence)
        var retornoProcessTask = DatasetFactory.getDataset('processTask', ["choosedColleagueId"], constraints, null);

        if (retornoProcessTask && retornoProcessTask.rowsCount > 0) {	
			userId = retornoProcessTask.getValue(retornoProcessTask.rowsCount-1, "choosedColleagueId");
		}
        if(userId == null || userId == ""){
    		log.info("#### >> ENCERRAMENTO DE PROCESSOS TASK84 - USERID")
            throw "ENCERRAMENTO DE PROCESSOS TASK84"
    	}

        // Busca o email do usuário através do ID dele
        constraints = [DatasetFactory.createConstraint("colleagueId", userId, userId, ConstraintType.MUST)];
        var retornoColleague = DatasetFactory.getDataset('colleague', ["mail"], constraints, null);

        if (retornoColleague && retornoColleague.rowsCount > 0) {
			userMail = retornoColleague.getValue(0, "mail");
		}
        if(userMail == null || userMail == ""){
    		log.info("#### >> ENCERRAMENTO DE PROCESSOS TASK84 - USERMAIL")
            throw "ENCERRAMENTO DE PROCESSOS TASK84"
    	}
        
        if(emails.indexOf(String(userMail))==-1){
        	emails.push(String(userMail))
        	constraints = []
	        constraints = [DatasetFactory.createConstraint('email', userMail, userMail, ConstraintType.MUST)];
	        assinante = DatasetFactory.getDataset('ds_busca_assinante', null, constraints, null);
	        
	        arraySigners.push({
	            nome: new String(assinante.getValue(0, 'nome')),
	            email: new String(userMail),
	            cpf: new String(assinante.getValue(0, 'cpf')),
	            tipo: new String(assinante.getValue(0, 'tipoAssinatura')),
	            status: "Pendente"
	        });
	        responsavelEnvio = userId
	        nomeResponsavelEnvio = assinante.getValue(0, 'nome')
        }
    }
    if (arraySigners.length == 0) {
        log.info("#### >> ENCERRAMENTO DE PROCESSOS TASK84 - ARRAYSIGNERS")
        throw "erro"
    }

    var retorno = {
    	"assinantes":arraySigners,
    	"idReponsavelEnvio":responsavelEnvio,
    	"nomeResponsavelEnvio":nomeResponsavelEnvio
    }
    return retorno
}

function enviaParaAssinatura(nr_pasta, dadosResponsavel, idDocumento, nm_Arquivo, numeroProcesso,data,horario) {
	log.info(">> enviaParaAssinatura TASK84");
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
        value: dadosResponsavel.idReponsavelEnvio
    };
    var nmRemetente = {
        name: "nmRemetente",
        value: dadosResponsavel.nomeResponsavelEnvio

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
        value: jsonStringify(dadosResponsavel.assinantes)
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

    log.info(">> enviaParaAssinatura TASK84-1");
    var constraints = [jsonSigners, nmArquivo, codArquivo, vrArquivo, codPasta, codRemetente, nmRemetente, formDescription, status, metodo, dataEnvio, horaEnvio, numSolic, choosedState];
    log.info("constraints " + constraints);
    log.info("jsonStringify(arraySigners)" + jsonStringify(constraints));
    log.info(">> enviaParaAssinatura TASK84-2");
    return constraints;
}

function rodarDataset(params) {
	log.info(">> RODARDATASET TASK84");
    constraints = []
    params.forEach(function (param) {
        constraints.push(DatasetFactory.createConstraint(param.name, param.value, param.value, ConstraintType.MUST));
    });
    log.info(">> RODARDATASET TASK84-1");
    if (constraints.length > 0) {
        var dsAux = DatasetFactory.getDataset("ds_auxiliar_vertsign", null, constraints, null);
        log.info(">> RODARDATASET TASK84-2");
        if(dsAux == null || dsAux.rowsCount == null){
    		throw "Falha de comunicação com a VertSign. "
    		+ "O TOTVS Fluig não conseguir realizar a comunicação, tente novamente mais tarde";
    	}
        if (dsAux.rowsCount > 0) {
            if (dsAux.getValue(0, "Result") === "OK") {
            	log.info("Enviando documento para assinatura");
            }
        }
    }
}

function jsonStringify(obj) {
	if(obj == null) {
	    return "null";
	} else if(Object.prototype.toString.call(obj) === '[object Array]') {
	    var str = "[";
	    if(obj.length > 0) {
	      str += jsonStringify(obj[0]);
	      for(var i = 1; i < obj.length; i++) {
	        str += "," + jsonStringify(obj[i]);
	      }
	    }
	    str += "]";
	    return str;
	} else if(Object.prototype.toString.call(obj) === '[object Object]') {
	    var str = "{";
	    var first = true;
	    for(attr in obj) {
	      str += (!first ? "," : "") + "\"" + attr + "\":" + jsonStringify(obj[attr]);
	      first = false;
	    }
	    str += "}";
	    return str;
	} else {
	    return "\"" + obj + "\"";
	}
};