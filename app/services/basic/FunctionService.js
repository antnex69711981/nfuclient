Ext.define('antnex.services.basic.FunctionService', {
    requires: [],

    constructor: function (config) {
        this.initConfig(config);
    },

    load: async function () {
        let me = this;
        try {
            let store = antnex.AppDefaults.getConfig('function');

            let functionList = [];

            const sampleList = [{
                parentcode: 'root',
                code: 'antSample',
                name: '範例頁面',
                xtype: '',
                iconcls: ''
            }, {
                parentcode: 'antSample',
                code: 'antSample-antStanley-main',
                name: 'Stanley-首頁',
                xtype: 'antStanley-main',
                iconcls: 'fas fa-bookmark'
            }, {
                parentcode: 'antSample',
                code: 'antSample-antKevin-main',
                name: 'Kevin-首頁',
                xtype: 'antKevin-main',
                iconcls: 'fas fa-bookmark'
            }, {
                parentcode: 'antSample',
                code: 'antSample-antTony-main',
                name: 'Tony-首頁',
                xtype: 'antTony-main',
                iconcls: 'fas fa-bookmark'
            }, {
                parentcode: 'antSample',
                code: 'antSample-antStanley-user',
                name: '使用者管理1',
                xtype: 'antStanley-user',
                iconcls: 'fas fa-user-edit'
            }, {
                parentcode: 'antSample',
                code: 'antSample-antStanley-user2',
                name: '使用者管理2',
                xtype: 'antStanley-user2',
                iconcls: 'fas fa-user-edit'
            }]

            let pageList = []

            const userList = [
                { code: '40141152', name: '鄭凱文' },
                { code: '40541124', name: '李厚生' },
                {
                    code: '11261103', name: '劉宜欣',
                    projects: [{
                        xtype: 'projectdetail',
                        name: '專案銷售明細表'
                    }]
                },
                { code: '11261119', name: '陳奕潔' },
                {
                    code: '40941137', name: '陳朝羿',
                    projects: [{
                        xtype: 'dailyreport',
                        name: '工作日報表'
                    }]
                },
                {
                    code: '40941139', name: '陳嘉笙',
                    projects: [{
                        xtype: 'profitstats',
                        name: '毛利統計表'
                    }]
                },
                { code: '41041115', name: '成政軒' },
                { code: '41041116', name: '李嘉祥' },
                { code: '41041118', name: '李頡蔚' },
                { code: '41041120', name: '周易增' },
                { code: '41041124', name: '林裕翔' },
                { code: '41041125', name: '紀柏均' },
                { code: '41041126', name: '胡杰宏' },
                { code: '41041127', name: '徐韶毅' },
                { code: '41041129', name: '張凱勛' },
                { code: '41041135', name: '陳建華' },
                { code: '41041145', name: '劉家齊' },
                { code: '41041151', name: '簡名均' },
                { code: '41041156', name: '李沅儒' },
                { code: '41041201', name: '吳怡臻' },
                { code: '41041212', name: '潘子茵' },
                { code: '41041411', name: '林建華' },
                { code: '41141114', name: '王彥雄' },
                { code: '41141119', name: '吳承恩' },
                { code: '41141127', name: '周譽儒' },
                { code: '41141132', name: '張智翔' },
                { code: '41141136', name: '陳俊伍' },
                { code: '41141141', name: '楊旻倫' },
                { code: '41141153', name: '陳冠維' },
                { code: '41241213', name: '林政廷' },
                { code: '41241216', name: '張恩宇' },
                { code: '41241219', name: '陳琨璋' },
                { code: '41241224', name: '謝曜鴻' },
            ];
            userList.forEach(user => {
                const usercode = user.code;
                const username = user.name;

                const rootNode = {
                    parentcode: 'root',
                    code: `${usercode}-home`,
                    name: `${username}(${usercode})`,
                    xtype: '',
                    iconcls: ''
                }

                const mainPage = {
                    parentcode: rootNode.code,
                    code: `${rootNode.code}-main`,
                    name: `${username}-首頁`,
                    xtype: `page-${usercode}-main`,
                    iconcls: 'fas fa-bookmark'
                }

                const userPage = {
                    parentcode: rootNode.code,
                    code: `${rootNode.code}-user`,
                    name: `${username}-使用者管理`,
                    xtype: `page-${usercode}-user`,
                    iconcls: 'fas fa-user-edit'
                }

                pageList.push(rootNode);
                pageList.push(mainPage);
                pageList.push(userPage);

                if (user.projects) {
                    user.projects.forEach(e => {
                        const item = {
                            parentcode: rootNode.code,
                            code: e.xtype,
                            name: e.name,
                            xtype: e.xtype,
                            iconcls: ''
                        }
                        pageList.push(item);
                    });
                }
            })

            functionList = functionList.concat(sampleList);
            functionList = functionList.concat(pageList);

            store.loadData(functionList);

        } catch (e) {
            me.showError('FunctionService/ load error:', e);
        }
    },

    showMessage: function (message) {
        Ext.Msg.alert("異常通知", message);
    },
    showError: function (path, message) {
        this.showMessage(message);
        console.log(path + message)
    }
});
