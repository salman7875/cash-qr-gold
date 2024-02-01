import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QrcodeComponent  implements OnInit {
  @Input() qrString: string;
  constructor() { }

  ngOnInit() {
    console.log("qrcode")
  }

}
