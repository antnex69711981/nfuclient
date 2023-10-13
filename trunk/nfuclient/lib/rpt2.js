/*
  Receipt Printer Module
  By Jack Wen, 2022/APR/12
 */

/*
   發票/明細印表機管理
 */
class RPTManager2 {


    constructor(c, b) {
        this._version = "2022-04-12";
        // 模式 預設正式機
        this.production = true;
        // https restlet
        this.gwport = 8756; //http 8755 https 8756
        // 閘道連線域名
        this.domainname = "";
        // 閘道名稱
        this.caption = "";
        // 備註說明
        this.memo = "";
        // 內網IP
        this.localip = "";

        this.companycode = c;
        this.branchcode = b;

        // isReady 成功後會轉換成可用狀態
        this.isAvaliable = false;


        // 電子發票平台 1-MIRLE 盟立
        //this.evtype = 1;
    }

    get version() {
        return this._version;
    }

    get evtype() {
        return this.evtype;
    }


    set evtype(t) {
        this.evtype = t;
    }

    isProduction() {
        return this.production;
    }


    isEmpty(s) {
        return s === null || s === undefined ? true : /^[\s\xa0]*$/.test(s);
    }

    /**
     * 與中心獲取該店所配置的閘道資訊，並且保留閘道的位址資訊。
     * @returns {Promise<unknown>} 回傳閘道位址域名資訊
     */
    isReady() {
        console.log("RPTManager2: isReady");
        const me = this;
        return new Promise((resolve, reject) => {

            if(this.isEmpty(me.companycode)) {
                reject("無 comanycode");
            }

            if(this.isEmpty(me.branchcode)) {
                reject("無 branchcode");
            }


            this.getGWDomainname()
                .then(function(n) {
                    console.log("n: " + n);
                    me.domainname = n;
                    me.isAvaliable = true;
                    resolve(n);
                })
                .catch(function(error) {
                    console.error('isReady/ err: ' + error);
                    me.isAvaliable = false;
                    reject(error);
                });

        });

    }


