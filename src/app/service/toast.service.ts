import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private messageService: MessageService
  ) { }

  success(message: string, key = "bc") {
    this.messageService.add({
      summary: "Éxito",
      detail: message,
      severity: "success",
      life: 5000,
      key: key
    })
  }

  error(message = "Ha ocurrido un error. Por favor intentelo más tarde.", key = "bc") {
    this.messageService.add({
      summary: "Error",
      detail: message,
      severity: "error",
      life: 5000,
      key: key
    })
  }
}
