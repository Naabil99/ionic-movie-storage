import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { entrenamientodbserviceService } from '../core/entrenamientobservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Ientrenamiento } from '../share/interfaces';
import { EntrenamientocrudService } from '../core/entrenamientocrud.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  entrenamientoForm: FormGroup;
  id: string;
  entrenamientos: any;
  entrenamientoName: string;
  entrenamientoReps: string;
  entrenamientoSets: string;
  entrenamientoCover: string;
  entrenamientoTargetedMuscles: string;
  constructor(private entrenamientocrudService: EntrenamientocrudService, 
    private router: Router, 
    private activatedrouter: ActivatedRoute,
    public toastController: ToastController) { }
  
  
  
  
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
          this.entrenamientoForm.get('name').setValue(this.entrenamientoName)
          this.entrenamientoForm.get('reps').setValue(this.entrenamientoReps)
          this.entrenamientoForm.get('sets').setValue(this.entrenamientoSets)
          this.entrenamientoForm.get('cover').setValue(this.entrenamientoCover)
          this.entrenamientoForm.get('targetedMuscles').setValue(this.entrenamientoTargetedMuscles)
        }
  
      });
      });

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
        this.entrenamientos.id = nextKey;
        this.entrenamientocrudService.update_Entrenamiento(nextKey, this.entrenamientos);
        console.warn(this.entrenamientoForm.value);
      }
    }