    /**
     * 向閘道獲取所配置的設備資訊
     * @returns {Promise<unknown>}
     */
    queryDevice() {
        let me = this;
        return new Promise((resolve, reject) => {
            console.log("RPTManager2: queryDevice");

            let companycode = me.companycode;
            let branchcode = me.branchcode;
            let gwdomain = me.domainname;

            if(this.isEmpty(me.companycode)) {
                reject("無 comanycode");
            }

            if(this.isEmpty(me.branchcode)) {
                reject("無 branchcode");
            }

            if(this.isEmpty(gwdomain)) {
                reject("無 閘道域名");
            }


            let requestData = {
                txcode: "GWIV100",
                companycode: companycode,
                storecode: branchcode
            }

            let requestString = JSON.stringify(requestData);
            console.log(JSON.stringify(requestData, null, 2));


            let d = new Date();
            let url = me.getGatewayURL().concat("?_dc=" + d.getTime());
            console.log("checkGWDevice/URL: " + url);

            fetch(url, {
                method: "POST",
                mode: 'cors',
                cache: 'no-cache',
                body: requestString,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    'Accept': 'application/json'
                }
            })
                .then(function (response) {
                    console.log("queryDevice.response1:");
                    console.log(JSON.stringify(response, null, 2));

                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        reject("電子發票-查詢設備裝置狀態/ 訊息異常 通訊狀態碼：" + response.status);
                    }
                })
                .then(function (json) {
                    console.log("queryDevice.response2:");
                    console.log(JSON.stringify(json, null, 2));

                    let status = json.hasOwnProperty('status') ? json.status : "訊息內容異常";
                    //console.log("status:" + status);

                    if (status !== 1) {
                        if (json.hasOwnProperty('message')) {
                            reject("電子發票-查詢設備裝置狀態/ 交易回應失敗：" + json.message);
                        } else {
                            reject("電子發票-查詢設備裝置狀態/ 交易回應失敗：" + status);
                        }
                    }else{
                        json.gatewaydomain = gwdomain;
                        resolve(json);
                    }



                })
                .catch(function (error) {
                    console.error('RPT2 電子發票-查詢設備裝置狀態/ 交易失敗 catch: ' + error);
                    reject(error);
                });

        });

    }


    /**
     * 建立發票處理物件，必須先成功取得閘道的位置資訊。ㄋ
     * @param ptype 要建立的發票機類型 3-熱感式 4-三聯式
     * @returns {EVPrinter|IVPrinter} 回傳指定的列印物件
     */
    createPrinter(ptype) {
        const me = this;
        let p;
        //console.log("createPrinter");
        if(this.isEmpty(me.domainname)){
            throw new Error("No Gateway Domainname");
        }

        console.log("ptype:" + ptype);

        try{
            switch(ptype){
                case 3: // 電子發票
                    p = new EVPrinter(me.companycode, me.branchcode);
                    p.printerType = 3;
                    //p.evtype = this.evtype;
                    p.production = me.production;
                    p.gwport = me.gwport;
                    p.domainname = me.domainname;
                    break;

                case 4:
                    p = new IVPrinter(me.companycode, me.branchcode);
                    p.printerType = 4;
                    p.production = me.production;
                    p.gwport = me.gwport;
                    p.domainname = me.domainname;
                    break;

                default:
                    throw new Error("not support type:" + ptype);
            }
        }catch(err){
            console.log("createPrinter error: " + err);
            throw err;
        }


        return p;
    }

    // https://ipos.antnex.com.tw
    getHostURL() {
        // return this.production?"https://ipos.antnex.com.tw":"http://nexclientdev.antnex.com.tw:1080";
        return this.production?"https://nexpos.antnex.com.tw":"http://nexclientdev2.antnex.com.tw";
        // return "http://192.168.50.105:8080";
    }

    /*
    三聯式發票
     */
    getGatewayURL() {
        console.log("getGatewayURL.domainname: " + this.domainname);
        //測試先改成http 正式走https
        return "https://".concat(this.domainname).concat(":").concat(this.gwport).concat("/antnex/gwdevice");
    }

    /*
    盟立發票
     */
    getEVGatewayURL() {
        return "https://".concat(this.domainname).concat(":").concat(this.gwport).concat("/antnex/mirle");
    }

    async getGWDomainname() {
        const me = this;
        let d = await this.findGateway(this.companycode, this.branchcode);

        // test
        //d.domainname = "ip-192-168-50-41.antnex.com.tw";

        me.domainname = d.hasOwnProperty('domainname') ? d.domainname : "";
        me.caption = d.hasOwnProperty('caption') ? d.caption : "";
        me.memo = d.hasOwnProperty('memo') ? d.memo : "";
        me.localip = d.hasOwnProperty('localip') ? d.localip : "";
        return me.domainname;
    }

    /*
    取得指定單位配置的閘道資訊
     */
    findGateway(companycode, branchcode) {
        const me = this;
        return new Promise((resolve, reject) => {
            console.log("findGateway start");
            try{

                if(me.isEmpty(companycode)) reject("公司代碼 不得為空");
                if(me.isEmpty(branchcode)) reject("分店代碼 不得為空");



                let requestData = {
                    txcode: "GW0005",
                    companycode: companycode,
                    storecode: branchcode,
                    machinecode: "",
                    machinename: ""
                }

                let requestString = JSON.stringify(requestData);
                console.log(JSON.stringify(requestData, null, 2));

                let d = new Date();
                let url = me.getHostURL().concat("/nexapi/printer").concat("?_dc=" + d.getTime());
                console.log("URL: " + url);

                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    body: requestString,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/json'
                    }
                })
                    .then(function(response){
                        console.log("POST response: ");
                        console.log(response);
                        if (response.status >= 200 && response.status < 300) {
                            return response.json();
                        } else {
                            reject("訊息異常 通訊狀態碼：" + response.status);
                        }
                    })
                    .then(function(json) {
                        //console.log(JSON.stringify(json, null, 2));

                        let status = json.hasOwnProperty('status')? json.status :"訊息內容異常";
                        //console.log("status:" + status);

                        if (status !== "9000") {
                            reject("交易失敗：" + status);
                        }

                        resolve(json.data);
                    })
                    .catch(function(error) {
                        console.error('RPT 交易失敗 catch: ' + error);
                        reject(error);
                    });


            }catch(err){
                console.error("findMatchGWDevice error: " + err);
            }
        });
    }


    /*
    閘道通訊檢查
     */
    checkGWDevice(domainname, companycode, branchcode, printertype) {
        const me = this;
        return new Promise((resolve, reject) => {
            try {

                if (me.isEmpty(companycode)) reject("公司代碼 不得為空");
                if (me.isEmpty(branchcode)) reject("分店代碼 不得為空");
                if (me.isEmpty(domainname)) reject("閘道域名 不得為空");

                let requestData = {
                    txcode: "GWIV001",
                    companycode: companycode,
                    storecode: branchcode,
                    machinecode: "",
                    machinename: "",
                    config: {
                        printertype: printertype
                    }
                }

                let requestString = JSON.stringify(requestData);
                //console.log(JSON.stringify(requestData, null, 2));


                let d = new Date();
                let url = me.getGatewayURL().concat("?_dc=" + d.getTime());
                //console.log("checkGWDevice/URL: " + url);

                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    body: requestString,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/json'
                    }
                })
                    .then(function (response) {
                        if (response.status >= 200 && response.status < 300) {
                            return response.json();
                        } else {
                            reject("訊息異常 通訊狀態碼：" + response.status);
                        }
                    })
                    .then(function (json) {
                        //console.log(JSON.stringify(json, null, 2));

                        let status = json.hasOwnProperty('status') ? json.status : "訊息內容異常";
                        //console.log("status:" + status);

                        if (status !== 0x9000) {
                            if (json.hasOwnProperty('message')) {
                                reject("交易失敗：" + json.message);
                            } else {
                                reject("交易失敗：" + status);
                            }
                        }

                        resolve(json);
                    })
                    .catch(function (error) {
                        console.error('RPT 交易失敗 catch: ' + error);
                        reject(error);
                    });
            } catch (e) {
                console.error("RPT/ checkGWDevice Error:" + e);
                reject("checkGWDevice err:" + e);
            }
        });

    };



    /*
    列印測試
     */
    printTest(domainname, prnuuid, ivdata) {
        const me = this;
        return new Promise((resolve, reject) => {
            try{


                let companycode = ivdata.companycode;
                let branchcode = ivdata.storecode;

                if(me.isEmpty(companycode)) reject("公司代碼 不得為空");
                if(me.isEmpty(branchcode)) reject("分店代碼 不得為空");
                if(me.isEmpty(domainname)) reject("閘道域名 不得為空");
                if(me.isEmpty(prnuuid))  reject("印表機代碼 不得為空");

                let requestData = {
                    txcode: "GWIV002",
                    companycode: companycode,
                    storecode: branchcode,
                    machinecode: ivdata.machinecode,
                    machinename: ivdata.machinename,
                    membercode: ivdata.membercode,
                    billcode: ivdata.billcode,
                    datetime: moment().format(),
                    config: {
                        id: prnuuid
                    },
                    data: []
                }

                let requestString = JSON.stringify(requestData);
                //console.log(JSON.stringify(requestData, null, 2));

                let d = new Date();
                let url = this.getGatewayURL().concat("?_dc=" + d.getTime());
                //console.log("printTest/URL: " + url);

                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    body: requestString,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/json'
                    }
                })
                    .then(function(response){
                        if (response.status >= 200 && response.status < 300) {
                            return response.json();
                        } else {
                            reject("訊息異常 通訊狀態碼：" + response.status);
                        }
                    })
                    .then(function(json) {
                        //console.log(JSON.stringify(json, null, 2));

                        let status = json.hasOwnProperty('status')? json.status :"訊息內容異常";
                        //console.log("status:" + status);

                        if (status !== 0x9000) {
                            if(json.hasOwnProperty('message')){
                                reject("交易失敗：" + json.message);
                            }else{
                                reject("交易失敗：" + status);
                            }

                        }

                        resolve(json);
                    })
                    .catch(function(error) {
                        console.error('RPT 交易失敗 catch: ' + error);
                        reject(error);
                    });



            } catch (e) {
                console.error("RPT/ printTest Error:" + e);
                reject("printTest err:" + e);
            }
        });


    };


    /*
    列印發票
     */
    printInvoice(domainname, prnuuid, ivdata) {
        const me = this;
        return new Promise((resolve, reject) => {
            try{


                let companycode = ivdata.companycode;
                let branchcode = ivdata.storecode;

                if(me.isEmpty(companycode)) reject("公司代碼 不得為空");
                if(me.isEmpty(branchcode)) reject("分店代碼 不得為空");
                if(me.isEmpty(domainname)) reject("閘道域名 不得為空");
                if(me.isEmpty(prnuuid))  reject("印表機代碼 不得為空");

                let requestData = {
                    txcode: "GWIV003",
                    companycode: companycode,
                    storecode: branchcode,
                    machinecode: ivdata.machinecode,
                    machinename: ivdata.machinename,
                    membercode: ivdata.membercode,
                    billcode: ivdata.billcode,
                    config: {
                        id: prnuuid
                    },
                    data: [ivdata.data]
                }

                let requestString = JSON.stringify(requestData);
                //console.log(JSON.stringify(requestData, null, 2));

                let d = new Date();
                let url = this.getGatewayURL().concat("?_dc=" + d.getTime());
                //console.log("printInvoice/URL: " + url);

                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    body: requestString,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/json'
                    }
                })
                    .then(function(response){
                        if (response.status >= 200 && response.status < 300) {
                            return response.json();
                        } else {
                            reject("列印發票訊息異常 通訊狀態碼：" + response.status);
                        }
                    })
                    .then(function(json) {
                        console.log("json return: ");
                        console.log(JSON.stringify(json));

                        let status = json.hasOwnProperty('status')? json.status :"訊息內容異常";
                        //console.log("status:" + status);

                        if (status !== 0x9000) {
                            if(json.hasOwnProperty('message')){
                                reject("列印發票交易失敗：" + json.message);
                            }else{
                                reject("列印發票交易失敗：" + status);
                            }

                        }

                        resolve(json);
                    })
                    .catch(function(error) {
                        console.error('列印發票失敗 catch: ' + error);
                        reject(error);
                    });



            } catch (e) {
                console.error("RPT/ printInvoice Error:" + e);
                reject("printInvoice err:" + e);
            }
        });


    };

    /***************************/
    // 電子發票 //
    /***************************/

    /*
    電子發票列印測試
     */
    printEVTest(ivdata) {
        const me = this;
        return new Promise((resolve, reject) => {
            try{


                let companycode = ivdata.companycode;
                let branchcode = ivdata.storecode;

                if(me.isEmpty(companycode)) reject("公司代碼 不得為空");
                if(me.isEmpty(branchcode)) reject("分店代碼 不得為空");

                let requestData = {
                    txcode: "MIRLE001",
                    companycode: companycode,
                    storecode: branchcode,
                    machinecode: ivdata.machinecode,
                    machinename: ivdata.machinename,
                    membercode: ivdata.membercode,
                    billcode: ivdata.billcode,
                    data: []
                }

                let requestString = JSON.stringify(requestData);
                //console.log(JSON.stringify(requestData, null, 2));

                let d = new Date();
                let url = this.getGatewayURL().concat("?_dc=" + d.getTime());
                //console.log("printEVTest/URL: " + url);

                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    body: requestString,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/json'
                    }
                })
                    .then(function(response){
                        if (response.status >= 200 && response.status < 300) {
                            return response.json();
                        } else {
                            reject("訊息異常 通訊狀態碼：" + response.status);
                        }
                    })
                    .then(function(json) {
                        //console.log(JSON.stringify(json, null, 2));

                        let status = json.hasOwnProperty('status')? json.status :"訊息內容異常";
                        //console.log("status:" + status);

                        if (status !== 0x9000) {
                            if(json.hasOwnProperty('message')){
                                reject("交易失敗：" + json.message);
                            }else{
                                reject("交易失敗：" + status);
                            }

                        }

                        resolve(json);
                    })
                    .catch(function(error) {
                        console.error('RPT 交易失敗 catch: ' + error);
                        reject(error);
                    });



            } catch (e) {
                console.error("RPT/ printEVTest Error:" + e);
                reject("printEVTest err:" + e);
            }
        });


    };


    /*
    列印發票
     */
    printEV(domainname, ivdata) {
        const me = this;
        return new Promise((resolve, reject) => {
            try{


                let companycode = ivdata.companycode;
                let branchcode = ivdata.storecode;

                if(me.isEmpty(companycode)) reject("公司代碼 不得為空");
                if(me.isEmpty(branchcode)) reject("分店代碼 不得為空");
                if(me.isEmpty(domainname)) reject("閘道域名 不得為空");

                let requestData = {
                    txcode: "MIRLE002",
                    ivtype: "C0401",
                    companycode: companycode,
                    storecode: branchcode,
                    machinecode: ivdata.machinecode,
                    machinename: ivdata.machinename,
                    membercode: ivdata.membercode,
                    billcode: ivdata.billcode,
                    invoiceno: ivdata.invoiceno,
                    data: ivdata.data
                }

                let requestString = JSON.stringify(requestData);
                //console.log(JSON.stringify(requestData, null, 2));

                let d = new Date();
                let url = this.getGatewayURL().concat("?_dc=" + d.getTime());
                //console.log("printEV/URL: " + url);

                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    body: requestString,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/json'
                    }
                })
                    .then(function(response){
                        if (response.status >= 200 && response.status < 300) {
                            return response.json();
                        } else {
                            reject("列印發票訊息異常 通訊狀態碼：" + response.status);
                        }
                    })
                    .then(function(json) {
                        //console.log(JSON.stringify(json, null, 2));

                        let status = json.hasOwnProperty('status')? json.status :"訊息內容異常";
                        //console.log("status:" + status);

                        if (status !== 0x9000) {
                            if(json.hasOwnProperty('message')){
                                reject("列印發票交易失敗：" + json.message);
                            }else{
                                reject("列印發票交易失敗：" + status);
                            }

                        }

                        resolve(json);
                    })
                    .catch(function(error) {
                        console.error('列印發票失敗 catch: ' + error);
                        reject(error);
                    });



            } catch (e) {
                console.error("RPT/ printEV Error:" + e);
                reject("printEV err:" + e);
            }
        });


    };

    toString() {
        return `RPT版本:${this._version} 閘道名稱:${this.caption} 內網IP:${this.localip} 說明:${this.memo}`
    }

}


