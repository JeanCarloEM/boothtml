!(function (n, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t(require("preact"), require("preact/hooks")))
    : "function" == typeof define && define.amd
    ? define(["preact", "preact/hooks"], t)
    : ((n || self).preactRouter = t(n.preact, n.hooks));
})(this, function (n, t) {
  var e = {};
  function r(n, t) {
    for (var e in t) n[e] = t[e];
    return n;
  }
  function i(n, t, r) {
    var i,
      o = /(?:\?([^#]*))?(#.*)?$/,
      u = n.match(o),
      c = {};
    if (u && u[1])
      for (var a = u[1].split("&"), s = 0; s < a.length; s++) {
        var h = a[s].split("=");
        c[decodeURIComponent(h[0])] = decodeURIComponent(h.slice(1).join("="));
      }
    (n = f(n.replace(o, ""))), (t = f(t || ""));
    for (var d = Math.max(n.length, t.length), l = 0; l < d; l++)
      if (t[l] && ":" === t[l].charAt(0)) {
        var v = t[l].replace(/(^:|[+*?]+$)/g, ""),
          p = (t[l].match(/[+*?]+$/) || e)[0] || "",
          m = ~p.indexOf("+"),
          y = ~p.indexOf("*"),
          g = n[l] || "";
        if (!g && !y && (p.indexOf("?") < 0 || m)) {
          i = !1;
          break;
        }
        if (((c[v] = decodeURIComponent(g)), m || y)) {
          c[v] = n.slice(l).map(decodeURIComponent).join("/");
          break;
        }
      } else if (t[l] !== n[l]) {
        i = !1;
        break;
      }
    return (!0 === r.default || !1 !== i) && c;
  }
  function o(n, t) {
    return n.rank < t.rank ? 1 : n.rank > t.rank ? -1 : n.index - t.index;
  }
  function u(n, t) {
    return (
      (n.index = t),
      (n.rank = (function (n) {
        return n.props.default ? 0 : f(n.props.path).map(c).join("");
      })(n)),
      n.props
    );
  }
  function f(n) {
    return n.replace(/(^\/+|\/+$)/g, "").split("/");
  }
  function c(n) {
    return ":" == n.charAt(0)
      ? 1 + "*+?".indexOf(n.charAt(n.length - 1)) || 4
      : 5;
  }
  var a = {},
    s = [],
    h = [],
    d = null,
    l = { url: p() },
    v = n.createContext(l);
  function p() {
    var n;
    return (
      "" +
      ((n =
        d && d.location
          ? d.location
          : d && d.getCurrentLocation
          ? d.getCurrentLocation()
          : "undefined" != typeof location
          ? location
          : a).pathname || "") +
      (n.search || "")
    );
  }
  function m(n, t) {
    return (
      void 0 === t && (t = !1),
      "string" != typeof n && n.url && ((t = n.replace), (n = n.url)),
      (function (n) {
        for (var t = s.length; t--; ) if (s[t].canRoute(n)) return !0;
        return !1;
      })(n) &&
        (function (n, t) {
          void 0 === t && (t = "push"),
            d && d[t]
              ? d[t](n)
              : "undefined" != typeof history &&
                history[t + "State"] &&
                history[t + "State"](null, null, n);
        })(n, t ? "replace" : "push"),
      y(n)
    );
  }
  function y(n) {
    for (var t = !1, e = 0; e < s.length; e++) s[e].routeTo(n) && (t = !0);
    return t;
  }
  function g(n) {
    if (n && n.getAttribute) {
      var t = n.getAttribute("href"),
        e = n.getAttribute("target");
      if (t && t.match(/^\//g) && (!e || e.match(/^_?self$/i))) return m(t);
    }
  }
  function k(n) {
    return (
      n.stopImmediatePropagation && n.stopImmediatePropagation(),
      n.stopPropagation && n.stopPropagation(),
      n.preventDefault(),
      !1
    );
  }
  function U(n) {
    if (!(n.ctrlKey || n.metaKey || n.altKey || n.shiftKey || n.button)) {
      var t = n.target;
      do {
        if ("a" === t.localName && t.getAttribute("href")) {
          if (t.hasAttribute("data-native") || t.hasAttribute("native")) return;
          if (g(t)) return k(n);
        }
      } while ((t = t.parentNode));
    }
  }
  var C = !1;
  function b(n) {
    n.history && (d = n.history), (this.state = { url: n.url || p() });
  }
  return (
    r((b.prototype = new n.Component()), {
      shouldComponentUpdate: function (n) {
        return (
          !0 !== n.static ||
          n.url !== this.props.url ||
          n.onChange !== this.props.onChange
        );
      },
      canRoute: function (t) {
        var e = n.toChildArray(this.props.children);
        return void 0 !== this.g(e, t);
      },
      routeTo: function (n) {
        this.setState({ url: n });
        var t = this.canRoute(n);
        return this.p || this.forceUpdate(), t;
      },
      componentWillMount: function () {
        this.p = !0;
      },
      componentDidMount: function () {
        var n = this;
        C ||
          ((C = !0),
          d ||
            addEventListener("popstate", function () {
              y(p());
            }),
          addEventListener("click", U)),
          s.push(this),
          d &&
            (this.u = d.listen(function (t) {
              var e = t.location || t;
              n.routeTo("" + (e.pathname || "") + (e.search || ""));
            })),
          (this.p = !1);
      },
      componentWillUnmount: function () {
        "function" == typeof this.u && this.u(), s.splice(s.indexOf(this), 1);
      },
      componentWillUpdate: function () {
        this.p = !0;
      },
      componentDidUpdate: function () {
        this.p = !1;
      },
      g: function (n, t) {
        n = n.filter(u).sort(o);
        for (var e = 0; e < n.length; e++) {
          var r = n[e],
            f = i(t, r.props.path, r.props);
          if (f) return [r, f];
        }
      },
      render: function (t, e) {
        var i,
          o,
          u = t.onChange,
          f = e.url,
          c = this.c,
          a = this.g(n.toChildArray(t.children), f);
        if (
          (a &&
            (o = n.cloneElement(
              a[0],
              r(r({ url: f, matches: (i = a[1]) }, i), {
                key: void 0,
                ref: void 0,
              }),
            )),
          f !== (c && c.url))
        ) {
          r(
            l,
            (c = this.c =
              {
                url: f,
                previous: c && c.url,
                current: o,
                path: o ? o.props.path : null,
                matches: i,
              }),
          ),
            (c.router = this),
            (c.active = o ? [o] : []);
          for (var s = h.length; s--; ) h[s]({});
          "function" == typeof u && u(c);
        }
        return n.h(v.Provider, { value: c }, o);
      },
    }),
    (b.getCurrentUrl = p),
    (b.route = m),
    (b.Router = b),
    (b.Route = function (t) {
      return n.h(t.component, t);
    }),
    (b.Link = function (t) {
      return n.h("a", r({ onClick: U }, t));
    }),
    (b.exec = i),
    (b.useRouter = function () {
      var n = t.useContext(v);
      if (n === l) {
        var e = t.useState()[1];
        t.useEffect(function () {
          return (
            h.push(e),
            function () {
              return h.splice(h.indexOf(e), 1);
            }
          );
        }, []);
      }
      return [n, m];
    }),
    b
  );
});
//# sourceMappingURL=preact-router.umd.js.map
