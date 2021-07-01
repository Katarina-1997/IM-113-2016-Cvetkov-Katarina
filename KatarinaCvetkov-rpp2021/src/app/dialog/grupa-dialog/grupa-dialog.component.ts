import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Grupa } from '../../model/grupa.model';
import { Smer } from '../../model/smer.model';
import { GrupaService } from '../../service/grupa.service';
import { SmerService } from '../../service/smer.service';

@Component({
  selector: 'app-grupa-dialog',
  templateUrl: './grupa-dialog.component.html',
  styleUrls: ['./grupa-dialog.component.css']
})
export class GrupaDialogComponent implements OnInit {

  public flag!: number;

  smerovi!: Smer[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<GrupaDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: Grupa,
              public grupaService: GrupaService,
              public smerService: SmerService) { }

  ngOnInit(): void {
    this.smerService.getAllSmer().subscribe(smerovi =>
    this.smerovi = smerovi);
  }

  public add(): void {
    this.grupaService.addGrupa(this.data);
    this.snackBar.open('Uspešno dodata grupa ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.grupaService.updateGrupa(this.data);
    this.snackBar.open('Uspešno izmenjena grupa ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.grupaService.deleteGrupa(this.data.id);
    this.snackBar.open('Uspešno obirsana grupa' + this.data.id, 'Uredu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

  compareTo(a: { id: any; }, b: { id: any; }) {
    return a.id === b.id;
  }

}
