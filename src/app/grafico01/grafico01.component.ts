import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { InscripcionService } from "../inscripcion.service";

@Component({
  selector: "app-grafico01",
  templateUrl: "./grafico01.component.html",
  styleUrls: ["./grafico01.component.css"]
})
export class Grafico01Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: "column"
    },
    xAxis: {
      categories: []
    },

    yAxis: {
      accessibility: {},
      title: {
        text: "Ganancias €"
      }
    },

    series: [
      {
        type: "column",
        data: [],
        name: "Modalidad"
      }
    ],
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "#303030"
      }
    }
  };

  constructor(private inscripcionService: InscripcionService) {}

  ngOnInit() {
    this.getMisDatos();
  }

  getMisDatos() {
    this.inscripcionService.getInscripcionApi().subscribe(
      result => {
        const misDatos: any = result;
        const dataSeries = misDatos.map((x: any) => x.mensualidad);
        const dataCategorias = misDatos.map((x: any) => x.modalidad);
        this.chartOptions.series[0]["data"] = dataSeries;
        this.chartOptions.xAxis["categories"] = dataCategorias;
        Highcharts.chart("miGrafico01", this.chartOptions);
      },
      error => console.log(error)
    );
  }
}
