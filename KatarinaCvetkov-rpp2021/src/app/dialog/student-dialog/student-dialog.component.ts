import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Grupa } from '../../model/grupa.model';
import { Projekat } from '../../model/projekat.model';
import { Student } from '../../model/student.model';
import { GrupaService } from '../../service/grupa.service';
import { ProjekatService } from '../../service/projekat.service';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {

  public flag!: number;

  projekti!: Projekat[];
  grupe!: Grupa[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StudentDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: Student,
              public studentService: StudentService,
              public projekatService: ProjekatService,
              public grupaService: GrupaService) { }

  ngOnInit(): void {
    this.projekatService.getAllProjekat().subscribe(projekti =>
      this.projekti = projekti);
    this.grupaService.getAllGrupa().subscribe(grupe => 
      this.grupe = grupe);
  }

  public add(): void {
    this.studentService.addStudent(this.data);
    this.snackBar.open('Uspešno dodat student ' + this.data.ime, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.studentService.updateStudent(this.data);
    this.snackBar.open('Uspešno izmenjen student' + this.data.ime, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.studentService.deleteStudent(this.data.id);
    this.snackBar.open('UspeŠno obrisan student' + this.data.ime, 'Uredu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

  compareTo(a: { id: any; },b: { id: any; }) {
    return a.id === b.id;
  }

}
