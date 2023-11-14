Ext.define("antnex.subsystem.41141153.main.main", {
  extend: "antnex.default.defaultView",
  requires: ["antnex.subsystem.41141153.main.mainController"],
  alias: "widget.page-41141153-main",
  controller: "page-41141153-main",
  title: "user management",

  items: [
    {
      margin: "0 0 10 0",
      layout: {
        xtype: "hbox",
        align: "stretch",
      },
      xtype: "panel",
      dock: "top",
      items: [
        {
          xtype: "toolbar",
          layout: {
            type: "hbox",
            align: "stretch",
          },
          items: [
            {
              xtype: "button",
              text: "查詢列",
            },
            {
              xtype: "button",
              text: "新增",
            },
            {
              xtype: "button",
              text: "修改",
            },
            {
              xtype: "button",
              text: "儲存",
            },
            {
              xtype: "button",
              text: "取消",
            },
          ],
        },
      ],
      items: [
        {
          margin: "0 0 10 0",
          xtype: "panel",
          items: [
            {
              xtype: "fieldset",
              title: "查詢條件",
              items: [
                {
                  xtype: "textfield",
                  fieldLabel: "學號",
                  emptyText: "請輸入學號",
                },
                {
                  xtype: "textfield",
                  fieldLabel: "姓名",
                  emptyText: "請輸入姓名",
                },
                {
                  xtype: "combobox",
                  fieldLabel: "狀態",
                },
                {
                  xtype: "button",
                  text: "查詢",
                },
                {
                  xtype: "button",
                  text: "取消",
                },
              ],
            },
          ],
        },
      ],
      items: [
        {
          margin: "0 0 10 0",
          xtype: "panel",
          items: [
            {
              xtype: "gridpanel",
              title: "使用者清單",
              columns: [
                {
                  xtype: "rownumberer",
                  align: "center",
                  width: 50,
                },
                {
                  dataIndex: "code",
                  text: "學號",
                  width: 110,
                },
                {
                  dataIndex: "name",
                  text: "姓名",
                  width: 110,
                },
                {
                  dataIndex: "mail",
                  text: "信箱",
                  minWidth: 96,
                  flex: 1,
                },
                {
                  dataIndex: "status",
                  text: "狀態",
                  width: 96,
                },
              ],
            },
            {
              xtype: "fieldset",
              title: "基本資料",
              items: [
                {
                  items: [
                    {
                      xtype: "textfield",
                      fieldLabel: "學號",
                      labelWidth: 37,
                    },
                    {
                      xtype: "textfield",
                      fieldLabel: "姓名",
                      labelWidth: 37,
                    },
                    {
                      xtype: "textfield",
                      fieldLabel: "信箱",
                      labelWidth: 37,
                    },
                    {
                      xtype: "textfield",
                      fieldLabel: "狀態",
                      labelWidth: 37,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
