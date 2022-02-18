function enableFields(form) {
    var activity = getValue('WKNumState');
    if (activity!=16){
        form.setEnabled('Conside_solicit', false);
    }
    if (activity == 16) {
        form.setEnabled('Ajustes_Di_adj', false);
        form.setEnabled('Ajustes_P_E', false);
        form.setEnabled('Ajustes_R_P', false);
        form.setEnabled('Valid_P_E', false);
        form.setEnabled('Aprov_RP', false);
        form.setEnabled('Aprov_Dir_Exec', false);
        form.setEnabled('Ajus_Dir_Execu', false);
        form.setEnabled('Aprov_R_OE', false);
        form.setEnabled('Ajustes_R_OE', false);
        form.setEnabled('aprov_DirAdj', false);
    }
    if (activity == 19) {
        form.setEnabled('Nome_do_projeto', false);
        form.setEnabled('area_responsave', false);
        form.setEnabled('resp_pelo_proj', false);
        form.setEnabled('link_scopi', false);
        form.setEnabled('prazo', false);
        form.setEnabled('just_prazo', false);
        form.setEnabled('escopo', false);
        form.setEnabled('just_escopo', false);
        form.setEnabled('Aprov_RP', false);
        form.setEnabled('Valid_P_E', false);
        form.setEnabled('Ajustes_R_P', false);
        form.setEnabled('Ajustes_P_E', false);
        form.setEnabled('Ajus_Dir_Execu', false);
        form.setEnabled('Aprov_Dir_Exec', false);
        form.setEnabled('Conside_solicit', false);
        form.setEnabled('Descri_projeto', false);
        form.setEnabled('Ajustes_R_OE', false);
        form.setEnabled('Aprov_R_OE', false);
    }
    if (activity == 6) {
        form.setEnabled('Nome_do_projeto', false);
        form.setEnabled('area_responsave', false);
        form.setEnabled('resp_pelo_proj', false);
        form.setEnabled('link_scopi', false);
        form.setEnabled('prazo', false);
        form.setEnabled('just_prazo', false);
        form.setEnabled('escopo', false);
        form.setEnabled('just_escopo', false);
        form.setEnabled('Valid_P_E', false);
        form.setEnabled('aprov_DirAdj', false);
        form.setEnabled('Ajustes_P_E', false);
        form.setEnabled('Ajustes_Di_adj', false);
        form.setEnabled('Ajus_Dir_Execu', false);
        form.setEnabled('Aprov_Dir_Exec', false);
        form.setEnabled('Conside_solicit', false);
        form.setEnabled('Descri_projeto', false);
        form.setEnabled('Aprov_R_OE', false);
        form.setEnabled('Ajustes_R_OE', false);
    }
    if (activity == 43) {
        form.setEnabled('Nome_do_projeto', false);
        form.setEnabled('Descri_projeto', false);
        form.setEnabled('area_responsave', false);
        form.setEnabled('resp_pelo_proj', false);
        form.setEnabled('link_scopi', false);
        form.setEnabled('prazo', false);
        form.setEnabled('just_prazo', false);
        form.setEnabled('escopo', false);
        form.setEnabled('just_escopo', false);
        form.setEnabled('Aprov_RP', false);
        form.setEnabled('Ajustes_R_P', false);
        form.setEnabled('Valid_P_E', false);
        form.setEnabled('Ajustes_P_E', false);
        form.setEnabled('aprov_DirAdj', false);
        form.setEnabled('Ajustes_Di_adj', false);
        form.setEnabled('Aprov_Dir_Exec', false);
        form.setEnabled('Ajus_Dir_Execu', false);
        form.setEnabled('Conside_solicit', false);
    }
    if (activity == 12) {
        form.setEnabled('Nome_do_projeto', false);
        form.setEnabled('area_responsave', false);
        form.setEnabled('resp_pelo_proj', false);
        form.setEnabled('link_scopi', false);
        form.setEnabled('prazo', false);
        form.setEnabled('just_prazo', false);
        form.setEnabled('escopo', false);
        form.setEnabled('just_escopo', false);
        form.setEnabled('Aprov_RP', false);
        form.setEnabled('aprov_DirAdj', false);
        form.setEnabled('Ajustes_R_P', false);
        form.setEnabled('Ajustes_Di_adj', false);
        form.setEnabled('Aprov_Dir_Exec', false);
        form.setEnabled('Conside_solicit', false);
        form.setEnabled('Ajus_Dir_Execu', false);
        form.setEnabled('Descri_projeto', false);
        form.setEnabled('Aprov_R_OE', false);
        form.setEnabled('Ajustes_R_OE', false);
    }
    if (activity == 29) {
        form.setEnabled('Ajustes_Di_adj', false);
        form.setEnabled('aprov_DirAdj', false);
        form.setEnabled('Ajustes_P_E', false);
        form.setEnabled('Valid_P_E', false);
        form.setEnabled('Ajustes_R_P', false);
        form.setEnabled('Aprov_RP', false);
        form.setEnabled('just_escopo', false);
        form.setEnabled('escopo', false);
        form.setEnabled('just_prazo', false);
        form.setEnabled('prazo', false);
        form.setEnabled('link_scopi', false);
        form.setEnabled('resp_pelo_proj', false);
        form.setEnabled('area_responsave', false);
        form.setEnabled('Nome_do_projeto', false);
        form.setEnabled('Conside_solicit', false);
        form.setEnabled('Descri_projeto', false);
        form.setEnabled('Aprov_R_OE', false);
        form.setEnabled('Ajustes_R_OE', false);
    }
}