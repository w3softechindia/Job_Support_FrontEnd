/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { IdentityList, apiResultFormat } from 'src/app/core/models/models';

@Component({
  selector: 'app-account-deletion',
  templateUrl: './account-deletion.component.html',
  styleUrls: ['./account-deletion.component.scss']
})
export class AccountDeletionComponent {

  public searchDataValue = '';
  dataSource!: MatTableDataSource<IdentityList>;

  // pagination variables
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public lstIdentity!: Array<IdentityList>;
  public url = "admin";
  public filter = false;
  constructor(private data: ShareDataService ) { }

  ngOnInit(): void {
    this.getlstIdentity();

  }
    //Filter toggle
    openFilter(){
      this.filter = !this.filter
    }
    private getlstIdentity(): void {
      this.lstIdentity = [];
      this.serialNumberArray = [];
  
      this.data.adminIdentityList().subscribe((res: apiResultFormat) => {
        this.totalData = res.totalData;
        res.data.map((res: IdentityList, index: number) => {
          const serialNumber = index + 1;
          if (index >= this.skip && serialNumber <= this.limit) {
            res.id = serialNumber;
            this.lstIdentity.push(res);
            this.serialNumberArray.push(serialNumber);
          }
        });
           this.dataSource = new MatTableDataSource<IdentityList>(this.lstIdentity);
      this.calculateTotalPages(this.totalData, this.pageSize);
      });
  
   
    }
    public sortData(sort: Sort) {
      const data = this.lstIdentity.slice();
  
      if (!sort.active || sort.direction === '') {
        this.lstIdentity = data;
      } else {
         
        this.lstIdentity = data.sort((a, b) => {
           
          const aValue = (a as never)[sort.active];
           
          const bValue = (b as never)[sort.active];
          return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
        });
      }
    }
   
    public searchData(value: string): void {
      this.dataSource.filter = value.trim().toLowerCase();
      this.lstIdentity = this.dataSource.filteredData;
    }
  
    public getMoreData(event: string): void {
      if (event == 'next') {
        this.currentPage++;
        this.pageIndex = this.currentPage - 1;
        this.limit += this.pageSize;
        this.skip = this.pageSize * this.pageIndex;
        this.getlstIdentity();
      } else if (event == 'previous') {
        this.currentPage--;
        this.pageIndex = this.currentPage - 1;
        this.limit -= this.pageSize;
        this.skip = this.pageSize * this.pageIndex;
        this.getlstIdentity();
      }
    }
  
    public moveToPage(pageNumber: number): void {
      this.currentPage = pageNumber;
      this.skip = this.pageSelection[pageNumber - 1].skip;
      this.limit = this.pageSelection[pageNumber - 1].limit;
      if (pageNumber > this.currentPage) {
        this.pageIndex = pageNumber - 1;
      } else if (pageNumber < this.currentPage) {
        this.pageIndex = pageNumber + 1;
      }
      this.getlstIdentity();
    }
  
    public changePageSize(): void {
      this.pageSelection = [];
      this.limit = this.pageSize;
      this.skip = 0;
      this.currentPage = 1;
      this.getlstIdentity();
    }
  
    private calculateTotalPages(totalData: number, pageSize: number): void {
      this.pageNumberArray = [];
      this.totalPages = totalData / pageSize;
      if (this.totalPages % 1 != 0) {
        this.totalPages = Math.trunc(this.totalPages + 1);
      }
      for (let i = 1; i <= this.totalPages; i++) {
        const limit = pageSize * i;
        const skip = limit - pageSize;
        this.pageNumberArray.push(i);
        this.pageSelection.push({ skip: skip, limit: limit });
      }
    }
}
export interface pageSelection {
  skip: number;
  limit: number;
}

