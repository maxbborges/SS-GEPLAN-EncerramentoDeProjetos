function beforeTaskSave(colleagueId,nextSequenceId,userList){
    var docs = hAPI.listAttachments();
    var solicitacao = getValue("WKNumProces");
    var atividade = getValue("WKNumState")

    if (atividade==29){
    	if (hAPI.getCardValue("Ajus_Dir_Execu")=="Sim"){
            hAPI.attachDocument(hAPI.getCardValue("doc_id"));
    	}        
    }
}