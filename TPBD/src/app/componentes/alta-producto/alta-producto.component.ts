import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {
  public productoForm: FormGroup;

  constructor(private productoService : ProductoService) { 
    this.productoForm = new FormGroup({
      nombre: new FormControl(''),
      costo: new FormControl(''),
      descripcion: new FormControl(''),
      observaciones: new FormControl('')
    });
  }

  ngOnInit() {
  }

  guardarForm(){
    const productoTemp ={
      nombre: this.productoForm.value.nombre,
      costo: this.productoForm.value.costo,
      cantidad: 0,
      fechaCreacion: new Date(),
      descripcion: this.productoForm.value.descripcion,
      observaciones: this.productoForm.value.observaciones,
      activo: true
    };
    this.productoService.persistirProducto(productoTemp);
    this.productoForm.reset();
  }

  cancelarForm(){
    this.productoForm.reset();
  }

  

}