/**
 * 發票物件原生物件，必須透過 RPTManager的createPrinter(ptype) 來建立。
 */
class APrinter {
    constructor(companycode, branchcode) {
        // 3-電子發票(MIRLE) 4-三聯式發票
        this.ptype = 0;
        // 印表機代碼
        this.puuid = "";
        this.production = true;
        this.gwport = 8756; // https restlet port
        // 閘道位址
        this.domainname = "";
        // 印表機名稱
        this.name = "";
        // 型號
        this.product = "";
        // 列印語言
        this.language = "";
        // 品牌
        this.brand = "";
        // 通訊類型
        this.commType = 0;
        // IP位址
        this.ip = "";
        // IP Port
        this.ipport = 0;
        // RS232 Port
        this.serialport = "";

        this.companycode = companycode;
        this.branchcode = branchcode;
    }

    get printerType() {
        return this.ptype;
    }

    set printerType(t) {
        this.ptype = t;
    }


    isEmpty(s) {
        return s === null || s === undefined ? true : /^[\s\xa0]*$/.test(s);
    }


    /**
     * 詢問閘道是否提供符合規格的發票機，獲取該設備的狀態與設備代碼uuid。
     * @returns {Promise<unknown>} 回傳 設備代碼uuid
     */
    isReady() {
        const me = this;
        console.log("RPT2/ isReady");
        return new Promise((resolve, reject) => {

            if (me.isEmpty(me.companycode)) reject("無 comanycode");
            if (me.isEmpty(me.branchcode)) reject("無 branchcode");
            if (me.isEmpty(me.domainname)) reject("無 domainname");




            this.checkGWDevice(me.domainname, me.companycode, me.branchcode, me.ptype)
                .then(function(p) {
                    console.log(JSON.stringify(p, null, 2));

                    if(p.status !== 0x9000) reject("交易狀態失敗:" + p.status);


                    if(me.ptype === 4) {
                        if(!p.hasOwnProperty('printerstatus')) reject("無印表機狀態欄位");
                        if(p.printerstatus !== 1) reject("印表機狀態不可使用:" + p.printerstatus);
                        if(!p.hasOwnProperty('printerprofile')) reject("無印表機組態資料");

                        me.puuid = p.printerprofile.prnuuid;
                        me.name = p.printerprofile.name;
                        me.brand = p.printerprofile.brand;
                        me.product = p.printerprofile.product;
                        me.language = p.printerprofile.language;
                        me.commType = p.printerprofile.device;

                        // TCPIP
                        if(p.printerprofile.hasOwnProperty('tcpip')) {
                            me.ip = p.printerprofile.tcpip.address;
                            me.ipport = p.printerprofile.tcpip.port;
                        }

                        // RS232 serial
                        if(p.printerprofile.hasOwnProperty('spec') && p.printerprofile.spec.hasOwnProperty('serial')) {
                            me.serialport = p.printerprofile.spec.serial.port;
                        }

                        resolve(p.printerprofile.prnuuid);
                    }else{
                        if(!p.hasOwnProperty('printerstatus')) reject("無印表機狀態欄位");
                        if(!p.hasOwnProperty('evstatus')) reject("無電子發票平台狀態欄位");
                        if(!p.hasOwnProperty('ev')) reject("無電子發票平台名稱欄位");
                        //resolve(p);
                        resolve(p.ev);
                    }




                })
                .catch(function(error) {
                    console.error('APrinter-isReady/ err: ' + error);
                    reject(error);
                });

        });

    }


