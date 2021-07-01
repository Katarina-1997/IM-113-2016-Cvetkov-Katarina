import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupa } from '../model/grupa.model';
import { GrupaService } from '../service/grupa.service';
import { Smer } from '../model/smer.model';
import { GrupaDialogComponent } from '../dialog/grupa-dialog/grupa-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-grupa',
  templateUrl: './grupa.component.html',
  styleUrls: ['./grupa.component.css']
})
export class GrupaComponent implements OnInit {

  displayedColumns = ['id', 'oznaka', 'smer', 'actions'];

  // dataSource!: Observable<Grupa[]>;
  dataSource!: MatTableDataSource<Grupa>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
 
  constructor(public grupaService: GrupaService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    // this.dataSource = this.grupaService.getAllGrupa();
    this.grupaService.getAllGrupa().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data: any, property) => {
        switch(property) {
          case 'id': return data[property];
          case 'oznaka': return data[property];
          case 'smer': return data[property].naziv;
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public openDialog(flag: number, id: number, oznaka: string, smer: Smer|string) {
    const dialog = this.dialog.open(GrupaDialogComponent, {data: {id: id, oznaka: oznaka, smer: smer}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
   }

}
