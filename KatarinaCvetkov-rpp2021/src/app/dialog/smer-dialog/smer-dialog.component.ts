import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SmerService } from '../../service/smer.service';
import { Smer } from '../../model/smer.model';

@Component({
  selector: 'app-smer-dialog',
  templateUrl: './smer-dialog.component.html',
  styleUrls: ['./smer-dialog.component.css']
})
export class SmerDialogComponent implements OnInit {

  public flag!: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SmerDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: Smer,
              public smerService: SmerService) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.smerService.addSmer(this.data);
    this.snackBar.open('Uspešno dodat smer ' + this.data.naziv, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.smerService.updateSmer(this.data);
    this.snackBar.open('Uspešno izmenjen smer ' + this.data.naziv, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.smerService.deleteSmer(this.data.id);
    this.snackBar.open('Uspešno obrisan smer ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

}
