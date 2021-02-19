import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { entrenamientodbserviceService } from '../core/entrenamientobservice.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Ientrenamiento } from '../share/interfaces';
import { EntrenamientocrudService } from '../core/entrenamientocrud.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
 
  id:string;
  entrenamientos: any;
  entrenamientoName: string;
  entrenamientoReps: string;
  entrenamientoSets: string;
  entrenamientoCover: string;
  entrenamientoTargetedMuscles: string;

  entrenamientoForm: FormGroup;
  constructor(
    private router: Router,
    private entrenamientocrudService: EntrenamientocrudService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.entrenamientoForm = new FormGroup({
      name: new FormControl(''),
      sets: new FormControl(''),
      reps: new FormControl(''),
      cover: new FormControl(''),
      targetedMuscles: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar ejercicio',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveentrenamiento();
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  saveentrenamiento() {
    this.entrenamientos = this.entrenamientoForm.value;
        let nextKey = this.id
        this.id = nextKey;
        this.entrenamientocrudService.create_Entrenamiento(this.entrenamientos);
        console.warn(this.entrenamientoForm.value);
  }
}