import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-function-item',
  templateUrl: './function-item.component.html',
  styleUrls: ['./function-item.component.scss']
})
export class FunctionItemComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() name: string;
  @Input() description: string;
  @Input() routerLink: string;
  @Input() selected: boolean = false;
  @Output() selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isHover = false;
  ngOnInit(): void {
  }
  onClick(){
    if(this.selected === false){
      this.selected = true;
      this.selectedChange.emit(this.selected);
      this.router.navigate([this.routerLink]);
    }
  }
}
