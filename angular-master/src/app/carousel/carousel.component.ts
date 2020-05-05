import { Component, OnInit } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

import { AnnonceService } from '../annonce.service';
import { Router } from '@angular/router';
import { PrefixNot } from '@angular/compiler';
import { Annonce } from '../annonce';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  slideActivate(ngbSlideEvent: NgbSlideEvent) {
    console.log(ngbSlideEvent.source);
    console.log(ngbSlideEvent.paused);
    console.log(NgbSlideEventSource.INDICATOR);
    console.log(NgbSlideEventSource.ARROW_LEFT);
    console.log(NgbSlideEventSource.ARROW_RIGHT);
  }
  annonce: Annonce = new Annonce();
  submitted = false;
  type: string;
  nomEcole: string;
  annonces: Annonce[];
  constructor(private AnnonceService: AnnonceService,
    private router: Router) { }

  

  ngOnInit(): void {
    this.nomEcole='';
    this.type='';
  }
  newAnnonce(): void {
    this.submitted = false;
     
    
  }

  private searchAnnonces() {
    this.AnnonceService.getAnnoncesByNomEcoleAndType(this.nomEcole , this.type)
      .subscribe(annonces => this.annonces = annonces);
  }

  onSubmit() {
    this.searchAnnonces();
  }


}
