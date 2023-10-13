/**
 *
 * Application defaults
 * Singleton that contains base webservice url and outputs
 * version number
 */
Ext.define('antnex.services.ExportService', {
    alternateClassName: ['ExportService'],
    singleton: true,
    constructor: function (config) {
        this.initConfig(config);
        return this;
    },

    export: function (filename, data) {
        let me = this;

        // 新增檔案
        let wb = XLSX.utils.book_new();

        // 合併儲存格並輸入標題名稱
        let sheet = XLSX.utils.aoa_to_sheet([]);

        // sheet["A1"] = { t: "s", v: filename};
        // sheet["B1"] = { t: "s", v: "匯出時間："+ Ext.Date.format(new Date(), 'Y-m-d H:i:s')};

        // 輸入資料至工作表
        XLSX.utils.sheet_add_json(sheet, data, { origin: "A1" });

        // 將工作表輸入至檔案中
        XLSX.utils.book_append_sheet(wb, sheet, filename);

        // 工作表轉換成csv格式
        XLSX.utils.sheet_to_csv(wb);

        //輸出檔案
        XLSX.writeFile(wb, filename + '_' + Ext.Date.format(new Date(), 'Y-m-d H-i-s') + '.xlsx', { cellStyles: true });
        // XLSX.writeFile(workbook, 'NoteExport.xls', { bookType: 'xlsx', type: 'buffer' });
    },

    export_twoSheet: function (filename, sheetname, sheetname2, data, data2) {
        let me = this;

        // 新增檔案
        let wb = XLSX.utils.book_new();

        // 新增第一個sheet
        let sheet = XLSX.utils.aoa_to_sheet([]);

        // 合併儲存格並輸入標題名稱
        sheet["A1"] = { t: "s", v: sheetname };
        sheet["B1"] = { t: "s", v: "匯出時間：" + Ext.Date.format(new Date(), 'Y-m-d H:i:s') };

        // 新增第二個sheet
        let sheet2 = XLSX.utils.aoa_to_sheet([]);

        // 合併儲存格並輸入標題名稱
        if (sheetname2 != "行銷業務劇本") {
            sheet2["A1"] = { t: "s", v: sheetname2 };
            sheet2["B1"] = { t: "s", v: "匯出時間：" + Ext.Date.format(new Date(), 'Y-m-d H:i:s') };
        }

        // 輸入資料至第一個sheet
        XLSX.utils.sheet_add_json(sheet, data, { origin: "A2" });
        // 輸入資料至第二個sheet
        XLSX.utils.sheet_add_json(sheet2, data2, { origin: "A2" });


        // 將第一個sheet輸入至檔案中
        XLSX.utils.book_append_sheet(wb, sheet, sheetname);
        // 將第二個sheet輸入至檔案中
        XLSX.utils.book_append_sheet(wb, sheet2, sheetname2);

        // 工作表轉換成csv格式
        XLSX.utils.sheet_to_csv(wb);

        //輸出檔案
        XLSX.writeFile(wb, filename + '_' + Ext.Date.format(new Date(), 'Y-m-d H-i-s') + '.xlsx', { cellStyles: true });
    },

    exportMultiSheet: function (filename, sheetlist = [], config = {}) {
        let me = this;
        try {

            /**
             * sheetlist = [
             *      {
             *          sheetname: '',
             *          data: []
             *      }
             * ]
             */

            // 於第一列匯出時間 config.time
            let exportTime = false;
            if (config.exportTime) exportTime = true;

            // 匯出時間(檔名) config.time_filename
            let exportTime_filename = true;
            if (config.exportTime_filename == false) exportTime_filename = false;

            // 檔名
            let exportFilename = filename;
            if (exportTime_filename) {
                exportFilename = `${filename}_${Ext.Date.format(new Date(), 'Y_m_d H_i_s')}`;
            }

            // 新增檔案
            let wb = XLSX.utils.book_new();

            if (sheetlist.length == 0) {
                throw `無可匯出的資料`;
            }

            // 依序建立sheet
            sheetlist.forEach((e, idx) => {
                let sheetname = e.sheetname;
                let data = e.data;

                // 檢查sheetname
                if (sheetname == undefined) sheetname = `sheet${idx + 1}`

                // 有data才處理
                if (data) {
                    // 建立sheet物件
                    let sheet = XLSX.utils.aoa_to_sheet([]);

                    // 設立起始點
                    let origin = 'A1';

                    // 檢查設定: 匯出時間
                    if (exportTime) {
                        sheet['A1'] = { t: 's', v: filename + "匯出時間：" + Ext.Date.format(new Date(), 'Y-m-d H:i:s') };
                        origin = 'A2'
                    }

                    // sheet, data, config: { origin:起始點 }
                    XLSX.utils.sheet_add_json(sheet, data, { origin: origin });
                    // 將 sheet物件 加入 wb, 並以sheetname命名
                    XLSX.utils.book_append_sheet(wb, sheet, sheetname);
                }
            });

            XLSX.utils.sheet_to_csv(wb);
            XLSX.writeFile(wb, `${exportFilename}.xlsx`, { cellStyles: true });
        } catch (e) {
            throw e
        }
    },

    exportOnlyRawData: function (filename, obj, colnum, data) {
        let me = this;

        // 新增檔案
        let wb = XLSX.utils.book_new();

        // 合併儲存格並輸入標題名稱
        let sheet = XLSX.utils.aoa_to_sheet([]);
        // console.log(sheet);

        // 輸入資料至工作表
        XLSX.utils.sheet_add_json(sheet, data, { origin: "A1" });
        // console.log(sheet);
        let range = XLSX.utils.decode_range(sheet['!ref']);


        // 將工作表輸入至檔案中
        XLSX.utils.book_append_sheet(wb, sheet, filename);

        // 工作表轉換成csv格式
        XLSX.utils.sheet_to_csv(wb);

        //輸出檔案
        XLSX.writeFile(wb, filename + '_' + Ext.Date.format(new Date(), 'Y-m-d H-i-s') + '.xlsx', { cellStyles: true });
        // XLSX.writeFile(workbook, 'NoteExport.xls', { bookType: 'xlsx', type: 'buffer' });
    },


    export_list: function (filename, dataList) {
        // dataList 匯入資料型態
        // dataList = [{
        //     page: '欄位名稱', (string)
        //     colnum: 總共有多少個欄位 (int),
        //     data:[]  <<< 內容
        // }]

        let me = this;

        // 新增檔案
        let wb = XLSX.utils.book_new();

        dataList.forEach(item => {
            let data = item.data;
            // 合併儲存格並輸入標題名稱
            let sheet = XLSX.utils.aoa_to_sheet([]);
            // console.log(sheet);
            sheet["A1"] = { t: "s", v: item.page };
            sheet["B1"] = { t: "s", v: "匯出時間：" + Ext.Date.format(new Date(), 'Y-m-d H:i:s') };

            // 輸入資料至工作表
            XLSX.utils.sheet_add_json(sheet, data, { origin: "A2" });
            // console.log(sheet);
            let range = XLSX.utils.decode_range(sheet['!ref']);

            // 將工作表輸入至檔案中
            XLSX.utils.book_append_sheet(wb, sheet, item.page);


        });
        // 工作表轉換成csv格式
        XLSX.utils.sheet_to_csv(wb);
        //輸出檔案
        XLSX.writeFile(wb, filename + '_' + Ext.Date.format(new Date(), 'Y-m-d H-i-s') + '.xlsx', { cellStyles: true });
        // XLSX.writeFile(workbook, 'NoteExport.xls', { bookType: 'xlsx', type: 'buffer' });
    },


    // 系統核佣範例匯出專用
    export_not_time_list: function (filename, dataList) {
        // dataList 匯入資料型態
        // dataList = [{
        //     page: '欄位名稱', (string)
        //     colnum: 總共有多少個欄位 (int),
        //     data:[]  <<< 內容
        // }]

        let me = this;

        // 新增檔案
        let wb = XLSX.utils.book_new();

        dataList.forEach(item => {
            let data = item.data;
            // 合併儲存格並輸入標題名稱
            let sheet = XLSX.utils.aoa_to_sheet([]);
            // 輸入資料至工作表
            XLSX.utils.sheet_add_json(sheet, data, { origin: "A1" });

            let range = XLSX.utils.decode_range(sheet['!ref']);


            /*
            格式使用規則
            sheet['A2'].t = 's' t代表type  's' 代表String
            有六種type格式
            b : boolean
            e : error
            n : number
            d : data
            s : string
            z : Stub: blank stub cell that is ignored by data processing utilities

            sheet['A2'].z = '' << .z 存放格式化規則
            光制式規格就有49條 就不在這裡介紹
            https://docs.sheetjs.com/#number-formats
            進入網頁後透過此關鍵字搜尋
            Number Formats
            往下滑就能看到介紹

            */


            sheet['A2'].z = "@";
            sheet['B2'].z = "@";
            // sheet['C2'].t = "d";
            sheet['C2'].z = "yyyy-mm-dd";
            // sheet['D2'].t = "d";
            sheet['D2'].z = "yyyy-mm-dd";
            // console.log(sheet);
            sheet['E2'].z = "yyyy-mm-dd";
            XLSX.utils.book_append_sheet(wb, sheet, item.page);


        });
        // 工作表轉換成csv格式
        XLSX.utils.sheet_to_csv(wb);
        //輸出檔案
        XLSX.writeFile(wb, filename + '.xlsx', { cellStyles: true });
        // XLSX.writeFile(workbook, 'NoteExport.xls', { bookType: 'xlsx', type: 'buffer' });
    },

    showMessage: function (message) {
        Ext.Msg.alert("異常通知", message);
    }
});
