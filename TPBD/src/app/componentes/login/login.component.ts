import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/servicios/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public usuarioForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.usuarioForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    });
  }

  ngOnInit() {}

  private borrarForm() {
    this.usuarioForm.reset();
  }

  ingresar() {
    this.authService.ingresar(
      this.usuarioForm.value.email,
      this.usuarioForm.value.password
    );
    this.borrarForm();
    this.authService.traerUsuarioActivo().subscribe(usuario => {
      if (usuario) {
        this.router.navigate(["/principal"]);
      } else {
        this.router.navigate(["/login"]);
      }
    });
  }

  registrarse() {
    this.borrarForm();
    this.router.navigate(["/altausuario"]);
  }

  cargarUsuario() {
    this.usuarioForm.get("email").setValue("usuario@usuario.com");
    this.usuarioForm.get("password").setValue("usuariousuario");
  }

  cargarAdministrador() {
    this.usuarioForm.get("email").setValue("admin@admin.com");
    this.usuarioForm.get("password").setValue("adminadmin");
  }
}
