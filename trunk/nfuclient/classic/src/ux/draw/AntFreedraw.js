Ext.define('antnex.ux.draw.AntFreedraw', {
    extend: 'Ext.draw.Container',
    alias: 'widget.antFreedraw',

    requires: [
        'Ext.draw.Component',
    ],

    anchor: '100%',
    height: 50,

    bodyStyle: { "background": "#FFFFFF" },

    sprite: undefined,
    lastEventX: undefined,
    lastEventY: undefined,
    list: [],
    lineWidth: 10,
    lineColor: new Ext.util.Color(0, 0, 0),

    // 判斷並回傳滑鼠移動距離
    smoothList: function (points) {
        if (points.length < 3) {
            return ['M', points[0], points[1]];
        }

        let dx = [], dy = [], result = ['M'],
            i, ln = points.length;

        for (i = 0; i < ln; i += 2) {
            dx.push(points[i]);
            dy.push(points[i + 1]);
        }

        dx = Ext.draw.Draw.spline(dx);
        dy = Ext.draw.Draw.spline(dy);
        result.push(dx[0], dy[0], 'C');

        for (i = 1, ln = dx.length; i < ln; i++) {
            result.push(dx[i], dy[i]);
        }

        return result;
    },

    // 滑鼠事件觸發
    constructor: function () {
        let me = this;

        me.callParent(arguments);

        me.on({
            element: 'element',
            mousedown: 'onMouseDown',
            mousemove: 'onMouseMove',
            mouseup: 'onMouseUp',
            mouseleave: 'onMouseUp',
            scope: me
        });
    },

    // 滑鼠按下
    onMouseDown: function (e) {
        let targetElement = this,
            me = Ext.getCmp(targetElement.id),
            surface = me.getSurface(),
            xy, x, y;

        if (!me.sprite) {
            xy = surface.getEventXY(e);
            x = xy[0];
            y = xy[1];

            me.list = [x, y, x, y];
            me.lastEventX = x;
            me.lastEventY = y;

            me.sprite = surface.add({
                type: 'path',
                path: ['M', me.list[0], me.list[1], 'L', me.list[0] + 1e-1, me.list[1] + 1e-1],
                lineWidth: me.lineWidth,
                // lineWidth: 30 * Math.random() + 10,
                lineCap: 'round',
                lineJoin: 'round',
                strokeStyle: me.lineColor,
                // strokeStyle: new Ext.util.Color(Math.random() * 127 + 128, Math.random() * 127 + 128, Math.random() * 127 + 128)
            });
            surface.renderFrame();
        }
    },

    // 滑鼠移動
    onMouseMove: function (e) {
        let targetElement = this,
            me = Ext.getCmp(targetElement.id),
            surface = me.getSurface(),
            path, xy, x, y, dx, dy, D;

        if (me.sprite) {
            xy = surface.getEventXY(e);
            x = xy[0];
            y = xy[1];
            dx = me.lastEventX - x;
            dy = me.lastEventY - y;
            D = 10;

            if (dx * dx + dy * dy < D * D) {
                me.list.length -= 2;
                me.list.push(x, y);
            } else {
                me.list.length -= 2;
                me.list.push(me.lastEventX = x, me.lastEventY = y);
                me.list.push(me.lastEventX + 1, me.lastEventY + 1);
            }

            path = this.smoothList(me.list);

            me.sprite.setAttributes({
                path: path
            });
            if (Ext.os.is.Android) {
                Ext.draw.Animator.schedule(function () {
                    surface.renderFrame();
                }, me);
            } else {
                surface.renderFrame();
            }
        }
    },

    // 滑鼠彈起
    onMouseUp: function (e) {
        let targetElement = this,
            me = Ext.getCmp(targetElement.id);

        me.sprite = null;
    },

    onResize: function () {
        let size = this.element.getSize();

        this.getSurface().setRect([0, 0, size.width, size.height]);
        this.renderFrame();
    }

});