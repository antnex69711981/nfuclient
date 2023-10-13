Ext.define('antnex.services.URLService', {
    alternateClassName: ['URLService'],
    singleton: true,
    constructor: function (config) {
        this.initConfig(config);
        return this;
    },

    getServletURL: function (type, iid) {
        var me = this;
        try {
            var url = "";
            var host = antnex.AppDefaults.getServleturl();

            switch (type) {
                case "goodimage":
                    url = `${host}/image?t=goodimage&iid=${iid}`;
                    break;
                default:
                    throw `「${type}」未定義`;
            }

            return url;
        } catch (e) {
            console.error("GoodNameConvert getServletURL Error: " + e);
        }
    }
});
