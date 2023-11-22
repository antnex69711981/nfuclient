Ext.define("antnex.subsystem.sample.41141153.main.main", {
  extend: "antnex.default.defaultView",
  requires: ["antnex.subsystem.sample.41141153.main.mainController"],
  alias: "widget.page-41141153-main",
  controller: "page-41141153-main",

  title: "wei的首頁",

  layout: {
    type: "vbox",
    align: "stretch",
  },
  items: [
    {
      html: "wei",
      flex: 1,
    },
  ],
});
