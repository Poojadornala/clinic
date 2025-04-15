import { Injectable } from '@angular/core';
import {  FilterService,  } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ClinicFilterService {

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    const value = 'PrimeNG';

    this.filterService.filters.equals(value, 'NG');                            //false
    this.filterService.filters.equals(value, 8);                               //false
    this.filterService.filters.equals(value, new Date());                      //false
    this.filterService.filters.contains(value, 'NG');                          //true
    this.filterService.filters.startsWith(value, 'NG');                        //false
    this.filterService.filters.endsWith(value, 'NG');                          //true
    this.filterService.filters.lt(10, 20);                                     //true
    this.filterService.filters.gt(50, 20);                                     //true
    this.filterService.filters.in(value, ['PrimeFaces', 'PrimeNG']);           //true
}
}
