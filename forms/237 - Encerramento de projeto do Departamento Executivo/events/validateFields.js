function validateForm(form) {
    var activity = getValue('WKNumState');
    if ((form.getValue("Nome_do_projeto") == null || form.getValue("Nome_do_projeto") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Nome do projeto n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("Descri_projeto") == null || form.getValue("Descri_projeto") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Descri\u00E7\u00E3o do projeto n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("area_responsave") == null || form.getValue("area_responsave") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "\u00C1rea Respons\u00E1vel n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("resp_pelo_proj") == null || form.getValue("resp_pelo_proj") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Respons\u00E1vel pelo projeto n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("link_scopi") == null || form.getValue("link_scopi") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Endere\u00E7o do projeto no SCOPI n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("data_inicio") == null || form.getValue("data_inicio") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Data de in\u00EDcio n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("data_fim") == null || form.getValue("data_fim") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Data de fim n\u00E3o pode ser vazio.";
    }

    if (activity==0||activity==5){
        if (form.getValue("prazo") == null || form.getValue("prazo") == "" || form.getValue("prazo") != "Concluído dentro do prazo") {
            if(form.getValue("prazo") != "Concluído dentro do prazo"){
                if (form.getValue("prazo") == null || form.getValue("prazo") == ""){
                    throw "Quanto ao prazo n\u00E3o pode ser vazio!";
                }else if(form.getValue("just_prazo") == ""){
                    throw "Justifique o prazo!";
                }
            } else{
                throw "Quanto ao prazo n\u00E3o pode ser vazio.";
            }
            
        }
        if (form.getValue("escopo") == null || form.getValue("escopo") == "" || form.getValue("escopo") == "Escopo concluído parcialmente") {
            if(form.getValue("escopo") == "Escopo concluído parcialmente"){
                if(form.getValue("just_escopo") == ""){
                    throw "Justifique o Escopo!";
                }
                
            } else{
                throw "Quanto ao escopo n\u00E3o pode ser vazio.";
            }
        }
    }
    if ((form.getValue("column1_1___1") == null || form.getValue("column1_1___1") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Nome da meta em resultado físico n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("column2_1___1") == null || form.getValue("column2_1___1") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Meta prevista em resultado físico n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("column3_1___1") == null || form.getValue("column3_1___1") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Meta realizada em resultado físico n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("column4_1___1") == null || form.getValue("column4_1___1") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "% realizado em resultado físico n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("column5_1___1") == null || form.getValue("column5_1___1") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Justificativa  em resultado físico n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("column1_2___1") == null || form.getValue("column1_2___1") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Nome do orçamento em resultado físico n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("column2_2___1") == null || form.getValue("column2_2___1") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Orçamento previsto em resultado físico n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("column3_2___1") == null || form.getValue("column3_2___1") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Orçamento realizado em resultado físico n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("column4_2___1") == null || form.getValue("column4_2___1") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "% realizado em resultado físico n\u00E3o pode ser vazio.";
    }
    if ((form.getValue("column5_2___1") == null || form.getValue("column5_2___1") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Justificativa  em resultado físico n\u00E3o pode ser vazio.";
    }
    
    if ((form.getValue("doc_id") == null || 
    		form.getValue("doc_id") == "" || 
    		form.getValue("nr_pasta") == "" || 
    		form.getValue("nr_pasta") == null) && 
    		(getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true')) &&
    		activity == 29 && form.getValue("Aprov_Dir_Exec")=='Sim'
    ) {
        throw "Necessário Gerar o Formulário através do botão 'Gerar PDF' em Aprovação Diretoria Executiva!";
    }
    
}