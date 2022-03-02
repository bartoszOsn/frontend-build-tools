(() => {
    "use strict";
    var e = {
        657: (e, r) => {
            r.__esModule = !0, r.PI = void 0, r.PI = 22 / 7
        }, 798: (e, r, i) => {
            r.__esModule = !0, r.a = r.circleArea = void 0;
            var o = i(657);
            r.circleArea = function (e) {
                return e * e * o.PI
            }, r.default = function (e) {
                return 2 * o.PI * e
            }, r.a = 2;
            for (var a = 0; a < 10; a++) r.a = 2 * r.a
        }
    }, r = {};

    function i(o) {
        var a = r[o];
        if (void 0 !== a) return a.exports;
        var t = r[o] = {exports: {}};
        return e[o](t, t.exports, i), t.exports
    }

    (() => {
        var e = i(798), r = i(798), o = i(657);

        function a(i) {
            console.log("Area of circle with radius " + i + " is equal " + e.circleArea(i) + ", while PI ~= " + o.PI), console.log("Length of circle with radius " + i + " is equal " + r.default(i) + ", while PI ~= " + o.PI)
        }

        a(1), a(5), a(e.a)
    })()
})();
