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
import { RetailModel, RetailMonthModel } from 'src/app/_models/commecial.model';

@Component({
    selector: 'retail-month',
    templateUrl: './retail-month.component.html',
    styleUrls: ['../../../special_layout.scss'],
})

export class RetailMonthComponent implements OnInit {
    //Constant variable -----------------------------------------------------------
    private readonly LINK_DEFAULT: string = "/specialized/commecial-management/retail/retail-detail?";
    private readonly TITLE_DEFAULT: string = "Tổng mức bán lẻ hàng hoá tháng ";
    private readonly TEXT_DEFAULT: string = "Tổng mức bán lẻ hàng hoá tháng ";
    public readonly DISPLAY_COLS: string[] = ['index', 'chi_tieu', 'don_vi', 'cung_ky', 'thuc_hien_thang_truoc', 'thuc_hien_thang', 'thuc_hien_so_voi_thang_truoc', 'thuc_hien_so_voi_cung_ky'];
    private readonly DATA_DEFAULT: Array<RetailMonthModel[]> = [
        [
            { thu_tu: " ", chi_tieu: "TỔNG MỨC BLHH VÀ DTDVTD", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "I", chi_tieu: "Tổng mức bán lẻ hàng hóa", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Lương thực, thực phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Hàng may mặc", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Đồ dùng, dụng cụ, trang thiết bị gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Vật phẩm, văn hoá, giáo dục", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Gỗ và vật liệu xây dựng", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "Ô tô con (dưới 9 chỗ ngồi)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Phương tiện đi lại, trừ ô tô con (kể cả phụ tùng)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "-", chi_tieu: "Trong đó xe đạp và phụ tùng xe đạp", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "8", chi_tieu: "Vải dệt", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "9", chi_tieu: "Xăng, dầu các loại", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "10", chi_tieu: "Nhiên liệu khác (trừ xăng dầu)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "11", chi_tieu: "Đá quý, kim loại quý và sản phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "12", chi_tieu: "Các hợp chất từ cao su", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "II", chi_tieu: "Doanh thu hoạt động dịch vụ (trừ lưu trú, ăn uống, dịch vụ lữ hành)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ kinh doanh bất động sản", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ hành chính và dịch vụ hỗ trợ", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ giáo dục và đào tạo", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Dịch vụ y tế và hoạt động trợ giúp xã hội", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Dịch vụ  nghệ thuật, vui chơi và giải trí", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "DV sửa chữa máy vi tính, đồ dùng cá nhân và gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Dịch vụ khác", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "III", chi_tieu: "Doanh thu DV ăn uống, lưu trú, du lịch lữ hành", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ lưu trú", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ ăn uống", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ lữ hành và hoạt động hỗ trợ du lịch", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
        ],
        [
            { thu_tu: " ", chi_tieu: "TỔNG MỨC BLHH VÀ DTDVTD", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "I", chi_tieu: "Tổng mức bán lẻ hàng hóa", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Lương thực, thực phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Hàng may mặc", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Đồ dùng, dụng cụ, trang thiết bị gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Vật phẩm, văn hoá, giáo dục", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Gỗ và vật liệu xây dựng", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "Ô tô con (dưới 9 chỗ ngồi)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Phương tiện đi lại, trừ ô tô con (kể cả phụ tùng)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "-", chi_tieu: "Trong đó xe đạp và phụ tùng xe đạp", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "8", chi_tieu: "Vải dệt", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "9", chi_tieu: "Xăng, dầu các loại", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "10", chi_tieu: "Nhiên liệu khác (trừ xăng dầu)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "11", chi_tieu: "Đá quý, kim loại quý và sản phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "12", chi_tieu: "Các hợp chất từ cao su", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "II", chi_tieu: "Doanh thu hoạt động dịch vụ (trừ lưu trú, ăn uống, dịch vụ lữ hành)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ kinh doanh bất động sản", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ hành chính và dịch vụ hỗ trợ", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ giáo dục và đào tạo", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Dịch vụ y tế và hoạt động trợ giúp xã hội", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Dịch vụ  nghệ thuật, vui chơi và giải trí", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "DV sửa chữa máy vi tính, đồ dùng cá nhân và gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Dịch vụ khác", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "III", chi_tieu: "Doanh thu DV ăn uống, lưu trú, du lịch lữ hành", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ lưu trú", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ ăn uống", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ lữ hành và hoạt động hỗ trợ du lịch", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
        ],
        [
            { thu_tu: " ", chi_tieu: "TỔNG MỨC BLHH VÀ DTDVTD", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "I", chi_tieu: "Tổng mức bán lẻ hàng hóa", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Lương thực, thực phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Hàng may mặc", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Đồ dùng, dụng cụ, trang thiết bị gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Vật phẩm, văn hoá, giáo dục", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Gỗ và vật liệu xây dựng", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "Ô tô con (dưới 9 chỗ ngồi)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Phương tiện đi lại, trừ ô tô con (kể cả phụ tùng)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "-", chi_tieu: "Trong đó xe đạp và phụ tùng xe đạp", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "8", chi_tieu: "Vải dệt", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "9", chi_tieu: "Xăng, dầu các loại", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "10", chi_tieu: "Nhiên liệu khác (trừ xăng dầu)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "11", chi_tieu: "Đá quý, kim loại quý và sản phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "12", chi_tieu: "Các hợp chất từ cao su", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "II", chi_tieu: "Doanh thu hoạt động dịch vụ (trừ lưu trú, ăn uống, dịch vụ lữ hành)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ kinh doanh bất động sản", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ hành chính và dịch vụ hỗ trợ", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ giáo dục và đào tạo", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Dịch vụ y tế và hoạt động trợ giúp xã hội", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Dịch vụ  nghệ thuật, vui chơi và giải trí", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "DV sửa chữa máy vi tính, đồ dùng cá nhân và gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Dịch vụ khác", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "III", chi_tieu: "Doanh thu DV ăn uống, lưu trú, du lịch lữ hành", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ lưu trú", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ ăn uống", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ lữ hành và hoạt động hỗ trợ du lịch", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
        ],
        [
            { thu_tu: " ", chi_tieu: "TỔNG MỨC BLHH VÀ DTDVTD", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "I", chi_tieu: "Tổng mức bán lẻ hàng hóa", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Lương thực, thực phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Hàng may mặc", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Đồ dùng, dụng cụ, trang thiết bị gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Vật phẩm, văn hoá, giáo dục", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Gỗ và vật liệu xây dựng", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "Ô tô con (dưới 9 chỗ ngồi)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Phương tiện đi lại, trừ ô tô con (kể cả phụ tùng)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "-", chi_tieu: "Trong đó xe đạp và phụ tùng xe đạp", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "8", chi_tieu: "Vải dệt", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "9", chi_tieu: "Xăng, dầu các loại", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "10", chi_tieu: "Nhiên liệu khác (trừ xăng dầu)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "11", chi_tieu: "Đá quý, kim loại quý và sản phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "12", chi_tieu: "Các hợp chất từ cao su", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "II", chi_tieu: "Doanh thu hoạt động dịch vụ (trừ lưu trú, ăn uống, dịch vụ lữ hành)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ kinh doanh bất động sản", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ hành chính và dịch vụ hỗ trợ", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ giáo dục và đào tạo", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Dịch vụ y tế và hoạt động trợ giúp xã hội", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Dịch vụ  nghệ thuật, vui chơi và giải trí", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "DV sửa chữa máy vi tính, đồ dùng cá nhân và gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Dịch vụ khác", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "III", chi_tieu: "Doanh thu DV ăn uống, lưu trú, du lịch lữ hành", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ lưu trú", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ ăn uống", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ lữ hành và hoạt động hỗ trợ du lịch", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
        ],
        [
            { thu_tu: " ", chi_tieu: "TỔNG MỨC BLHH VÀ DTDVTD", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "I", chi_tieu: "Tổng mức bán lẻ hàng hóa", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Lương thực, thực phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Hàng may mặc", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Đồ dùng, dụng cụ, trang thiết bị gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Vật phẩm, văn hoá, giáo dục", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Gỗ và vật liệu xây dựng", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "Ô tô con (dưới 9 chỗ ngồi)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Phương tiện đi lại, trừ ô tô con (kể cả phụ tùng)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "-", chi_tieu: "Trong đó xe đạp và phụ tùng xe đạp", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "8", chi_tieu: "Vải dệt", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "9", chi_tieu: "Xăng, dầu các loại", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "10", chi_tieu: "Nhiên liệu khác (trừ xăng dầu)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "11", chi_tieu: "Đá quý, kim loại quý và sản phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "12", chi_tieu: "Các hợp chất từ cao su", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "II", chi_tieu: "Doanh thu hoạt động dịch vụ (trừ lưu trú, ăn uống, dịch vụ lữ hành)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ kinh doanh bất động sản", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ hành chính và dịch vụ hỗ trợ", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ giáo dục và đào tạo", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Dịch vụ y tế và hoạt động trợ giúp xã hội", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Dịch vụ  nghệ thuật, vui chơi và giải trí", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "DV sửa chữa máy vi tính, đồ dùng cá nhân và gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Dịch vụ khác", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "III", chi_tieu: "Doanh thu DV ăn uống, lưu trú, du lịch lữ hành", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ lưu trú", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ ăn uống", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ lữ hành và hoạt động hỗ trợ du lịch", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
        ],
        //Tháng 6
        [
            { thu_tu: " ", chi_tieu: "TỔNG MỨC BLHH VÀ DTDVTD", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 3867798.54, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "I", chi_tieu: "Tổng mức bán lẻ hàng hóa", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 3235631.15, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Lương thực, thực phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 1704508.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Hàng may mặc", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 184965.24, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Đồ dùng, dụng cụ, trang thiết bị gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 430201.4, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Vật phẩm, văn hoá, giáo dục", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 38500.61, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Gỗ và vật liệu xây dựng", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 268950.1, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "Ô tô con (dưới 9 chỗ ngồi)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 10683.14, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Phương tiện đi lại, trừ ô tô con (kể cả phụ tùng)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 92320.31, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "-", chi_tieu: "Trong đó xe đạp và phụ tùng xe đạp", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 3201.21, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "8", chi_tieu: "Vải dệt", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 181584.51, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "9", chi_tieu: "Xăng, dầu các loại", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 78534.87, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "10", chi_tieu: "Nhiên liệu khác (trừ xăng dầu)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 82954.1, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "11", chi_tieu: "Đá quý, kim loại quý và sản phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 105210.65, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "12", chi_tieu: "Các hợp chất từ cao su", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 54016.51, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "II", chi_tieu: "Doanh thu hoạt động dịch vụ (trừ lưu trú, ăn uống, dịch vụ lữ hành)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 219394.4, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ kinh doanh bất động sản", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 40660.25, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ hành chính và dịch vụ hỗ trợ", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 22324.21, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ giáo dục và đào tạo", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 888.52, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Dịch vụ y tế và hoạt động trợ giúp xã hội", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 2140.61, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Dịch vụ  nghệ thuật, vui chơi và giải trí", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 85521.91, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "DV sửa chữa máy vi tính, đồ dùng cá nhân và gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 26101.28, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Dịch vụ khác", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 41757.62, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "III", chi_tieu: "Doanh thu DV ăn uống, lưu trú, du lịch lữ hành", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 412772.99, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ lưu trú", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 17425.31, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ ăn uống", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 395217.68, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ lữ hành và hoạt động hỗ trợ du lịch", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 130, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
        ],
        //Tháng 7
        [
            { thu_tu: " ", chi_tieu: "TỔNG MỨC BLHH VÀ DTDVTD", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 4131798.3, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "I", chi_tieu: "Tổng mức bán lẻ hàng hóa", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 3401167.8, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Lương thực, thực phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 1804166.3, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Hàng may mặc", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 195766.3, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Đồ dùng, dụng cụ, trang thiết bị gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 451713.3, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Vật phẩm, văn hoá, giáo dục", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 40948.8, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Gỗ và vật liệu xây dựng", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 270765.6, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "Ô tô con (dưới 9 chỗ ngồi)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 11118, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Phương tiện đi lại, trừ ô tô con (kể cả phụ tùng)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 96720, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "-", chi_tieu: "Trong đó xe đạp và phụ tùng xe đạp", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 3450.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "8", chi_tieu: "Vải dệt", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 190356.3, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "9", chi_tieu: "Xăng, dầu các loại", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 81201.7, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "10", chi_tieu: "Nhiên liệu khác (trừ xăng dầu)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 86163, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "11", chi_tieu: "Đá quý, kim loại quý và sản phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 110347.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "12", chi_tieu: "Các hợp chất từ cao su", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 58450.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "II", chi_tieu: "Doanh thu hoạt động dịch vụ (trừ lưu trú, ăn uống, dịch vụ lữ hành)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 310112.88, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ kinh doanh bất động sản", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 42160.2, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ hành chính và dịch vụ hỗ trợ", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 26567.1, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ giáo dục và đào tạo", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 1032.7, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Dịch vụ y tế và hoạt động trợ giúp xã hội", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 2442.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Dịch vụ  nghệ thuật, vui chơi và giải trí", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 168263.8, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "DV sửa chữa máy vi tính, đồ dùng cá nhân và gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 26101.28, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Dịch vụ khác", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 43545.3, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "III", chi_tieu: "Doanh thu DV ăn uống, lưu trú, du lịch lữ hành", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 420517.62, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ lưu trú", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 17855.31, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ ăn uống", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 402452.31, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ lữ hành và hoạt động hỗ trợ du lịch", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 210, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
        ],
        //Tháng 8
        [
            { thu_tu: " ", chi_tieu: "TỔNG MỨC BLHH VÀ DTDVTD", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 4352513.4, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "I", chi_tieu: "Tổng mức bán lẻ hàng hóa", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 3556926.4, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Lương thực, thực phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 1889130.1, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Hàng may mặc", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 205625.3, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Đồ dùng, dụng cụ, trang thiết bị gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 465571.8, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Vật phẩm, văn hoá, giáo dục", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 38334.6, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Gỗ và vật liệu xây dựng", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 293575.4, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "Ô tô con (dưới 9 chỗ ngồi)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 11310, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Phương tiện đi lại, trừ ô tô con (kể cả phụ tùng)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 99188, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "-", chi_tieu: "Trong đó xe đạp và phụ tùng xe đạp", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 4250, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "8", chi_tieu: "Vải dệt", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 199303.3, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "9", chi_tieu: "Xăng, dầu các loại", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 82921.7, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "10", chi_tieu: "Nhiên liệu khác (trừ xăng dầu)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 91879.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "11", chi_tieu: "Đá quý, kim loại quý và sản phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 112571.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "12", chi_tieu: "Các hợp chất từ cao su", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 63265.2, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "II", chi_tieu: "Doanh thu hoạt động dịch vụ (trừ lưu trú, ăn uống, dịch vụ lữ hành)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 375722.87, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ kinh doanh bất động sản", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 43283.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ hành chính và dịch vụ hỗ trợ", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 27325.14, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ giáo dục và đào tạo", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 1085.21, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Dịch vụ y tế và hoạt động trợ giúp xã hội", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 2562.34, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Dịch vụ  nghệ thuật, vui chơi và giải trí", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 229016.1, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "DV sửa chữa máy vi tính, đồ dùng cá nhân và gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 26905.28, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Dịch vụ khác", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 45545.3, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "III", chi_tieu: "Doanh thu DV ăn uống, lưu trú, du lịch lữ hành", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 419864.13, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ lưu trú", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 18305.21, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ ăn uống", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 401558.92, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ lữ hành và hoạt động hỗ trợ du lịch", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 0, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
        ],
        //Tháng 9
        [
            { thu_tu: " ", chi_tieu: "TỔNG MỨC BLHH VÀ DTDVTD", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 4441344.20000216, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "I", chi_tieu: "Tổng mức bán lẻ hàng hóa", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 3634958.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Lương thực, thực phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 1934012.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Hàng may mặc", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 210779, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Đồ dùng, dụng cụ, trang thiết bị gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 474301.7, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Vật phẩm, văn hoá, giáo dục", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 39634.2, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Gỗ và vật liệu xây dựng", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 298506.3, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "Ô tô con (dưới 9 chỗ ngồi)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 13610, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Phương tiện đi lại, trừ ô tô con (kể cả phụ tùng)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 101319, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "-", chi_tieu: "Trong đó xe đạp và phụ tùng xe đạp", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 4350, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "8", chi_tieu: "Vải dệt", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 200760.3, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "9", chi_tieu: "Xăng, dầu các loại", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 83985, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "10", chi_tieu: "Nhiên liệu khác (trừ xăng dầu)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 92869.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "11", chi_tieu: "Đá quý, kim loại quý và sản phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 114255.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "12", chi_tieu: "Các hợp chất từ cao su", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 66575.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "II", chi_tieu: "Doanh thu hoạt động dịch vụ (trừ lưu trú, ăn uống, dịch vụ lữ hành)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 380501.68, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ kinh doanh bất động sản", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 44180.57, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ hành chính và dịch vụ hỗ trợ", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 27850.01, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ giáo dục và đào tạo", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 1119.03, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Dịch vụ y tế và hoạt động trợ giúp xã hội", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 2597.04, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Dịch vụ  nghệ thuật, vui chơi và giải trí", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 230584.6, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "DV sửa chữa máy vi tính, đồ dùng cá nhân và gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 27573.43, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Dịch vụ khác", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 46597, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "III", chi_tieu: "Doanh thu DV ăn uống, lưu trú, du lịch lữ hành", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 425884.02000216, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ lưu trú", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 18620.61, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ ăn uống", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 407235.41000216, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ lữ hành và hoạt động hỗ trợ du lịch", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 28, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
        ],
        //Tháng 10
        [
            { thu_tu: " ", chi_tieu: "TỔNG MỨC BLHH VÀ DTDVTD", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 4554828.67, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "I", chi_tieu: "Tổng mức bán lẻ hàng hóa", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 3729298.41, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Lương thực, thực phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 1987192.85, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Hàng may mặc", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 215975.69, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Đồ dùng, dụng cụ, trang thiết bị gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 483426.49, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Vật phẩm, văn hoá, giáo dục", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 39645.34, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Gỗ và vật liệu xây dựng", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 310920.89, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "Ô tô con (dưới 9 chỗ ngồi)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 11632.51, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Phương tiện đi lại, trừ ô tô con (kể cả phụ tùng)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 102975.51, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "-", chi_tieu: "Trong đó xe đạp và phụ tùng xe đạp", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 4354.89, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "8", chi_tieu: "Vải dệt", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 207549.57, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "9", chi_tieu: "Xăng, dầu các loại", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 85662.89, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "10", chi_tieu: "Nhiên liệu khác (trừ xăng dầu)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 95224.32, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "11", chi_tieu: "Đá quý, kim loại quý và sản phẩm", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 117875.64, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "12", chi_tieu: "Các hợp chất từ cao su", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 66861.82, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "II", chi_tieu: "Doanh thu hoạt động dịch vụ (trừ lưu trú, ăn uống, dịch vụ lữ hành)", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 389257.34, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ kinh doanh bất động sản", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 44918.12, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ hành chính và dịch vụ hỗ trợ", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 28363.32, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ giáo dục và đào tạo", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 1144.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "4", chi_tieu: "Dịch vụ y tế và hoạt động trợ giúp xã hội", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 2637.11, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "5", chi_tieu: "Dịch vụ  nghệ thuật, vui chơi và giải trí", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 237261.1, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "6", chi_tieu: "DV sửa chữa máy vi tính, đồ dùng cá nhân và gia đình", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 27931.05, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "7", chi_tieu: "Dịch vụ khác", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 47002.14, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "III", chi_tieu: "Doanh thu DV ăn uống, lưu trú, du lịch lữ hành", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 436272.92, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "1", chi_tieu: "Dịch vụ lưu trú", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 18889.02, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "2", chi_tieu: "Dịch vụ ăn uống", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 417293.4, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
            { thu_tu: "3", chi_tieu: "Dịch vụ lữ hành và hoạt động hỗ trợ du lịch", don_vi: "triệu đồng", cung_ky: 0, thuc_hien_so_voi_thang_truoc: 0, thuc_hien_thang: 90.5, thuc_hien_thang_truoc: 0, thuc_hien_so_voi_cung_ky: 0, },
        ],
    ]
    //TS & HTML variable -----------------------------------------------------------
    public dataSource: MatTableDataSource<RetailMonthModel> = new MatTableDataSource<RetailMonthModel>();
    public year: number = 2020;
    public month: number = 10;
    //Only TS Variable ------------------------------------------------------------
    private _linkOutput: LinkModel = new LinkModel();
    //ViewChild & Input & Output -------------------------------------------------
    @ViewChild('table', { static: false }) table: MatTable<RetailMonthModel>;
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
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Số hàng';
        this.paginator._intl.firstPageLabel = "Trang Đầu";
        this.paginator._intl.lastPageLabel = "Trang Cuối";
        this.paginator._intl.previousPageLabel = "Trang Trước";
        this.paginator._intl.nextPageLabel = "Trang Tiếp";
    }
    private sendLinkToNext(type: boolean): void {
        this._linkOutput.link = this.LINK_DEFAULT + "yaer=" + this.year + "&month=" + this.month;
        this._linkOutput.title = this.TITLE_DEFAULT + this.month + "/" + this.year;
        this._linkOutput.text = this.TEXT_DEFAULT + this.month + "/" + this.year;
        this._linkOutput.type = type;
        this._breadCrumService.sendLink(this._linkOutput);
    }

    private getDataByMonth(month: number, year: number) {
        console.log("year:", year, " and month: ", month);
        if (year != 2020 || month > 10) {
            return [];
        }
        else return this.DATA_DEFAULT[month - 1];
    }
}