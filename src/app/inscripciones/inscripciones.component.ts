import { Component, OnInit } from "@angular/core";
import { Inscripcion } from "../inscripcion";
import { InscripcionService } from "../inscripcion.service";
import { MessageService } from "../message.service";

@Component({
  selector: "app-inscripciones",
  templateUrl: "./inscripciones.component.html",
  styleUrls: ["./inscripciones.component.css"]
})
export class InscripcionesComponent implements OnInit {
  inscripciones: Inscripcion[];
  inscripcionesApi = null;
  inscripcionTmp: any;

  constructor(
    private inscripcionService: InscripcionService,
    private messageService: MessageService
  ) {}

  getInscripcionesApi() {
    this.inscripcionService.getInscripcionApi().subscribe(inscripciones => {
      this.inscripcionesApi = inscripciones;
      this.inscripciones = this.inscripcionesApi;
    });
  }

  delete(inscripcion: Inscripcion): void {
    /* filter crea otro array filtrando los elementos que sean distintos de el "nombre" recibido.
    Se trata de que el array en memoria conincida con el server
    */
    this.inscripciones = this.inscripciones.filter(n => n !== inscripcion);
    this.inscripcionService.deleteInscripcion(inscripcion).subscribe();
  }

  add(
    nombreI: string,
    mensualidadI: string,
    modalidadI: string,
    fecha_altaI: string
  ): void {
    const nombreV = nombreI.trim();
    const mensualidadV = parseInt(mensualidadI);
    const modalidadV = modalidadI.trim();
    const fecha_altaV = fecha_altaI.trim();
    if (!nombreI) {
      return;
    }
    const newDoc: any = {
      nombre: nombreI,
      mensualidad: mensualidadI,
      modalidad: modalidadI,
      fecha_alta: fecha_altaI
    };
    this.inscripcionService.addInscripcion(newDoc).subscribe(inscripcion => {
      this.inscripcionTmp = inscripcion;
      this.inscripciones.push(this.inscripcionTmp);
    });
  }

  ngOnInit() {
    this.getInscripcionesApi();
  }
}
