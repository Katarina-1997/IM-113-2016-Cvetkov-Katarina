import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Projekat } from '../../model/projekat.model';
import { ProjekatService } from '../../service/projekat.service';

@Component({
  selector: 'app-projekat-dialog',
  templateUrl: './projekat-dialog.component.html',
  styleUrls: ['./projekat-dialog.component.css']
})
export class ProjekatDialogComponent implements OnInit {

  public flag!: number;

  constructor ( public snackBar: MatSnackBar,
                public dialogRef: MatDialogRef<ProjekatDialogComponent>,
                @Inject(MAT_DIALOG_DATA)
                public data: Projekat,
                public projekatService: ProjekatService) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.projekatService.addProjekat(this.data);
    this.snackBar.open('Uspešno dodat projekat ' + this.data.naziv, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.projekatService.updateProjekat(this.data);
    this.snackBar.open('Uspešno izmenjen projekat ' + this.data.naziv, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.projekatService.deleteProjekat(this.data.id);
    this.snackBar.open('Uspešno obrisan projekat ' + this.data.id, 'Uredu', {duration: 2000});
  }
  
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste ', 'Uredu', {duration: 2000});
  }
}
