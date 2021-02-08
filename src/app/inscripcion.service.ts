import { Injectable } from "@angular/core";
import { MessageService } from "./message.service";
import { HttpClient } from "@angular/common/http";
import { Inscripcion } from "./inscripcion";

/*
Los componentes consumen servicios; es decir, puede inyectar un servicio en un componente, dándole acceso al componente a ese servicio.

Una aplicación real buscará héroes de un servidor remoto, que es una operación inherentemente asincrónica.

En este tutorial, HeroService.getHeroes() devolverá un Observable porque eventualmente usará el método angular HttpClient.get para buscar a los héroes y HttpClient.get() devuelve un Observable.

observable
Un productor de múltiples valores, que empuja a suscriptores. Se utiliza para el manejo de eventos asíncronos en todo Angular. Ejecutas un observable suscribiéndote con su método subscribe(), pasando devoluciones de llamada para notificaciones de nuevos valores, errores o finalización.
*/

@Injectable({
  providedIn: "root"
})
export class InscripcionService {
  private url = "https://6001423c08587400174da7a5.mockapi.io/Inscripcion";

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getInscripcionApi() {
    this.messageService.add("Documentos cargado correctamente");
    return this.http.get(this.url);
  }

  /** PUT: update the hero by ID on the server */
  updateInscripcion(doc: any) {
    console.log("en update");
    console.log(doc);
    const urlId = `${this.url}/${doc.id}`;
    return this.http.put(urlId, doc);
  }

  /** DELETE: delete the hero by Id from the server */
  deleteInscripcion(Inscripcion: Inscripcion) {
    // const id = typeof hero === "number" ? hero : hero.id;
    const urlId = `${this.url}/${Inscripcion.id}`;
    return this.http.delete(urlId);
  }
  /** POST: add a new hero to the server */
  addInscripcion(doc: any) {
    return this.http.post(this.url, doc);
  }

  /** GET hero by id. Will 404 if id not found */
  getInscripcion(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.get(url);
  }
}
