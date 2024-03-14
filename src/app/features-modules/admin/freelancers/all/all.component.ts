import { Component, OnInit, } from '@angular/core';


import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { User } from 'src/app/classes/user';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { apiResultFormat, freelancer } from 'src/app/core/models/models';
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  public lstAll!: Array<freelancer>;
  public url = "admin";
  public searchDataValue = '';
  dataSource!: MatTableDataSource<freelancer>;
  role: string = 'Freelancer';
  user: User[]=[];

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
  photo: any;
  error!: string;
  photoUrl!: string | ArrayBuffer | null;
  constructor(private data: ShareDataService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getTableData();
    this.getAllUsersByRole();
  }
  private getTableData(): void {
    this.lstAll = [];
    this.serialNumberArray = [];

    this.data.freelancerActiveData().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: freelancer, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstAll.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<freelancer>(this.lstAll);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });


  }
  public sortData(sort: Sort) {
    const data = this.lstAll.slice();

    if (!sort.active || sort.direction === '') {
      this.lstAll = data;
    } else {

      this.lstAll = data.sort((a, b) => {

        const aValue = (a as never)[sort.active];

        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstAll = this.dataSource.filteredData;
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
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
    this.getTableData();
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
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

  private getAllUsersByRole() {
    this.adminService.getAllByRole(this.role).subscribe((response: any) => {
      this.user = response;
      this.photo=response.photoUrl;
      this.createImageFromBlob();
    })
  }

  updateStatus(email: string, status: string) {
    this.adminService.updateStatus(email, status)
      .subscribe(
        () => {
          console.log('Status updated successfully');
          location.reload();
        },
        error => {
          console.error('Error updating status:', error);
        }
      );
  }

  deleteUserByEmail(email:string){
    this.adminService.deleteUser(email).subscribe(()=>{
      console.log("User Account Deleted..!!!!");
    },
    error => {
      console.error('Error updating status:', error);
    }
  );
  }

  createImageFromBlob(): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.photoUrl = reader.result;
    }, false);

    if (this.photo) {
      reader.readAsDataURL(this.photo);
    }
  }

}
export interface pageSelection {
  skip: number;
  limit: number;
}