import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { SCTService } from 'src/app/_services/APIService/sct.service';
import { District } from 'src/app/_models/district.model';
import { ClusterFilterModel, ClusterModel } from 'src/app/_models/APIModel/cluster.model';
import { ClusterDetailModel, ClusterDetailShortModel } from 'src/app/_models/industry.model';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'detail-cluster-management',
    templateUrl: './detail-cluster-management.component.html',
    styleUrls: ['../../../special_layout.scss'],
})

export class DetailClusterManagementComponent implements OnInit {
    topColumns: string[] = ['index', 'chi_tieu', 'dien_giai'];
    dataSource: MatTableDataSource<ClusterDetailShortModel> = new MatTableDataSource<ClusterDetailShortModel>();
    public data: ClusterDetailModel[] = [
        {
            chu_dau_tu: "Công ty CP ĐT BĐS Thành Phương",
            co_so_phap_lys: [
                "Văn bản giới thiệu địa điểm số 41/UBND-ĐT ngày 04/01/2017",
                "Quyết định phê duyệt Quy hoạch chi tiết số 1759/QĐ.CT.UBT ngày 17/6/2003",
                "Quyết định thành lập cụm số 1957/QĐ-UBND ngày 11/6/2018"
            ],
            dia_chi: "Phường Tân Phú, Thành phố Đồng Xoài, Tỉnh Bình Phước",
            dien_giai: "Tiến độ đăng ký đầu tư (theo Quyết định thành lập CCN)<br> + Giai đoạn 2018 - 2019: Thực hiện đầu tư xây dựng dự án. <br>+ Từ tháng 01/2020: Khai thác kinh doanh.<br><br>- Lĩnh vực đầu tư CCN: Làm cụm công nghiệp đa ngành nghề, phân làm 02 loại công nghiệp sạch và công nghiệp ít ô nhiễm không han chế thể loại, ưu tiên một số ngành phù hợp ngành nghề truyền thống và vùng nguyên liệu tại địa phương. Các ngành nghề chính ưu tiên thu hút đầu tư vào cụm <br><strong>Công nghiệp:</strong> <br>- Gia công cơ khí (ngành nghề không gây ô nhiễm)<br>- xây dựng nhà kho<br>- nhà xưởng cho thuê<br>- công nghiệp gốm sứ<br>- chế biến gỗ hàng mộc<br>- vật liệu xây dựng<br>-  may mặc<br>- gia công hàng thủ công mỹ nghệ<br>- chế biến nông sản thực phẩm.",
            dien_tich: 62.3,
            hinh_anhs: [
                "./assets/img/cluster/TANPHU/CNN-TANPHU-001.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-002.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-003.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-004.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-005.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-006.png"
            ],
            id: 20,
            ten_cum_cong_nghiep: "Cụm công nghiệp Tân Phú",
            downloadPDF: "./assets/img/cluster/TANPHU/QH05A-KS KTCQ TAN PHU.pdf"
        },
        {
            chu_dau_tu: "Tổng công ty thương mại xuất nhập khẩu Thanh Lễ - CTCP",
            co_so_phap_lys: [
                "Văn bản giới thiệu địa điểm số 41/UBND-ĐT ngày 04/01/2017",
                "Quyết định phê duyệt Quy hoạch chi tiết số 1759/QĐ.CT.UBT ngày 17/6/2003",
                "Quyết định thành lập cụm số 1957/QĐ-UBND ngày 11/6/2018"
            ],
            dia_chi: "Đường Quốc lộ 14, Xã Nha Bích, Chơn Thành, Bình Phước",
            dien_giai: "Tiến độ đăng ký đầu tư (theo Quyết định thành lập CCN)<br> + Giai đoạn 2018 - 2019: Thực hiện đầu tư xây dựng dự án. <br>+ Từ tháng 01/2020: Khai thác kinh doanh.<br><br>- Lĩnh vực đầu tư CCN: Làm cụm công nghiệp đa ngành nghề, phân làm 02 loại công nghiệp sạch và công nghiệp ít ô nhiễm không han chế thể loại, ưu tiên một số ngành phù hợp ngành nghề truyền thống và vùng nguyên liệu tại địa phương. Các ngành nghề chính ưu tiên thu hút đầu tư vào cụm <br><strong>Công nghiệp:</strong> <br>- Gia công cơ khí (ngành nghề không gây ô nhiễm)<br>- xây dựng nhà kho<br>- nhà xưởng cho thuê<br>- công nghiệp gốm sứ<br>- chế biến gỗ hàng mộc<br>- vật liệu xây dựng<br>-  may mặc<br>- gia công hàng thủ công mỹ nghệ<br>- chế biến nông sản thực phẩm.",
            dien_tich: 74.59,
            hinh_anhs: [
                "./assets/img/cluster/TANPHU/CNN-TANPHU-001.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-002.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-003.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-004.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-005.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-006.png"
            ],
            id: 40,
            ten_cum_cong_nghiep: "Cụm công nghiệp Nha Bích",
            downloadPDF: "./assets/img/cluster/NHABICH/QH CANH QUAN CCN NHA BICH.pdf"
        },
        {
            chu_dau_tu: "Công ty TNHH MTV cao su Phú Riềng",
            co_so_phap_lys: [
                "Văn bản giới thiệu địa điểm số 41/UBND-ĐT ngày 04/01/2017",
                "Quyết định phê duyệt Quy hoạch chi tiết số 1759/QĐ.CT.UBT ngày 17/6/2003",
                "Quyết định thành lập cụm số 1957/QĐ-UBND ngày 11/6/2018"
            ],
            dia_chi: "huyện Bù Đăng, tỉnh Bình Phước",
            dien_giai: "Tiến độ đăng ký đầu tư (theo Quyết định thành lập CCN)<br> + Giai đoạn 2018 - 2019: Thực hiện đầu tư xây dựng dự án. <br>+ Từ tháng 01/2020: Khai thác kinh doanh.<br><br>- Lĩnh vực đầu tư CCN: Làm cụm công nghiệp đa ngành nghề, phân làm 02 loại công nghiệp sạch và công nghiệp ít ô nhiễm không han chế thể loại, ưu tiên một số ngành phù hợp ngành nghề truyền thống và vùng nguyên liệu tại địa phương. Các ngành nghề chính ưu tiên thu hút đầu tư vào cụm <br><strong>Công nghiệp:</strong> <br>- Gia công cơ khí (ngành nghề không gây ô nhiễm)<br>- xây dựng nhà kho<br>- nhà xưởng cho thuê<br>- công nghiệp gốm sứ<br>- chế biến gỗ hàng mộc<br>- vật liệu xây dựng<br>-  may mặc<br>- gia công hàng thủ công mỹ nghệ<br>- chế biến nông sản thực phẩm.",
            dien_tich: 40,
            hinh_anhs: [
                "./assets/img/cluster/TANPHU/CNN-TANPHU-001.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-002.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-003.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-004.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-005.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-006.png"
            ],
            id: 21,
            ten_cum_cong_nghiep: "Cụm công nghiệp Minh Hưng I",
            downloadPDF: "./assets/img/cluster/TANPHU/QH05A-KS KTCQ TAN PHU.pdf"
        }
        ,
        {
            chu_dau_tu: "Công ty TNHH MTV cao su Phú Riềng",
            co_so_phap_lys: [
                "Văn bản giới thiệu địa điểm số 41/UBND-ĐT ngày 04/01/2017",
                "Quyết định phê duyệt Quy hoạch chi tiết số 1759/QĐ.CT.UBT ngày 17/6/2003",
                "Quyết định thành lập cụm số 1957/QĐ-UBND ngày 11/6/2018"
            ],
            dia_chi: "huyện Bù Đăng, tỉnh Bình Phước",
            dien_giai: "Tiến độ đăng ký đầu tư (theo Quyết định thành lập CCN)<br> + Giai đoạn 2018 - 2019: Thực hiện đầu tư xây dựng dự án. <br>+ Từ tháng 01/2020: Khai thác kinh doanh.<br><br>- Lĩnh vực đầu tư CCN: Làm cụm công nghiệp đa ngành nghề, phân làm 02 loại công nghiệp sạch và công nghiệp ít ô nhiễm không han chế thể loại, ưu tiên một số ngành phù hợp ngành nghề truyền thống và vùng nguyên liệu tại địa phương. Các ngành nghề chính ưu tiên thu hút đầu tư vào cụm <br><strong>Công nghiệp:</strong> <br>- Gia công cơ khí (ngành nghề không gây ô nhiễm)<br>- xây dựng nhà kho<br>- nhà xưởng cho thuê<br>- công nghiệp gốm sứ<br>- chế biến gỗ hàng mộc<br>- vật liệu xây dựng<br>-  may mặc<br>- gia công hàng thủ công mỹ nghệ<br>- chế biến nông sản thực phẩm.",
            dien_tich: 32.7,
            hinh_anhs: [
                "./assets/img/cluster/TANPHU/CNN-TANPHU-001.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-002.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-003.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-004.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-005.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-006.png"
            ],
            id: 22,
            ten_cum_cong_nghiep: "Cụm công nghiệp Minh Hưng II",
            downloadPDF: "./assets/img/cluster/TANPHU/QH05A-KS KTCQ TAN PHU.pdf"
        },
        {
            chu_dau_tu: "Công ty CP ĐT BĐS Thành Phương",
            co_so_phap_lys: [
                "Văn bản giới thiệu địa điểm số 41/UBND-ĐT ngày 04/01/2017",
                "Quyết định phê duyệt Quy hoạch chi tiết số 1759/QĐ.CT.UBT ngày 17/6/2003",
                "Quyết định thành lập cụm số 1957/QĐ-UBND ngày 11/6/2018"
            ],
            dia_chi: "huyện Bù Đăng, tỉnh Bình Phước",
            dien_giai: "Tiến độ đăng ký đầu tư (theo Quyết định thành lập CCN)<br> + Giai đoạn 2018 - 2019: Thực hiện đầu tư xây dựng dự án. <br>+ Từ tháng 01/2020: Khai thác kinh doanh.<br><br>- Lĩnh vực đầu tư CCN: Làm cụm công nghiệp đa ngành nghề, phân làm 02 loại công nghiệp sạch và công nghiệp ít ô nhiễm không han chế thể loại, ưu tiên một số ngành phù hợp ngành nghề truyền thống và vùng nguyên liệu tại địa phương. Các ngành nghề chính ưu tiên thu hút đầu tư vào cụm <br><strong>Công nghiệp:</strong> <br>- Gia công cơ khí (ngành nghề không gây ô nhiễm)<br>- xây dựng nhà kho<br>- nhà xưởng cho thuê<br>- công nghiệp gốm sứ<br>- chế biến gỗ hàng mộc<br>- vật liệu xây dựng<br>-  may mặc<br>- gia công hàng thủ công mỹ nghệ<br>- chế biến nông sản thực phẩm.",
            dien_tich: 55.9,
            hinh_anhs: [
                "./assets/img/cluster/TANPHU/CNN-TANPHU-001.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-002.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-003.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-004.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-005.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-006.png"
            ],
            id: 18,
            ten_cum_cong_nghiep: "Cụm công nghiệp Tân Tiến 1",
            downloadPDF: "./assets/img/cluster/TANTIENI/QH05A-KS KTCQ TAN TIEN1.pdf"
        },
        {
            chu_dau_tu: "Công ty CP ĐT BĐS Thành Phương",
            co_so_phap_lys: [
                "Văn bản giới thiệu địa điểm số 41/UBND-ĐT ngày 04/01/2017",
                "Quyết định phê duyệt Quy hoạch chi tiết số 1759/QĐ.CT.UBT ngày 17/6/2003",
                "Quyết định thành lập cụm số 1957/QĐ-UBND ngày 11/6/2018"
            ],
            dia_chi: "huyện Bù Đăng, tỉnh Bình Phước",
            dien_giai: "Tiến độ đăng ký đầu tư (theo Quyết định thành lập CCN)<br> + Giai đoạn 2018 - 2019: Thực hiện đầu tư xây dựng dự án. <br>+ Từ tháng 01/2020: Khai thác kinh doanh.<br><br>- Lĩnh vực đầu tư CCN: Làm cụm công nghiệp đa ngành nghề, phân làm 02 loại công nghiệp sạch và công nghiệp ít ô nhiễm không han chế thể loại, ưu tiên một số ngành phù hợp ngành nghề truyền thống và vùng nguyên liệu tại địa phương. Các ngành nghề chính ưu tiên thu hút đầu tư vào cụm <br><strong>Công nghiệp:</strong> <br>- Gia công cơ khí (ngành nghề không gây ô nhiễm)<br>- xây dựng nhà kho<br>- nhà xưởng cho thuê<br>- công nghiệp gốm sứ<br>- chế biến gỗ hàng mộc<br>- vật liệu xây dựng<br>-  may mặc<br>- gia công hàng thủ công mỹ nghệ<br>- chế biến nông sản thực phẩm.",
            dien_tich: 56.3,
            hinh_anhs: [
                "./assets/img/cluster/TANPHU/CNN-TANPHU-001.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-002.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-003.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-004.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-005.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-006.png"
            ],
            id: 19,
            ten_cum_cong_nghiep: "Cụm công nghiệp Tân Tiến 2",
            downloadPDF: "./assets/img/cluster/TANTIENII/QH05A-KS KTCQ TAN TIEN 2.pdf"
        }
        ,
        {
            chu_dau_tu: "Công ty CP ĐT BĐS Thành Phương",
            co_so_phap_lys: [
                "Văn bản giới thiệu địa điểm số 41/UBND-ĐT ngày 04/01/2017",
                "Quyết định phê duyệt Quy hoạch chi tiết số 1759/QĐ.CT.UBT ngày 17/6/2003",
                "Quyết định thành lập cụm số 1957/QĐ-UBND ngày 11/6/2018"
            ],
            dia_chi: "Thành phố Đồng Xoài, tỉnh Bình Phước",
            dien_giai: "Tiến độ đăng ký đầu tư (theo Quyết định thành lập CCN)<br> + Giai đoạn 2018 - 2019: Thực hiện đầu tư xây dựng dự án. <br>+ Từ tháng 01/2020: Khai thác kinh doanh.<br><br>- Lĩnh vực đầu tư CCN: Làm cụm công nghiệp đa ngành nghề, phân làm 02 loại công nghiệp sạch và công nghiệp ít ô nhiễm không han chế thể loại, ưu tiên một số ngành phù hợp ngành nghề truyền thống và vùng nguyên liệu tại địa phương. Các ngành nghề chính ưu tiên thu hút đầu tư vào cụm <br><strong>Công nghiệp:</strong> <br>- Gia công cơ khí (ngành nghề không gây ô nhiễm)<br>- xây dựng nhà kho<br>- nhà xưởng cho thuê<br>- công nghiệp gốm sứ<br>- chế biến gỗ hàng mộc<br>- vật liệu xây dựng<br>-  may mặc<br>- gia công hàng thủ công mỹ nghệ<br>- chế biến nông sản thực phẩm.",
            dien_tich: 57.5,
            hinh_anhs: [
                "./assets/img/cluster/TANPHU/CNN-TANPHU-001.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-002.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-003.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-004.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-005.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-006.png"
            ],
            id: 30,
            ten_cum_cong_nghiep: "Cụm công nghiệp Tiến Hưng I",
            downloadPDF: "./assets/img/cluster/TIENHUNGI/QH05A-KS KTCQ TIEN HUNG-1.pdf"
        },
        {
            chu_dau_tu: "Công ty CP ĐT BĐS Thành Phương",
            co_so_phap_lys: [
                "Văn bản giới thiệu địa điểm số 41/UBND-ĐT ngày 04/01/2017",
                "Quyết định phê duyệt Quy hoạch chi tiết số 1759/QĐ.CT.UBT ngày 17/6/2003",
                "Quyết định thành lập cụm số 1957/QĐ-UBND ngày 11/6/2018"
            ],
            dia_chi: "huyện Đồng Phú, tỉnh Bình Phước",
            dien_giai: "Tiến độ đăng ký đầu tư (theo Quyết định thành lập CCN)<br> + Giai đoạn 2018 - 2019: Thực hiện đầu tư xây dựng dự án. <br>+ Từ tháng 01/2020: Khai thác kinh doanh.<br><br>- Lĩnh vực đầu tư CCN: Làm cụm công nghiệp đa ngành nghề, phân làm 02 loại công nghiệp sạch và công nghiệp ít ô nhiễm không han chế thể loại, ưu tiên một số ngành phù hợp ngành nghề truyền thống và vùng nguyên liệu tại địa phương. Các ngành nghề chính ưu tiên thu hút đầu tư vào cụm <br><strong>Công nghiệp:</strong> <br>- Gia công cơ khí (ngành nghề không gây ô nhiễm)<br>- xây dựng nhà kho<br>- nhà xưởng cho thuê<br>- công nghiệp gốm sứ<br>- chế biến gỗ hàng mộc<br>- vật liệu xây dựng<br>-  may mặc<br>- gia công hàng thủ công mỹ nghệ<br>- chế biến nông sản thực phẩm.",
            dien_tich: 10,
            hinh_anhs: [
                "./assets/img/cluster/TANPHU/CNN-TANPHU-001.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-002.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-003.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-004.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-005.png",
                "./assets/img/cluster/TANPHU/CNN-TANPHU-006.png"
            ],
            id: 14,
            ten_cum_cong_nghiep: "Cụm công nghiệp Hà Mị",
            downloadPDF: "./assets/img/cluster/HAMI/CCN HÀ MỴ N.PNG"
        }
        //40: Nha Bích, 21: Minh hưng 1, 22: Minh hưng 2, 18: Tân Tiến 1, 19:Tân Tiến 2, 20: Tân Phú, 30: Tiến hưng 1,
        //14: Hà Mị
    ]


