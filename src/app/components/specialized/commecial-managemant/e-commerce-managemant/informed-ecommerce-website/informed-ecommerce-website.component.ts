import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ECommerceWebsite, ECommerceWebsiteFilterModel } from 'src/app/_models/APIModel/e-commerce.model';
import { District } from 'src/app/_models/district.model';
import { SCTService } from 'src/app/_services/APIService/sct.service';
import { notification_management } from '../../../../../_models/APIModel/ecommerce.model'
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-informed-ecommerce-website',
  templateUrl: './informed-ecommerce-website.component.html',
  styleUrls: ['./informed-ecommerce-website.component.scss']
})
export class InformedEcommerceWebsiteComponent implements OnInit {

  @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['index', 'mst', 'ten_doanh_nghiep', 'dia_chi', 'dien_thoai', 'ten_mien', 'loai_hhdv', 'email', 'so_gian_hang'];
  dataSource: MatTableDataSource<ECommerceWebsite>;
  filteredDataSource: MatTableDataSource<ECommerceWebsite> = new MatTableDataSource<ECommerceWebsite>();
  filterModel: ECommerceWebsiteFilterModel = { id_quan_huyen: [] };
  constructor(public sctService: SCTService) { }

  ngOnInit() {
    this.GetDanhSachWebsiteTMDT();
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredDataSource.filter = filterValue.trim().toLowerCase();
  }

  districts: District[] = [
    { id: 1, ten_quan_huyen: 'Thị xã Phước Long' },
    { id: 2, ten_quan_huyen: 'Thành phố Đồng Xoài' },
    { id: 3, ten_quan_huyen: 'Thị xã Bình Long' },
    { id: 4, ten_quan_huyen: 'Huyện Bù Gia Mập' },
    { id: 5, ten_quan_huyen: 'Huyện Lộc Ninh' },
    { id: 6, ten_quan_huyen: 'Huyện Bù Đốp' },
    { id: 7, ten_quan_huyen: 'Huyện Hớn Quản' },
    { id: 8, ten_quan_huyen: 'Huyện Đồng Phú' },
    { id: 9, ten_quan_huyen: 'Huyện Bù Đăng' },
    { id: 10, ten_quan_huyen: 'Huyện Chơn Thành' },
    { id: 11, ten_quan_huyen: 'Huyện Phú Riềng' }
  ];

  GetDanhSachWebsiteTMDT() {
    this.sctService.GetDanhSachWebTMDT().subscribe(response => {
      this.dataSource = new MatTableDataSource<ECommerceWebsite>(response.data);
      this.filteredDataSource.data = [...this.dataSource.data];
      this.filteredDataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Số hàng';
      this.paginator._intl.firstPageLabel = "Trang Đầu";
      this.paginator._intl.lastPageLabel = "Trang Cuối";
      this.paginator._intl.previousPageLabel = "Trang Trước";
      this.paginator._intl.nextPageLabel = "Trang Tiếp";
    })
  }

  applyFilter() {
    console.log(this.filterModel)
    let filteredData = this.filterArray(this.dataSource.data, this.filterModel);
    if (!filteredData.length) {
      if (this.filterModel)
        this.filteredDataSource.data = [];
      else
        this.filteredDataSource.data = this.dataSource.data;
    }
    else {
      this.filteredDataSource.data = filteredData;
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.accordion.openAll();
  }

  filterArray(array, filters) {
    const filterKeys = Object.keys(filters);
    let temp = [...array];
    filterKeys.forEach(key => {
      let temp2 = [];
      if (filters[key].length) {
        filters[key].forEach(criteria => {
          temp2 = temp2.concat(temp.filter(x => x[key] == criteria));
        });
        temp = [...temp2];
      }
    })
    return temp;
  }
}
