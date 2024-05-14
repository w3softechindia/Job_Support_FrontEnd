/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import {
  pageSelection,
  apiResultFormat,
  files,
} from 'src/app/core/models/models';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {
  public routes = routes;
  public files: Array<files> = [];
  dataSource!: MatTableDataSource<files>;

  public showFilter = false;
  public searchDataValue = '';
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

  fileList: string[] = []; // Array to store file paths
  projectDetails: any;
  projectId: number | null | undefined;

  constructor(public data: ShareDataService, private userService: UserService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.getTableData();
    this.projectId=this.route.snapshot.params['id'];
    this.fetchFiles();
  }



 private fetchFiles(): void {
    if (this.projectId) {
      this.userService.getFilesByAdminPostProject(this.projectId).subscribe((files: any) => {
        console.log('Files for project ID', this.projectId, ':', files);
        // Assign fetched files to fileList
        this.fileList = files;
      },
        error => {
          console.error('Error fetching files:', error);
        }
      );
    } else {
      console.warn('No project ID available.');
      this.fileList = []; // Clear fileList if project ID is not available
    }
  }

  downloadFile(filePath: string): void {
    console.log('Attempting to download file:', filePath);

    // Extract the file name from the file path
    const fileName = filePath.substring(filePath.lastIndexOf('_') + 1); // Extracting the part after the last underscore

    // Display the file name
    console.log('File Name:', fileName);

    // Create a link element
    const link = document.createElement('a');
    link.href = filePath;

    // Simulate a click to trigger the download
    link.click();
  }

  private getTableData(): void {
    this.files = [];
    this.serialNumberArray = [];

    this.data.getFiles().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: files, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          this.files.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<files>(this.files);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  public sortData(sort: Sort) {
    const data = this.files.slice();

    if (!sort.active || sort.direction === '') {
      this.files = data;
    } else {
      this.files = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];

        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
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

  public PageSize(): void {
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
}
