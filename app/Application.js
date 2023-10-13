/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('antnex.Application', {
    extend: 'Ext.app.Application',

    name: 'antnex',

    defaultToken: 'home',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    controllers: [

    ],
    stores: [

    ],
    init: function () {
        try {
            if (Ext.manifest.profile == 'classic') {
                Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
                    expires: new Date(Ext.Date.now()) + (1000 * 60 * 3) //3分鐘
                }));
            }
        } catch (e) {
            logger.error('Application/ init error:' + e);
        }
    },

    isDesktop: function () {
        return Ext.os.deviceType;
    },
    launch: function () {
        //console.log('launch');
        try {
            let title = 'CEP';
            window.document.title = title;

            // modern沒有, 需確認
            if (Ext.manifest.profile == 'classic') {
                Ext.tip.QuickTipManager.init();

                Ext.state.Manager.setProvider(
                    Ext.create('Ext.state.LocalStorageProvider')
                );
            }

            deviceType = Ext.os.deviceType;
            deviceOS = Ext.os.name;
            //logger.debug(`Device: ${deviceType}`);
            //logger.debug(`OS: ${deviceOS}`);
            logger.debug('VERSION: ' + Ext.manifest.version);


            // 初始設定
            switch (CONST_SYS_MODE) {
                case 1: // 正式機
                    antnex.AppDefaults.setModename('');
                    antnex.AppDefaults.setDevelopment(false);
                    window.document.title = title;
                    break;

                case 9: // 測試機
                    antnex.AppDefaults.setModename(' - 測試版');
                    antnex.AppDefaults.setDevelopment(true);
                    window.document.title = title + ' - 測試版';
                    break;


                case 0: // local 開發機/NODE 部署使用
                    antnex.AppDefaults.setModename(' - 本地端測試版');
                    antnex.AppDefaults.setDevelopment(true);
                    window.document.title = title + ' - 本地端測試版';
                    // window.document.title = 'AntPOS管理系統-本地端測試版';
                    break;
            }

            antnex.AppDefaults.initappinfo();
            logger.debug('ServerHost Name:' + antnex.AppDefaults.getServerhost());
            logger.debug('APIServer Name:' + antnex.AppDefaults.getWebapp());


            //antnex.AppDefaults.doColdStart();

            // 設備Profile 初始化
            /*
            if (!Ext.state.Manager.get(SYS_DATA_DEVICE_PROFILE)) {
                Ext.state.Manager.set(SYS_DATA_DEVICE_PROFILE, {
                    deviceid: '',
                    machineType: 0,
                    machineSerial: 0,
                    machineCode: '',
                    machineName: '',
                    machineCaption: '',
                    security: 0,
                    companyCode: '',
                    branchcode: '',
                    commKey: '',
                    devicetoken: '',
                    settings: {}
                });

            }*/

            //let dp = Ext.state.Manager.get('deviceprofile');
            //console.table(dp);

            // 建立設備檔案
            //antnex.AppDefaults.doColdStart();
            //antnex.AppDefaults.buildDeviceprofile();
            //console.table(antnex.AppDefaults.getDeviceprofile());

            // UserProfile 初始化
            /*
            if (!Ext.state.Manager.get(SYS_DATA_USER_PROFILE)) {
                Ext.state.Manager.set(SYS_DATA_USER_PROFILE, {
                    employee: '',
                    employeeid: 0,
                    branchname: '',
                    branchcode: '',
                    roleid: 0,
                    rolename: '',
                    type: '',
                    functions: [],
                    settings: {}
                });

            }*/

            //let up = Ext.state.Manager.get('userprofile');
            //console.table(up);

            // 建立用戶檔案
            //console.table(antnex.AppDefaults.getUserprofile());

            /*
                        if (!Ext.state.Manager.get(SYS_DATA_APP_SETTING)) {
                            Ext.state.Manager.set(SYS_DATA_APP_SETTING, {
                                version: Ext.manifest.version
                            });

                        } else {
                            Ext.state.Manager.set(SYS_DATA_APP_SETTING, {
                                version: Ext.manifest.version
                            });
                        }*/

            //logger.debug('version: ' + Ext.manifest.version);
            /*
                  if (antnex.AppTool.isWindowCryptoPresent()) {
                    //logger.info('Cryptography API Supported');
                    let masterkey = antnex.AppDefaults.getMasterkey();
                    let message = '12345678';
                    console.log('masterkey:' + masterkey);
                    d = antnex.AppTool.encryptTripleDES(message, masterkey);
                    console.log('d[encrypt]:' + antnex.AppTool.stringifyHex(d));


                    let e = antnex.AppTool.decryptTripleDES(d, masterkey);
                    message = antnex.AppTool.stringifyUTF8(e)
                    console.log('decrypt:' + message);

                  } else {
                    logger.warn('Cryptography API not Supported');
                  }
            */



            if (!antnex.AppDefaults.getDevelopment()) {
                window.onbeforeunload = function (event) {
                    let message = '注意!!!你正要離開或關閉瀏覽器，請確認。';
                    if (typeof event == 'undefined') {
                        event = window.event;
                    }
                    event = event || window.event;

                    // For IE and Firefox prior to version 4
                    if (event) {
                        event.returnValue = message;
                    }

                    // For Safari
                    return message;
                }
            }


            //logger.debug('Security:' + antnex.AppDefaults.getSecurity());
            //logger.debug('Development:' + antnex.AppDefaults.getDevelopment());
            //logger.debug('companyCode:' + antnex.AppDefaults.getCompanycode());

            Ext.util.Format.thousandSeparator = ',';
            Ext.util.Format.decimalSeparator = '.';
            Ext.util.Format.currenyPrecision = 0;
            Ext.util.Format.currencySign = '$';

            // 清空資料
            //antnex.AppDefaults.clear();

            // 每次重起的基本資料初始化
            antnex.AppDefaults.doLogout

        } catch (e) {
            logger.error('Application/ launch error:' + e);
        }
    },

    onAppUpdate: function () {
        window.location.reload();
        // Ext.Msg.confirm('應用程式更新', '應用程式有最新版本, 立即更新。?',
        //     function(choice) {
        //         if (choice === 'yes') {
        //             window.location.reload();
        //         }
        //     }
        // );
    }
});
