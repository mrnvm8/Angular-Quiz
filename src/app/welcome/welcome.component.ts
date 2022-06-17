import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//after having the reference lets input Viewchild and ElementRef
//will be using view child to grab the values from the welcome html
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @ViewChild('name') nameFromInput !: ElementRef;
  constructor(){}
  ngOnInit(): void {

  }

  StartQuit(){
    //storing the name into the local storage
    localStorage.setItem('name', this.nameFromInput.nativeElement.value);
  }
}
