import { Component, OnInit, Input } from "@angular/core";
import { Inscripcion } from "../inscripcion";
import { InscripcionService } from "../inscripcion.service";
import { MessageService } from "../message.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-inscripcion-detail",
  templateUrl: "./inscripcion-detail.component.html",
  styleUrls: ["./inscripcion-detail.component.css"]
})
export class InscripcionDetailComponent implements OnInit {
  // @Input() and @Output() allow Angular to share data between the parent context and child directives or components
  inscripcion: Inscripcion;

  constructor(
    private InscripcionService: InscripcionService,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getInscripcion();
  }
  save(mensualidadI: string): void {
    const doc = {
      id: this.inscripcion.id,
      modalidad: this.inscripcion.modalidad,
      fecha_alta: new Date(),
      mensualidad: parseInt(mensualidadI),
      nombre: this.inscripcion.nombre
    };
    this.InscripcionService.updateInscripcion(doc).subscribe(() =>
      this.goBack()
    );
  }
  /*
  Para recuperar el documento por el Id reicibido como parámetro
  */
  getInscripcion(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.messageService.add(
      `InscripcionesComponent: Selected inscripcion id=${id}`
    );
    this.InscripcionService.getInscripcion(id).subscribe(inscripcion => {
      const inscripcionTmp: any = inscripcion;
      this.inscripcion = inscripcionTmp;
    });
  }
  goBack(): void {
    this.location.back();
  }
}