    /*
    閘道通訊檢查
     */
    checkGWDevice(domainname, companycode, branchcode, printertype) {
        const me = this;
        console.log("checkGWDevice");
        return new Promise((resolve, reject) => {
            try {

                if (me.isEmpty(companycode)) reject("公司代碼 不得為空");
                if (me.isEmpty(branchcode)) reject("分店代碼 不得為空");



                let requestData = {
                    txcode: "GWIV001",
                    companycode: companycode,
                    storecode: branchcode,
                    machinecode: "",
                    machinename: "",
                    config: {
                        printertype: printertype
                    }
                }

                let requestString = JSON.stringify(requestData);
                console.log("requestData: " + JSON.stringify(requestData, null, 2));


                let d = new Date();
                let url = me.getGatewayURL().concat("?_dc=" + d.getTime());
                console.log("checkGWDevice/URL: " + url);



                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    body: requestString,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/json'
                    }
                })
                    .then(function (response) {
                        if (response.status >= 200 && response.status < 300) {
                            return response.json();
                        } else {
                            reject("訊息異常 通訊狀態碼：" + response.status);
                        }
                    })
                    .then(function (json) {
                        //console.log(JSON.stringify(json, null, 2));
                        //console.log("GWIV001/REPLY: " + moment().format());

                        let status = json.hasOwnProperty('status') ? json.status : "訊息內容異常";
                        //console.log("status:" + status);

                        if (status !== 0x9000) {
                            if (json.hasOwnProperty('message')) {
                                reject("交易失敗：" + json.message);
                            } else {
                                reject("交易失敗：" + status);
                            }
                        }

                        resolve(json);
                    })
                    .catch(function (error) {
                        console.error('RPT 交易失敗 catch: ' + error);
                        reject(error);
                    });
            } catch (e) {
                console.error("RPT/ checkGWDevice Error:" + e);
                reject("checkGWDevice err:" + e);
            }
        });

    }




    toString() {
        const me = this;
        let cname = "";
        let pname = "";

        switch(me.commType){
            case 1:
                cname = "TCPIP";
                break;
            case 2:
                cname = "SERIAL";
                break;
        }


        switch(me.ptype){
            case 3:
                pname = "熱感式";
                break;
            case 4:
                pname = "三聯式";
                break;
        }
        return `發票機類型:${pname} 名稱:${me.name} 品牌:${me.brand} 型號:${me.product} 列印語言:${me.language} 連線方式:${cname} IP:${me.ip} IPPort:${me.ipport} SerialPort:${me.serialport} 代碼:${me.puuid}`;
    }


}

/*
    三聯式發票
 */
