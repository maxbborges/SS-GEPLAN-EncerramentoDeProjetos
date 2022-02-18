function beforeTaskSave(colleagueId,nextSequenceId,userList){
    var docs = hAPI.listAttachments();
    var solicitacao = getValue("WKNumProces");
    var atividade = getValue("WKNumState")

    if (atividade==29){
        hAPI.attachDocument(hAPI.getCardValue("doc_id"));
            var docs = hAPI.listAttachments();
            log.info(docs)
            if (docs.size() > 0) {
                log.info(docs)
        }
        
    }
}