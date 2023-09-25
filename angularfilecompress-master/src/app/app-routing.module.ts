import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Import your LoginComponent
import { RegistrationComponent } from './registration/registration.component'; // Import your RegistrationComponent
import { FileCompressionComponent } from './file-compression/file-compression.component'; // Import your RegistrationComponent
import { AuthGuard } from './auth/auth.guard'; // Import the AuthGuard


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent } ,// Change path format here
  { path: 'file-compression', component: FileCompressionComponent, canActivate: [AuthGuard]  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
