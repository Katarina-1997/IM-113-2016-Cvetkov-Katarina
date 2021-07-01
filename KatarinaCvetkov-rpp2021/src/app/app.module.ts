import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VoziloComponent } from './vozilo/vozilo.component';
import { AutomobilComponent } from './vozilo/automobil/automobil.component';
import { ProjekatComponent } from './projekat/projekat.component';
import { SmerComponent } from './smer/smer.component';
import { GrupaComponent } from './grupa/grupa.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { AuthorComponent } from './core/author/author.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProjekatService } from './service/projekat.service';
import { SmerService } from './service/smer.service';
import { ProjekatDialogComponent } from './dialog/projekat-dialog/projekat-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SmerDialogComponent } from './dialog/smer-dialog/smer-dialog.component';
import { GrupaDialogComponent } from './dialog/grupa-dialog/grupa-dialog.component';
import { GrupaService } from './service/grupa.service';
import { MatSelectModule } from '@angular/material/select';
import { StudentService } from './service/student.service';
import { StudentDialogComponent } from './dialog/student-dialog/student-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

const Routes = [{path: 'projekat', component: ProjekatComponent},
                {path: 'smer', component: SmerComponent},
                {path: 'grupa', component: GrupaComponent},
                {path: 'student', component: StudentComponent},
                {path: 'home', component: HomeComponent},
                {path: 'author', component: AuthorComponent},
                {path: 'about', component: AboutComponent},
                {path: '', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  declarations: [
    AppComponent,
    VoziloComponent,
    AutomobilComponent,
    ProjekatComponent,
    SmerComponent,
    GrupaComponent,
    StudentComponent,
    HomeComponent,
    AboutComponent,
    AuthorComponent,
    ProjekatDialogComponent,
    SmerDialogComponent,
    GrupaDialogComponent,
    StudentDialogComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [ProjekatService,
              SmerService,
              GrupaService,
              StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
