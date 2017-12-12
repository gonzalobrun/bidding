import { Component, TemplateRef, Input, OnInit, OnChanges, ElementRef } from '@angular/core';
import { WebStorageService } from '../../commons/webStorage.service';
import { Publication } from '../../models/publication.model';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';


@Component({
  selector: 'donut-chart',
  templateUrl: './donut-chart.component.html'
})

export class DonutChartComponent {
    
    @Input() types: any;

    private width: number;
    private height: number;

    private svg: any;     // TODO replace all `any` by the right type
    private radius: number;
    
    private arc: any;
    private pie: any;
    private color: any;
      
    private g: any;

    constructor() {}

    ngOnInit() {
        
    }

    ngOnChanges(changes: any){
        if(this.types){
            this.initSvg();
            this.drawChart(this.types);
        }
    }

    private initSvg() {
        this.svg = d3.select('#svg-container-donut');

        this.width = +this.svg.attr('width');
        this.height = +this.svg.attr('height');
        this.radius = Math.min(this.width, this.height) / 2;

        this.color = d3Scale.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
        
        this.arc = d3Shape.arc()
            .outerRadius(this.radius - 10)
            .innerRadius(this.radius - 70);
        
        this.pie = d3Shape.pie()
            .sort(null)
            .value((d: any) => d.value);
        
        this.svg = d3.select("svg")
            .append("g")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
    }

    private drawChart(data: any[]) {
        
        let g = this.svg.selectAll(".arc")
            .data(this.pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", this.arc)
            .style("fill", d => this.color(d.data.name));
            
        g.append("text")
            .attr("transform", d => "translate(" + this.arc.centroid(d) + ")")
            .attr("dy", ".35em")
            .text(d => d.data.name);
    }


}