class IVPrinter extends APrinter {


    getGatewayURL() {
        return "https://".concat(this.domainname).concat(":").concat(this.gwport).concat("/antnex/gwdevice");
    }

    /**
     * 列印測試
     * @returns {Promise<unknown>}
     */
    printTest() {
        const me = this;
        return new Promise((resolve, reject) => {
            try{



                if(me.isEmpty(me.companycode)) reject("公司代碼 不得為空");
                if(me.isEmpty(me.branchcode)) reject("分店代碼 不得為空");
                if(me.isEmpty(me.domainname)) reject("閘道域名 不得為空");
                if(me.isEmpty(me.puuid))  reject("印表機代碼 不得為空");


                let requestData = {
                    txcode: "GWIV002",
                    companycode: me.companycode,
                    storecode: me.branchcode,
                    machinecode: "123456",
                    machinename: "123456",
                    membercode: "A0001",
                    billcode: "SL1234567890",
                    config: {
                        id: me.puuid
                    },
                    data: []
                };

                let requestString = JSON.stringify(requestData);
                //console.log(JSON.stringify(requestData, null, 2));

                let d = new Date();
                let url = me.getGatewayURL().concat("?_dc=" + d.getTime());
                //console.log("printTest/URL: " + url);

                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    body: requestString,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/json'
                    }
                })
                    .then(function(response){
                        if (response.status >= 200 && response.status < 300) {
                            return response.json();
                        } else {
                            reject("訊息異常 通訊狀態碼：" + response.status);
                        }
                    })
                    .then(function(json) {
                        //console.log(JSON.stringify(json, null, 2));

                        let status = json.hasOwnProperty('status')? json.status :"訊息內容異常";
                        //console.log("status:" + status);

                        if (status !== 0x9000) {
                            if(json.hasOwnProperty('message')){
                                reject("交易失敗：" + json.message);
                            }else{
                                reject("交易失敗：" + status);
                            }

                        }

                        resolve(json);
                    })
                    .catch(function(error) {
                        console.error('RPT 交易失敗 catch: ' + error);
                        reject(error);
                    });



            } catch (e) {
                console.error("RPT/ printTest Error:" + e);
                reject("printTest err:" + e);
            }
        });


    }



    /**
     * 列印發票
     * @param ivdata 發票資料
     * @returns {Promise<unknown>} 回傳列印張數與狀態資訊
     */
    printInvoice(ivdata) {
        const me = this;
        return new Promise((resolve, reject) => {
            try{


                if(me.isEmpty(me.companycode)) reject("公司代碼 不得為空");
                if(me.isEmpty(me.branchcode)) reject("分店代碼 不得為空");
                if(me.isEmpty(me.domainname)) reject("閘道域名 不得為空");
                if(me.isEmpty(me.puuid))  reject("印表機代碼 不得為空");

                let requestData = {
                    txcode: "GWIV003",
                    companycode: me.companycode,
                    storecode: me.branchcode,
                    machinecode: ivdata.machinecode,
                    machinename: ivdata.machinename,
                    membercode: ivdata.membercode,
                    billcode: ivdata.billcode,
                    config: {
                        id: me.puuid
                    },
                    data: [ivdata.data]
                };

                let requestString = JSON.stringify(requestData);
                //console.log(JSON.stringify(requestData, null, 2));

                let d = new Date();
                let url = this.getGatewayURL().concat("?_dc=" + d.getTime());
                //console.log("printInvoice/URL: " + url);
                //console.log("GWIV003/SEND: " + moment().format());

                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    body: requestString,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/json'
                    }
                })
                    .then(function(response){
                        if (response.status >= 200 && response.status < 300) {
                            return response.json();
                        } else {
                            reject("列印發票訊息異常 通訊狀態碼：" + response.status);
                        }
                    })
                    .then(function(json) {
                        //console.log(JSON.stringify(json, null, 2));
                        //console.log("GWIV003/REPLY: " + moment().format());

                        let status = json.hasOwnProperty('status')? json.status :"訊息內容異常";
                        //console.log("status:" + status);

                        if (status !== 0x9000) {
                            if(json.hasOwnProperty('message')){
                                reject("列印發票交易失敗：" + json.message);
                            }else{
                                reject("列印發票交易失敗：" + status);
                            }

                        }

                        resolve(json);
                    })
                    .catch(function(error) {
                        console.error('列印發票失敗 catch: ' + error);
                        reject(error);
                    });



            } catch (e) {
                console.error("RPT/ printInvoice Error:" + e);
                reject("printInvoice err:" + e);
            }
        });


    }


    /*
    三聯式發票作廢
    因為不需要，不會有任何實作。
     */
    revoke(inData) {
        const me = this;
        return new Promise((resolve, reject) => {
            try {

                resolve({status: 0x9000});
            } catch (e) {
                console.error("RPT/ revoke Error:" + e);
                reject("revoke err:" + e);
            }
        });
    }

}

/*
    電子發票
 */
class EVPrinter extends APrinter {



    getGatewayURL() {
        return "https://".concat(this.domainname).concat(":").concat(this.gwport).concat("/antnex/gwdevice");
    }

    getGatewayEVURL() {
        return "https://".concat(this.domainname).concat(":").concat(this.gwport).concat("/antnex/mirle");
    }

