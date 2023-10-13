/**
 * 發票機服務
 * 新增 盟立電子發票
 */
Ext.define('antnex.services.RptService2', {
    // requires: [
    //     'Ext.window.MessageBox'
    // ],

    constructor: function (config) {
        this.initConfig(config);
    },

    /*
        三聯式發票列印功能 v1 2021-06-25
        步驟：
                1.取得門市資料
                2.轉換商品清單，若轉換完發票無商品需要列印發票則踢出
                3.登錄發票佇列
                4.取得發票號碼
                5.通知發票機列印發票
                6.上傳發票資料
        需要資料
            json: {
                ordercode 銷售單號碼
                formcode 單別
                goodlist 商品清單
                creditcard 信用卡號
                member 會員代碼
                customername 客戶統編抬頭
                vendoruniformno 客戶統編
            }
    */
    printTriplicateUniformInvoice_v1: function (printer, json1, loggerlabel) {
        var me = this;
        var companycode = antnex.AppDefaults.getCompanycode();
        var branchcode = antnex.AppDefaults.getBranchcode();
        var machinecode = antnex.AppDefaults.getMachinecode();
        var machinename = antnex.AppDefaults.getMachinename();
        var m = moment()
        var print_date = m.year() - 1911 + '-' + m.format('MM-DD')
        var print_time = m.format('HH:mm:ss');
        var authcode = ""; //電子發票才會用到
        var ordercode = "";
        var formcode = "";
        var goodlist = [];
        var creditcard = "";
        var member = "";
        var customername = "";
        var customertaxcode = "";
        var usecashpoints = 0;
        var show_log = Ext.ComponentQuery.query('label[reference="' + loggerlabel + '"]');
        return new Promise(function (resolve, reject) {
            try {
                if (!json1.hasOwnProperty("ordercode")) reject('發票列印-缺少單號資料');
                if (!json1.hasOwnProperty("formcode")) reject('發票列印-缺少單別資料');
                if (!json1.hasOwnProperty("goodlist")) reject('發票列印-缺少商品資料');
                if (!json1.hasOwnProperty("creditcard")) reject('發票列印-缺少信用卡資料');
                if (!json1.hasOwnProperty("member")) reject('發票列印-缺少會員資料');
                if (!json1.hasOwnProperty("customername")) reject('發票列印-缺少統編抬頭資料');
                if (!json1.hasOwnProperty("customertaxcode")) reject('發票列印-缺少統編資料');
                if (!json1.hasOwnProperty("usecashpoints")) reject('發票列印-缺少點數折抵');

                ordercode = json1["ordercode"]
                formcode = json1["formcode"]
                goodlist = json1["goodlist"]
                creditcard = json1["creditcard"]
                member = json1["member"]
                customername = json1["customername"]
                customertaxcode = json1["customertaxcode"]
                usecashpoints = json1["usecashpoints"]

                if (goodlist.length == 0) {
                    reject('發票列印-無商品資料，無法列印發票');
                }

                var changegoodtype = 1; // 1商品列印含稅價 2商品列印未稅價
                if (companycode == 'ant' || companycode == 'aoa') {
                    if (formcode == 'BSL' || formcode == 'BSLCS') {
                        changegoodtype = 1
                    }
                }

                /*****  1.取得門市資料 *****/
                me.setloggerField(show_log, "取得門市資料....")
                me.getBranchData()
                    .then(function (branchData) {
                        /*****  2.轉換商品清單 *****/
                        me.setloggerField(show_log, "轉換商品清單....")
                        me.changeGoodName(goodlist, changegoodtype, 2, usecashpoints)
                            .then(function (res_goodlist) {
                                if (res_goodlist.length == 0) {
                                    throw '發票列印-商品無需列印發票'
                                    // resolve('發票列印-商品無需列印發票');
                                } else {
                                    /*****  3.登錄發票佇列 *****/
                                    me.setloggerField(show_log, "登錄發票佇列....")
                                    me.insertPrtQueue()
                                        .then(function (res_insertPrtQueue) {
                                            if (res_insertPrtQueue != 200) {
                                                throw res_insertPrtQueue
                                            } else {
                                                /*****  4.取得發票號碼 *****/
                                                me.setloggerField(show_log, "取得發票號碼....")
                                                me.getInvoiceNo(1)
                                                    .then(function (invoiceData) {
                                                        /*****  5.發票列印 *****/
                                                        me.setloggerField(show_log, "發票列印....")
                                                        me.print_v2(printer, json1, branchData, res_goodlist, invoiceData, changegoodtype)
                                                            .then(function (res_printV2) {
                                                                /*****  6.上傳發票資料 *****/
                                                                me.setloggerField(show_log, "上傳發票資料....")
                                                                me.uploadInvoice(res_printV2.ivdata, formcode, customertaxcode, res_printV2.page, 1)
                                                                    .then(function (res_uploadInvoice) {
                                                                        me.setloggerField(show_log, "")
                                                                        resolve("發票列印完成<br>" + "銷售單號: " + ordercode + "<br>發票號碼: " + res_uploadInvoice)
                                                                    }).catch((error) => {
                                                                        me.setloggerField(show_log, "")
                                                                        reject(error)
                                                                    });
                                                            }).catch((error) => {
                                                                me.setloggerField(show_log, "")
                                                                reject(error)
                                                            });
                                                    }).catch((error) => {
                                                        me.setloggerField(show_log, "")
                                                        reject(error)
                                                    });
                                            }
                                        }).catch((error) => {
                                            me.setloggerField(show_log, "")
                                            reject(error)
                                        });
                                }
                            }).catch((error) => {
                                me.setloggerField(show_log, "")
                                reject(error)
                            });
                    }).catch((error) => {
                        me.setloggerField(show_log, "")
                        reject(error)
                    });
            } catch (e) {
                logger.error('printTriplicateUniformInvoice_v1 err:' + e);
                me.setloggerField(show_log, "")
                reject(e)
            }
        })
    },

    //電子發票列印
    // printMirleInvoice_v1: function(printer, json1, loggerlabel){
    //     var me = this;
    //     var companycode = antnex.AppDefaults.getCompanycode();
    //     var branchcode = antnex.AppDefaults.getBranchcode();
    //     var machinecode = antnex.AppDefaults.getMachinecode();
    //     var machinename = antnex.AppDefaults.getMachinename();
    //     var m = moment()
    //     var print_date = m.year()-1911 + '-' + m.format('MM-DD')
    //     var print_time = m.format('HH:mm:ss');
    //     var authcode = ""; //電子發票才會用到
    //     var ordercode = "";
    //     var formcode = "";
    //     var goodlist = [];
    //     var creditcard = "";
    //     var member =  "";
    //     var customername = "";
    //     var customertaxcode = "";
    //     var usecashpoints = 0;
    //     var show_log = Ext.ComponentQuery.query('label[reference="' + loggerlabel + '"]');
    //     return new Promise(function(resolve, reject) {
    //         try{
    //             if(!json1.hasOwnProperty("ordercode")) reject('發票列印-缺少單號資料');
    //             if(!json1.hasOwnProperty("formcode")) reject('發票列印-缺少單別資料');
    //             if(!json1.hasOwnProperty("goodlist")) reject('發票列印-缺少商品資料');
    //             if(!json1.hasOwnProperty("creditcard")) reject('發票列印-缺少信用卡資料');
    //             if(!json1.hasOwnProperty("member")) reject('發票列印-缺少會員資料');
    //             if(!json1.hasOwnProperty("customername")) reject('發票列印-缺少統編抬頭資料');
    //             if(!json1.hasOwnProperty("customertaxcode")) reject('發票列印-缺少統編資料');
    //             if(!json1.hasOwnProperty("usecashpoints")) reject('發票列印-缺少點數折抵');
    //
    //             ordercode = json1["ordercode"]
    //             formcode = json1["formcode"]
    //             goodlist = json1["goodlist"]
    //             creditcard = json1["creditcard"]
    //             member = json1["member"]
    //             customername = json1["customername"]
    //             customertaxcode = json1["customertaxcode"]
    //             usecashpoints = json1["usecashpoints"]
    //
    //             if(goodlist.length == 0){
    //                 reject('發票列印-無商品資料，無法列印發票');
    //             }
    //
    //             var changegoodtype = 1; // 1商品列印含稅價 2商品列印未稅價
    //             if(companycode == 'ant' || companycode == 'aoa'){
    //                 if(formcode == 'BSL' || formcode == 'BSLCS'){
    //                     changegoodtype = 1
    //                 }
    //             }
    //
    //             /*****  1.轉換商品清單 *****/
    //             me.setloggerField(show_log, "轉換商品清單....")
    //             me.changeGoodName(goodlist, changegoodtype, usecashpoints)
    //             .then(function(res_goodlist){
    //                 if(res_goodlist.length == 0){
    //                     throw '發票列印-商品無需列印發票'
    //                     // resolve('發票列印-商品無需列印發票');
    //                 } else{
    //                     /*****  2.取得門市資料 *****/
    //                     me.setloggerField(show_log, "取得門市資料....")
    //                     me.getBranchData()
    //                     .then(function(branchData){
    //                         /*****  3.登錄發票佇列 *****/
    //                         me.setloggerField(show_log, "登錄發票佇列....")
    //                         me.insertPrtQueue()
    //                         .then(function(res_insertPrtQueue) {
    //                             if(res_insertPrtQueue != 200){
    //                                 throw res_insertPrtQueue
    //                             }else{
    //                                 /*****  4.取得發票號碼 *****/
    //                                 me.setloggerField(show_log, "取得發票號碼....")
    //                                 me.getInvoiceNo(2)
    //                                 .then(function(invoiceData) {
    //                                     /*****  5.發票列印 *****/
    //                                     me.setloggerField(show_log, "發票列印....")
    //                                     me.printMirleData(printer, json1, branchData, res_goodlist, invoiceData, changegoodtype)
    //                                     .then(function(res_printMirleData) {
    //                                         /*****  6.上傳發票資料 *****/
    //                                         me.setloggerField(show_log, "上傳發票資料....")
    //                                         me.uploadInvoice(res_printMirleData.ivdata, formcode, customertaxcode, 1, 2)
    //                                         .then(function(res_uploadInvoice) {
    //                                             me.setloggerField(show_log, "")
    //                                             resolve("發票列印完成<br>" + "銷售單號: " + ordercode + "<br>發票號碼: " + res_uploadInvoice)
    //                                         }).catch((error) => {
    //                                             me.setloggerField(show_log, "")
    //                                             reject(error)
    //                                         });
    //                                     }).catch((error) => {
    //                                         me.setloggerField(show_log, "")
    //                                         reject(error)
    //                                     });
    //                                 }).catch((error) => {
    //                                     me.setloggerField(show_log, "")
    //                                     reject(error)
    //                                 });
    //                             }
    //                         }).catch((error) => {
    //                             me.setloggerField(show_log, "")
    //                             reject(error)
    //                         });
    //                     }).catch((error) => {
    //                         me.setloggerField(show_log, "")
    //                         reject(error)
    //                     });
    //                 }
    //             }).catch((error) => {
    //                 me.setloggerField(show_log, "")
    //                 reject(error)
    //             });
    //         }catch(e){
    //             logger.error('printTriplicateUniformInvoice_v1 err:' + e);
    //             me.setloggerField(show_log, "")
    //             reject(e)
    //         }
    //     })
    // },

    //電子發票v2
    printMirleInvoice_v2: function (printer, json1, loggerlabel) {
        var me = this;
        var companycode = antnex.AppDefaults.getCompanycode();
        var branchcode = antnex.AppDefaults.getBranchcode();
        var machinecode = antnex.AppDefaults.getMachinecode();
        var machinename = antnex.AppDefaults.getMachinename();
        var authcode = ""; //電子發票才會用到
        var ordercode = "";
        var formcode = "";
        var goodlist = [];
        var creditcard = "";
        var member = "";
        var customername = "";
        var customertaxcode = "";
        var usecashpoints = 0;
        var show_log = Ext.ComponentQuery.query('label[reference="' + loggerlabel + '"]');
        return new Promise(function (resolve, reject) {
            try {
                if (!json1.hasOwnProperty("ordercode")) reject('發票列印-缺少單號資料');
                if (!json1.hasOwnProperty("formcode")) reject('發票列印-缺少單別資料');
                if (!json1.hasOwnProperty("goodlist")) reject('發票列印-缺少商品資料');
                if (!json1.hasOwnProperty("creditcard")) reject('發票列印-缺少信用卡資料');
                if (!json1.hasOwnProperty("member")) reject('發票列印-缺少會員資料');
                if (!json1.hasOwnProperty("customername")) reject('發票列印-缺少統編抬頭資料');
                if (!json1.hasOwnProperty("customertaxcode")) reject('發票列印-缺少統編資料');
                if (!json1.hasOwnProperty("usecashpoints")) reject('發票列印-缺少點數折抵');

                ordercode = json1["ordercode"]
                formcode = json1["formcode"]
                goodlist = json1["goodlist"]
                creditcard = json1["creditcard"]
                member = json1["member"]
                customername = json1["customername"]
                customertaxcode = json1["customertaxcode"]
                usecashpoints = json1["usecashpoints"]

                if (goodlist.length == 0) {
                    reject('發票列印-無商品資料，無法列印發票');
                }

                var changegoodtype = 1; // 1商品列印含稅價 2商品列印未稅價
                if (companycode == 'ant' || companycode == 'aoa') {
                    if (formcode == 'BSL' || formcode == 'BSLCS') {
                        changegoodtype = 1
                    }
                }

                /*****  1.轉換商品清單 *****/
                me.setloggerField(show_log, "轉換商品清單....")
                me.changeGoodName(goodlist, changegoodtype, 1, usecashpoints)
                    .then(function (res_goodlist) {
                        if (res_goodlist.length == 0) {
                            throw '發票列印-商品無需列印發票'
                            // resolve('發票列印-商品無需列印發票');
                        } else {
                            /*****  2.取得門市資料 *****/
                            me.setloggerField(show_log, "取得門市資料....")
                            me.getBranchData()
                                .then(function (branchData) {
                                    /*****  3.電子發票上傳 *****/
                                    me.setloggerField(show_log, "電子發票上傳....")
                                    goodlist = res_goodlist; //變更goodlist
                                    var m = moment();
                                    var print_date = m.format('YYYYMMDD');
                                    var print_date2 = m.format('YYYY-MM-DD');
                                    var print_time = m.format('HH:mm:ss');

                                    var memo = "";
                                    if (member != "") {
                                        memo = "會員 " + member + "&&";
                                    }
                                    if (creditcard != "") {
                                        memo = memo + "信用卡 " + creditcard
                                    }

                                    var amount = 0;
                                    var amount_notax = 0;
                                    var tax = 0;
                                    for (var i = 0; i < goodlist.length; i++) {
                                        goodlist[i].serialno = (i + 1);
                                        amount = amount + goodlist[i].totalhavetax;
                                    }
                                    amount = Math.round(amount);
                                    amount_notax = amount;

                                    if (customertaxcode != '') {
                                        tax = Math.round(amount / 1.05 * 0.05);
                                        amount_notax = amount - tax
                                    }

                                    let ivdata = {
                                        companycode: companycode,
                                        storecode: branchcode,
                                        machinecode: machinecode,
                                        machinename: machinename,
                                        membercode: "",//空白即可
                                        billcode: ordercode,
                                        invoiceno: "",
                                        sellerid: branchData.uniformno,
                                        posid: "",
                                        ivrcode: "", //隨機碼
                                        data: {
                                            duplicate: 0,
                                            head: {
                                                storename: branchData.invoicetitle,
                                                storeaddr: branchData.address,
                                                taxno: branchData.uniformno,
                                                tel: branchData.tel,
                                                ivdate: print_date,
                                                ivdate2: print_date2,
                                                ivtime: print_time,
                                                terminal: machinecode,
                                                customername: customername,
                                                customertaxcode: customertaxcode, //購買人統一編號
                                                cardno: creditcard,//"4145-1234567-1234",
                                                authcode: "",//信用卡授權碼
                                                ivdonate: "",
                                                ivdonatetype: "",
                                                ivcarriertype: "",
                                                ivcarriercode1: "",
                                                ivcarriercode2: "",
                                                ivprint: "Y",
                                                ivprinttype: "0",
                                                ivmemo1: "機" + machinecode + " 單" + ordercode,
                                                ivmemo2: "",
                                                ivmemo: memo,//"信用卡1234&&會員12345&&點數1234",
                                                ivreprint: "",
                                                ivemail: "",
                                                ivix: "",
                                                ivbuyeraddr: "",
                                                ivadcontent: ""//廣告訊息
                                            },
                                            items: goodlist,
                                            footer: {
                                                ivamount: amount_notax,//未稅金額
                                                ivtax: tax,//稅額
                                                ivtotal: amount,//含稅金額
                                                cash: amount - json1["creditcardamount"],
                                                credit: json1["creditcardamount"],
                                                ivtaxtype: "1",
                                                ivtaxrate: "0.05",
                                                ivnamt: 0,
                                                ivzamt: 0
                                            }
                                        }
                                    };

                                    if (amount - json1["creditcardamount"] < 0) {
                                        throw '現金金額小於零，無法列印發票'
                                    }

                                    var content = {
                                        txcode: "DBS_MIRLEPOS_SEND_D0401",
                                        machinecode: antnex.AppDefaults.getMachinecode(),
                                        branchcode: antnex.AppDefaults.getBranchcode(),
                                        usercode: antnex.AppDefaults.getEmployee(),
                                        ordercode: ordercode,
                                        formcode: formcode,
                                        data: ivdata
                                    };

                                    console.log("DBS_MIRLEPOS_SEND_D0401: " + JSON.stringify(content));

                                    antnex.ProxyService.send(content).then(function (json) {
                                        console.log("下行:" + JSON.stringify(json))
                                        if (S(json.status).isEmpty()) {
                                            throw "交易訊息資料格式有誤"
                                        } else if (json.status != '9000') {
                                            throw json.status
                                        } else {
                                            var status = json.message.resStatus
                                            var invoiceno = json.message.invoiceno
                                            var ivrcode = json.message.ivrcode
                                            var date = json.message.date.replaceAll("-", "")
                                            var time = json.message.time

                                            ivdata.ivrcode = ivrcode
                                            ivdata.invoiceno = invoiceno
                                            ivdata.data.head.ivdate = date
                                            ivdata.data.head.ivtime = time

                                            console.log("ivdata: " + JSON.stringify(ivdata));
                                            /*****  4.電子發票上傳 *****/
                                            me.setloggerField(show_log, "電子發票列印....")
                                            printer.printInvoice(ivdata)
                                                .then(function (json) {
                                                    me.setloggerField(show_log, "發票列印完成")
                                                    resolve("發票列印完成<br>" + "銷售單號: " + ordercode + "<br>發票號碼: " + invoiceno);
                                                })
                                                .catch(function (error) {
                                                    me.setloggerField(show_log, "")
                                                    reject('電子發票開立v2-發票列印錯誤: ' + error);
                                                });
                                        }

                                    }).catch(function (error) {
                                        me.setloggerField(show_log, "")
                                        reject("電子發票開立v2-發票資料上傳錯誤: " + error);
                                    })
                                }).catch((error) => {
                                    me.setloggerField(show_log, "")
                                    reject(error)
                                });
                        }
                    }).catch((error) => {
                        me.setloggerField(show_log, "")
                        reject(error)
                    });
            } catch (e) {
                me.setloggerField(show_log, "")
                reject(e)
            }
        })
    },

    //補印發票
    reprintMirleInvoice: function (printer, code, ivdata, loggerlabel) {
        var me = this;
        var show_log = Ext.ComponentQuery.query('label[reference="' + loggerlabel + '"]');
        return new Promise(function (resolve, reject) {
            if (code == 'C0401') {
                me.setloggerField(show_log, "發票補印中...")
                printer.printInvoice(ivdata)
                    .then(function (json) {
                        me.setloggerField(show_log, "")
                        resolve("發票補印完成");
                    })
                    .catch(function (error) {
                        reject('電子發票補印錯誤: ' + error);
                    });
            } else if (code == 'D0401') {
                me.setloggerField(show_log, "發折讓補印中...")
                printer.creditNote(ivdata)
                    .then(function (json) {
                        me.setloggerField(show_log, "")
                        resolve("折讓補印完成");
                    })
                    .catch(function (error) {
                        reject('電子發票折讓補印錯誤: ' + error);
                    });
            }
        })
    },

    //作廢 折讓發票
    dropMirleInvoice: function (data, show_log) {
        var me = this;
        var companycode = antnex.AppDefaults.getCompanycode();
        var branchcode = antnex.AppDefaults.getBranchcode();
        var machinecode = antnex.AppDefaults.getMachinecode();
        var machinename = antnex.AppDefaults.getMachinename();
        var ordercode = data.ordercode;
        var invoiceno = "";
        if (data.invoiceno != null && data.invoiceno != undefined) {
            invoiceno = data.invoiceno.toUpperCase();
        }
        console.log("dropMirleInvoice start:" + ordercode + " / " + invoiceno);

        return new Promise((resolve, reject) => {
            try {
                if (companycode != 'ant') {
                    resolve({
                        status: 200
                    })
                } else {
                    var uploadJSON = {
                        txcode: "DBS_INVOICEPRT_MIRLE_CHECK_DROP",
                        ordercode: ordercode,
                        invoiceno: invoiceno,
                        version: 2
                    }
                    antnex.ProxyService.send(uploadJSON).then(function (json) {
                        // console.log("下行:" + JSON.stringify(json))
                        if (S(json.status).isEmpty()) {
                            throw "交易訊息資料格式有誤"
                        } else if (json.status != '9000') {
                            throw json.status
                        } else {
                            var data = json.message.data;

                            var doMirle = 0;
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].candrop == 201 || data[i].candrop == 202) {
                                    doMirle = 1;
                                }
                            }

                            if (doMirle == 0) {
                                console.log("無發票可做電子發票作廢(折讓)")
                                resolve({
                                    status: 200
                                })
                            } else {
                                me.getBranchData()//取得門市資料
                                    .then(function (branchData) {
                                        me.initMirle()//取得閘道資訊
                                            .then(function (printer) {
                                                for (var i = 0; i < data.length; i++) {
                                                    var invoiceData = data[i];
                                                    var candrop = invoiceData.candrop;
                                                    var ordercode2 = invoiceData.ordercode;
                                                    var invoiceno2 = invoiceData.invoiceno;
                                                    var ids = invoiceData.ids;
                                                    var taketm = invoiceData.taketm;
                                                    var droptm = invoiceData.droptm;
                                                    var goodlist = invoiceData.goodlist;
                                                    var posid = invoiceData.posid;

                                                    candrop = 202;
                                                    if (candrop == 201) {
                                                        me.dropMirleData(printer, posid, ordercode2, invoiceno2, taketm, droptm, branchData)
                                                            .then(function (res) {
                                                                // resolve(res)
                                                            }).catch((error) => {
                                                                me.setloggerField(show_log, "")
                                                                reject(error)
                                                            });
                                                    } else if (candrop == 202) {
                                                        me.disMirleData(printer, posid, ordercode2, invoiceno2, invoiceData, branchData)
                                                            .then(function (res) {
                                                                // resolve(res)
                                                            }).catch((error) => {
                                                                me.setloggerField(show_log, "")
                                                                reject(error)
                                                            });
                                                    }
                                                }
                                                resolve({
                                                    status: 200
                                                })
                                            }).catch((error) => {
                                                me.setloggerField(show_log, "")
                                                reject(error)
                                            });
                                    }).catch((error) => {
                                        me.setloggerField(show_log, "")
                                        reject(error)
                                    });
                            }
                        }

                    }).catch(function (error) {
                        // logger.error("RptService changeGoodName ProxyService error: " + error);
                        reject("發票作廢-確認發票資料: " + error);
                    })
                }

            } catch (e) {
                reject("發票作廢異常:" + e)
            }
        })
    },


    setloggerField: function (obj, text) {
        try {
            // console.log("obj")
            // console.log(obj)
            if (obj.length == 1) {
                obj[0].setText(text)
            }
        } catch (e) {
            logger.error('setloggerField err:' + e);
        }
    },

    //取得門市資料
    getBranchData: function () {
        var me = this;
        return new Promise(function (resolve, reject) {
            try {
                var me = this;
                var fullCounty = ["基隆市", "臺北市", "新北市", "桃園市", "新竹市", "新竹縣", "苗栗縣", "臺中市", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣", "臺南市", "高雄市", "屏東縣", "臺東縣", "花蓮縣", "宜蘭縣", "澎湖縣", "金門縣", "連江縣",];
                var content = {
                    txcode: "BRANCH00017",
                    branchcode: antnex.AppDefaults.getBranchcode()
                };
                antnex.ProxyService.send(content).then(function (json) {
                    // console.log("下行:" + JSON.stringify(json))
                    if (S(json.status).isEmpty()) {
                        throw "交易訊息資料格式有誤"
                    } else if (json.status != '9000') {
                        throw json.status
                    } else {
                        var branchcounty = json.message.data.branchcounty
                        var branchdetail = json.message.data.branchdetail
                        var branchregion = json.message.data.branchregion
                        var uniformno = json.message.data.uniformno
                        var tel = json.message.data.tel
                        var fax = json.message.data.fax
                        var setting = json.message.settings[0].settings
                        var invoicetitle = setting.invoicetitle
                        var posid = (setting.hasOwnProperty('invoicemirleposid')) ? setting.invoicemirleposid : "";

                        console.log("invoicetitle: " + invoicetitle)
                        console.log("posid: " + posid)

                        var address = fullCounty[branchcounty] + branchregion + branchdetail
                        var json1 = {
                            address: address,
                            uniformno: uniformno,
                            tel: tel,
                            fax: fax,
                            invoicetitle: invoicetitle,
                            posid: posid
                        }

                        resolve(json1);
                    }

                }).catch(function (error) {
                    // logger.error("RptService getBranchData ProxyService error: " + error);
                    reject("發票列印-取得門市資料錯誤(2): " + error)
                })

            } catch (e) {
                // logger.error('RptService getBranchData err:' + e);
                reject("發票列印-取得門市資料錯誤(1): " + e)
            }
        })
    },


    //取得發票機資訊
    init: function () {
        var me = this;
        var domainname = "";
        var localip = "";
        return new Promise(function (resolve, reject) {
            try {
                console.log("saleclient.services.RptService2:: init");
                var companycode = antnex.AppDefaults.getCompanycode();
                var branchcode = antnex.AppDefaults.getBranchcode();
                let rptManager = new RPTManager2(companycode, branchcode);
                //let rptManager = new RPTManager("ant", "S00002");
                console.log("Start: " + moment().format());

                rptManager.isReady()
                    .then(function (n) {
                        domainname = n;
                        //console.log("isReady");


                        console.log("獲得閘道域名資訊= " + n);
                        console.log("閘道資訊= " + rptManager.toString());

                        var idx = rptManager.toString().indexOf('說明')
                        var rpt_memo = rptManager.toString().substring(idx, rptManager.toString().length);
                        var rpt_version = rpt_memo.substring(0, rpt_memo.indexOf('/')).replace('說明:版本:', '');

                        var idx_localip = rptManager.toString().indexOf('內網IP:');
                        localip = rptManager.toString().substring(idx_localip, rptManager.toString().length);
                        localip = localip.substring(0, localip.indexOf(' ')).replace('內網IP', '電腦IP');

                        // 電子發票-3(MIRLE) 三聯式-4
                        let ptype = 4;
                        let printer = rptManager.createPrinter(ptype);
                        me.RPT = printer;

                        console.log("查詢是否提供指定發票機");
                        printer.isReady()
                            .then(function (prnuuid) {
                                console.log("發票機代碼: " + prnuuid);
                                //console.log("isReady/Finish: " + moment().format());
                                // console.log(printer.toString());
                                // resolve(printer);
                                // reject(printer);
                                var obj = {
                                    printer: printer,
                                    version: rpt_version
                                }
                                resolve(obj);
                            })
                            .catch(function (error) {
                                // console.error('printer 初始化失敗: ' + error);
                                var info = "<font color='#8F8F8F'>閘道域名:" + domainname + "<br/>" + localip + "</font>";
                                var solution = "<font size='5' style='line-height:1.5;'>電腦IP與設定IP不符，請先嘗試重新開啟AntGateway!!!</font>";
                                error = error + "<br/><br/>" + info + "<br/><br/>" + solution;
                                reject('發票列印-準備失敗(3): ' + error);
                            });

                    })
                    .catch(function (error) {
                        // console.error('RPTManager 初始化失敗: ' + error);
                        error = error + "<br/><br/> <font size='5' style='line-height:1.5;'>電腦IP與設定IP不符，請先嘗試重新開啟AntGateway!!!</font>"
                        reject('發票列印-準備失敗(2): ' + error);
                    });
            } catch (e) {
                logger.error('RptService init err:' + e);
                reject('發票列印-準備失敗(1): ' + e);
            }
        })
    },





    // 初始化盟立電子發票平臺服務
    initMirle: function () {
        let me = this;
        return new Promise(function (resolve, reject) {
            try {
                console.log("saleclient.services.RptService2:: initMirle");
                var companycode = antnex.AppDefaults.getCompanycode();
                var branchcode = antnex.AppDefaults.getBranchcode();
                let rptManager = new RPTManager2(companycode, branchcode);
                //let rptManager = new RPTManager("ant", "S00002");
                console.log("Start: " + moment().format());

                rptManager.isReady()
                    .then(function (n) {
                        //console.log("isReady");
                        console.log("獲得閘道域名資訊= " + n);
                        console.log("閘道資訊= " + rptManager.toString());

                        // 電子發票-3(MIRLE) 三聯式-4
                        let ptype = 3;
                        let printer = rptManager.createPrinter(ptype);
                        me.RPT = printer;

                        console.log("查詢是否提供指定發票機");
                        printer.isReady()
                            .then(function (result) {
                                console.log("電子服務平台: " + result);
                                resolve(printer);
                            })
                            .catch(function (error) {
                                // console.error('printer 初始化失敗: ' + error);
                                reject('發票列印-電子發票準備失敗(3): ' + error);
                            });

                    })
                    .catch(function (error) {
                        // console.error('RPTManager 初始化失敗: ' + error);
                        reject('發票列印-電子發票準備失敗(2): ' + error);
                    });
            } catch (e) {
                logger.error('RptService initMirle err:' + e);
                reject('發票列印-電子發票準備失敗(1): ' + e);
            }
        })
    },

    //新增發票佇列
    insertPrtQueue: function () {
        var me = this;
        return new Promise(function (resolve, reject) {
            try {
                // console.log("saleclient.services.RptService:: insertPrtQueue")
                let content = {
                    txcode: "DBS_INVOICEPRT_QUEUE_INSERT",
                    branchcode: antnex.AppDefaults.getBranchcode(),
                    usercode: antnex.AppDefaults.getEmployee(),
                    machinecode: antnex.AppDefaults.getMachinecode()
                };

                antnex.ProxyService.send(content).then(function (json) {
                    // console.log("下行:" + JSON.stringify(json))
                    if (S(json.status).isEmpty()) {
                        throw "交易訊息資料格式有誤"
                    } else if (json.status != '9000') {
                        throw json.status
                    } else {
                        var resStatus = json.message.resStatus
                        resolve(resStatus);
                    }

                }).catch(function (error) {
                    // logger.error("RptService insertPrtQueue ProxyService error: " + error);
                    reject("發票列印-新增佇列異常(2): " + error);
                })
            } catch (e) {
                // logger.error('RptService insertPrtQueue err:' + e);
                reject('發票列印-新增佇列異常(1): ' + e);
            }
        })
    },

    //取得發票號碼
    getInvoiceNo: function (type) {
        var me = this;
        return new Promise(function (resolve, reject) {
            try {
                // console.log("saleclient.services.RptService:: getInvoiceNo")
                let content = {
                    txcode: "BRANCH0008",
                    machinecode: antnex.AppDefaults.getMachinecode(),
                    branchcode: antnex.AppDefaults.getBranchcode(),
                    type: type //1三聯式發票 2電子發票
                };

                antnex.ProxyService.send(content).then(function (json) {
                    // console.log("下行:" + JSON.stringify(json))
                    if (S(json.status).isEmpty()) {
                        reject("交易訊息資料格式有誤")
                    } else if (json.status != '9000') {
                        reject(json.status)
                    } else {
                        var obj = {
                            invoiceno: json.message.invoiceno,
                            posid: json.message.posid
                        }
                        resolve(obj)
                    }

                }).catch(function (error) {
                    // logger.error("RptService getInvoiceNo ProxyService error: " + error);
                    reject("發票列印-取號異常(2): " + error);
                })
            } catch (e) {
                // logger.error('RptService getInvoiceNo err:' + e);
                reject('發票列印-取號異常(1): ' + e);
            }
        })
    },

    //取得發票商品名稱 type: 1商品列印含稅價 2商品列印未稅價
    //goodnametype 1全名 2不要品牌
    changeGoodName: function (goodList, type, goodnametype, usecashpoints) {
        var me = this;
        return new Promise(function (resolve, reject) {
            try {

                console.log("type: " + type);
                console.log("goodnametype: " + goodnametype);

                var good = []
                for (var i = 0; i < goodList.length; i++) {
                    // console.log("goodList[i]: " + JSON.stringify(goodList[i]))
                    var materialcode = goodList[i].materialcode
                    var title = goodList[i].goodnames
                    var goodtype = goodList[i].goodtype
                    var qty = goodList[i].qty
                    var price = goodList[i].price
                    var pricenotax = goodList[i].pricenotax//未稅價
                    var discount = goodList[i].discount
                    if (type == 1) {
                        //未稅小計 改為小數後兩位
                        good.push({
                            materialcode: materialcode, name: title, goodtype: goodtype,
                            qty: qty, price: price, total: qty * price, discount: discount,
                            totalnotax: Math.round(price / 1.05 * 100) / 100 * qty, totalhavetax: qty * price
                        })
                        // totalnotax:parseFloat((qty*price / 1.05).toFixed(2)), totalhavetax: qty*price})
                    } else if (type == 2) {
                        good.push({
                            materialcode: materialcode, name: title, goodtype: goodtype,
                            qty: qty, price: pricenotax, total: qty * pricenotax, discount: discount,
                            totalnotax: qty * pricenotax, totalhavetax: qty * price
                        })
                    }
                    // good.push({materialcode: materialcode, name: title, goodtype: goodtype,
                    //             qty: qty, price: price, total: qty*price, discount: discount,
                    //             totalnotax: Math.round(qty*price / 1.05), totalhavetax: qty*price})
                }
                let content = {
                    txcode: "BRANCHPRTSMALL00030",
                    branchcode: antnex.AppDefaults.getBranchcode(),
                    companycode: antnex.AppDefaults.getCompanycode(),
                    goods: good,
                    goodnametype: goodnametype
                };

                antnex.ProxyService.send(content).then(function (json) {
                    // console.log("下行:" + JSON.stringify(json))
                    if (S(json.status).isEmpty()) {
                        throw "交易訊息資料格式有誤"
                    } else if (json.status != '9000') {
                        throw json.status
                    } else {
                        var data = json.message.data;
                        var discount = 0;
                        for (var i = 0; i < data.length; i++) {
                            discount = discount + data[i].discount
                        }
                        if (discount != 0) {
                            data.push({
                                materialcode: "",
                                name: "折讓",
                                qty: 1,
                                price: discount,
                                total: discount,
                                isprint: 1,
                                totalnotax: Math.round(discount / 1.05 * 100) / 100,
                                totalhavetax: discount
                            })
                        }
                        if (usecashpoints != 0) {
                            var u1 = Math.abs(usecashpoints) * -1
                            data.push({
                                materialcode: "",
                                name: "點數折抵",
                                qty: 1,
                                price: u1,
                                total: u1,
                                isprint: 1,
                                totalnotax: Math.round(u1 / 1.05 * 100) / 100,
                                totalhavetax: u1
                            })
                        }
                        resolve(data);
                    }

                }).catch(function (error) {
                    reject("發票列印-轉換商品異常(2): " + error);
                })
            } catch (e) {
                reject('發票列印-轉換商品異常(1): ' + e);
            }
        })
    },

    //組成要送發票機的資料
    //changegoodtype 1含稅價 2未稅價
    print_v2: function (printer, orderData, branchData, goodlist, invoiceData, changegoodtype) {
        var me = this;
        return new Promise(function (resolve, reject) {
            try {
                var companycode = antnex.AppDefaults.getCompanycode();
                var branchcode = antnex.AppDefaults.getBranchcode();
                var machinecode = antnex.AppDefaults.getMachinecode();
                var machinename = antnex.AppDefaults.getMachinename();
                var m = moment()
                var print_date = m.year() - 1911 + '-' + m.format('MM-DD')
                var print_time = m.format('HH:mm:ss');

                var invoiceno = invoiceData.invoiceno;

                var amount = 0;
                var amount_notax = 0;
                for (var i = 0; i < goodlist.length; i++) {
                    amount = amount + goodlist[i].totalhavetax
                    amount_notax = amount_notax + goodlist[i].totalnotax
                }
                amount = Math.round(amount)
                amount_notax = Math.round(amount_notax)

                if (changegoodtype == 1) {
                    amount_notax = Math.round(amount / 1.05)
                }

                let ivdata = {
                    companycode: companycode,
                    storecode: branchcode,
                    machinecode: machinecode,//pos機
                    machinename: machinename,//pos機
                    membercode: orderData.member,
                    billcode: orderData.ordercode,
                    data:
                    {
                        invoiceno: invoiceno,
                        duplicate: 0,
                        head: {
                            storename: branchData.invoicetitle,
                            storeaddr: branchData.address,
                            taxno: branchData.uniformno,
                            tel: branchData.tel,
                            ivdate: m.year() - 1911 + '-' + m.format('MM-DD'),
                            ivtime: m.format('HH:mm:ss'),
                            terminal: machinecode,//pos機
                            customername: orderData.customername,
                            customertaxcode: orderData.customertaxcode,
                            cardno: orderData.creditcard,
                            authcode: ""
                        },
                        items: goodlist,
                        footer: {
                            ivamount: amount_notax,//Math.round(context.invoiceAmount / 1.05),
                            ivtax: amount - amount_notax,//context.invoiceAmount - Math.round(context.invoiceAmount / 1.05),
                            ivtotal: amount,//context.invoiceAmount,
                            cash: amount - orderData.creditcardamount,//context.invoiceAmount - creditcardamount,
                            credit: orderData.creditcardamount
                        }
                    }
                };

                if (amount - orderData.creditcardamount < 0) {
                    throw '現金金額小於零，無法列印發票'
                }

                console.log("ivdata: " + JSON.stringify(ivdata))

                var needToPrint = 1; //是否送資料到發票機 1是 9否

                if (needToPrint == 1) {
                    printer.printInvoice(ivdata)
                        .then(function (json) {
                            // console.log(JSON.stringify(json, null, 2));
                            console.log("pages: " + json.pages + " 狀態: " + json.message);
                            // console.log("RPT/Finish: " + moment().format());
                            resolve({
                                ivdata: {
                                    ordercode: orderData.ordercode,
                                    invoiceno: invoiceno,
                                    uniformno: orderData.customertaxcode,
                                    amount: amount,
                                    good: goodlist
                                },
                                page: json.pages,
                                status: json.message
                            });
                        })
                        .catch(function (error) {
                            reject('發票列印v2-發票機列印異常(3): ' + error);
                        });
                } else {
                    resolve({
                        ivdata: {
                            ordercode: orderData.ordercode,
                            invoiceno: invoiceno,
                            uniformno: orderData.customertaxcode,
                            amount: amount,
                            good: goodlist
                        },
                        page: 2,
                        status: 36864
                    });
                }
            } catch (e) {
                reject('發票列印v2-發票機列印異常(1): ' + e);
            }
        })
    },

    //列印發票
    // print: function(printer, invoiceno, creditcard, creditcardamount, good, context){
    //     var me = this;
    //     return new Promise(function(resolve, reject) {
    //         try {
    //             var me = this;
    //             var m = moment()
    //             var fullCounty = ["基隆市", "臺北市", "新北市", "桃園市", "新竹市", "新竹縣", "苗栗縣", "臺中市", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣", "臺南市", "高雄市", "屏東縣", "臺東縣", "花蓮縣", "宜蘭縣", "澎湖縣", "金門縣", "連江縣", ];
    //
    //             if(printer === undefined) {
    //                 logger.error("RPT undefined");
    //                 return;
    //             }
    //
    //             console.log("Start: " + moment().format());
    //
    //             var content = {
    //                 txcode: "BRANCH00017",
    //                 branchcode: antnex.AppDefaults.getBranchcode()
    //             };
    //             antnex.ProxyService.send(content).then(function(json) {
    //                 // console.log("下行:" + JSON.stringify(json))
    //                 if (S(json.status).isEmpty()) {
    //                     reject("交易訊息資料格式有誤")
    //                 }else if(json.status != '9000'){
    //                     reject(json.status)
    //                 }else{
    //                     var branchcounty = json.message.data.branchcounty
    //                     var branchdetail = json.message.data.branchdetail
    //                     var branchregion = json.message.data.branchregion
    //                     var uniformno = json.message.data.uniformno
    //                     var tel = json.message.data.tel
    //                     var setting = json.message.settings[0]
    //                     var invoicetitle = setting.settings.invoicetitle
    //
    //                     var amount = 0;
    //                     for(var i = 0; i < good.length; i++){
    //                         amount = amount + good[i].total
    //                     }
    //                     //console.log("amount: " + amount)
    //
    //                     let ivdata = {
    //                         companycode: antnex.AppDefaults.getCompanycode(),
    //                         storecode: antnex.AppDefaults.getBranchcode(),
    //                         machinecode: antnex.AppDefaults.getMachinecode(),//pos機
    //                         machinename: antnex.AppDefaults.getMachinename(),//pos機
    //                         membercode: context.memberphone,
    //                         billcode: context.ordercode,
    //                         data:
    //                             {
    //                                 invoiceno: invoiceno,
    //                                 duplicate: 0,
    //                                 head: {
    //                                     storename: invoicetitle,
    //                                     storeaddr: fullCounty[branchcounty] + branchregion + branchdetail,
    //                                     taxno: uniformno,
    //                                     tel: tel,
    //                                     ivdate: m.year()-1911 + '-' + m.format('MM-DD'),
    //                                     ivtime: m.format('HH:mm:ss'),
    //                                     terminal: antnex.AppDefaults.getMachinecode(),//pos機
    //                                     customername: context.vendorname,
    //                                     customertaxcode: context.vendoruniformno,
    //                                     cardno: creditcard,
    //                                     authcode: ""
    //                                 },
    //                                 items: good,
    //                                 footer: {
    //                                     ivamount: Math.round(amount / 1.05),//Math.round(context.invoiceAmount / 1.05),
    //                                     ivtax: amount - Math.round(amount / 1.05),//context.invoiceAmount - Math.round(context.invoiceAmount / 1.05),
    //                                     ivtotal: amount,//context.invoiceAmount,
    //                                     cash: amount - creditcardamount,//context.invoiceAmount - creditcardamount,
    //                                     credit: creditcardamount
    //                                 }
    //                             }
    //                     };
    //
    //                     console.log("ivdata: " + JSON.stringify(ivdata))
    //
    //                     printer.printInvoice(ivdata)
    //                         .then(function(json){
    //                             // console.log(JSON.stringify(json, null, 2));
    //                             console.log("pages: " + json.pages + " 狀態: " + json.message);
    //                             // console.log("RPT/Finish: " + moment().format());
    //                             resolve({
    //                                 ivdata: ivdata,
    //                                 page: json.pages,
    //                                 status: json.message
    //                             });
    //                         })
    //                         .catch(function(error) {
    //                             reject('發票列印-發票機列印異常(3): ' + error);
    //                         });
    //
    //                 }
    //
    //             }).catch(function(error) {
    //                 reject("發票列印-發票機列印異常(2): " + error);
    //             })
    //
    //         } catch (e) {
    //             reject('發票列印-發票機列印異常(1): ' + e);
    //         }
    //     })
    // },

    //測試列印
    print_test: function (printer, branchData) {
        var me = this;
        return new Promise(function (resolve, reject) {
            try {
                var me = this;
                var m = moment()

                if (printer === undefined) {
                    logger.error("RPT undefined");
                    return;
                }

                console.log("Start: " + moment().format());

                let ivdata = {
                    companycode: antnex.AppDefaults.getCompanycode(),
                    storecode: antnex.AppDefaults.getBranchcode(),
                    machinecode: antnex.AppDefaults.getMachinecode(),//pos機
                    machinename: antnex.AppDefaults.getMachinename(),//pos機
                    membercode: "",
                    billcode: "Test",
                    data:
                    {
                        invoiceno: "",
                        duplicate: 0,
                        head: {
                            storename: branchData.invoicetitle,
                            storeaddr: branchData.address,
                            taxno: branchData.uniformno,
                            tel: branchData.tel,
                            ivdate: m.year() - 1911 + '-' + m.format('MM-DD'),
                            ivtime: m.format('HH:mm:ss'),
                            terminal: antnex.AppDefaults.getMachinecode(),//pos機
                            customername: "",
                            customertaxcode: "",
                            cardno: "",
                            authcode: ""
                        },
                        items: [],
                        footer: {
                            ivamount: 0,
                            ivtax: 0,
                            ivtotal: 0,
                            cash: 0,
                            credit: 0
                        }
                    }
                };

                console.log("ivdata: " + JSON.stringify(ivdata))

                printer.printInvoice(ivdata)
                    .then(function (json) {
                        //console.log(JSON.stringify(json, null, 2));
                        // console.log("page: " + json.pages + " 狀態: " + json.message);
                        // console.log("RPT/Finish: " + moment().format());
                        resolve({
                            ivdata: ivdata,
                            pages: json.pages,
                            status: json.message
                        });
                    })
                    .catch(function (error) {
                        // console.error('列印失敗: ' + error);
                        reject('發票測試列印異常(2): ' + error);
                    });

            } catch (e) {
                // logger.error('RptService print_test err:' + e);
                reject('發票測試列印異常(1): ' + e);
            }
        })
    },

    //電子發票列印發票
    printMirleData: function (printer, orderData, branchData, goodlist, invoiceData, changegoodtype) {
        var me = this;
        return new Promise(function (resolve, reject) {
            try {
                var companycode = antnex.AppDefaults.getCompanycode();
                var branchcode = antnex.AppDefaults.getBranchcode();
                var machinecode = antnex.AppDefaults.getMachinecode();
                var machinename = antnex.AppDefaults.getMachinename();
                var m = moment()
                var print_date = m.format('YYYYMMDD');
                var print_date2 = m.format('YYYY-MM-DD');
                var print_time = m.format('HH:mm:ss');

                var invoiceno = invoiceData.invoiceno;
                var posid = invoiceData.posid;

                var memo = "";
                if (orderData.member != "") {
                    memo = "會員 " + orderData.member + "&&";
                }
                if (orderData.creditcard != "") {
                    memo = memo + "信用卡 " + orderData.creditcard
                }

                var amount = 0;
                var amount_notax = 0;
                var tax = 0;
                for (var i = 0; i < goodlist.length; i++) {
                    goodlist[i].serialno = (i + 1);
                    amount = amount + goodlist[i].totalhavetax;
                }
                amount = Math.round(amount);
                amount_notax = amount;

                if (orderData.customertaxcode != '') {
                    tax = Math.round(amount / 1.05 * 0.05);
                    amount_notax = amount - tax
                }

                let ivdata = {
                    companycode: companycode,
                    storecode: branchcode,
                    machinecode: machinecode,
                    machinename: machinename,
                    membercode: "",//空白即可
                    billcode: orderData.ordercode,
                    invoiceno: invoiceno,
                    sellerid: branchData.uniformno,
                    posid: posid,
                    ivrcode: "", //隨機碼
                    data: {
                        duplicate: 0,
                        head: {
                            storename: branchData.invoicetitle,
                            storeaddr: branchData.address,
                            taxno: branchData.uniformno,
                            tel: branchData.tel,
                            ivdate: print_date,
                            ivdate2: print_date2,
                            ivtime: print_time,
                            terminal: machinecode,
                            customername: orderData.customername,
                            customertaxcode: orderData.customertaxcode, //購買人統一編號
                            cardno: orderData.creditcard,//"4145-1234567-1234",
                            authcode: "",//信用卡授權碼
                            ivdonate: "",
                            ivdonatetype: "",
                            ivcarriertype: "",
                            ivcarriercode1: "",
                            ivcarriercode2: "",
                            ivprint: "Y",
                            ivprinttype: "0",
                            ivmemo1: "機" + machinecode + " 單" + orderData.ordercode,
                            ivmemo2: "",
                            ivmemo: memo,//"信用卡1234&&會員12345&&點數1234",
                            ivreprint: "",
                            ivemail: "",
                            ivix: "",
                            ivbuyeraddr: "",
                            ivadcontent: ""//廣告訊息
                        },
                        items: goodlist,
                        footer: {
                            ivamount: amount_notax,//未稅金額
                            ivtax: tax,//稅額
                            ivtotal: amount,//含稅金額
                            cash: amount - orderData.creditcardamount,
                            credit: orderData.creditcardamount,
                            ivtaxtype: "1",
                            ivtaxrate: "0.05",
                            ivnamt: 0,
                            ivzamt: 0
                        }
                    }
                };

                if (amount - orderData.creditcardamount < 0) {
                    throw '現金金額小於零，無法列印發票'
                }

                var needToPrint = 1; //是否送資料到發票機 1是 9否

                // if(needToPrint == 1){
                //     printer.printInvoice(ivdata)
                //         .then(function(json){
                //             //console.log(JSON.stringify(json, null, 2));
                //             // console.log(" 狀態: " + json.status);
                //             // console.log("RPT/Finish: " + moment().format());
                //             resolve({
                //                 ivdata: {
                //                     ordercode: orderData.ordercode,
                //                     invoiceno: invoiceno,
                //                     uniformno: orderData.customertaxcode,
                //                     amount: amount,
                //                     good: goodlist
                //                 },
                //                 page: 1,
                //                 status: json.status
                //             });
                //         })
                //         .catch(function(error) {
                //             // console.error('列印失敗: ' + error);
                //             reject('電子發票開立列印異常(2): ' + error);
                //         });
                // }else{
                //     resolve({
                //         ivdata: {
                //             ordercode: orderData.ordercode,
                //             invoiceno: invoiceno,
                //             uniformno: orderData.customertaxcode,
                //             amount: amount,
                //             good: goodlist
                //         },
                //         page: 1,
                //         status: 36864
                //     });
                // }


                var returnData = {
                    ivdata: {
                        ordercode: orderData.ordercode,
                        invoiceno: invoiceno,
                        uniformno: orderData.customertaxcode,
                        amount: amount,
                        good: goodlist
                    },
                    page: 1,
                    status: 36864
                };

                if (needToPrint != 1) {
                    resolve(returnData);
                } else {
                    var uploadJSON = {
                        txcode: "DBS_MIRLEPOS_SEND_DATA",
                        type: "C0401",
                        data: ivdata
                    }
                    antnex.ProxyService.send(uploadJSON).then(function (json2) {
                        console.log("json2")
                        console.log(json2)
                        switch (json2.status) {
                            case '9000':
                                ivdata.ivrcode = json2.message.ivrcode
                                console.log("ivdata: " + JSON.stringify(ivdata))
                                printer.printInvoice(ivdata)
                                    .then(function (json) {
                                        //console.log(JSON.stringify(json, null, 2));
                                        // console.log(" 狀態: " + json.status);
                                        // console.log("RPT/Finish: " + moment().format());
                                        returnData.status = json.status;
                                        resolve(returnData);
                                    })
                                    .catch(function (error) {
                                        // console.error('列印失敗: ' + error);
                                        reject('電子發票開立列印異常(3): ' + error);
                                    });
                                break;
                            default:
                                me.showMessage(json2.status);
                                break;
                        }
                    }).catch(function (e) {
                        reject('電子發票開立列印異常(2): ' + e);
                    });
                }
            } catch (e) {
                reject('電子發票開立列印異常(1): ' + e);
            }
        })
    },
    //作廢電子發票
    dropMirleData: function (printer, posid, ordercode, invoiceno, taketm, droptm, branchData) {
        var me = this;
        return new Promise(function (resolve, reject) {
            try {
                var companycode = antnex.AppDefaults.getCompanycode();
                var branchcode = antnex.AppDefaults.getBranchcode();
                var machinecode = antnex.AppDefaults.getMachinecode();
                var machinename = antnex.AppDefaults.getMachinename();

                var ivdata = {
                    txcode: "MIRLE002",
                    ivtype: "C0501",
                    companycode: companycode,
                    storecode: branchcode,
                    machinecode: machinecode,
                    machinename: machinename,
                    membercode: "",
                    billcode: ordercode,
                    invoiceno: invoiceno,
                    sellerid: branchData.uniformno,
                    posid: posid,
                    data: {
                        invoiceno: invoiceno,
                        duplicate: 0,
                        head: {
                            storename: branchData.invoicetitle,
                            storeaddr: branchData.address,
                            taxno: branchData.uniformno,
                            tel: branchData.tel,
                            ivdate: taketm.substring(0, 10), //ex 2020-01-01
                            revokedate: droptm.substring(0, 10),
                            revoketime: droptm.substring(11),
                            revoke: ordercode + " 作廢發票",
                            terminal: machinecode,
                            customername: "",
                            customertaxcode: "",
                            cardno: "",
                            authcode: "",
                            ivmemo: "",
                            ivemail: ""
                        },
                        items: [],
                        footer: {}
                    }
                }

                console.log(ivdata)

                var uploadJSON = {
                    txcode: "DBS_MIRLEPOS_SEND_DATA",
                    type: "C0501",
                    data: ivdata
                }
                antnex.ProxyService.send(uploadJSON).then(function (json2) {
                    console.log("DBS_MIRLEPOS_SEND_DATA json2:")
                    console.log(json2)
                    switch (json2.status) {
                        case '9000':
                            let res = {
                                status: 200,
                                page: 1
                            }
                            resolve(res)
                            break;
                        default:
                            me.showMessage(json2.status);
                            break;
                    }
                }).catch(function (e) {
                    // logger.error("RptService2/ DBS_MIRLEPOS_SEND_DATA/ProxyService error: " + e);
                    reject('電子發票作廢異常(3): ' + e);
                });

                // printer.revoke(ivdata)
                //     .then(function(json){
                //         console.log("printer.revoke")
                //         console.log(json)
                //         let res = {
                //             status: 200,
                //             page: 1
                //         }
                //         resolve(res)
                //     })
                //     .catch(function(error) {
                //         // console.error('列印失敗: ' + error);
                //         reject('電子發票作廢異常(2): ' + error);
                //     });
            } catch (e) {
                reject('電子發票作廢異常(1): ' + e);
            }
        })
    },
    //折讓電子發票
    disMirleData: function (printer, posid, ordercode, invoiceno, invoiceData, branchData) {
        var me = this;
        return new Promise(function (resolve, reject) {
            try {
                var companycode = antnex.AppDefaults.getCompanycode();
                var branchcode = antnex.AppDefaults.getBranchcode();
                var machinecode = antnex.AppDefaults.getMachinecode();
                var machinename = antnex.AppDefaults.getMachinename();

                var uniformno = invoiceData.uniformno;
                var goodlist = invoiceData.goodlist;
                // var taketm = invoiceData.taketm.replace(/-/g,'');
                // var taketm2 = invoiceData.taketm.substring(0, 10);
                var droptm = invoiceData.droptm.replace(/-/g, '');
                var droptm2 = invoiceData.droptm.substring(0, 10);
                var goodlist2 = [];
                var amount = 0;
                var tax = 0;

                for (var i = 0; i < goodlist.length; i++) {
                    var obj_tax = 0;
                    if (uniformno == '') {

                    } else {
                        obj_tax = Math.round(goodlist[i].total / 1.05 * 0.05);
                    }

                    goodlist2.push({
                        sn: goodlist[i].serialno.toString(),
                        price: goodlist[i].price,
                        qty: goodlist[i].qty,
                        total: goodlist[i].total - obj_tax, //這裡需輸入未稅金額
                        name: goodlist[i].name,
                        ivtaxtype: "1",
                        tax: obj_tax.toString()
                    })

                    tax = tax + obj_tax;
                    amount = amount + goodlist[i].total;
                }

                var ivdata = {
                    txcode: "MIRLE002",
                    ivtype: "D0401",
                    companycode: companycode,
                    storecode: branchcode,
                    machinecode: machinecode,
                    machinename: machinename,
                    membercode: "",
                    billcode: ordercode,
                    invoiceno: invoiceno,
                    sellerid: branchData.uniformno,
                    posid: posid,
                    data: {
                        originalordercode: invoiceData.ordercode,
                        originalinvoiceno: invoiceData.invoiceno,
                        originaltradedate: invoiceData.tradedate,
                        invoiceno: invoiceno,
                        ivdate: droptm,
                        ivdate2: droptm2,
                        head: {
                            discode: ordercode,
                            disdate: droptm,
                            sellcode: branchData.uniformno,
                            sellname: branchData.invoicetitle,
                            buycode: uniformno,
                            buyname: "0000",//買方名稱  若無填入4個0
                            distype: "2",

                            selladdr: branchData.address,
                            sellowner: "",
                            selltel: branchData.tel,
                            sellfax: branchData.fax,//"111111",
                            sellemail: "",

                            buyaddr: "",
                            buyowner: "",
                            buytel: "",
                            buyfax: "",
                            buyemail: "",
                            buycuscode: ""

                        },
                        items: goodlist2,
                        footer: {
                            ivamount: amount - tax,  //未稅總額
                            ivtax: tax,              //稅額
                            ivtotal: amount          //含稅總額
                        }
                    }
                }

                console.log(ivdata)

                var uploadJSON = {
                    txcode: "DBS_MIRLEPOS_SEND_DATA",
                    type: "D0401",
                    data: ivdata
                }
                antnex.ProxyService.send(uploadJSON).then(function (json2) {
                    if (json2.status == '9000') {
                        printer.creditNote(ivdata)
                            .then(function (json) {
                                let res = {
                                    status: 200,
                                    page: 1
                                }
                                resolve(res)
                            })
                            .catch(function (error) {
                                // console.error('列印失敗: ' + error);
                                reject('電子發票折讓異常(2): ' + error);
                            });
                    } else {
                        me.showMessage(json2.status);
                    }
                }).catch(function (e) {
                    // logger.error("RptService2/ DBS_MIRLEPOS_SEND_DATA/ProxyService error: " + e);
                    reject('電子發票折讓異常(3): ' + e);
                });


            } catch (e) {
                reject('電子發票折讓異常(1): ' + e);
            }
        })
    },

    //上傳發票資訊
    uploadInvoice: function (ivdata, formtype, uniformno, pages, type) {
        var me = this;
        return new Promise(function (resolve, reject) {
            try {
                console.log("saleclient.services.RptService2:: uploadInvoice")
                let content = {
                    txcode: 'INVOICESALE00033',
                    formtype: formtype,
                    // orderid: context.orderid,
                    ordercode: ivdata.ordercode,
                    type: type,//1三聯式發票 2電子發票
                    invoiceno: ivdata.invoiceno,
                    uniformno: uniformno,
                    amount: ivdata.amount,
                    usercode: antnex.AppDefaults.getEmployee(),
                    branchcode: antnex.AppDefaults.getBranchcode(),
                    machinecode: antnex.AppDefaults.getMachinecode(),
                    good: ivdata.good,
                    pages: pages
                };
                antnex.ProxyService.send(content).then(function (json) {
                    console.log("下行:" + JSON.stringify(json))
                    if (S(json.status).isEmpty()) {
                        reject("交易訊息資料格式有誤")
                    } else if (json.status != '9000') {
                        reject(json.status)
                    } else {
                        var status = json.message.resStatus
                        var invoiceno = json.message.invoiceno
                        resolve(invoiceno);
                    }

                }).catch(function (error) {
                    // logger.error("RptService uploadInvoice ProxyService error: " + error);
                    reject("發票列印-發票資料更新異常(2): " + error);
                })
            } catch (e) {
                // logger.error('RptService uploadInvoice err:' + e);
                reject('發票列印-發票資料更新異常(1): ' + e);
            }
        })
    },

    //上傳發票資訊
    dropInvoiceUnUseUpload: function (type, invoiceno, memo) {
        var me = this;
        return new Promise(function (resolve, reject) {
            try {
                let content = {
                    txcode: 'DBS_INVOICE_DROP_UNUSE',
                    type: type,//1三聯式發票 2電子發票
                    invoiceno: invoiceno,
                    memo: memo,
                    usercode: antnex.AppDefaults.getEmployee(),
                    branchcode: antnex.AppDefaults.getBranchcode(),
                    machinecode: antnex.AppDefaults.getMachinecode()
                };
                antnex.ProxyService.send(content).then(function (json) {
                    console.log("下行:" + JSON.stringify(json))
                    if (S(json.status).isEmpty()) {
                        reject("交易訊息資料格式有誤")
                    } else if (json.status != '9000') {
                        reject(json.status)
                    } else {
                        var status = json.message.resStatus
                        resolve(status);
                    }

                }).catch(function (error) {
                    // logger.error("RptService uploadInvoice ProxyService error: " + error);
                    reject("發票列印-發票資料更新異常(2): " + error);
                })
            } catch (e) {
                // logger.error('RptService uploadInvoice err:' + e);
                reject('發票列印-發票資料更新異常(1): ' + e);
            }
        })
    },

    // 電子發票列印測試
    printEVtest: function (printer) {
        var me = this;
        return new Promise(function (resolve, reject) {
            try {
                var me = this;
                var m = moment();

                if (printer === undefined) {
                    logger.error("MIRLE/RPT undefined");
                    return;
                }

                printer.printEVTest()
                    .then(function (json) {
                        //console.log(JSON.stringify(json, null, 2));
                        // console.log(" 狀態: " + json.status);
                        // console.log("RPT/Finish: " + moment().format());
                        resolve({
                            status: json.status
                        });
                    })
                    .catch(function (error) {
                        // console.error('列印失敗: ' + error);
                        reject('電子發票測試列印異常(2): ' + error);
                    });

                console.log("Start: " + moment().format());
            } catch (e) {
                // logger.error('RptService printEVtest err:' + e);
            }
        })
    },


    // 電子發票-開立發票列印
    printEV: function (printer) {
        let me = this;
        return new Promise(function (resolve, reject) {
            try {
                var m = moment();

                if (printer === undefined) {
                    logger.error("MIRLE/EV undefined");
                    return;
                }

                printer.printEV()
                    .then(function (json) {
                        //console.log(JSON.stringify(json, null, 2));
                        // console.log(" 狀態: " + json.status);
                        // console.log("RPT/Finish: " + moment().format());
                        resolve({
                            status: json.status
                        });
                    })
                    .catch(function (error) {
                        // console.error('列印失敗: ' + error);
                        reject('電子發票開立列印異常(2): ' + error);
                    });

                console.log("Start: " + moment().format());
            } catch (e) {
                logger.error('printEV err:' + e);
            }
        })
    },



    // 電子發票-作廢發票列印
    revokeEV: function (printer) {
        let me = this;
        return new Promise(function (resolve, reject) {
            try {
                var m = moment();

                if (printer === undefined) {
                    logger.error("MIRLE/revoke undefined");
                    return;
                }

                printer.revoke()
                    .then(function (json) {
                        //console.log(JSON.stringify(json, null, 2));
                        // console.log(" 狀態: " + json.status);
                        // console.log("RPT/Finish: " + moment().format());
                        resolve({
                            status: json.status
                        });
                    })
                    .catch(function (error) {
                        // console.error('列印失敗: ' + error);
                        reject('電子發票作廢列印異常(2): ' + error);
                    });

                console.log("Start: " + moment().format());
            } catch (e) {
                logger.error('revokeEV err:' + e);
            }
        })

    },



    // 電子發票-開立賣方折讓單列印
    creditNote: function (printer) {
        let me = this;
        return new Promise(function (resolve, reject) {
            try {
                var m = moment();

                if (printer === undefined) {
                    logger.error("MIRLE/creditNote undefined");
                    return;
                }

                printer.creditNote()
                    .then(function (json) {
                        //console.log(JSON.stringify(json, null, 2));
                        // console.log(" 狀態: " + json.status);
                        // console.log("RPT/Finish: " + moment().format());
                        resolve({
                            status: json.status
                        });
                    })
                    .catch(function (error) {
                        // console.error('列印失敗: ' + error);
                        reject('電子發票開立賣方折讓單異常(2): ' + error);
                    });

                console.log("Start: " + moment().format());
            } catch (e) {
                logger.error('creditNote err:' + e);
            }
        })

    },



    // 電子發票-作廢賣方開立折讓單
    revokeCreditNote: function (printer) {
        let me = this;
        return new Promise(function (resolve, reject) {
            try {
                var m = moment();

                if (printer === undefined) {
                    logger.error("MIRLE/revokeCreditNote undefined");
                    return;
                }

                printer.creditNote()
                    .then(function (json) {
                        //console.log(JSON.stringify(json, null, 2));
                        // console.log(" 狀態: " + json.status);
                        // console.log("RPT/Finish: " + moment().format());
                        resolve({
                            status: json.status
                        });
                    })
                    .catch(function (error) {
                        // console.error('列印失敗: ' + error);
                        reject('電子發票作廢賣方開立折讓單異常(2): ' + error);
                    });

                console.log("Start: " + moment().format());
            } catch (e) {
                logger.error('revokeCreditNote err:' + e);
            }
        })
    },

    // 電子發票-查詢設備裝置狀態
    queryDevice: function (branchcode = '') {
        let me = this;
        return new Promise(function (resolve, reject) {
            try {
                let companycode = antnex.AppDefaults.getCompanycode();
                branchcode = branchcode ? branchcode : antnex.AppDefaults.getBranchcode();

                console.log(companycode + " / " + branchcode);

                let rptManager = new RPTManager2(companycode, branchcode);
                // let rptManager = new RPTManager("ant", "S00002");
                console.log("Start: " + moment().format());

                rptManager.isReady()
                    .then(function (domain) {
                        console.log("rptManager.isReady().return: " + domain);
                        rptManager.queryDevice()
                            .then(function (response) {
                                resolve(response);
                            })
                            .catch(function (error) {
                                reject(domain + ' 閘道連線異常: ' + error);
                            });
                    }).catch(function (error) {
                        reject('查詢閘道失敗: ' + error);
                    });


            } catch (e) {
                logger.error('RptService queryDevice err:' + e);
                reject('發票列印-查詢設備裝置狀態失敗: ' + e);
            }
        });
    },

    showMessage: function (message) {
        Ext.Msg.alert("發票作業異常通知", message);
    }
});
