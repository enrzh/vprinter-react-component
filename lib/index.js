import { i as e, n as t, r as n, t as r } from "./chunks/printerMarkup.js";
import { n as i, t as a } from "./chunks/simpleTicket.js";
import { forwardRef as o, useEffect as s, useId as c, useImperativeHandle as l, useLayoutEffect as u, useMemo as d, useRef as f, useState as p } from "react";
import { Fragment as m, jsx as h, jsxs as g } from "react/jsx-runtime";
//#region \0rolldown/runtime.js
var _ = Object.create, v = Object.defineProperty, y = Object.getOwnPropertyDescriptor, b = Object.getOwnPropertyNames, x = Object.getPrototypeOf, S = Object.prototype.hasOwnProperty, C = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), w = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = b(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !S.call(e, s) && s !== n && v(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = y(t, s)) || r.enumerable
	});
	return e;
}, T = (e, t, n) => (n = e == null ? {} : _(x(e)), w(t || !e || !e.__esModule || !S.call(e, "default") ? v(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), E = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	function t(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	e.default = function e(n, r) {
		t(this, e), this.data = n, this.text = r.text || n, this.options = r;
	};
})), ee = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.CODE39 = void 0;
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = r(E());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function a(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function o(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	var s = function(e) {
		o(n, e);
		function n(e, t) {
			return i(this, n), e = e.toUpperCase(), t.mod43 && (e += f(m(e))), a(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
		}
		return t(n, [{
			key: "encode",
			value: function() {
				for (var e = u("*"), t = 0; t < this.data.length; t++) e += u(this.data[t]) + "0";
				return e += u("*"), {
					data: e,
					text: this.text
				};
			}
		}, {
			key: "valid",
			value: function() {
				return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
			}
		}]), n;
	}(n.default), c = /* @__PURE__ */ "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%*".split(""), l = [
		20957,
		29783,
		23639,
		30485,
		20951,
		29813,
		23669,
		20855,
		29789,
		23645,
		29975,
		23831,
		30533,
		22295,
		30149,
		24005,
		21623,
		29981,
		23837,
		22301,
		30023,
		23879,
		30545,
		22343,
		30161,
		24017,
		21959,
		30065,
		23921,
		22385,
		29015,
		18263,
		29141,
		17879,
		29045,
		18293,
		17783,
		29021,
		18269,
		17477,
		17489,
		17681,
		20753,
		35770
	];
	function u(e) {
		return d(p(e));
	}
	function d(e) {
		return l[e].toString(2);
	}
	function f(e) {
		return c[e];
	}
	function p(e) {
		return c.indexOf(e);
	}
	function m(e) {
		for (var t = 0, n = 0; n < e.length; n++) t += p(e[n]);
		return t %= 43, t;
	}
	e.CODE39 = s;
})), D = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t;
	function n(e, t, n) {
		return t in e ? Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = n, e;
	}
	var r = e.SET_A = 0, i = e.SET_B = 1, a = e.SET_C = 2;
	e.SHIFT = 98;
	var o = e.START_A = 103, s = e.START_B = 104, c = e.START_C = 105;
	e.MODULO = 103, e.STOP = 106, e.FNC1 = 207, e.SET_BY_CODE = (t = {}, n(t, o, r), n(t, s, i), n(t, c, a), t), e.SWAP = {
		101: r,
		100: i,
		99: a
	}, e.A_START_CHAR = "Ð", e.B_START_CHAR = "Ñ", e.C_START_CHAR = "Ò", e.A_CHARS = "[\0-_È-Ï]", e.B_CHARS = "[ -È-Ï]", e.C_CHARS = "(Ï*[0-9]{2}Ï*)", e.BARS = [
		11011001100,
		11001101100,
		11001100110,
		10010011e3,
		10010001100,
		10001001100,
		10011001e3,
		10011000100,
		10001100100,
		11001001e3,
		11001000100,
		11000100100,
		10110011100,
		10011011100,
		10011001110,
		10111001100,
		10011101100,
		10011100110,
		11001110010,
		11001011100,
		11001001110,
		11011100100,
		11001110100,
		11101101110,
		11101001100,
		11100101100,
		11100100110,
		11101100100,
		11100110100,
		11100110010,
		11011011e3,
		11011000110,
		11000110110,
		10100011e3,
		10001011e3,
		10001000110,
		10110001e3,
		10001101e3,
		10001100010,
		11010001e3,
		11000101e3,
		11000100010,
		10110111e3,
		10110001110,
		10001101110,
		10111011e3,
		10111000110,
		10001110110,
		11101110110,
		11010001110,
		11000101110,
		11011101e3,
		11011100010,
		11011101110,
		11101011e3,
		11101000110,
		11100010110,
		11101101e3,
		11101100010,
		11100011010,
		11101111010,
		11001000010,
		11110001010,
		1010011e4,
		10100001100,
		1001011e4,
		10010000110,
		10000101100,
		10000100110,
		1011001e4,
		10110000100,
		1001101e4,
		10011000010,
		10000110100,
		10000110010,
		11000010010,
		1100101e4,
		11110111010,
		11000010100,
		10001111010,
		10100111100,
		10010111100,
		10010011110,
		10111100100,
		10011110100,
		10011110010,
		11110100100,
		11110010100,
		11110010010,
		11011011110,
		11011110110,
		11110110110,
		10101111e3,
		10100011110,
		10001011110,
		10111101e3,
		10111100010,
		11110101e3,
		11110100010,
		10111011110,
		10111101110,
		11101011110,
		11110101110,
		11010000100,
		1101001e4,
		11010011100,
		1100011101011
	];
})), te = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = i(E()), r = D();
	function i(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function a(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function o(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function s(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.default = function(e) {
		s(n, e);
		function n(e, t) {
			a(this, n);
			var r = o(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e.substring(1), t));
			return r.bytes = e.split("").map(function(e) {
				return e.charCodeAt(0);
			}), r;
		}
		return t(n, [
			{
				key: "valid",
				value: function() {
					return /^[\x00-\x7F\xC8-\xD3]+$/.test(this.data);
				}
			},
			{
				key: "encode",
				value: function() {
					var e = this.bytes, t = e.shift() - 105, i = r.SET_BY_CODE[t];
					if (i === void 0) throw RangeError("The encoding does not start with a start character.");
					this.shouldEncodeAsEan128() === !0 && e.unshift(r.FNC1);
					var a = n.next(e, 1, i);
					return {
						text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text,
						data: n.getBar(t) + a.result + n.getBar((a.checksum + t) % r.MODULO) + n.getBar(r.STOP)
					};
				}
			},
			{
				key: "shouldEncodeAsEan128",
				value: function() {
					var e = this.options.ean128 || !1;
					return typeof e == "string" && (e = e.toLowerCase() === "true"), e;
				}
			}
		], [
			{
				key: "getBar",
				value: function(e) {
					return r.BARS[e] ? r.BARS[e].toString() : "";
				}
			},
			{
				key: "correctIndex",
				value: function(e, t) {
					if (t === r.SET_A) {
						var n = e.shift();
						return n < 32 ? n + 64 : n - 32;
					}
					return t === r.SET_B ? e.shift() - 32 : (e.shift() - 48) * 10 + e.shift() - 48;
				}
			},
			{
				key: "next",
				value: function(e, t, i) {
					if (!e.length) return {
						result: "",
						checksum: 0
					};
					var a = void 0, o = void 0;
					if (e[0] >= 200) {
						o = e.shift() - 105;
						var s = r.SWAP[o];
						s === void 0 ? ((i === r.SET_A || i === r.SET_B) && o === r.SHIFT && (e[0] = i === r.SET_A ? e[0] > 95 ? e[0] - 96 : e[0] : e[0] < 32 ? e[0] + 96 : e[0]), a = n.next(e, t + 1, i)) : a = n.next(e, t + 1, s);
					} else o = n.correctIndex(e, i), a = n.next(e, t + 1, i);
					var c = n.getBar(o), l = o * t;
					return {
						result: c + a.result,
						checksum: l + a.checksum
					};
				}
			}
		]), n;
	}(n.default);
})), ne = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = D(), n = function(e) {
		return e.match(RegExp("^" + t.A_CHARS + "*"))[0].length;
	}, r = function(e) {
		return e.match(RegExp("^" + t.B_CHARS + "*"))[0].length;
	}, i = function(e) {
		return e.match(RegExp("^" + t.C_CHARS + "*"))[0];
	};
	function a(e, n) {
		var r = n ? t.A_CHARS : t.B_CHARS, i = e.match(RegExp("^(" + r + "+?)(([0-9]{2}){2,})([^0-9]|$)"));
		if (i) return i[1] + "Ì" + o(e.substring(i[1].length));
		var s = e.match(RegExp("^" + r + "+"))[0];
		return s.length === e.length ? e : s + String.fromCharCode(n ? 205 : 206) + a(e.substring(s.length), !n);
	}
	function o(e) {
		var t = i(e), o = t.length;
		if (o === e.length) return e;
		e = e.substring(o);
		var s = n(e) >= r(e);
		return t + String.fromCharCode(s ? 206 : 205) + a(e, s);
	}
	e.default = function(e) {
		var s = void 0;
		if (i(e).length >= 2) s = t.C_START_CHAR + o(e);
		else {
			var c = n(e) > r(e);
			s = (c ? t.A_START_CHAR : t.B_START_CHAR) + a(e, c);
		}
		return s.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, function(e, t) {
			return "Ë" + t;
		});
	};
})), O = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = r(te()), n = r(ne());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function a(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function o(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.default = function(e) {
		o(t, e);
		function t(e, r) {
			if (i(this, t), /^[\x00-\x7F\xC8-\xD3]+$/.test(e)) var o = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, (0, n.default)(e), r));
			else var o = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
			return a(o);
		}
		return t;
	}(t.default);
})), k = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = i(te()), r = D();
	function i(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function a(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function o(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function s(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.default = function(e) {
		s(n, e);
		function n(e, t) {
			return a(this, n), o(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, r.A_START_CHAR + e, t));
		}
		return t(n, [{
			key: "valid",
			value: function() {
				return RegExp("^" + r.A_CHARS + "+$").test(this.data);
			}
		}]), n;
	}(n.default);
})), A = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = i(te()), r = D();
	function i(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function a(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function o(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function s(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.default = function(e) {
		s(n, e);
		function n(e, t) {
			return a(this, n), o(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, r.B_START_CHAR + e, t));
		}
		return t(n, [{
			key: "valid",
			value: function() {
				return RegExp("^" + r.B_CHARS + "+$").test(this.data);
			}
		}]), n;
	}(n.default);
})), j = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = i(te()), r = D();
	function i(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function a(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function o(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function s(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.default = function(e) {
		s(n, e);
		function n(e, t) {
			return a(this, n), o(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, r.C_START_CHAR + e, t));
		}
		return t(n, [{
			key: "valid",
			value: function() {
				return RegExp("^" + r.C_CHARS + "+$").test(this.data);
			}
		}]), n;
	}(n.default);
})), M = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.CODE128C = e.CODE128B = e.CODE128A = e.CODE128 = void 0;
	var t = a(O()), n = a(k()), r = a(A()), i = a(j());
	function a(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.CODE128 = t.default, e.CODE128A = n.default, e.CODE128B = r.default, e.CODE128C = i.default;
})), N = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.SIDE_BIN = "101", e.MIDDLE_BIN = "01010", e.BINARIES = {
		L: [
			"0001101",
			"0011001",
			"0010011",
			"0111101",
			"0100011",
			"0110001",
			"0101111",
			"0111011",
			"0110111",
			"0001011"
		],
		G: [
			"0100111",
			"0110011",
			"0011011",
			"0100001",
			"0011101",
			"0111001",
			"0000101",
			"0010001",
			"0001001",
			"0010111"
		],
		R: [
			"1110010",
			"1100110",
			"1101100",
			"1000010",
			"1011100",
			"1001110",
			"1010000",
			"1000100",
			"1001000",
			"1110100"
		],
		O: [
			"0001101",
			"0011001",
			"0010011",
			"0111101",
			"0100011",
			"0110001",
			"0101111",
			"0111011",
			"0110111",
			"0001011"
		],
		E: [
			"0100111",
			"0110011",
			"0011011",
			"0100001",
			"0011101",
			"0111001",
			"0000101",
			"0010001",
			"0001001",
			"0010111"
		]
	}, e.EAN2_STRUCTURE = [
		"LL",
		"LG",
		"GL",
		"GG"
	], e.EAN5_STRUCTURE = [
		"GGLLL",
		"GLGLL",
		"GLLGL",
		"GLLLG",
		"LGGLL",
		"LLGGL",
		"LLLGG",
		"LGLGL",
		"LGLLG",
		"LLGLG"
	], e.EAN13_STRUCTURE = [
		"LLLLLL",
		"LLGLGG",
		"LLGGLG",
		"LLGGGL",
		"LGLLGG",
		"LGGLLG",
		"LGGGLL",
		"LGLGLG",
		"LGLGGL",
		"LGGLGL"
	];
})), P = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = N();
	e.default = function(e, n, r) {
		var i = e.split("").map(function(e, r) {
			return t.BINARIES[n[r]];
		}).map(function(t, n) {
			return t ? t[e[n]] : "";
		});
		if (r) {
			var a = e.length - 1;
			i = i.map(function(e, t) {
				return t < a ? e + r : e;
			});
		}
		return i.join("");
	};
})), re = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = N(), r = a(P()), i = a(E());
	function a(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function o(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function s(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function c(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.default = function(e) {
		c(i, e);
		function i(e, t) {
			o(this, i);
			var n = s(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e, t));
			return n.fontSize = !t.flat && t.fontSize > t.width * 10 ? t.width * 10 : t.fontSize, n.guardHeight = t.height + n.fontSize / 2 + t.textMargin, n;
		}
		return t(i, [
			{
				key: "encode",
				value: function() {
					return this.options.flat ? this.encodeFlat() : this.encodeGuarded();
				}
			},
			{
				key: "leftText",
				value: function(e, t) {
					return this.text.substr(e, t);
				}
			},
			{
				key: "leftEncode",
				value: function(e, t) {
					return (0, r.default)(e, t);
				}
			},
			{
				key: "rightText",
				value: function(e, t) {
					return this.text.substr(e, t);
				}
			},
			{
				key: "rightEncode",
				value: function(e, t) {
					return (0, r.default)(e, t);
				}
			},
			{
				key: "encodeGuarded",
				value: function() {
					var e = { fontSize: this.fontSize }, t = { height: this.guardHeight };
					return [
						{
							data: n.SIDE_BIN,
							options: t
						},
						{
							data: this.leftEncode(),
							text: this.leftText(),
							options: e
						},
						{
							data: n.MIDDLE_BIN,
							options: t
						},
						{
							data: this.rightEncode(),
							text: this.rightText(),
							options: e
						},
						{
							data: n.SIDE_BIN,
							options: t
						}
					];
				}
			},
			{
				key: "encodeFlat",
				value: function() {
					return {
						data: [
							n.SIDE_BIN,
							this.leftEncode(),
							n.MIDDLE_BIN,
							this.rightEncode(),
							n.SIDE_BIN
						].join(""),
						text: this.text
					};
				}
			}
		]), i;
	}(i.default);
})), F = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = function e(t, n, r) {
		t === null && (t = Function.prototype);
		var i = Object.getOwnPropertyDescriptor(t, n);
		if (i === void 0) {
			var a = Object.getPrototypeOf(t);
			return a === null ? void 0 : e(a, n, r);
		}
		if ("value" in i) return i.value;
		var o = i.get;
		return o === void 0 ? void 0 : o.call(r);
	}, r = N(), i = a(re());
	function a(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function o(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function s(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function c(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	var l = function(e) {
		return (10 - e.substr(0, 12).split("").map(function(e) {
			return +e;
		}).reduce(function(e, t, n) {
			return n % 2 ? e + t * 3 : e + t;
		}, 0) % 10) % 10;
	};
	e.default = function(e) {
		c(i, e);
		function i(e, t) {
			o(this, i), e.search(/^[0-9]{12}$/) !== -1 && (e += l(e));
			var n = s(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e, t));
			return n.lastChar = t.lastChar, n;
		}
		return t(i, [
			{
				key: "valid",
				value: function() {
					return this.data.search(/^[0-9]{13}$/) !== -1 && +this.data[12] === l(this.data);
				}
			},
			{
				key: "leftText",
				value: function() {
					return n(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "leftText", this).call(this, 1, 6);
				}
			},
			{
				key: "leftEncode",
				value: function() {
					var e = this.data.substr(1, 6), t = r.EAN13_STRUCTURE[this.data[0]];
					return n(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "leftEncode", this).call(this, e, t);
				}
			},
			{
				key: "rightText",
				value: function() {
					return n(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "rightText", this).call(this, 7, 6);
				}
			},
			{
				key: "rightEncode",
				value: function() {
					var e = this.data.substr(7, 6);
					return n(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "rightEncode", this).call(this, e, "RRRRRR");
				}
			},
			{
				key: "encodeGuarded",
				value: function() {
					var e = n(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "encodeGuarded", this).call(this);
					return this.options.displayValue && (e.unshift({
						data: "000000000000",
						text: this.text.substr(0, 1),
						options: {
							textAlign: "left",
							fontSize: this.fontSize
						}
					}), this.options.lastChar && (e.push({ data: "00" }), e.push({
						data: "00000",
						text: this.options.lastChar,
						options: { fontSize: this.fontSize }
					}))), e;
				}
			}
		]), i;
	}(i.default);
})), ie = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = function e(t, n, r) {
		t === null && (t = Function.prototype);
		var i = Object.getOwnPropertyDescriptor(t, n);
		if (i === void 0) {
			var a = Object.getPrototypeOf(t);
			return a === null ? void 0 : e(a, n, r);
		}
		if ("value" in i) return i.value;
		var o = i.get;
		return o === void 0 ? void 0 : o.call(r);
	}, r = i(re());
	function i(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function a(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function o(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function s(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	var c = function(e) {
		return (10 - e.substr(0, 7).split("").map(function(e) {
			return +e;
		}).reduce(function(e, t, n) {
			return n % 2 ? e + t : e + t * 3;
		}, 0) % 10) % 10;
	};
	e.default = function(e) {
		s(r, e);
		function r(e, t) {
			return a(this, r), e.search(/^[0-9]{7}$/) !== -1 && (e += c(e)), o(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, e, t));
		}
		return t(r, [
			{
				key: "valid",
				value: function() {
					return this.data.search(/^[0-9]{8}$/) !== -1 && +this.data[7] === c(this.data);
				}
			},
			{
				key: "leftText",
				value: function() {
					return n(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "leftText", this).call(this, 0, 4);
				}
			},
			{
				key: "leftEncode",
				value: function() {
					var e = this.data.substr(0, 4);
					return n(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "leftEncode", this).call(this, e, "LLLL");
				}
			},
			{
				key: "rightText",
				value: function() {
					return n(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "rightText", this).call(this, 4, 4);
				}
			},
			{
				key: "rightEncode",
				value: function() {
					var e = this.data.substr(4, 4);
					return n(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "rightEncode", this).call(this, e, "RRRR");
				}
			}
		]), r;
	}(r.default);
})), ae = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = N(), r = a(P()), i = a(E());
	function a(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function o(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function s(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function c(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	var l = function(e) {
		return e.split("").map(function(e) {
			return +e;
		}).reduce(function(e, t, n) {
			return n % 2 ? e + t * 9 : e + t * 3;
		}, 0) % 10;
	};
	e.default = function(e) {
		c(i, e);
		function i(e, t) {
			return o(this, i), s(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e, t));
		}
		return t(i, [{
			key: "valid",
			value: function() {
				return this.data.search(/^[0-9]{5}$/) !== -1;
			}
		}, {
			key: "encode",
			value: function() {
				var e = n.EAN5_STRUCTURE[l(this.data)];
				return {
					data: "1011" + (0, r.default)(this.data, e, "01"),
					text: this.text
				};
			}
		}]), i;
	}(i.default);
})), I = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = N(), r = a(P()), i = a(E());
	function a(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function o(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function s(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function c(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.default = function(e) {
		c(i, e);
		function i(e, t) {
			return o(this, i), s(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e, t));
		}
		return t(i, [{
			key: "valid",
			value: function() {
				return this.data.search(/^[0-9]{2}$/) !== -1;
			}
		}, {
			key: "encode",
			value: function() {
				var e = n.EAN2_STRUCTURE[parseInt(this.data) % 4];
				return {
					data: "1011" + (0, r.default)(this.data, e, "01"),
					text: this.text
				};
			}
		}]), i;
	}(i.default);
})), L = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}();
	e.checksum = l;
	var n = i(P()), r = i(E());
	function i(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function a(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function o(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function s(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	var c = function(e) {
		s(r, e);
		function r(e, t) {
			a(this, r), e.search(/^[0-9]{11}$/) !== -1 && (e += l(e));
			var n = o(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, e, t));
			return n.displayValue = t.displayValue, n.fontSize = t.fontSize > t.width * 10 ? t.width * 10 : t.fontSize, n.guardHeight = t.height + n.fontSize / 2 + t.textMargin, n;
		}
		return t(r, [
			{
				key: "valid",
				value: function() {
					return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == l(this.data);
				}
			},
			{
				key: "encode",
				value: function() {
					return this.options.flat ? this.flatEncoding() : this.guardedEncoding();
				}
			},
			{
				key: "flatEncoding",
				value: function() {
					var e = "";
					return e += "101", e += (0, n.default)(this.data.substr(0, 6), "LLLLLL"), e += "01010", e += (0, n.default)(this.data.substr(6, 6), "RRRRRR"), e += "101", {
						data: e,
						text: this.text
					};
				}
			},
			{
				key: "guardedEncoding",
				value: function() {
					var e = [];
					return this.displayValue && e.push({
						data: "00000000",
						text: this.text.substr(0, 1),
						options: {
							textAlign: "left",
							fontSize: this.fontSize
						}
					}), e.push({
						data: "101" + (0, n.default)(this.data[0], "L"),
						options: { height: this.guardHeight }
					}), e.push({
						data: (0, n.default)(this.data.substr(1, 5), "LLLLL"),
						text: this.text.substr(1, 5),
						options: { fontSize: this.fontSize }
					}), e.push({
						data: "01010",
						options: { height: this.guardHeight }
					}), e.push({
						data: (0, n.default)(this.data.substr(6, 5), "RRRRR"),
						text: this.text.substr(6, 5),
						options: { fontSize: this.fontSize }
					}), e.push({
						data: (0, n.default)(this.data[11], "R") + "101",
						options: { height: this.guardHeight }
					}), this.displayValue && e.push({
						data: "00000000",
						text: this.text.substr(11, 1),
						options: {
							textAlign: "right",
							fontSize: this.fontSize
						}
					}), e;
				}
			}
		]), r;
	}(r.default);
	function l(e) {
		for (var t = 0, n = 1; n < 11; n += 2) t += parseInt(e[n]);
		for (n = 0; n < 11; n += 2) t += parseInt(e[n]) * 3;
		return (10 - t % 10) % 10;
	}
	e.default = c;
})), R = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = a(P()), r = a(E()), i = L();
	function a(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function o(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function s(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function c(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	var l = [
		"XX00000XXX",
		"XX10000XXX",
		"XX20000XXX",
		"XXX00000XX",
		"XXXX00000X",
		"XXXXX00005",
		"XXXXX00006",
		"XXXXX00007",
		"XXXXX00008",
		"XXXXX00009"
	], u = [
		["EEEOOO", "OOOEEE"],
		["EEOEOO", "OOEOEE"],
		["EEOOEO", "OOEEOE"],
		["EEOOOE", "OOEEEO"],
		["EOEEOO", "OEOOEE"],
		["EOOEEO", "OEEOOE"],
		["EOOOEE", "OEEEOO"],
		["EOEOEO", "OEOEOE"],
		["EOEOOE", "OEOEEO"],
		["EOOEOE", "OEEOEO"]
	], d = function(e) {
		c(r, e);
		function r(e, t) {
			o(this, r);
			var n = s(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, e, t));
			if (n.isValid = !1, e.search(/^[0-9]{6}$/) !== -1) n.middleDigits = e, n.upcA = f(e, "0"), n.text = t.text || "" + n.upcA[0] + e + n.upcA[n.upcA.length - 1], n.isValid = !0;
			else if (e.search(/^[01][0-9]{7}$/) !== -1) {
				if (n.middleDigits = e.substring(1, e.length - 1), n.upcA = f(n.middleDigits, e[0]), n.upcA[n.upcA.length - 1] === e[e.length - 1]) n.isValid = !0;
				else return s(n);
			} else return s(n);
			return n.displayValue = t.displayValue, n.fontSize = t.fontSize > t.width * 10 ? t.width * 10 : t.fontSize, n.guardHeight = t.height + n.fontSize / 2 + t.textMargin, n;
		}
		return t(r, [
			{
				key: "valid",
				value: function() {
					return this.isValid;
				}
			},
			{
				key: "encode",
				value: function() {
					return this.options.flat ? this.flatEncoding() : this.guardedEncoding();
				}
			},
			{
				key: "flatEncoding",
				value: function() {
					var e = "";
					return e += "101", e += this.encodeMiddleDigits(), e += "010101", {
						data: e,
						text: this.text
					};
				}
			},
			{
				key: "guardedEncoding",
				value: function() {
					var e = [];
					return this.displayValue && e.push({
						data: "00000000",
						text: this.text[0],
						options: {
							textAlign: "left",
							fontSize: this.fontSize
						}
					}), e.push({
						data: "101",
						options: { height: this.guardHeight }
					}), e.push({
						data: this.encodeMiddleDigits(),
						text: this.text.substring(1, 7),
						options: { fontSize: this.fontSize }
					}), e.push({
						data: "010101",
						options: { height: this.guardHeight }
					}), this.displayValue && e.push({
						data: "00000000",
						text: this.text[7],
						options: {
							textAlign: "right",
							fontSize: this.fontSize
						}
					}), e;
				}
			},
			{
				key: "encodeMiddleDigits",
				value: function() {
					var e = this.upcA[0], t = this.upcA[this.upcA.length - 1], r = u[parseInt(t)][parseInt(e)];
					return (0, n.default)(this.middleDigits, r);
				}
			}
		]), r;
	}(r.default);
	function f(e, t) {
		for (var n = l[parseInt(e[e.length - 1])], r = "", a = 0, o = 0; o < n.length; o++) {
			var s = n[o];
			r += s === "X" ? e[a++] : s;
		}
		return r = "" + t + r, "" + r + (0, i.checksum)(r);
	}
	e.default = d;
})), z = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.UPCE = e.UPC = e.EAN2 = e.EAN5 = e.EAN8 = e.EAN13 = void 0;
	var t = s(F()), n = s(ie()), r = s(ae()), i = s(I()), a = s(L()), o = s(R());
	function s(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.EAN13 = t.default, e.EAN8 = n.default, e.EAN5 = r.default, e.EAN2 = i.default, e.UPC = a.default, e.UPCE = o.default;
})), B = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.START_BIN = "1010", e.END_BIN = "11101", e.BINARIES = [
		"00110",
		"10001",
		"01001",
		"11000",
		"00101",
		"10100",
		"01100",
		"00011",
		"10010",
		"01010"
	];
})), V = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = B(), r = i(E());
	function i(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function a(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function o(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function s(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.default = function(e) {
		s(r, e);
		function r() {
			return a(this, r), o(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments));
		}
		return t(r, [
			{
				key: "valid",
				value: function() {
					return this.data.search(/^([0-9]{2})+$/) !== -1;
				}
			},
			{
				key: "encode",
				value: function() {
					var e = this, t = this.data.match(/.{2}/g).map(function(t) {
						return e.encodePair(t);
					}).join("");
					return {
						data: n.START_BIN + t + n.END_BIN,
						text: this.text
					};
				}
			},
			{
				key: "encodePair",
				value: function(e) {
					var t = n.BINARIES[e[1]];
					return n.BINARIES[e[0]].split("").map(function(e, n) {
						return (e === "1" ? "111" : "1") + (t[n] === "1" ? "000" : "0");
					}).join("");
				}
			}
		]), r;
	}(r.default);
})), H = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = r(V());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function a(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function o(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	var s = function(e) {
		var t = e.substr(0, 13).split("").map(function(e) {
			return parseInt(e, 10);
		}).reduce(function(e, t, n) {
			return e + t * (3 - n % 2 * 2);
		}, 0);
		return Math.ceil(t / 10) * 10 - t;
	};
	e.default = function(e) {
		o(n, e);
		function n(e, t) {
			return i(this, n), e.search(/^[0-9]{13}$/) !== -1 && (e += s(e)), a(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
		}
		return t(n, [{
			key: "valid",
			value: function() {
				return this.data.search(/^[0-9]{14}$/) !== -1 && +this.data[13] === s(this.data);
			}
		}]), n;
	}(n.default);
})), U = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ITF14 = e.ITF = void 0;
	var t = r(V()), n = r(H());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.ITF = t.default, e.ITF14 = n.default;
})), W = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = r(E());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function a(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function o(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	var s = function(e) {
		o(n, e);
		function n(e, t) {
			return i(this, n), a(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
		}
		return t(n, [{
			key: "encode",
			value: function() {
				for (var e = "110", t = 0; t < this.data.length; t++) {
					var n = parseInt(this.data[t]).toString(2);
					n = c(n, 4 - n.length);
					for (var r = 0; r < n.length; r++) e += n[r] == "0" ? "100" : "110";
				}
				return e += "1001", {
					data: e,
					text: this.text
				};
			}
		}, {
			key: "valid",
			value: function() {
				return this.data.search(/^[0-9]+$/) !== -1;
			}
		}]), n;
	}(n.default);
	function c(e, t) {
		for (var n = 0; n < t; n++) e = "0" + e;
		return e;
	}
	e.default = s;
})), G = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.mod10 = t, e.mod11 = n;
	function t(e) {
		for (var t = 0, n = 0; n < e.length; n++) {
			var r = parseInt(e[n]);
			(n + e.length) % 2 == 0 ? t += r : t += r * 2 % 10 + Math.floor(r * 2 / 10);
		}
		return (10 - t % 10) % 10;
	}
	function n(e) {
		for (var t = 0, n = [
			2,
			3,
			4,
			5,
			6,
			7
		], r = 0; r < e.length; r++) {
			var i = parseInt(e[e.length - 1 - r]);
			t += n[r % n.length] * i;
		}
		return (11 - t % 11) % 11;
	}
})), oe = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = r(W()), n = G();
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function a(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function o(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.default = function(e) {
		o(t, e);
		function t(e, r) {
			return i(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e + (0, n.mod10)(e), r));
		}
		return t;
	}(t.default);
})), K = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = r(W()), n = G();
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function a(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function o(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.default = function(e) {
		o(t, e);
		function t(e, r) {
			return i(this, t), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e + (0, n.mod11)(e), r));
		}
		return t;
	}(t.default);
})), se = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = r(W()), n = G();
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function a(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function o(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.default = function(e) {
		o(t, e);
		function t(e, r) {
			return i(this, t), e += (0, n.mod10)(e), e += (0, n.mod10)(e), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
		}
		return t;
	}(t.default);
})), q = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = r(W()), n = G();
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function a(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function o(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.default = function(e) {
		o(t, e);
		function t(e, r) {
			return i(this, t), e += (0, n.mod11)(e), e += (0, n.mod10)(e), a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, r));
		}
		return t;
	}(t.default);
})), ce = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.MSI1110 = e.MSI1010 = e.MSI11 = e.MSI10 = e.MSI = void 0;
	var t = o(W()), n = o(oe()), r = o(K()), i = o(se()), a = o(q());
	function o(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.MSI = t.default, e.MSI10 = n.default, e.MSI11 = r.default, e.MSI1010 = i.default, e.MSI1110 = a.default;
})), le = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.pharmacode = void 0;
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = r(E());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function a(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function o(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.pharmacode = function(e) {
		o(n, e);
		function n(e, t) {
			i(this, n);
			var r = a(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
			return r.number = parseInt(e, 10), r;
		}
		return t(n, [{
			key: "encode",
			value: function() {
				for (var e = this.number, t = ""; !isNaN(e) && e != 0;) e % 2 == 0 ? (t = "11100" + t, e = (e - 2) / 2) : (t = "100" + t, e = (e - 1) / 2);
				return t = t.slice(0, -2), {
					data: t,
					text: this.text
				};
			}
		}, {
			key: "valid",
			value: function() {
				return this.number >= 3 && this.number <= 131070;
			}
		}]), n;
	}(n.default);
})), ue = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.codabar = void 0;
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = r(E());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function a(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function o(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.codabar = function(e) {
		o(n, e);
		function n(e, t) {
			i(this, n), e.search(/^[0-9\-\$\:\.\+\/]+$/) === 0 && (e = "A" + e + "A");
			var r = a(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e.toUpperCase(), t));
			return r.text = r.options.text || r.text.replace(/[A-D]/g, ""), r;
		}
		return t(n, [
			{
				key: "valid",
				value: function() {
					return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
				}
			},
			{
				key: "encode",
				value: function() {
					for (var e = [], t = this.getEncodings(), n = 0; n < this.data.length; n++) e.push(t[this.data.charAt(n)]), n !== this.data.length - 1 && e.push("0");
					return {
						text: this.text,
						data: e.join("")
					};
				}
			},
			{
				key: "getEncodings",
				value: function() {
					return {
						0: "101010011",
						1: "101011001",
						2: "101001011",
						3: "110010101",
						4: "101101001",
						5: "110101001",
						6: "100101011",
						7: "100101101",
						8: "100110101",
						9: "110100101",
						"-": "101001101",
						$: "101100101",
						":": "1101011011",
						"/": "1101101011",
						".": "1101101101",
						"+": "1011011011",
						A: "1011001001",
						B: "1001001011",
						C: "1010010011",
						D: "1010011001"
					};
				}
			}
		]), n;
	}(n.default);
})), J = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.SYMBOLS = /* @__PURE__ */ "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,-,., ,$,/,+,%,($),(%),(/),(+),ÿ".split(","), e.BINARIES = /* @__PURE__ */ "100010100.101001000.101000100.101000010.100101000.100100100.100100010.101010000.100010010.100001010.110101000.110100100.110100010.110010100.110010010.110001010.101101000.101100100.101100010.100110100.100011010.101011000.101001100.101000110.100101100.100010110.110110100.110110010.110101100.110100110.110010110.110011010.101101100.101100110.100110110.100111010.100101110.111010100.111010010.111001010.101101110.101110110.110101110.100100110.111011010.111010110.100110010.101011110".split("."), e.MULTI_SYMBOLS = {
		"\0": ["(%)", "U"],
		"": ["($)", "A"],
		"": ["($)", "B"],
		"": ["($)", "C"],
		"": ["($)", "D"],
		"": ["($)", "E"],
		"": ["($)", "F"],
		"\x07": ["($)", "G"],
		"\b": ["($)", "H"],
		"	": ["($)", "I"],
		"\n": ["($)", "J"],
		"\v": ["($)", "K"],
		"\f": ["($)", "L"],
		"\r": ["($)", "M"],
		"": ["($)", "N"],
		"": ["($)", "O"],
		"": ["($)", "P"],
		"": ["($)", "Q"],
		"": ["($)", "R"],
		"": ["($)", "S"],
		"": ["($)", "T"],
		"": ["($)", "U"],
		"": ["($)", "V"],
		"": ["($)", "W"],
		"": ["($)", "X"],
		"": ["($)", "Y"],
		"": ["($)", "Z"],
		"\x1B": ["(%)", "A"],
		"": ["(%)", "B"],
		"": ["(%)", "C"],
		"": ["(%)", "D"],
		"": ["(%)", "E"],
		"!": ["(/)", "A"],
		"\"": ["(/)", "B"],
		"#": ["(/)", "C"],
		"&": ["(/)", "F"],
		"'": ["(/)", "G"],
		"(": ["(/)", "H"],
		")": ["(/)", "I"],
		"*": ["(/)", "J"],
		",": ["(/)", "L"],
		":": ["(/)", "Z"],
		";": ["(%)", "F"],
		"<": ["(%)", "G"],
		"=": ["(%)", "H"],
		">": ["(%)", "I"],
		"?": ["(%)", "J"],
		"@": ["(%)", "V"],
		"[": ["(%)", "K"],
		"\\": ["(%)", "L"],
		"]": ["(%)", "M"],
		"^": ["(%)", "N"],
		_: ["(%)", "O"],
		"`": ["(%)", "W"],
		a: ["(+)", "A"],
		b: ["(+)", "B"],
		c: ["(+)", "C"],
		d: ["(+)", "D"],
		e: ["(+)", "E"],
		f: ["(+)", "F"],
		g: ["(+)", "G"],
		h: ["(+)", "H"],
		i: ["(+)", "I"],
		j: ["(+)", "J"],
		k: ["(+)", "K"],
		l: ["(+)", "L"],
		m: ["(+)", "M"],
		n: ["(+)", "N"],
		o: ["(+)", "O"],
		p: ["(+)", "P"],
		q: ["(+)", "Q"],
		r: ["(+)", "R"],
		s: ["(+)", "S"],
		t: ["(+)", "T"],
		u: ["(+)", "U"],
		v: ["(+)", "V"],
		w: ["(+)", "W"],
		x: ["(+)", "X"],
		y: ["(+)", "Y"],
		z: ["(+)", "Z"],
		"{": ["(%)", "P"],
		"|": ["(%)", "Q"],
		"}": ["(%)", "R"],
		"~": ["(%)", "S"],
		"": ["(%)", "T"]
	};
})), de = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = J(), r = i(E());
	function i(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function a(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function o(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function s(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.default = function(e) {
		s(r, e);
		function r(e, t) {
			return a(this, r), o(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, e, t));
		}
		return t(r, [{
			key: "valid",
			value: function() {
				return /^[0-9A-Z\-. $/+%]+$/.test(this.data);
			}
		}, {
			key: "encode",
			value: function() {
				var e = this.data.split("").flatMap(function(e) {
					return n.MULTI_SYMBOLS[e] || e;
				}), t = e.map(function(e) {
					return r.getEncoding(e);
				}).join(""), i = r.checksum(e, 20), a = r.checksum(e.concat(i), 15);
				return {
					text: this.text,
					data: r.getEncoding("ÿ") + t + r.getEncoding(i) + r.getEncoding(a) + r.getEncoding("ÿ") + "1"
				};
			}
		}], [
			{
				key: "getEncoding",
				value: function(e) {
					return n.BINARIES[r.symbolValue(e)];
				}
			},
			{
				key: "getSymbol",
				value: function(e) {
					return n.SYMBOLS[e];
				}
			},
			{
				key: "symbolValue",
				value: function(e) {
					return n.SYMBOLS.indexOf(e);
				}
			},
			{
				key: "checksum",
				value: function(e, t) {
					var n = e.slice().reverse().reduce(function(e, n, i) {
						var a = i % t + 1;
						return e + r.symbolValue(n) * a;
					}, 0);
					return r.getSymbol(n % 47);
				}
			}
		]), r;
	}(r.default);
})), fe = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = r(de());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function a(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function o(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.default = function(e) {
		o(n, e);
		function n(e, t) {
			return i(this, n), a(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
		}
		return t(n, [{
			key: "valid",
			value: function() {
				return /^[\x00-\x7f]+$/.test(this.data);
			}
		}]), n;
	}(n.default);
})), pe = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.CODE93FullASCII = e.CODE93 = void 0;
	var t = r(de()), n = r(fe());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.CODE93 = t.default, e.CODE93FullASCII = n.default;
})), me = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.GenericBarcode = void 0;
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = r(E());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function a(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function o(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	e.GenericBarcode = function(e) {
		o(n, e);
		function n(e, t) {
			return i(this, n), a(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
		}
		return t(n, [{
			key: "encode",
			value: function() {
				return {
					data: "10101010101010101010101010101010101010101",
					text: this.text
				};
			}
		}, {
			key: "valid",
			value: function() {
				return !0;
			}
		}]), n;
	}(n.default);
})), he = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = ee(), n = M(), r = z(), i = U(), a = ce(), o = le(), s = ue(), c = pe(), l = me();
	e.default = {
		CODE39: t.CODE39,
		CODE128: n.CODE128,
		CODE128A: n.CODE128A,
		CODE128B: n.CODE128B,
		CODE128C: n.CODE128C,
		EAN13: r.EAN13,
		EAN8: r.EAN8,
		EAN5: r.EAN5,
		EAN2: r.EAN2,
		UPC: r.UPC,
		UPCE: r.UPCE,
		ITF14: i.ITF14,
		ITF: i.ITF,
		MSI: a.MSI,
		MSI10: a.MSI10,
		MSI11: a.MSI11,
		MSI1010: a.MSI1010,
		MSI1110: a.MSI1110,
		pharmacode: o.pharmacode,
		codabar: s.codabar,
		CODE93: c.CODE93,
		CODE93FullASCII: c.CODE93FullASCII,
		GenericBarcode: l.GenericBarcode
	};
})), ge = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = Object.assign || function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	};
	e.default = function(e, n) {
		return t({}, e, n);
	};
})), _e = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t;
	function t(e) {
		var t = [];
		function n(e) {
			if (Array.isArray(e)) for (var r = 0; r < e.length; r++) n(e[r]);
			else e.text = e.text || "", e.data = e.data || "", t.push(e);
		}
		return n(e), t;
	}
})), ve = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t;
	function t(e) {
		return e.marginTop = e.marginTop || e.margin, e.marginBottom = e.marginBottom || e.margin, e.marginRight = e.marginRight || e.margin, e.marginLeft = e.marginLeft || e.margin, e;
	}
})), ye = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t;
	function t(e) {
		var t = [
			"width",
			"height",
			"textMargin",
			"fontSize",
			"margin",
			"marginTop",
			"marginBottom",
			"marginLeft",
			"marginRight"
		];
		for (var n in t) t.hasOwnProperty(n) && (n = t[n], typeof e[n] == "string" && (e[n] = parseInt(e[n], 10)));
		return typeof e.displayValue == "string" && (e.displayValue = e.displayValue != "false"), e;
	}
})), be = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = {
		width: 2,
		height: 100,
		format: "auto",
		displayValue: !0,
		fontOptions: "",
		font: "monospace",
		text: void 0,
		textAlign: "center",
		textPosition: "bottom",
		textMargin: 2,
		fontSize: 20,
		background: "#ffffff",
		lineColor: "#000000",
		margin: 10,
		marginTop: void 0,
		marginBottom: void 0,
		marginLeft: void 0,
		marginRight: void 0,
		valid: function() {}
	};
})), xe = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = r(ye()), n = r(be());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e) {
		var r = {};
		for (var i in n.default) n.default.hasOwnProperty(i) && (e.hasAttribute("jsbarcode-" + i.toLowerCase()) && (r[i] = e.getAttribute("jsbarcode-" + i.toLowerCase())), e.hasAttribute("data-" + i.toLowerCase()) && (r[i] = e.getAttribute("data-" + i.toLowerCase())));
		return r.value = e.getAttribute("jsbarcode-value") || e.getAttribute("data-value"), r = (0, t.default)(r), r;
	}
	e.default = i;
})), Se = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.getTotalWidthOfEncodings = e.calculateEncodingAttributes = e.getBarcodePadding = e.getEncodingHeight = e.getMaximumHeightOfEncodings = void 0;
	var t = n(ge());
	function n(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function r(e, t) {
		return t.height + (t.displayValue && e.text.length > 0 ? t.fontSize + t.textMargin : 0) + t.marginTop + t.marginBottom;
	}
	function i(e, t, n) {
		if (n.displayValue && t < e) {
			if (n.textAlign == "center") return Math.floor((e - t) / 2);
			if (n.textAlign == "left") return 0;
			if (n.textAlign == "right") return Math.floor(e - t);
		}
		return 0;
	}
	function a(e, n, a) {
		for (var o = 0; o < e.length; o++) {
			var s = e[o], l = (0, t.default)(n, s.options), u = l.displayValue ? c(s.text, l, a) : 0, d = s.data.length * l.width;
			s.width = Math.ceil(Math.max(u, d)), s.height = r(s, l), s.barcodePadding = i(u, d, l);
		}
	}
	function o(e) {
		for (var t = 0, n = 0; n < e.length; n++) t += e[n].width;
		return t;
	}
	function s(e) {
		for (var t = 0, n = 0; n < e.length; n++) e[n].height > t && (t = e[n].height);
		return t;
	}
	function c(e, t, n) {
		var r;
		if (n) r = n;
		else if (typeof document < "u") r = document.createElement("canvas").getContext("2d");
		else return 0;
		r.font = t.fontOptions + " " + t.fontSize + "px " + t.font;
		var i = r.measureText(e);
		return i ? i.width : 0;
	}
	e.getMaximumHeightOfEncodings = s, e.getEncodingHeight = r, e.getBarcodePadding = i, e.calculateEncodingAttributes = a, e.getTotalWidthOfEncodings = o;
})), Ce = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = i(ge()), r = Se();
	function i(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function a(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	e.default = function() {
		function e(t, n, r) {
			a(this, e), this.canvas = t, this.encodings = n, this.options = r;
		}
		return t(e, [
			{
				key: "render",
				value: function() {
					if (!this.canvas.getContext) throw Error("The browser does not support canvas.");
					this.prepareCanvas();
					for (var e = 0; e < this.encodings.length; e++) {
						var t = (0, n.default)(this.options, this.encodings[e].options);
						this.drawCanvasBarcode(t, this.encodings[e]), this.drawCanvasText(t, this.encodings[e]), this.moveCanvasDrawing(this.encodings[e]);
					}
					this.restoreCanvas();
				}
			},
			{
				key: "prepareCanvas",
				value: function() {
					var e = this.canvas.getContext("2d");
					e.save(), (0, r.calculateEncodingAttributes)(this.encodings, this.options, e);
					var t = (0, r.getTotalWidthOfEncodings)(this.encodings), n = (0, r.getMaximumHeightOfEncodings)(this.encodings);
					this.canvas.width = t + this.options.marginLeft + this.options.marginRight, this.canvas.height = n, e.clearRect(0, 0, this.canvas.width, this.canvas.height), this.options.background && (e.fillStyle = this.options.background, e.fillRect(0, 0, this.canvas.width, this.canvas.height)), e.translate(this.options.marginLeft, 0);
				}
			},
			{
				key: "drawCanvasBarcode",
				value: function(e, t) {
					var n = this.canvas.getContext("2d"), r = t.data, i = e.textPosition == "top" ? e.marginTop + e.fontSize + e.textMargin : e.marginTop;
					n.fillStyle = e.lineColor;
					for (var a = 0; a < r.length; a++) {
						var o = a * e.width + t.barcodePadding;
						r[a] === "1" ? n.fillRect(o, i, e.width, e.height) : r[a] && n.fillRect(o, i, e.width, e.height * r[a]);
					}
				}
			},
			{
				key: "drawCanvasText",
				value: function(e, t) {
					var n = this.canvas.getContext("2d"), r = e.fontOptions + " " + e.fontSize + "px " + e.font;
					if (e.displayValue) {
						var i, a = e.textPosition == "top" ? e.marginTop + e.fontSize - e.textMargin : e.height + e.textMargin + e.marginTop + e.fontSize;
						n.font = r, e.textAlign == "left" || t.barcodePadding > 0 ? (i = 0, n.textAlign = "left") : e.textAlign == "right" ? (i = t.width - 1, n.textAlign = "right") : (i = t.width / 2, n.textAlign = "center"), n.fillText(t.text, i, a);
					}
				}
			},
			{
				key: "moveCanvasDrawing",
				value: function(e) {
					this.canvas.getContext("2d").translate(e.width, 0);
				}
			},
			{
				key: "restoreCanvas",
				value: function() {
					this.canvas.getContext("2d").restore();
				}
			}
		]), e;
	}();
})), we = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), n = i(ge()), r = Se();
	function i(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function a(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	var o = "http://www.w3.org/2000/svg";
	e.default = function() {
		function e(t, n, r) {
			a(this, e), this.svg = t, this.encodings = n, this.options = r, this.document = r.xmlDocument || document;
		}
		return t(e, [
			{
				key: "render",
				value: function() {
					var e = this.options.marginLeft;
					this.prepareSVG();
					for (var t = 0; t < this.encodings.length; t++) {
						var r = this.encodings[t], i = (0, n.default)(this.options, r.options), a = this.createGroup(e, i.marginTop, this.svg);
						this.setGroupOptions(a, i), this.drawSvgBarcode(a, i, r), this.drawSVGText(a, i, r), e += r.width;
					}
				}
			},
			{
				key: "prepareSVG",
				value: function() {
					for (; this.svg.firstChild;) this.svg.removeChild(this.svg.firstChild);
					(0, r.calculateEncodingAttributes)(this.encodings, this.options);
					var e = (0, r.getTotalWidthOfEncodings)(this.encodings), t = (0, r.getMaximumHeightOfEncodings)(this.encodings), n = e + this.options.marginLeft + this.options.marginRight;
					this.setSvgAttributes(n, t), this.options.background && this.drawRect(0, 0, n, t, this.svg).setAttribute("fill", this.options.background);
				}
			},
			{
				key: "drawSvgBarcode",
				value: function(e, t, n) {
					for (var r = n.data, i = t.textPosition == "top" ? t.fontSize + t.textMargin : 0, a = 0, o = 0, s = 0; s < r.length; s++) o = s * t.width + n.barcodePadding, r[s] === "1" ? a++ : a > 0 && (this.drawRect(o - t.width * a, i, t.width * a, t.height, e), a = 0);
					a > 0 && this.drawRect(o - t.width * (a - 1), i, t.width * a, t.height, e);
				}
			},
			{
				key: "drawSVGText",
				value: function(e, t, n) {
					var r = this.document.createElementNS(o, "text");
					if (t.displayValue) {
						var i, a;
						r.setAttribute("font-family", t.font), r.setAttribute("font-size", t.fontSize), t.fontOptions.includes("bold") && r.setAttribute("font-weight", "bold"), t.fontOptions.includes("italic") && r.setAttribute("font-style", "italic"), a = t.textPosition == "top" ? t.fontSize - t.textMargin : t.height + t.textMargin + t.fontSize, t.textAlign == "left" || n.barcodePadding > 0 ? (i = 0, r.setAttribute("text-anchor", "start")) : t.textAlign == "right" ? (i = n.width - 1, r.setAttribute("text-anchor", "end")) : (i = n.width / 2, r.setAttribute("text-anchor", "middle")), r.setAttribute("x", i), r.setAttribute("y", a), r.appendChild(this.document.createTextNode(n.text)), e.appendChild(r);
					}
				}
			},
			{
				key: "setSvgAttributes",
				value: function(e, t) {
					var n = this.svg;
					n.setAttribute("width", e + "px"), n.setAttribute("height", t + "px"), n.setAttribute("x", "0px"), n.setAttribute("y", "0px"), n.setAttribute("viewBox", "0 0 " + e + " " + t), n.setAttribute("xmlns", o), n.setAttribute("version", "1.1");
				}
			},
			{
				key: "createGroup",
				value: function(e, t, n) {
					var r = this.document.createElementNS(o, "g");
					return r.setAttribute("transform", "translate(" + e + ", " + t + ")"), n.appendChild(r), r;
				}
			},
			{
				key: "setGroupOptions",
				value: function(e, t) {
					e.setAttribute("fill", t.lineColor);
				}
			},
			{
				key: "drawRect",
				value: function(e, t, n, r, i) {
					var a = this.document.createElementNS(o, "rect");
					return a.setAttribute("x", e), a.setAttribute("y", t), a.setAttribute("width", n), a.setAttribute("height", r), i.appendChild(a), a;
				}
			}
		]), e;
	}();
})), Te = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}();
	function n(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	e.default = function() {
		function e(t, r, i) {
			n(this, e), this.object = t, this.encodings = r, this.options = i;
		}
		return t(e, [{
			key: "render",
			value: function() {
				this.object.encodings = this.encodings;
			}
		}]), e;
	}();
})), Ee = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = i(Ce()), n = i(we()), r = i(Te());
	function i(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.default = {
		CanvasRenderer: t.default,
		SVGRenderer: n.default,
		ObjectRenderer: r.default
	};
})), De = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	function t(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function n(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function r(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	var i = function(e) {
		r(i, e);
		function i(e, r) {
			t(this, i);
			var a = n(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this));
			return a.name = "InvalidInputException", a.symbology = e, a.input = r, a.message = "\"" + a.input + "\" is not a valid input for " + a.symbology, a;
		}
		return i;
	}(Error), a = function(e) {
		r(i, e);
		function i() {
			t(this, i);
			var e = n(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this));
			return e.name = "InvalidElementException", e.message = "Not supported type to render on", e;
		}
		return i;
	}(Error), o = function(e) {
		r(i, e);
		function i() {
			t(this, i);
			var e = n(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this));
			return e.name = "NoElementException", e.message = "No element to render on.", e;
		}
		return i;
	}(Error);
	e.InvalidInputException = i, e.InvalidElementException = a, e.NoElementException = o;
})), Oe = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, n = a(xe()), r = a(Ee()), i = De();
	function a(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function o(e) {
		if (typeof e == "string") return s(e);
		if (Array.isArray(e)) {
			for (var a = [], l = 0; l < e.length; l++) a.push(o(e[l]));
			return a;
		}
		if (typeof HTMLCanvasElement < "u" && e instanceof HTMLImageElement) return c(e);
		if (e && e.nodeName && e.nodeName.toLowerCase() === "svg" || typeof SVGElement < "u" && e instanceof SVGElement) return {
			element: e,
			options: (0, n.default)(e),
			renderer: r.default.SVGRenderer
		};
		if (typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) return {
			element: e,
			options: (0, n.default)(e),
			renderer: r.default.CanvasRenderer
		};
		if (e && e.getContext) return {
			element: e,
			renderer: r.default.CanvasRenderer
		};
		if (e && (e === void 0 ? "undefined" : t(e)) === "object" && !e.nodeName) return {
			element: e,
			renderer: r.default.ObjectRenderer
		};
		throw new i.InvalidElementException();
	}
	function s(e) {
		var t = document.querySelectorAll(e);
		if (t.length !== 0) {
			for (var n = [], r = 0; r < t.length; r++) n.push(o(t[r]));
			return n;
		}
	}
	function c(e) {
		var t = document.createElement("canvas");
		return {
			element: t,
			options: (0, n.default)(e),
			renderer: r.default.CanvasRenderer,
			afterRender: function() {
				e.setAttribute("src", t.toDataURL());
			}
		};
	}
	e.default = o;
})), ke = /* @__PURE__ */ C(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}();
	function n(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	e.default = function() {
		function e(t) {
			n(this, e), this.api = t;
		}
		return t(e, [{
			key: "handleCatch",
			value: function(e) {
				if (e.name === "InvalidInputException") {
					if (this.api._options.valid !== this.api._defaults.valid) this.api._options.valid(!1);
					else throw e.message;
				} else throw e;
				this.api.render = function() {};
			}
		}, {
			key: "wrapBarcodeCall",
			value: function(e) {
				try {
					var t = e.apply(void 0, arguments);
					return this.api._options.valid(!0), t;
				} catch (e) {
					return this.handleCatch(e), this.api;
				}
			}
		}]), e;
	}();
})), Ae = /* @__PURE__ */ T((/* @__PURE__ */ C(((e, t) => {
	var n = d(he()), r = d(ge()), i = d(_e()), a = d(ve()), o = d(Oe()), s = d(ye()), c = d(ke()), l = De(), u = d(be());
	function d(e) {
		return e && e.__esModule ? e : { default: e };
	}
	var f = function() {}, p = function(e, t, n) {
		var r = new f();
		if (e === void 0) throw Error("No element to render on was provided.");
		return r._renderProperties = (0, o.default)(e), r._encodings = [], r._options = u.default, r._errorHandler = new c.default(r), t !== void 0 && (n ||= {}, n.format || (n.format = _()), r.options(n)[n.format](t, n).render()), r;
	};
	for (var m in p.getModule = function(e) {
		return n.default[e];
	}, n.default) n.default.hasOwnProperty(m) && h(n.default, m);
	function h(e, t) {
		f.prototype[t] = f.prototype[t.toUpperCase()] = f.prototype[t.toLowerCase()] = function(n, i) {
			var a = this;
			return a._errorHandler.wrapBarcodeCall(function() {
				i.text = i.text === void 0 ? void 0 : "" + i.text;
				var o = (0, r.default)(a._options, i);
				o = (0, s.default)(o);
				var c = e[t], l = g(n, c, o);
				return a._encodings.push(l), a;
			});
		};
	}
	function g(e, t, n) {
		e = "" + e;
		var a = new t(e, n);
		if (!a.valid()) throw new l.InvalidInputException(a.constructor.name, e);
		var o = a.encode();
		o = (0, i.default)(o);
		for (var s = 0; s < o.length; s++) o[s].options = (0, r.default)(n, o[s].options);
		return o;
	}
	function _() {
		return n.default.CODE128 ? "CODE128" : Object.keys(n.default)[0];
	}
	f.prototype.options = function(e) {
		return this._options = (0, r.default)(this._options, e), this;
	}, f.prototype.blank = function(e) {
		var t = Array(e + 1).join("0");
		return this._encodings.push({ data: t }), this;
	}, f.prototype.init = function() {
		if (this._renderProperties) {
			Array.isArray(this._renderProperties) || (this._renderProperties = [this._renderProperties]);
			var e;
			for (var t in this._renderProperties) {
				e = this._renderProperties[t];
				var i = (0, r.default)(this._options, e.options);
				i.format == "auto" && (i.format = _()), this._errorHandler.wrapBarcodeCall(function() {
					var t = i.value, r = n.default[i.format.toUpperCase()], a = g(t, r, i);
					v(e, a, i);
				});
			}
		}
	}, f.prototype.render = function() {
		if (!this._renderProperties) throw new l.NoElementException();
		if (Array.isArray(this._renderProperties)) for (var e = 0; e < this._renderProperties.length; e++) v(this._renderProperties[e], this._encodings, this._options);
		else v(this._renderProperties, this._encodings, this._options);
		return this;
	}, f.prototype._defaults = u.default;
	function v(e, t, n) {
		t = (0, i.default)(t);
		for (var o = 0; o < t.length; o++) t[o].options = (0, r.default)(n, t[o].options), (0, a.default)(t[o].options);
		(0, a.default)(n);
		var s = e.renderer;
		new s(e.element, t, n).render(), e.afterRender && e.afterRender();
	}
	typeof window < "u" && (window.JsBarcode = p), typeof jQuery < "u" && (jQuery.fn.JsBarcode = function(e, t) {
		var n = [];
		return jQuery(this).each(function() {
			n.push(this);
		}), p(n, e, t);
	}), t.exports = p;
})))(), 1), Y = /* @__PURE__ */ ((e) => (e[e.Border = -1] = "Border", e[e.Data = 0] = "Data", e[e.Function = 1] = "Function", e[e.Position = 2] = "Position", e[e.Timing = 3] = "Timing", e[e.Alignment = 4] = "Alignment", e))(Y || {}), je = [0, 1], Me = [1, 0], Ne = [2, 3], Pe = [3, 2], Fe = {
	L: je,
	M: Me,
	Q: Ne,
	H: Pe
}, Ie = /^\d*$/, Le = /^[A-Z0-9 $%*+./:-]*$/, Re = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:", ze = 1, Be = 40, Ve = 3, He = 3, Ue = 40, We = 10, Ge = [
	[
		-1,
		7,
		10,
		15,
		20,
		26,
		18,
		20,
		24,
		30,
		18,
		20,
		24,
		26,
		30,
		22,
		24,
		28,
		30,
		28,
		28,
		28,
		28,
		30,
		30,
		26,
		28,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30
	],
	[
		-1,
		10,
		16,
		26,
		18,
		24,
		16,
		18,
		22,
		22,
		26,
		30,
		22,
		22,
		24,
		24,
		28,
		28,
		26,
		26,
		26,
		26,
		28,
		28,
		28,
		28,
		28,
		28,
		28,
		28,
		28,
		28,
		28,
		28,
		28,
		28,
		28,
		28,
		28,
		28,
		28
	],
	[
		-1,
		13,
		22,
		18,
		26,
		18,
		24,
		18,
		22,
		20,
		24,
		28,
		26,
		24,
		20,
		30,
		24,
		28,
		28,
		26,
		30,
		28,
		30,
		30,
		30,
		30,
		28,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30
	],
	[
		-1,
		17,
		28,
		22,
		16,
		22,
		28,
		26,
		26,
		24,
		28,
		24,
		28,
		22,
		24,
		24,
		30,
		28,
		28,
		26,
		28,
		30,
		24,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30
	]
], Ke = [
	[
		-1,
		1,
		1,
		1,
		1,
		1,
		2,
		2,
		2,
		2,
		4,
		4,
		4,
		4,
		4,
		6,
		6,
		6,
		6,
		7,
		8,
		8,
		9,
		9,
		10,
		12,
		12,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		19,
		20,
		21,
		22,
		24,
		25
	],
	[
		-1,
		1,
		1,
		1,
		2,
		2,
		4,
		4,
		4,
		5,
		5,
		5,
		8,
		9,
		9,
		10,
		10,
		11,
		13,
		14,
		16,
		17,
		17,
		18,
		20,
		21,
		23,
		25,
		26,
		28,
		29,
		31,
		33,
		35,
		37,
		38,
		40,
		43,
		45,
		47,
		49
	],
	[
		-1,
		1,
		1,
		2,
		2,
		4,
		4,
		6,
		6,
		8,
		8,
		8,
		10,
		12,
		16,
		12,
		17,
		16,
		18,
		21,
		20,
		23,
		23,
		25,
		27,
		29,
		34,
		34,
		35,
		38,
		40,
		43,
		45,
		48,
		51,
		53,
		56,
		59,
		62,
		65,
		68
	],
	[
		-1,
		1,
		1,
		2,
		4,
		4,
		4,
		5,
		6,
		8,
		8,
		11,
		11,
		16,
		16,
		18,
		16,
		19,
		21,
		25,
		25,
		25,
		34,
		30,
		32,
		35,
		37,
		40,
		42,
		45,
		48,
		51,
		54,
		57,
		60,
		63,
		66,
		70,
		74,
		77,
		81
	]
], qe = class {
	constructor(e, t, n, r) {
		if (this.version = e, this.ecc = t, e < ze || e > Be) throw RangeError("Version value out of range");
		if (r < -1 || r > 7) throw RangeError("Mask value out of range");
		this.size = e * 4 + 17;
		let i = Array.from({ length: this.size }).fill(!1);
		for (let e = 0; e < this.size; e++) this.modules.push(i.slice()), this.types.push(i.map(() => 0));
		this.drawFunctionPatterns();
		let a = this.addEccAndInterleave(n);
		if (this.drawCodewords(a), r === -1) {
			let e = 1e9;
			for (let t = 0; t < 8; t++) {
				this.applyMask(t), this.drawFormatBits(t);
				let n = this.getPenaltyScore();
				n < e && (r = t, e = n), this.applyMask(t);
			}
		}
		this.mask = r, this.applyMask(r), this.drawFormatBits(r);
	}
	size;
	mask;
	modules = [];
	types = [];
	getModule(e, t) {
		return e >= 0 && e < this.size && t >= 0 && t < this.size && this.modules[t][e];
	}
	drawFunctionPatterns() {
		for (let e = 0; e < this.size; e++) this.setFunctionModule(6, e, e % 2 == 0, Y.Timing), this.setFunctionModule(e, 6, e % 2 == 0, Y.Timing);
		this.drawFinderPattern(3, 3), this.drawFinderPattern(this.size - 4, 3), this.drawFinderPattern(3, this.size - 4);
		let e = this.getAlignmentPatternPositions(), t = e.length;
		for (let n = 0; n < t; n++) for (let r = 0; r < t; r++) n === 0 && r === 0 || n === 0 && r === t - 1 || n === t - 1 && r === 0 || this.drawAlignmentPattern(e[n], e[r]);
		this.drawFormatBits(0), this.drawVersion();
	}
	drawFormatBits(e) {
		let t = this.ecc[1] << 3 | e, n = t;
		for (let e = 0; e < 10; e++) n = n << 1 ^ (n >>> 9) * 1335;
		let r = (t << 10 | n) ^ 21522;
		for (let e = 0; e <= 5; e++) this.setFunctionModule(8, e, Z(r, e));
		this.setFunctionModule(8, 7, Z(r, 6)), this.setFunctionModule(8, 8, Z(r, 7)), this.setFunctionModule(7, 8, Z(r, 8));
		for (let e = 9; e < 15; e++) this.setFunctionModule(14 - e, 8, Z(r, e));
		for (let e = 0; e < 8; e++) this.setFunctionModule(this.size - 1 - e, 8, Z(r, e));
		for (let e = 8; e < 15; e++) this.setFunctionModule(8, this.size - 15 + e, Z(r, e));
		this.setFunctionModule(8, this.size - 8, !0);
	}
	drawVersion() {
		if (this.version < 7) return;
		let e = this.version;
		for (let t = 0; t < 12; t++) e = e << 1 ^ (e >>> 11) * 7973;
		let t = this.version << 12 | e;
		for (let e = 0; e < 18; e++) {
			let n = Z(t, e), r = this.size - 11 + e % 3, i = Math.floor(e / 3);
			this.setFunctionModule(r, i, n), this.setFunctionModule(i, r, n);
		}
	}
	drawFinderPattern(e, t) {
		for (let n = -4; n <= 4; n++) for (let r = -4; r <= 4; r++) {
			let i = Math.max(Math.abs(r), Math.abs(n)), a = e + r, o = t + n;
			a >= 0 && a < this.size && o >= 0 && o < this.size && this.setFunctionModule(a, o, i !== 2 && i !== 4, Y.Position);
		}
	}
	drawAlignmentPattern(e, t) {
		for (let n = -2; n <= 2; n++) for (let r = -2; r <= 2; r++) this.setFunctionModule(e + r, t + n, Math.max(Math.abs(r), Math.abs(n)) !== 1, Y.Alignment);
	}
	setFunctionModule(e, t, n, r = Y.Function) {
		this.modules[t][e] = n, this.types[t][e] = r;
	}
	addEccAndInterleave(e) {
		let t = this.version, n = this.ecc;
		if (e.length !== ct(t, n)) throw RangeError("Invalid argument");
		let r = Ke[n[0]][t], i = Ge[n[0]][t], a = Math.floor(st(t) / 8), o = r - a % r, s = Math.floor(a / r), c = [], l = lt(i);
		for (let t = 0, n = 0; t < r; t++) {
			let r = e.slice(n, n + s - i + (t < o ? 0 : 1));
			n += r.length;
			let a = ut(r, l);
			t < o && r.push(0), c.push(r.concat(a));
		}
		let u = [];
		for (let e = 0; e < c[0].length; e++) c.forEach((t, n) => {
			(e !== s - i || n >= o) && u.push(t[e]);
		});
		return u;
	}
	drawCodewords(e) {
		if (e.length !== Math.floor(st(this.version) / 8)) throw RangeError("Invalid argument");
		let t = 0;
		for (let n = this.size - 1; n >= 1; n -= 2) {
			n === 6 && (n = 5);
			for (let r = 0; r < this.size; r++) for (let i = 0; i < 2; i++) {
				let a = n - i, o = n + 1 & 2 ? r : this.size - 1 - r;
				!this.types[o][a] && t < e.length * 8 && (this.modules[o][a] = Z(e[t >>> 3], 7 - (t & 7)), t++);
			}
		}
	}
	applyMask(e) {
		if (e < 0 || e > 7) throw RangeError("Mask value out of range");
		for (let t = 0; t < this.size; t++) for (let n = 0; n < this.size; n++) {
			let r;
			switch (e) {
				case 0:
					r = (n + t) % 2 == 0;
					break;
				case 1:
					r = t % 2 == 0;
					break;
				case 2:
					r = n % 3 == 0;
					break;
				case 3:
					r = (n + t) % 3 == 0;
					break;
				case 4:
					r = (Math.floor(n / 3) + Math.floor(t / 2)) % 2 == 0;
					break;
				case 5:
					r = n * t % 2 + n * t % 3 == 0;
					break;
				case 6:
					r = (n * t % 2 + n * t % 3) % 2 == 0;
					break;
				case 7:
					r = ((n + t) % 2 + n * t % 3) % 2 == 0;
					break;
				default: throw Error("Unreachable");
			}
			!this.types[t][n] && r && (this.modules[t][n] = !this.modules[t][n]);
		}
	}
	getPenaltyScore() {
		let e = 0;
		for (let t = 0; t < this.size; t++) {
			let n = !1, r = 0, i = [
				0,
				0,
				0,
				0,
				0,
				0,
				0
			];
			for (let a = 0; a < this.size; a++) this.modules[t][a] === n ? (r++, r === 5 ? e += Ve : r > 5 && e++) : (this.finderPenaltyAddHistory(r, i), n || (e += this.finderPenaltyCountPatterns(i) * Ue), n = this.modules[t][a], r = 1);
			e += this.finderPenaltyTerminateAndCount(n, r, i) * Ue;
		}
		for (let t = 0; t < this.size; t++) {
			let n = !1, r = 0, i = [
				0,
				0,
				0,
				0,
				0,
				0,
				0
			];
			for (let a = 0; a < this.size; a++) this.modules[a][t] === n ? (r++, r === 5 ? e += Ve : r > 5 && e++) : (this.finderPenaltyAddHistory(r, i), n || (e += this.finderPenaltyCountPatterns(i) * Ue), n = this.modules[a][t], r = 1);
			e += this.finderPenaltyTerminateAndCount(n, r, i) * Ue;
		}
		for (let t = 0; t < this.size - 1; t++) for (let n = 0; n < this.size - 1; n++) {
			let r = this.modules[t][n];
			r === this.modules[t][n + 1] && r === this.modules[t + 1][n] && r === this.modules[t + 1][n + 1] && (e += He);
		}
		let t = 0;
		for (let e of this.modules) t = e.reduce((e, t) => e + +!!t, t);
		let n = this.size * this.size, r = Math.ceil(Math.abs(t * 20 - n * 10) / n) - 1;
		return e += r * We, e;
	}
	getAlignmentPatternPositions() {
		if (this.version === 1) return [];
		{
			let e = Math.floor(this.version / 7) + 2, t = this.version === 32 ? 26 : Math.ceil((this.version * 4 + 4) / (e * 2 - 2)) * 2, n = [6];
			for (let r = this.size - 7; n.length < e; r -= t) n.splice(1, 0, r);
			return n;
		}
	}
	finderPenaltyCountPatterns(e) {
		let t = e[1], n = t > 0 && e[2] === t && e[3] === t * 3 && e[4] === t && e[5] === t;
		return (n && e[0] >= t * 4 && e[6] >= t ? 1 : 0) + (n && e[6] >= t * 4 && e[0] >= t ? 1 : 0);
	}
	finderPenaltyTerminateAndCount(e, t, n) {
		return e && (this.finderPenaltyAddHistory(t, n), t = 0), t += this.size, this.finderPenaltyAddHistory(t, n), this.finderPenaltyCountPatterns(n);
	}
	finderPenaltyAddHistory(e, t) {
		t[0] === 0 && (e += this.size), t.pop(), t.unshift(e);
	}
};
function X(e, t, n) {
	if (t < 0 || t > 31 || e >>> t) throw RangeError("Value out of range");
	for (let r = t - 1; r >= 0; r--) n.push(e >>> r & 1);
}
function Z(e, t) {
	return !!(e >>> t & 1);
}
var Je = class {
	constructor(e, t, n) {
		if (this.mode = e, this.numChars = t, this.bitData = n, t < 0) throw RangeError("Invalid argument");
		this.bitData = n.slice();
	}
	getData() {
		return this.bitData.slice();
	}
}, Ye = [
	1,
	10,
	12,
	14
], Xe = [
	2,
	9,
	11,
	13
], Ze = [
	4,
	8,
	16,
	16
];
function Qe(e, t) {
	return e[Math.floor((t + 7) / 17) + 1];
}
function $e(e) {
	let t = [];
	for (let n of e) X(n, 8, t);
	return new Je(Ze, e.length, t);
}
function et(e) {
	if (!rt(e)) throw RangeError("String contains non-numeric characters");
	let t = [];
	for (let n = 0; n < e.length;) {
		let r = Math.min(e.length - n, 3);
		X(Number.parseInt(e.substring(n, n + r), 10), r * 3 + 1, t), n += r;
	}
	return new Je(Ye, e.length, t);
}
function tt(e) {
	if (!it(e)) throw RangeError("String contains unencodable characters in alphanumeric mode");
	let t = [], n = 0;
	for (; n + 2 <= e.length; n += 2) {
		let r = Re.indexOf(e.charAt(n)) * 45;
		r += Re.indexOf(e.charAt(n + 1)), X(r, 11, t);
	}
	return n < e.length && X(Re.indexOf(e.charAt(n)), 6, t), new Je(Xe, e.length, t);
}
function nt(e) {
	return e === "" ? [] : rt(e) ? [et(e)] : it(e) ? [tt(e)] : [$e(ot(e))];
}
function rt(e) {
	return Ie.test(e);
}
function it(e) {
	return Le.test(e);
}
function at(e, t) {
	let n = 0;
	for (let r of e) {
		let e = Qe(r.mode, t);
		if (r.numChars >= 1 << e) return Infinity;
		n += 4 + e + r.bitData.length;
	}
	return n;
}
function ot(e) {
	e = encodeURI(e);
	let t = [];
	for (let n = 0; n < e.length; n++) e.charAt(n) === "%" ? (t.push(Number.parseInt(e.substring(n + 1, n + 3), 16)), n += 2) : t.push(e.charCodeAt(n));
	return t;
}
function st(e) {
	if (e < ze || e > Be) throw RangeError("Version number out of range");
	let t = (16 * e + 128) * e + 64;
	if (e >= 2) {
		let n = Math.floor(e / 7) + 2;
		t -= (25 * n - 10) * n - 55, e >= 7 && (t -= 36);
	}
	return t;
}
function ct(e, t) {
	return Math.floor(st(e) / 8) - Ge[t[0]][e] * Ke[t[0]][e];
}
function lt(e) {
	if (e < 1 || e > 255) throw RangeError("Degree out of range");
	let t = [];
	for (let n = 0; n < e - 1; n++) t.push(0);
	t.push(1);
	let n = 1;
	for (let r = 0; r < e; r++) {
		for (let e = 0; e < t.length; e++) t[e] = dt(t[e], n), e + 1 < t.length && (t[e] ^= t[e + 1]);
		n = dt(n, 2);
	}
	return t;
}
function ut(e, t) {
	let n = t.map((e) => 0);
	for (let r of e) {
		let e = r ^ n.shift();
		n.push(0), t.forEach((t, r) => n[r] ^= dt(t, e));
	}
	return n;
}
function dt(e, t) {
	if (e >>> 8 || t >>> 8) throw RangeError("Byte out of range");
	let n = 0;
	for (let r = 7; r >= 0; r--) n = n << 1 ^ (n >>> 7) * 285, n ^= (t >>> r & 1) * e;
	return n;
}
function ft(e, t, n = 1, r = 40, i = -1, a = !0) {
	if (!(ze <= n && n <= r && r <= Be) || i < -1 || i > 7) throw RangeError("Invalid value");
	let o, s;
	for (o = n;; o++) {
		let n = ct(o, t) * 8, i = at(e, o);
		if (i <= n) {
			s = i;
			break;
		}
		if (o >= r) throw RangeError("Data too long");
	}
	for (let e of [
		Me,
		Ne,
		Pe
	]) a && s <= ct(o, e) * 8 && (t = e);
	let c = [];
	for (let t of e) {
		X(t.mode[0], 4, c), X(t.numChars, Qe(t.mode, o), c);
		for (let e of t.getData()) c.push(e);
	}
	let l = ct(o, t) * 8;
	X(0, Math.min(4, l - c.length), c), X(0, (8 - c.length % 8) % 8, c);
	for (let e = 236; c.length < l; e ^= 253) X(e, 8, c);
	let u = Array.from({ length: Math.ceil(c.length / 8) }, () => 0);
	return c.forEach((e, t) => u[t >>> 3] |= e << 7 - (t & 7)), new qe(o, t, u, i);
}
function pt(e, t) {
	let { ecc: n = "L", boostEcc: r = !1, minVersion: i = 1, maxVersion: a = 40, maskPattern: o = -1, border: s = 1 } = t || {}, c = typeof e == "string" ? nt(e) : Array.isArray(e) ? [$e(e)] : void 0;
	if (!c) throw Error(`uqr only supports encoding string and binary data, but got: ${typeof e}`);
	let l = ft(c, Fe[n], i, a, o, r), u = mt({
		version: l.version,
		maskPattern: l.mask,
		size: l.size,
		data: l.modules,
		types: l.types
	}, s);
	return t?.invert && (u.data = u.data.map((e) => e.map((e) => !e))), t?.onEncoded?.(u), u;
}
function mt(e, t = 1) {
	if (!t) return e;
	let { size: n } = e, r = n + t * 2;
	e.size = r, e.data.forEach((e) => {
		for (let n = 0; n < t; n++) e.unshift(!1), e.push(!1);
	});
	for (let n = 0; n < t; n++) e.data.unshift(Array.from({ length: r }, (e) => !1)), e.data.push(Array.from({ length: r }, (e) => !1));
	let i = Y.Border;
	e.types.forEach((e) => {
		for (let n = 0; n < t; n++) e.unshift(i), e.push(i);
	});
	for (let n = 0; n < t; n++) e.types.unshift(Array.from({ length: r }, (e) => i)), e.types.push(Array.from({ length: r }, (e) => i));
	return e;
}
//#endregion
//#region src/receipt.js
var ht = {
	merchant: {
		name: "AURA ARTISAN CAFÉ",
		address: ["742 Evergreen Terrace, Suite 100"],
		phone: "(555) 019-2834"
	},
	orderId: "4892",
	issuedAt: "2026-08-27T00:00:00Z",
	timeZone: "UTC",
	locale: "en-US",
	currency: "USD",
	items: [
		{
			id: "cortado",
			name: "Oat Milk Cortado",
			quantity: 1,
			unitAmount: 550
		},
		{
			id: "croissant",
			name: "Pistachio Croissant",
			quantity: 1,
			unitAmount: 625
		},
		{
			id: "drip",
			name: "Single Origin Drip",
			quantity: 1,
			unitAmount: 400
		}
	],
	taxBasisPoints: 850,
	payment: {
		method: "Apple Pay",
		last4: "4920",
		authorization: "829401928402"
	},
	footer: "Thank you for visiting!"
};
function gt(e, t) {
	if (!Array.isArray(e) || e.length === 0) throw TypeError("A receipt needs at least one item.");
	if (!Number.isSafeInteger(t) || t < 0 || t > 1e4) throw RangeError("taxBasisPoints must be an integer from 0 to 10000.");
	let n = e.reduce((e, t) => {
		if (!Number.isSafeInteger(t.quantity) || t.quantity < 1 || !Number.isSafeInteger(t.unitAmount) || t.unitAmount < 0) throw RangeError("Use a positive integer quantity and a nonnegative integer unitAmount.");
		let n = e + t.quantity * t.unitAmount;
		if (!Number.isSafeInteger(n)) throw RangeError("Receipt amount is too large.");
		return n;
	}, 0), r = n * t;
	if (!Number.isSafeInteger(r)) throw RangeError("Receipt tax is too large.");
	let i = Math.round(r / 1e4), a = n + i;
	if (!Number.isSafeInteger(a)) throw RangeError("Receipt total is too large.");
	return {
		subtotal: n,
		tax: i,
		total: a
	};
}
function _t(e, t) {
	let n = new Intl.NumberFormat(e, {
		style: "currency",
		currency: t
	}), r = 10 ** n.resolvedOptions().maximumFractionDigits;
	return (e) => n.format(e / r);
}
function vt(e, t, n) {
	let r = new Date(e), i = new Intl.DateTimeFormat(t, {
		day: "2-digit",
		month: "short",
		year: "numeric",
		timeZone: n
	}).formatToParts(r), a = (e) => i.find((t) => t.type === e).value, o = `${a("day")} ${a("month")} ${a("year")}`, s = new Intl.DateTimeFormat(t, {
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23",
		timeZone: n
	}).format(r);
	return `${o.toUpperCase()} ${s}`;
}
//#endregion
//#region src/tearGesture.js
function yt(e, t, n, r, i) {
	return Math.max(Math.abs(r), Math.abs(i)) < 10 ? null : Math.abs(r) > Math.abs(i) ? "horizontal" : e === "front" && t !== "mouse" && !n ? "scroll" : "vertical";
}
function bt(e, t, n) {
	return t === "horizontal" ? e === "front" ? 34 : Math.min(72, Math.max(36, n * .28)) : e === "up" ? 40 : 32;
}
function xt(e, t) {
	return !(e > 0) || !(t > 0) ? 0 : e * (2 + 3 * Math.min(1, e / t)) / 5;
}
function St(e, t) {
	let n = Math.max(48, t), r = Math.min(1, Math.max(0, e / n));
	return {
		weight: r * r * (3 - 2 * r),
		slope: 6 * r * (1 - r) / n
	};
}
var Ct = (e) => Math.min(1, Math.max(0, e)), wt = (e) => {
	let t = Ct(e);
	return t * t * (3 - 2 * t);
};
function Tt(e) {
	let t = Ct((e - .36) / .64);
	return {
		peel: wt(e / .36),
		release: t,
		flutter: Math.sin(t * Math.PI * 2.5) * (1 - t)
	};
}
function Et(e, t) {
	let { release: n, flutter: r } = Tt(e), i = Math.sign(t.x || 1);
	return {
		x: t.x * n * n,
		y: t.lift * Math.sin(Math.PI * n) + 170 * n * n,
		rotation: t.rotation * n + i * r * 2,
		opacity: 1 - wt((n - .7) / .3)
	};
}
function Dt(e, t, n) {
	let { anchor: r = 0, lever: i = 48, x: a = 0, y: o = 0, direction: s = 1, torn: c = !1, peel: l = 0, release: u = 0, flutter: d = 0, side: f = 1 } = n, p = s * (t - r), m = Math.max(48, i), h = Math.max(-m * .55, Math.min(m * .55, a)), g = St(p, m), _ = Ct(p / m), v = 0;
	for (let e = 0; e < 8; e++) {
		let t = _ * (e + .5) / 8, n = h * 6 * t * (1 - t) / m;
		v += (1 - Math.sqrt(1 - n * n)) * m * _ / 8;
	}
	let y = Math.min(160, Math.max(72, m * .65)), b = c ? f > 0 ? 1 - l * 1.08 : l * 1.08 : +(f > 0), x = (f > 0 ? 1 - b : b) * e, S = Math.hypot(x, y), C = c ? Math.min(1.25, 1.1 * Math.sin(l * Math.PI * .75) + Math.abs(o) / 100) * (1 - u * .75) : 0;
	return {
		width: e,
		anchor: r,
		position: t,
		distance: p,
		depth: y,
		side: f,
		centerX: e / 2 + h * g.weight + d * 7 * Math.sin(Math.PI * Ct(p / 500)),
		centerY: t + o * g.weight - s * v,
		tilt: Math.max(-.24, Math.min(.24, -s * Math.atan(h * g.slope + (p > 0 && p < 500 ? d * 7 * Math.PI / 500 * Math.cos(Math.PI * p / 500) : 0)))),
		crease: b + f * p / y * (f > 0 ? 1 - b : b),
		hinge: (b - .5) * e,
		axisX: f * x / S,
		axisY: s * y / S,
		fold: C,
		flutter: d
	};
}
function Q(e, t) {
	let n = (t - .5) * e.width, r = e.position - e.anchor;
	if (e.distance >= 0 && e.distance < e.depth && e.side * (t - e.crease) > 0) {
		let t = n - e.hinge, i = e.axisX * t + e.axisY * r, a = Math.cos(e.fold);
		n = e.hinge + t * a + e.axisX * i * (1 - a), r = r * a + e.axisY * i * (1 - a);
	}
	let i = r - (e.position - e.anchor);
	return [e.centerX + n * Math.cos(e.tilt) - i * Math.sin(e.tilt), e.centerY + n * Math.sin(e.tilt) + i * Math.cos(e.tilt)];
}
function Ot(e, t, n) {
	let { anchor: r, lever: i, direction: a, torn: o } = n, s = Math.max(n.start ?? 0, o && a > 0 ? r : 0), c = Math.min(n.end ?? t, o && a < 0 ? r : t), l = [.../* @__PURE__ */ new Set([
		s,
		c,
		...Array.from({ length: 25 }, (e, n) => t * n / 24),
		r,
		r - 32,
		r + 32,
		r + a * 72,
		r + a * 160,
		Math.max(0, Math.min(t, r + a * i))
	])].filter((e) => e >= s && e <= c).sort((e, t) => e - t), u = [], d = [];
	for (let t of l) {
		let r = Dt(e, t, n);
		u.push(Q(r, 0)), d.push(Q(r, 1));
	}
	let f = Math.max(1, Math.floor(e / 5)), p = (t, r, i) => {
		let a = Dt(e, t, n);
		return Array.from({ length: f }, (e, t) => {
			let n = (t + 1) / (f + 1), o = Q(a, r ? 1 - n : n);
			return o[1] += i * (.35 + t * 7 % 11 / 8 + (t % 3 == 0 ? .6 : 0)), o;
		});
	};
	return [
		...u,
		...p(c, !1, -1),
		...d.reverse(),
		...p(s, !0, 1)
	].map((e, t) => `${t ? "L" : "M"}${e.map((e) => e.toFixed(2)).join(",")}`).join(" ") + " Z";
}
function kt(e, t, n, r, i = .5) {
	let a = Math.min(3, Math.hypot(n, r)), o = Math.abs(t) > 4 ? Math.sign(t) : i < .5 ? -1 : 1;
	return {
		x: o * Math.min(168, 42 + Math.abs(n) * 42),
		lift: Math.max(-65, Math.min(55, r * 35 + (e === "up" ? -24 : 8))),
		rotation: o * (5 + a * 3),
		duration: Math.round(960 - Math.min(200, a * 100))
	};
}
function At(e, t, n, r) {
	let i = Math.min(1 / 30, Math.max(0, r)), a = t + (280 * (n - e) - 26 * t) * i;
	return {
		value: e + a * i,
		velocity: a
	};
}
function jt(e, t) {
	return Math.min(16e3, Math.max(e, e * t / 650));
}
//#endregion
//#region src/paperSurface.js
function Mt(e, t) {
	return Math.min(2, Math.sqrt(4e6 / (e * t)), 16e3 / Math.max(e, t));
}
async function Nt(e) {
	let { toCanvas: t } = await import("./chunks/es.js");
	await document.fonts?.ready;
	let n = e.offsetWidth, r = e.offsetHeight, i = await t(e, {
		width: n,
		height: r,
		pixelRatio: Mt(n, r),
		skipFonts: !0,
		filter: (e) => !e.classList?.contains("vp-paper-surface") && !e.classList?.contains("vp-paper-grip"),
		style: {
			transform: "none",
			visibility: "visible"
		}
	});
	if (!i.width || !i.height) throw i.width = 0, Error("The paper bitmap has no drawable pixels.");
	return {
		texture: i,
		width: n,
		height: r,
		paperColor: getComputedStyle(e).backgroundColor
	};
}
function Pt(e, t, n = {}) {
	let { texture: r, width: i, height: a } = t, o = n.direction || 1, s = n.anchor ?? (o > 0 ? 0 : a), c = n.lever || a, l = n.x || 0, u = n.y || 0, d = !!n.tearAt, { peel: f, release: p, flutter: m } = d ? Tt(n.tearProgress ?? (performance.now() - n.tearAt) / n.tearDuration) : {
		peel: 0,
		release: 0,
		flutter: 0
	}, h = n.tearSide || 1, g = o > 0 ? 128 : Math.ceil(Math.max(128, i * .7)), _ = i + g * 2, v = a + g * 2, y = Mt(_, v), b = Math.max(1, Math.floor(_ * y)), x = Math.max(1, Math.floor(v * y));
	(e.width !== b || e.height !== x || e.style.width !== `${_}px` || e.style.height !== `${v}px`) && (e.width = b, e.height = x, Object.assign(e.style, {
		left: `${-g}px`,
		top: `${-g}px`,
		width: `${_}px`,
		height: `${v}px`
	}));
	let S = e.getContext("2d");
	S.setTransform(y, 0, 0, y, g * y, g * y), S.clearRect(-g, -g, _, v), S.save();
	let C = {
		anchor: s,
		lever: c,
		x: l,
		y: u,
		direction: o,
		torn: d,
		peel: f,
		side: h,
		release: p,
		flutter: m,
		start: n.start,
		end: n.end
	};
	if (S.clip(new Path2D(Ot(i, a, C))), S.fillStyle = t.paperColor || "#fff", S.fillRect(-g, -g, _, v), !l && !u && !d) S.drawImage(r, 0, 0, i, a);
	else {
		let e = Math.max(n.start ?? 0, d && o > 0 ? s : 0), t = Math.min(n.end ?? a, d && o < 0 ? s : a), c = Math.max(6, a / 512);
		for (let n = e; n < t; n += c) {
			let e = Math.min(c, t - n), o = Dt(i, n, C), s = Dt(i, n + e, C), l = d && (o.distance >= 0 && o.distance < o.depth || s.distance >= 0 && s.distance < s.depth) ? [.../* @__PURE__ */ new Set([
				0,
				1,
				...Array.from({ length: 7 }, (e, t) => (t + 1) / 8),
				Math.max(0, Math.min(1, o.crease)),
				Math.max(0, Math.min(1, s.crease))
			])].sort((e, t) => e - t) : [0, 1];
			for (let t = 0; t < l.length - 1; t++) {
				let c = l[t], u = l[t + 1], d = (u - c) * i;
				if (d < .001) continue;
				let f = Q(o, c), p = Q(o, u), m = Q(s, c), h = Q(s, u), g = (t, o, s, l) => {
					S.save(), S.beginPath();
					let f = Math.sign((t[1][0] - t[0][0]) * (t[2][1] - t[0][1]) - (t[1][1] - t[0][1]) * (t[2][0] - t[0][0])) || 1, p = t.map((e, n) => {
						let r = t[(n + 2) % 3], i = t[(n + 1) % 3], a = [e[0] - r[0], e[1] - r[1]], o = [i[0] - e[0], i[1] - e[1]], s = Math.max(.001, Math.hypot(...a)), c = Math.max(.001, Math.hypot(...o)), l = [f * a[1] / s, -f * a[0] / s], u = [f * o[1] / c, -f * o[0] / c], d = Math.min(2, .4 / Math.max(.02, 1 + l[0] * u[0] + l[1] * u[1]));
						return [e[0] + (l[0] + u[0]) * d, e[1] + (l[1] + u[1]) * d];
					});
					S.moveTo(...p[0]), S.lineTo(...p[1]), S.lineTo(...p[2]), S.closePath(), S.clip(), S.transform(o[0] / d, o[1] / d, s[0] / e, s[1] / e, ...l);
					let m = Math.min(.4, c * i), h = Math.min(.4, (1 - u) * i), g = Math.min(.4, n), _ = Math.min(.4, a - n - e);
					S.drawImage(r, (c * i - m) * r.width / i, (n - g) * r.height / a, (d + m + h) * r.width / i, (e + g + _) * r.height / a, -m, -g, d + m + h, e + g + _), S.restore();
				};
				if (o.crease < s.crease) g([
					f,
					p,
					h
				], [p[0] - f[0], p[1] - f[1]], [h[0] - p[0], h[1] - p[1]], f), g([
					f,
					h,
					m
				], [h[0] - m[0], h[1] - m[1]], [m[0] - f[0], m[1] - f[1]], f);
				else {
					g([
						f,
						p,
						m
					], [p[0] - f[0], p[1] - f[1]], [m[0] - f[0], m[1] - f[1]], f);
					let e = [h[0] - m[0], h[1] - m[1]];
					g([
						p,
						h,
						m
					], e, [h[0] - p[0], h[1] - p[1]], [p[0] - e[0], p[1] - e[1]]);
				}
			}
		}
	}
	if (d && f > 0) {
		let e = [], t = [], n = Dt(i, s, C);
		for (let r = 0; r <= Math.ceil(n.depth / 4); r++) {
			let a = Dt(i, s + o * Math.min(n.depth, r * 4), C), c = Math.max(0, Math.min(1, a.crease));
			e.push(Q(a, c)), t.push(Q(a, +(h > 0)));
		}
		S.beginPath(), S.moveTo(...e[0]);
		for (let n of [...t, ...e.reverse()]) S.lineTo(...n);
		S.closePath(), S.fillStyle = `rgba(0,0,0,${.16 * (1 - Math.cos(n.fold))})`, S.fill();
	}
	if (l || u) {
		let e = S.createLinearGradient(i * (n.grip ?? .5), s, i * (1 - (n.grip ?? .5)), s + o * c);
		e.addColorStop(0, "#00000000"), e.addColorStop(.35, "#00000005"), e.addColorStop(.52, "#ffffff12"), e.addColorStop(1, "#00000000"), S.globalAlpha = Math.min(1, Math.hypot(l, u) / 45), S.fillStyle = e, S.fillRect(-g, -g, _, v);
	}
	S.restore();
}
//#endregion
//#region src/VirtualPrinter.jsx
var $ = typeof window > "u" ? s : u, Ft = 3400, It = 900;
function Lt() {
	return /* @__PURE__ */ g("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ h("path", { d: "M6 8V3h12v5M6 17H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }), /* @__PURE__ */ h("path", { d: "M6 14h12v7H6zM17 11h1" })]
	});
}
function Rt({ value: e }) {
	let t = f(null);
	return $(() => {
		(0, Ae.default)(t.current, e, {
			format: "CODE128",
			displayValue: !1,
			height: 34,
			width: 2,
			margin: 10,
			background: "#171717",
			lineColor: "#ffffff"
		});
	}, [e]), /* @__PURE__ */ h("svg", {
		className: "vp-barcode",
		ref: t,
		preserveAspectRatio: "none",
		role: "img",
		"aria-label": `Authorization barcode ${e}`
	});
}
function zt({ logo: e }) {
	return e && typeof e == "string" ? /* @__PURE__ */ h("img", {
		className: "vp-markup-logo-image",
		src: e,
		alt: ""
	}) : e || /* @__PURE__ */ h("span", {
		className: "vp-markup-logo-mark",
		"aria-hidden": "true"
	});
}
function Bt({ text: e }) {
	let t = d(() => {
		try {
			let t = pt(e || " ", {
				ecc: "M",
				border: 2
			}), n = [];
			return t.data.forEach((e, t) => {
				e.forEach((e, r) => {
					e && n.push(`M${r} ${t}h1v1h-1z`);
				});
			}), {
				d: n.join(""),
				size: t.size
			};
		} catch {
			return null;
		}
	}, [e]);
	return t ? /* @__PURE__ */ h("svg", {
		className: "vp-markup-qr-svg",
		viewBox: `0 0 ${t.size} ${t.size}`,
		"aria-hidden": "true",
		children: /* @__PURE__ */ h("path", { d: t.d })
	}) : /* @__PURE__ */ h("span", {
		className: "vp-markup-qr-box",
		"aria-hidden": "true",
		children: "QR"
	});
}
function Vt({ part: e }) {
	let t = [e.bold && "vp-markup-bold", e.right && "vp-markup-part--right"].filter(Boolean).join(" ");
	if (!e.doubleHeight && !e.doubleWidth) return /* @__PURE__ */ h("span", {
		className: t || void 0,
		children: e.text
	});
	let n = Array.from(e.text).length * (e.doubleWidth ? 2 : 1), r = e.doubleHeight && e.doubleWidth ? "vp-markup-double" : e.doubleHeight ? "vp-markup-double-height" : "vp-markup-double-width";
	return /* @__PURE__ */ h("span", {
		className: `${r} ${t}`.trim(),
		style: { width: `${n}ch` },
		children: /* @__PURE__ */ h("span", { children: e.text })
	});
}
function Ht({ part: e, logo: t }) {
	return e.type === "logo" ? /* @__PURE__ */ h("span", {
		className: "vp-markup-logo",
		children: /* @__PURE__ */ h(zt, { logo: t })
	}) : e.type === "qr" ? /* @__PURE__ */ g("span", {
		className: `vp-markup-qr ${e.center ? "vp-markup-qr--center" : ""} ${e.right ? "vp-markup-qr--right" : ""}`,
		role: "img",
		"aria-label": `QR code: ${e.text || "empty"}`,
		children: [/* @__PURE__ */ h(Bt, { text: e.text }), /* @__PURE__ */ h("code", {
			className: "vp-markup-qr-value",
			children: e.text
		})]
	}) : e.type === "control" ? /* @__PURE__ */ h("span", {
		className: `vp-markup-control vp-markup-control--${e.control}`,
		role: "img",
		"aria-label": e.control === "cut" ? "Paper cut" : "Printer plugin command"
	}) : /* @__PURE__ */ h(Vt, { part: e });
}
function Ut({ content: e, logo: t }) {
	let r = n(e);
	return /* @__PURE__ */ h("div", {
		className: "vp-markup-content",
		role: "document",
		"aria-label": "Printer document",
		children: r.map((e, n) => /* @__PURE__ */ h("div", {
			className: `vp-markup-line ${e.center ? "vp-markup-line--center" : ""} ${e.right ? "vp-markup-line--right" : ""}`,
			children: e.parts.map((e, n) => /* @__PURE__ */ h(Ht, {
				part: e,
				logo: t
			}, n))
		}, n))
	});
}
function Wt(e) {
	let [t, n] = p(null);
	return s(() => {
		if (!e) return;
		let t = !0;
		return import("./chunks/TabletopPrinter.js").then((e) => {
			t && n(() => e.TabletopPrinter);
		}), () => {
			t = !1;
		};
	}, [e]), e ? t : null;
}
function Gt({ ticket: e }) {
	let t = a(e);
	return /* @__PURE__ */ g("div", {
		className: "vp-ticket-content",
		role: "document",
		"aria-label": "Quick ticket",
		children: [
			/* @__PURE__ */ g("header", {
				className: "vp-ticket-heading",
				children: [/* @__PURE__ */ h("h2", { children: t.title }), t.subtitle && /* @__PURE__ */ h("p", { children: t.subtitle })]
			}),
			/* @__PURE__ */ h("div", {
				className: "vp-ticket-lines",
				children: t.lines.map((e) => /* @__PURE__ */ h("div", { children: e.text }, e.id))
			}),
			/* @__PURE__ */ h("div", {
				className: "vp-ticket-items",
				children: t.items.map((e) => /* @__PURE__ */ g("div", {
					className: "vp-ticket-row",
					children: [/* @__PURE__ */ h("span", { children: e.label }), e.amount && /* @__PURE__ */ h("strong", { children: e.amount })]
				}, e.id))
			}),
			t.total && /* @__PURE__ */ g("div", {
				className: "vp-ticket-total",
				children: [/* @__PURE__ */ h("span", { children: "Total" }), /* @__PURE__ */ h("strong", { children: t.total })]
			}),
			t.footer && /* @__PURE__ */ h("footer", {
				className: "vp-ticket-footer",
				children: t.footer
			})
		]
	});
}
var Kt = o(function({ receipt: e, content: t, ticket: n, logo: r, initiallyPrinted: i = !1, orientation: a = "front", scrollable: o = !0, controls: u = !0, paperMaxHeight: d, resetKey: _, onPhaseChange: v, onPrintStart: y, onPrinted: b, onTear: x, className: S = "" }, C) {
	let w = t != null, T = n != null, E = e != null;
	if ([
		E,
		w,
		T
	].filter(Boolean).length !== 1) throw TypeError("VirtualPrinter requires exactly one of receipt, content, or ticket.");
	if (w && typeof t != "string") throw TypeError("content must be a string.");
	if (E && (typeof e != "object" || Array.isArray(e))) throw TypeError("receipt must be an object.");
	if (a !== "front" && a !== "up") throw TypeError("orientation must be \"front\" or \"up\".");
	let ee = c(), D = c(), te = f(0), ne = f(null), O = f(null), k = f(null), A = f(null), j = f(0), M = f(0), N = f(null), P = f(null), [re, F] = p(!1), ie = f(_), ae = f(i ? "printed" : "ready"), [I, L] = p(() => ({
		id: 0,
		phase: i ? "printed" : "ready",
		receipt: w || T ? null : e,
		content: w ? t : null,
		ticket: T && !w ? n : null
	})), R = f(I.phase);
	R.current = I.phase, l(C, () => ({
		print: ge,
		tear: () => fe()
	}));
	let z = I.phase === "printing", B = I.phase === "tearing", V = I.phase === "ready" ? {
		receipt: w || T ? null : e,
		content: w ? t : null,
		ticket: T && !w ? n : null
	} : I, H = V.receipt, U = V.content !== null, W = !U && V.ticket !== null, G = o !== !1, oe = Wt(a === "up"), K = null;
	if (!U && !W) try {
		if (!H?.merchant || !H.payment) throw TypeError("Receipt is missing merchant or payment.");
		if (typeof H.payment.authorization != "string" || H.payment.authorization.length === 0) throw TypeError("Receipt authorization must be a nonempty string.");
		K = {
			data: H,
			totals: gt(H.items, H.taxBasisPoints),
			money: _t(H.locale, H.currency),
			taxRate: new Intl.NumberFormat(H.locale, { maximumFractionDigits: 2 }).format(H.taxBasisPoints / 100),
			issued: vt(H.issuedAt, H.locale, H.timeZone)
		};
	} catch (e) {
		K = { error: e instanceof Error ? e.message : "This receipt could not be printed." };
	}
	let se = z ? "Printing your receipt" : B ? "Tearing off receipt" : I.phase === "printed" ? "Receipt printed" : "Ready to print";
	s(() => {
		let e = ae.current;
		e !== I.phase && (v?.(I.phase), I.phase === "printing" && y?.(), I.phase === "printed" && b?.(), I.phase === "ready" && e === "tearing" && x?.()), ae.current = I.phase;
	}, [
		I.phase,
		v,
		y,
		b,
		x
	]), $(() => {
		ie.current !== _ && (q(), ie.current = _, k.current = null, O.current?.closest(".vp")?.removeAttribute("data-dragging"), O.current?.removeAttribute("data-tear-axis"), O.current?.parentElement?.style.removeProperty("--vp-tear-time"), te.current = 0, L((e) => ({
			...e,
			id: 0,
			phase: "ready"
		})));
	}, [_]), $(() => {
		let e = O.current?.querySelector(".vp-paper"), t = e?.querySelector(".vp-markup-content");
		if (!t || B) return;
		let n = 0, r = 0, i = 0, a = () => {
			let i = t.clientWidth, a = parseFloat(getComputedStyle(e).fontSize);
			if (i <= 1 || !Number.isFinite(a) || i === n && a === r) return;
			n = i, r = a, t.style.fontSize = `${a}px`;
			let o = i;
			for (let e of t.children) o = Math.max(o, e.scrollWidth);
			o > i && (t.style.fontSize = `${a * (i - 1) / o}px`);
		};
		if (a(), typeof ResizeObserver > "u") return;
		let o = new ResizeObserver(() => {
			cancelAnimationFrame(i), i = requestAnimationFrame(a);
		});
		return o.observe(e), () => {
			o.disconnect(), cancelAnimationFrame(i);
		};
	}, [
		V.content,
		r,
		a,
		I.id,
		I.phase
	]), $(() => {
		let e = O.current?.querySelector(".vp-paper"), t = N.current;
		if (I.phase === "ready" || !e) {
			F(!1);
			return;
		}
		try {
			if (!t.getContext("2d")) {
				F(!1);
				return;
			}
		} catch {
			F(!1);
			return;
		}
		let n = !1, r = 0, i = 0, o = "", s = async () => {
			let i = `${e.offsetWidth}:${e.offsetHeight}`;
			if (n || !e.offsetWidth || !e.offsetHeight || o === i) return;
			o = i;
			let s = ++r;
			k.current = null, q(), e.removeAttribute("data-raster-ready"), P.current && (P.current.texture.width = 0), P.current = null, F(e.closest(".vp").dataset.phase === "printing");
			let c = window.setTimeout(() => {
				!n && s === r && (r++, F(!1));
			}, 5e3);
			try {
				let i = await Nt(e);
				if (n || s !== r) {
					i.texture.width = 0;
					return;
				}
				P.current = i, Pt(t, i, A.current || { direction: a === "up" ? -1 : 1 }), e.dataset.rasterReady = "true";
			} catch {
				!n && s === r && (P.current && (P.current.texture.width = 0), P.current = null, e.removeAttribute("data-raster-ready"), t.width = t.height = 1);
			} finally {
				window.clearTimeout(c), !n && s === r && F(!1);
			}
		};
		s();
		let c = typeof ResizeObserver > "u" ? null : new ResizeObserver(() => {
			cancelAnimationFrame(i), i = requestAnimationFrame(s);
		});
		return c?.observe(e), () => {
			n = !0, c?.disconnect(), cancelAnimationFrame(i), e.removeAttribute("data-raster-ready"), P.current && (P.current.texture.width = 0), P.current = null, t.width = t.height = 1;
		};
	}, [
		I.id,
		I.phase === "ready",
		a,
		r,
		V.content,
		V.receipt,
		V.ticket
	]), $(() => {
		if (!z) return;
		let e = O.current, t = !1, n = () => {
			let n = e.closest(".vp");
			if (!t) {
				let r = getComputedStyle(n).getPropertyValue("--vp-feed-duration").trim(), i = parseFloat(r) * (r.endsWith("ms") ? 1 : 1e3), o = e.querySelector(".vp-paper").offsetHeight;
				n.style.setProperty("--vp-feed-time", `${jt(Number.isFinite(i) ? i : a === "front" ? 1900 : 2800, o)}ms`), t = !0;
			}
			a === "up" ? n?.style.setProperty("--vp-full-paper-height", `${e.scrollHeight}px`) : (n?.style.setProperty("--vp-full-paper-height", `${e.querySelector(".vp-paper").offsetHeight}px`), n?.style.setProperty("--vp-feed-visible-height", `${e.getBoundingClientRect().height}px`));
		};
		if (n(), typeof ResizeObserver > "u") return;
		let r = new ResizeObserver(n);
		return r.observe(e), a === "front" && r.observe(e.querySelector(".vp-paper")), () => r.disconnect();
	}, [
		a,
		G,
		z,
		I.id
	]), $(() => {
		if (I.phase === "printed" && ae.current === "printing" && a === "up" && G) {
			let e = O.current;
			e.scrollTop = e.scrollHeight - e.clientHeight;
		}
	}, [
		I.phase,
		a,
		G
	]), s(() => () => q(), []), $(() => {
		k.current = null, O.current?.closest(".vp")?.removeAttribute("data-dragging"), q();
	}, [a, G]);
	function q() {
		cancelAnimationFrame(j.current), window.clearTimeout(M.current), j.current = 0, M.current = 0;
		let e = A.current;
		if (e) {
			for (let t of [e.paper, N.current?.parentElement]) t?.style.removeProperty("transform"), t?.style.removeProperty("opacity"), t?.style.removeProperty("transform-origin");
			e.root.removeAttribute("data-flexing"), e.root.removeAttribute("data-dragging"), e.article.style.removeProperty("--vp-scroll-offset"), e.article.style.removeProperty("--vp-cut-top"), e.article.style.removeProperty("--vp-cut-bottom"), e.paper.style.removeProperty("--vp-viewport-height"), P.current && Pt(N.current, P.current, { direction: e.direction }), e.paper.scrollTop = e.scrollTop, A.current = null;
		}
	}
	function ce(e) {
		q();
		let t = O.current, n = t.querySelector(".vp-paper"), r = n.getBoundingClientRect(), i = t.getBoundingClientRect(), o = a === "up" ? -1 : 1, s = Math.max(0, Math.min(r.height, (o < 0 ? i.bottom : i.top) - r.top)), c = G ? Math.max(0, i.top - r.top) : 0, l = G ? Math.min(r.height, i.bottom - r.top) : r.height, u = Math.max(48, Math.abs(e.y - r.top - s)), d = r.width ? Math.max(0, Math.min(1, ((e.x ?? r.left + r.width / 2) - r.left) / r.width)) : .5, f = t.closest(".vp");
		t.style.setProperty("--vp-viewport-height", `${i.height}px`), n.style.setProperty("--vp-scroll-offset", `${-e.scrollTop}px`), f.dataset.flexing = "true", A.current = {
			paper: t,
			article: n,
			root: f,
			width: r.width,
			height: r.height,
			anchor: s,
			start: c,
			end: l,
			lever: u,
			grip: d,
			direction: o,
			scrollTop: e.scrollTop,
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			targetX: 0,
			targetY: 0,
			last: performance.now()
		}, le();
	}
	function le() {
		let e = A.current;
		e && P.current && Pt(N.current, P.current, e);
	}
	function ue() {
		let e = performance.now();
		cancelAnimationFrame(j.current), window.clearTimeout(M.current), j.current = 0, M.current = 0;
		let t = A.current;
		if (!t) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			J();
			return;
		}
		if (t.tearAt) {
			if (t.tearProgress = (e - t.tearAt) / t.tearDuration, t.tearProgress >= 1) {
				de();
				return;
			}
			let n = Tt(t.tearProgress);
			t.targetX = t.tearPullX * (1 - n.release * .85) - t.tearSide * n.flutter * 7, t.targetY = t.tearPullY * (1 - n.release);
			let r = Et(t.tearProgress, t.tearMotion), i = P.current ? N.current.parentElement : t.paper;
			i.style.transformOrigin = `${t.width * t.grip}px ${P.current ? t.anchor : t.direction > 0 ? 0 : t.paper.clientHeight}px`, i.style.transform = `translate(${r.x}px, ${r.y}px) rotate(${r.rotation}deg)`, i.style.opacity = r.opacity;
		}
		let n = (e - t.last) / 1e3;
		t.last = e;
		let r = At(t.x, t.vx, t.targetX, n), i = At(t.y, t.vy, t.targetY, n);
		t.x = r.value, t.vx = r.velocity, t.y = i.value, t.vy = i.velocity, le(), !(Math.abs(t.x - t.targetX) + Math.abs(t.y - t.targetY) < .1 && Math.abs(t.vx) + Math.abs(t.vy) < 1) || t.tearAt ? J(!0) : k.current || q();
	}
	function J(e = !1) {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			let e = A.current;
			e.x = e.targetX, e.y = e.targetY, e.vx = 0, e.vy = 0, le(), k.current || q();
			return;
		}
		j.current || (e || (A.current.last = performance.now()), j.current = requestAnimationFrame(ue), document.visibilityState === "visible" && (M.current = window.setTimeout(ue, 32)));
	}
	$(() => {
		B && O.current?.closest(".vp")?.removeAttribute("data-dragging");
	}, [B]);
	function de() {
		let e = O.current, t = e?.closest(".vp");
		t?.dataset.phase === "tearing" && (t.dataset.phase = "ready"), q(), k.current = null, t?.removeAttribute("data-dragging"), e?.removeAttribute("data-tear-axis"), e?.parentElement?.style.removeProperty("--vp-tear-time"), L((e) => e.phase === "tearing" ? {
			...e,
			phase: "ready"
		} : e);
	}
	function fe(e) {
		if (R.current !== "printed") return;
		R.current = "tearing";
		let t = O.current;
		if (!A.current) {
			let e = t.getBoundingClientRect();
			ce({
				scrollTop: t.scrollTop,
				y: e.top + e.height * (a === "up" ? .35 : .65)
			}), A.current.targetX = 24, A.current.targetY = a === "up" ? -6 : 6;
		}
		let n = e?.duration ? e : kt(a, 24, .5, 0, A.current.grip);
		t.parentElement.style.setProperty("--vp-tear-time", `${n.duration}ms`), A.current.tearDuration = n.duration, A.current.tearMotion = n, A.current.tearSide = Math.sign(n.x), A.current.tearPullX = A.current.targetX, A.current.tearPullY = A.current.targetY, A.current.article.style.setProperty("--vp-cut-top", a === "front" ? `${A.current.anchor}px` : "-100vh"), A.current.article.style.setProperty("--vp-cut-bottom", a === "up" ? `${A.current.height - A.current.anchor}px` : "-100vh"), A.current.tearAt = performance.now(), J(), L((e) => e.phase === "printed" ? {
			...e,
			phase: "tearing"
		} : e);
	}
	function pe(e) {
		let t = k.current;
		if (!t || t.id !== e.pointerId) return 0;
		let n = a === "up" ? -1 : 1, r = e.clientX - t.x, i = e.clientY - t.y;
		if (t.axis ||= yt(a, t.pointerType, t.grip, r, i), !t.axis || t.axis === "scroll") return 0;
		A.current || ce(t), e.currentTarget.closest(".vp")?.setAttribute("data-dragging", "true");
		let o = t.axis === "horizontal", s = Math.max(0, n * i), c = o ? Math.abs(r) : s, l = bt(a, t.axis, e.currentTarget.clientWidth), u = Math.min(xt(c, l), a === "front" ? 72 : Math.max(110, e.currentTarget.clientWidth * .65));
		t.sideways = r, t.distance = c;
		let d = Math.max(8, e.timeStamp - (t.lastTime || e.timeStamp));
		return t.vx = r === t.lastX ? (t.vx || 0) * Math.exp(-d / 100) : (r - (t.lastX || 0)) / d, t.vy = i === t.lastY ? (t.vy || 0) * Math.exp(-d / 100) : (i - (t.lastY || 0)) / d, t.lastX = r, t.lastY = i, t.lastTime = e.timeStamp, A.current.targetX = o ? Math.sign(r) * u : Math.max(-35, Math.min(35, r * .45)), A.current.targetY = n * Math.min(14, o ? u * .08 : u * .35), J(), t.distance;
	}
	function me(e, t = !1) {
		let n = k.current;
		if (!n || n.id !== e.pointerId) return;
		let r = t ? n.distance || 0 : pe(e);
		k.current = null;
		let i = e.currentTarget;
		if (!n.axis || n.axis === "scroll") {
			i.closest(".vp")?.removeAttribute("data-dragging");
			return;
		}
		let o = n.axis === "horizontal", s = bt(a, n.axis, i.clientWidth);
		if (!t && r >= s) {
			i.dataset.tearAxis = o ? "horizontal" : "vertical", fe(kt(a, n.sideways || 0, n.vx || 0, n.vy || 0, A.current.grip));
			return;
		}
		i.closest(".vp")?.removeAttribute("data-dragging"), A.current && (A.current.targetX = 0, A.current.targetY = 0, J());
	}
	s(() => {
		I.phase === "ready" && I.id > 0 && ne.current?.focus({ preventScroll: !0 });
	}, [I.phase, I.id]), s(() => {
		O.current && (O.current.scrollTop = 0);
	}, [I.id]), s(() => {
		if (!B) return;
		let e = window.matchMedia("(prefers-reduced-motion: reduce)"), t = () => {
			e.matches && de();
		};
		t(), e.addEventListener("change", t);
		let n = parseFloat(O.current?.parentElement?.style.getPropertyValue("--vp-tear-time")), r = window.setTimeout(de, Number.isFinite(n) ? n + 200 : It);
		return () => {
			window.clearTimeout(r), e.removeEventListener("change", t);
		};
	}, [B]);
	function he() {
		L((e) => e.phase === "printing" ? {
			...e,
			phase: "printed"
		} : e);
	}
	s(() => {
		if (!z) return;
		let e = window.matchMedia("(prefers-reduced-motion: reduce)"), t = () => {
			e.matches && he();
		};
		t(), e.addEventListener("change", t);
		let n = parseFloat(O.current?.closest(".vp")?.style.getPropertyValue("--vp-feed-time")), r = re ? void 0 : window.setTimeout(he, Number.isFinite(n) ? n + 700 : Ft);
		return () => {
			window.clearTimeout(r), e.removeEventListener("change", t);
		};
	}, [
		I.id,
		z,
		re
	]);
	function ge() {
		if (R.current === "printing" || R.current === "tearing") return;
		q();
		let r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		R.current = r ? "printed" : "printing", L({
			id: ++te.current,
			phase: R.current,
			receipt: w || T ? null : e,
			content: w ? t : null,
			ticket: T && !w ? n : null
		});
	}
	let _e = d == null ? void 0 : { "--vp-paper-height": typeof d == "number" ? `${d}px` : String(d) };
	return /* @__PURE__ */ h("section", {
		className: `vp vp--${a} ${S}`,
		"data-phase": I.phase,
		"data-controls": u ? "true" : "false",
		"data-paper-pending": re ? "true" : "false",
		"data-scrollable": G ? "true" : "false",
		style: _e,
		"aria-label": `${a === "up" ? "Upward" : "Front-feed"} virtual receipt printer`,
		onAnimationEnd: (e) => {
			e.animationName === "vp-motor-feed" && e.target === e.currentTarget && he();
		},
		children: /* @__PURE__ */ g("div", {
			className: "vp-machine",
			children: [
				/* @__PURE__ */ h("div", {
					className: "vp-housing",
					"aria-hidden": "true",
					children: oe && /* @__PURE__ */ h(oe, { phase: I.phase })
				}),
				u && /* @__PURE__ */ g("div", {
					className: "vp-controls",
					role: "group",
					"aria-label": "Printer controls",
					children: [/* @__PURE__ */ g("button", {
						ref: ne,
						className: "vp-print",
						type: "button",
						onClick: ge,
						disabled: z || B,
						"aria-label": z ? "Printing receipt" : "Print receipt",
						title: z ? "Printing receipt" : "Print receipt",
						"aria-describedby": D,
						children: [/* @__PURE__ */ h(Lt, {}), /* @__PURE__ */ h("span", {
							className: "vp-sr-only",
							children: z ? "Printing receipt" : "Print receipt"
						})]
					}), (I.phase === "printed" || B) && /* @__PURE__ */ h("button", {
						className: "vp-tear",
						type: "button",
						"aria-label": "Tear off receipt",
						title: "Tear off receipt",
						disabled: B,
						onClick: fe,
						children: /* @__PURE__ */ g("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.7",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ h("circle", {
									cx: "6",
									cy: "6",
									r: "3"
								}),
								/* @__PURE__ */ h("circle", {
									cx: "6",
									cy: "18",
									r: "3"
								}),
								/* @__PURE__ */ h("path", { d: "m8 8 12 12M8 16 20 4" })
							]
						})
					})]
				}),
				/* @__PURE__ */ g("div", {
					className: "vp-status",
					role: "status",
					"aria-live": "polite",
					"aria-atomic": "true",
					id: D,
					children: [/* @__PURE__ */ h("span", {
						className: `vp-status-icon ${z ? "vp-status-icon--printing" : ""}`,
						"aria-hidden": "true",
						title: se,
						children: z ? /* @__PURE__ */ h("span", { className: "vp-spinner" }) : I.phase === "printed" ? /* @__PURE__ */ g("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.8",
							children: [/* @__PURE__ */ h("circle", {
								cx: "12",
								cy: "12",
								r: "10"
							}), /* @__PURE__ */ h("path", { d: "m7.5 12 3 3 6-6" })]
						}) : /* @__PURE__ */ h(Lt, {})
					}), /* @__PURE__ */ h("span", {
						className: "vp-sr-only",
						children: se
					})]
				}),
				/* @__PURE__ */ h("div", {
					className: "vp-slot",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ h("div", {
					className: "vp-paper-window",
					"aria-busy": z,
					children: /* @__PURE__ */ h("div", {
						ref: O,
						className: "vp-paper-scroll",
						role: "region",
						"aria-label": "Receipt paper",
						tabIndex: I.phase === "printed" ? 0 : void 0,
						onPointerDown: (e) => {
							!k.current && e.isPrimary && I.phase === "printed" && (q(), k.current = {
								id: e.pointerId,
								x: e.clientX,
								y: e.clientY,
								scrollTop: e.currentTarget.scrollTop,
								pointerType: e.pointerType,
								grip: !!e.target.closest(".vp-paper-grip"),
								lastTime: e.timeStamp,
								lastX: 0,
								lastY: 0
							}, e.currentTarget.setPointerCapture(e.pointerId));
						},
						onPointerMove: (e) => {
							let t = pe(e);
							if (!k.current) return;
							let n = k.current.axis === "horizontal";
							t >= (a === "front" ? n ? 72 : 96 : n ? Math.max(110, e.currentTarget.clientWidth * .65) : Math.max(120, Math.min(180, e.currentTarget.clientHeight * .45))) && (me(e), e.currentTarget.hasPointerCapture(e.pointerId) && e.currentTarget.releasePointerCapture(e.pointerId));
						},
						onPointerUp: me,
						onPointerCancel: (e) => me(e, !0),
						onLostPointerCapture: (e) => me(e, !0),
						onKeyDown: (e) => {
							if (e.target !== e.currentTarget || I.phase !== "printed") return;
							let t = e.currentTarget, n = {
								ArrowDown: 40,
								ArrowUp: -40,
								PageDown: t.clientHeight * .9,
								PageUp: -t.clientHeight * .9,
								Home: -t.scrollHeight,
								End: t.scrollHeight
							};
							e.key in n && (e.preventDefault(), t.scrollTop += n[e.key]);
						},
						children: /* @__PURE__ */ g("article", {
							className: `vp-paper ${U ? "vp-paper--markup" : W ? "vp-paper--ticket" : ""}`,
							"aria-labelledby": U || W ? void 0 : ee,
							"aria-label": U || W ? "Printed document" : void 0,
							"aria-hidden": I.phase === "ready",
							children: [
								/* @__PURE__ */ h("svg", {
									className: "vp-paper-surface",
									"aria-hidden": "true",
									children: /* @__PURE__ */ h("foreignObject", {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ h("div", {
											className: "vp-paper-plane",
											xmlns: "http://www.w3.org/1999/xhtml",
											children: /* @__PURE__ */ h("canvas", { ref: N })
										})
									})
								}),
								/* @__PURE__ */ h("span", {
									className: "vp-paper-grip",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ h("div", {
									className: "vp-paper-content",
									children: U ? /* @__PURE__ */ h(Ut, {
										content: V.content,
										logo: r
									}) : W ? /* @__PURE__ */ h(Gt, { ticket: V.ticket }) : K.error ? /* @__PURE__ */ h("p", {
										className: "vp-receipt-error",
										role: "alert",
										children: K.error
									}) : /* @__PURE__ */ g(m, { children: [
										/* @__PURE__ */ g("header", {
											className: "vp-merchant",
											children: [/* @__PURE__ */ h("h2", {
												id: ee,
												children: K.data.merchant.name
											}), /* @__PURE__ */ g("address", { children: [K.data.merchant.address.map((e, t) => /* @__PURE__ */ h("span", { children: e }, t)), K.data.merchant.phone && /* @__PURE__ */ g("span", { children: ["Tel: ", K.data.merchant.phone] })] })]
										}),
										/* @__PURE__ */ g("div", {
											className: "vp-order",
											children: [/* @__PURE__ */ g("span", { children: ["ORDER #", K.data.orderId] }), /* @__PURE__ */ h("time", {
												dateTime: K.data.issuedAt,
												children: K.issued
											})]
										}),
										/* @__PURE__ */ g("table", {
											className: "vp-items",
											children: [
												/* @__PURE__ */ h("caption", {
													className: "vp-sr-only",
													children: "Order items"
												}),
												/* @__PURE__ */ h("thead", {
													className: "vp-sr-only",
													children: /* @__PURE__ */ g("tr", { children: [/* @__PURE__ */ h("th", {
														scope: "col",
														children: "Item and quantity"
													}), /* @__PURE__ */ h("th", {
														scope: "col",
														children: "Amount"
													})] })
												}),
												/* @__PURE__ */ h("tbody", { children: K.data.items.map((e, t) => /* @__PURE__ */ g("tr", { children: [/* @__PURE__ */ g("th", {
													scope: "row",
													children: [
														e.quantity,
														"x ",
														e.name
													]
												}), /* @__PURE__ */ h("td", { children: K.money(e.quantity * e.unitAmount) })] }, e.id ?? t)) })
											]
										}),
										/* @__PURE__ */ g("dl", {
											className: "vp-totals",
											children: [
												/* @__PURE__ */ g("div", { children: [/* @__PURE__ */ h("dt", { children: "Subtotal" }), /* @__PURE__ */ h("dd", { children: K.money(K.totals.subtotal) })] }),
												/* @__PURE__ */ g("div", { children: [/* @__PURE__ */ g("dt", { children: [
													"Tax (",
													K.taxRate,
													"%)"
												] }), /* @__PURE__ */ h("dd", { children: K.money(K.totals.tax) })] }),
												/* @__PURE__ */ g("div", {
													className: "vp-total",
													children: [/* @__PURE__ */ h("dt", { children: "Total" }), /* @__PURE__ */ h("dd", { children: K.money(K.totals.total) })]
												})
											]
										}),
										/* @__PURE__ */ g("footer", {
											className: "vp-payment",
											children: [
												/* @__PURE__ */ g("p", {
													className: "vp-paid",
													children: [
														"Paid via ",
														K.data.payment.method,
														K.data.payment.last4 && ` (•••• ${K.data.payment.last4})`
													]
												}),
												/* @__PURE__ */ h(Rt, { value: K.data.payment.authorization }),
												/* @__PURE__ */ g("p", {
													className: "vp-authorization",
													children: ["AUTH: ", K.data.payment.authorization]
												}),
												/* @__PURE__ */ h("p", {
													className: "vp-thanks",
													children: K.data.footer
												})
											]
										})
									] })
								})
							]
						}, I.id)
					})
				})
			]
		})
	});
});
//#endregion
export { r as SUPPORTED_PRINTER_TAGS, Kt as VirtualPrinter, ht as cafeReceipt, gt as calculateTotals, vt as formatOrderDate, _t as moneyFormatter, t as normalizePrinterMarkup, a as normalizeTicket, n as parsePrinterMarkup, e as printerInputExamples, i as quickTicketExample };