    /**
     * 電子發票列印測試
     * @returns {Promise<unknown>}
     */
    printTest() {
        const me = this;
        console.log("EVPrinter/ printTest");

        return new Promise((resolve, reject) => {
            try{



                if(me.isEmpty(me.companycode)) reject("公司代碼 不得為空");
                if(me.isEmpty(me.branchcode)) reject("分店代碼 不得為空");
                if(me.isEmpty(me.domainname)) reject("閘道域名 不得為空");


                let requestData = {
                    txcode: "MIRLE001",
                    companycode: me.companycode,
                    storecode: me.branchcode,
                    machinecode: "123456",
                    machinename: "123456",
                    membercode: "A0001",
                    billcode: "SL202012240195",
                    data: []
                };

                let requestString = JSON.stringify(requestData);
                //console.log(JSON.stringify(requestData, null, 2));

                let d = new Date();
                let url = me.getGatewayEVURL().concat("?_dc=" + d.getTime());
                console.log("printTest/URL: " + url);

                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    body: requestString,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/json'
                    }
                })
                    .then(function(response){
                        if (response.status >= 200 && response.status < 300) {
                            return response.json();
                        } else {
                            reject("訊息異常 通訊狀態碼：" + response.status);
                        }
                    })
                    .then(function(json) {
                        //console.log(JSON.stringify(json, null, 2));

                        let status = json.hasOwnProperty('status')? json.status :"訊息內容異常";
                        //console.log("status:" + status);

                        if (status !== 0x9000) {
                            if(json.hasOwnProperty('message')){
                                reject("交易失敗：" + json.message);
                            }else{
                                reject("交易失敗：" + status);
                            }

                        }

                        resolve(json);
                    })
                    .catch(function(error) {
                        console.error('RPT 交易失敗 catch: ' + error);
                        reject(error);
                    });



            } catch (e) {
                console.error("RPT/ printTest Error:" + e);
                reject("printTest err:" + e);
            }
        });


    }



    /**
     * 列印電子發票
     * @param ivdata 開立發票資料
     * @returns {Promise<unknown>} 回傳列印張數與狀態資訊
     */
    printInvoice(ivdata) {
        const me = this;
        return new Promise((resolve, reject) => {
            try{


                if(me.isEmpty(me.companycode)) reject("公司代碼 不得為空");
                if(me.isEmpty(me.branchcode)) reject("分店代碼 不得為空");
                if(me.isEmpty(me.domainname)) reject("閘道域名 不得為空");
                if(me.isEmpty(ivdata.invoiceno)) reject("發票號碼 不得為空");

                let requestData = {
                    txcode: "MIRLE002",
                    ivtype: "C0401",
                    sellerid: ivdata.sellerid,
                    posid: ivdata.posid,
                    companycode: me.companycode,
                    storecode: me.branchcode,
                    machinecode: ivdata.machinecode,
                    machinename: ivdata.machinename,
                    membercode: ivdata.membercode,
                    billcode: ivdata.billcode,
                    invoiceno: ivdata.invoiceno,
                    ivrcode: ivdata.ivrcode,
                    data: ivdata.data
                };

                let requestString = JSON.stringify(requestData);
                console.log("requestString: " + JSON.stringify(requestData, null, 2));

                let d = new Date();
                let url = this.getGatewayEVURL().concat("?_dc=" + d.getTime());
                console.log("printInvoice/URL: " + url);
                //console.log("GWIV003/SEND: " + moment().format());

                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    body: requestString,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/json'
                    }
                })
                    .then(function(response){
                        if (response.status >= 200 && response.status < 300) {
                            return response.json();
                        } else {
                            reject("列印發票訊息異常 通訊狀態碼：" + response.status);
                        }
                    })
                    .then(function(json) {
                        console.log("json return: ")
                        console.log(JSON.stringify(json, null, 2));
                        //console.log("GWIV003/REPLY: " + moment().format());

                        let status = json.hasOwnProperty('status')? json.status :"訊息內容異常";
                        //console.log("status:" + status);

                        if (status !== 0x9000) {
                            if(json.hasOwnProperty('message')){
                                reject("列印發票交易失敗：" + json.message);
                            }else{
                                reject("列印發票交易失敗：" + status);
                            }

                        }

                        resolve(json);
                    })
                    .catch(function(error) {
                        console.error('列印發票失敗 catch: ' + error);
                        reject(error);
                    });



            } catch (e) {
                console.error("RPT/ printInvoice Error:" + e);
                reject("printInvoice err:" + e);
            }
        });


    }

    /*
    電子發票作廢
     */
    revoke(ivdata) {
        const me = this;
        return new Promise((resolve, reject) => {
            try {

                if(me.isEmpty(me.companycode)) reject("公司代碼 不得為空");
                if(me.isEmpty(me.branchcode)) reject("分店代碼 不得為空");
                if(me.isEmpty(me.domainname)) reject("閘道域名 不得為空");

                let requestData = {
                    txcode: "MIRLE002",
                    ivtype: "C0501",
                    sellerid: ivdata.sellerid,
                    posid: ivdata.posid,
                    companycode: me.companycode,
                    storecode: me.branchcode,
                    machinecode: ivdata.machinecode,
                    machinename: ivdata.machinename,
                    membercode: ivdata.membercode,
                    billcode: ivdata.billcode,
                    invoiceno: ivdata.invoiceno,
                    data: ivdata.data
                };

                let requestString = JSON.stringify(requestData);
                //console.log(JSON.stringify(requestData, null, 2));

                let d = new Date();
                let url = this.getGatewayEVURL().concat("?_dc=" + d.getTime());
                console.log("revoke/URL: " + url);
                //console.log("GWIV003/SEND: " + moment().format());

                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    body: requestString,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/json'
                    }
                })
                    .then(function(response){
                        if (response.status >= 200 && response.status < 300) {
                            return response.json();
                        } else {
                            reject("作廢發票訊息異常 通訊狀態碼：" + response.status);
                        }
                    })
                    .then(function(json) {
                        //console.log(JSON.stringify(json, null, 2));
                        //console.log("GWIV003/REPLY: " + moment().format());

                        let status = json.hasOwnProperty('status')? json.status :"訊息內容異常";
                        //console.log("status:" + status);

                        if (status !== 0x9000) {
                            if(json.hasOwnProperty('message')){
                                reject("作廢發票交易失敗：" + json.message);
                            }else{
                                reject("作廢發票交易失敗：" + status);
                            }

                        }

                        resolve(json);
                    })
                    .catch(function(error) {
                        console.error('作廢發票失敗 catch: ' + error);
                        reject(error);
                    });

            } catch (e) {
                console.error("RPT/ revoke Error:" + e);
                reject("revoke err:" + e);
            }
        });
    }

    /*
    賣方開立折讓單
     */
    creditNote(ivdata) {
        const me = this;
        return new Promise((resolve, reject) => {
            try {

                if(me.isEmpty(me.companycode)) reject("公司代碼 不得為空");
                if(me.isEmpty(me.branchcode)) reject("分店代碼 不得為空");
                if(me.isEmpty(me.domainname)) reject("閘道域名 不得為空");

                let requestData = {
                    txcode: "MIRLE002",
                    ivtype: "D0401",
                    sellerid: ivdata.sellerid,
                    posid: ivdata.posid,
                    companycode: me.companycode,
                    storecode: me.branchcode,
                    machinecode: ivdata.machinecode,
                    machinename: ivdata.machinename,
                    membercode: ivdata.membercode,
                    billcode: ivdata.billcode,
                    invoiceno: ivdata.invoiceno,
                    data: ivdata.data
                };

                let requestString = JSON.stringify(requestData);
                //console.log(JSON.stringify(requestData, null, 2));

                let d = new Date();
                let url = this.getGatewayEVURL().concat("?_dc=" + d.getTime());
                console.log("revoke/URL: " + url);
                //console.log("GWIV003/SEND: " + moment().format());

                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    body: requestString,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/json'
                    }
                })
                    .then(function(response){
                        if (response.status >= 200 && response.status < 300) {
                            return response.json();
                        } else {
                            reject("作廢發票訊息異常 通訊狀態碼：" + response.status);
                        }
                    })
                    .then(function(json) {
                        //console.log(JSON.stringify(json, null, 2));
                        //console.log("GWIV003/REPLY: " + moment().format());

                        let status = json.hasOwnProperty('status')? json.status :"訊息內容異常";
                        //console.log("status:" + status);

                        if (status !== 0x9000) {
                            if(json.hasOwnProperty('message')){
                                reject("作廢發票交易失敗：" + json.message);
                            }else{
                                reject("作廢發票交易失敗：" + status);
                            }

                        }

                        resolve(json);
                    })
                    .catch(function(error) {
                        console.error('作廢發票失敗 catch: ' + error);
                        reject(error);
                    });

            } catch (e) {
                console.error("RPT/ revoke Error:" + e);
                reject("revoke err:" + e);
            }
        });
    }



    /*
    作廢賣方開立折讓單
     */
    revokeCreditNote(ivdata) {
        const me = this;
        return new Promise((resolve, reject) => {
            try {

                if(me.isEmpty(me.companycode)) reject("公司代碼 不得為空");
                if(me.isEmpty(me.branchcode)) reject("分店代碼 不得為空");
                if(me.isEmpty(me.domainname)) reject("閘道域名 不得為空");

                let requestData = {
                    txcode: "MIRLE002",
                    ivtype: "D0501",
                    sellerid: ivdata.sellerid,
                    posid: ivdata.posid,
                    companycode: me.companycode,
                    storecode: me.branchcode,
                    machinecode: ivdata.machinecode,
                    machinename: ivdata.machinename,
                    membercode: ivdata.membercode,
                    billcode: ivdata.billcode,
                    invoiceno: ivdata.invoiceno,
                    data: ivdata.data
                };

                let requestString = JSON.stringify(requestData);
                //console.log(JSON.stringify(requestData, null, 2));

                let d = new Date();
                let url = this.getGatewayEVURL().concat("?_dc=" + d.getTime());
                console.log("revokeCreditNote/URL: " + url);

                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    body: requestString,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Accept': 'application/json'
                    }
                })
                    .then(function(response){
                        if (response.status >= 200 && response.status < 300) {
                            return response.json();
                        } else {
                            reject("作廢賣方開立折讓單訊息異常 通訊狀態碼：" + response.status);
                        }
                    })
                    .then(function(json) {
                        //console.log(JSON.stringify(json, null, 2));
                        //console.log("GWIV003/REPLY: " + moment().format());

                        let status = json.hasOwnProperty('status')? json.status :"訊息內容異常";
                        //console.log("status:" + status);

                        if (status !== 0x9000) {
                            if(json.hasOwnProperty('message')){
                                reject("作廢賣方開立折讓單交易失敗：" + json.message);
                            }else{
                                reject("作廢賣方開立折讓單交易失敗：" + status);
                            }

                        }

                        resolve(json);
                    })
                    .catch(function(error) {
                        console.error('作廢賣方開立折讓單失敗 catch: ' + error);
                        reject(error);
                    });

            } catch (e) {
                console.error("RPT/ revokeCreditNote Error:" + e);
                reject("revokeCreditNote err:" + e);
            }
        });
    }

}


