import { i as e, n as t, r as n, t as r } from "./chunks/printerMarkup.js";
import { n as i, t as a } from "./chunks/simpleTicket.js";
import { useEffect as o, useId as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
//#region \0rolldown/runtime.js
var h = Object.create, g = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, v = Object.getOwnPropertyNames, y = Object.getPrototypeOf, b = Object.prototype.hasOwnProperty, x = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), S = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = v(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !b.call(e, s) && s !== n && g(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = _(t, s)) || r.enumerable
	});
	return e;
}, ee = (e, t, n) => (n = e == null ? {} : h(y(e)), S(t || !e || !e.__esModule || !b.call(e, "default") ? g(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), C = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	function t(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	e.default = function e(n, r) {
		t(this, e), this.data = n, this.text = r.text || n, this.options = r;
	};
})), te = /* @__PURE__ */ x(((e) => {
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
	}(), n = r(C());
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
})), w = /* @__PURE__ */ x(((e) => {
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
})), T = /* @__PURE__ */ x(((e) => {
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
	}(), n = i(C()), r = w();
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
})), E = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = w(), n = function(e) {
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
})), D = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = r(T()), n = r(E());
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
})), ne = /* @__PURE__ */ x(((e) => {
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
	}(), n = i(T()), r = w();
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
})), O = /* @__PURE__ */ x(((e) => {
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
	}(), n = i(T()), r = w();
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
})), k = /* @__PURE__ */ x(((e) => {
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
	}(), n = i(T()), r = w();
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
})), A = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.CODE128C = e.CODE128B = e.CODE128A = e.CODE128 = void 0;
	var t = a(D()), n = a(ne()), r = a(O()), i = a(k());
	function a(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.CODE128 = t.default, e.CODE128A = n.default, e.CODE128B = r.default, e.CODE128C = i.default;
})), j = /* @__PURE__ */ x(((e) => {
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
})), M = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = j();
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
})), N = /* @__PURE__ */ x(((e) => {
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
	}(), n = j(), r = a(M()), i = a(C());
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
})), P = /* @__PURE__ */ x(((e) => {
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
	}, r = j(), i = a(N());
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
})), F = /* @__PURE__ */ x(((e) => {
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
	}, r = i(N());
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
})), I = /* @__PURE__ */ x(((e) => {
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
	}(), n = j(), r = a(M()), i = a(C());
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
})), re = /* @__PURE__ */ x(((e) => {
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
	}(), n = j(), r = a(M()), i = a(C());
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
})), L = /* @__PURE__ */ x(((e) => {
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
	var n = i(M()), r = i(C());
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
})), R = /* @__PURE__ */ x(((e) => {
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
	}(), n = a(M()), r = a(C()), i = L();
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
})), ie = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.UPCE = e.UPC = e.EAN2 = e.EAN5 = e.EAN8 = e.EAN13 = void 0;
	var t = s(P()), n = s(F()), r = s(I()), i = s(re()), a = s(L()), o = s(R());
	function s(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.EAN13 = t.default, e.EAN8 = n.default, e.EAN5 = r.default, e.EAN2 = i.default, e.UPC = a.default, e.UPCE = o.default;
})), z = /* @__PURE__ */ x(((e) => {
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
})), B = /* @__PURE__ */ x(((e) => {
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
	}(), n = z(), r = i(C());
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
})), V = /* @__PURE__ */ x(((e) => {
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
	}(), n = r(B());
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
})), H = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ITF14 = e.ITF = void 0;
	var t = r(B()), n = r(V());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.ITF = t.default, e.ITF14 = n.default;
})), U = /* @__PURE__ */ x(((e) => {
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
	}(), n = r(C());
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
})), W = /* @__PURE__ */ x(((e) => {
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
})), ae = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = r(U()), n = W();
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
})), oe = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = r(U()), n = W();
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
})), se = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = r(U()), n = W();
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
})), ce = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = r(U()), n = W();
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
})), le = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.MSI1110 = e.MSI1010 = e.MSI11 = e.MSI10 = e.MSI = void 0;
	var t = o(U()), n = o(ae()), r = o(oe()), i = o(se()), a = o(ce());
	function o(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.MSI = t.default, e.MSI10 = n.default, e.MSI11 = r.default, e.MSI1010 = i.default, e.MSI1110 = a.default;
})), ue = /* @__PURE__ */ x(((e) => {
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
	}(), n = r(C());
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
})), de = /* @__PURE__ */ x(((e) => {
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
	}(), n = r(C());
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
})), fe = /* @__PURE__ */ x(((e) => {
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
})), pe = /* @__PURE__ */ x(((e) => {
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
	}(), n = fe(), r = i(C());
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
})), me = /* @__PURE__ */ x(((e) => {
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
	}(), n = r(pe());
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
})), he = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.CODE93FullASCII = e.CODE93 = void 0;
	var t = r(pe()), n = r(me());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.CODE93 = t.default, e.CODE93FullASCII = n.default;
})), ge = /* @__PURE__ */ x(((e) => {
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
	}(), n = r(C());
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
})), _e = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = te(), n = A(), r = ie(), i = H(), a = le(), o = ue(), s = de(), c = he(), l = ge();
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
})), G = /* @__PURE__ */ x(((e) => {
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
})), ve = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t;
	function t(e) {
		var t = [];
		function n(e) {
			if (Array.isArray(e)) for (var r = 0; r < e.length; r++) n(e[r]);
			else e.text = e.text || "", e.data = e.data || "", t.push(e);
		}
		return n(e), t;
	}
})), ye = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t;
	function t(e) {
		return e.marginTop = e.marginTop || e.margin, e.marginBottom = e.marginBottom || e.margin, e.marginRight = e.marginRight || e.margin, e.marginLeft = e.marginLeft || e.margin, e;
	}
})), be = /* @__PURE__ */ x(((e) => {
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
})), xe = /* @__PURE__ */ x(((e) => {
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
})), Se = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = r(be()), n = r(xe());
	function r(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function i(e) {
		var r = {};
		for (var i in n.default) n.default.hasOwnProperty(i) && (e.hasAttribute("jsbarcode-" + i.toLowerCase()) && (r[i] = e.getAttribute("jsbarcode-" + i.toLowerCase())), e.hasAttribute("data-" + i.toLowerCase()) && (r[i] = e.getAttribute("data-" + i.toLowerCase())));
		return r.value = e.getAttribute("jsbarcode-value") || e.getAttribute("data-value"), r = (0, t.default)(r), r;
	}
	e.default = i;
})), Ce = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.getTotalWidthOfEncodings = e.calculateEncodingAttributes = e.getBarcodePadding = e.getEncodingHeight = e.getMaximumHeightOfEncodings = void 0;
	var t = n(G());
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
})), we = /* @__PURE__ */ x(((e) => {
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
	}(), n = i(G()), r = Ce();
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
})), Te = /* @__PURE__ */ x(((e) => {
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
	}(), n = i(G()), r = Ce();
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
})), Ee = /* @__PURE__ */ x(((e) => {
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
})), De = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = i(we()), n = i(Te()), r = i(Ee());
	function i(e) {
		return e && e.__esModule ? e : { default: e };
	}
	e.default = {
		CanvasRenderer: t.default,
		SVGRenderer: n.default,
		ObjectRenderer: r.default
	};
})), Oe = /* @__PURE__ */ x(((e) => {
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
})), ke = /* @__PURE__ */ x(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, n = a(Se()), r = a(De()), i = Oe();
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
})), Ae = /* @__PURE__ */ x(((e) => {
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
})), je = /* @__PURE__ */ ee((/* @__PURE__ */ x(((e, t) => {
	var n = d(_e()), r = d(G()), i = d(ve()), a = d(ye()), o = d(ke()), s = d(be()), c = d(Ae()), l = Oe(), u = d(xe());
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
})))(), 1), K = /* @__PURE__ */ ((e) => (e[e.Border = -1] = "Border", e[e.Data = 0] = "Data", e[e.Function = 1] = "Function", e[e.Position = 2] = "Position", e[e.Timing = 3] = "Timing", e[e.Alignment = 4] = "Alignment", e))(K || {}), Me = [0, 1], Ne = [1, 0], Pe = [2, 3], Fe = [3, 2], Ie = {
	L: Me,
	M: Ne,
	Q: Pe,
	H: Fe
}, Le = /^\d*$/, Re = /^[A-Z0-9 $%*+./:-]*$/, q = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:", J = 1, Y = 40, ze = 3, Be = 3, X = 40, Ve = 10, He = [
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
], Ue = [
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
], We = class {
	constructor(e, t, n, r) {
		if (this.version = e, this.ecc = t, e < J || e > Y) throw RangeError("Version value out of range");
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
		for (let e = 0; e < this.size; e++) this.setFunctionModule(6, e, e % 2 == 0, K.Timing), this.setFunctionModule(e, 6, e % 2 == 0, K.Timing);
		this.drawFinderPattern(3, 3), this.drawFinderPattern(this.size - 4, 3), this.drawFinderPattern(3, this.size - 4);
		let e = this.getAlignmentPatternPositions(), t = e.length;
		for (let n = 0; n < t; n++) for (let r = 0; r < t; r++) n === 0 && r === 0 || n === 0 && r === t - 1 || n === t - 1 && r === 0 || this.drawAlignmentPattern(e[n], e[r]);
		this.drawFormatBits(0), this.drawVersion();
	}
	drawFormatBits(e) {
		let t = this.ecc[1] << 3 | e, n = t;
		for (let e = 0; e < 10; e++) n = n << 1 ^ (n >>> 9) * 1335;
		let r = (t << 10 | n) ^ 21522;
		for (let e = 0; e <= 5; e++) this.setFunctionModule(8, e, Q(r, e));
		this.setFunctionModule(8, 7, Q(r, 6)), this.setFunctionModule(8, 8, Q(r, 7)), this.setFunctionModule(7, 8, Q(r, 8));
		for (let e = 9; e < 15; e++) this.setFunctionModule(14 - e, 8, Q(r, e));
		for (let e = 0; e < 8; e++) this.setFunctionModule(this.size - 1 - e, 8, Q(r, e));
		for (let e = 8; e < 15; e++) this.setFunctionModule(8, this.size - 15 + e, Q(r, e));
		this.setFunctionModule(8, this.size - 8, !0);
	}
	drawVersion() {
		if (this.version < 7) return;
		let e = this.version;
		for (let t = 0; t < 12; t++) e = e << 1 ^ (e >>> 11) * 7973;
		let t = this.version << 12 | e;
		for (let e = 0; e < 18; e++) {
			let n = Q(t, e), r = this.size - 11 + e % 3, i = Math.floor(e / 3);
			this.setFunctionModule(r, i, n), this.setFunctionModule(i, r, n);
		}
	}
	drawFinderPattern(e, t) {
		for (let n = -4; n <= 4; n++) for (let r = -4; r <= 4; r++) {
			let i = Math.max(Math.abs(r), Math.abs(n)), a = e + r, o = t + n;
			a >= 0 && a < this.size && o >= 0 && o < this.size && this.setFunctionModule(a, o, i !== 2 && i !== 4, K.Position);
		}
	}
	drawAlignmentPattern(e, t) {
		for (let n = -2; n <= 2; n++) for (let r = -2; r <= 2; r++) this.setFunctionModule(e + r, t + n, Math.max(Math.abs(r), Math.abs(n)) !== 1, K.Alignment);
	}
	setFunctionModule(e, t, n, r = K.Function) {
		this.modules[t][e] = n, this.types[t][e] = r;
	}
	addEccAndInterleave(e) {
		let t = this.version, n = this.ecc;
		if (e.length !== $(t, n)) throw RangeError("Invalid argument");
		let r = Ue[n[0]][t], i = He[n[0]][t], a = Math.floor(it(t) / 8), o = r - a % r, s = Math.floor(a / r), c = [], l = at(i);
		for (let t = 0, n = 0; t < r; t++) {
			let r = e.slice(n, n + s - i + (t < o ? 0 : 1));
			n += r.length;
			let a = ot(r, l);
			t < o && r.push(0), c.push(r.concat(a));
		}
		let u = [];
		for (let e = 0; e < c[0].length; e++) c.forEach((t, n) => {
			(e !== s - i || n >= o) && u.push(t[e]);
		});
		return u;
	}
	drawCodewords(e) {
		if (e.length !== Math.floor(it(this.version) / 8)) throw RangeError("Invalid argument");
		let t = 0;
		for (let n = this.size - 1; n >= 1; n -= 2) {
			n === 6 && (n = 5);
			for (let r = 0; r < this.size; r++) for (let i = 0; i < 2; i++) {
				let a = n - i, o = n + 1 & 2 ? r : this.size - 1 - r;
				!this.types[o][a] && t < e.length * 8 && (this.modules[o][a] = Q(e[t >>> 3], 7 - (t & 7)), t++);
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
			for (let a = 0; a < this.size; a++) this.modules[t][a] === n ? (r++, r === 5 ? e += ze : r > 5 && e++) : (this.finderPenaltyAddHistory(r, i), n || (e += this.finderPenaltyCountPatterns(i) * X), n = this.modules[t][a], r = 1);
			e += this.finderPenaltyTerminateAndCount(n, r, i) * X;
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
			for (let a = 0; a < this.size; a++) this.modules[a][t] === n ? (r++, r === 5 ? e += ze : r > 5 && e++) : (this.finderPenaltyAddHistory(r, i), n || (e += this.finderPenaltyCountPatterns(i) * X), n = this.modules[a][t], r = 1);
			e += this.finderPenaltyTerminateAndCount(n, r, i) * X;
		}
		for (let t = 0; t < this.size - 1; t++) for (let n = 0; n < this.size - 1; n++) {
			let r = this.modules[t][n];
			r === this.modules[t][n + 1] && r === this.modules[t + 1][n] && r === this.modules[t + 1][n + 1] && (e += Be);
		}
		let t = 0;
		for (let e of this.modules) t = e.reduce((e, t) => e + +!!t, t);
		let n = this.size * this.size, r = Math.ceil(Math.abs(t * 20 - n * 10) / n) - 1;
		return e += r * Ve, e;
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
function Z(e, t, n) {
	if (t < 0 || t > 31 || e >>> t) throw RangeError("Value out of range");
	for (let r = t - 1; r >= 0; r--) n.push(e >>> r & 1);
}
function Q(e, t) {
	return !!(e >>> t & 1);
}
var Ge = class {
	constructor(e, t, n) {
		if (this.mode = e, this.numChars = t, this.bitData = n, t < 0) throw RangeError("Invalid argument");
		this.bitData = n.slice();
	}
	getData() {
		return this.bitData.slice();
	}
}, Ke = [
	1,
	10,
	12,
	14
], qe = [
	2,
	9,
	11,
	13
], Je = [
	4,
	8,
	16,
	16
];
function Ye(e, t) {
	return e[Math.floor((t + 7) / 17) + 1];
}
function Xe(e) {
	let t = [];
	for (let n of e) Z(n, 8, t);
	return new Ge(Je, e.length, t);
}
function Ze(e) {
	if (!et(e)) throw RangeError("String contains non-numeric characters");
	let t = [];
	for (let n = 0; n < e.length;) {
		let r = Math.min(e.length - n, 3);
		Z(Number.parseInt(e.substring(n, n + r), 10), r * 3 + 1, t), n += r;
	}
	return new Ge(Ke, e.length, t);
}
function Qe(e) {
	if (!tt(e)) throw RangeError("String contains unencodable characters in alphanumeric mode");
	let t = [], n = 0;
	for (; n + 2 <= e.length; n += 2) {
		let r = q.indexOf(e.charAt(n)) * 45;
		r += q.indexOf(e.charAt(n + 1)), Z(r, 11, t);
	}
	return n < e.length && Z(q.indexOf(e.charAt(n)), 6, t), new Ge(qe, e.length, t);
}
function $e(e) {
	return e === "" ? [] : et(e) ? [Ze(e)] : tt(e) ? [Qe(e)] : [Xe(rt(e))];
}
function et(e) {
	return Le.test(e);
}
function tt(e) {
	return Re.test(e);
}
function nt(e, t) {
	let n = 0;
	for (let r of e) {
		let e = Ye(r.mode, t);
		if (r.numChars >= 1 << e) return Infinity;
		n += 4 + e + r.bitData.length;
	}
	return n;
}
function rt(e) {
	e = encodeURI(e);
	let t = [];
	for (let n = 0; n < e.length; n++) e.charAt(n) === "%" ? (t.push(Number.parseInt(e.substring(n + 1, n + 3), 16)), n += 2) : t.push(e.charCodeAt(n));
	return t;
}
function it(e) {
	if (e < J || e > Y) throw RangeError("Version number out of range");
	let t = (16 * e + 128) * e + 64;
	if (e >= 2) {
		let n = Math.floor(e / 7) + 2;
		t -= (25 * n - 10) * n - 55, e >= 7 && (t -= 36);
	}
	return t;
}
function $(e, t) {
	return Math.floor(it(e) / 8) - He[t[0]][e] * Ue[t[0]][e];
}
function at(e) {
	if (e < 1 || e > 255) throw RangeError("Degree out of range");
	let t = [];
	for (let n = 0; n < e - 1; n++) t.push(0);
	t.push(1);
	let n = 1;
	for (let r = 0; r < e; r++) {
		for (let e = 0; e < t.length; e++) t[e] = st(t[e], n), e + 1 < t.length && (t[e] ^= t[e + 1]);
		n = st(n, 2);
	}
	return t;
}
function ot(e, t) {
	let n = t.map((e) => 0);
	for (let r of e) {
		let e = r ^ n.shift();
		n.push(0), t.forEach((t, r) => n[r] ^= st(t, e));
	}
	return n;
}
function st(e, t) {
	if (e >>> 8 || t >>> 8) throw RangeError("Byte out of range");
	let n = 0;
	for (let r = 7; r >= 0; r--) n = n << 1 ^ (n >>> 7) * 285, n ^= (t >>> r & 1) * e;
	return n;
}
function ct(e, t, n = 1, r = 40, i = -1, a = !0) {
	if (!(J <= n && n <= r && r <= Y) || i < -1 || i > 7) throw RangeError("Invalid value");
	let o, s;
	for (o = n;; o++) {
		let n = $(o, t) * 8, i = nt(e, o);
		if (i <= n) {
			s = i;
			break;
		}
		if (o >= r) throw RangeError("Data too long");
	}
	for (let e of [
		Ne,
		Pe,
		Fe
	]) a && s <= $(o, e) * 8 && (t = e);
	let c = [];
	for (let t of e) {
		Z(t.mode[0], 4, c), Z(t.numChars, Ye(t.mode, o), c);
		for (let e of t.getData()) c.push(e);
	}
	let l = $(o, t) * 8;
	Z(0, Math.min(4, l - c.length), c), Z(0, (8 - c.length % 8) % 8, c);
	for (let e = 236; c.length < l; e ^= 253) Z(e, 8, c);
	let u = Array.from({ length: Math.ceil(c.length / 8) }, () => 0);
	return c.forEach((e, t) => u[t >>> 3] |= e << 7 - (t & 7)), new We(o, t, u, i);
}
function lt(e, t) {
	let { ecc: n = "L", boostEcc: r = !1, minVersion: i = 1, maxVersion: a = 40, maskPattern: o = -1, border: s = 1 } = t || {}, c = typeof e == "string" ? $e(e) : Array.isArray(e) ? [Xe(e)] : void 0;
	if (!c) throw Error(`uqr only supports encoding string and binary data, but got: ${typeof e}`);
	let l = ct(c, Ie[n], i, a, o, r), u = ut({
		version: l.version,
		maskPattern: l.mask,
		size: l.size,
		data: l.modules,
		types: l.types
	}, s);
	return t?.invert && (u.data = u.data.map((e) => e.map((e) => !e))), t?.onEncoded?.(u), u;
}
function ut(e, t = 1) {
	if (!t) return e;
	let { size: n } = e, r = n + t * 2;
	e.size = r, e.data.forEach((e) => {
		for (let n = 0; n < t; n++) e.unshift(!1), e.push(!1);
	});
	for (let n = 0; n < t; n++) e.data.unshift(Array.from({ length: r }, (e) => !1)), e.data.push(Array.from({ length: r }, (e) => !1));
	let i = K.Border;
	e.types.forEach((e) => {
		for (let n = 0; n < t; n++) e.unshift(i), e.push(i);
	});
	for (let n = 0; n < t; n++) e.types.unshift(Array.from({ length: r }, (e) => i)), e.types.push(Array.from({ length: r }, (e) => i));
	return e;
}
//#endregion
//#region src/receipt.js
var dt = {
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
function ft(e, t) {
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
function pt(e, t) {
	let n = new Intl.NumberFormat(e, {
		style: "currency",
		currency: t
	}), r = 10 ** n.resolvedOptions().maximumFractionDigits;
	return (e) => n.format(e / r);
}
function mt(e, t, n) {
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
function ht(e, t, n, r, i) {
	return Math.max(Math.abs(r), Math.abs(i)) < 10 ? null : Math.abs(r) > Math.abs(i) ? "horizontal" : e === "front" && t !== "mouse" && !n ? "scroll" : "vertical";
}
//#endregion
//#region src/VirtualPrinter.jsx
var gt = typeof window > "u" ? o : c, _t = 3400;
function vt() {
	return /* @__PURE__ */ m("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ p("path", { d: "M6 8V3h12v5M6 17H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }), /* @__PURE__ */ p("path", { d: "M6 14h12v7H6zM17 11h1" })]
	});
}
function yt({ value: e }) {
	let t = u(null);
	return o(() => {
		(0, je.default)(t.current, e, {
			format: "CODE128",
			displayValue: !1,
			height: 34,
			width: 2,
			margin: 10,
			background: "#171717",
			lineColor: "#ffffff"
		});
	}, [e]), /* @__PURE__ */ p("svg", {
		className: "vp-barcode",
		ref: t,
		preserveAspectRatio: "none",
		role: "img",
		"aria-label": `Authorization barcode ${e}`
	});
}
function bt({ logo: e }) {
	return e && typeof e == "string" ? /* @__PURE__ */ p("img", {
		className: "vp-markup-logo-image",
		src: e,
		alt: ""
	}) : e || /* @__PURE__ */ p("span", {
		className: "vp-markup-logo-mark",
		"aria-hidden": "true"
	});
}
function xt({ text: e }) {
	let t = l(() => {
		try {
			let t = lt(e || " ", {
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
	return t ? /* @__PURE__ */ p("svg", {
		className: "vp-markup-qr-svg",
		viewBox: `0 0 ${t.size} ${t.size}`,
		"aria-hidden": "true",
		children: /* @__PURE__ */ p("path", { d: t.d })
	}) : /* @__PURE__ */ p("span", {
		className: "vp-markup-qr-box",
		"aria-hidden": "true",
		children: "QR"
	});
}
function St({ part: e }) {
	let t = [e.bold && "vp-markup-bold", e.right && "vp-markup-part--right"].filter(Boolean).join(" ");
	if (!e.doubleHeight && !e.doubleWidth) return /* @__PURE__ */ p("span", {
		className: t || void 0,
		children: e.text
	});
	let n = Array.from(e.text).length * (e.doubleWidth ? 2 : 1), r = e.doubleHeight && e.doubleWidth ? "vp-markup-double" : e.doubleHeight ? "vp-markup-double-height" : "vp-markup-double-width";
	return /* @__PURE__ */ p("span", {
		className: `${r} ${t}`.trim(),
		style: { width: `${n}ch` },
		children: /* @__PURE__ */ p("span", { children: e.text })
	});
}
function Ct({ part: e, logo: t }) {
	return e.type === "logo" ? /* @__PURE__ */ p("span", {
		className: "vp-markup-logo",
		children: /* @__PURE__ */ p(bt, { logo: t })
	}) : e.type === "qr" ? /* @__PURE__ */ m("span", {
		className: `vp-markup-qr ${e.center ? "vp-markup-qr--center" : ""} ${e.right ? "vp-markup-qr--right" : ""}`,
		role: "img",
		"aria-label": `QR code: ${e.text || "empty"}`,
		children: [/* @__PURE__ */ p(xt, { text: e.text }), /* @__PURE__ */ p("code", {
			className: "vp-markup-qr-value",
			children: e.text
		})]
	}) : e.type === "control" ? /* @__PURE__ */ p("span", {
		className: `vp-markup-control vp-markup-control--${e.control}`,
		role: "img",
		"aria-label": e.control === "cut" ? "Paper cut" : "Printer plugin command"
	}) : /* @__PURE__ */ p(St, { part: e });
}
function wt({ content: e, logo: t }) {
	let r = n(e);
	return /* @__PURE__ */ p("div", {
		className: "vp-markup-content",
		role: "document",
		"aria-label": "Printer document",
		children: r.map((e, n) => /* @__PURE__ */ p("div", {
			className: `vp-markup-line ${e.center ? "vp-markup-line--center" : ""} ${e.right ? "vp-markup-line--right" : ""}`,
			children: e.parts.map((e, n) => /* @__PURE__ */ p(Ct, {
				part: e,
				logo: t
			}, n))
		}, n))
	});
}
function Tt(e) {
	let [t, n] = d(null);
	return o(() => {
		if (!e) return;
		let t = !0;
		return import("./chunks/TabletopPrinter.js").then((e) => {
			t && n(() => e.TabletopPrinter);
		}), () => {
			t = !1;
		};
	}, [e]), e ? t : null;
}
function Et({ ticket: e }) {
	let t = a(e);
	return /* @__PURE__ */ m("div", {
		className: "vp-ticket-content",
		role: "document",
		"aria-label": "Quick ticket",
		children: [
			/* @__PURE__ */ m("header", {
				className: "vp-ticket-heading",
				children: [/* @__PURE__ */ p("h2", { children: t.title }), t.subtitle && /* @__PURE__ */ p("p", { children: t.subtitle })]
			}),
			/* @__PURE__ */ p("div", {
				className: "vp-ticket-lines",
				children: t.lines.map((e) => /* @__PURE__ */ p("div", { children: e.text }, e.id))
			}),
			/* @__PURE__ */ p("div", {
				className: "vp-ticket-items",
				children: t.items.map((e) => /* @__PURE__ */ m("div", {
					className: "vp-ticket-row",
					children: [/* @__PURE__ */ p("span", { children: e.label }), e.amount && /* @__PURE__ */ p("strong", { children: e.amount })]
				}, e.id))
			}),
			t.total && /* @__PURE__ */ m("div", {
				className: "vp-ticket-total",
				children: [/* @__PURE__ */ p("span", { children: "Total" }), /* @__PURE__ */ p("strong", { children: t.total })]
			}),
			t.footer && /* @__PURE__ */ p("footer", {
				className: "vp-ticket-footer",
				children: t.footer
			})
		]
	});
}
function Dt({ receipt: e, content: t, ticket: n, logo: r, initiallyPrinted: i = !1, orientation: a = "front", scrollable: c = !0, paperMaxHeight: l, resetKey: h, onPhaseChange: g, onPrintStart: _, onPrinted: v, onTear: y, className: b = "" }) {
	let x = t != null, S = n != null, ee = e != null;
	if ([
		ee,
		x,
		S
	].filter(Boolean).length !== 1) throw TypeError("VirtualPrinter requires exactly one of receipt, content, or ticket.");
	if (x && typeof t != "string") throw TypeError("content must be a string.");
	if (ee && (typeof e != "object" || Array.isArray(e))) throw TypeError("receipt must be an object.");
	if (a !== "front" && a !== "up") throw TypeError("orientation must be \"front\" or \"up\".");
	let C = s(), te = s(), w = u(0), T = u(null), E = u(null), D = u(null), ne = u(h), O = u(i ? "printed" : "ready"), [k, A] = d(() => ({
		id: 0,
		phase: i ? "printed" : "ready",
		receipt: x || S ? null : e,
		content: x ? t : null,
		ticket: S && !x ? n : null
	})), j = k.phase === "printing", M = k.phase === "tearing", N = k.phase === "ready" ? {
		receipt: x || S ? null : e,
		content: x ? t : null,
		ticket: S && !x ? n : null
	} : k, P = N.receipt, F = N.content !== null, I = !F && N.ticket !== null, re = c !== !1, L = Tt(a === "up"), R = null;
	if (!F && !I) try {
		if (!P?.merchant || !P.payment) throw TypeError("Receipt is missing merchant or payment.");
		if (typeof P.payment.authorization != "string" || P.payment.authorization.length === 0) throw TypeError("Receipt authorization must be a nonempty string.");
		R = {
			data: P,
			totals: ft(P.items, P.taxBasisPoints),
			money: pt(P.locale, P.currency),
			taxRate: new Intl.NumberFormat(P.locale, { maximumFractionDigits: 2 }).format(P.taxBasisPoints / 100),
			issued: mt(P.issuedAt, P.locale, P.timeZone)
		};
	} catch (e) {
		R = { error: e instanceof Error ? e.message : "This receipt could not be printed." };
	}
	let ie = j ? "Printing your receipt" : M ? "Tearing off receipt" : k.phase === "printed" ? "Receipt printed" : "Ready to print";
	o(() => {
		let e = O.current;
		e !== k.phase && (g?.(k.phase), k.phase === "printing" && _?.(), k.phase === "printed" && v?.(), k.phase === "ready" && e === "tearing" && y?.()), O.current = k.phase;
	}, [
		k.phase,
		g,
		_,
		v,
		y
	]), gt(() => {
		if (ne.current !== h) {
			ne.current = h, D.current = null, E.current?.closest(".vp")?.removeAttribute("data-dragging"), E.current?.removeAttribute("data-tear-axis");
			for (let e of [
				"--vp-drag-x",
				"--vp-drag-y",
				"--vp-drag-rotate",
				"--vp-tear-x",
				"--vp-tear-y",
				"--vp-tear-rotate"
			]) E.current?.style.removeProperty(e);
			E.current?.querySelector(".vp-paper")?.style.removeProperty("--vp-scroll-offset"), E.current?.parentElement?.style.removeProperty("--vp-pull"), w.current = 0, A((e) => ({
				...e,
				id: 0,
				phase: "ready"
			}));
		}
	}, [h]), gt(() => {
		if (!j) return;
		let e = E.current, t = () => {
			let t = e.closest(".vp");
			a === "up" ? t?.style.setProperty("--vp-full-paper-height", `${e.scrollHeight}px`) : (t?.style.setProperty("--vp-full-paper-height", `${e.querySelector(".vp-paper").offsetHeight}px`), t?.style.setProperty("--vp-feed-visible-height", `${e.getBoundingClientRect().height}px`));
		};
		if (t(), typeof ResizeObserver > "u") return;
		let n = new ResizeObserver(t);
		return n.observe(e), a === "front" && n.observe(e.querySelector(".vp-paper")), () => n.disconnect();
	}, [
		a,
		re,
		j,
		k.id
	]);
	function z() {
		D.current = null, E.current?.closest(".vp")?.removeAttribute("data-dragging"), E.current?.removeAttribute("data-tear-axis");
		for (let e of [
			"--vp-drag-x",
			"--vp-drag-y",
			"--vp-drag-rotate",
			"--vp-tear-x",
			"--vp-tear-y",
			"--vp-tear-rotate"
		]) E.current?.style.removeProperty(e);
		E.current?.querySelector(".vp-paper")?.style.removeProperty("--vp-scroll-offset"), E.current?.parentElement?.style.removeProperty("--vp-pull"), A((e) => e.phase === "tearing" ? {
			...e,
			phase: "ready"
		} : e);
	}
	function B() {
		A((e) => e.phase === "printed" ? {
			...e,
			phase: "tearing"
		} : e);
	}
	function V(e) {
		let t = D.current;
		if (!t || t.id !== e.pointerId) return 0;
		let n = a === "up" ? -1 : 1, r = e.clientX - t.x, i = e.clientY - t.y;
		if (t.axis ||= ht(a, t.pointerType, t.grip, r, i), !t.axis || t.axis === "scroll") return 0;
		e.currentTarget.closest(".vp")?.setAttribute("data-dragging", "true");
		let o = t.axis === "horizontal", s = Math.max(0, n * i), c = o ? 0 : s;
		return t.sideways = r, e.currentTarget.style.setProperty("--vp-drag-y", `${n * c}px`), a === "up" && e.currentTarget.parentElement.style.setProperty("--vp-pull", `${c}px`), e.currentTarget.style.setProperty("--vp-drag-x", `${o ? r : a === "up" ? 0 : Math.max(-40, Math.min(40, r * .35))}px`), e.currentTarget.style.setProperty("--vp-drag-rotate", `${o ? Math.max(-8, Math.min(8, r * .06)) : a === "up" ? 0 : Math.max(-4, Math.min(4, r * .04))}deg`), t.distance = o ? Math.abs(r) : s, t.distance;
	}
	function H(e, t = !1) {
		let n = D.current;
		if (!n || n.id !== e.pointerId) return;
		let r = t ? n.distance || 0 : V(e);
		D.current = null;
		let i = e.currentTarget;
		if (i.closest(".vp")?.removeAttribute("data-dragging"), n.axis === "scroll") {
			i.querySelector(".vp-paper")?.style.removeProperty("--vp-scroll-offset");
			return;
		}
		let o = n.axis === "horizontal";
		if (r >= (o ? a === "front" ? 30 : Math.min(72, Math.max(36, i.clientWidth * .28)) : a === "up" ? 36 : 18)) {
			if (o) {
				let e = Math.sign(n.sideways);
				a === "front" && (i.dataset.tearAxis = "horizontal"), i.style.setProperty("--vp-tear-x", `${e * 260}px`), i.style.setProperty("--vp-tear-y", a === "up" ? "-80px" : "35px"), i.style.setProperty("--vp-tear-rotate", `${e * 9}deg`);
			}
			B();
		} else i.style.removeProperty("--vp-drag-x"), i.style.removeProperty("--vp-drag-y"), i.style.removeProperty("--vp-drag-rotate"), i.querySelector(".vp-paper")?.style.removeProperty("--vp-scroll-offset"), i.scrollTop = n.scrollTop, i.parentElement.style.removeProperty("--vp-pull");
	}
	o(() => {
		k.phase === "ready" && k.id > 0 && T.current?.focus({ preventScroll: !0 });
	}, [k.phase, k.id]), o(() => {
		E.current && (E.current.scrollTop = 0);
	}, [k.id]), o(() => {
		if (!M) return;
		let e = window.matchMedia("(prefers-reduced-motion: reduce)"), t = () => {
			e.matches && z();
		};
		t(), e.addEventListener("change", t);
		let n = window.setTimeout(z, 620);
		return () => {
			window.clearTimeout(n), e.removeEventListener("change", t);
		};
	}, [M]);
	function U() {
		A((e) => e.phase === "printing" ? {
			...e,
			phase: "printed"
		} : e);
	}
	o(() => {
		if (!j) return;
		let e = window.matchMedia("(prefers-reduced-motion: reduce)"), t = () => {
			e.matches && U();
		};
		t(), e.addEventListener("change", t);
		let n = window.setTimeout(U, _t);
		return () => {
			window.clearTimeout(n), e.removeEventListener("change", t);
		};
	}, [k.id, j]);
	function W() {
		if (j || M) return;
		let r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		A({
			id: ++w.current,
			phase: r ? "printed" : "printing",
			receipt: x || S ? null : e,
			content: x ? t : null,
			ticket: S && !x ? n : null
		});
	}
	let ae = l == null ? void 0 : { "--vp-paper-height": typeof l == "number" ? `${l}px` : String(l) };
	return /* @__PURE__ */ p("section", {
		className: `vp vp--${a} ${b}`,
		"data-phase": k.phase,
		"data-scrollable": re ? "true" : "false",
		style: ae,
		"aria-label": `${a === "up" ? "Upward" : "Front-feed"} virtual receipt printer`,
		children: /* @__PURE__ */ m("div", {
			className: "vp-machine",
			children: [
				/* @__PURE__ */ p("div", {
					className: "vp-housing",
					"aria-hidden": "true",
					children: L && /* @__PURE__ */ p(L, { phase: k.phase })
				}),
				/* @__PURE__ */ m("div", {
					className: "vp-controls",
					role: "group",
					"aria-label": "Printer controls",
					children: [/* @__PURE__ */ m("button", {
						ref: T,
						className: "vp-print",
						type: "button",
						onClick: W,
						disabled: j || M,
						"aria-label": j ? "Printing receipt" : "Print receipt",
						title: j ? "Printing receipt" : "Print receipt",
						"aria-describedby": te,
						children: [/* @__PURE__ */ p(vt, {}), /* @__PURE__ */ p("span", {
							className: "vp-sr-only",
							children: j ? "Printing receipt" : "Print receipt"
						})]
					}), (k.phase === "printed" || M) && /* @__PURE__ */ p("button", {
						className: "vp-tear",
						type: "button",
						"aria-label": "Tear off receipt",
						title: "Tear off receipt",
						disabled: M,
						onClick: B,
						children: /* @__PURE__ */ m("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.7",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ p("circle", {
									cx: "6",
									cy: "6",
									r: "3"
								}),
								/* @__PURE__ */ p("circle", {
									cx: "6",
									cy: "18",
									r: "3"
								}),
								/* @__PURE__ */ p("path", { d: "m8 8 12 12M8 16 20 4" })
							]
						})
					})]
				}),
				/* @__PURE__ */ m("div", {
					className: "vp-status",
					role: "status",
					"aria-live": "polite",
					"aria-atomic": "true",
					id: te,
					children: [/* @__PURE__ */ p("span", {
						className: `vp-status-icon ${j ? "vp-status-icon--printing" : ""}`,
						"aria-hidden": "true",
						title: ie,
						children: j ? /* @__PURE__ */ p("span", { className: "vp-spinner" }) : k.phase === "printed" ? /* @__PURE__ */ m("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.8",
							children: [/* @__PURE__ */ p("circle", {
								cx: "12",
								cy: "12",
								r: "10"
							}), /* @__PURE__ */ p("path", { d: "m7.5 12 3 3 6-6" })]
						}) : /* @__PURE__ */ p(vt, {})
					}), /* @__PURE__ */ p("span", {
						className: "vp-sr-only",
						children: ie
					})]
				}),
				/* @__PURE__ */ p("div", {
					className: "vp-slot",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ p("div", {
					className: "vp-paper-window",
					"aria-busy": j,
					onAnimationEnd: (e) => {
						[
							"vp-reveal",
							"vp-feed-front",
							"vp-feed-up-window"
						].includes(e.animationName) && e.target === e.currentTarget && U();
					},
					children: /* @__PURE__ */ p("div", {
						ref: E,
						className: "vp-paper-scroll",
						role: "region",
						"aria-label": "Receipt paper",
						tabIndex: k.phase === "printed" ? 0 : void 0,
						onPointerDown: (e) => {
							!D.current && e.isPrimary && k.phase === "printed" && (D.current = {
								id: e.pointerId,
								x: e.clientX,
								y: e.clientY,
								scrollTop: e.currentTarget.scrollTop,
								pointerType: e.pointerType,
								grip: !!e.target.closest(".vp-paper-grip")
							}, a === "front" && e.currentTarget.querySelector(".vp-paper")?.style.setProperty("--vp-scroll-offset", `${-e.currentTarget.scrollTop}px`), e.currentTarget.setPointerCapture(e.pointerId));
						},
						onPointerMove: (e) => {
							let t = V(e);
							if (!D.current) return;
							let n = D.current.axis === "horizontal";
							t >= (a === "front" ? n ? 72 : 96 : n ? Math.max(110, e.currentTarget.clientWidth * .65) : Math.max(120, Math.min(180, e.currentTarget.clientHeight * .45))) && (H(e), e.currentTarget.hasPointerCapture(e.pointerId) && e.currentTarget.releasePointerCapture(e.pointerId));
						},
						onPointerUp: H,
						onPointerCancel: (e) => H(e, !0),
						onKeyDown: (e) => {
							if (e.target !== e.currentTarget || k.phase !== "printed") return;
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
						onAnimationEnd: (e) => {
							[
								"vp-tear",
								"vp-tear-up",
								"vp-tear-side"
							].includes(e.animationName) && e.target === e.currentTarget && z();
						},
						children: /* @__PURE__ */ m("article", {
							className: `vp-paper ${F ? "vp-paper--markup" : I ? "vp-paper--ticket" : ""}`,
							"aria-labelledby": F || I ? void 0 : C,
							"aria-label": F || I ? "Printed document" : void 0,
							"aria-hidden": k.phase === "ready",
							children: [/* @__PURE__ */ p("span", {
								className: "vp-paper-grip",
								"aria-hidden": "true"
							}), F ? /* @__PURE__ */ p(wt, {
								content: N.content,
								logo: r
							}) : I ? /* @__PURE__ */ p(Et, { ticket: N.ticket }) : R.error ? /* @__PURE__ */ p("p", {
								className: "vp-receipt-error",
								role: "alert",
								children: R.error
							}) : /* @__PURE__ */ m(f, { children: [
								/* @__PURE__ */ m("header", {
									className: "vp-merchant",
									children: [/* @__PURE__ */ p("h2", {
										id: C,
										children: R.data.merchant.name
									}), /* @__PURE__ */ m("address", { children: [R.data.merchant.address.map((e, t) => /* @__PURE__ */ p("span", { children: e }, t)), R.data.merchant.phone && /* @__PURE__ */ m("span", { children: ["Tel: ", R.data.merchant.phone] })] })]
								}),
								/* @__PURE__ */ m("div", {
									className: "vp-order",
									children: [/* @__PURE__ */ m("span", { children: ["ORDER #", R.data.orderId] }), /* @__PURE__ */ p("time", {
										dateTime: R.data.issuedAt,
										children: R.issued
									})]
								}),
								/* @__PURE__ */ m("table", {
									className: "vp-items",
									children: [
										/* @__PURE__ */ p("caption", {
											className: "vp-sr-only",
											children: "Order items"
										}),
										/* @__PURE__ */ p("thead", {
											className: "vp-sr-only",
											children: /* @__PURE__ */ m("tr", { children: [/* @__PURE__ */ p("th", {
												scope: "col",
												children: "Item and quantity"
											}), /* @__PURE__ */ p("th", {
												scope: "col",
												children: "Amount"
											})] })
										}),
										/* @__PURE__ */ p("tbody", { children: R.data.items.map((e, t) => /* @__PURE__ */ m("tr", { children: [/* @__PURE__ */ m("th", {
											scope: "row",
											children: [
												e.quantity,
												"x ",
												e.name
											]
										}), /* @__PURE__ */ p("td", { children: R.money(e.quantity * e.unitAmount) })] }, e.id ?? t)) })
									]
								}),
								/* @__PURE__ */ m("dl", {
									className: "vp-totals",
									children: [
										/* @__PURE__ */ m("div", { children: [/* @__PURE__ */ p("dt", { children: "Subtotal" }), /* @__PURE__ */ p("dd", { children: R.money(R.totals.subtotal) })] }),
										/* @__PURE__ */ m("div", { children: [/* @__PURE__ */ m("dt", { children: [
											"Tax (",
											R.taxRate,
											"%)"
										] }), /* @__PURE__ */ p("dd", { children: R.money(R.totals.tax) })] }),
										/* @__PURE__ */ m("div", {
											className: "vp-total",
											children: [/* @__PURE__ */ p("dt", { children: "Total" }), /* @__PURE__ */ p("dd", { children: R.money(R.totals.total) })]
										})
									]
								}),
								/* @__PURE__ */ m("footer", {
									className: "vp-payment",
									children: [
										/* @__PURE__ */ m("p", {
											className: "vp-paid",
											children: [
												"Paid via ",
												R.data.payment.method,
												R.data.payment.last4 && ` (•••• ${R.data.payment.last4})`
											]
										}),
										/* @__PURE__ */ p(yt, { value: R.data.payment.authorization }),
										/* @__PURE__ */ m("p", {
											className: "vp-authorization",
											children: ["AUTH: ", R.data.payment.authorization]
										}),
										/* @__PURE__ */ p("p", {
											className: "vp-thanks",
											children: R.data.footer
										})
									]
								})
							] })]
						}, k.id)
					})
				})
			]
		})
	});
}
//#endregion
export { r as SUPPORTED_PRINTER_TAGS, Dt as VirtualPrinter, dt as cafeReceipt, ft as calculateTotals, mt as formatOrderDate, pt as moneyFormatter, t as normalizePrinterMarkup, a as normalizeTicket, n as parsePrinterMarkup, e as printerInputExamples, i as quickTicketExample };
