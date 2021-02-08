import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { InscripcionService } from "../inscripcion.service";

@Component({
  selector: "app-grafico02",
  templateUrl: "./grafico02.component.html",
  styleUrls: ["./grafico02.component.css"]
})
export class Grafico02Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: "Gráfico"
    },
    yAxis: {
      accessibility: {},
      title: {
        text: "Fecha"
      }
    },
    colors: ["#FF0400"],
    xAxis: {
      accessibility: {},
      title: {
        text: "Inscripciones"
      }
    },
    series: [
      {
        type: "area",
        data: [],
        name: "Modalidad",
        lineColor: "#FF0400"
      }
    ],

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      backgroundColor: "#FF04"
    }
  };

  constructor(private inscripcionService: InscripcionService) {}

  ngOnInit() {
    //  this.getHeroesApi();
    this.getMisDatos();
  }

  getMisDatos() {
    this.inscripcionService.getInscripcionApi().subscribe(
      result => {
        const misDatos: any = result;
        const dataSeries = misDatos.map((x: any) => x.fecha_alta);
        const dataCategorias = misDatos.map((x: any) => x.modalidad);
        this.chartOptions.series[0]["data"] = dataSeries;
        this.chartOptions.xAxis["categories"] = dataCategorias;
        Highcharts.chart("miGrafico02", this.chartOptions);
      },
      error => console.log(error)
    );
  }
}
