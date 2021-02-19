import { Injectable } from '@angular/core';
import { Ientrenamiento } from '../share/interfaces';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class entrenamientodbserviceService {
  auxentrenamiento: Ientrenamiento;
  auxentrenamientoList: Ientrenamiento[] = [];
  constructor(private storage: Storage) { }


  setItem(reference: string, value: Ientrenamiento) {
    this.storage.set(reference, { id: value.id, name: value.name, sets:
    value.sets, reps: value.reps, cover: value.cover, targetedMuscles:
    value.targetedMuscles })
    .then(
    (data) => console.log('Stored first item!', data),
    error => console.error('Error storing item', error)
    );
    }

    getItem(reference):Promise<Ientrenamiento>{
      return this.storage.get(reference);
    }

    empty(){
      return this.storage.keys()
      .then(
      (data) => {return true} ,
      error => {return false}
      );
      }

      keys() : Promise<string[]> {
        return this.storage.keys();
        }

        getAll():Promise<Ientrenamiento[]>{
          return this.storage.keys().then( (k)=>
          {
          k.forEach(element => {
          this.getItem(element).then(
          (data:Ientrenamiento)=> this.auxentrenamientoList.push(data)
          );
          });
          return this.auxentrenamientoList;
});
}

remove(reference: string) {
  this.storage.remove(reference)
  .then(
  data => console.log(data),
  error => console.error(error)
  );
  }
  clear() {
    this.storage.clear().then(
    data => console.log(data),
    error => console.error(error)
    );
    }
}
