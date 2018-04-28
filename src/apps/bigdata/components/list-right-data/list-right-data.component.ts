import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-list-right-data',
  templateUrl: './list-right-data.component.html',
  styleUrls: ['./list-right-data.component.css']
})
export class ListRightDataComponent implements OnInit {
@Input()
  public optionData  
  constructor() { 
       
  }

  ngOnInit() {
  }

}
