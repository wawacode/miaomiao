/*! js weidian 2014-09-15 */
var $ = function(a) {
    return a ? "object" == typeof a ? new B(a) : "string" == typeof a ? new B(0 === a.indexOf("#") ? document.querySelector(a) : document.querySelectorAll(a)) : void 0 : null
},
$$ = function(a) {
    return 0 === a.indexOf("#") ? document.querySelector(a) : document.querySelectorAll(a)
},
B = function(a) {
    this.parent = function() {
        return new B(a.parentNode)
    },
    this.children = function() {
        return new B(a.children)
    },
    this.eq = function(b) {
        return new B(a[b])
    },
    this.each = function(b) {
        if (! (a && a.length && b)) return 0;
        for (var c = a.length,
        d = 0; c > d; d++) b.call(a[d], d)
    },
    this.length = function() {
        return a ? a.length ? a.length: a.innerHTML || a.value || a.tagName ? 1 : 0 : 0
    },
    this.css = function(b, c) {
        if ("object" == typeof b) {
            for (var d in b) {
                var e = d,
                f = d.indexOf("-");
                if ( - 1 != f) {
                    var g = d.substring(f + 1, f + 2);
                    d = d.replace("-" + g, g.toUpperCase())
                }
                a.style[d] = b[e]
            }
            return this
        }
        var f = b.indexOf("-");
        if ( - 1 != f) {
            var g = b.substring(f + 1, f + 2);
            b = b.replace("-" + g, g.toUpperCase())
        }
        return b && !c ? a.style[b] : (a.style[b] = c, this)
    },
    this.attr = function(b, c) {
        if ("object" == typeof b) {
            for (var d in b) a.setAttribute(d, b[d]);
            return this
        }
        return b && 1 === arguments.length ? a.getAttribute(b) : (a.setAttribute(b, c), this)
    },
    this.val = function(b) {
        return b || "string" == typeof b ? (a.value = b, this) : a.value
    },
    this.html = function(b) {
        var c = "number" == typeof b ? b.toString() : b;
        return c || "string" == typeof arguments[0] ? (a.innerHTML = c, this) : a.length ? a[0].innerHTML: a.innerHTML
    },
    this.prev = function() {
        return new B(a.previousElementSibling)
    },
    this.next = function() {
        return new B(a.nextElementSibling)
    },
    this.addClass = function(b) {
        if (!b) return this;
        var c = this.length();
        if (1 == c) {
            if (a.length) if (a[0].classList) a[0].classList.add(b);
            else {
                var d = a[0].className; - 1 == d.indexOf(b) && (a[0].className = d + " " + b)
            } else if (a.classList) a.classList.add(b);
            else {
                var d = a.className; - 1 == d.indexOf(b) && (a.className = d + " " + b)
            }
            return this
        }
        if (c > 1) {
            if (a[0].classList) for (var e = c; e--;) a[e].classList.add(b);
            else for (var e = c; e--;) {
                var d = a[e].className; - 1 == d.indexOf(b) && (a[e].className = d + " " + b)
            }
            return a[c - 1]
        }
    },
    this.removeClass = function(b) {
        if (!b) return this;
        var c = this.length();
        if (1 == c) {
            if (a.length) if (a[0].classList) a[0].classList.remove(b);
            else {
                var d = a[0].className; - 1 != d.indexOf(b) && (a[0].className = d.replace(b, ""))
            } else if (a.classList) a.classList.remove(b);
            else {
                var d = a.className; - 1 != d.indexOf(b) && (a.className = d.replace(b, ""))
            }
            return this
        }
        if (c > 1) {
            if (a[0].classList) for (var e = c; e--;) a[e].classList.remove(b);
            else for (var e = c; e--;) {
                var d = a[e].className; - 1 != d.indexOf(b) && (a[e].className = d.replace(b, ""))
            }
            return a[c - 1]
        }
    },
    this.clearClass = function() {
        var b = a.length;
        if (b) {
            for (var c = b; c--;) a[c].className = "";
            return a[b - 1]
        }
        return a.className = "",
        this
    },
    this.hasClass = function(b) {
        return a.classList ? a.classList.contains(b) : -1 != a.className.indexOf(b) ? !0 : !1
    },
    this.hide = function() {
        return a.style.display = "none",
        this
    },
    this.show = function() {
        return a.style.display = "block",
        this
    },
    this.remove = function() {
        a.parentNode.removeChild(a)
    },
    this.trigger = function(b) {
        var c = document.createEvent("Event");
        return c.initEvent(b, !0, !0),
        a.dispatchEvent(c),
        this
    },
    this.bind = function(b, c) {
        if (a.length) {
            if (1 != a.length) {
                for (var d = this.length(), e = d; e--;) a[e].addEventListener(b,
                function(event) {
                    c.call(this, event)
                },
                !1);
                return a[d - 1]
            }
            a[0].addEventListener(b,
            function(event) {
                c.call(this, event)
            },
            !1)
        } else {
            if (! (a.innerHTML || a === window || a.value || a.tagName)) return null;
            a.addEventListener(b,
            function(event) {
                c.call(this, event)
            },
            !1)
        }
        return this
    },
    this.unbind = function(b, c) {
        return a.removeEventListener(b, c, !1),
        this
    },
    this.width = function() {
        return a.offsetWidth
    },
    this.height = function() {
        return a.offsetHeight
    },
    this.offset = function() {
        return {
            top: a.offsetTop,
            left: a.offsetLeft
        }
    },
    this.find = function(b) {
        return new B(a.querySelectorAll(b))
    },
    this.append = function(b) {
        return "string" == typeof b ? a.innerHTML += b: a.appendChild(b),
        this
    },
    this.prepend = function(b) {
        if ("string" == typeof b) {
            var c = a.innerHTML;
            a.innerHTML = b + c
        }
        return this
    },
    this.fadeIn = function(b, c, d) {
        var e, f, g = document.createElement("div").style;
        "webkitTransition" in g ? (e = "webkitTransition", f = "webkitTransitionEnd") : (e = "transition", f = "transitionend");
        var h, i = this,
        j = !1;
        "function" == typeof b ? (h = 200, j = !0) : h = b > 200 ? b: 200,
        d ? (i.css(e, "opacity 200ms ease"), setTimeout(function() {
            i.css("opacity", .1);
            var d = function() {
                $(this).hide(),
                j ? b.call(this) : c && c.call(this),
                a.removeEventListener(f, d, !1)
            };
            a.addEventListener(f, d, !1)
        },
        100)) : (i.css(e, "opacity " + h + "ms ease").css({
            opacity: 0,
            display: "block"
        }), setTimeout(function() {
            i.css("opacity", 1);
            var d = function() {
                j ? b.call(this) : c && c.call(this),
                a.removeEventListener(f, d, !1)
            };
            a.addEventListener(f, d, !1)
        },
        100))
    },
    this.fadeOut = function(a, b) {
        this.fadeIn(a, b, !0)
    },
    this.animate = function(b, c, d, e, f) {
        var g, h, i = document.createElement("div").style,
        j = new Array;
        for (var k in b) j.push(k);
        "webkitTransition" in i ? (g = "webkitTransition", h = "webkitTransitionEnd") : (g = "transition", h = "transitionend");
        for (var l = function(a) {
            d ? d.call(this) : "",
            a.target.removeEventListener(h, l, !1)
        },
        m = new Array, n = j.length, o = n; o--;) m.push(j[o] + " " + (c ? c / 1e3 + "s": ".2s") + " " + (f ? f / 1e3 + "s": "0s"));
        this.css(g, m.join(",")),
        a.addEventListener(h, l, !1);
        for (var p = n; p--;) {
            var q = j[p];
            this.css(q, b[q])
        }
        return this
    }
},
M = {
    version: "915",
    sUrl: function(a, b, c) {
        return a ? b ? "/item.html?itemID=" + b + (c ? "&" + c: "") : "/?userid=" + a + (c ? "&" + c: "") : void 0
    },
    toJSON: function(a) {
        return JSON.stringify(a)
    },
    json: function(a) {
        return JSON.parse(a)
    },
    post: function(a, b, c) {
        var d = new Date,
        e = d.getTime() + "_" + Math.random().toString().substr(2),
        f = "post_" + e;
        window[f] = function(a) {
            window[f] = void 0,
            c(a),
            h.removeChild(j),
            h.removeChild(i)
        };
        var g = document,
        h = g.body,
        i = g.createElement("iframe");
        i.style.display = "none",
        i.name = "post_iframe",
        i.src = "about:blank",
        h.appendChild(i);
        var j = g.createElement("form");
        j.action = a,
        j.method = "post",
        j.target = "post_iframe",
        j.style.display = "none";
        var k = g.createElement("textarea");
        k.name = "param",
        k.value = b,
        j.appendChild(k);
        var l = g.createElement("textarea");
        l.name = "callback",
        l.value = f,
        j.appendChild(l);
        var m = g.createElement("textarea");
        m.name = "callbackURL",
        m.value = "http://" + location.host + "/others/post_callback.html",
        j.appendChild(m),
        h.appendChild(j),
        j.submit()
    },
    orignPost: function(a, b, c) {
        var d = new XMLHttpRequest;
        d.open("POST", a, !0),
        d.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
        d.onreadystatechange = function() {
            4 == d.readyState && 200 == d.status && c(M.json(d.responseText))
        },
        d.send("param=" + b)
    },
    jsonp: function(a, b, c) {
        var d = new Date,
        e = d.getTime() + "_" + Math.random().toString().substr(2),
        f = "jsonpcallback_" + e,
        g = "interval_" + e;
        window[f] = function(a) {
            window[f] = void 0,
            b && b(a)
        },
        window[g] = setInterval(function() {
            new Date - d > 8e3 && (clearInterval(window[g]), c && c())
        },
        100),
        M.loadScript(a + ( - 1 == a.indexOf("?") ? "?callback=": "&callback=") + f,
        function() {
            clearInterval(window[g])
        })
    },
    get: function(a, b) {
        function c() {
            d.abort()
        }
        var d = new XMLHttpRequest;
        d.open("GET", a, !0),
        d.send(),
        window.getAJAXVariable = d,
        d.onreadystatechange = function() {
            if (4 == d.readyState) switch (d.status) {
            case 200:
                b(M.json(d.responseText));
                break;
            case 404:
                console.log("404--URL地址未找到"),
                c();
                break;
            case 500:
                console.log("500--服务器错误"),
                c()
            }
        }
    },
    abortAJAX: function(a) {
        "get" == a.methond.toLowerCase() && window.getAJAXVariable.abort()
    },
    loadScript: function(a, b) {
        var c = document.createElement("script");
        c.readyState ? c.onreadystatechange = function() { ("loaded" == c.readyState || "complete" == c.readyState) && (c.onreadystatechange = null, b && b())
        }: c.onload = function() {
            b && b()
        },
        c.src = a.indexOf("?") > 0 ? a + "&ver=" + M.version: a + "?ver=" + M.version;
        var d = document.getElementsByTagName("script")[0];
        d.parentNode.insertBefore(c, d)
    },
    urlQuery: function(a) {
        var b = location.search;
        b = b.replace(/#[^&]*$/, "");
        var c = b.indexOf(a + "=");
        if ( - 1 != c) {
            var d = b.substr(c),
            e = new Array;
            return e = -1 == d.indexOf("&") ? d.split("=") : d.substr(0, d.indexOf("&")).split("="),
            e[1]
        }
        return ""
    },
    f_seller_id: function() {
        return M.urlQuery("f_seller_id")
    },
    getsellerUrl: function() {
        var a = M.urlQuery("f_seller_id");
        if (a) {
            M.setCookie("f_seller_id", a);
            var b = "&f_seller_id=" + a;
            return b
        }
        return ""
    },
    getCookie: function(a) {
        var b = document.cookie.indexOf(a + "="),
        c = document.cookie.indexOf(";", b);
        return - 1 == b ? "": unescape(document.cookie.substring(b + a.length + 1, c > b ? c: document.cookie.length))
    },
    setCookie: function(a, b, c) {
        var d = new Date;
        d.setTime(d.getTime() + 2592e6);
        var e = "; path=/" + ( - 1 != document.domain.indexOf("vdian.com") ? "; domain=vdian.com": -1 != document.domain.indexOf("koudai.com") ? "; domain=koudai.com": "");
        if ("object" == typeof a) for (var f in a) {
            var g = escape(f) + "=" + escape(a[f]);
            document.cookie = g + "; expires=" + d.toGMTString() + e
        } else {
            var g = escape(a) + "=" + escape(b);
            document.cookie = g + (c ? "": "; expires=" + d.toGMTString()) + e
        }
    },
    delCookie: function(a) {
        var b = "; path=/" + ( - 1 != document.domain.indexOf("vdian.com") ? "; domain=vdian.com": -1 != document.domain.indexOf("koudai.com") ? "; domain=koudai.com": "");
        document.cookie = escape(a) + "=; expires=" + new Date(0).toUTCString() + b
    },
    clearCookie: function() {
        var a = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (a) for (var b = a.length,
        c = b; c--;) M.delCookie(a[c])
    },
    switchCookie: function() {
        var a = M.getCookie("WD_clear_domain"),
        b = M.getCookie("WD_a"),
        c = M.getCookie("buyer_id"),
        d = M.getCookie("WD_guid"),
        e = M.getCookie("WD_close_favor"),
        f = M.getCookie("WD_s_id"),
        g = M.getCookie("WD_s_client"),
        h = M.getCookie("WD_s_wduss"),
        i = M.getCookie("WD_b_id"),
        j = M.getCookie("WD_b_wduss"),
        k = M.getCookie("WD_b_kduss");
        if (b_tele = M.getCookie("WD_b_tele"), b_country_code = M.getCookie("WD_b_country"), visit_log = M.getCookie("WD_visit_log"), lastReqTime = M.getCookie("lastReqTime"), IM_enter = M.getCookie("IM_enter"), WD_wfr = M.getCookie("WD_wfr"), appid = M.getCookie("from_appid"), !b) var l = M.getCookie("WD_temp_nam"),
        m = M.getCookie("WD_temp_tele"),
        n = M.getCookie("WD_temp_province"),
        o = M.getCookie("WD_temp_city"),
        p = M.getCookie("WD_temp_district"),
        q = M.getCookie("WD_temp_add"),
        r = M.getCookie("WD_temp_remark"),
        s = M.getCookie("WD_temp_wxID");
        var t = M.getCookie("Market_go_market");
        if (t) var u = M.getCookie("Market_userid"),
        v = M.getCookie("Market_client"),
        w = M.getCookie("Market_wduss"),
        x = M.getCookie("Market_viewedPage"),
        y = M.getCookie("Market_viewedPX"),
        z = M.getCookie("Market_items_viewedPage"),
        A = M.getCookie("Market_items_viewedPX");
        var B = M.getCookie("bbs_action");
        if (B) var C = M.getCookie("bbs_viewedPage"),
        D = M.getCookie("bbs_viewedPX"),
        B = M.getCookie("bbs_action"),
        E = M.getCookie("bbs_type");
        M.clearCookie(),
        M.setCookie({
            WD_clear_domain: a,
            buyer_id: c,
            WD_guid: d,
            WD_close_favor: e,
            WD_s_id: f,
            WD_s_client: g,
            WD_s_wduss: h,
            WD_b_id: i,
            WD_b_wduss: j,
            WD_b_kduss: k,
            WD_b_tele: b_tele,
            WD_b_country: b_country_code,
            WD_visit_log: visit_log,
            lastReqTime: lastReqTime,
            IM_enter: IM_enter,
            WD_wfr: WD_wfr,
            from_appid: appid
        }),
        b ? M.setCookie("WD_a", b) : M.setCookie({
            WD_temp_nam: l,
            WD_temp_tele: m,
            WD_temp_province: n,
            WD_temp_city: o,
            WD_temp_district: p,
            WD_temp_add: q,
            WD_temp_remark: r,
            WD_temp_wxID: s
        }),
        t && M.setCookie({
            Market_go_market: t,
            Market_userid: u,
            Market_client: v,
            Market_wduss: w,
            Market_viewedPage: x,
            Market_viewedPX: y,
            Market_items_viewedPage: z,
            Market_items_viewedPX: A
        }),
        B && M.setCookie({
            bbs_viewedPage: C,
            bbs_viewedPX: D,
            bbs_action: B,
            bbs_type: E
        })
    },
    ua: function() {
        return navigator.userAgent.toLowerCase()
    },
    isMobile: function() {
        return M.ua().match(/iPhone|iPad|iPod|Android|IEMobile/i)
    },
    isAndroid: function() {
        return - 1 != M.ua().indexOf("android") ? 1 : 0
    },
    isIOS: function() {
        var a = M.ua();
        return - 1 != a.indexOf("iphone") || -1 != a.indexOf("ipad") || -1 != a.indexOf("ipod") ? 1 : 0
    },
    platform: function() {
        return M.isMobile() ? M.isIOS() ? "IOS": M.isAndroid() ? "Android": "other-mobile": "PC"
    },
    isWeixin: function() {
        return - 1 != M.ua().indexOf("micromessenger") ? 1 : 0
    },
    isWeixinPay: function() {
        if (M.isWeixin()) {
            var a = M.ua(),
            b = a.substr(a.indexOf("micromessenger"), 18).split("/");
            return Number(b[1]) >= 5 ? 1 : 0
        }
        return 0
    },
    _alert: function(a, b, c) {
        function d(a) {
            c ? b && b() : setTimeout(function() {
                a.fadeOut(function() {
                    a.parent().fadeOut(function() {
                        $(this).remove()
                    }),
                    b && b()
                })
            },
            1500)
        }
        if ($("#_alert_bg").length) $("#_alert_content").html(a),d($("#_alert_content"));
        else {
            var e = window.top.document,
            f = e.createElement("div");
            f.setAttribute("id", "_alert_bg"),
            e.body.appendChild(f);
            var g = e.createElement("div");
            g.setAttribute("id", "_alert_content"),
            f.appendChild(g),
            $(g).html(a).fadeIn(function() {
                d($(this))
            })
        }
    },
    _confirm: function(a, b, c, d, e) {
        var f = document,
        g = f.createElement("div");
        g.setAttribute("id", "_confirm_bg"),
        f.body.appendChild(g);
        var h = f.createElement("div");
        h.setAttribute("id", "_confirm_content"),
        g.appendChild(h);
        var i = $("#_confirm_content"),
        j = "";
        j = j + "<p>" + a + "</p>",
        j += "<div id='_confirm_btnW'>",
        c && c[0] ? (j = j + "<div id='_confirm_btnA' class='" + b[1] + "'>" + b[0] + "</div>", j = j + "<div id='_confirm_btnB' class='" + c[1] + "'>" + c[0] + "</div>") : j = j + "<div id='_confirm_btnA' class='" + b[1] + "' style='width:100%;border-right:none'>" + b[0] + "</div>",
        j += "</div>",
        i.html(j).fadeIn(),
        $("#_confirm_btnA").bind("click",
        function() {
            e && e(),
            i.fadeOut(),
            $("#_confirm_bg").fadeOut(function() {
                $(this).remove()
            })
        }),
        c && c[0] && $("#_confirm_btnB").bind("click",
        function() {
            d && d(),
            i.fadeOut(),
            $("#_confirm_bg").fadeOut(function() {
                $(this).remove()
            })
        })
    },
    isLogin: function() {
        return M.getCookie("WD_b_id") && M.getCookie("WD_b_wduss") && M.getCookie("WD_b_kduss") && M.getCookie("WD_b_tele") && M.getCookie("WD_b_country") ? 1 : 0
    },
    doLogin: function() {
        M.loadScript("http://s.koudai.com/script/common/doLogin.js")
    },
    loadToolBar: function(a) {
        setTimeout(function() {
            M.umk = a || M.urlQuery("umk"),
            M.loadScript("http://s.koudai.com/script/common/tool_bar.js")
        },
        500)
    },
    doHistory: function(a) {
        console.log("开始 doHistory " + a);
        var b = document.referrer,
        c = location.pathname;
        if (b && !M.urlQuery("hd_back") && -1 == b.indexOf(c)) {
            var d = -1 == b.indexOf("hd_back=1") ? -1 != b.indexOf("?") ? b + "&hd_back=1": b + "?hd_back=1": b;
            if ( - 1 != d.indexOf("code=") && -1 != d.indexOf("&state=isWXAddr")) {
                var e = d.indexOf("code="),
                f = d.substr(e),
                g = f.substr(0, f.indexOf("&state=isWXAddr")),
                h = -1 != d.indexOf("isWXAddr&") ? "isWXAddr&": "isWXAddr",
                i = -1 != d.indexOf("&code=") ? "&": "";
                d = d.replace(i + g + "&state=" + h, "")
            }
            M.setCookie(a, d, !0)
        } else if (!M.getCookie(a)) {
            var j = M.urlQuery("umk") || M.urlQuery("userid");
            j && M.setCookie(a, M.sUrl(j), !0)
        }
        M.getCookie(a) && $("#hd_back").attr("href", M.getCookie(a)).show()
    },
    gaq: function(a) {
        ga("send", "event", a, "click", M.platform())
    },
    trackVisit: function(a) {
        var b = a.frid ? "&frid=" + a.frid: "";
        M.jsonp("http://wd.koudai.com/vshop/1/H5/H5TrackVisit.php?buyer_id=" + M.getCookie("buyer_id") + "&track_type=" + a.track_type + "&item_id=" + a.item_id + "&user_id=" + a.user_id + "&guid=" + M.getCookie("WD_guid") + "&wfr=" + M.getCookie("WD_wfr") + b)
    },
    extend: function(a) {
        "object" == typeof E ? a && a() : M.loadScript("http://s.koudai.com/script/common/extend.js",
        function() {
            a && a()
        })
    },
    cartUrl: function() {
        return Number(M.getCookie("WD_is_cart_code")) ? "mycart.html": "cart.html"
    },
    init: function() {
        if ( - 1 != M.ua().indexOf("msie 6.") || -1 != M.ua().indexOf("msie 7.") || -1 != M.ua().indexOf("msie 8.") || -1 != M.ua().indexOf("msie 9.")) {
            console = new Object,
            console.log = function() {
                return ""
            };
            var a = document,
            b = a.createElement("div");
            b.setAttribute("id", "ie_div"),
            b.innerHTML = "由于浏览器版本较低，部分结果可能无法正常展示，建议升级浏览器或使用Chrome Firefox Opera等浏览器",
            a.body.insertBefore(b, a.body.children[0])
        }
        var c = document.domain;
        if ( - 1 != c.indexOf("vdian.com")) document.domain = "vdian.com";
        else if ( - 1 != c.indexOf("koudai.com") && (document.domain = "koudai.com", 1 !== Number(M.getCookie("WD_clear_domain")))) {
            console.log("begin_clear_domain");
            var d = function(a) {
                document.cookie = escape(a) + "=; expires=" + new Date(0).toUTCString() + "; path=/",
                document.cookie = escape(a) + "=; expires=" + new Date(0).toUTCString() + "; path=/; domain=wd.koudai.com"
            },
            e = function() {
                var a = document.cookie.match(/[^ =;]+(?=\=)/g);
                if (a) for (var b = a.length,
                c = b; c--;) d(a[c])
            };
            e(),
            M.setCookie("WD_clear_domain", 1)
        }
        if (M.getCookie("WD_guid") || M.setCookie("WD_guid", (new Date).getTime() + "_" + Math.random().toString().substr(2)), M.urlQuery("appid") && M.setCookie("from_appid", M.urlQuery("appid")), M.urlQuery("b_id") && M.urlQuery("b_uss")) {
            M.switchCookie();
            var f = M.urlQuery("b_id"),
            g = M.urlQuery("b_uss");
            "wdapp" !== M.getCookie("WD_platform") && M.setCookie("WD_platform", "wdapp", !0);
            var h = {
                userID: f,
                wduss: g
            };
            M.jsonp("http://login.koudai.com/weidian/convertBuyerIdentity?param=" + M.toJSON(h),
            function(a) {
                if (0 === Number(a.status.status_code)) {
                    var b = a.result;
                    M.setCookie("WD_b_id", b.koudaiID),
                    M.setCookie("WD_b_wduss", b.wduss),
                    M.setCookie("WD_b_kduss", b.kduss),
                    M.setCookie("WD_b_tele", b.telephone),
                    M.setCookie("WD_b_country", b.country_code)
                }
            })
        }
        if (localStorage.length > 1) {
            for (var i in localStorage) M.setCookie(i, localStorage[i]);
            localStorage.clear()
        }
        $(".for_gaq").bind("click",
        function() {
            M.gaq($(this).attr("data-for-gaq"))
        })
    }
};
window.onerror = function() {
    function a() {
        var a = new Date,
        b = a.getFullYear().toString().substring(2),
        c = a.getMonth() + 1,
        d = a.getDate(),
        e = a.getHours(),
        f = a.getMinutes(),
        g = a.getSeconds();
        return b + "-" + c + "-" + d + " " + e + ":" + f + ":" + g
    }
    var b = new Array;
    arglen = arguments.length;
    for (var c = arglen; c--;) b.push(arguments[c]);
    console.log(b.join("\n"));
    var d = new Array;
    d.push("appPlatform=weidianH5"),
    d.push("platform=html5"),
    d.push("url=" + encodeURIComponent(location.host + location.pathname)),
    d.push("params=" + encodeURIComponent(location.search)),
    d.push("dataContent=" + encodeURIComponent(M.toJSON({
        time: a(),
        err: b.join("|"),
        ua: M.ua()
    })));
    var e = document.createElement("img");
    return e.width = 1,
    e.height = 1,
    e.src = "",
    !0
},
M.init(),
function(a, b, c, d, e, f, g) {
    a.GoogleAnalyticsObject = e,
    a[e] = a[e] ||
    function() { (a[e].q = a[e].q || []).push(arguments)
    },
    a[e].l = 1 * new Date,
    f = b.createElement(c),
    g = b.getElementsByTagName(c)[0],
    f.async = 1,
    f.src = d,
    g.parentNode.insertBefore(f, g)
} (window, document, "script", "//www.google-analytics.com/analytics.js", "ga"),
ga("create", "UA-23269961-12", "auto", {
    allowLinker: !0
}),
ga("require", "linker"),
ga("linker:autoLink", ["koudai.com", "vdian.com"]),
ga("send", "pageview");