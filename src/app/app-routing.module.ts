import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InscripcionesComponent } from "./inscripciones/inscripciones.component";
import { InscripcionDetailComponent } from "./inscripcion-detail/inscripcion-detail.component";
import { Grafico01Component } from "./grafico01/grafico01.component";
import { Grafico02Component } from "./grafico02/grafico02.component";

const routes: Routes = [
  { path: "inscripciones", component: InscripcionesComponent },
  { path: "grafico", component: Grafico01Component },
  { path: "detail/:id", component: InscripcionDetailComponent },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "graficolineas", component: Grafico02Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
