import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LocalService } from 'src/app/servicios/local.service';


@Component({
  selector: 'app-alta-local',
  templateUrl: './alta-local.component.html',
  styleUrls: ['./alta-local.component.css']
})
export class AltaLocalComponent implements OnInit {
 public localForm: FormGroup;

  constructor(private localService: LocalService) {
    this.localForm = new FormGroup({
      nombre:new FormControl(''),
      direccion: new FormControl('')
    });
   }

  ngOnInit() {
  }

  guardarForm(){
    const localTmp={
      nombre: this.localForm.value.nombre,
      direccion: this.localForm.value.direccion,
      activo: true
    };

    this.localService.persistirLocal(localTmp);

    this.localForm.reset();
  }

  cancelarForm(){
    this.localForm.reset();
  }

}
