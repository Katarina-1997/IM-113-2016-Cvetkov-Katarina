import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { StudentDialogComponent } from '../dialog/student-dialog/student-dialog.component';
import { Grupa } from '../model/grupa.model';
import { Projekat } from '../model/projekat.model';
import { Student } from '../model/student.model';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  displayedColumns =['id', 'ime', 'prezime', 'brojIndeksa', 'projekat', 'grupa', 'actions' ];

  // dataSource!: Observable<Student[]>;
  dataSource!: MatTableDataSource<Student>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  @Input()
  selektovanProjekat!: Projekat;

  constructor(public studentService: StudentService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges() {
    if (this.selektovanProjekat.id) {
      this.loadData();
    }
  }

  public loadData() {
    // this.dataSource = this.studentService.getAllStudent();
    // this.dataSource = this.studentService.getStudentZaProjekat(this.selektovanProjekat.id);
    this.studentService.getStudentZaProjekat(this.selektovanProjekat.id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data: any, property) => {
        switch(property) {
          case 'id': return data[property];
          case 'ime': return data[property];
          case 'prezime': return data[property];
          case 'brojIndeksa': return data[property];
          case 'projekat': return data[property].naziv;
          case 'grupa': return data[property].oznaka;
          default: return data[property].toLocaleLowerCase();
        }
      };
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, ime: string, prezime: string, brojIndeksa: string, projekat: Projekat|string, grupa: Grupa|string) {
    const dialog = this.dialog.open(StudentDialogComponent, {data: {id: id, ime: ime, prezime: prezime, brojIndeksa: brojIndeksa, projekat: projekat, grupa: grupa }});
    dialog.componentInstance.flag=flag;
    dialog.afterClosed().subscribe(result => {
      if(result === 1) {
        this.loadData();
      }
    })
  } 

  applyFilter(filterValue: string){
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
