import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
    providedIn: 'root'
})
export class ExcelService {

  constructor() { }

    public exportDomTableAsExcelFile(filename: string, sheetname: string, DOMtable: any, datas: any = false) {
        // Get data from DOM and ignore data from source
        if (DOMtable) datas = XLSX.utils.table_to_sheet(DOMtable);

        if (datas === undefined && datas.length == 0 ) return;

        if (sheetname.includes('/')) sheetname = sheetname.replace('/', '_').replace('/', '_');

        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet(sheetname);

        this.mergeTable(worksheet, datas['!merges'])
        for (let cVal in datas) {
            if (!cVal.includes('!')) {
                let cell = worksheet.getCell(cVal);
                cell.value = datas[cVal]['v'];
                cell.border = {
                    top: { style:'thin' },
                    left: { style:'thin' },
                    bottom: { style:'thin'},
                    right: { style:'thin'}
                }
                cell.alignment = { wrapText: true };
            } 
        }

        let headerRows = worksheet.getRows(1, this.getHeaderNumOfRows(DOMtable));

        for (let h in headerRows) {
            headerRows[h].eachCell((cell, number) => {
                cell.font = { bold: true, color: { argb: '000000'}}
            });
        }

        this.formatWorksheetLength(worksheet);

        this.saveAsExcelFile(workbook, filename);
    }

    private mergeTable(worksheet: any, mergeRows: any) {
        mergeRows.forEach(row => {
            worksheet.mergeCells(row.s.r + 1, row.s.c + 1, row.e.r + 1, row.e.c + 1);
        });
    }

    private saveAsExcelFile(workbook: any, filename: string): void {
        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], { type: EXCEL_TYPE });
            FileSaver.saveAs(blob, filename + EXCEL_EXTENSION);
        });
    }

    private getHeaderNumOfRows(table: any) {
        let thead = table.getElementsByTagName('thead');
        if (thead) {
            return thead[0].getElementsByTagName('tr').length;
        }
        return 0;
    }

    private formatWorksheetLength(ws: any) {
        // Format length of columns
        ws.columns.forEach((column, i) => {
            let maxLength = 0;
            column["eachCell"]({ includeEmpty: true }, (cell) => {
                if (!cell.isMerged) {   
                    let columnLength = cell.value ? (cell.value.toString().length) + 1 : 10;
                    if (columnLength > maxLength ) {
                        maxLength = columnLength;
                    }
                }
            });
            column.width = maxLength < 10 ? 10 : maxLength;
        });
    }

}