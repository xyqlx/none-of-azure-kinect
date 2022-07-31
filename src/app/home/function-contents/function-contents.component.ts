import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-function-contents',
  templateUrl: './function-contents.component.html',
  styleUrls: ['./function-contents.component.scss']
})
export class FunctionContentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  functions = [
    {
      'namePath': 'PAGES.HOME.FUNCTIONS.SHOT_RECORDER',
      'descriptionPath': 'PAGES.HOME.FUNCTIONS.SHOT_RECORDER_DESCRIPTION',
      'routerLink': '/home/shot-recorder',
      'selected': false
    },
    {
      'namePath': 'PAGES.HOME.FUNCTIONS.VIDEO_RECORDER',
      'descriptionPath': 'PAGES.HOME.FUNCTIONS.VIDEO_RECORDER_DESCRIPTION',
      'routerLink': '/home/video-recorder',
      'selected': true
    }
  ];
  changeSelect(index: number){
    this.functions.forEach(x=>x.selected = false);
    this.functions[index].selected = true;
  }
}
