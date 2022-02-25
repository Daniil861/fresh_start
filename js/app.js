(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    !function n(s, r, o) {
        function a(i, t) {
            if (!r[i]) {
                if (!s[i]) {
                    var e = "function" == typeof require && require;
                    if (!t && e) return e(i, !0);
                    if (h) return h(i, !0);
                    throw (e = new Error("Cannot find module '" + i + "'")).code = "MODULE_NOT_FOUND", 
                    e;
                }
                e = r[i] = {
                    exports: {}
                }, s[i][0].call(e.exports, (function(t) {
                    return a(s[i][1][t] || t);
                }), e, e.exports, n, s, r, o);
            }
            return r[i].exports;
        }
        for (var h = "function" == typeof require && require, t = 0; t < o.length; t++) a(o[t]);
        return a;
    }({
        1: [ function(t, i, e) {
            "use strict";
            window.SlotMachine = t("./slot-machine");
        }, {
            "./slot-machine": 3
        } ],
        2: [ function(t, i, e) {
            "use strict";
            var n = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            i.exports = function(t) {
                setTimeout((function() {
                    return n(t);
                }), 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0);
            };
        }, {} ],
        3: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            var r = t("./timer"), o = t("./raf"), a = {
                active: 0,
                delay: 200,
                auto: !1,
                spins: 5,
                randomize: null,
                onComplete: null,
                inViewport: !0,
                direction: "up",
                transition: "ease-in-out"
            }, h = "slotMachineNoTransition", u = "slotMachineBlurFast", c = "slotMachineBlurMedium", l = "slotMachineBlurSlow", f = "slotMachineBlurTurtle", d = "slotMachineGradient", v = d;
            n = (n(g, [ {
                key: "changeSettings",
                value: function(i) {
                    var e = this;
                    Object.keys(i).forEach((function(t) {
                        e[t] = i[t];
                    }));
                }
            }, {
                key: "_wrapTiles",
                value: function() {
                    var i = this;
                    this.container = document.createElement("div"), this.container.classList.add("slotMachineContainer"), 
                    this.container.style.transition = "1s ease-in-out", this.element.appendChild(this.container), 
                    this._fakeFirstTile = this.tiles[this.tiles.length - 1].cloneNode(!0), this.container.appendChild(this._fakeFirstTile), 
                    this.tiles.forEach((function(t) {
                        i.container.appendChild(t);
                    })), this._fakeLastTile = this.tiles[0].cloneNode(!0), this.container.appendChild(this._fakeLastTile);
                }
            }, {
                key: "_setBounds",
                value: function() {
                    var t = this.getTileOffset(this.active), i = this.getTileOffset(this.tiles.length), e = this.getTileOffset(this.tiles.length);
                    this._bounds = {
                        up: {
                            key: "up",
                            initial: t,
                            first: 0,
                            last: e,
                            to: this._maxTop,
                            firstToLast: e,
                            lastToFirst: 0
                        },
                        down: {
                            key: "down",
                            initial: t,
                            first: i,
                            last: 0,
                            to: this._minTop,
                            firstToLast: e,
                            lastToFirst: 0
                        }
                    };
                }
            }, {
                key: "_changeTransition",
                value: function() {
                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.delay, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.transition;
                    this.container.style.transition = t / 1e3 + "s " + i;
                }
            }, {
                key: "_changeTransform",
                value: function(t) {
                    this.container.style.transform = "matrix(1, 0, 0, 1, 0, " + t + ")";
                }
            }, {
                key: "_isGoingBackward",
                value: function() {
                    return this.nextActive > this.active && 0 === this.active && this.nextActive === this.tiles.length - 1;
                }
            }, {
                key: "_isGoingForward",
                value: function() {
                    return this.nextActive <= this.active && this.active === this.tiles.length - 1 && 0 === this.nextActive;
                }
            }, {
                key: "getTileOffset",
                value: function(t) {
                    for (var i = 0, e = 0; e < t; e++) i += this.tiles[e].offsetHeight;
                    return this._minTop - i;
                }
            }, {
                key: "_resetPosition",
                value: function(t) {
                    this.container.classList.toggle(h), this._changeTransform(isNaN(t) ? this.bounds.initial : t), 
                    this.container.offsetHeight, this.container.classList.toggle(h);
                }
            }, {
                key: "prev",
                value: function() {
                    return this.nextActive = this.prevIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "next",
                value: function() {
                    return this.nextActive = this.nextIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "_getDelayFromSpins",
                value: function(t) {
                    var i = this.delay;
                    switch (this.transition = "linear", t) {
                      case 1:
                        i /= .5, this.transition = "ease-out", this._animationFX = f;
                        break;

                      case 2:
                        i /= .75, this._animationFX = l;
                        break;

                      case 3:
                        i /= 1, this._animationFX = c;
                        break;

                      case 4:
                        i /= 1.25, this._animationFX = c;
                        break;

                      default:
                        i /= 1.5, this._animationFX = u;
                    }
                    return i;
                }
            }, {
                key: "shuffle",
                value: function(i, e) {
                    var t, n = this;
                    return "function" == typeof i && (e = i), this.running = !0, this.visible || !0 !== this.inViewport ? (t = this._getDelayFromSpins(i), 
                    this._changeTransition(t), this._changeTransform(this.bounds.to), o((function() {
                        var t;
                        !n.stopping && n.running && (t = i - 1, n._resetPosition(n.bounds.first), 1 < t ? n.shuffle(t, e) : n.stop(e));
                    }), t)) : this.stop(e), this.nextActive;
                }
            }, {
                key: "stop",
                value: function(t) {
                    var i = this;
                    if (!this.running || this.stopping) return this.nextActive;
                    this.running = !0, this.stopping = !0, Number.isInteger(this.nextActive) || (this.nextActive = this.custom), 
                    this._isGoingBackward() ? this._resetPosition(this.bounds.firstToLast) : this._isGoingForward() && this._resetPosition(this.bounds.lastToFirst), 
                    this.active = this.nextActive;
                    var e = this._getDelayFromSpins(1);
                    return this._changeTransition(e), this._animationFX = v, this._changeTransform(this.getTileOffset(this.active)), 
                    o((function() {
                        i.stopping = !1, i.running = !1, i.nextActive = null, "function" == typeof i.onComplete && i.onComplete(i.active), 
                        "function" == typeof t && t.apply(i, [ i.active ]);
                    }), e), this.active;
                }
            }, {
                key: "run",
                value: function() {
                    var t = this;
                    this.running || (this._timer = new r((function() {
                        t.visible || !0 !== t.inViewport ? t.shuffle(t.spins, (function() {
                            t._timer.reset();
                        })) : o((function() {
                            t._timer.reset();
                        }), 500);
                    }), this.auto));
                }
            }, {
                key: "destroy",
                value: function() {
                    var i = this;
                    this._fakeFirstTile.remove(), this._fakeLastTile.remove(), this.tiles.forEach((function(t) {
                        i.element.appendChild(t);
                    })), this.container.remove();
                }
            }, {
                key: "active",
                get: function() {
                    return this._active;
                },
                set: function(t) {
                    ((t = Number(t)) < 0 || t >= this.tiles.length || isNaN(t)) && (t = 0), this._active = t;
                }
            }, {
                key: "direction",
                get: function() {
                    return this._direction;
                },
                set: function(t) {
                    this.running || (this._direction = "down" === t ? "down" : "up");
                }
            }, {
                key: "bounds",
                get: function() {
                    return this._bounds[this._direction];
                }
            }, {
                key: "transition",
                get: function() {
                    return this._transition;
                },
                set: function(t) {
                    this._transition = t || "ease-in-out";
                }
            }, {
                key: "visibleTile",
                get: function() {
                    var t = this.tiles[0].offsetHeight, i = this.container.style.transform || "";
                    i = parseInt(i.replace(/^matrix\(-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?(-?\d+)\)$/, "$1"), 10);
                    return Math.abs(Math.round(i / t)) - 1;
                }
            }, {
                key: "random",
                get: function() {
                    return Math.floor(Math.random() * this.tiles.length);
                }
            }, {
                key: "custom",
                get: function() {
                    var t;
                    return this.randomize ? (((t = this.randomize(this.active)) < 0 || t >= this.tiles.length) && (t = 0), 
                    t) : this.random;
                }
            }, {
                key: "_prevIndex",
                get: function() {
                    var t = this.active - 1;
                    return t < 0 ? this.tiles.length - 1 : t;
                }
            }, {
                key: "_nextIndex",
                get: function() {
                    var t = this.active + 1;
                    return t < this.tiles.length ? t : 0;
                }
            }, {
                key: "prevIndex",
                get: function() {
                    return "up" === this.direction ? this._nextIndex : this._prevIndex;
                }
            }, {
                key: "nextIndex",
                get: function() {
                    return "up" === this.direction ? this._prevIndex : this._nextIndex;
                }
            }, {
                key: "visible",
                get: function() {
                    var t = this.element.getBoundingClientRect(), i = window.innerHeight || document.documentElement.clientHeight, e = window.innerWidth || document.documentElement.clientWidth;
                    i = t.top <= i && 0 <= t.top + t.height, t = t.left <= e && 0 <= t.left + t.width;
                    return i && t;
                }
            }, {
                key: "_animationFX",
                set: function(i) {
                    var t = this, e = this.delay / 4;
                    o((function() {
                        [].concat(function(t) {
                            if (Array.isArray(t)) {
                                for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i];
                                return e;
                            }
                            return Array.from(t);
                        }(t.tiles), [ t._fakeLastTile, t._fakeFirstTile ]).forEach((function(t) {
                            t.classList.remove(u, c, l, f), i !== v && t.classList.add(i);
                        })), i === v ? t.container.classList.remove(d) : t.container.classList.add(d);
                    }), e);
                }
            } ]), g);
            function g(t, i) {
                !function(t) {
                    if (!(t instanceof g)) throw new TypeError("Cannot call a class as a function");
                }(this), this.element = t, this.tiles = [].slice.call(this.element.children), this.running = !1, 
                this.stopping = !1, this.element.style.overflow = "hidden", this._wrapTiles(), this._minTop = -this._fakeFirstTile.offsetHeight, 
                this._maxTop = -this.tiles.reduce((function(t, i) {
                    return t + i.offsetHeight;
                }), 0), this.changeSettings(Object.assign({}, a, i)), this._setBounds(), this._resetPosition(), 
                !1 !== this.auto && this.run();
            }
            i.exports = n;
        }, {
            "./raf": 2,
            "./timer": 4
        } ],
        4: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            function r(t, i) {
                return function(t) {
                    if (!(t instanceof r)) throw new TypeError("Cannot call a class as a function");
                }(this), this.cb = t, this.initialDelay = i, this.delay = i, this.startTime = null, 
                this.timer = null, this.running = !1, this.resume(), this;
            }
            i.exports = (n(r, [ {
                key: "_start",
                value: function() {
                    var t = this;
                    this.timer = setTimeout((function() {
                        t.running = !1, t.cb(t);
                    }), this.delay);
                }
            }, {
                key: "cancel",
                value: function() {
                    this.running = !1, clearTimeout(this.timer);
                }
            }, {
                key: "pause",
                value: function() {
                    this.running && (this.delay -= (new Date).getTime() - this.startTime, this.cancel());
                }
            }, {
                key: "resume",
                value: function() {
                    this.running || (this.running = !0, this.startTime = (new Date).getTime(), this._start());
                }
            }, {
                key: "reset",
                value: function() {
                    this.cancel(), this.delay = this.initialDelay, this._start();
                }
            }, {
                key: "add",
                value: function(t) {
                    this.pause(), this.delay += t, this.resume();
                }
            } ]), r);
        }, {} ]
    }, {}, [ 1 ]);
    window.addEventListener("load", (function() {
        if (document.querySelector("body")) setTimeout((function() {
            document.querySelector("body").classList.add("_loaded");
        }), 200);
    }));
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    const preloader = document.querySelector(".preloader");
    const game_box = document.querySelectorAll(".game__box");
    const game_open_box = document.querySelector(".game__open-box");
    const cristall = document.querySelector(".header-info__icon");
    const shooting_items = document.querySelectorAll(".shooting__item");
    const shooting_gun = document.querySelector(".shooting__gun");
    let points = document.querySelector(".header-info__coins");
    if (sessionStorage.getItem("points")) {
        if (document.querySelector(".slot-one")) points.textContent = sessionStorage.getItem("points");
        if (document.querySelector(".slot-two")) points.textContent = sessionStorage.getItem("points");
        if (document.querySelector(".slot-three")) points.textContent = sessionStorage.getItem("points");
        if (document.querySelector(".slot-four")) points.textContent = sessionStorage.getItem("points");
    } else sessionStorage.setItem("points", 500);
    let count_shoot_items = [];
    let count = 0;
    document.addEventListener("click", (e => {
        const targetElement = e.target;
        if (targetElement.closest(".acces-preloader__play")) {
            preloader.classList.add("_hide");
            document.querySelector(".wrapper").classList.add("_visible");
            sessionStorage.setItem("preloader", true);
        }
        if (targetElement.closest(".game__box")) {
            targetElement.closest(".game__box").classList.add("_anim");
            let point = targetElement.closest(".game__box").dataset.points;
            let coins_storrage = +sessionStorage.getItem("points");
            sessionStorage.setItem("points", coins_storrage + +point);
            targetElement.closest(".game__box").dataset.place = 1;
            game_box.forEach((el => {
                if (0 == el.dataset.place) el.classList.add("_hide");
            }));
            setTimeout((() => {
                game_open_box.classList.add("_visible");
                document.querySelector(".game__text").innerHTML = `+${point}`;
            }), 1e3);
        }
        if (targetElement.closest(".main__pin-one")) location.href = "game_one.html";
        if (targetElement.closest(".main__pin-two")) location.href = "game_two.html";
        if (targetElement.closest(".main__pin-three")) location.href = "game_three.html";
        if (targetElement.closest(".main__pin-four")) location.href = "game_four.html";
        if (targetElement.closest(".shooting__box")) {
            let random = getUniqeNum();
            if (count < 5) {
                shooting_gun.classList.add("_shoot");
                setTimeout((() => {
                    shooting_gun.classList.remove("_shoot");
                }), 3e3);
                shooting_items[random].classList.add("_active");
                document.querySelector(".shooting__box").style.pointerEvents = "none";
                let points_cristall = +shooting_items[random].dataset.bonus;
                let a = +sessionStorage.getItem("points");
                sessionStorage.setItem("points", a + points_cristall);
                setTimeout((() => {
                    document.querySelector(".shooting__box").style.pointerEvents = "fill";
                }), 2e3);
                count++;
            }
            if (5 == count) {
                document.querySelector(".shooting__box").style.pointerEvents = "none";
                setTimeout((() => {
                    document.querySelector(".screen").classList.add("_active");
                }), 4e3);
            }
        }
    }));
    function getUniqeNum() {
        let randomItem = Math.floor(Math.random() * (9 - 0) + 0);
        if (count_shoot_items.includes(randomItem)) return getUniqeNum(); else if (!count_shoot_items.includes(randomItem)) {
            count_shoot_items.push(randomItem);
            return randomItem;
        }
    }
    var minTime = 500;
    var maxTime = 2e3;
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    var casino1 = document.querySelector("#slot1");
    var casino2 = document.querySelector("#slot2");
    var casino3 = document.querySelector("#slot3");
    if (casino1 && casino2 && casino3) {
        let a, b, c;
        var mcasino1 = new SlotMachine(casino1, {
            active: 0,
            delay: 100,
            onComplete: function(active) {
                a = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 100;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", +points.innerHTML);
                }
            }
        });
        var mcasino2 = new SlotMachine(casino2, {
            active: 2,
            delay: 100,
            onComplete: function(active) {
                b = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 100;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", +points.innerHTML);
                }
            }
        });
        var mcasino3 = new SlotMachine(casino3, {
            active: 1,
            delay: 100,
            onComplete: function(active) {
                c = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 100;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", +points.innerHTML);
                }
            }
        });
        function gameSlotTwo() {
            document.querySelector("#spin").classList.add("_hold");
            setTimeout((() => {
                document.querySelector("#spin").classList.remove("_hold");
            }), 2e3);
            mcasino1.shuffle(9999);
            mcasino2.shuffle(9999);
            mcasino3.shuffle(9999);
            setTimeout((() => mcasino1.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino2.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino3.stop()), getRandomArbitrary(minTime, maxTime));
        }
        if (document.querySelector("#spin")) document.querySelector("#spin").addEventListener("click", (() => {
            a = 666;
            b = 666;
            c = 666;
            if (casino1 && casino2 && casino3) {
                clearInterval(casinoAutoSpin);
                gameSlotTwo();
            }
        }));
    }
    var twoCasino1 = document.querySelector("#slot-two-1");
    var twoCasino2 = document.querySelector("#slot-two-2");
    var twoCasino3 = document.querySelector("#slot-two-3");
    if (twoCasino1 && twoCasino2 && twoCasino3) {
        let a, b, c;
        mcasino1 = new SlotMachine(twoCasino1, {
            active: 0,
            delay: 100,
            onComplete: function(active) {
                a = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 100;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", +points.innerHTML);
                }
            }
        });
        mcasino2 = new SlotMachine(twoCasino2, {
            active: 2,
            delay: 100,
            onComplete: function(active) {
                b = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 100;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", +points.innerHTML);
                }
            }
        });
        mcasino3 = new SlotMachine(twoCasino3, {
            active: 1,
            delay: 100,
            onComplete: function(active) {
                c = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 100;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", +points.innerHTML);
                }
            }
        });
        function gameSlot() {
            document.querySelector("#spin").classList.add("_hold");
            setTimeout((() => {
                document.querySelector("#spin").classList.remove("_hold");
            }), 2e3);
            mcasino1.shuffle(9999);
            mcasino2.shuffle(9999);
            mcasino3.shuffle(9999);
            setTimeout((() => mcasino1.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino2.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino3.stop()), getRandomArbitrary(minTime, maxTime));
        }
        if (document.querySelector("#spin")) document.querySelector("#spin").addEventListener("click", (() => {
            a = 666;
            b = 666;
            c = 666;
            if (twoCasino1 && twoCasino2 && twoCasino3) {
                clearInterval(casinoAutoSpin);
                gameSlot();
            }
        }));
    }
    var threeCasino1 = document.querySelector("#slot-three-1");
    var threeCasino2 = document.querySelector("#slot-three-2");
    var threeCasino3 = document.querySelector("#slot-three-3");
    if (threeCasino1 && threeCasino2 && threeCasino3) {
        let a, b, c;
        mcasino1 = new SlotMachine(threeCasino1, {
            active: 0,
            delay: 100,
            onComplete: function(active) {
                a = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 100;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", +points.innerHTML);
                }
            }
        });
        mcasino2 = new SlotMachine(threeCasino2, {
            active: 2,
            delay: 100,
            onComplete: function(active) {
                b = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 100;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", +points.innerHTML);
                }
            }
        });
        mcasino3 = new SlotMachine(threeCasino3, {
            active: 1,
            delay: 100,
            onComplete: function(active) {
                c = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 100;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", +points.innerHTML);
                }
            }
        });
        function gameSlot() {
            document.querySelector("#spin").classList.add("_hold");
            setTimeout((() => {
                document.querySelector("#spin").classList.remove("_hold");
            }), 2e3);
            mcasino1.shuffle(9999);
            mcasino2.shuffle(9999);
            mcasino3.shuffle(9999);
            setTimeout((() => mcasino1.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino2.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino3.stop()), getRandomArbitrary(minTime, maxTime));
        }
        if (document.querySelector("#spin")) document.querySelector("#spin").addEventListener("click", (() => {
            a = 666;
            b = 666;
            c = 666;
            if (threeCasino1 && threeCasino2 && threeCasino3) {
                clearInterval(casinoAutoSpin);
                gameSlot();
            }
        }));
    }
    var fourCasino1 = document.querySelector("#slot-four-1");
    var fourCasino2 = document.querySelector("#slot-four-2");
    var fourCasino3 = document.querySelector("#slot-four-3");
    if (fourCasino1 && fourCasino2 && fourCasino3) {
        let a, b, c;
        mcasino1 = new SlotMachine(fourCasino1, {
            active: 0,
            delay: 100,
            onComplete: function(active) {
                a = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 100;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", points.innerHTML);
                }
            }
        });
        mcasino2 = new SlotMachine(fourCasino2, {
            active: 2,
            delay: 100,
            onComplete: function(active) {
                b = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 100;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", points.innerHTML);
                }
            }
        });
        mcasino3 = new SlotMachine(fourCasino3, {
            active: 1,
            delay: 100,
            onComplete: function(active) {
                c = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    points.innerHTML = +points.innerHTML + 100;
                    points.classList.add("_anim");
                    cristall.classList.add("_anim");
                    setTimeout((() => {
                        points.classList.remove("_anim");
                        cristall.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("points", +points.innerHTML);
                }
            }
        });
        function gameSlot() {
            document.querySelector("#spin").classList.add("_hold");
            setTimeout((() => {
                document.querySelector("#spin").classList.remove("_hold");
            }), 2e3);
            mcasino1.shuffle(9999);
            mcasino2.shuffle(9999);
            mcasino3.shuffle(9999);
            setTimeout((() => mcasino1.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino2.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino3.stop()), getRandomArbitrary(minTime, maxTime));
        }
        var casinoAutoSpin;
        if (document.querySelector("#spin")) document.querySelector("#spin").addEventListener("click", (() => {
            a = 666;
            b = 666;
            c = 666;
            if (fourCasino1 && fourCasino2 && fourCasino3) {
                clearInterval(casinoAutoSpin);
                gameSlot();
            }
        }));
    }
    window["FLS"] = true;
    isWebp();
})();