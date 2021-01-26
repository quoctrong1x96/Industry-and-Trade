import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

import { Injectable } from "@angular/core";

const excelExt: string = ".xlsx";

function parse_dom_table(table) {
    let vals = [], headers = [];
    let rows = table.getElementsByTagName('tr');
    // We assume that the first <tr> tag is header element
    if (rows !== undefined && rows.length > 0) {
        let headerRow = rows[0];
        for (let i = 0; i < headerRow.children.length; i++) {
            headers.push(headerRow.children[i].innerText);
        }
        
        for (let i = 1; i < rows.length; i++) {
            let curRow = rows[i];
            let data = {};
            for (let j = 0; j < curRow.children.length; j++) {
            data[headers[j]] = curRow.children[j].innerText;
            }
            vals.push(data);
        }
    }
    return vals;
}

export function exportToExcel(filename: string, sheetname: string, datas: Array<Object> = [], DOMtable = false) {
    // Get data from DOM and ignore data from source
    if (DOMtable) datas = parse_dom_table(DOMtable);
    
    if (datas === undefined && datas.length == 0 ) return;

    if (sheetname.includes('/')) sheetname = sheetname.replace('/', '_').replace('/', '_');
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(sheetname);

    let headers = Object.keys(datas[0])
    // Add Header row and format styles
    let headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell, number) => {
        cell.font = {
        bold: true,
        color: { argb: '000000'}
        }
        cell.border = {
        top: { style:'thin' },
        left: { style:'thin' },
        bottom: { style:'thin'},
        right: { style:'thin'}
        };
    });

    datas.forEach(line => {
        let values = Object.values(line);
        let row = worksheet.addRow(values);
        
        row.eachCell((cell, number) => {
        cell.border = {
            top: { style:'thin' },
            left: { style:'thin' },
            bottom: { style:'thin'},
            right: { style:'thin'}
        }
        });
        
    });

    // Format length of columns
    worksheet.columns.forEach((column, i) => {
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, (cell) => {
            var columnLength = cell.value ? (cell.value.toString().length + 1)  : 10;
            if (columnLength > maxLength ) {
                maxLength = columnLength;
            }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
    });
    
    // Export to .xlsx file
    workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, filename + excelExt);
    });
}
