//Import library
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
//Import service
import { BreadCrumService } from 'src/app/_services/injectable-service/breadcrums.service';
//Import Model
import { IIPIndustrialModel, IIPIndustrialMonthModel } from 'src/app/_models/industry.model';
import { LinkModel } from 'src/app/_models/link.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
    selector: 'iip-month',
    templateUrl: './iip-month.component.html',
    styleUrls: ['./iip-month.component.scss'],
})

export class IipMonthComponent implements OnInit {
    //Constant variable -----------------------------------------------------------
    private readonly LINK_DEFAULT: string = "/specialized/industry-management/iip-industrial/month?";
    private readonly TITLE_DEFAULT: string = "Chỉ số công nghiệp IIP tháng ";
    private readonly TEXT_DEFAULT: string = "Chỉ số công nghiệp IIP tháng ";
    public readonly DISPLAY_COLS: string[] = ['index', 'chi_tieu', 'don_vi', 'cung_ky', 'thuc_hien_thang_truoc', 'thuc_hien_thang', 'thuc_hien_so_voi_thang_truoc', 'thuc_hien_so_voi_cung_ky'];
    private readonly DATA_DEFAULT: Array<IIPIndustrialMonthModel[]> = [
        [
            {thu_tu:"I",chi_tieu: "Chỉ số sản xuất công nghiệp (IIP) so với cùng kỳ theo giá so sánh năm 2010", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"1",chi_tieu: "Công nghiệp khai khoáng", don_vi: "%",cung_ky: 1, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Công nghiệp chế biến, chế tạo", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Công nghiệp sản xuất, phân phối điện, khí đốt", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Cung cấp nước, quản lý và xử lý nước thải, rác thải", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"II",chi_tieu: "Một số sản phẩm công nghiệp chủ yếu", don_vi: "",cung_ky: null, thuc_hien_so_voi_thang_truoc: null, thuc_hien_thang: null,thuc_hien_thang_truoc: null, thuc_hien_so_voi_cung_ky: null},
            {thu_tu:"1",chi_tieu: "Đá xây dựng", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Hạt điều nhân", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Vải dệt", don_vi: "1000 m2",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Quần áo các loại", don_vi: "1000 cái",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"5",chi_tieu: "Giày, dép", don_vi: "1000 đôi",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"6",chi_tieu: "Gỗ cưa, xẻ các loại", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"7",chi_tieu: "Các hợp chất từ cao su", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"8",chi_tieu: "Xi măng", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
        ],
        [
            {thu_tu:"I",chi_tieu: "Chỉ số sản xuất công nghiệp (IIP) so với cùng kỳ theo giá so sánh năm 2010", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"1",chi_tieu: "Công nghiệp khai khoáng", don_vi: "%",cung_ky: 2, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Công nghiệp chế biến, chế tạo", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Công nghiệp sản xuất, phân phối điện, khí đốt", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Cung cấp nước, quản lý và xử lý nước thải, rác thải", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"II",chi_tieu: "Một số sản phẩm công nghiệp chủ yếu", don_vi: "",cung_ky: null, thuc_hien_so_voi_thang_truoc: null, thuc_hien_thang: null,thuc_hien_thang_truoc: null, thuc_hien_so_voi_cung_ky: null},
            {thu_tu:"1",chi_tieu: "Đá xây dựng", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Hạt điều nhân", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Vải dệt", don_vi: "1000 m2",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Quần áo các loại", don_vi: "1000 cái",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"5",chi_tieu: "Giày, dép", don_vi: "1000 đôi",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"6",chi_tieu: "Gỗ cưa, xẻ các loại", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"7",chi_tieu: "Các hợp chất từ cao su", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"8",chi_tieu: "Xi măng", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
        ],
        [
            {thu_tu:"I",chi_tieu: "Chỉ số sản xuất công nghiệp (IIP) so với cùng kỳ theo giá so sánh năm 2010", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"1",chi_tieu: "Công nghiệp khai khoáng", don_vi: "%",cung_ky: 3, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Công nghiệp chế biến, chế tạo", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Công nghiệp sản xuất, phân phối điện, khí đốt", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Cung cấp nước, quản lý và xử lý nước thải, rác thải", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"II",chi_tieu: "Một số sản phẩm công nghiệp chủ yếu", don_vi: "",cung_ky: null, thuc_hien_so_voi_thang_truoc: null, thuc_hien_thang: null,thuc_hien_thang_truoc: null, thuc_hien_so_voi_cung_ky: null},
            {thu_tu:"1",chi_tieu: "Đá xây dựng", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Hạt điều nhân", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Vải dệt", don_vi: "1000 m2",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Quần áo các loại", don_vi: "1000 cái",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"5",chi_tieu: "Giày, dép", don_vi: "1000 đôi",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"6",chi_tieu: "Gỗ cưa, xẻ các loại", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"7",chi_tieu: "Các hợp chất từ cao su", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"8",chi_tieu: "Xi măng", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
        ],
        [
            {thu_tu:"I",chi_tieu: "Chỉ số sản xuất công nghiệp (IIP) so với cùng kỳ theo giá so sánh năm 2010", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"1",chi_tieu: "Công nghiệp khai khoáng", don_vi: "%",cung_ky: 4, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Công nghiệp chế biến, chế tạo", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Công nghiệp sản xuất, phân phối điện, khí đốt", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Cung cấp nước, quản lý và xử lý nước thải, rác thải", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"II",chi_tieu: "Một số sản phẩm công nghiệp chủ yếu", don_vi: "",cung_ky: null, thuc_hien_so_voi_thang_truoc: null, thuc_hien_thang: null,thuc_hien_thang_truoc: null, thuc_hien_so_voi_cung_ky: null},
            {thu_tu:"1",chi_tieu: "Đá xây dựng", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Hạt điều nhân", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Vải dệt", don_vi: "1000 m2",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Quần áo các loại", don_vi: "1000 cái",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"5",chi_tieu: "Giày, dép", don_vi: "1000 đôi",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"6",chi_tieu: "Gỗ cưa, xẻ các loại", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"7",chi_tieu: "Các hợp chất từ cao su", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"8",chi_tieu: "Xi măng", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
        ],
        [
            {thu_tu:"I",chi_tieu: "Chỉ số sản xuất công nghiệp (IIP) so với cùng kỳ theo giá so sánh năm 2010", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"1",chi_tieu: "Công nghiệp khai khoáng", don_vi: "%",cung_ky: 5, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Công nghiệp chế biến, chế tạo", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Công nghiệp sản xuất, phân phối điện, khí đốt", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Cung cấp nước, quản lý và xử lý nước thải, rác thải", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"II",chi_tieu: "Một số sản phẩm công nghiệp chủ yếu", don_vi: "",cung_ky: null, thuc_hien_so_voi_thang_truoc: null, thuc_hien_thang: null,thuc_hien_thang_truoc: null, thuc_hien_so_voi_cung_ky: null},
            {thu_tu:"1",chi_tieu: "Đá xây dựng", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Hạt điều nhân", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Vải dệt", don_vi: "1000 m2",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Quần áo các loại", don_vi: "1000 cái",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"5",chi_tieu: "Giày, dép", don_vi: "1000 đôi",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"6",chi_tieu: "Gỗ cưa, xẻ các loại", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"7",chi_tieu: "Các hợp chất từ cao su", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"8",chi_tieu: "Xi măng", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
        ],
        [
            {thu_tu:"I",chi_tieu: "Chỉ số sản xuất công nghiệp (IIP) so với cùng kỳ theo giá so sánh năm 2010", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"1",chi_tieu: "Công nghiệp khai khoáng", don_vi: "%",cung_ky: 6, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Công nghiệp chế biến, chế tạo", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Công nghiệp sản xuất, phân phối điện, khí đốt", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Cung cấp nước, quản lý và xử lý nước thải, rác thải", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"II",chi_tieu: "Một số sản phẩm công nghiệp chủ yếu", don_vi: "",cung_ky: null, thuc_hien_so_voi_thang_truoc: null, thuc_hien_thang: null,thuc_hien_thang_truoc: null, thuc_hien_so_voi_cung_ky: null},
            {thu_tu:"1",chi_tieu: "Đá xây dựng", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Hạt điều nhân", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Vải dệt", don_vi: "1000 m2",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Quần áo các loại", don_vi: "1000 cái",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"5",chi_tieu: "Giày, dép", don_vi: "1000 đôi",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"6",chi_tieu: "Gỗ cưa, xẻ các loại", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"7",chi_tieu: "Các hợp chất từ cao su", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"8",chi_tieu: "Xi măng", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
        ],
        [
            {thu_tu:"I",chi_tieu: "Chỉ số sản xuất công nghiệp (IIP) so với cùng kỳ theo giá so sánh năm 2010", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"1",chi_tieu: "Công nghiệp khai khoáng", don_vi: "%",cung_ky: 7, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Công nghiệp chế biến, chế tạo", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Công nghiệp sản xuất, phân phối điện, khí đốt", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Cung cấp nước, quản lý và xử lý nước thải, rác thải", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"II",chi_tieu: "Một số sản phẩm công nghiệp chủ yếu", don_vi: "",cung_ky: null, thuc_hien_so_voi_thang_truoc: null, thuc_hien_thang: null,thuc_hien_thang_truoc: null, thuc_hien_so_voi_cung_ky: null},
            {thu_tu:"1",chi_tieu: "Đá xây dựng", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Hạt điều nhân", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Vải dệt", don_vi: "1000 m2",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Quần áo các loại", don_vi: "1000 cái",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"5",chi_tieu: "Giày, dép", don_vi: "1000 đôi",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"6",chi_tieu: "Gỗ cưa, xẻ các loại", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"7",chi_tieu: "Các hợp chất từ cao su", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"8",chi_tieu: "Xi măng", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
        ],
        [
            {thu_tu:"I",chi_tieu: "Chỉ số sản xuất công nghiệp (IIP) so với cùng kỳ theo giá so sánh năm 2010", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"1",chi_tieu: "Công nghiệp khai khoáng", don_vi: "%",cung_ky: 8, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Công nghiệp chế biến, chế tạo", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Công nghiệp sản xuất, phân phối điện, khí đốt", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Cung cấp nước, quản lý và xử lý nước thải, rác thải", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"II",chi_tieu: "Một số sản phẩm công nghiệp chủ yếu", don_vi: "",cung_ky: null, thuc_hien_so_voi_thang_truoc: null, thuc_hien_thang: null,thuc_hien_thang_truoc: null, thuc_hien_so_voi_cung_ky: null},
            {thu_tu:"1",chi_tieu: "Đá xây dựng", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Hạt điều nhân", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Vải dệt", don_vi: "1000 m2",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Quần áo các loại", don_vi: "1000 cái",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"5",chi_tieu: "Giày, dép", don_vi: "1000 đôi",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"6",chi_tieu: "Gỗ cưa, xẻ các loại", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"7",chi_tieu: "Các hợp chất từ cao su", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"8",chi_tieu: "Xi măng", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
        ],
        [
            {thu_tu:"I",chi_tieu: "Chỉ số sản xuất công nghiệp (IIP) so với cùng kỳ theo giá so sánh năm 2010", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"1",chi_tieu: "Công nghiệp khai khoáng", don_vi: "%",cung_ky: 9, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Công nghiệp chế biến, chế tạo", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Công nghiệp sản xuất, phân phối điện, khí đốt", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Cung cấp nước, quản lý và xử lý nước thải, rác thải", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"II",chi_tieu: "Một số sản phẩm công nghiệp chủ yếu", don_vi: "",cung_ky: null, thuc_hien_so_voi_thang_truoc: null, thuc_hien_thang: null,thuc_hien_thang_truoc: null, thuc_hien_so_voi_cung_ky: null},
            {thu_tu:"1",chi_tieu: "Đá xây dựng", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Hạt điều nhân", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Vải dệt", don_vi: "1000 m2",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Quần áo các loại", don_vi: "1000 cái",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"5",chi_tieu: "Giày, dép", don_vi: "1000 đôi",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"6",chi_tieu: "Gỗ cưa, xẻ các loại", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"7",chi_tieu: "Các hợp chất từ cao su", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"8",chi_tieu: "Xi măng", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
        ],
        [
            {thu_tu:"I",chi_tieu: "Chỉ số sản xuất công nghiệp (IIP) so với cùng kỳ theo giá so sánh năm 2010", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"1",chi_tieu: "Công nghiệp khai khoáng", don_vi: "%",cung_ky: 10, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Công nghiệp chế biến, chế tạo", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Công nghiệp sản xuất, phân phối điện, khí đốt", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Cung cấp nước, quản lý và xử lý nước thải, rác thải", don_vi: "%",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"II",chi_tieu: "Một số sản phẩm công nghiệp chủ yếu", don_vi: "",cung_ky: null, thuc_hien_so_voi_thang_truoc: null, thuc_hien_thang: null,thuc_hien_thang_truoc: null, thuc_hien_so_voi_cung_ky: null},
            {thu_tu:"1",chi_tieu: "Đá xây dựng", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"2",chi_tieu: "Hạt điều nhân", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"3",chi_tieu: "Vải dệt", don_vi: "1000 m2",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"4",chi_tieu: "Quần áo các loại", don_vi: "1000 cái",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"5",chi_tieu: "Giày, dép", don_vi: "1000 đôi",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"6",chi_tieu: "Gỗ cưa, xẻ các loại", don_vi: "m3",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"7",chi_tieu: "Các hợp chất từ cao su", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
            {thu_tu:"8",chi_tieu: "Xi măng", don_vi: "tấn",cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0,thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0},
        ],
    ]
    //TS & HTML variable -----------------------------------------------------------
    public dataSource: MatTableDataSource<IIPIndustrialMonthModel> = new MatTableDataSource<IIPIndustrialMonthModel>();
    public year: number = 2020;
    public month: number = 10;
    //Only TS Variable ------------------------------------------------------------
    private _linkOutput: LinkModel = new LinkModel();
    //ViewChild & Input & Output -------------------------------------------------
    @ViewChild('table', { static: false }) table: MatTable<IIPIndustrialMonthModel>;
    @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    //Contructor + Init + Destroy
    constructor(
        private _breadCrumService: BreadCrumService,
        private _route: ActivatedRoute
    ) {
        this._route.queryParams.subscribe(params => {
                this.year = params["year"];
                this.month = params["month"];
        });
        console.log(this._route.params);
     }

    ngOnInit() {
        this.initData();
        this.sendLinkToNext(true);
    }
    //HTML & TS Function ----------------------------------------------------------

    //TS Function -----------------------------------------------------------------
    private initData(): void {
        
        this.dataSource = new MatTableDataSource(this.getDataByMonth(this.month, this.year));
    }
    private sendLinkToNext(type: boolean): void {
        this._linkOutput.link = this.LINK_DEFAULT + "yaer=" + this.year + "&month=" + this.month;
        this._linkOutput.title = this.TITLE_DEFAULT + this.month + "/" + this.year;
        this._linkOutput.text = this.TEXT_DEFAULT + this.month + "/" + this.year;
        this._linkOutput.type = type;
        this._breadCrumService.sendLink(this._linkOutput);
    }

    private getDataByMonth(month: number, year:number) {
        if(year != 2020 || month > 10){
            return [];
        }
        else return this.DATA_DEFAULT[month-1];
    }
}