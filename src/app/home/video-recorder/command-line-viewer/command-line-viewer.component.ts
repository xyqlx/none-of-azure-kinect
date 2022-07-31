import { Component, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-command-line-viewer',
  templateUrl: './command-line-viewer.component.html',
  styleUrls: ['./command-line-viewer.component.scss']
})
export class CommandLineViewerComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private translator: TranslateService
  ) { }

  @Input() commandLines: string[] = [];

  ngOnInit(): void {
  }
  
  copyToClipboardCopied(isCopied: boolean){
    this.translator.get(isCopied ? 'PROMPT.COPY_TO_CLIPBOARD_SUCCESS' : 'PROMPT.COPY_TO_CLIPBOARD_FAILED').subscribe(x => {
      this.snackBar.open(x, '', { duration: 2000 });
    });
  }
}
