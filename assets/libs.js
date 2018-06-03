(function () {
    function e() {
    }

    function t(e, t) {
        for (var n = e.length; n--;) if (e[n].listener === t) return n;
        return -1
    }

    function n(e) {
        return function () {
            return this[e].apply(this, arguments)
        }
    }

    var i = e.prototype, r = this, o = r.EventEmitter;
    i.getListeners = function (e) {
        var t, n, i = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
        } else t = i[e] || (i[e] = []);
        return t
    }, i.flattenListeners = function (e) {
        var t, n = [];
        for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
        return n
    }, i.getListenersAsObject = function (e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, i.addListener = function (e, n) {
        var i, r = this.getListenersAsObject(e), o = "object" == typeof n;
        for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {listener: n, once: !1});
        return this
    }, i.on = n("addListener"), i.addOnceListener = function (e, t) {
        return this.addListener(e, {listener: t, once: !0})
    }, i.once = n("addOnceListener"), i.defineEvent = function (e) {
        return this.getListeners(e), this
    }, i.defineEvents = function (e) {
        for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
        return this
    }, i.removeListener = function (e, n) {
        var i, r, o = this.getListenersAsObject(e);
        for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
        return this
    }, i.off = n("removeListener"), i.addListeners = function (e, t) {
        return this.manipulateListeners(!1, e, t)
    }, i.removeListeners = function (e, t) {
        return this.manipulateListeners(!0, e, t)
    }, i.manipulateListeners = function (e, t, n) {
        var i, r, o = e ? this.removeListener : this.addListener, s = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp) for (i = n.length; i--;) o.call(this, t, n[i]); else for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
        return this
    }, i.removeEvent = function (e) {
        var t, n = typeof e, i = this._getEvents();
        if ("string" === n) delete i[e]; else if ("object" === n) for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t]; else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (e, t) {
        var n, i, r, o, s = this.getListenersAsObject(e);
        for (r in s) if (s.hasOwnProperty(r)) for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function (e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, i.setOnceReturnValue = function (e) {
        return this._onceReturnValue = e, this
    }, i._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, i._getEvents = function () {
        return this._events || (this._events = {})
    }, e.noConflict = function () {
        return r.EventEmitter = o, e
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
        return e
    }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this), function (e) {
    function t(t) {
        var n = e.event;
        return n.target = n.target || n.srcElement || t, n
    }

    var n = document.documentElement, i = function () {
    };
    n.addEventListener ? i = function (e, t, n) {
        e.addEventListener(t, n, !1)
    } : n.attachEvent && (i = function (e, n, i) {
        e[n + i] = i.handleEvent ? function () {
            var n = t(e);
            i.handleEvent.call(i, n)
        } : function () {
            var n = t(e);
            i.call(e, n)
        }, e.attachEvent("on" + n, e[n + i])
    });
    var r = function () {
    };
    n.removeEventListener ? r = function (e, t, n) {
        e.removeEventListener(t, n, !1)
    } : n.detachEvent && (r = function (e, t, n) {
        e.detachEvent("on" + t, e[t + n]);
        try {
            delete e[t + n]
        } catch (i) {
            e[t + n] = void 0
        }
    });
    var o = {bind: i, unbind: r};
    "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
}(this), function (e, t) {
    "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, i) {
        return t(e, n, i)
    }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
}(window, function (e, t, n) {
    function i(e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }

    function r(e) {
        return "[object Array]" === d.call(e)
    }

    function o(e) {
        var t = [];
        if (r(e)) t = e; else if ("number" == typeof e.length) for (var n = 0, i = e.length; i > n; n++) t.push(e[n]); else t.push(e);
        return t
    }

    function s(e, t, n) {
        if (!(this instanceof s)) return new s(e, t);
        "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
        var r = this;
        setTimeout(function () {
            r.check()
        })
    }

    function f(e) {
        this.img = e
    }

    function c(e) {
        this.src = e, v[e] = this
    }

    var a = e.jQuery, u = e.console, h = u !== void 0, d = Object.prototype.toString;
    s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function () {
        this.images = [];
        for (var e = 0, t = this.elements.length; t > e; e++) {
            var n = this.elements[e];
            "IMG" === n.nodeName && this.addImage(n);
            var i = n.nodeType;
            if (i && (1 === i || 9 === i || 11 === i)) for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) {
                var f = r[o];
                this.addImage(f)
            }
        }
    }, s.prototype.addImage = function (e) {
        var t = new f(e);
        this.images.push(t)
    }, s.prototype.check = function () {
        function e(e, r) {
            return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
        }

        var t = this, n = 0, i = this.images.length;
        if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
        for (var r = 0; i > r; r++) {
            var o = this.images[r];
            o.on("confirm", e), o.check()
        }
    }, s.prototype.progress = function (e) {
        this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
        var t = this;
        setTimeout(function () {
            t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
        })
    }, s.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var t = this;
        setTimeout(function () {
            if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                var n = t.hasAnyBroken ? "reject" : "resolve";
                t.jqDeferred[n](t)
            }
        })
    }, a && (a.fn.imagesLoaded = function (e, t) {
        var n = new s(this, e, t);
        return n.jqDeferred.promise(a(this))
    }), f.prototype = new t, f.prototype.check = function () {
        var e = v[this.img.src] || new c(this.img.src);
        if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
        if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
        var t = this;
        e.on("confirm", function (e, n) {
            return t.confirm(e.isLoaded, n), !0
        }), e.check()
    }, f.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emit("confirm", this, t)
    };
    var v = {};
    return c.prototype = new t, c.prototype.check = function () {
        if (!this.isChecked) {
            var e = new Image;
            n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
        }
    }, c.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, c.prototype.onload = function (e) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(e)
    }, c.prototype.onerror = function (e) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
    }, c.prototype.confirm = function (e, t) {
        this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
    }, c.prototype.unbindProxyEvents = function (e) {
        n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
    }, s
});
!function (a) {
    "use strict";

    function b() {
    }

    function c() {
        try {
            return document.activeElement
        } catch (a) {
        }
    }

    function d(a, b) {
        for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return !0;
        return !1
    }

    function e(a, b, c) {
        return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : void 0
    }

    function f(a, b) {
        var c;
        a.createTextRange ? (c = a.createTextRange(), c.move("character", b), c.select()) : a.selectionStart && (a.focus(), a.setSelectionRange(b, b))
    }

    function g(a, b) {
        try {
            return a.type = b, !0
        } catch (c) {
            return !1
        }
    }

    function h(a, b) {
        if (a && a.getAttribute(B)) b(a); else for (var c, d = a ? a.getElementsByTagName("input") : N, e = a ? a.getElementsByTagName("textarea") : O, f = d ? d.length : 0, g = e ? e.length : 0, h = f + g, i = 0; h > i; i++) c = f > i ? d[i] : e[i - f], b(c)
    }

    function i(a) {
        h(a, k)
    }

    function j(a) {
        h(a, l)
    }

    function k(a, b) {
        var c = !!b && a.value !== b, d = a.value === a.getAttribute(B);
        if ((c || d) && "true" === a.getAttribute(C)) {
            a.removeAttribute(C), a.value = a.value.replace(a.getAttribute(B), ""), a.className = a.className.replace(A, "");
            var e = a.getAttribute(I);
            parseInt(e, 10) >= 0 && (a.setAttribute("maxLength", e), a.removeAttribute(I));
            var f = a.getAttribute(D);
            return f && (a.type = f), !0
        }
        return !1
    }

    function l(a) {
        var b = a.getAttribute(B);
        if ("" === a.value && b) {
            a.setAttribute(C, "true"), a.value = b, a.className += " " + z;
            var c = a.getAttribute(I);
            c || (a.setAttribute(I, a.maxLength), a.removeAttribute("maxLength"));
            var d = a.getAttribute(D);
            return d ? a.type = "text" : "password" === a.type && g(a, "text") && a.setAttribute(D, "password"), !0
        }
        return !1
    }

    function m(a) {
        return function () {
            P && a.value === a.getAttribute(B) && "true" === a.getAttribute(C) ? f(a, 0) : k(a)
        }
    }

    function n(a) {
        return function () {
            l(a)
        }
    }

    function o(a) {
        return function () {
            i(a)
        }
    }

    function p(a) {
        return function (b) {
            return v = a.value, "true" === a.getAttribute(C) && v === a.getAttribute(B) && d(x, b.keyCode) ? (b.preventDefault && b.preventDefault(), !1) : void 0
        }
    }

    function q(a) {
        return function () {
            k(a, v), "" === a.value && (a.blur(), f(a, 0))
        }
    }

    function r(a) {
        return function () {
            a === c() && a.value === a.getAttribute(B) && "true" === a.getAttribute(C) && f(a, 0)
        }
    }

    function s(a) {
        var b = a.form;
        b && "string" == typeof b && (b = document.getElementById(b), b.getAttribute(E) || (e(b, "submit", o(b)), b.setAttribute(E, "true"))), e(a, "focus", m(a)), e(a, "blur", n(a)), P && (e(a, "keydown", p(a)), e(a, "keyup", q(a)), e(a, "click", r(a))), a.setAttribute(F, "true"), a.setAttribute(B, T), (P || a !== c()) && l(a)
    }

    var t = document.createElement("input"), u = void 0 !== t.placeholder;
    if (a.Placeholders = {nativeSupport: u, disable: u ? b : i, enable: u ? b : j}, !u) {
        var v, w = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
            x = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46], y = "#ccc", z = "placeholdersjs",
            A = new RegExp("(?:^|\\s)" + z + "(?!\\S)"), B = "data-placeholder-value", C = "data-placeholder-active",
            D = "data-placeholder-type", E = "data-placeholder-submit", F = "data-placeholder-bound",
            G = "data-placeholder-focus", H = "data-placeholder-live", I = "data-placeholder-maxlength", J = 100,
            K = document.getElementsByTagName("head")[0], L = document.documentElement, M = a.Placeholders,
            N = document.getElementsByTagName("input"), O = document.getElementsByTagName("textarea"),
            P = "false" === L.getAttribute(G), Q = "false" !== L.getAttribute(H), R = document.createElement("style");
        R.type = "text/css";
        var S = document.createTextNode("." + z + " {color:" + y + ";}");
        R.styleSheet ? R.styleSheet.cssText = S.nodeValue : R.appendChild(S), K.insertBefore(R, K.firstChild);
        for (var T, U, V = 0, W = N.length + O.length; W > V; V++) U = V < N.length ? N[V] : O[V - N.length], T = U.attributes.placeholder, T && (T = T.nodeValue, T && d(w, U.type) && s(U));
        var X = setInterval(function () {
            for (var a = 0, b = N.length + O.length; b > a; a++) U = a < N.length ? N[a] : O[a - N.length], T = U.attributes.placeholder, T ? (T = T.nodeValue, T && d(w, U.type) && (U.getAttribute(F) || s(U), (T !== U.getAttribute(B) || "password" === U.type && !U.getAttribute(D)) && ("password" === U.type && !U.getAttribute(D) && g(U, "text") && U.setAttribute(D, "password"), U.value === U.getAttribute(B) && (U.value = T), U.setAttribute(B, T)))) : U.getAttribute(C) && (k(U), U.removeAttribute(B));
            Q || clearInterval(X)
        }, J);
        e(a, "beforeunload", function () {
            M.disable()
        })
    }
}(this), function (a, b) {
    "use strict";
    var c = a.fn.val, d = a.fn.prop;
    b.Placeholders.nativeSupport || (a.fn.val = function (a) {
        var b = c.apply(this, arguments), d = this.eq(0).data("placeholder-value");
        return void 0 === a && this.eq(0).data("placeholder-active") && b === d ? "" : b
    }, a.fn.prop = function (a, b) {
        return void 0 === b && this.eq(0).data("placeholder-active") && "value" === a ? "" : d.apply(this, arguments)
    })
}(jQuery, this);
(function ($) {
    var defaults = {
        url: false,
        callback: false,
        target: false,
        duration: 120,
        on: "mouseover",
        touch: true,
        onZoomIn: false,
        onZoomOut: false,
        magnify: 1
    };
    $.zoom = function (target, source, img, magnify) {
        var targetHeight, targetWidth, sourceHeight, sourceWidth, xRatio, yRatio, offset, $target = $(target),
            position = $target.css("position"), $source = $(source);
        $target.css("position", /(absolute|fixed)/.test(position) ? position : "relative");
        $target.css("overflow", "hidden");
        img.style.width = img.style.height = "";
        $(img).addClass("zoomImg").css({
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: img.width * magnify,
            height: img.height * magnify,
            border: "none",
            maxWidth: "none",
            maxHeight: "none"
        }).appendTo(target);
        return {
            init: function () {
                targetWidth = $target.outerWidth();
                targetHeight = $target.outerHeight();
                if (source === $target[0]) {
                    sourceWidth = targetWidth;
                    sourceHeight = targetHeight
                } else {
                    sourceWidth = $source.outerWidth();
                    sourceHeight = $source.outerHeight()
                }
                xRatio = (img.width - targetWidth) / sourceWidth;
                yRatio = (img.height - targetHeight) / sourceHeight;
                offset = $source.offset()
            }, move: function (e) {
                var left = e.pageX - offset.left, top = e.pageY - offset.top;
                top = Math.max(Math.min(top, sourceHeight), 0);
                left = Math.max(Math.min(left, sourceWidth), 0);
                img.style.left = left * -xRatio + "px";
                img.style.top = top * -yRatio + "px"
            }
        }
    };
    $.fn.zoom = function (options) {
        return this.each(function () {
            var settings = $.extend({}, defaults, options || {}), target = settings.target || this, source = this,
                $source = $(source), $target = $(target), img = document.createElement("img"), $img = $(img),
                mousemove = "mousemove.zoom", clicked = false, touched = false, $urlElement;
            if (!settings.url) {
                $urlElement = $source.find("img");
                if ($urlElement[0]) {
                    settings.url = $urlElement.data("src") || $urlElement.attr("src")
                }
                if (!settings.url) {
                    return
                }
            }
            (function () {
                var position = $target.css("position");
                var overflow = $target.css("overflow");
                $source.one("zoom.destroy", function () {
                    $source.off(".zoom");
                    $target.css("position", position);
                    $target.css("overflow", overflow);
                    $img.remove()
                })
            })();
            img.onload = function () {
                var zoom = $.zoom(target, source, img, settings.magnify);

                function start(e) {
                    zoom.init();
                    zoom.move(e);
                    $img.stop().fadeTo($.support.opacity ? settings.duration : 0, 1, $.isFunction(settings.onZoomIn) ? settings.onZoomIn.call(img) : false)
                }

                function stop() {
                    $img.stop().fadeTo(settings.duration, 0, $.isFunction(settings.onZoomOut) ? settings.onZoomOut.call(img) : false)
                }

                if (settings.on === "grab") {
                    $source.on("mousedown.zoom", function (e) {
                        if (e.which === 1) {
                            $(document).one("mouseup.zoom", function () {
                                stop();
                                $(document).off(mousemove, zoom.move)
                            });
                            start(e);
                            $(document).on(mousemove, zoom.move);
                            e.preventDefault()
                        }
                    })
                } else if (settings.on === "click") {
                    $source.on("click.zoom", function (e) {
                        if (clicked) {
                            return
                        } else {
                            clicked = true;
                            start(e);
                            $(document).on(mousemove, zoom.move);
                            $(document).one("click.zoom", function () {
                                stop();
                                clicked = false;
                                $(document).off(mousemove, zoom.move)
                            });
                            return false
                        }
                    })
                } else if (settings.on === "toggle") {
                    $source.on("click.zoom", function (e) {
                        if (clicked) {
                            stop()
                        } else {
                            start(e)
                        }
                        clicked = !clicked
                    })
                } else if (settings.on === "mouseover") {
                    zoom.init();
                    $source.on("mouseenter.zoom", start).on("mouseleave.zoom", stop).on(mousemove, zoom.move)
                }
                if (settings.touch) {
                    $source.on("touchstart.zoom", function (e) {
                        e.preventDefault();
                        if (touched) {
                            touched = false;
                            stop()
                        } else {
                            touched = true;
                            start(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0])
                        }
                    }).on("touchmove.zoom", function (e) {
                        e.preventDefault();
                        zoom.move(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0])
                    })
                }
                if ($.isFunction(settings.callback)) {
                    settings.callback.call(img)
                }
            };
            img.src = settings.url
        })
    };
    $.fn.zoom.defaults = defaults
})(window.jQuery);
(function ($) {
    var $event = $.event, $special, resizeTimeout;
    $special = $event.special.debouncedresize = {
        setup: function () {
            $(this).on("resize", $special.handler)
        }, teardown: function () {
            $(this).off("resize", $special.handler)
        }, handler: function (event, execAsap) {
            var context = this, args = arguments, dispatch = function () {
                event.type = "debouncedresize";
                $event.dispatch.apply(context, args)
            };
            if (resizeTimeout) clearTimeout(resizeTimeout);
            execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold)
        }, threshold: 150
    }
})(jQuery);
(function (e, t, n, r) {
    e.fn.doubleTapToGo = function (r) {
        if (!("ontouchstart" in t) && !navigator.msMaxTouchPoints && !navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) return false;
        this.each(function () {
            var t = false;
            e(this).on("click", function (n) {
                var r = e(this);
                if (r[0] != t[0]) {
                    n.preventDefault();
                    t = r
                }
            });
            e(n).on("click touchstart MSPointerDown", function (n) {
                var r = true, i = e(n.target).parents();
                for (var s = 0; s < i.length; s++) if (i[s] == t[0]) r = false;
                if (r) t = false
            })
        });
        return this
    }
})(jQuery, window, document);
(function ($) {
    $.fn.clickyBoxes = function (prefix) {
        return $(this).filter('select:not(.replaced)').addClass('replaced').each(function () {
            var prefix = prefix || $(this).attr('id');
            var $optCont = $('<ul class="clickyboxes"/>').attr('id', 'clickyboxes-' + prefix).data('select', $(this)).insertAfter(this);
            var $label;
            if ($(this).is('[id]')) {
                $label = $('label[for="' + $(this).attr('id') + '"]');
            } else {
                $label = $(this).siblings('label');
            }
            if ($label.length > 0) {
                $optCont.addClass('options-' + $label.html().toLowerCase().replace(/[^a-z0-9]/, '-'));
            }
            $(this).find('option').each(function () {
                $('<li/>').appendTo($optCont).append($('<a href="#"/>').attr('data-value', $(this).val()).html($(this).html()).addClass('opt-' + $(this).html().toLowerCase().replace(/[^a-z0-9]/, '-')));
            });
            $(this).hide().addClass('replaced').on('change keyup', function () {
                $optCont.find('a').removeClass('active').filter('[data-value="' + $(this).val() + '"]').addClass('active');
            }).trigger('keyup');
            $optCont.on('click', 'a', function () {
                if (!$(this).hasClass('active')) {
                    $(this).closest('.clickyboxes').data('select').val($(this).data('value')).trigger('change');
                }
                return false;
            });
        });
    };
    $.fn.selectReplace = function (leaveLabel) {
        return $(this).filter('select:not(.replaced, .noreplace)').addClass('replaced').each(function () {
            var $opts = $(this).find('option');
            var initialText = $opts.filter(':selected').length > 0 ? $opts.filter(':selected').text() : $opts.first().text();
            var $cont = $(this).wrap('<div class="pretty-select">').parent().addClass('id-' + $(this).attr('id')).append('<span class="text"><span class="value">' + initialText + '</span></span><i class="icon-arrow3-down"></i>');
            $cont.toggleClass('plaintext', $(this).hasClass('plaintext'));
        }).on('change keyup', function () {
            $(this).siblings('.text').find('.value').html($(this).find(':selected').html());
        });
    };
    $.fn.cropImageToRatio = function (params) {
        var params = $.extend({ratio: 4 / 3}, params);
        return $(this).each(function () {
            if (typeof $(this).data('imgratio') == 'undefined') {
                var imgRatio = $(this).width() / $(this).height(), viewRatio = params.ratio;
                $(this).data('imgratio', imgRatio);
                $(this).css({
                    position: 'absolute',
                    maxWidth: 'none',
                    maxHeight: 'none'
                }).wrap('<div/>').parent().css({
                    height: 0,
                    paddingTop: 100 / params.ratio + '%',
                    overflow: 'hidden',
                    position: 'relative'
                });
                if (imgRatio < viewRatio) {
                    $(this).css({
                        top: -(viewRatio / (imgRatio * 2) - 0.5) * 100 + '%',
                        left: 0,
                        width: '100%',
                        height: 'auto'
                    });
                } else {
                    $(this).css({
                        top: 0,
                        left: -(imgRatio / (viewRatio * 2) - 0.5) * 100 + '%',
                        width: 'auto',
                        height: '100%'
                    });
                }
            }
        });
    };
    $.fn.staggerEvent = function (ev, delay, initialDelay) {
        var ev = ev, delay = delay, $els = $(this);
        if (typeof initialDelay === 'undefined') initialDelay = 0;
        setTimeout(function () {
            $els.each(function (i) {
                var $this = $(this);
                setTimeout(function () {
                    if (typeof ev === 'function') {
                        ev($this);
                    } else {
                        $this.trigger(ev);
                    }
                }, delay * i);
            });
        }, initialDelay);
        return $(this);
    };
})(jQuery);