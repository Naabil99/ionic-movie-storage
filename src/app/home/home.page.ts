import { Component, OnInit } from '@angular/core';
import { Ientrenamiento } from '../share/interfaces';
import { entrenamientodbserviceService } from '../core/entrenamientobservice.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
import { EntrenamientocrudService } from '../core/entrenamientocrud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  entrenamientos: any;
entrenamientoName: string;
entrenamientoReps: string;
entrenamientoSets: string;
entrenamientoCover: string;
entrenamientoTargetedMuscles: string;


constructor(private entrenamientocrudService: EntrenamientocrudService,private route: Router) { }
ngOnInit() {
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
});
}
CreateRecord() {
let record = {};
record['name'] = this.entrenamientoName;
record['reps'] = this.entrenamientoReps;
record['sets'] = this.entrenamientoSets;
record['cover'] = this.entrenamientoCover;
record['targetedMuscles'] = this.entrenamientoTargetedMuscles;
this.entrenamientocrudService.create_Entrenamiento(record).then(resp => {
this.entrenamientoName = "";
this.entrenamientoReps = "";
this.entrenamientoSets = "";
this.entrenamientoCover = "";
this.entrenamientoTargetedMuscles = "";
console.log(resp);
})
.catch(error => {
console.log(error);
});
}
RemoveRecord(rowID) {
this.entrenamientocrudService.delete_Entrenamiento(rowID);
}
EditRecord(record) {
  record.isEdit = true;
record.EditName = record.name;
record.EditReps = record.reps;
record.EditSets = record.sets;
record.EditCover = record.cover;
record.EditTargetedMuscles = record.targetedMuscles;
}
UpdateRecord(recordRow) {
let record = {};
record['name'] = recordRow.EditName;
record['reps'] = recordRow.EditReps;
record['sets'] = recordRow.EditSets;
record['cover'] = recordRow.EditCover;
record['targetedMuscles'] = recordRow.EditTargetedMuscles;
this.entrenamientocrudService.update_Entrenamiento(recordRow.id, record);
recordRow.isEdit = false;
}

entrenamientoTapped(entrenamiento) {
  this.route.navigate(['details', entrenamiento.id]);
  }

}
