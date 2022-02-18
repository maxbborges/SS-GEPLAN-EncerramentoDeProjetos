function replaceString(documentId){
	log.info("> Função REPLACE")
	var novoDocumentId = new java.lang.String(documentId)
	novoDocumentId = novoDocumentId.replace('.0','')
	return novoDocumentId
}