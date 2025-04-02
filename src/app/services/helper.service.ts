import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  headertTitle : string = '';
 
  getRowStatusClass(status: string): string {
    switch (status) {
      case "O": // Aberto
        return "table-success";

      case "C": // Fechado
        return "table-secondary";

      case "W": // Aguardando Aprovação
        return "table-warning";

      case "N": // Não Aprovado
        return "table-danger";

      default:
        return "";
    }
  }

  formatDateToISO(date: Date): string {
    if (!date) {
      throw new Error("Invalid date");
    }
    return date.toISOString().split('T')[0];
  }  
}
