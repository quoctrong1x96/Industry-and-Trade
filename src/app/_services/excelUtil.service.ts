import * as XLSX from 'xlsx';
import { ElementRef } from '@angular/core';
const excelExtention: string = ".xlsx";
export class ExcelUitl {
    //Xuất excel
    ExportTOExcel(filename: string, sheetname: string, table: ElementRef) {
        let excelFileName: string = filename + excelExtention;
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetname);
        /* save to file */
        XLSX.writeFile(wb, excelFileName);
    }
}