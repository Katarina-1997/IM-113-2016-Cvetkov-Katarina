import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Projekat } from '../model/projekat.model';
import { ProjekatService } from '../service/projekat.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjekatDialogComponent } from '../dialog/projekat-dialog/projekat-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-projekat',
  templateUrl: './projekat.component.html',
  styleUrls: ['./projekat.component.css']
})
export class ProjekatComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'opis', 'oznaka', 'actions'];

  // dataSource!: Observable<Projekat[]>
  dataSource!: MatTableDataSource<Projekat>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  selektovanProjekat!: Projekat;

  constructor(public projekatService: ProjekatService,
              public dialog: MatDialog) { 
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    // this.dataSource = this.projekatService.getAllProjekat();}
    this.projekatService.getAllProjekat().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data: any, property) => {
        switch(property) {
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, naziv: string, opis: string, oznaka: string) {
    const dialog = this.dialog.open(ProjekatDialogComponent, {data: {id: id, naziv: naziv, opis: opis, oznaka: oznaka}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed(). subscribe(result => {
      if (result === 1 ) {
        this.loadData();
      }
    })
  } 

  public selectedRow(row: Projekat) {
    this.selektovanProjekat = row;
  }

   applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
   }

}
