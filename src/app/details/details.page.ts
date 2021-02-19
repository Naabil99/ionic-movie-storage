import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { entrenamientodbserviceService } from '../core/entrenamientobservice.service';
import { Ientrenamiento } from '../share/interfaces';
import { ToastController } from '@ionic/angular';
import { EntrenamientocrudService } from '../core/entrenamientocrud.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: String
  entrenamientos: any;
  entrenamientoName: string;
  entrenamientoReps: string;
  entrenamientoSets: string;
  entrenamientoCover: string;
  entrenamientoTargetedMuscles: string;

  constructor(private entrenamientocrudService: EntrenamientocrudService, private route: Router, private activatedrouter: ActivatedRoute) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.entrenamientocrudService.read_Entrenamientos().subscribe(data => {
      this.entrenamientos = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          reps: e.payload.doc.data()['reps'],
          sets: e.payload.doc.data()['sets'],
          cover: e.payload.doc.data()['cover'],
          targetedMuscles: e.payload.doc.data()['targetedMuscles']
        };
      })
      console.log(this.entrenamientos);

      this.entrenamientos.forEach(element => {
        if (element.id == this.id) {
          this.entrenamientos = element;
        }

      });
    });
  }
  EditRecord(entrenamientos) {
    this.route.navigate(['edit', entrenamientos.id]);
  }

  RemoveRecord(rowID) {
    this.entrenamientocrudService.delete_Entrenamiento(rowID);
  }
}