    public _clusterDetail: ClusterDetailModel = new ClusterDetailModel();
    private _id: number = 0;
    public tenCumCongNghiep: string;
    @ViewChild('table', { static: false }) table: MatTable<ClusterModel>;

    constructor(
        public sctService: SCTService,
        public route: ActivatedRoute,) {
        this.route.params.subscribe(params => {
            this._id = params['id'];
        });
    }

    ngOnInit() {
        this._getClusterDetail(this._id);
    }
    private _getClusterDetail(id_cluster: number) {
        let dataClusterDetails: ClusterDetailModel[] = new MatTableDataSource<ClusterDetailModel>(this.data).data;
        dataClusterDetails.forEach(element => {
            if (element.id == id_cluster) {
                this._clusterDetail = element;
                return;
            }
        });
        if (dataClusterDetails) {
            //Add short description
            let dataTableTemp: ClusterDetailShortModel[] = [];
            dataTableTemp.push(new ClusterDetailShortModel("Tên cụm công nghiệp", this._clusterDetail.ten_cum_cong_nghiep));
            dataTableTemp.push(new ClusterDetailShortModel("Chủ đầu tư", this._clusterDetail.chu_dau_tu));
            dataTableTemp.push(new ClusterDetailShortModel("Địa chỉ", this._clusterDetail.dia_chi));
            let coSoPhapLy: string = "";
            this._clusterDetail.co_so_phap_lys.forEach(element => coSoPhapLy += element + "<br>");
            dataTableTemp.push(new ClusterDetailShortModel("Cơ sở pháp lý", coSoPhapLy));
            dataTableTemp.push(new ClusterDetailShortModel("Diễn giải", this._clusterDetail.dien_giai));
            this.dataSource = new MatTableDataSource(dataTableTemp);
        }
        else {

        }

    }
}