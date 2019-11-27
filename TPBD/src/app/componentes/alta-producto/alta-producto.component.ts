import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/servicios/producto.service';
import { LocalService } from 'src/app/servicios/local.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProductoInt } from 'src/app/interfaces/producto-Int';
import { MovimientoService } from 'src/app/servicios/movimiento.service';
import { TipoMovimiento } from '../../enums/tipo-movimiento.enum';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {
  public productoForm: FormGroup;
  //lista$: Observable<any[]>;
  public productos: AngularFirestoreCollection;

  constructor(private angularFirestore: AngularFirestore, private productoService: ProductoService, private localService: LocalService, private authService: AuthService, private angularFireStorage: AngularFireStorage, private movimientoService: MovimientoService) {
    this.productoForm = new FormGroup({
      nombre: new FormControl(''),
      costo: new FormControl(''),
      descripcion: new FormControl(''),
      observaciones: new FormControl(''),
      foto: new FormControl('')
    });
    this.productos = this.angularFirestore.collection<ProductoInt>('productos');
  }

  ngOnInit() {
  }

  guardarForm() {

    //this.lista$ = this.localService.traerLocales();

    //const urlFoto = this.productoService.subirFoto(this.productoForm.value.foto.files[0], this.productoForm.value.nombre);
    //const tarea = this.productoService.subirFoto(this.productoForm.value.foto.files[0], this.productoForm.value.nombre);
    const foto = this.productoForm.value.foto.files;
    const pathFoto = `imagenesProductos/${this.productoForm.value.nombre}`;
    const tarea = this.angularFireStorage.upload(pathFoto, this.productoForm.value.foto.files[0]);

    tarea.then(() => {
      this.angularFireStorage
        .ref(pathFoto)
        .getDownloadURL()
        .subscribe(url => {

          this.localService.traerLocales().subscribe(locales => {
            locales.forEach(localFE => {
              let email = '';
              this.authService.traerUsuarioActivo().subscribe(usuarioAct => {
                email = usuarioAct.email;
              });
              const productoTemp = {
                nombre: this.productoForm.value.nombre,
                costo: this.productoForm.value.costo,
                cantidad: 0,
                fechaCreacion: new Date(),
                descripcion: this.productoForm.value.descripcion,
                observaciones: this.productoForm.value.observaciones,
                foto: url,
                activo: true,
                local: localFE.nombre
              };
              //this.productoService.persistirProducto(productoTemp,  this.productoForm.value.foto.files);   
              //this.productoService.persistirProducto(productoTemp);
              this.productos.add(productoTemp).then(doc => {
                this.productos.doc(doc.id).update({ id: doc.id });

                const movimientosTmp = {
                  tipo: TipoMovimiento.agregar,
                  usuario: email,
                  producto: productoTemp.nombre,
                  local: localFE,
                  cantidad: 0
                }
                this.movimientoService.persistirMovimiento(movimientosTmp, doc.id, "productos");

              });


            });

            //  this.productos.doc(uid).update({
            //  foto: url
            //  });

          });
        });
      this.productoForm.reset();
    });
  }



  //   this.localService.traerLocales().subscribe(locales => {
  //     locales.forEach(localFE => {
  //       console.log(localFE.nombre)
  //       // const productoTemp ={
  //       //   nombre: this.productoForm.value.nombre,
  //       //   costo: this.productoForm.value.costo,
  //       //   cantidad: 0,
  //       //   fechaCreacion: new Date(),
  //       //   descripcion: this.productoForm.value.descripcion,
  //       //   observaciones: this.productoForm.value.observaciones,
  //       //   foto: '',
  //       //   activo: true,
  //       //   local: localFE.nombre
  //       // };
  //       // this.productoService.persistirProducto(productoTemp,  this.productoForm.value.foto.files);        
  //       });
  //   });
  //   this.productoForm.reset();
  // }

  cancelarForm() {
    this.productoForm.reset();
  }
}
