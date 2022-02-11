function beforeSendData(customField, customFact) {

    customField[0] = hAPI.getCardValue("link_scopi");

    customField[1] = hAPI.getCardValue("Aprov_RP");

    customField[2] = hAPI.getCardValue("Valid_P_E");

    customField[3] = hAPI.getCardValue("aprov_DirAdj");

    customField[4] = hAPI.getCardValue("Ajustes_P_E");

    customField[5] = hAPI.getCardValue("Ajustes_R_P");

    customField[6] = hAPI.getCardValue("Ajustes_Di_adj");

    customField[7] = hAPI.getCardValue("Aprov_Dir_Exec");

    customField[8] = hAPI.getCardValue("Ajus_Dir_Execu");

    customField[9] = hAPI.getCardValue("Aprov_R_OE");

    customField[10] = hAPI.getCardValue("Ajustes_R_OE");

    customField[11] = hAPI.getCardValue("Conside_solicit");
}