/*

function testRPT() {
    try{
        //console.log("testRPT entry");

        let rptManager = new RPTManager("ant", "S00001");
        //console.log("Version: " + rptManager.toString());

        rptManager.findGateway("ant", "S00001")
            .then(function(json){
                // 獲取閘道的域名位址
                //console.log("findGateway: \n" + JSON.stringify(json, null, 2));
                let domainname = json.domainname;
                console.log("閘道位址: " + domainname);
                rptManager.domainname = domainname;

                if(S(domainname).isEmpty()) {
                    console.error("查無配置閘道");
                    return;
                }

                rptManager.checkGWDevice(domainname, "ant", "S00001", 4)
                    .then(function(json){
                        //console.log("checkGWDevice: \n" + JSON.stringify(json, null, 2));
                        let prnuuid = json.printerprofile.prnuuid;
                        console.log("發票機: " + prnuuid + " 狀態: " +  json.printerstatus);

                        if(json.printerstatus !== 1) {
                            console.error("無發票機");
                            return;
                        }

                        let ivdata = {
                            "companycode": "ant",
                            "storecode": "S00001",
                            "machinecode": "A001",
                            "machinename": "",
                            "membercode": "",
                            "billcode": "",
                            "data": []
                        };

                        rptManager.printTest(domainname, prnuuid, ivdata)
                            .then(function(json){
                                //console.log("printTest: \n" + JSON.stringify(json, null, 2));
                                console.log("page: " + json.pages + " 狀態: " + json.message);
                            })
                            .catch(function(error) {
                                console.error('printTest 失敗: ' + error);
                            });

                    })
                    .catch(function(error) {
                        console.error('checkGWDevice 失敗: ' + error);
                    });


            })
            .catch(function(error) {
                console.error('findGateway 失敗: ' + error);
            });


        //console.log("testRPT exit");
    }catch(err){
        console.error(err);
    }
}

function testRPTInvoice() {
    try{
        //console.log("testRPT entry");

        let rptManager = new RPTManager("ant", "S00001");
        //console.log("Version: " + rptManager.toString());

        rptManager.findGateway("ant", "S00001")
            .then(function(json){
                // 獲取閘道的域名位址
                //console.log("findGateway: \n" + JSON.stringify(json, null, 2));
                let domainname = json.domainname;
                console.log("閘道位址: " + domainname);
                rptManager.domainname = domainname;

                if(S(domainname).isEmpty()) {
                    console.error("查無配置閘道");
                    return;
                }

                rptManager.checkGWDevice(domainname, "ant", "S00001", 4)
                    .then(function(json){
                        //console.log("checkGWDevice: \n" + JSON.stringify(json, null, 2));
                        let prnuuid = json.printerprofile.prnuuid;
                        console.log("發票機: " + prnuuid + " 狀態: " +  json.printerstatus);

                        if(json.printerstatus !== 1) {
                            console.error("無發票機");
                            return;
                        }

                        let ivdata = {
                            companycode: "ant",
                            storecode: "S00001",
                            machinecode: "A001",
                            machinename: "A001",
                            membercode: "ANT1001",
                            billcode: "SL202012240195",
                            data:
                                {
                                    "invoiceno": "AB12345678",
                                    "duplicate": 0,
                                    "head": {
                                        "storename": "螞蟻互動發票列印測試",
                                        "storeaddr": "螞蟻市第一洞一巷1號",
                                        "taxno": "12345678",
                                        "tel": "03-1234567",
                                        "ivdate": "109-12-31",
                                        "ivtime": "10:30:00",
                                        "terminal": "0123456",
                                        "customername": "81234567",
                                        "customertaxcode": "81234567",
                                        "cardno": "4145-XXXX-XXXX-1234"
                                    },
                                    "items": [
                                        {"price": 99, "qty": 12, "total": 1188, "name": "1壹貳三肆伍陸柒捌玖拾"},
                                        {"price": 29900, "qty": 1, "total": 29900, "name": "2壹貳三肆伍陸柒捌玖拾"},
                                        {"price": 1230, "qty": 1, "total": 1230, "name": "3壹貳三肆伍陸柒捌玖拾"}
                                    ],
                                    "footer": {
                                        "ivamount": 61228,
                                        "ivtax": 3061,
                                        "ivtotal": 64289
                                    }
                                }
                        };

                        rptManager.printInvoice(domainname, prnuuid, ivdata)
                            .then(function(json){
                                //console.log("printTest: \n" + JSON.stringify(json, null, 2));
                                console.log("page: " + json.pages + " 狀態: " + json.message);
                            })
                            .catch(function(error) {
                                console.error('printInvoice 失敗: ' + error);
                            });

                    })
                    .catch(function(error) {
                        console.error('checkGWDevice 失敗: ' + error);
                    });


            })
            .catch(function(error) {
                console.error('findGateway 失敗: ' + error);
            });


        //console.log("testRPT exit");
    }catch(err){
        console.error(err);
    }
}

function testPrintTest() {
    try{
        console.log("test entry");

        let rptManager = new RPTManager("ant", "S00001");

        rptManager.isReady()
            .then(function(n){
                console.log("isReady");

                console.log("domainname= " + rptManager.domainname);

                let printer = rptManager.createPrinter(4);
                printer.isReady()
                    .then(function(prnuuid){
                        //console.log("prnuuid: " + prnuuid);
                        console.log("發票機: " + prnuuid);

                        printer.printTest()
                            .then(function(json){
                                //console.log(JSON.stringify(json, null, 2));
                                console.log("page: " + json.pages + " 狀態: " + json.message);
                            })
                            .catch(function(error) {
                                console.error('列印失敗: ' + error);
                            });
                    })
                    .catch(function(error) {
                        console.error('printer 初始化失敗: ' + error);
                    });

            })
            .catch(function(error) {
                console.error('RPTManager 初始化失敗: ' + error);
            });


    }catch(err){
        console.error("testSyncFindGateway err: " + err);
    }
}



function testPrintInvoice() {
    try{
        console.log("test entry");

        let rptManager = new RPTManager("ant", "S00001");

        rptManager.isReady()
            .then(function(n){
                console.log("isReady");

                console.log("domainname= " + rptManager.domainname);

                let printer = rptManager.createPrinter(4);
                printer.isReady()
                    .then(function(prnuuid){
                        console.log("發票機: " + prnuuid);


                        let ivdata = {
                            companycode: "ant",
                            storecode: "S00001",
                            machinecode: "A001",
                            machinename: "A001",
                            membercode: "ANT1001",
                            billcode: "SL202012240195",
                            data:
                                {
                                    "invoiceno": "AB12345678",
                                    "duplicate": 0,
                                    "head": {
                                        "storename": "螞蟻互動發票列印測試",
                                        "storeaddr": "螞蟻市第一洞一巷1號",
                                        "taxno": "12345678",
                                        "tel": "03-1234567",
                                        "ivdate": "109-12-31",
                                        "ivtime": "10:30:00",
                                        "terminal": "0123456",
                                        "customername": "81234567",
                                        "customertaxcode": "81234567",
                                        "cardno": "4145-XXXX-XXXX-1234"
                                    },
                                    "items": [
                                        {"price": 99, "qty": 12, "total": 1188, "name": "1壹貳三肆伍陸柒捌玖拾"},
                                        {"price": 29900, "qty": 1, "total": 29900, "name": "2壹貳三肆伍陸柒捌玖拾"},
                                        {"price": 1230, "qty": 1, "total": 1230, "name": "3壹貳三肆伍陸柒捌玖拾"}
                                    ],
                                    "footer": {
                                        "ivamount": 61228,
                                        "ivtax": 3061,
                                        "ivtotal": 64289
                                    }
                                }
                        };

                        printer.printInvoice(ivdata)
                            .then(function(json){
                                //console.log(JSON.stringify(json, null, 2));
                                console.log("page: " + json.pages + " 狀態: " + json.message);
                            })
                            .catch(function(error) {
                                console.error('列印失敗: ' + error);
                            });
                    })
                    .catch(function(error) {
                        console.error('printer 初始化失敗: ' + error);
                    });

            })
            .catch(function(error) {
                console.error('RPTManager 初始化失敗: ' + error);
            });


    }catch(err){
        console.error("testSyncFindGateway err: " + err);
    }
}

*/
