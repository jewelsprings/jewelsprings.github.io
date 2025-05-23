"use strict";
var FLIP = FLIP || {};
var PRESENTATION = FLIP;
(function e(t, i) {
  t.version = "1.7.3.5";
  t.PAGE_MODE = { SINGLE: 1, DOUBLE: 2, AUTO: null };
  t.SINGLE_PAGE_MODE = { ZOOM: 1, BOOKLET: 2, AUTO: null };
  t.CONTROLSPOSITION = { HIDDEN: "hide", TOP: "top", BOTTOM: "bottom" };
  t.DIRECTION = { LTR: 1, RTL: 2 };
  t.LINK_TARGET = { NONE: 0, SELF: 1, BLANK: 2, PARENT: 3, TOP: 4 };
  t.CORNERS = {
    TL: "tl",
    TR: "tr",
    BL: "bl",
    BR: "br",
    L: "l",
    R: "r",
    NONE: null,
  };
  t.SOURCE_TYPE = { IMAGE: "image", PDF: "pdf", HTML: "html" };
  t.DISPLAY_TYPE = { WEBGL: "3D", HTML: "2D" };
  t.PAGE_SIZE = { AUTO: 0, SINGLE: 1, DOUBLEINTERNAL: 2 };
  var n = (t.defaults = {
    webgl: true,
    webglShadow: true,
    soundEnable: true,
    search: false,
    height: "auto",
    autoEnableOutline: false,
  //  autoEnableThumbnail: false,
    autoEnableThumbnail: (function() {
  // Check if the device is not mobile
  const isDesktop = !/(android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini)/i.test(navigator.userAgent);
  return isDesktop; // Enable thumbnails only on desktop
})(),
    overwritePDFOutline: false,
    enableDownload: false,
    duration: 800,
    direction: t.DIRECTION.LTR,
    pageMode: t.PAGE_MODE.AUTO,
    singlePageMode: t.SINGLE_PAGE_MODE.AUTO,
    backgroundColor: "#fff",
    forceFit: true,
    transparent: false,
    hard: "none",
    openPage: 1,
    annotationClass: "",
    autoPlay: false,
    autoPlayDuration: 5e3,
    autoPlayStart: false,
    maxTextureSize: 1600,
    minTextureSize: 256,
    rangeChunkSize: 524288,
    icons: {
      altnext: "ti-angle-right",
      altprev: "ti-angle-left",
      next: "ti-angle-right",
      prev: "ti-angle-left",
      end: "ti-angle-double-right",
      start: "ti-angle-double-left",
      share: "ti-sharethis",
      help: "ti-help-alt",
      more: "ti-more-alt",
      download: "ti-download",
      zoomin: "ti-zoom-in",
      zoomout: "ti-zoom-out",
      fullscreen: "ti-fullscreen",
      fitscreen: "ti-arrows-corner",
      thumbnail: "ti-layout-grid2",
      outline: "ti-menu-alt",
      close: "ti-close",
      search: "ti-search",
      doublepage: "ti-book",
      singlepage: "ti-file",
      sound: "ti-volume",
      facebook: "ti-facebook",
      google: "ti-google",
      twitter: "ti-twitter-alt",
      mail: "ti-email",
      play: "ti-control-play",
      pause: "ti-control-pause",
    },
    text: {
      toggleSound: "Turn on/off Sound",
      toggleThumbnails: "Toggle Thumbnails",
      toggleOutline: "Toggle Outline/Bookmark",
      previousPage: "Previous Page",
      nextPage: "Next Page",
      toggleFullscreen: "Toggle Fullscreen",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      toggleHelp: "Toggle Help",
      singlePageMode: "Single Page Mode",
      doublePageMode: "Double Page Mode",
      downloadPDFFile: "Download PDF File",
      gotoFirstPage: "Goto First Page",
      gotoLastPage: "Goto Last Page",
      play: "Start AutoPlay",
      pause: "Pause AutoPlay",
      share: "Share",
      mailSubject: "I wanted you to see this FlipBook",
      mailBody: "Check out this site {{url}}",
      loading: "Loading",
    },
    allControls:
      "altPrev,pageNumber,altNext,play,outline,thumbnail,zoomIn,zoomOut,fullScreen,share,download,search,more,pageMode,startPage,endPage,sound",
    moreControls: "download,pageMode,startPage,endPage,sound",
    hideControls: "",
    controlsPosition: t.CONTROLSPOSITION.BOTTOM,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    enableAnalytics: false,
    scrollWheel: false,
    onCreate: function (e) {},
    onCreateUI: function (e) {},
    onFlip: function (e) {},
    beforeFlip: function (e) {},
    onReady: function (e) {},
    zoomRatio: 1.5,
    pageSize: t.PAGE_SIZE.AUTO,
    pdfjsSrc: "js/libs/pdf.min.js",
    pdfjsCompatibilitySrc: "js/libs/compatibility.js",
    pdfjsWorkerSrc: "js/libs/pdf.worker.min.js",
    threejsSrc: "js/libs/three.min.js",
    mockupjsSrc: "js/libs/mockup.min.js",
    soundFile: "sound/turn2.mp3",
    imagesLocation: "images",
    imageResourcesPath: "images/pdfjs/",
    cMapUrl: "cmaps/",
    enableDebugLog: false,
    canvasToBlob: false,
    enableAnnotation: true,
    pdfRenderQuality: 0.9,
    textureLoadFallback: "blank",
    stiffness: 3,
    backgroundImage: "",
    pageRatio: null,
    pixelRatio: window.devicePixelRatio || 1,
    thumbElement: "div",
    spotLightIntensity: 0.22,
    ambientLightColor: "#fff",
    ambientLightIntensity: 0.8,
    shadowOpacity: 0.15,
    linkTarget: t.LINK_TARGET.BLANK,
    sharePrefix: "flipbook-",
  });
  var a =
      "WebKitCSSMatrix" in window ||
      (document.body && "MozPerspective" in document.body.style),
    o = "onmousedown" in window,
    r = "ontouchstart" in window;
  var s = navigator.userAgent;
  var l = (t.utils = {
    drag: { left: 0, right: 1, none: -1 },
    mouseEvents: o
      ? { type: "mouse", start: "mousedown", move: "mousemove", end: "mouseup" }
      : {
          type: "touch",
          start: "touchstart",
          move: "touchmove",
          end: "touchend",
        },
    html: {
      div: "<div/>",
      img: "<img/>",
      a: "<a>",
      input: "<input type='text'/>",
    },
    getSharePrefix: function () {
      var e = l.getSharePrefixes();
      return e[0];
    },
    getSharePrefixes: function () {
      var e = (t.defaults.sharePrefix + ",flip-,flipbook-,bflip-")
        .split(",")
        .filter(function (e) {
          return e;
        });
      return e;
    },
    toRad: function (e) {
      return (e * Math.PI) / 180;
    },
    isset: function (e, t) {
      return e == null ? t : e;
    },
    isnull: function (e) {
      return e == null || e == null;
    },
    toDeg: function (e) {
      return (e * 180) / Math.PI;
    },
    transition: function (e, t) {
      return e ? t / 1e3 + "s ease-out" : "0s none";
    },
    hasCompatibility: function () {
      var e = false;
      if (window.location != null) {
        if (window.location.indexOf("lip-lit") > 0) e = true;
      }
      return e;
    },
    scrollIntoView: function (e, t, i) {
      t = t || e.parentNode;
      t.scrollTop =
        e.offsetTop -
        t.offsetTop +
        (i === false ? e.offsetHeight - t.offsetHeight : 0);
      t.scrollLeft = e.offsetLeft - t.offsetLeft;
    },
    display: function (e) {
      return e ? "block" : "none";
    },
    resetTranslate: function () {
      return w(0, 0);
    },
    translateStr: function (e, t) {
      return a
        ? " translate3d(" + e + "px," + t + "px, 0px) "
        : " translate(" + e + "px, " + t + "px) ";
    },
    httpsCorrection: function (e) {
      var t = window.location;
      if (t.href.indexOf("https://") > -1 && e.indexOf(t.hostname) > -1) {
        e = e.replace("http://", "https://");
      }
      if (t.href.indexOf("http://") > -1 && e.indexOf(t.hostname) > -1) {
        e = e.replace("https://", "http://");
      }
      return e;
    },
    resetBoxShadow: function () {
      return "rgba(0, 0, 0, 0) 0px 0px 20px";
    },
    rotateStr: function (e) {
      return " rotateZ(" + e + "deg) ";
    },
    bg: function (e) {
      return "#fff" + C(e);
    },
    bgImage: function (e) {
      return e == null || e == "blank" ? "" : " url(" + e + ")";
    },
    src: function (e) {
      return e != null ? "" + e + "" : "";
    },
    limitAt: function (e, t, i) {
      return e < t ? t : e > i ? i : e;
    },
    distOrigin: function (e, t) {
      return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2));
    },
    distPoints: function (e, t, i, n) {
      return Math.sqrt(Math.pow(i - e, 2) + Math.pow(n - t, 2));
    },
    calculateScale: function (e, t) {
      var i = I(e[0].x, e[0].y, e[1].x, e[1].y),
        n = I(t[0].x, t[0].y, t[1].x, t[1].y);
      return n / i;
    },
    getVectorAvg: function (e) {
      return {
        x:
          e
            .map(function (e) {
              return e.x;
            })
            .reduce(l.sum) / e.length,
        y:
          e
            .map(function (e) {
              return e.y;
            })
            .reduce(l.sum) / e.length,
      };
    },
    sum: function (e, t) {
      return e + t;
    },
    getTouches: function (e, t) {
      t = t || { left: 0, top: 0 };
      return Array.prototype.slice.call(e.touches).map(function (e) {
        return { x: e.pageX - t.left, y: e.pageY - t.top };
      });
    },
    angleByDistance: function (e, t) {
      var i = t / 2;
      var n = S(e, 0, t);
      return n < i ? m(Math.asin(n / i)) : 90 + m(Math.asin((n - i) / i));
    },
    log: function (e) {
      if (n.enableDebugLog == true && window.console) console.log(e);
    },
    lowerPowerOfTwo: function (e) {
      return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
    },
    nearestPowerOfTwo: function (e, t) {
      return Math.min(
        t || 2048,
        Math.pow(2, Math.ceil(Math.log(e) / Math.LN2))
      );
    },
    zoomStops: function (e, t, i, n, a) {
      if (n == null) n = 256;
      if (a == null) a = 2048;
      var o = Math.log(e / n) / Math.log(t);
      return (
        n *
        Math.pow(
          t,
          i == null ? Math.round(o) : i == true ? Math.ceil(o) : Math.floor(o)
        )
      );
    },
    extendOptions: function (e, t) {
      return i.extend(true, {}, e, t);
    },
    getFullscreenElement: function () {
      return (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
    },
    hasFullscreenEnabled: function () {
      return (
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled
      );
    },
    getBasePage: function (e) {
      return Math.floor(e / 2) * 2;
    },
    loadResources: function e(t, i, n) {
      var a = document,
        o = a.createElement(t),
        r = a.getElementsByTagName(t)[0];
      o.async = true;
      if (n) {
        o.addEventListener(
          "load",
          function (e) {
            n(null, e);
          },
          false
        );
      }
      o.src = i;
      r.parentNode.insertBefore(o, r);
    },
    getScriptCallbacks: [],
    getScript: function (e, t, n) {
      var a = l.getScriptCallbacks[e],
        o;
      function r(e, t) {
        if (o != null) {
          if (t || !o.readyState || /loaded|complete/.test(o.readyState)) {
            o.onload = o.onreadystatechange = null;
            o = null;
            o = null;
            if (!t) {
              for (var i = 0; i < a.length; i++) {
                if (a[i]) a[i]();
                a[i] = null;
              }
              n = null;
            }
          }
        }
      }
      if (i("script[src='" + e + "']").length === 0) {
        a = l.getScriptCallbacks[e] = [];
        a.push(t);
        o = document.createElement("script");
        var s = document.body.getElementsByTagName("script")[0];
        o.async = 1;
        o.setAttribute("data-cfasync", false);
        if (s != null) {
          s.parentNode.insertBefore(o, s);
          s = null;
        } else {
          document.body.appendChild(o);
        }
        o.addEventListener("load", r, false);
        o.addEventListener("readystatechange", r, false);
        o.addEventListener("complete", r, false);
        if (n) {
          o.addEventListener("error", n, false);
        }
        o.src = e + (N.dom == "MS" ? "?" + Math.random(1) : "");
      } else {
        a.push(t);
      }
    },
    isHardPage: function (e, t, i, n) {
      if (e != null) {
        if (e == "cover") {
          return (
            t == 0 ||
            (n && t == 1) ||
            t == Math.ceil(i / (n ? 1 : 2)) - (n ? 0 : 1)
          );
        } else if (e == "all") {
          return true;
        } else {
          var a = ("," + e + ",").indexOf("," + (t * 2 + 1) + ",") > -1;
          var o = ("," + e + ",").indexOf("," + (t * 2 + 2) + ",") > -1;
          return a || o;
        }
      }
      return false;
    },
    fixMouseEvent: function (e) {
      if (e) {
        var t = e.originalEvent || e;
        if (t.changedTouches && t.changedTouches.length > 0) {
          var n = i.event.fix(e);
          var a = t.changedTouches[0];
          n.clientX = a.clientX;
          n.clientY = a.clientY;
          n.pageX = a.pageX;
          n.touches = t.touches;
          n.pageY = a.pageY;
          n.movementX = a.movementX;
          n.movementY = a.movementY;
          return n;
        } else {
          return e;
        }
      } else {
        return e;
      }
    },
    hasWebgl: (function () {
      try {
        var e = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (e.getContext("webgl") || e.getContext("experimental-webgl"))
        );
      } catch (e) {
        return false;
      }
    })(),
    isBookletMode: function (e) {
      return (
        e.pageMode == t.PAGE_MODE.SINGLE &&
        e.singlePageMode == t.SINGLE_PAGE_MODE.BOOKLET
      );
    },
    isRTLMode: function (e) {
      return e.direction == t.DIRECTION.RTL;
    },
    isMobile: (function () {
      var e = false;
      (function (t) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            t
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            t.substr(0, 4)
          )
        )
          e = true;
      })(s || navigator.vendor || window.opera);
      return e;
    })(),
    isIOS: /(iPad|iPhone|iPod)/g.test(s),
    isSafari:
      /constructor/i.test(window.HTMLElement) ||
      (function (e) {
        return e.toString() === "[object SafariRemoteNotification]";
      })(!window["safari"] || safari.pushNotification),
    prefix: (function () {
      var e = window.getComputedStyle(document.documentElement, ""),
        t = Array.prototype.slice
          .call(e)
          .join("")
          .match(/-(moz|webkit|ms)-/)[1],
        i = "WebKit|Moz|MS".match(new RegExp("(" + t + ")", "i"))[1];
      return {
        dom: i,
        lowercase: t,
        css: "-" + t + "-",
        js: t[0].toUpperCase() + t.substr(1),
      };
    })(),
    __extends: function (e, t) {
      for (var i in t) if (t.hasOwnProperty(i)) e[i] = t[i];
      function n() {
        this.constructor = e;
      }
      n.prototype = t.prototype;
      e.prototype = new n();
      e.__super = t.prototype;
      return e;
    },
  });
  var c = t.SOURCE_TYPE,
    u = t.DISPLAY_TYPE,
    d = l.drag,
    f = l.mouseEvents,
    h = l.html,
    p = l.isset,
    g = l.isnull,
    v = l.toRad,
    m = l.toDeg,
    b = l.transition,
    w = l.translateStr,
    x = l.resetBoxShadow,
    P = l.rotateStr,
    y = l.bg,
    C = l.bgImage,
    L = l.src,
    S = l.limitAt,
    E = l.distOrigin,
    I = l.distPoints,
    T = l.angleByDistance,
    k = l.log,
    O = l.nearestPowerOfTwo,
    R = l.extendOptions,
    F = l.getBasePage,
    M = l.getScript,
    D = l.fixMouseEvent,
    N = l.prefix,
    A = l.isBookletMode,
    z = l.isRTLMode,
    B = l.isMobile,
    j = l.hasWebgl,
    _ = l.isSafari,
    U = l.isIOS,
    H = l.__extends;
  (function e() {
    if (window.CanvasPixelArray) {
      if (typeof window.CanvasPixelArray.prototype.set !== "function") {
        window.CanvasPixelArray.prototype.set = function (e) {
          for (var t = 0, i = this.length; t < i; t++) {
            this[t] = e[t];
          }
        };
      }
    } else {
      var t = false,
        i;
      if (_) {
        i = s.match(/Version\/([0-9]+)\.([0-9]+)\.([0-9]+) Safari\//);
        t = i && parseInt(i[1]) < 6;
      }
      if (t) {
        var n = window.CanvasRenderingContext2D.prototype;
        var a = n.createImageData;
        n.createImageData = function (e, t) {
          var i = a.call(this, e, t);
          i.data.set = function (e) {
            for (var t = 0, i = this.length; t < i; t++) {
              this[t] = e[t];
            }
          };
          return i;
        };
        n = null;
      }
    }
  })();
  (function e() {
    function t(e) {
      window.setTimeout(e, 20);
    }
    if ("requestAnimationFrame" in window) {
      return;
    }
    window.requestAnimationFrame =
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      t;
  })();
  (function e() {
    if (typeof Uint8Array !== "undefined") {
      if (typeof Uint8Array.prototype.subarray === "undefined") {
        Uint8Array.prototype.subarray = function e(t, i) {
          return new Uint8Array(this.slice(t, i));
        };
        Float32Array.prototype.subarray = function e(t, i) {
          return new Float32Array(this.slice(t, i));
        };
      }
      if (typeof Float64Array === "undefined") {
        window.Float64Array = Float32Array;
      }
      return;
    }
    function t(e, t) {
      return new n(this.slice(e, t));
    }
    function i(e, t) {
      if (arguments.length < 2) {
        t = 0;
      }
      for (var i = 0, n = e.length; i < n; ++i, ++t) {
        this[t] = e[i] & 255;
      }
    }
    function n(e) {
      var n, a, o;
      if (typeof e === "number") {
        n = [];
        for (a = 0; a < e; ++a) {
          n[a] = 0;
        }
      } else if ("slice" in e) {
        n = e.slice(0);
      } else {
        n = [];
        for (a = 0, o = e.length; a < o; ++a) {
          n[a] = e[a];
        }
      }
      n.subarray = t;
      n.buffer = n;
      n.byteLength = n.length;
      n.set = i;
      if (typeof e === "object" && e.buffer) {
        n.buffer = e.buffer;
      }
      return n;
    }
    window.Uint8Array = n;
    window.Int8Array = n;
    window.Uint32Array = n;
    window.Int32Array = n;
    window.Uint16Array = n;
    window.Float32Array = n;
    window.Float64Array = n;
  })();
  var W = function (e) {
    return i.extend(true, {}, n, e);
  };
  var V = function (e, n) {
    var a = "df-ui";
    var o = "df-ui-wrapper";
    var r = a + "-" + "btn";
    var s = z(n.target);
    var c = (n.ui = i(h.div, { class: a }));
    var u = n.options;
    c.dispose = function () {
      e.find("." + r).each(function () {
        i(this).off();
      });
      P.off();
      f.off();
      p.off();
      g.off();
      v.off();
      m.off();
      b.off();
      w.off();
      y.off();
      E.off();
      M.off();
      D.off();
      j.off();
      _.off();
      H.off();
      W.off();
      V.off();
      G.off();
      q.off();
      Z.off();
      N.remove();
      x.remove();
      p.remove();
      f.remove();
      v.remove();
      if (c.shareBox) {
        if (c.shareBox.dispose) c.shareBox.dispose();
        c.shareBox = null;
      }
      document.removeEventListener("keyup", be, false);
      window.removeEventListener("click", I, false);
      c.update = null;
      n = null;
    };
    var d = function (e) {
      if (isNaN(e)) e = n.target._activePage;
      else if (e < 1) e = 1;
      else if (e > n.target.pageCount) e = n.target.pageCount;
      return e;
    };
    var f = (c.next = i(h.div, {
      class: r + " " + a + "-next " + u.icons["next"],
      title: s ? u.text.previousPage : u.text.nextPage,
      html: "<span>" + u.text.nextPage + "</span>",
    }).on("click", function () {
      n.next();
    }));
    var p = (c.prev = i(h.div, {
      class: r + " " + a + "-prev " + u.icons["prev"],
      title: s ? u.text.nextPage : u.text.previousPage,
      html: "<span>" + u.text.previousPage + "</span>",
    }).on("click", function () {
      n.prev();
    }));
    var g = i(h.div, {
      class: r + " " + a + "-play " + u.icons["play"],
      title: u.text.play,
      html: "<span>" + u.text.play + "</span>",
    }).on("click", function () {
      var e = i(this);
      n.setAutoPlay(!e.hasClass(u.icons["pause"]));
    });
    if (u.autoPlay == true) {
      c.play = g;
      n.setAutoPlay(u.autoPlayStart);
    }
    var v = i(h.div, { class: o + " " + a + "-zoom" });
    var m = (c.zoomIn = i(h.div, {
      class: r + " " + a + "-zoomin " + u.icons["zoomin"],
      title: u.text.zoomIn,
      html: "<span>" + u.text.zoomIn + "</span>",
    }).on("click", function () {
      n.zoom(1);
      c.update();
      if (n.target.startPoint && n.target.pan)
        n.target.pan(n.target.startPoint);
    }));
    var b = (c.zoomOut = i(h.div, {
      class: r + " " + a + "-zoomout " + u.icons["zoomout"],
      title: u.text.zoomOut,
      html: "<span>" + u.text.zoomOut + "</span>",
    }).on("click", function () {
      n.zoom(-1);
      c.update();
      if (n.target.startPoint && n.target.pan)
        n.target.pan(n.target.startPoint);
    }));
    v.append(m).append(b);
    var w = (c.pageNumber = i(h.div, { class: r + " " + a + "-page" })
      .on("change", function () {
        var e = parseInt(c.pageInput.val(), 10);
        e = d(e);
        n.gotoPage(e);
      })
      .on("keyup", function (e) {
        if (e.keyCode == 13) {
          var t = parseInt(c.pageInput.val(), 10);
          t = d(t);
          if (t !== d(n.target._activePage || n._activePage)) n.gotoPage(t);
        }
      }));
    c.pageInput = i('<input id="df_book_page_number" type="text"/>').appendTo(
      w
    );
    c.pageLabel = i('<label for="df_book_page_number"/>').appendTo(w);
    var x = i(h.div, { class: o + " " + a + "-size" });
    var P = i(h.div, {
      class: r + " " + a + "-help " + u.icons["help"],
      title: u.text.toggleHelp,
      html: "<span>" + u.text.toggleHelp + "</span>",
    }).on("click", function () {});

    
    var y = (c.sound = i(h.div, {
  class: r + " " + a + "-sound " + u.icons["sound"],
  title: u.text.toggleSound,
  html: "<span>" + u.text.toggleSound + "</span>",
}).on("click", function () {
  u.soundEnable = !u.soundEnable;
  c.updateSound();
}));

// Set sound to enabled by default
u.soundEnable = true;

c.updateSound = function () {
  if (u.soundEnable) {
    y.removeClass("disabled").addClass("enabled");
  } else {
    y.addClass("disabled").removeClass("enabled");
  }
};

// Initialize with sound enabled
c.updateSound();


    
    function C(e) {
      c.search.removeClass("df-active");
    }
    if (typeof u.source == "string" && u.search == true) {
      var L = (c.search = i(h.div, {
        class: r + " " + a + "-search " + u.icons["search"],
      }).on("click", function (e) {
        if (!L.hasClass("df-active")) {
          i(this).addClass("df-active");
          e.stopPropagation();
        }
      }));
      window.addEventListener("click", C, false);
      var S = i(h.div, { class: "search-container" });
      L.append(S);
    }
    var E = (c.more = i(h.div, {
      class: r + " " + a + "-more " + u.icons["more"],
    }).on("click", function (e) {
      if (!E.hasClass("df-active")) {
        i(this).addClass("df-active");
        e.stopPropagation();
      }
    }));
    function I(e) {
      E.removeClass("df-active");
    }
    window.addEventListener("click", I, false);
    var T = i(h.div, { class: "more-container" });
    E.append(T);
    if (typeof u.source == "string" && u.enableDownload == true) {
      var O = r + " " + a + "-download " + u.icons["download"];
      var R = (c.download = i(
        '<a download target="_blank" class="' +
          O +
          '"><span>' +
          u.text.downloadPDFFile +
          "</span></a>"
      ));
      R.attr("href", u.source).attr("title", u.text.downloadPDFFile);
    }
    var F = l.hasFullscreenEnabled();
    if (!F) {
      e.addClass("df-custom-fullscreen");
    }
    c.switchFullscreen = function () {
      var e = l.getFullscreenElement();
      var t = n.container[0];
      if (c.isFullscreen != true) {
        n.container.addClass("df-fullscreen");
        if (t.requestFullscreen) {
          t.requestFullscreen();
        } else if (t.msRequestFullscreen) {
          t.msRequestFullscreen();
        } else if (t.mozRequestFullScreen) {
          t.mozRequestFullScreen();
        } else if (t.webkitRequestFullscreen) {
          t.webkitRequestFullscreen();
        }
        c.isFullscreen = true;
      } else {
        n.container.removeClass("df-fullscreen");
        c.isFullscreen = false;
        if (document.exitFullscreen) {
          if (document.fullscreenElement) document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          if (document.fullscreenElement) document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
      if (!l.hasFullscreenEnabled()) {
        setTimeout(function () {
          n.resize();
        }, 50);
      }
    };
    var M = (c.fullScreen = i(h.div, {
      class: r + " " + a + "-fullscreen " + u.icons["fullscreen"],
      title: u.text.toggleFullscreen,
      html: "<span>" + u.text.toggleFullscreen + "</span>",
    }).on("click", c.switchFullscreen));
    var D = (c.fit = i(h.div, {
      class: r + " " + a + "-fit " + u.icons["fitscreen"],
    }).on("click", function () {
      i(this).toggleClass("df-button-fit-active");
    }));
    x.append(M);
    var N = i(h.div, { class: o + " " + a + "-controls" });
    var A = (c.shareBox = new t.Share(e, u));
    var j = (c.share = i(h.div, {
      class: r + " " + a + "-share " + u.icons["share"],
      title: u.text.share,
      html: "<span>" + u.text.share + "</span>",
    }).on("click", function (e) {
      if (c.shareBox.isOpen == true) c.shareBox.close();
      else {
        c.shareBox.update(n.getURLHash());
        c.shareBox.show();
      }
    }));
    var _ = (c.startPage = i(h.div, {
      class: r + " " + a + "-start " + (s ? u.icons["end"] : u.icons["start"]),
      title: u.text.gotoFirstPage,
      html: "<span>" + u.text.gotoFirstPage + "</span>",
    }).on("click", function () {
      n.start();
    }));
    var H = (c.endPage = i(h.div, {
      class: r + " " + a + "-end " + (s ? u.icons["start"] : u.icons["end"]),
      title: u.text.gotoLastPage,
      html: "<span>" + u.text.gotoLastPage + "</span>",
    }).on("click", function () {
      n.end();
    }));
    var W = (c.pageMode = i(h.div, {
      class: r + " " + a + "-pagemode " + u.icons["singlepage"],
      html: "<span>" + u.text.singlePageMode + "</span>",
    }).on("click", function () {
      var e = i(this);
      n.setPageMode(!e.hasClass(u.icons["doublepage"]));
    }));
    n.setPageMode(n.target.pageMode == t.PAGE_MODE.SINGLE);
    var V = (c.altPrev = i(h.div, {
      class: r + " " + a + "-prev" + " " + a + "-alt " + u.icons["prev"],
      title: s ? u.text.nextPage : u.text.previousPage,
      html: "<span>" + u.text.previousPage + "</span>",
    }).on("click", function () {
      n.prev();
    }));
    var G = (c.altNext = i(h.div, {
      class: r + " " + a + "-next" + " " + a + "-alt " + u.icons["next"],
      title: s ? u.text.previousPage : u.text.nextPage,
      html: "<span>" + u.text.nextPage + "</span>",
    }).on("click", function () {
      n.next();
    }));
    var q = (c.thumbnail = i(h.div, {
      class: r + " " + a + "-thumbnail " + u.icons["thumbnail"],
      title: u.text.toggleThumbnails,
      html: "<span>" + u.text.toggleThumbnails + "</span>",
    }).on("click", function () {
      var e = i(this);
      if (n.target.thumbContainer) {
        var t = n.target.thumbContainer;
        t.toggleClass("df-sidemenu-visible");
        e.toggleClass("df-active");
      } else {
        n.contentProvider.initThumbs();
        e.toggleClass("df-active");
      }
      if (e.hasClass("df-active")) {
        e.siblings(".df-active").trigger("click");
      }
      c.update(true);
    }));
    var Z = (c.outline = i(h.div, {
      class: r + " " + a + "-outline " + u.icons["outline"],
      title: u.text.toggleOutline,
      html: "<span>" + u.text.toggleOutline + "</span>",
    }).on("click", function () {
      var e = i(this);
      if (n.target.outlineContainer) {
        var t = n.target.outlineContainer;
        e.toggleClass("df-active");
        t.toggleClass("df-sidemenu-visible");
        if (e.hasClass("df-active")) {
          e.siblings(".df-active").trigger("click");
        }
        c.update(true);
      }
    }));
    var Y = u.allControls.replace(/ /g, "").split(","),
      K = "," + u.moreControls.replace(/ /g, "") + ",",
      X = "," + u.hideControls.replace(/ /g, "") + ",";
    if (U && B) {
      X += ",fullScreen,";
    }
    var Q = K.split(",");
    for (var $ = 0; $ < Y.length; $++) {
      var J = Y[$];
      if (X.indexOf("," + J + ",") < 0) {
        var ee = c[J];
        if (ee != null && typeof ee == "object") {
          if (
            K.indexOf("," + J + ",") > -1 &&
            J !== "more" &&
            J !== "pageNumber"
          ) {
            T.append(ee);
          } else {
            N.append(ee);
          }
        }
      }
    }
    e.append(N).append(p).append(f).append(v);
    var te = false,
      ie = false,
      ne = false;
    var ae = 16,
      oe = 17,
      re = 18,
      se = 83,
      le = 86,
      ce = 67,
      ue = 69,
      de = 71,
      fe = 78,
      he = 79,
      pe = 46,
      ge = 39,
      ve = 37,
      me = 27;
    document.addEventListener("keyup", be, false);
    function be(e) {
      switch (e.keyCode) {
        case me:
          if (c.isFullscreen == true) {
            c.fullScreen.trigger("click");
          } else if (window.fLightBox && window.dfActiveLightBoxBook) {
            window.fLightBox.closeButton.trigger("click");
          }
          break;
        case ae:
          ie = false;
          break;
        case oe:
          te = false;
          break;
        case re:
          ne = false;
          break;
        case ve:
          n.prev();
          break;
        case ge:
          n.next();
          break;
        default:
          break;
      }
    }
    c.update = function (i) {
      k("ui update");
      var a = n.target;
      var o = d(a._activePage || n._activePage);
      var r = a.pageCount || n.pageCount;
      var s = a.direction == t.DIRECTION.RTL,
        l = o == 1 || o == 0,
        u = o == r;
      c.next.show();
      c.prev.show();
      c.altNext.removeClass("disabled");
      c.altPrev.removeClass("disabled");
      if ((l && !s) || (u && s)) {
        c.prev.hide();
        c.altPrev.addClass("disabled");
      }
      if ((u && !s) || (l && s)) {
        c.next.hide();
        c.altNext.addClass("disabled");
      }
      c.pageInput.val(o);
      c.pageLabel.html(o + "/" + r);
      if (e.find(".df-sidemenu-visible").length > 0) {
        e.addClass("df-sidemenu-open");
      } else {
        e.removeClass("df-sidemenu-open");
      }
      if (i == true) n.resize();
      if (a.contentProvider.zoomScale == a.contentProvider.maxZoom) {
        c.zoomIn.addClass("disabled");
      } else {
        c.zoomIn.removeClass("disabled");
      }
      if (a.contentProvider.zoomScale == 1) {
        c.zoomOut.addClass("disabled");
      } else {
        c.zoomOut.removeClass("disabled");
      }
    };
    if (n.target != null) {
      n.target.ui = c;
    }
    if (u.onCreateUI != null) u.onCreateUI(n);
  };
  var G = null;
  function q() {
    G = (function (e) {
      H(t, e);
      function t(t) {
        t = t || {};
        var a = this;
        e.call(this, t);
        a.options = t;
        a.canvas = i(a.renderer.domElement).addClass("df-3dcanvas");
        a.container = t.container;
        a.container.append(a.canvas);
        a.type = "PreviewStage";
        a.mouse = new THREE.Vector2();
        a.raycaster = new THREE.Raycaster();
        a.camera.position.set(0, 20, 600);
        a.camera.lookAt(new THREE.Vector3(0, 0, 0));
        a.spotLight.position.set(-220, 330, 550);
        a.spotLight.castShadow = B ? false : t.webglShadow;
        if (a.spotLight.shadow) {
          a.spotLight.shadow.bias = -8e-4;
        }
        a.spotLight.intensity = p(t.spotLightIntensity, n.spotLightIntensity);
        a.ambientLight.color = new THREE.Color(
          p(t.ambientLightColor, n.ambientLightColor)
        );
        a.ambientLight.intensity = p(
          t.ambientLightIntensity,
          n.ambientLightIntensity
        );
        var o = new THREE.ShadowMaterial();
        o.opacity = p(t.shadowOpacity, n.shadowOpacity);
        a.ground.material = o;
        a.ground.position.z = -2;
        a.orbitControl.maxAzimuthAngle = 0;
        a.orbitControl.minAzimuthAngle = 0;
        a.orbitControl.minPolarAngle = Math.PI / 2;
        a.orbitControl.maxPolarAngle = 2.2;
        a.orbitControl.mouseButtons.ORBIT = THREE.MOUSE.RIGHT;
        a.orbitControl.mouseButtons.PAN = -1;
        a.orbitControl.maxDistance = 5e3;
        a.orbitControl.minDistance = 50;
        a.orbitControl.noZoom = true;
        a.selectiveRendering = true;
        a.orbitControl.zoomSpeed = 5;
        a.orbitControl.keyPanSpeed = 0;
        a.orbitControl.center.set(0, 0, 0);
        a.orbitControl.update();
        a.swipe_threshold = B ? 15 : 20;
        var r = (a.cssRenderer = new THREE.CSS3DRenderer());
        i(r.domElement)
          .css({ position: "absolute", top: 0, pointerEvents: "none" })
          .addClass("df-3dcanvas df-csscanvas");
        a.container[0].appendChild(r.domElement);
        var s = (a.cssScene = new THREE.Scene());
        var c = document.createElement("div");
        c.className = "df-page-content df-page-content-left";
        var u = document.createElement("div");
        u.className = "df-page-content df-page-content-right";
        var d = (s.divLeft = new THREE.CSS3DObject(c));
        var h = (s.divRight = new THREE.CSS3DObject(u));
        s.add(d);
        s.add(h);
        a.resizeCallback = function () {
          r.setSize(a.canvas.width(), a.canvas.height());
        };
        function g() {
          a.renderRequestPending = true;
        }
        window.addEventListener(f.move, g, false);
        window.addEventListener("keyup", g, false);
        a.dispose = function () {
          -a.clearChild();
          a.render();
          window.removeEventListener(f.move, g, false);
          if (a.options.scrollWheel == true) {
            a.container[0].removeEventListener("mousewheel", v, false);
            a.container[0].removeEventListener("DOMMouseScroll", v, false);
          }
          window.removeEventListener("keyup", g, false);
          a.renderer.domElement.removeEventListener("mousemove", m, false);
          a.renderer.domElement.removeEventListener("touchmove", m, false);
          a.renderer.domElement.removeEventListener("mousedown", b, false);
          a.renderer.domElement.removeEventListener("touchstart", b, false);
          a.renderer.domElement.removeEventListener("mouseup", x, false);
          a.renderer.domElement.removeEventListener("touchend", x, false);
          a.canvas.remove();
          r.domElement.parentNode.removeChild(r.domElement);
          r = null;
          a.renderCallback = null;
          a.renderCallback = null;
          a.orbitControl.dispose();
          a.orbitControl = null;
          a.renderer.dispose();
          a.cancelRAF();
        };
        a.renderCallback = function () {
          if (TWEEN.getAll().length > 0) a.renderRequestPending = true;
          TWEEN.update();
          r.render(s, a.camera);
        };
        var v = function (e) {
          var t = 0;
          if (e.wheelDelta != null) {
            t = e.wheelDelta;
          } else if (e.detail != null) {
            t = -e.detail;
          }
          if (t) {
            var i = a.previewObject.contentProvider.zoomScale;
            if ((t > 0 && i == 1) || (t < 0 && i > 1)) {
              e.preventDefault();
            }
            a.previewObject.zoom(t > 0 ? 1 : -1);
          }
          g();
        };
        var m = function (e) {
          a.renderRequestPending = true;
          e = D(e);
          if (a.isMouseDown && e.movementX != 0 && e.movementY != 0) {
            a.isMouseMoving = true;
          }
          if (
            e.touches != null &&
            e.touches.length == 2 &&
            a.startTouches != null
          ) {
            a.zoomDirty = true;
            var t = l.getVectorAvg(l.getTouches(e, a.container.offset())),
              i = l.calculateScale(a.startTouches, l.getTouches(e)),
              n = i / a.lastScale;
            var o = a.previewObject.contentProvider.zoomScale,
              r = t.x,
              s = t.y;
            a.camera.position.z = a.originalZ / i;
            a.lastScale = i;
            a.lastZoomCenter = t;
            e.preventDefault();
            return;
          }
          if (
            a.isMouseDown == true &&
            a.previewObject.contentProvider.zoomScale == 1
          ) {
            var c = e.pageX - a.lastPos,
              u = performance.now() - a.lastTime;
            if (Math.abs(c) > a.swipe_threshold) {
              if (c < 0) {
                a.target.next();
              } else {
                a.target.prev();
              }
              e.preventDefault();
              a.isMouseDown = false;
            }
            a.lastPos = e.pageX;
            a.lastTime = performance.now();
          }
        };
        var b = function (e) {
          e = D(e);
          if (
            e.touches != null &&
            e.touches.length == 2 &&
            a.startTouches == null
          ) {
            a.startTouches = l.getTouches(e);
            a.lastScale = 1;
            a.originalZ = a.camera.position.z * 1;
          }
          document.activeElement.blur();
          a.mouseValue = e.pageX + "," + e.pageY;
          a.isMouseMoving = false;
          a.isMouseDown = true;
          a.lastPos = e.pageX;
          a.lastTime = performance.now();
        };
        var w = function (e) {
          a.isMouseDown = false;
          if (e.button !== 0) return this;
          var t = e.pageX + "," + e.pageY;
          if (a.isMouseMoving) {
          } else if (t == a.mouseValue) {
            e = e || window.event;
            e = i.event.fix(e);
            var n = a.mouse,
              o = a.raycaster;
            n.x = (e.offsetX / a.canvas.innerWidth()) * 2 - 1;
            n.y = 1 - (e.offsetY / a.canvas.innerHeight()) * 2;
            o.setFromCamera(n, a.camera);
            var r = o.intersectObjects(
              a.target instanceof MOCKUP.Bundle
                ? a.target.children
                : [a.target],
              true
            );
            if (r.length > 0) {
              var s,
                l = 0;
              do {
                s = r[l] != null ? r[l].object : null;
                l++;
              } while (
                (s instanceof THREE.BoxHelper ||
                  !(s instanceof MOCKUP.Paper) ||
                  s.isFlipping == true) &&
                l < r.length
              );
              if (s.userData.object != null) {
              } else {
                if (s.angles[1] > 90) {
                  if (s.isEdge != true) a.target.next();
                } else {
                  if (s.isEdge != true) a.target.prev();
                }
              }
            } else {
            }
          }
        };
        var x = function (e) {
          e = D(e);
          if (e.touches != null && e.touches.length == 0) {
            var t = a.previewObject.contentProvider.zoomScale;
            if (a.zoomDirty == true) {
              a.previewObject.contentProvider.zoomScale = l.limitAt(
                a.previewObject.contentProvider.zoomScale * a.lastScale,
                1,
                a.previewObject.contentProvider.maxZoom
              );
              a.previewObject.zoomValue =
                a.previewObject.contentProvider.zoomScale * 1;
              a.previewObject.resize();
              a.zoomDirty = false;
            }
            a.lastScale = null;
            a.startTouches = null;
          }
          if (e.touches != null && e.touches.length > 1) return;
          w(e);
        };
        a.renderer.domElement.addEventListener("mousemove", m, false);
        a.renderer.domElement.addEventListener("touchmove", m, false);
        a.renderer.domElement.addEventListener("mousedown", b, false);
        a.renderer.domElement.addEventListener("touchstart", b, false);
        a.renderer.domElement.addEventListener("mouseup", x, false);
        a.renderer.domElement.addEventListener("touchend", x, false);
        if (a.options.scrollWheel == true) {
          a.container[0].addEventListener("mousewheel", v, false);
          a.container[0].addEventListener("DOMMouseScroll", v, false);
        }
        i(a.renderer.domElement).css({ display: "block" });
        i(window).trigger("resize");
        return this;
      }
      t.prototype.width = function () {
        return this.container.width();
      };
      t.prototype.height = function () {
        return this.container.height();
      };
      return t;
    })(MOCKUP.Stage);
    MOCKUP.PreviewStage = G;
    var e = (function (e) {
      H(i, e);
      function i(t, i) {
        t = t || {};
        t.folds = 1;
        e.call(this, t, i);
        this.angle = 0;
        this.isFlipping = false;
        this.material.materials[5].transparent = true;
        this.material.materials[4].transparent = true;
        this.type = "BookPaper";
      }
      i.prototype.tween = function (e, i) {
        var n = this;
        var a = 1e-5;
        n.originalStiff = n.stiffness;
        var o = n.newStiffness;
        var r = A(n.parent);
        var s = i - e;
        var l = e > 90;
        var c = n.parent.direction == t.DIRECTION.RTL;
        n.init = {
          angle: e,
          angle2: e < 90 ? 0 : 180,
          stiff: n.originalStiff,
          index: (l && !c) || (!l && c) ? 1 : 0,
        };
        n.first = {
          angle: e + s / 4,
          angle2: e < 90 ? 90 : 90,
          stiff: n.originalStiff,
          index: (l && !c) || (!l && c) ? 1 : 0.25,
        };
        n.mid = {
          angle: e + (s * 2) / 4,
          angle2: e < 90 ? 135 : 45,
          stiff: n.newStiffness,
          index: (l && !c) || (!l && c) ? 0.5 : 0.5,
        };
        n.mid2 = {
          angle: e + (s * 3) / 4,
          angle2: e < 90 ? 180 : 0,
          stiff: n.newStiffness,
          index: (l && !c) || (!l && c) ? 0.25 : 1,
        };
        n.end = {
          angle: i,
          angle2: e < 90 ? 180 : 0,
          stiff: n.newStiffness,
          index: (l && !c) || (!l && c) ? 0 : 1,
        };
        n.isFlipping = true;
        var u = function (e, t) {
          n.angles[1] = e.angle;
          n.angles[4] = n.isHard ? e.angle : e.angle2;
          if (n.isHard == true) {
            n.stiffness = 0;
          } else {
            n.stiffness = (e.stiff / (o + a)) * (n.newStiffness + a);
            n.stiffness = isNaN(n.stiffness) ? 0 : e.stiff;
          }
          if (r) {
            n.material.materials[5].opacity = n.material.materials[4].opacity =
              e.index;
            n.castShadow =
              (l && !c) || (!l && c) ? e.index > 0.5 : e.index > 0.5;
          }
          n.updateAngle(true);
        };
        if (r && ((!l && !c) || (l && c))) {
          n.material.materials[5].opacity = n.material.materials[4].opacity = 0;
          n.castShadow = false;
        }
        n.currentTween = new TWEEN.Tween(n.init)
          .to(
            {
              angle: [n.first.angle, n.mid.angle, n.mid2.angle, n.end.angle],
              angle2: [
                n.first.angle2,
                n.mid.angle2,
                n.mid2.angle2,
                n.end.angle2,
              ],
              stiff: [n.first.stiff, n.mid.stiff, n.mid2.stiff, n.end.stiff],
              index: [n.first.index, n.mid.index, n.mid2.index, n.end.index],
            },
            n.parent.duration
          )
          .onUpdate(function (e) {
            u(this, e);
          })
          .easing(TWEEN.Easing.Sinusoidal.Out)
          .onComplete(function (e) {
            n.stiffness = n.newStiffness;
            n.updateAngle();
            n.material.materials[5].opacity =
              n.material.materials[4].opacity = 1;
            n.castShadow = true;
            n.isFlipping = false;
            if (n.parent && n.parent.refresh) n.parent.refresh();
          })
          .start();
      };
      return i;
    })(MOCKUP.FlexBoxPaper);
    MOCKUP.BookPaper = e;
    var a = (function (e) {
      H(i, e);
      function i(i, n) {
        i = i || {};
        i.segments = i.segments || 50;
        this.pageCount = i.pageCount;
        this.height = i.height;
        this.width = i.width;
        this.direction = i.direction || t.DIRECTION.LTR;
        this.startPage = 1;
        this.endPage = this.pageCount;
        this.stackCount = i.stackCount || 6;
        this.materials = [];
        e.call(this, i, n);
        this.angles = [0, 0, 0, 0, 0, 0];
        this.stiffness = i.stiffness == null ? 1.5 : i.stiffness;
        this.hardConfig = i.hard;
        this._activePage = i.openPage || this.startPage;
        this.createStack(i);
        this.pageMode =
          i.pageMode ||
          (B || this.pageCount <= 2 ? t.PAGE_MODE.SINGLE : t.PAGE_MODE.DOUBLE);
        this.singlePageMode =
          i.singlePageMode ||
          (B ? t.SINGLE_PAGE_MODE.BOOKLET : t.SINGLE_PAGE_MODE.ZOOM);
        this.type = "Book";
      }
      i.prototype.getPageByNumber = function (e) {
        var t = A(this) ? (z(this) ? e + 1 : e) : Math.floor((e - 1) / 2);
        return this.getObjectByName(t.toString());
      };
      i.prototype.isPageHard = function (e) {
        return l.isHardPage(this.hardConfig, e, this.pageCount);
      };
      i.prototype.activePage = function (e) {
        if (e == null) return this._activePage;
        this.gotoPage(e);
      };
      i.prototype.gotoPage = function (e) {
        e = parseInt(e, 10);
        this._activePage = e;
        if (this.autoPlay == true) {
          this.previewObject.setAutoPlay(this.autoPlay);
        }
        this.updatePage(e);
        if (this && this.thumblist && this.thumblist.review)
          this.thumblist.review();
      };
      i.prototype.moveBy = function (e) {
        var t = this._activePage + e;
        t = S(t, this.startPage, this.endPage);
        if (this.firstFlipped != true) {
          this.previewObject.analytics({
            eventAction: "First Page Flip",
            options: this.previewObject.options,
          });
          this.firstFlipped = true;
        }
        this.gotoPage(t);
      };
      i.prototype.next = function (e) {
        if (e == null)
          e =
            this.direction == t.DIRECTION.RTL ? -this.pageMode : this.pageMode;
        this.moveBy(e);
      };
      i.prototype.prev = function (e) {
        if (e == null)
          e =
            this.direction == t.DIRECTION.RTL ? this.pageMode : -this.pageMode;
        this.moveBy(e);
      };
      i.prototype.updateAngle = function () {
        var e = this.angles[1];
        var t = this.angles[4];
        var i = t - e;
        var n = this.stackCount;
        for (var a = 0; a < n; a++) {
          var o = this.children[a];
          o.angles[1] = e + (a * i) / (n * 100);
          o.stiffness = this.stiffness;
          o.updateAngle();
        }
      };
      i.prototype.refresh = function () {
        this.updatePage(this._activePage);
        if (this.flipCallback != null) this.flipCallback();
      };
      i.prototype.updatePage = function (e) {
        var i = this.direction == t.DIRECTION.RTL,
          a = A(this),
          o = F(e);
        var r = a ? 1 : 2;
        e = Math.floor(e / r);
        if (i) e = Math.ceil(this.pageCount / r) - e;
        var s = this.oldBaseNumber || 0;
        var l = this.pageCount / r;
        var c = this.stackCount;
        var u = 0.02;
        var d = 0.4;
        var f = a ? 0 : (0.5 - Math.abs(l / 2 - e) / l) / this.stiffness;
        var h = 1;
        var p = Math.floor(c / 2);
        var g = false;
        if (s > e) {
          g = true;
          this.children[c - 1].skipFlip = true;
          this.children.unshift(this.children.pop());
        } else if (s < e) {
          this.children[0].skipFlip = true;
          this.children.push(this.children.shift());
        }
        var v = l - e;
        var m = 5 / l;
        var b = (m * e) / 2;
        var w = (m * v) / 2;
        var x = b < w ? w : b;
        for (var P = 0; P < c; P++) {
          var y = this.children[P];
          var C = y.color;
          var L = y.angles[1];
          var S;
          var E = e - p + P;
          if (i)
            E = a ? this.pageCount - E : Math.ceil(this.pageCount / 2) - E - 1;
          var I = (y.isHard = this.isPageHard(E));
          var T = y.name;
          y.isEdge = false;
          if (P == 0) {
            y.depth = b < d ? d : b;
          } else if (P == c - 1) {
            y.depth = w < d ? d : w;
          } else {
            y.depth = d;
            y.isEdge = false;
          }
          if (y.isFlipping == true) {
            y.depth = d;
          }
          y.position.x = 0;
          var k = u * P,
            O = 180 - u * (P - p) + u * P;
          if (P < p) {
            y.newStiffness = I || this.stiffness == 0 ? 0 : f / (e / l) / 4;
            S = k;
            y.position.z = x - (-P + p) * d;
            if (g == true) y.position.z -= d;
          } else {
            S = O;
            y.newStiffness =
              I || this.stiffness == 0 ? 0 : f / (Math.abs(l - e) / l) / 4;
            y.position.z = x - (-c + P + p + 1) * d - y.depth;
          }
          if (y.isFlipping == false) {
            if (Math.abs(L - S) > 20 && y.skipFlip == false) {
              y.depth = d;
              var R = y.stiffness;
              if (L > S) {
                R = f / (Math.abs(l - e) / l) / 4;
              } else {
                R = f / (e / l) / 4;
              }
              y.position.z += d;
              y.stiffness = isNaN(R) ? y.stiffness : R;
              y.updateAngle(true);
              y.targetStiffness = I
                ? 0
                : P < e
                ? f / (Math.abs(l - e) / l) / 4
                : f / (e / l) / 4;
              y.targetStiffness = I
                ? 0
                : isNaN(y.targetStiffness)
                ? y.stiffness
                : y.targetStiffness;
              y.isFlipping = true;
              y.tween(L, S);
              if (this.preFlipCallback != null) this.preFlipCallback();
            } else {
              y.skipFlip = false;
              y.newStiffness = isNaN(y.newStiffness) ? 0 : y.newStiffness;
              if (
                y.angles[1] != S ||
                y.stiffness != y.newStiffness ||
                y.depth != y.oldDepth
              ) {
                y.angles[1] = y.angles[4] = S;
                y.stiffness = y.newStiffness;
                y.updateAngle(true);
              } else {
              }
            }
          }
          y.visible = a
            ? i
              ? P < p || y.isFlipping
              : P >= p || y.isFlipping
            : (E >= 0 && E < l) || (a && E == l);
          if (this.requestPage != null) {
            y.name = E.toString();
            if (y.name != T) {
              y.textureLoaded = false;
              y.frontImage(n.textureLoadFallback);
              y.frontPageStamp = "-1";
              y.frontTextureLoaded = false;
              y.thumbLoaded = false;
              y.backImage(n.textureLoadFallback);
              y.backPageStamp = "-1";
              y.backTextureLoaded = false;
              this.requestPage();
            }
          }
          y.oldDepth = y.depth;
          var M =
            Math.abs(y.geometry.boundingBox.max.x) <
            Math.abs(y.geometry.boundingBox.min.x)
              ? y.geometry.boundingBox.max.x
              : y.geometry.boundingBox.min.x;
          y.position.x =
            y.isEdge == true && y.isFlipping == false ? (P < p ? M : -M) : 0;
        }
        this.oldBaseNumber = e;
        if (this.updatePageCallback != null) this.updatePageCallback();
      };
      i.prototype.createCover = function (e) {
        e.width = e.width * 2;
        this.cover = new MOCKUP.BiFold(e);
        this.add(this.cover);
      };
      i.prototype.createStack = function (e) {
        var t = "red,green,blue,yellow,orange,black".split(",");
        for (var i = 0; i < this.stackCount; i++) {
          e.angles = [, this.stackCount - i];
          e.stiffness = (this.stackCount - i) / 100;
          var n = new MOCKUP.BookPaper(e);
          n.angles[1] = 180;
          n.index = i;
          n.updateAngle();
          n.textureReady = false;
          n.textureRequested = false;
          this.add(n);
          n.color = t[i];
          n.position.z = -1 * i;
        }
      };
      i.prototype.shininess = function (e) {
        if (e == null) {
          return this.mainObject.shininess();
        } else {
          this.mainObject.shininess(e);
        }
      };
      i.prototype.bumpScale = function (e) {
        if (e == null) {
          return this.mainObject.bumpScale();
        } else {
          this.mainObject.bumpScale(e);
        }
      };
      i.prototype.frontImage = function (e) {
        if (e == null) {
          return this.mainObject.frontImage();
        } else {
          this.mainObject.frontImage(e);
        }
      };
      i.prototype.backImage = function (e) {
        if (e == null) {
          return this.mainObject.backImage();
        } else {
          this.mainObject.backImage(e);
        }
      };
      return i;
    })(MOCKUP.Bundle);
    MOCKUP.Book = a;
  }
  var Z = (function (e) {
    function n(e) {
      e = e || {};
      this.type = "PreviewObject";
      var i = this;
      i.zoomValue = 1;
      function n() {
        setTimeout(function () {
          i.resize();
        }, 50);
      }
      window.addEventListener("resize", n, false);
      this.sound = document.createElement("audio");
      this.sound.setAttribute("src", e.soundFile + "?ver=" + t.version);
      this.sound.setAttribute("type", "audio/mpeg");
      this.autoPlayFunction = function () {
        if (i && i.target.autoPlay) {
          if (i.target.direction == t.DIRECTION.RTL) i.target.prev();
          else i.target.next();
        }
      };
      this.dispose = function () {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
        this.autoPlayFunction = null;
        if (this.target && this.target.children) {
          for (var e = 0; e < this.target.children.length; e++) {
            var t = this.target.children[e];
            if (t && t.currentTween) t.currentTween.stop();
          }
        }
        if (this.zoomTween) {
          if (this.zoomTween.stop) this.zoomTween.stop();
          this.zoomTween = null;
        }
        if (this.container && this.container.info && this.container.info.remove)
          this.container.info.remove();
        if (this.target && this.target.dispose) this.target.dispose();
        this.target = null;
        if (this.stage && this.stage.dispose) this.stage.dispose();
        this.stage = null;
        if (this.ui && this.ui.dispose) this.ui.dispose();
        this.ui = null;
        if (this.contentProvider && this.contentProvider.dispose)
          this.contentProvider.dispose();
        this.contentProvider = null;
        window.removeEventListener("resize", n);
      };
    }
    n.prototype = {
      start: function () {
        this.target.gotoPage(this.target.startPage);
      },
      end: function () {
        this.target.gotoPage(this.target.endPage);
      },
      next: function () {},
      prev: function () {},
      getPageTextContent: function (e) {
        return this.contentProvider.pdfDocument
          .getPage(e + 1)
          .then(function (e) {
            return e.getTextContent({ normalizeWhitespace: true });
          });
      },
      calculateSize: function (e, t, i, n, a, o, r, s) {
        var l = e;
        var c = t - a;
        var u = l - n;
        var d = Math.ceil(s ? c : c / 2);
        var f = d / r;
        var h = null;
        if (o) {
          h = Math.min(f, i - n);
          l = h;
        } else {
          h = Math.min(u, i - n);
        }
        var p = f > h;
        var g, v;
        if (p) {
          v = h;
          g = Math.floor(v * r);
        } else {
          g = d;
          v = Math.ceil(d / r);
        }
        if (o) {
          l = Math.max(v + n, 320);
        }
        return { stageHeight: l, isWide: p, height: v, width: g };
      },
      zoom: function (e) {
        this.pendingZoom = true;
        this.zoomDelta = e;
        this.resize();
        if (this.ui) this.ui.update();
      },
      resize: function () {
        var e = this;
        if (
          e.target == null ||
          e.target.ui == null ||
          e.target.contentProvider == null ||
          e.target.contentProvider.viewport == null ||
          e.target.stage == null
        )
          return;
        if (
          this.ui &&
          this.ui.isFullscreen == true &&
          l.hasFullscreenEnabled() == true &&
          l.getFullscreenElement() == null
        ) {
          this.ui.switchFullscreen();
        }
        var n = e.target,
          a = e.container,
          o = e.options,
          r = n.stage,
          s = n.contentProvider,
          u = s.pageRatio,
          d = s.zoomViewport,
          f = z(n),
          h = n.mode !== "css",
          p = s.pageRatio > 1,
          g = this.ui.isFullscreen == true ? false : o.height === "auto",
          v,
          m,
          b,
          w,
          x,
          P,
          y,
          C = a.hasClass("df-sidemenu-open") ? 220 : 0,
          L = this.target.pageMode == t.PAGE_MODE.SINGLE;
        var I = a.width();
        if (I < 400) {
          e.container.addClass("df-xs");
        } else {
          e.container.removeClass("df-xs");
        }
        var T = a.find(".df-ui-controls").height();
        var k =
            o.paddingTop +
            (o.controlsPosition == t.CONTROLSPOSITION.TOP ? T : 0),
          O = o.paddingRight,
          R =
            o.paddingBottom +
            (o.controlsPosition == t.CONTROLSPOSITION.BOTTOM ? T : 0),
          F = o.paddingLeft;
        (k = isNaN(k) ? 0 : S(k, 0, k)),
          (R = isNaN(R) ? 0 : S(R, 0, R)),
          (F = isNaN(F) ? 0 : S(F, 0, F)),
          (O = isNaN(O) ? 0 : S(O, 0, O));
        var M = k + R,
          D = F + O;
        var N = I - C;
        a.height(o.height);
        var A = i(window).height();
        var B = Math.min(a.height(), A);
        var j = e.calculateSize(B, N, A, M, D, g, u, L);
        if (g) {
          B = _ = e.calculateSize(B, N + C, A, M, D, g, u, L).stageHeight;
        } else {
          B = _ = j.stageHeight;
        }
        a.height(B);
        var _ = B;
        var U = N - D,
          H = _ - M;
        b = Math.floor(L ? U : U / 2);
        m = Math.floor(b / u);
        v = m > H;
        if (v) {
          m = H;
          b = m * u;
        }
        y = s.maxZoom = s.zoomViewport.height / m;
        if (e.zoomValue == null) e.zoomValue = 1;
        if (s.zoomScale == null) s.zoomScale = 1;
        if (e.pendingZoom == true && e.zoomDelta != null) {
          var W = e.zoomDelta,
            V,
            G = Math.max(m, b);
          e.zoomValue =
            e.zoomDelta > 0
              ? e.zoomValue * e.options.zoomRatio
              : e.zoomValue / e.options.zoomRatio;
          e.zoomValue = S(e.zoomValue, 1, y);
          if (e.zoomValue == 1) {
            s.zoomScale = 1;
          } else {
            s.zoomScale = S(e.zoomValue, 1, y);
          }
        }
        P = s.zoomScale;
        s.checkViewportSize(b, m, P);
        if (s.contentSourceType == c.PDF) {
          b = s.imageViewport.width / P;
          m = s.imageViewport.height / P;
        }
        if (s.zoomScale != 1) {
          this.target.container.addClass("df-zoom-enabled");
        }
        var q = (n.zoomWidth = Math.floor(b * P)),
          Z = (n.zoomHeight = Math.floor(m * P));
        var Y = q * 2;
        if (h) {
          var K = Z / n.height,
            X = N / _;
          var Q = (P * (m + M)) / K,
            $ = (P * (b * (L ? 1 : 2) + D)) / K;
          var J = v ? Q : $ / X;
          r.resizeCanvas(N, _);
          w =
            1 /
              ((2 * Math.tan((Math.PI * r.camera.fov * 0.5) / 180)) / (J / P)) +
            2.2;
          r.camera.updateProjectionMatrix();
          r.renderRequestPending = true;
          var ee = ((k - R) * (n.height / m)) / P / 2;
          var te = s.zoomScale == 1;
          if (r.camera.position.z !== w && e.pendingZoom == true) {
            if (e.zoomTween != null) e.zoomTween.stop();
            e.zoomTween = new TWEEN.Tween({
              campos: r.camera.position.z,
              otx: r.orbitControl.target.x,
              oty: r.orbitControl.target.y,
              otz: r.orbitControl.target.z,
            })
              .delay(0)
              .to({ campos: w, otx: 0, oty: ee, otz: 0 }, 100)
              .onUpdate(function () {
                r.camera.position.z = this.campos;
                if (te) {
                  r.camera.position.y = this.oty;
                  r.orbitControl.target = new THREE.Vector3(
                    this.otx,
                    this.oty,
                    this.otz
                  );
                }
                r.orbitControl.update();
              })
              .easing(TWEEN.Easing.Linear.None)
              .onComplete(function () {
                r.camera.position.z = w;
                if (s.zoomScale == 1) {
                  r.camera.position.set(0, ee, w);
                  r.orbitControl.target = new THREE.Vector3(0, ee, 0);
                }
                r.orbitControl.update();
              })
              .start();
          } else {
            if (s.zoomScale == 1) {
              r.camera.position.set(0, ee, w);
              r.orbitControl.target = new THREE.Vector3(0, ee, 0);
            }
            r.orbitControl.update();
          }
          r.orbitControl.update();
          r.orbitControl.mouseButtons.ORBIT = P != 1 ? -1 : THREE.MOUSE.RIGHT;
          r.orbitControl.mouseButtons.PAN = P != 1 ? THREE.MOUSE.LEFT : -1;
        } else {
          n.pageWidth = Math.round(b);
          n.fullWidth = n.pageWidth * 2;
          n.height = Math.round(m);
          var ie = (n.shiftHeight = Math.round(S((Z - _ + M) / 2, 0, Z))),
            ne = (n.shiftWidth = Math.round(S((Y - N + D) / 2, 0, Y)));
          if (P == 1) {
            n.left = 0;
            n.top = 0;
          }
          n.stage.css({
            top: -ie,
            bottom: -ie,
            right: -ne + (f ? C : 0),
            left: -ne + (f ? 0 : C),
            paddingTop: k,
            paddingRight: O,
            paddingBottom: R,
            paddingLeft: F,
            transform: "translate3d(" + n.left + "px," + n.top + "px,0)",
          });
          n.stageHeight = r.height();
          n.wrapper.css({
            width: Y,
            height: Z,
            marginTop: B - Z - M > 0 ? (B - M - Z) / 2 : 0,
          });
          var ae = Math.floor(E(b, m) * P);
          n.stage.find(".df-page-wrapper").width(ae).height(ae);
          n.stage
            .find(
              ".df-book-page, .df-page-front , .df-page-back, .df-page-fold-inner-shadow"
            )
            .height(Z)
            .width(q);
        }
        e.checkCenter({ type: "resize" });
        if (s.zoomScale == 1) {
          this.target.container.removeClass("df-zoom-enabled");
        }
        if (n.thumblist) {
          n.thumblist.reset(i(n.thumblist.container).height());
        }
        e.pendingZoom = false;
      },
      playSound: function () {
        try {
          if (this.options && this.options.soundEnable == true) {
            this.sound.currentTime = 0;
            this.sound.play();
          }
        } catch (e) {}
      },
      setPageMode: function (e) {
        if (e == true) {
          this.ui.pageMode.addClass(this.options.icons["doublepage"]);
          this.ui.pageMode.html(
            "<span>" + this.options.text.doublePageMode + "</span>"
          );
          this.ui.pageMode.attr("title", this.options.text.doublePageMode);
          this.target.pageMode = t.PAGE_MODE.SINGLE;
        } else {
          this.ui.pageMode.removeClass(this.options.icons["doublepage"]);
          this.ui.pageMode.html(
            "<span>" + this.options.text.singlePageMode + "</span>"
          );
          this.ui.pageMode.attr("title", this.options.text.singlePageMode);
          this.target.pageMode = t.PAGE_MODE.DOUBLE;
        }
        if (
          this.target &&
          this.target.singlePageMode == t.SINGLE_PAGE_MODE.BOOKLET
        ) {
          this.target.reset();
        }
        this.resize();
      },
      setAutoPlay: function (e) {
        if (this.options.autoPlay) {
          e = e == true;
          var t = e ? this.options.text.pause : this.options.text.play;
          this.ui.play.toggleClass(this.options.icons["pause"], e);
          this.ui.play.html("<span>" + t + "</span>");
          this.ui.play.attr("title", t);
          clearInterval(this.autoPlayTimer);
          if (e) {
            this.autoPlayTimer = setInterval(
              this.autoPlayFunction,
              this.options.autoPlayDuration
            );
          }
          this.target.autoPlay = e;
        }
      },
      height: function (e) {
        if (e == null) {
          return this.container.height();
        } else {
          this.options.height = e;
          this.container.height(e);
          this.resize();
        }
      },
      checkCenter: function (e) {
        e = e == null ? {} : e;
        this.centerType = this.centerType || "start";
        var i = this.target;
        var n = 0,
          a = 0,
          o = 0;
        var r = l.getBasePage(i._activePage);
        var s = i._activePage % 2 == 0;
        var c = i.direction == t.DIRECTION.RTL;
        var u = i.pageMode == t.PAGE_MODE.SINGLE,
          d = u && i.singlePageMode == t.SINGLE_PAGE_MODE.BOOKLET;
        var f = i.stage.width(),
          h;
        if (i.mode == "css") {
          h = i.wrapper.width();
          n = Math.max((h - f) / 2, 0);
          a = -h / 4;
          o = h / 4;
          if (r == 0 || d) {
            i.wrapper.css({ left: u ? (c ? o - n : a - n) : c ? o : a });
            i.shadow.css({
              width: "50%",
              left: c ? 0 : "50%",
              transitionDelay: "",
            });
          } else if (r == i.pageCount) {
            i.wrapper.css({ left: u ? (c ? a - n : o - n) : c ? a : o });
            i.shadow.css({
              width: "50%",
              left: c ? "50%" : 0,
              transitionDelay: "",
            });
          } else {
            i.wrapper.css({
              left: u ? (c ? (s ? a - n : o - n) : s ? o - n : a - n) : 0,
            });
            i.shadow.css({
              width: "100%",
              left: 0,
              transitionDelay: parseInt(i.duration, 10) + 50 + "ms",
            });
          }
          i.wrapper.css({ transition: e.type == "resize" ? "none" : "" });
        } else if (i.stage != null) {
          var p = i.position.x,
            g;
          n = i.width / 4;
          h = i.width;
          a = -h / 2;
          o = h / 2;
          if (r == 0 || d) {
            g = c ? o : a;
          } else if (r == i.pageCount) {
            g = c ? a : o;
          } else {
            g = u ? (c ? (s ? a : o) : s ? o : a) : 0;
          }
          if (g !== this.centerEnd) {
            this.centerTween = new TWEEN.Tween({ x: p })
              .delay(0)
              .to({ x: g }, i.duration)
              .onUpdate(function () {
                i.position.x = this.x;
                i.stage.cssScene.position.x = this.x;
              })
              .easing(i.ease)
              .start();
            this.centerEnd = g;
          }
        }
      },
      width: function (e) {
        if (e == null) {
          return this.container.width();
        } else {
          this.options.width = e;
          this.container.width(e);
          this.resize();
        }
      },
    };
    return n;
  })({});
  t.PreviewObject = Z;
  var Y = (function (e) {
    H(a, e);
    function a(e, a, o, r) {
      o = o || {};
      var s = this;
      s.contentRawSource = e || [n.textureLoadFallback];
      s.contentSource = s.contentRawSource;
      s.contentSourceType = null;
      s.minDimension = o.minTextureSize || 256;
      s.maxDimension = o.maxTextureSize || 2048;
      s.pdfRenderQuality = o.pdfRenderQuality || t.defaults.pdfRenderQuality;
      s.flipbook = r;
      s.waitPeriod = 50;
      s.maxLength = 297;
      s.enableDebug = false;
      s.zoomScale = 1;
      s.maxZoom = 2;
      s.options = o;
      s.outline = o.outline;
      s.links = o.links;
      s.html = o.html;
      s.isCrossOrigin = o.isCrossOrigin;
      s.normalViewport = { height: 297, width: 210, scale: 1 };
      s.viewport = { height: 297, width: 210, scale: 1 };
      s.imageViewport = { height: 297, width: 210, scale: 1 };
      s.bookSize = { height: 297, width: 210 };
      s.zoomViewport = { height: 297, width: 210 };
      s.thumbsize = 128;
      s.cacheIndex = 1024;
      s.cache = [];
      s.pageRatio = o.pageRatio || s.viewport.width / s.viewport.height;
      s.textureLoadTimeOut = null;
      s.type = "TextureLibrary";
      if (
        Array === s.contentSource.constructor ||
        Array.isArray(s.contentSource) ||
        s.contentSource instanceof Array
      ) {
        s.contentSourceType = c.IMAGE;
        s.pageCount = s.contentSource.length;
        for (var u = 0; u < s.contentSource.length; u++) {
          s.contentSource[u] = l.httpsCorrection(s.contentSource[u].toString());
        }
        i("<img/>")
          .attr("src", s.contentSource[0])
          .on("load", function () {
            s.viewport.height = this.height;
            s.viewport.width = this.width;
            s.pageRatio = s.viewport.width / s.viewport.height;
            s.bookSize = {
              width: (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxLength,
              height: s.maxLength / (s.pageRatio < 1 ? 1 : s.pageRatio),
            };
            s.zoomViewport = {
              width: (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxDimension,
              height: s.maxDimension / (s.pageRatio < 1 ? 1 : s.pageRatio),
            };
            s.linkService = new PDFLinkService();
            i(this).off();
            if (s.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL) {
              s.pageCount = s.contentSource.length * 2 - 2;
              if (s.options.webgl == true) s.requiresImageTextureScaling = true;
            }
            if (a != null) {
              a(s);
              a = null;
            }
            k(this.height + ":" + this.width);
          });
      } else if (
        typeof s.contentSource == "string" ||
        s.contentSource instanceof String
      ) {
        var d = function () {
          if (s.contentSource.indexOf(".base64") > 1) {
            i.ajax({
              url: s.contentSource,
              xhrFields: {
                onprogress: function (e) {
                  if (e.lengthComputable) {
                    var t = (100 * e.loaded) / e.total;
                    s.updateInfo(
                      s.options.text.loading +
                        " PDF " +
                        t.toString().split(".")[0] +
                        "% ..."
                    );
                  }
                },
              },
              success: function (e) {
                s.options.docParameters = { data: atob(e) };
                f();
              },
            });
          } else {
            f();
          }
        };
        var f = function () {
          if (s) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = n.pdfjsWorkerSrc;
            s.contentSourceType = c.PDF;
            var i = s.options.disableFontFace;
            if (_ || U || s.options.disableFontFace == true) {
            }
            var o = (s.loading = pdfjsLib.getDocument(
              s.options.docParameters
                ? s.options.docParameters
                : {
                    url: l.httpsCorrection(e),
                    rangeChunkSize: isNaN(s.options.rangeChunkSize)
                      ? 524288
                      : s.options.rangeChunkSize,
                    cMapUrl: n.cMapUrl,
                    cMapPacked: true,
                    imageResourcesPath: n.imageResourcesPath,
                    disableAutoFetch: true,
                    disableStream: true,
                    disableFontFace: i,
                  }
            ));
            o.promise.then(
              function e(i) {
                s.pdfDocument = i;
                i.getPage(1).then(function (e) {
                  s.normalViewport = e.getViewport({ scale: 1 });
                  s.viewport = e.getViewport({ scale: 1 });
                  s.viewport.height = s.viewport.height / 10;
                  s.viewport.width = s.viewport.width / 10;
                  s.pageRatio = s.viewport.width / s.viewport.height;
                  s.bookSize = {
                    width: (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxLength,
                    height: s.maxLength / (s.pageRatio < 1 ? 1 : s.pageRatio),
                  };
                  s.zoomViewport = {
                    width: (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxDimension,
                    height:
                      s.maxDimension / (s.pageRatio < 1 ? 1 : s.pageRatio),
                  };
                  s.refPage = e;
                  if (i.numPages > 1) {
                    i.getPage(2).then(function (e) {
                      if (s.options.pageSize == t.PAGE_SIZE.AUTO) {
                        var n = e.getViewport({ scale: 1 });
                        var o = n.width / n.height;
                        if (o > s.pageRatio * 1.5) {
                          s.options.pageSize = t.PAGE_SIZE.DOUBLEINTERNAL;
                          s.pageCount = i.numPages * 2 - 2;
                        } else {
                          s.options.pageSize = t.PAGE_SIZE.SINGLE;
                        }
                      }
                      if (a != null) {
                        a(s);
                        a = null;
                      }
                    });
                  } else {
                    if (a != null) {
                      a(s);
                      a = null;
                    }
                  }
                });
                s.linkService = new PDFLinkService();
                s.linkService.setDocument(i, null);
                s.pageCount = i.numPages;
                s.contentSource = i;
              },
              function e(t) {
                if (s) {
                  var i = "",
                    n = document.createElement("a");
                  n.href = s.contentSource;
                  if (n.hostname !== window.location.hostname)
                    i = "CROSS ORIGIN!! ";
                  s.updateInfo(i + "Cannot access file!  " + s.contentSource);
                }
              }
            );
            o.onProgress = function e(t) {
              if (s) {
                var i = (100 * t.loaded) / t.total;
                if (isNaN(i)) {
                  if (t && t.loaded) {
                    s.updateInfo(
                      s.options.text.loading +
                        " PDF " +
                        (Math.ceil(t.loaded / 1e4) / 100).toString() +
                        "MB ..."
                    );
                  } else {
                    s.updateInfo(s.options.text.loading + " PDF ...");
                  }
                } else {
                  s.updateInfo(
                    s.options.text.loading +
                      " PDF " +
                      i.toString().split(".")[0] +
                      "% ..."
                  );
                }
              }
            };
          }
        };
        var h = function () {
          if (s) {
            if (n.pdfjsWorkerSrc.indexOf("?ver") < 0)
              n.pdfjsWorkerSrc += "?ver=" + t.version;
            s.updateInfo(s.options.text.loading + " PDF Worker ...");
            var e = document.createElement("a");
            e.href = n.pdfjsWorkerSrc;
            if (e.hostname !== window.location.hostname) {
              s.updateInfo(s.options.text.loading + " PDF Worker CORS ...");
              i.ajax({
                url: n.pdfjsWorkerSrc,
                cache: true,
                success: function (e) {
                  n.pdfjsWorkerSrc = t.createObjectURL(e, "text/javascript");
                  d();
                },
              });
            } else {
              d();
            }
          }
        };
        if (window.pdfjsLib == null) {
          if (s) {
            s.updateInfo(s.options.text.loading + " PDF Service ...");
            M(
              n.pdfjsSrc + "?ver=" + t.version,
              function () {
                if (
                  typeof define === "function" &&
                  define.amd &&
                  window.requirejs
                ) {
                  s.updateInfo(
                    s.options.text.loading + " PDF Service (require) ..."
                  );
                  require.config({
                    paths: {
                      "pdfjs-dist/build/pdf.worker": n.pdfjsWorkerSrc.replace(
                        ".js",
                        ""
                      ),
                    },
                  });
                  require(["pdfjs-dist/build/pdf"], function (e) {
                    window.pdfjsLib = e;
                    h();
                  });
                } else if (
                  typeof exports === "object" &&
                  exports["pdfjs-dist/build/pdf"] != null
                ) {
                  window.pdfjsLib = exports["pdfjs-dist/build/pdf"];
                  h();
                } else {
                  h();
                }
              },
              function () {
                s.updateInfo("Unable to load PDF service..");
              }
            );
          }
        } else {
          d();
        }
      } else {
        console.error(
          "Unknown source type. Please check documentation for help"
        );
      }
      this.dispose = function () {
        if (s.loading && s.loading.destroy) {
          s.loading.destroy();
        }
        s.loading = null;
        if (s.textureLoadTimeOut) {
          clearTimeout(s.textureLoadTimeOut);
          s.textureLoadTimeOut = null;
        }
        if (this.targetObject) {
          if (
            this.targetObject.thumbContainer &&
            this.targetObject.thumbContainer.remove
          )
            this.targetObject.thumbContainer.remove();
          if (
            this.targetObject.outlineContainer &&
            this.targetObject.outlineContainer.remove
          )
            this.targetObject.outlineContainer.remove();
          if (this.targetObject.dispose) this.targetObject.dispose();
          this.targetObject.processPage = null;
          this.targetObject.requestPage = null;
          if (this.targetObject.container && this.targetObject.container.off)
            this.targetObject.container.off();
        }
        if (this.pdfDocument && this.pdfDocument.destroy)
          this.pdfDocument.destroy();
        if (this.linkService && this.linkService.dispose)
          this.linkService.dispose();
        if (this.outlineViewer && this.outlineViewer.dispose)
          this.outlineViewer.dispose();
        if (this.thumblist && this.thumblist.dispose) {
          this.thumblist.review = null;
          this.thumblist.dispose();
        }
        this.activeThumb = null;
        this.targetObject = null;
        this.pdfDocument = null;
        this.linkService = null;
        this.outlineViewer = null;
        this.thumblist = null;
        s = null;
      };
      return this;
    }
    a.prototype.updateInfo = function (e) {
      if (this.flipbook && this.flipbook.updateInfo) {
        this.flipbook.updateInfo(e);
      }
    };
    a.prototype.initThumbs = function () {
      var e = this;
      if (e.cache[e.thumbsize] == null) e.cache[e.thumbsize] = [];
      var t;
      var n = function () {
        clearTimeout(t);
        t = setTimeout(function () {
          t = setTimeout(a, e.waitPeriod / 2);
        }, e.waitPeriod);
      };
      var a = function () {
        var a = 0;
        if (Date.now() - e.thumblist.lastScrolled < 100) {
          a = 1;
        } else {
          e.targetObject.container
            .find(".df-thumb-container .df-vrow")
            .each(function () {
              var t = i(this);
              if (!t.hasClass("df-thumb-loaded")) {
                a++;
                var o = i(this).attr("id").replace("df-thumb", "");
                e.getPage(o, n, true);
                t.addClass("df-thumb-loaded");
                return false;
              }
            });
          if (a == 0) {
            clearTimeout(t);
          }
        }
        if (a > 0) {
          n();
        }
        if (e.activeThumb != e.targetObject._activePage) {
          var o =
            e.targetObject.thumbContainer != null &&
            e.targetObject.thumbContainer.hasClass("df-sidemenu-visible");
          if (o) {
            var r = e.thumblist.container;
            var s = r.scrollTop,
              c = r.getBoundingClientRect().height;
            var u = e.targetObject.thumbContainer.find(
              "#df-thumb" + e.targetObject._activePage
            );
            if (u.length > 0) {
              e.targetObject.thumbContainer
                .find(".df-selected")
                .removeClass("df-selected");
              u.addClass("df-selected");
              u = u[0];
              if (s + c < u.offsetTop + u.scrollHeight)
                l.scrollIntoView(u, null, false);
              else if (s > u.offsetTop) l.scrollIntoView(u);
              e.activeThumb = e.targetObject._activePage;
            } else {
              i(r).scrollTop(e.targetObject._activePage * 124);
              n();
            }
          }
        }
      };
      e.thumblist = e.targetObject.thumblist = new ThumbList({
        h: 500,
        addFn: function (e) {},
        scrollFn: n,
        itemHeight: 128,
        totalRows: e.pageCount,
        generatorFn: function (e) {
          var t = document.createElement("div");
          var i = e + 1;
          t.id = "df-thumb" + i;
          var n = document.createElement("div");
          n.innerHTML = i;
          t.appendChild(n);
          return t;
        },
      });
      e.thumblist.lastScrolled = Date.now();
      e.thumblist.review = n;
      n();
      var o = i("<div>").addClass(
        "df-thumb-container df-sidemenu-visible df-sidemenu"
      );
      o.append(i(e.thumblist.container).addClass("df-thumb-wrapper"));
      e.targetObject.thumbContainer = o;
      e.targetObject.container.append(o);
      var r = i(h.div, { class: "df-ui-btn df-ui-sidemenu-close ti-close" });
      o.append(r);
      e.thumblist.reset(i(e.thumblist.container).height());
      e.targetObject.container.on(
        "click",
        ".df-thumb-container .df-vrow",
        function (t) {
          t.stopPropagation();
          var n = i(this).attr("id").replace("df-thumb", "");
          e.targetObject.gotoPage(parseInt(n, 10));
        }
      );
    };
    a.prototype.initOutline = function () {
      var e = this;
      var t = i("<div>").addClass("df-outline-container df-sidemenu");
      var n = i("<div>").addClass("df-outline-wrapper");
      var a = i(h.div, { class: "df-ui-btn df-ui-sidemenu-close ti-close" });
      t.append(a).append(n);
      e.targetObject.container.append(t);
      e.targetObject.outlineContainer = t;
      e.outlineViewer = new BookMarkViewer({
        container: n[0],
        linkService: e.linkService,
        outlineItemClass: "df-outline-item",
        outlineToggleClass: "df-outline-toggle",
        outlineToggleHiddenClass: "df-outlines-hidden",
      });
      function o(t) {
        if (e.options.overwritePDFOutline == true) {
          t = [];
        }
        t = t || [];
        if (e.outline) {
          for (var i = 0; i < e.outline.length; i++) {
            e.outline[i].custom = true;
            if (t) t.push(e.outline[i]);
          }
        }
        if (t.length === 0 && e.targetObject.ui.outline != null) {
          e.targetObject.ui.outline.hide();
        }
        e.outlineViewer.render({ outline: t });
      }
      if (e.pdfDocument) {
        e.pdfDocument.getOutline().then(function (e) {
          o(e);
        });
      } else {
        o([]);
      }
      if (e.options.autoEnableOutline == true) {
        e.targetObject.ui.outline.trigger("click");
      }
      if (e.options.autoEnableThumbnail == true) {
        e.targetObject.ui.thumbnail.trigger("click");
      }
    };
    a.prototype.checkViewportSize = function (e, t, i) {
      var a = this;
      var o = a.targetObject;
      var r = e * i,
        s = t * i;
      var l = a.cacheIndex;
      if (a.contentSourceType == c.PDF) {
        a.cacheIndex = Math.ceil(Math.max(r, s));
        a.cacheIndex = Math.floor(Math.max(r, s));
        a.cacheIndex = S(
          a.cacheIndex * n.pixelRatio,
          a.minDimension,
          a.maxDimension
        );
        if (a.cache[a.cacheIndex] == null) a.cache[a.cacheIndex] = [];
        if (l !== a.cacheIndex) {
          for (var u = 0; u < o.children.length; u++) {
            var d = o.children[u];
          }
          o.refresh();
        }
        a.imageViewport = a.refPage.getViewport({
          scale: s / a.normalViewport.height,
        });
        a.viewport =
          o.mode == "css"
            ? a.imageViewport
            : a.refPage.getViewport({
                scale: a.bookSize.height / a.normalViewport.height,
              });
        k(a.cacheIndex);
        a.annotedPage = undefined;
        a.review();
      } else {
        if (a.cache[a.cacheIndex] == null) a.cache[a.cacheIndex] = [];
      }
    };
    a.prototype.getCache = function (e, t) {
      return t == true
        ? this.cache[this.thumbsize] == null
          ? null
          : this.cache[this.thumbsize][e]
        : this.cache[this.cacheIndex] == null
        ? null
        : this.cache[this.cacheIndex][e];
    };
    a.prototype.setCache = function (e, t, i, n) {
      if (i == true) {
        if (this.cache[this.thumbsize] != null)
          this.cache[this.thumbsize][e] = t;
      } else {
        var a = n == null ? this.cacheIndex : n;
        if (this.cache[a] != null) this.cache[a][e] = t;
      }
    };
    a.prototype.setTarget = function (e) {
      var t = this;
      if (e == null) {
        return this.targetObject;
      } else {
        this.targetObject = e;
        e.contentProvider = this;
        e.container.removeClass("df-loading df-init");
        if (t.linkService != null) {
          t.linkService.setViewer(e);
          t.initOutline();
        }
        e.processPage = function (e, i) {
          if (e > 0 && e <= t.pageCount) {
            t.getPage(e, i);
          } else {
            t.setPage(e, n.textureLoadFallback, i);
          }
        };
        e.requestPage = function () {
          t.review("Request");
        };
        if (e.resize != null) e.resize();
      }
    };
    a.prototype.review = function (e) {
      var t = this;
      e = e || "timer review";
      clearTimeout(t.textureLoadTimeOut);
      t.textureLoadTimeOut = setTimeout(function () {
        t.textureLoadTimeOut = setTimeout(
          t.reviewPages,
          t.waitPeriod / 2,
          t,
          e
        );
      }, t.waitPeriod);
    };
    a.prototype.reviewPages = function (e, t) {
      e = e || this;
      var n = e.targetObject;
      if (n == null) return;
      var a = A(n);
      if (t != null) k(t);
      var o = false;
      var r, s;
      for (r = 0; r < e.targetObject.children.length; r++) {
        s = n.children[r];
        if (s.isFlipping == true) {
          o = true;
          break;
        }
      }
      if (o == false) {
        var l = n.children.length > 3 ? 3 : n.children.length;
        var c = l / 2;
        var u = a ? n._activePage : F(n._activePage);
        e.baseNumber = u;
        if (e.zoomScale > 1) {
          l = 1;
        }
        for (r = 0; r < l; r++) {
          var d = Math.floor(r / 2);
          var f =
            r % 2 == 0 ? -d * (a ? 1 : 2) : (d == 0 ? 1 : d) * (a ? 1 : 2);
          var h = u + f,
            p = u + f + 1;
          var g = n.getPageByNumber(h),
            v = n.getPageByNumber(p),
            m = h + "|" + e.cacheIndex,
            b = p + "|" + e.cacheIndex;
          var w = 0;
          if (g != null && g.frontPageStamp != m && g.visible == true) {
            g.frontTextureLoaded = false;
            n.processPage(h, function () {
              e.review("Batch Call");
            });
            g.frontPageStamp = m;
            w++;
          }
          if (v != null && v.backPageStamp != b && v.visible == true && !a) {
            v.backTextureLoaded = false;
            n.processPage(p, function () {
              e.review("Batch Call");
            });
            v.backPageStamp = b;
            w++;
          }
          if (f == 0 && e.annotedPage !== u) {
            e.getAnnotations(h);
            if (!a) e.getAnnotations(p);
            e.annotedPage = u;
          }
          if (w > 0) {
            break;
          }
        }
        if (w == 0) {
          if (n.mode !== "css") {
            e.setLoading(u);
          } else {
          }
        }
      } else {
        e.review("Revisit request");
        if (e.annotedPage != null && n.mode !== "css") {
          var x = F(n._activePage);
          i(n.getContentLayer(x)).html("");
          i(n.getContentLayer(x + 1)).html("");
          e.annotedPage = null;
        }
      }
    };
    a.prototype.getPage = function (e, a, o) {
      var r = this;
      e = parseInt(e, 10);
      var s = e;
      var l = r.contentSource;
      if (e <= 0 && e >= r.pageCount) {
        r.setPage(e, n.textureLoadFallback, a, o);
      } else {
        if (r.contentSourceType == c.PDF) {
          if (r.getCache(e, o) != null) {
            r.setPage(e, r.getCache(e, o), a, o);
            k("Page " + e + " loaded from cache");
          } else {
            if (o !== true) r.setLoading(e, true);
            if (r.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL && e > 2) {
              s = Math.ceil((e - 1) / 2) + 1;
            }
            l.getPage(s, o).then(function (t) {
              f(t, e, a, o);
            });
          }
        } else if (
          r.contentSourceType == c.IMAGE ||
          r.contentSourceType == c.HTML
        ) {
          if (r.getCache(e, o) != null) {
            r.setPage(e, r.getCache(e, o), a, o);
            k("Page " + e + " loaded from cache");
          } else {
            if (o !== true) r.setLoading(e, true);
            if (r.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL && e > 2) {
              s = Math.ceil((e - 1) / 2) + 1;
            }
            d(
              l[s - 1],
              function (t) {
                r.setCache(e, t, o, r.cacheIndex);
                r.setPage(e, t, a, o);
                if (a != null) a();
              },
              r.isCrossOrigin
            );
          }
        }
      }
      function u(e, i, a) {
        var o = new Image();
        o.crossOrigin = "Anonymous";
        o.onload = function () {
          if (a == true) {
            var r = document.createElement("canvas"),
              s = r.getContext("2d");
            r.width = o.width;
            r.height = o.height;
            s.drawImage(o, 0, 0);
            if (n.canvasToBlob == true) {
              r.toBlob(
                function (e) {
                  var n = t.createObjectURL(e, "image/jpeg");
                  if (i != null) i(n);
                },
                "image/jpeg",
                0.85
              );
            } else {
              if (i != null) i(r);
            }
          } else {
            if (i != null) i(e);
          }
          o.onload = null;
          o = null;
        };
        o.src = e;
        if (o.complete || o.complete === undefined) {
          o.src =
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          o.src = e;
        }
      }
      function d(e, t, n) {
        i("<img/>")
          .attr("src", e)
          .on("load", function () {
            i(this).off();
            if (t != null) {
              t(e);
            }
            k(this.height + ":" + this.width);
          });
      }
      function f(e, i, n, a) {
        var o = r.options.forceFit;
        var s =
          r.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL &&
          i > 1 &&
          i < r.pageCount;
        var l = s && o ? 2 : 1;
        var c = o ? e.getViewport({ scale: 1 }) : r.normalViewport;
        var u = r.cacheIndex / Math.max(c.width / l, c.height);
        if (r.webgl == true) {
          u = O(r.cacheIndex) / (r.pageRatio > 1 ? c.width / l : c.height);
        }
        var d = document.createElement("canvas");
        var f = performance.now();
        var h = r.cacheIndex;
        var p = d.getContext("2d");
        if (a == true) {
          u = r.thumbsize / r.normalViewport.height;
        }
        d.height = Math.round(c.height * u);
        d.width = Math.round((c.width / l) * u);
        if (
          r.targetObject.mode == "css" &&
          Math.abs(r.targetObject.zoomHeight - d.height) < 2
        ) {
          d.height = r.targetObject.zoomHeight + 0;
          d.width = r.targetObject.zoomWidth + 0;
        }
        c = e.getViewport({ scale: u });
        k("rendering " + i + " at " + d.width + "x" + d.height);
        if (s) {
          if (z(r.targetObject)) {
            if (i % 2 == 0) {
              c.transform[4] = -d.width;
            }
          } else {
            if (i % 2 == 1) {
              c.transform[4] = -d.width;
            }
          }
        }
        var g = { canvasContext: p, viewport: c };
        e.cleanupAfterRender = true;
        var v = e.render(g);
        v.promise.then(function () {
          k(performance.now() - f);
          f = performance.now();
          if (
            a == true ||
            (r.options.canvasToBlob == true && r.webgl !== true)
          ) {
            d.toBlob(
              function (e) {
                var o = t.createObjectURL(e, "image/jpeg");
                k(performance.now() - f);
                r.setCache(i, o, a, h);
                r.setPage(i, o, n, a);
              },
              "image/jpeg",
              r.pdfRenderQuality
            );
          } else {
            k("Setting Page " + i);
            r.setPage(i, d, n, a);
          }
          g = null;
        });
      }
    };
    a.prototype.getTargetPage = function (e) {};
    a.prototype.setLoading = function (e, t) {
      if (this.targetObject != null) {
        if (this.webgl == true) {
          var n = this.targetObject.container;
          if (t == true) {
            if (n.isLoading !== true) {
              n.addClass("df-loading");
              n.isLoading = true;
              k("Loading icon at " + e + " as " + t);
            }
          } else {
            if (n.isLoading != null) {
              n.removeClass("df-loading");
              n.isLoading = null;
              k("Loading icon at " + e + " as " + t);
            }
          }
        } else {
          var a = i(this.targetObject.getContentLayer(e));
          if (a != null) {
            if (t == true) a.addClass("df-page-loading");
            else a.removeClass("df-page-loading");
            k("Loading icon at " + e + " as " + t);
          }
        }
      }
    };
    a.prototype.getAnnotations = function (e) {
      var n = this;
      if (n.options.enableAnnotation == false) return;
      var a = n.targetObject;
      e = parseInt(e, 10);
      var o = n.contentSource;
      var r = i(a.getContentLayer(e));
      r.empty();
      if (e > 0 && e <= n.pageCount) {
        if (n.contentSourceType == c.PDF) {
          var s = F(e);
          var l = e;
          if (n.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL && e > 2) {
            l = Math.ceil((e - 1) / 2) + 1;
          }
          o.getPage(l).then(function (t) {
            if (r != null && r.length > 0) {
              var i = t.getViewport({ scale: 1 });
              i = t.getViewport({ scale: n.viewport.height / i.height });
              n.setupAnnotations(t, i, r, e);
            }
          });
        }
        if (n.links != null && n.links[e] != null) {
          var u = n.links[e];
          for (var d = 0; d < u.length; d++) {
            var f = u[d];
            var h;
            if (f.dest && f.dest.indexOf && f.dest.indexOf("[html]") == 0) {
              h = document.createElement("div");
              h.innerHTML = f.dest.substr(6);
              h.className = "customHtmlAnnotation";
            } else {
              h = document.createElement("a");
              h.setAttribute("dest", f.dest);
              h.className = "customLinkAnnotation";
              h.href = "#" + f.dest;
              h.onclick = function () {
                var e = this.getAttribute("dest");
                if (e) {
                  n.linkService.customNavigateTo(e);
                }
                return false;
              };
            }
            h.style.left = f.x + "%";
            h.style.top = f.y + "%";
            h.style.width = f.w + "%";
            h.style.height = f.h + "%";
            r[0].appendChild(h);
          }
        }
        if (n.html != null && n.html[e] != null) {
          var p = n.html[e];
          r.append(i("<div class='customHTMLAnnotation'>").html(p));
        }
      }
    };
    a.prototype.setPage = function (e, t, i, a) {
      var o = this;
      var r = o.targetObject;
      var s = z(r);
      var l = A(r);
      if (a == true) {
        var c = o.targetObject.container.find("#df-thumb" + e);
        c.css({ backgroundImage: C(t) });
      } else {
        if (t == n.textureLoadFallback) {
          k("Fallback on " + e);
        }
        var u = r.getPageByNumber(e);
        if (u != null) {
          if ((e % 2 != 0 && !s) || (e % 2 != 1 && s && !l) || (l && !s)) {
            k(e + "rendered to back of " + u.color);
            u.backImage(t, function (t, n) {
              u.backTextureLoaded = true;
              o.setLoading(e);
              if (
                o.requiresImageTextureScaling &&
                n &&
                e != 1 &&
                e != o.pageCount
              ) {
                n.repeat.x = 0.5;
                n.offset.x = 0.5;
              }
              if (i != null) i();
            });
          } else {
            k(e + "rendered to front of " + u.color);
            u.frontImage(t, function (t, n) {
              u.frontTextureLoaded = true;
              o.setLoading(e);
              if (
                o.requiresImageTextureScaling &&
                n &&
                e != 1 &&
                e != o.pageCount
              ) {
                n.repeat.x = 0.5;
              }
              if (i != null) i();
            });
          }
        } else {
          k("Invalid set request on Page " + e);
        }
      }
    };
    a.prototype.setupAnnotations = function (e, a, o, r) {
      if (o == null || i(o).length == 0) return;
      var s = this;
      return e.getAnnotations().then(function (l) {
        a = a.clone({ dontFlip: true });
        if (
          s.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL &&
          r > 2 &&
          r % 2 == 1
        ) {
        } else if (r == 1) {
        }
        if (o == null) {
          return;
        }
        o = i(o);
        if (o.find(".annotationDiv").length == 0) {
          o.append(i("<div class='annotationDiv'>"));
        }
        var c = o.find(".annotationDiv");
        c.empty();
        if (
          s.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL &&
          r > 2 &&
          r % 2 == 1
        ) {
          c.css({ left: "-100%" });
        } else if (r == 1) {
          c.css({ left: "" });
        }
        pdfjsLib.AnnotationLayer.render({
          annotations: l,
          div: c[0],
          page: e,
          viewport: a,
          imageResourcesPath: n.imageResourcesPath,
          linkService: s.linkService,
        });
        if (s.options.annotationClass && s.options.annotationClass !== "") {
          c.find(" > section").addClass(s.options.annotationClass);
        }
        if (s.options.search == true) {
          if (o.find(".textLayerDiv").length == 0) {
            o.append(i("<div class='textLayerDiv'>"));
          }
          var u = o.find(".textLayerDiv");
          e.getTextContent().then(function (e) {
            var i = new t.TextLayerBuilder({
              textLayerDiv: u[0],
              pageIndex: null,
              viewport: a.clone({ dontFlip: false }),
            });
            i.setTextContent(e);
            i.render();
          });
        }
      });
    };
    return a;
  })({});
  var K = (function () {
    function e(e) {
      this.angles = e.angles || [0, 0, 0, 0, 0, 0];
      this.stiffness = e.angles || 0.1;
      this.segments = e.segments || 1;
      this.canvasMode =
        e.contentSourceType !== c.IMAGE && e.canvasToBlob == false;
      this.initDOM();
    }
    function a(e) {
      var t = (e.contentLayer = i(h.div, { class: "df-page-content" }));
      e.append(t);
    }
    e.prototype = {
      initDOM: function () {
        var e = (this.element = i(h.div, { class: "df-book-page" }));
        var t = (this.wrapper = i(h.div, { class: "df-page-wrapper" }));
        var n = (this.front = i(h.div, { class: "df-page-front" }));
        var o = (this.back = i(h.div, { class: "df-page-back" }));
        var r = (this.foldInnerShadow = i(h.div, {
          class: "df-page-fold-inner-shadow",
        }));
        var s = (this.foldOuterShadow = i(h.div, {
          class: "df-page-fold-outer-shadow",
        }));
        this.frontIMG = new Image();
        this.backIMG = new Image();
        a(n, this.segments, true);
        a(o, this.segments, false);
        e.append(t).append(s);
        t.append(n).append(o).append(r);
      },
      updatePoint: function (e) {
        if (e == null) return;
        var i =
          this.parent.dragPage != null
            ? this.parent.dragPage
            : e.page != null
            ? e.page
            : this;
        var n = i.element.width(),
          a = i.element.height();
        var o = this.parent.corner != null ? this.parent.corner : e.corner,
          r = t.CORNERS;
        var s = i.side == d.right,
          l = o == r.BL || o == r.BR;
        e.rx = s == true ? n * 2 - e.x : e.x;
        e.ry = l == true ? a - e.y : e.y;
        var c = Math.atan2(e.ry, e.rx);
        c = Math.PI / 2 - S(c, 0, v(90));
        var u = s ? e.x / 2 : n - e.x / 2,
          f = e.ry / 2,
          h = Math.max(0, Math.sin(c - Math.atan2(f, u)) * E(u, f)),
          p = 0.5 * E(e.rx, e.ry);
        var g = Math.round(n - h * Math.sin(c)),
          b = Math.round(h * Math.cos(c)),
          x = m(c);
        var y = l ? (s ? 180 + (90 - x) : 180 + x) : s ? x : 90 - x;
        var C = l ? (s ? 180 + (90 - x) : x) : s ? x + 180 : y,
          L = l ? (s ? 90 - x : x + 90) : s ? y - 90 : y + 180,
          I = s ? n - g : g,
          T = l ? a + b : -b,
          k = s ? -g : g - n,
          O = l ? -a - b : b;
        var R = S((e.distance * 0.5) / n, 0, 0.5);
        var F = S(((n * 2 - e.rx) * 0.5) / n, 0.05, 0.3);
        i.element.addClass("df-folding");
        var M = s ? i.back : i.front;
        var D = s ? i.front : i.back;
        var A = i.foldOuterShadow;
        var z = i.foldInnerShadow;
        i.wrapper.css({ transform: w(I, T) + P(y) });
        M.css({ transform: P(-y) + w(-I, -T) });
        D.css({
          transform: P(C) + w(k, O),
          boxShadow: "rgba(0, 0, 0, " + R + ") 0px 0px 20px",
        });
        z.css({
          transform: P(C) + w(k, O),
          opacity: F / 2,
          backgroundImage:
            N.css +
            "linear-gradient( " +
            L +
            "deg, rgba(0, 0, 0, 0.25) , rgb(0, 0, 0) " +
            p * 0.7 +
            "px, rgb(255, 255, 255) " +
            p +
            "px)",
        });
        A.css({
          opacity: F / 2,
          left: s ? "auto" : 0,
          right: s ? 0 : "auto",
          backgroundImage:
            N.css +
            "linear-gradient( " +
            (-L + 180) +
            "deg, rgba(0, 0, 0,0) " +
            p / 3 +
            "px, rgb(0, 0, 0) " +
            p +
            "px)",
        });
      },
      updateAngle: function (e, t) {
        var i = this.element.width() * 5;
        this.wrapper.css({
          perspective: i,
          perspectiveOrigin: t == true ? "0% 50%" : "100% 50%",
        });
        this.front.css({
          display:
            t == true
              ? e <= -90
                ? "block"
                : "none"
              : e < 90
              ? "block"
              : "none",
          transform:
            (N.dom !== "MfS" ? "" : "perspective(" + i + "px) ") +
            (t == true ? "translateX(-100%) " : "") +
            "rotateY(" +
            ((t == true ? 180 : 0) + e) +
            "deg)",
        });
        this.back.css({
          display:
            t == true
              ? e > -90
                ? "block"
                : "none"
              : e >= 90
              ? "block"
              : "none",
          transform:
            (N.dom !== "MSd" ? "" : "perspective(" + i + "px) ") +
            (t == false ? "translateX(100%) " : "") +
            "rotateY(" +
            ((t == false ? -180 : 0) + e) +
            "deg)",
        });
        return;
      },
      tween: function (e) {
        var i = this;
        if (i == null || i.parent == null) return;
        var n = A(i.parent);
        var a = i.side == d.right;
        var o = i.parent.direction == t.DIRECTION.RTL;
        var r =
          i.parent.corner == t.CORNERS.BL || i.parent.corner == t.CORNERS.BR;
        var s = i.magnetic == true;
        var l = r ? i.parent.height : 0;
        var c,
          u,
          f,
          h = 0;
        var p = (i.end =
          i && i.animateToReset == true
            ? { x: a ? i.parent.fullWidth : 0, y: l }
            : { x: a ? 0 : i.parent.fullWidth, y: l });
        i.ease = i.isHard
          ? TWEEN.Easing.Quadratic.InOut
          : TWEEN.Easing.Linear.None;
        var g = i.parent.duration;
        if (i.isHard == true) {
          if (e != null) {
            h = T(e.distance, e.fullWidth);
          }
          c = i.init = { angle: h * (a ? -1 : 1) };
          p = i.end =
            i && i.animateToReset == true
              ? { angle: a ? 0 : -0 }
              : { angle: a ? -180 : 180 };
        } else {
          if (e == null) {
            c = i.init =
              i && i.animateToReset == true
                ? { x: a ? 0 : i.parent.fullWidth, y: 0 }
                : { x: a ? i.parent.fullWidth : 0, y: 0 };
            u = i.first = { x: ((a ? 3 : 1) * i.parent.fullWidth) / 4, y: 0 };
            f = i.mid = { x: ((a ? 1 : 3) * i.parent.fullWidth) / 4, y: 0 };
          } else {
            c = i.init = { x: e.x, y: e.y, opacity: 1 };
            u = i.first = { x: (e.x * 3) / 4, y: (e.y * 3) / 4, opacity: 1 };
            f = i.mid = { x: e.x / 4, y: e.y / 4, opacity: 1 };
            g =
              (i.parent.duration * I(c.x, c.y, p.x, p.y)) / i.parent.fullWidth;
            g = S(g, i.parent.duration / 3, i.parent.duration);
          }
        }
        c.index = 0;
        p.index = 1;
        i.isFlipping = true;
        var v = function (e) {
          if (i.isHard == true) {
            i.updateAngle(e.angle, a);
            i.angle = e.angle;
          } else {
            i.updatePoint({ x: e.x, y: e.y });
            i.x = e.x;
            i.y = e.y;
          }
          if (n && !s)
            i.element[0].style.opacity =
              (a && !o) || (!a && o)
                ? e.index > 0.5
                  ? 2 * (1 - e.index)
                  : 1
                : e.index < 0.5
                ? 2 * e.index
                : 1;
        };
        if (n && ((!a && !o) || (a && o))) i.element[0].style.opacity = 0;
        var m = (i.completeTween =
          i.completeTween ||
          function (e) {
            i.isFlipping = false;
            if (i.isHard == true) {
              i.updateAngle(i.end.angle);
              i.back.css({ display: "block" });
              i.front.css({ display: "block" });
            } else {
              i.updatePoint({ x: i.end.x, y: i.end.y });
            }
            i.element[0].style.opacity = 1;
            if (i.animateToReset !== true) {
              i.side = i.side == d.right ? d.left : d.right;
            } else i.animateToReset = null;
            i.currentTween = null;
            i.pendingPoint = null;
            i.magnetic = false;
            i.parent.dragPage = null;
            i.parent.corner = t.CORNERS.NONE;
            if (e != true) i.parent.refresh();
          });
        if (i.isHard == true) {
          i.currentTween = new TWEEN.Tween(c)
            .delay(0)
            .to(p, i.parent.duration)
            .onUpdate(function () {
              v(this);
            })
            .easing(i.ease)
            .onComplete(i.completeTween)
            .start();
        } else {
          if (e == null) {
            i.currentTween = new TWEEN.Tween(c)
              .delay(0)
              .to(p, i.parent.duration)
              .onUpdate(function () {
                v(this);
              })
              .easing(TWEEN.Easing.Sinusoidal.Out)
              .onComplete(i.completeTween)
              .start();
          } else {
            i.currentTween = new TWEEN.Tween(c)
              .delay(0)
              .to(p, g)
              .onUpdate(function () {
                v(this);
              })
              .easing(TWEEN.Easing.Sinusoidal.Out)
              .onComplete(i.completeTween);
            i.currentTween.start();
          }
        }
      },
      frontImage: function (e, t) {
        var a = this;
        function o() {
          a.front.css({ backgroundImage: C(e) });
          if (t != null) t();
        }
        if (a.canvasMode == true) {
          a.front.find(">canvas").remove();
          if (e !== n.textureLoadFallback) {
            a.front.append(i(e));
          }
          if (t != null) t();
        } else {
          if (e == n.textureLoadFallback) {
            o();
          } else {
            a.frontIMG.onload = o;
            a.frontIMG.src = e;
          }
        }
      },
      backImage: function (e, t) {
        var a = this;
        function o() {
          a.back.css({ backgroundImage: C(e) });
          if (t != null) t();
        }
        if (a.canvasMode == true) {
          a.back.find(">canvas").remove();
          if (e !== n.textureLoadFallback) {
            a.back.append(i(e));
          }
          if (t != null) t();
        } else {
          if (e == n.textureLoadFallback) {
            o();
          } else {
            a.backIMG.onload = o;
            a.backIMG.src = e;
          }
        }
      },
      updateCSS: function (e) {
        this.element.css(e);
      },
      resetCSS: function () {
        this.wrapper.css({ transform: "" });
        this.front.css({ transform: "", boxShadow: "" });
        this.back.css({ transform: "", boxShadow: "" });
      },
      clearTween: function (e) {
        this.currentTween.stop();
        this.completeTween(e == true);
        this.resetCSS();
      },
    };
    return e;
  })();
  var X = (function (e) {
    H(s, e);
    function o(e) {
      e.parent.container.find(".df-folding").removeClass("df-folding");
      e.element.addClass("df-folding");
    }
    function r(e) {
      var t = false;
      for (var i = 0; i < e.pages.length; i++) {
        var n = e.pages[i];
        if (n.isFlipping == true) {
          t = true;
          break;
        }
      }
      return t;
    }
    function s(e, n) {
      var s = this;
      s.type = "BookCSS";
      s.images = e.images || [];
      s.pageCount = e.pageCount || 1;
      s.foldSense = 50;
      s.stackCount = 4;
      s.mode = "css";
      s.pages = [];
      s.duration = e.duration;
      s.container = i(n);
      s.options = e;
      s.drag = d.none;
      s.pageMode =
        e.pageMode ||
        (B || s.pageCount <= 2 ? t.PAGE_MODE.SINGLE : t.PAGE_MODE.DOUBLE);
      s.singlePageMode =
        e.singlePageMode ||
        (B ? t.SINGLE_PAGE_MODE.BOOKLET : t.SINGLE_PAGE_MODE.ZOOM);
      s.swipe_threshold = B ? 15 : 50;
      s.direction = e.direction || t.DIRECTION.LTR;
      s.startPage = 1;
      s.endPage = s.pageCount;
      s._activePage = e.openPage || s.startPage;
      s.hardConfig = e.hard;
      a =
        "WebKitCSSMatrix" in window ||
        (document.body && "MozPerspective" in document.body.style);
      s.animateF = function () {
        if (TWEEN.getAll().length > 0) TWEEN.update();
        else clearInterval(s.animate);
      };
      s.init(e);
      s.skipDrag = false;
      function c(e) {
        if (s.dragPage != e.page && e.page.visible == true) {
          s.dragPage.clearTween(true);
          s.dragPage = e.page;
          s.corner = e.corner;
          s.dragPage.pendingPoint = e;
        }
      }
      var u = function (e) {
          var i = s.eventToPoint(e);
          if (
            e.touches != null &&
            e.touches.length == 2 &&
            s.startTouches != null
          ) {
            s.zoomDirty = true;
            var n = l.getVectorAvg(l.getTouches(e, s.container.offset())),
              a = l.calculateScale(s.startTouches, l.getTouches(e)),
              o = a / s.lastScale;
            var c = s.contentProvider.zoomScale,
              u = n.x,
              f = n.y;
            s.stage.css({
              transform:
                "translate3d(" +
                s.left +
                "px," +
                s.top +
                "px,0) scale3d(" +
                a +
                "," +
                a +
                ",1)",
            });
            s.lastScale = a;
            s.lastZoomCenter = n;
            e.preventDefault();
          }
          if (
            (e.touches != null && e.touches.length > 1) ||
            s.startPoint == null ||
            s.startTouches != null
          )
            return;
          var h = s.dragPage || i.page;
          if (s.contentProvider.zoomScale !== 1) {
            if (e.touches != null || s.isPanning == true) {
              s.pan(i);
              e.preventDefault();
            }
          } else {
            if (s.skipDrag !== true) {
              var p = i.distance;
              if (!r(s)) {
                if (s.dragPage != null || i.isInside == true) {
                  if (s.dragPage != null) {
                    k("set mouse down move");
                  } else {
                    i.y = S(i.y, 1, s.height - 1);
                    i.x = S(i.x, 1, i.fullWidth - 1);
                  }
                  var g = s.corner || i.corner;
                  if (h.isHard) {
                    var v = g == t.CORNERS.BR || g == t.CORNERS.TR;
                    var m = T(i.distance, i.fullWidth);
                    h.updateAngle(m * (v ? -1 : 1), v);
                  } else {
                    h.updatePoint(i, s);
                  }
                  h.magnetic = true;
                  h.magneticCorner = i.corner;
                  e.preventDefault();
                }
                if (
                  s.dragPage == null &&
                  h != null &&
                  i.isInside == false &&
                  h.magnetic == true
                ) {
                  h.pendingPoint = i;
                  h.animateToReset = true;
                  s.corner = h.magneticCorner;
                  s.animatePage(h);
                  h.pendingPoint = null;
                  h.magnetic = false;
                  h.magneticCorner = null;
                }
                if (
                  s.isPanning == true &&
                  s.dragPage == null &&
                  s.contentProvider.zoomScale == 1
                ) {
                  var b = i.x - s.lastPos,
                    w = performance.now() - s.lastTime;
                  if (Math.abs(b) > s.swipe_threshold) {
                    if (b < 0) {
                      s.next();
                    } else {
                      s.prev();
                    }
                    s.drag = d.none;
                    s.isPanning = false;
                    e.preventDefault();
                  }
                  s.lastPos = i.x;
                  s.lastTime = performance.now();
                }
              }
            }
          }
        },
        f = function (e) {
          if (e.touches != null && e.touches.length == 0) {
            var i = s.contentProvider.zoomScale;
            if (s.zoomDirty == true) {
              s.previewObject.contentProvider.zoomScale = l.limitAt(
                s.previewObject.contentProvider.zoomScale * s.lastScale,
                1,
                s.previewObject.contentProvider.maxZoom
              );
              s.previewObject.zoomValue =
                s.previewObject.contentProvider.zoomScale * 1;
              s.previewObject.resize();
              s.zoomDirty = false;
            }
            s.wrapper.css({ transform: "" });
            s.lastScale = null;
            s.startTouches = null;
          }
          s.isPanning = false;
          if (e.touches != null && e.touches.length > 1) return;
          if (s.skipDrag !== true) {
            var n = s.eventToPoint(e);
            if (s.dragPage) {
              e.preventDefault();
              s.dragPage.pendingPoint = n;
              if (
                n.x == s.startPoint.x &&
                n.y == s.startPoint.y &&
                n.isInside == true
              ) {
                if (s.corner == t.CORNERS.BR || s.corner == t.CORNERS.TR) {
                  c(n);
                  if (s.dragPage.isFlipping !== true) s.next();
                } else if (
                  s.corner == t.CORNERS.BL ||
                  s.corner == t.CORNERS.TL
                ) {
                  c(n);
                  if (s.dragPage.isFlipping !== true) s.prev();
                }
              } else if (s.dragPage.isFlipping !== true) {
                if (n.distance > n.fullWidth / 2) {
                  if (n.x > n.fullWidth / 2) s.prev();
                  else s.next();
                } else {
                  s.dragPage.animateToReset = true;
                  s.animatePage(s.dragPage);
                }
              }
              if (s.dragPage) {
                s.dragPage.pendingPoint = null;
                s.dragPage.magnetic = false;
              }
            } else {
            }
            s.drag = d.none;
          }
        },
        h = function (e) {
          var i = s.eventToPoint(e);
          var n = e.srcElement || e.originalTarget;
          if (s.dragPage && s.dragPage.magnetic) return;
          if (
            s.wrapper[0].contains(e.target) &&
            s.contentProvider.zoomScale == 1 &&
            i.x == s.startPoint.x &&
            i.y == s.startPoint.y &&
            i.isInsidePage &&
            s.startPoint.page == i.page &&
            !i.page.isFlipping &&
            n.nodeName !== "A"
          ) {
            if (s.startPoint.page.side == 0) {
              s.corner = t.CORNERS.TL;
              s.prev();
              s.startPoint.page = null;
            } else {
              s.corner = t.CORNERS.TR;
              s.next();
              s.startPoint.page = null;
            }
            s.isPanning = false;
          }
        },
        p = function (e) {
          if (
            e.touches != null &&
            e.touches.length == 2 &&
            s.startTouches == null
          ) {
            s.startTouches = l.getTouches(e);
            s.lastScale = 1;
          }
          if (
            (e.touches != null && e.touches.length > 1) ||
            (e.touches == null && e.button !== 0)
          )
            return;
          var i = s.eventToPoint(e);
          s.startPoint = i;
          s.left = s.left || 0;
          s.top = s.top || 0;
          s.isPanning = true;
          s.lastPos = i.x;
          s.lastTime = performance.now();
          if (s.skipDrag !== true) {
            if (i.isInside == true && !r(s)) {
              s.startPoint = i;
              s.drag = i.drag;
              s.dragPage = i.page;
              s.corner = i.corner;
              k(s.corner);
              o(s.dragPage);
              if (i.page.isHard) {
              } else {
                i.page.updatePoint(i, s);
              }
              if (i.page.name == "0") {
                s.shadow.css({
                  width: "50%",
                  left: s.direction == t.DIRECTION.RTL ? 0 : "50%",
                  transitionDelay: "",
                });
              } else if (i.page.name == Math.ceil(s.pageCount / 2) - 1) {
                s.shadow.css({
                  width: "50%",
                  left: s.direction == t.DIRECTION.RTL ? "50%" : 0,
                  transitionDelay: "",
                });
              }
            }
          }
        },
        g = function (e) {
          var t = 0;
          if (e.wheelDelta != null) {
            t = e.wheelDelta / 120;
          } else if (e.detail != null) {
            t = -e.detail / 3;
          }
          var i = s.contentProvider.zoomScale,
            n = s.contentProvider.maxZoom;
          if (t) {
            if ((t > 0 && i < n) || (t < 0 && i > 1)) {
              e.stopPropagation();
              e.preventDefault();
              var a = s.eventToPoint(e);
              var o = s.eventToPoint(e);
              var r = {
                x: s.container.width() / 2,
                y: -23 + s.container.height() / 2,
              };
              s.previewObject.zoom(t);
              var l = s.contentProvider.zoomScale;
              if (i !== l) {
                var c = l / i;
                if (l == 1) {
                  s.left = 0;
                  s.top = 0;
                } else {
                  s.left *= c;
                  s.top *= c;
                }
                var u = (a.raw.x - r.x) * c,
                  d = (a.raw.y - r.y) * c;
                o.raw.x = r.x + u;
                o.raw.y = r.y + d;
                s.startPoint = o;
                s.pan(a);
                var f = s.dragPage || a.page;
                if (
                  s.dragPage == null &&
                  f != null &&
                  a.isInside == true &&
                  f.magnetic == true
                ) {
                  f.pendingPoint = a;
                  f.animateToReset = true;
                  s.corner = f.magneticCorner;
                  s.animatePage(f);
                  f.pendingPoint = null;
                  f.magnetic = false;
                  f.magneticCorner = null;
                }
              }
            }
          }
        };
      var v = s.container[0];
      var m = s.stage[0];
      if (v) {
        m.addEventListener("mousemove", u, false);
        m.addEventListener("touchmove", u, false);
        m.addEventListener("mousedown", p, false);
        m.addEventListener("click", h, false);
        m.addEventListener("mouseup", f, false);
        m.addEventListener("touchend", f, false);
        m.addEventListener("touchstart", p, false);
        if (s.options.scrollWheel == true) {
          m.addEventListener("mousewheel", g, false);
          m.addEventListener("DOMMouseScroll", g, false);
        }
      }
      this.dispose = function () {
        m.removeEventListener("mousemove", u, false);
        m.removeEventListener("touchmove", u, false);
        m.removeEventListener("mousedown", p, false);
        m.removeEventListener("click", h, false);
        m.removeEventListener("mouseup", f, false);
        m.removeEventListener("touchend", f, false);
        m.removeEventListener("touchstart", p, false);
        if (s.options.scrollWheel == true) {
          m.removeEventListener("mousewheel", g, false);
          m.removeEventListener("DOMMouseScroll", g, false);
        }
        s.updatePageCallback = null;
        s.flipCallback = null;
        s.animateF = null;
        s.stage.remove();
      };
    }
    s.prototype = {
      add: function (e) {
        if (e instanceof K) this.container.append(i(e.element));
        else this.container.append(i(e));
      },
      pan: function (e) {
        var t = this.startPoint;
        var i = this.contentProvider.zoomScale;
        var n = this.left + (e.raw.x - t.raw.x),
          a = this.top + (e.raw.y - t.raw.y);
        this.left = Math.round(S(n, -this.shiftWidth, this.shiftWidth));
        this.top = Math.round(S(a, -this.shiftHeight, this.shiftHeight));
        if (i == 1) {
          this.left = 0;
          this.top = 0;
        }
        this.startPoint = e;
        this.stage.css({
          transform: "translate3d(" + this.left + "px," + this.top + "px,0)",
        });
      },
      getPageByNumber: function (e) {
        var t = A(this) ? (z(this) ? e + 1 : e) : Math.floor((e - 1) / 2);
        var i;
        for (var n = 0; n < this.pages.length; n++) {
          if (t == parseInt(this.pages[n].name, 10)) i = this.pages[n];
        }
        return i;
      },
      getPageSide: function (e) {
        var i = this.direction == t.DIRECTION.RTL;
        var n = this.getPageByNumber(e);
        if (n == null) return;
        if (A(this)) return i ? n.front : n.back;
        if (e % 2 == 0) return i ? n.back : n.front;
        else return i ? n.front : n.back;
      },
      getContentLayer: function (e) {
        var t = this.getPageSide(e);
        return t == null ? null : t.contentLayer;
      },
    };
    s.prototype.init = function (e) {
      var t = this;
      t.stage = i(h.div, { class: "df-book-stage" });
      t.wrapper = i(h.div, { class: "df-book-wrapper" });
      t.shadow = i(h.div, { class: "df-book-shadow" });
      t.container.append(t.stage);
      t.stage.append(t.wrapper);
      t.wrapper.append(t.shadow);
      t.createStack(e);
    };
    s.prototype.createStack = function (e) {
      var t = "red,green,blue,yellow,orange,black".split(",");
      for (var i = 0; i < this.stackCount; i++) {
        e.angles = [, this.stackCount - i];
        e.stiffness = (this.stackCount - i) / 100;
        var n = new K(e);
        n.angles[1] = 180;
        n.index = i;
        n.parent = this;
        n.textureReady = false;
        n.textureRequested = false;
        this.wrapper.append(n.element);
        n.isFlipping = false;
        this.pages.push(n);
        n.color = t[i];
      }
      this.children = this.pages;
    };
    s.prototype.isPageHard = function (e) {
      return l.isHardPage(this.hardConfig, e, this.pageCount, A(this));
    };
    s.prototype.setDuration = function (e) {
      this.duration = e;
    };
    s.prototype.moveBy = function (e) {
      var t = this._activePage + e;
      t = S(t, this.startPage, this.endPage);
      if (this.firstFlipped != true) {
        this.previewObject.analytics({
          eventAction: "First Page Flip",
          options: this.previewObject.options,
        });
        this.firstFlipped = true;
      }
      this.gotoPage(t);
    };
    s.prototype.next = function (e) {
      if (e == null)
        e = this.direction == t.DIRECTION.RTL ? -this.pageMode : this.pageMode;
      this.moveBy(e);
    };
    s.prototype.prev = function (e) {
      if (e == null)
        e = this.direction == t.DIRECTION.RTL ? this.pageMode : -this.pageMode;
      this.moveBy(e);
    };
    s.prototype.eventToPoint = function (e) {
      e = D(e);
      var n = this.wrapper,
        a = this.pages,
        o = this.pageWidth,
        r = this.fullWidth,
        s = this.height,
        l = i(window),
        c = { x: e.clientX, y: e.clientY };
      var u = c.x - n[0].getBoundingClientRect().left;
      var f = c.y - n[0].getBoundingClientRect().top;
      c.x = c.x - this.container[0].getBoundingClientRect().left;
      c.y = c.y - this.container[0].getBoundingClientRect().top;
      var h =
        this.drag == d.none
          ? u < o
            ? u
            : r - u
          : this.drag == d.left
          ? u
          : r - u;
      var p = u < o ? a[this.stackCount / 2 - 1] : a[this.stackCount / 2];
      var g =
        u < this.foldSense ? d.left : u > r - this.foldSense ? d.right : d.none;
      var v = u,
        m = f,
        b = s,
        w = r,
        x = this.foldSense,
        P = t.CORNERS,
        y;
      if (v >= 0 && v < x) {
        if (m >= 0 && m <= x) y = P.TL;
        else if (m >= b - x && m <= b) y = P.BL;
        else if (m > x && m < b - x) y = P.L;
        else y = P.NONE;
      } else if (v >= w - x && v <= w) {
        if (m >= 0 && m <= x) y = P.TR;
        else if (m >= b - x && m <= b) y = P.BR;
        else if (m > x && m < b - x) y = P.R;
        else y = P.NONE;
      } else y = P.NONE;
      return {
        isInsidePage: v >= 0 && v <= w && m >= 0 && m <= b,
        isInside: y !== P.NONE && y !== P.L && y !== P.R,
        x: u,
        y: f,
        fullWidth: r,
        rawDistance: r - u,
        distance: h,
        page: p,
        drag: g,
        foldSense: this.foldSense,
        event: e,
        raw: c,
        corner: y,
      };
    };
    s.prototype.gotoPage = function (e) {
      e = parseInt(e, 10);
      this._activePage = e;
      if (this.autoPlay == true) {
        this.previewObject.setAutoPlay(this.autoPlay);
      }
      this.updatePage(e);
      if (this && this.thumblist && this.thumblist.review)
        this.thumblist.review();
    };
    s.prototype.refresh = function () {
      this.updatePage(this._activePage);
      if (this.flipCallback != null) this.flipCallback();
    };
    s.prototype.updatePage = function (e) {
      var a = this.direction == t.DIRECTION.RTL,
        o = A(this),
        r = F(e);
      var s = o ? 1 : 2;
      e = Math.floor(e / s);
      if (a) e = Math.ceil(this.pageCount / s) - e;
      var l = this.oldBaseNumber || 0;
      var c = this.pageCount / s;
      var u = this.stackCount;
      var f = Math.floor(u / 2);
      if (l > e) {
        this.children[u - 1].skipFlip = true;
        this.children.unshift(this.children.pop());
      } else if (l < e) {
        this.children[0].skipFlip = true;
        this.children.push(this.children.shift());
      }
      for (var h = 0; h < u; h++) {
        var p = this.children[h];
        if (l !== e) {
          if (p.currentTween != null) {
            p.clearTween(true);
          }
        }
        var g = p.side;
        var v;
        var m = e - f + h;
        if (a)
          m = o ? this.pageCount - m : Math.ceil(this.pageCount / 2) - m - 1;
        var b = p.name;
        p.isHard = this.isPageHard(m);
        if (p.isHard) {
          p.element.addClass("df-hard-page");
        } else {
          p.element.removeClass("df-hard-page");
          p.front.css({ display: "block" });
          p.back.css({ display: "block" });
        }
        if (m == 0 || m == c) {
          p.element.addClass("df-cover-page");
        } else {
          p.element.removeClass("df-cover-page");
        }
        var w = i(p.element).attr("pageNumber");
        if (w != m) {
          p.front.contentLayer.empty();
          p.back.contentLayer.empty();
        }
        i(p.element).attr("pageNumber", m);
        p.isEdge = false;
        if (h == 0) {
        } else if (h == u - 1) {
        } else {
          p.isEdge = false;
        }
        if (h < f) {
          v = d.left;
        } else {
          v = d.right;
        }
        if (p.isFlipping == false) {
          if (v !== g && p.skipFlip == false) {
            this.animatePage(p);
            if (this.preFlipCallback != null) this.preFlipCallback();
          } else {
            p.skipFlip = false;
            p.element.removeClass(
              "df-flipping df-quick-turn df-folding df-left-side df-right-side"
            );
            p.element.addClass(h < f ? "df-left-side" : "df-right-side");
            p.side = v;
          }
        }
        p.visible = o
          ? a
            ? h < f || p.isFlipping
            : h >= f || p.isFlipping
          : (m >= 0 && m < c) || (o && m == c);
        if (this.requestPage != null && p.visible == true) {
          p.name = m.toString();
          if (p.name != b) {
            p.backTextureLoaded = false;
            p.frontTextureLoaded = false;
            p.backPageStamp = "-1";
            p.frontPageStamp = "-1";
            p.thumbLoaded = false;
            p.front.contentLayer.html("");
            p.back.contentLayer.html("");
            p.frontImage(n.textureLoadFallback);
            p.backImage(n.textureLoadFallback);
            this.requestPage();
          }
        }
        p.oldDepth = p.depth;
        p.updateCSS({
          display: p.visible == true ? "block" : "none",
          zIndex: 6 + (h < f ? h - f : f - h),
          transform: "",
        });
        if (p.pendingPoint == null && p.isFlipping == false) {
          p.resetCSS();
        }
      }
      if (TWEEN.getAll().length == 0) {
        clearInterval(this.animate);
      }
      i(".quick-hint").html(e);
      this.oldBaseNumber = e;
      if (this.updatePageCallback) this.updatePageCallback();
    };
    s.prototype.animatePage = function (e) {
      e.element.addClass("df-flipping");
      e.isFlipping = true;
      if (this.animate != null) {
        clearInterval(this.animate);
      }
      this.animate = setInterval(this.animateF, 30);
      e.tween(e.pendingPoint);
    };
    return s;
  })({});
  var Q = (function (e) {
    H(a, e);
    function a(n, a, o) {
      e.call(this, o);
      var r = this;
      r.type = "FlipBook";
      r.container = n;
      r.options = o;
      r.options.source = a;
      r.contentSource = a;
      if (o.height != null && o.height.toString().indexOf("%") < 0) {
        r.container.height(Math.min(o.height, i(window).height()));
      } else {
        r.container.height(o.height);
      }
      if (r.options.isLightBox) {
        window.dfLightBox.closeButton.addClass(r.options.icons["close"]);
      }
      if (r.options.pageSize == t.PAGE_SIZE.DOUBLEINTERNAL) {
        if (
          Array === r.contentSource.constructor ||
          Array.isArray(r.contentSource) ||
          r.contentSource instanceof Array
        ) {
          r.options.singlePageMode = t.SINGLE_PAGE_MODE.ZOOM;
        }
        r.container.addClass("df-double-internal");
      }
      if (!r.options.isLightBox && r.container.attr("id") != null) {
        r.options.id = r.container.attr("id");
      }
      if (r.options.parsed !== true && r.options.links != null) {
        t.parseLinks(r.options.links);
      }
      var l = (r.webgl = o.webgl == true && j == true);
      n.addClass(
        "df-container df-loading df-init df-floating" +
          " df-controls-" +
          r.options.controlsPosition
      );
      if (r.options.transparent == true) {
        n.addClass("df-transparent");
      }
      if (r.options.direction == t.DIRECTION.RTL) {
        n.addClass("df-rtl");
      }
      r.container.info = i(h.div, { class: "loading-info" })
        .appendTo(r.container)
        .html(r.options.text.loading + "...");
      if (
        s.indexOf("MSIE") !== -1 ||
        navigator.appVersion.indexOf("Trident/") > 0 ||
        (_ && !U)
      ) {
        r.options.webgl = false;
      }
      if (!!s.match(/msie\s[5-9]/i)) {
        r.container.info
          .html(
            "Your browser (Internet Explorer) is out of date to run Flip Flipbook Plugin. <br><a href='http://browsehappy.com/'>Upgrade to a new one</a>"
          )
          .addClass("df-old-browser");
        n.removeClass("df-loading");
        return r;
      }
      var c =
        o.backgroundImage == null || o.backgroundImage == ""
          ? ""
          : "url('" + o.backgroundImage + "')";
      r.container.css({
        position: "relative",
        overflow: "hidden",
        backgroundColor: o.backgroundColor,
        backgroundImage: c,
      });
      if (r.options.isLightBox == true) {
        r.analytics({ eventAction: "Open Book", options: r.options });
      }
      r.init(l, a);
      if (r.options.onCreate != null) r.options.onCreate(r);
      return r;
    }
    a.prototype.init = function (e) {
      var a = this;
      var o = a.target;
      var r = a.options;
      if (e == true) {
        var s = function (e) {
          var i = function () {
            MOCKUP.defaults.anisotropy = 0;
            MOCKUP.defaults.groundTexture = "blank";
            THREE.skipPowerOfTwo = true;
            q();
            if (e != null) e();
          };
          if (window.MOCKUP == null) {
            a.updateInfo(r.text.loading + " WEBGL 3D ...");
            if (
              typeof define === "function" &&
              define.amd &&
              window.requirejs
            ) {
              requirejs.config({
                paths: { three: n.threejsSrc.replace(".js", "") },
                shim: { three: { exports: "THREE" } },
              });
              require(["three"], function (e) {
                window.THREE = e;
                M(n.mockupjsSrc + "?ver=" + t.version, function () {
                  i();
                });
                return e;
              });
            } else if (typeof define === "function" && define.amd) {
              require(["three", n.threejsSrc.replace(".js", "")], function (
                e,
                t
              ) {
                e(function () {});
              });
            } else {
              M(n.threejsSrc + "?ver=" + t.version, function () {
                M(n.mockupjsSrc + "?ver=" + t.version, function () {
                  i();
                });
              });
            }
          } else {
            i();
          }
        };
        s(function () {
          a.container.css({ minHeight: 300, minWidth: 300 });
          a.stage = new G(R(a.options, { container: a.container }));
          a.stage.previewObject = a;
          a.contentProvider = new Y(
            a.contentSource,
            function (n) {
              var r = {
                pageCount: n.pageCount,
                stackCount: 6,
                segments: 20,
                width: n.bookSize.width,
                height: n.bookSize.height,
              };
              a.target =
                o =
                a.stage.target =
                  new MOCKUP.Book(R(a.options, r), a.stage);
              a.extendtarget();
              V(a.container, a);
              o.ui = a.ui;
              o.container = a.container;
              n.webgl = e;
              n.setTarget(a.target);
              o.getContentLayer = function (e) {
                var i = o.direction == t.DIRECTION.RTL,
                  n = a.stage.cssScene.divLeft.element,
                  r = a.stage.cssScene.divRight.element;
                var s = F(o._activePage);
                if (A(o)) return i ? n : r;
                if (e % 2 == 0) return i ? r : n;
                else return i ? n : r;
              };
              o.stage = a.stage;
              o.flipCallback = function () {
                if (a.contentProvider) {
                  a.contentProvider.review("flipCallback");
                  var e = F(o._activePage);
                  var n, r;
                  var s = o.getPageByNumber(e),
                    l = o.getPageByNumber(e + 1);
                  var c = o.parent.cssScene.divLeft,
                    u = o.parent.cssScene.divRight;
                  var d = o.pageMode == t.PAGE_MODE.SINGLE;
                  var f = o.direction == t.DIRECTION.RTL;
                  if (s != null && c != null) {
                    n = Math.abs(
                      s.geometry.boundingBox.max.x -
                        s.geometry.boundingBox.min.x
                    );
                    r = Math.abs(
                      s.geometry.boundingBox.max.z -
                        s.geometry.boundingBox.min.z
                    );
                    c.rotation.y = -Math.atan2(r, n) * 0.9;
                    c.position.z = r * 0.8;
                    c.position.x = r / 2.5;
                    i(c.element).css({ width: n, left: -n / 2 });
                  }
                  if (l != null && u != null) {
                    n = Math.abs(
                      l.geometry.boundingBox.max.x -
                        l.geometry.boundingBox.min.x
                    );
                    r = Math.abs(
                      l.geometry.boundingBox.max.z -
                        l.geometry.boundingBox.min.z
                    );
                    u.rotation.y = Math.atan2(r, n) * 0.9;
                    u.position.z = r * 0.8;
                    u.position.x = -r / 2.5;
                    i(u.element).css({ width: n, left: n / 2 });
                  }
                  if (a.options.onFlip != null) a.options.onFlip(a);
                }
              };
              o.resize = (function () {
                a.resize();
              })();
              o.updatePageCallback = function () {
                a.ui.update();
                a.checkCenter();
                a.stage.renderRequestPending = true;
              };
              var s = i(a.stage.cssScene.divLeft.element);
              var l = i(a.stage.cssScene.divRight.element);
              o.preFlipCallback = function () {
                s.empty();
                l.empty();
                if (a.options.beforeFlip != null) a.options.beforeFlip(a);
                a.playSound();
              };
              i(window).trigger("resize");
              s.css({
                width: n.bookSize.width,
                height: n.bookSize.height,
                left: -n.bookSize.width / 2,
              });
              l.css({
                width: n.bookSize.width,
                height: n.bookSize.height,
                left: n.bookSize.width / 2,
              });
              o.ease = TWEEN.Easing.Cubic.InOut;
              o.contentProvider = n;
              o.duration = a.options.duration;
              o.gotoPage(o._activePage);
              o.flipCallback();
              if (a.options.isLightBox == true) {
                a.analytics({ eventAction: "Book Ready", options: a.options });
              }
              if (a.options.onReady != null) a.options.onReady(a);
            },
            r,
            a
          );
        });
      } else {
        a.contentProvider = new Y(
          a.contentSource,
          function (t) {
            var n = {
              pageCount: t.pageCount,
              contentSourceType: t.contentSourceType,
            };
            a.target = o = new X(R(a.options, n), a.container);
            a.target.previewObject = a;
            a.extendtarget();
            V(a.container, a);
            t.webgl = e;
            t.setTarget(a.target);
            t.waitPeriod = 2;
            o.ease = TWEEN.Easing.Quadratic.InOut;
            o.duration = a.options.duration;
            o.container = a.container;
            o.updatePageCallback = function () {
              a.ui.update();
              a.checkCenter();
            };
            o.resize = (function () {
              a.resize();
            })();
            i(window).trigger("resize");
            o.flipCallback = function () {
              if (a.contentProvider) {
                a.contentProvider.review("flipCallback");
                if (a.options.onFlip != null) a.options.onFlip(a);
              }
            };
            o.preFlipCallback = function () {
              if (a.options.beforeFlip != null) a.options.beforeFlip(a);
              a.playSound();
            };
            o.gotoPage(o._activePage);
            o.flipCallback();
            if (a.options.onReady != null) a.options.onReady(a);
            a.analytics({ eventAction: "Book Ready", options: a.options });
          },
          r,
          a
        );
      }
    };
    a.prototype.extendtarget = function () {
      var e = this;
      e.target.previewObject = e;
      e.target.reset = function () {
        for (var t = 0; t < e.target.children.length; t++) {
          var i = e.target.children[t];
          i.skipFlip = true;
          i.name = "-2";
        }
        e.contentProvider.annotedPage = "-2";
        e.target.refresh();
      };
    };
    a.prototype.getURLHash = function () {
      if (this.options.id != null) {
        var e =
          l.getSharePrefix() +
          (this.options.slug != null ? this.options.slug : this.options.id) +
          "/";
        if (this.target != null && this.target._activePage != null) {
          e += this.target._activePage + "/";
        }
        window.location.hash = e;
      }
      return window.location.href;
    };
    a.prototype.end = function () {
      this.target.gotoPage(this.target.endPage);
    };
    a.prototype.gotoPage = function (e) {
      this.target.gotoPage(e);
      if (this.ui != null) this.ui.update();
    };
    a.prototype.prev = function () {
      this.target.prev();
    };
    a.prototype.next = function () {
      this.target.next();
    };
    a.prototype.updateInfo = function (e) {
      if (this.container && this.container.info && this.container.info.html)
        this.container.info.html(e);
    };
    a.prototype.analytics = function (e) {
      if (this.options.enableAnalytics == true) {
        try {
          var t = e.options,
            i = undefined;
          if (t) {
            i = t.bookTitle || t.slug || t.id;
          }
          var n = window.gtag;
          if (n) {
            n("event", e.eventAction, {
              event_category: "Flipbook",
              event_label: i,
            });
          } else {
            var a = window.ga || window.__gaTracker;
            a("send", {
              hitType: "event",
              eventCategory: "Flipbook",
              eventAction: e.eventAction,
              eventLabel: i,
            });
          }
        } catch (e) {}
      }
    };
    return a;
  })(Z);
  i.fn.extend({
    shelf: function () {},
    flipBook: function (e, t) {
      return new Q(i(this), e, W(t));
    },
  });
})(FLIP, jQuery);
(function (e) {
  "use strict";
  e.URL = e.URL || e.webkitURL;
  if (e.Blob && e.URL) {
    try {
      new Blob();
      return;
    } catch (e) {}
  }
  var t =
    e.BlobBuilder ||
    e.WebKitBlobBuilder ||
    e.MozBlobBuilder ||
    (function (e) {
      var t = function (e) {
          return Object.prototype.toString
            .call(e)
            .match(/^\[object\s(.*)\]$/)[1];
        },
        i = function e() {
          this.data = [];
        },
        n = function e(t, i, n) {
          this.data = t;
          this.size = t.length;
          this.type = i;
          this.encoding = n;
        },
        a = i.prototype,
        o = n.prototype,
        r = e.FileReaderSync,
        s = function (e) {
          this.code = this[(this.name = e)];
        },
        l = (
          "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR " +
          "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR"
        ).split(" "),
        c = l.length,
        u = e.URL || e.webkitURL || e,
        d = u.createObjectURL,
        f = u.revokeObjectURL,
        h = u,
        p = e.btoa,
        g = e.atob,
        v = e.ArrayBuffer,
        m = e.Uint8Array,
        b = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;
      n.fake = o.fake = true;
      while (c--) {
        s.prototype[l[c]] = c + 1;
      }
      if (!u.createObjectURL) {
        h = e.URL = function (e) {
          var t = document.createElementNS("http://www.w3.org/1999/xhtml", "a"),
            i;
          t.href = e;
          if (!("origin" in t)) {
            if (t.protocol.toLowerCase() === "data:") {
              t.origin = null;
            } else {
              i = e.match(b);
              t.origin = i && i[1];
            }
          }
          return t;
        };
      }
      h.createObjectURL = function (e) {
        var t = e.type,
          i;
        if (t === null) {
          t = "application/octet-stream";
        }
        if (e instanceof n) {
          i = "data:" + t;
          if (e.encoding === "base64") {
            return i + ";base64," + e.data;
          } else if (e.encoding === "URI") {
            return i + "," + decodeURIComponent(e.data);
          }
          if (p) {
            return i + ";base64," + p(e.data);
          } else {
            return i + "," + encodeURIComponent(e.data);
          }
        } else if (d) {
          return d.call(u, e);
        }
      };
      h.revokeObjectURL = function (e) {
        if (e.substring(0, 5) !== "data:" && f) {
          f.call(u, e);
        }
      };
      a.append = function (e) {
        var i = this.data;
        if (m && (e instanceof v || e instanceof m)) {
          var a = "",
            o = new m(e),
            l = 0,
            c = o.length;
          for (; l < c; l++) {
            a += String.fromCharCode(o[l]);
          }
          i.push(a);
        } else if (t(e) === "Blob" || t(e) === "File") {
          if (r) {
            var u = new r();
            i.push(u.readAsBinaryString(e));
          } else {
            throw new s("NOT_READABLE_ERR");
          }
        } else if (e instanceof n) {
          if (e.encoding === "base64" && g) {
            i.push(g(e.data));
          } else if (e.encoding === "URI") {
            i.push(decodeURIComponent(e.data));
          } else if (e.encoding === "raw") {
            i.push(e.data);
          }
        } else {
          if (typeof e !== "string") {
            e += "";
          }
          i.push(unescape(encodeURIComponent(e)));
        }
      };
      a.getBlob = function (e) {
        if (!arguments.length) {
          e = null;
        }
        return new n(this.data.join(""), e, "raw");
      };
      a.toString = function () {
        return "[object BlobBuilder]";
      };
      o.slice = function (e, t, i) {
        var a = arguments.length;
        if (a < 3) {
          i = null;
        }
        return new n(
          this.data.slice(e, a > 1 ? t : this.data.length),
          i,
          this.encoding
        );
      };
      o.toString = function () {
        return "[object Blob]";
      };
      o.close = function () {
        this.size = 0;
        delete this.data;
      };
      return i;
    })(e);
  e.Blob = function (e, i) {
    var n = i ? i.type || "" : "";
    var a = new t();
    if (e) {
      for (var o = 0, r = e.length; o < r; o++) {
        if (Uint8Array && e[o] instanceof Uint8Array) {
          a.append(e[o].buffer);
        } else {
          a.append(e[o]);
        }
      }
    }
    var s = a.getBlob(n);
    if (!s.slice && s.webkitSlice) {
      s.slice = s.webkitSlice;
    }
    return s;
  };
  var i =
    Object.getPrototypeOf ||
    function (e) {
      return e.__proto__;
    };
  e.Blob.prototype = i(new e.Blob());
})(window);
(function (e) {
  "use strict";
  var t = e.Uint8Array,
    i = e.HTMLCanvasElement,
    n = i && i.prototype,
    a = /\s*;\s*base64\s*(?:;|$)/i,
    o = "toDataURL",
    r,
    s = function (e) {
      var i = e.length,
        n = new t(((i / 4) * 3) | 0),
        a = 0,
        o = 0,
        s = [0, 0],
        l = 0,
        c = 0,
        u,
        d;
      while (i--) {
        d = e.charCodeAt(a++);
        u = r[d - 43];
        if (u !== 255 && u != null) {
          s[1] = s[0];
          s[0] = d;
          c = (c << 6) | u;
          l++;
          if (l === 4) {
            n[o++] = c >>> 16;
            if (s[1] !== 61) {
              n[o++] = c >>> 8;
            }
            if (s[0] !== 61) {
              n[o++] = c;
            }
            l = 0;
          }
        }
      }
      return n;
    };
  if (t) {
    r = new t([
      62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0,
      -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
      18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
      48, 49, 50, 51,
    ]);
  }
  if (i && !n.toBlob) {
    n.toBlob = function (e, i) {
      if (!i) {
        i = "image/png";
      }
      if (this.mozGetAsFile) {
        e(this.mozGetAsFile("canvas", i));
        return;
      }
      if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(i)) {
        e(this.msToBlob());
        return;
      }
      var n = Array.prototype.slice.call(arguments, 1),
        r = this[o].apply(this, n),
        l = r.indexOf(","),
        c = r.substring(l + 1),
        u = a.test(r.substring(0, l)),
        d;
      if (Blob.fake) {
        d = new Blob();
        if (u) {
          d.encoding = "base64";
        } else {
          d.encoding = "URI";
        }
        d.data = c;
        d.size = c.length;
      } else if (t) {
        if (u) {
          d = new Blob([s(c)], { type: i });
        } else {
          d = new Blob([decodeURIComponent(c)], { type: i });
        }
      }
      e(d);
    };
    if (n.toDataURLHD) {
      n.toBlobHD = function () {
        o = "toDataURLHD";
        var e = this.toBlob();
        o = "toDataURL";
        return e;
      };
    } else {
      n.toBlobHD = n.toBlob;
    }
  }
})(window);
(function e() {
  if ("performance" in window === false) {
    window.performance = {};
  }
  Date.now =
    Date.now ||
    function () {
      return new Date().getTime();
    };
  if ("now" in window.performance === false) {
    var t =
      window.performance.timing && window.performance.timing.navigationStart
        ? window.performance.timing.navigationStart
        : Date.now();
    window.performance.now = function () {
      return Date.now() - t;
    };
  }
})();
(function e() {
  var t =
    t ||
    (function () {
      var e = [];
      return {
        getAll: function () {
          return e;
        },
        removeAll: function () {
          e = [];
        },
        add: function (t) {
          e.push(t);
        },
        remove: function (t) {
          var i = e.indexOf(t);
          if (i !== -1) {
            e.splice(i, 1);
          }
        },
        update: function (t) {
          if (e.length === 0) {
            return false;
          }
          var i = 0;
          t = t != null ? t : window.performance.now();
          while (i < e.length) {
            if (e[i].update(t)) {
              i++;
            } else {
              e.splice(i, 1);
            }
          }
          return true;
        },
      };
    })();
  t.Tween = function (e) {
    var i = e;
    var n = {};
    var a = {};
    var o = {};
    var r = 1e3;
    var s = 0;
    var l = false;
    var c = false;
    var u = false;
    var d = 0;
    var f = null;
    var h = t.Easing.Linear.None;
    var p = t.Interpolation.Linear;
    var g = [];
    var v = null;
    var m = false;
    var b = null;
    var w = null;
    var x = null;
    for (var P in e) {
      n[P] = parseFloat(e[P], 10);
    }
    this.to = function (e, t) {
      if (t != null) {
        r = t;
      }
      a = e;
      return this;
    };
    this.start = function (e) {
      t.add(this);
      c = true;
      m = false;
      f = e != null ? e : window.performance.now();
      f += d;
      for (var r in a) {
        if (a[r] instanceof Array) {
          if (a[r].length === 0) {
            continue;
          }
          a[r] = [i[r]].concat(a[r]);
        }
        if (n[r] === null) {
          continue;
        }
        n[r] = i[r];
        if (n[r] instanceof Array === false) {
          n[r] *= 1;
        }
        o[r] = n[r] || 0;
      }
      return this;
    };
    this.stop = function () {
      if (!c) {
        return this;
      }
      t.remove(this);
      c = false;
      if (x !== null) {
        x.call(i);
      }
      this.stopChainedTweens();
      return this;
    };
    this.stopChainedTweens = function () {
      for (var e = 0, t = g.length; e < t; e++) {
        g[e].stop();
      }
    };
    this.complete = function () {
      if (!c) {
        return this;
      }
      t.remove(this);
      c = false;
      if (w !== null) {
        w.call(i);
      }
      this.completeChainedTweens();
      return this;
    };
    this.completeChainedTweens = function () {
      for (var e = 0, t = g.length; e < t; e++) {
        g[e].complete();
      }
    };
    this.delay = function (e) {
      d = e;
      return this;
    };
    this.repeat = function (e) {
      s = e;
      return this;
    };
    this.yoyo = function (e) {
      l = e;
      return this;
    };
    this.easing = function (e) {
      h = e == null ? h : e;
      return this;
    };
    this.interpolation = function (e) {
      p = e;
      return this;
    };
    this.chain = function () {
      g = arguments;
      return this;
    };
    this.onStart = function (e) {
      v = e;
      return this;
    };
    this.onUpdate = function (e) {
      b = e;
      return this;
    };
    this.onComplete = function (e) {
      w = e;
      return this;
    };
    this.onStop = function (e) {
      x = e;
      return this;
    };
    this.update = function (e) {
      var t;
      var c;
      var x;
      if (e < f) {
        return true;
      }
      if (m === false) {
        if (v !== null) {
          v.call(i);
        }
        m = true;
      }
      c = (e - f) / r;
      c = c > 1 ? 1 : c;
      x = h(c);
      for (t in a) {
        if (n[t] === null) {
          continue;
        }
        var P = n[t] || 0;
        var y = a[t];
        if (y instanceof Array) {
          i[t] = p(y, x);
        } else {
          if (typeof y === "string") {
            if (y.startsWith("+") || y.startsWith("-")) {
              y = P + parseFloat(y, 10);
            } else {
              y = parseFloat(y, 10);
            }
          }
          if (typeof y === "number") {
            i[t] = P + (y - P) * x;
          }
        }
      }
      if (b !== null) {
        b.call(i, x);
      }
      if (c === 1) {
        if (s > 0) {
          if (isFinite(s)) {
            s--;
          }
          for (t in o) {
            if (typeof a[t] === "string") {
              o[t] = o[t] + parseFloat(a[t], 10);
            }
            if (l) {
              var C = o[t];
              o[t] = a[t];
              a[t] = C;
            }
            n[t] = o[t];
          }
          if (l) {
            u = !u;
          }
          f = e + d;
          return true;
        } else {
          if (w !== null) {
            w.call(i);
          }
          for (var L = 0, S = g.length; L < S; L++) {
            g[L].start(f + r);
          }
          return false;
        }
      }
      return true;
    };
  };
  t.Easing = {
    Linear: {
      None: function (e) {
        return e;
      },
    },
    Quadratic: {
      In: function (e) {
        return e * e;
      },
      Out: function (e) {
        return e * (2 - e);
      },
      InOut: function (e) {
        if ((e *= 2) < 1) {
          return 0.5 * e * e;
        }
        return -0.5 * (--e * (e - 2) - 1);
      },
    },
    Quartic: {
      In: function (e) {
        return e * e * e * e;
      },
      Out: function (e) {
        return 1 - --e * e * e * e;
      },
      InOut: function (e) {
        if ((e *= 2) < 1) {
          return 0.5 * e * e * e * e;
        }
        return -0.5 * ((e -= 2) * e * e * e - 2);
      },
    },
    Sinusoidal: {
      In: function (e) {
        return 1 - Math.cos((e * Math.PI) / 2);
      },
      Out: function (e) {
        return Math.sin((e * Math.PI) / 2);
      },
      InOut: function (e) {
        return 0.5 * (1 - Math.cos(Math.PI * e));
      },
    },
    Cubic: {
      In: function (e) {
        return e * e * e;
      },
      Out: function (e) {
        return --e * e * e + 1;
      },
      InOut: function (e) {
        if ((e *= 2) < 1) {
          return 0.5 * e * e * e;
        }
        return 0.5 * ((e -= 2) * e * e + 2);
      },
    },
  };
  t.Interpolation = {
    Linear: function (e, i) {
      var n = e.length - 1;
      var a = n * i;
      var o = Math.floor(a);
      var r = t.Interpolation.Utils.Linear;
      if (i < 0) {
        return r(e[0], e[1], a);
      }
      if (i > 1) {
        return r(e[n], e[n - 1], n - a);
      }
      return r(e[o], e[o + 1 > n ? n : o + 1], a - o);
    },
    Bezier: function (e, i) {
      var n = 0;
      var a = e.length - 1;
      var o = Math.pow;
      var r = t.Interpolation.Utils.Bernstein;
      for (var s = 0; s <= a; s++) {
        n += o(1 - i, a - s) * o(i, s) * e[s] * r(a, s);
      }
      return n;
    },
    Utils: {
      Linear: function (e, t, i) {
        return (t - e) * i + e;
      },
      Bernstein: function (e, i) {
        var n = t.Interpolation.Utils.Factorial;
        return n(e) / n(i) / n(e - i);
      },
      Factorial: (function () {
        var e = [1];
        return function (t) {
          var i = 1;
          if (e[t]) {
            return e[t];
          }
          for (var n = t; n > 1; n--) {
            i *= n;
          }
          e[t] = i;
          return i;
        };
      })(),
      CatmullRom: function (e, t, i, n, a) {
        var o = (i - e) * 0.5;
        var r = (n - t) * 0.5;
        var s = a * a;
        var l = a * s;
        return (
          (2 * t - 2 * i + o + r) * l +
          (-3 * t + 3 * i - 2 * o - r) * s +
          o * a +
          t
        );
      },
    },
  };
  window.TWEEN = t;
})();
FLIP.createBlob = function e(t, i) {
  if (typeof Blob !== "undefined") {
    return new Blob([t], { type: i });
  }
  var n = new MozBlobBuilder();
  n.append(t);
  return n.getBlob(i);
};
FLIP.createObjectURL = (function e() {
  var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  return function e(i, n) {
    if (typeof URL !== "undefined" && URL.createObjectURL) {
      var a = FLIP.createBlob(i, n);
      return URL.createObjectURL(a);
    }
    var o = "data:" + n + ";base64,";
    for (var r = 0, s = i.length; r < s; r += 3) {
      var l = i[r] & 255;
      var c = i[r + 1] & 255;
      var u = i[r + 2] & 255;
      var d = l >> 2,
        f = ((l & 3) << 4) | (c >> 4);
      var h = r + 1 < s ? ((c & 15) << 2) | (u >> 6) : 64;
      var p = r + 2 < s ? u & 63 : 64;
      o += t[d] + t[f] + t[h] + t[p];
    }
    return o;
  };
})();
var ThumbList = (function e() {
  function t(e) {
    var i = (e && e.w + "px") || "100%";
    var n = (e && e.h + "px") || "100%";
    var a = (this.itemHeight = e.itemHeight);
    this.items = e.items;
    this.generatorFn = e.generatorFn;
    this.totalRows = e.totalRows || (e.items && e.items.length);
    this.addFn = e.addFn;
    this.scrollFn = e.scrollFn;
    var o = t.createScroller(a * this.totalRows);
    this.container = t.createContainer(i, n);
    this.container.appendChild(o);
    this.screenItemsLen = Math.ceil(e.h / a);
    this.offsetItems = this.screenItemsLen;
    this.cachedItemsLen = this.screenItemsLen + this.offsetItems * 2;
    this._renderChunk(this.container, 0);
    var r = this;
    r.lastRepaintY = 0;
    var s = this.screenItemsLen * a;
    var l = 0;
    var c;
    function u(e) {
      var t = e.target.scrollTop;
      if (
        !r.lastRepaintY ||
        Math.abs(t - r.lastRepaintY) >= r.offsetItems * r.itemHeight
      ) {
        var i = parseInt(t / a, 10) - r.offsetItems;
        r._renderChunk(r.container, i < 0 ? 0 : i);
        r.lastRepaintY = t;
      }
      r.lastScrolled = l = Date.now();
      if (r.scrollFn != null) {
        r.scrollFn();
      }
      e.preventDefault && e.preventDefault();
    }
    r.dispose = function () {
      if (r.container) {
        if (r.container.parentNode) {
          r.container.parentNode.removeChild(r.container);
        }
      }
      r.container.removeEventListener("scroll", u);
    };
    r.container.addEventListener("scroll", u);
  }
  t.prototype.reset = function (e) {
    this.screenItemsLen = Math.ceil(e / this.itemHeight);
    this.cachedItemsLen = this.screenItemsLen + this.offsetItems * 2;
    var t =
      parseInt(this.lastRepaintY / this.itemHeight, 10) - this.offsetItems;
    this.needReset = true;
    this._renderChunk(this.container, Math.max(t, 0));
  };
  t.prototype.createRow = function (e) {
    var t;
    if (this.generatorFn) {
      t = this.generatorFn(e);
      t.classList.add("df-vrow");
      t.style.position = "absolute";
      t.style.top = e * this.itemHeight + "px";
      t.setAttribute("index", e);
    }
    return t;
  };
  t.prototype._renderChunk = function (e, t) {
    var i = this.range == null;
    this.range = this.range || { min: 0, max: this.cachedItemsLen };
    var n = this.range;
    var a = n.min,
      o = n.max;
    var r = i ? true : t >= a;
    if (!i && t == a && this.needReset == false) return;
    var s;
    var l = i ? a : r ? o : t;
    l = l > this.totalRows ? this.totalRows : l < 0 ? 0 : l;
    var c = t + this.cachedItemsLen;
    c = c > this.totalRows ? this.totalRows : c;
    for (s = l; s < c; s++) {
      if (r) e.appendChild(this.createRow(s));
      else e.insertBefore(this.createRow(s), e.childNodes[1 + s - l]);
      if (this.addFn != null) {
        this.addFn(s);
      }
    }
    var u = Math.abs(t - a);
    this.needReset = false;
    if (!i && e.childNodes.length > this.cachedItemsLen + 1) {
      var d = r ? 1 : 1 + this.cachedItemsLen,
        f = d + (c - l);
      for (var h = f; h > d; h--) {
        if (e.childNodes[d]) this.container.removeChild(e.childNodes[d]);
      }
    }
    this.range.min = t;
    this.range.max = c;
  };
  t.createContainer = function (e, t) {
    var i = document.createElement("div");
    i.style.width = e;
    i.style.height = t;
    i.style.overflow = "auto";
    i.style.position = "relative";
    i.style.padding = 0;
    return i;
  };
  t.createScroller = function (e) {
    var t = document.createElement("div");
    t.style.opacity = 0;
    t.style.position = "absolute";
    t.style.top = 0;
    t.style.left = 0;
    t.style.width = "1px";
    t.style.height = e + "px";
    return t;
  };
  return t;
})();
var BookMarkViewer = (function e() {
  function t(e) {
    this.outline = null;
    this.lastToggleIsShow = true;
    this.container = e.container;
    this.linkService = e.linkService;
    this.outlineItemClass = e.outlineItemClass || "outlineItem";
    this.outlineToggleClass = e.outlineToggleClass || "outlineItemToggler";
    this.outlineToggleHiddenClass =
      e.outlineToggleHiddenClass || "outlineItemsHidden";
  }
  t.prototype = {
    dispose: function () {
      if (this.container) {
        if (this.container.parentNode) {
          this.container.parentNode.removeChild(this.container);
        }
      }
      this.linkService = null;
    },
    reset: function e() {
      this.outline = null;
      this.lastToggleIsShow = true;
      var t = this.container;
      while (t.firstChild) {
        t.removeChild(t.firstChild);
      }
    },
    _dispatchEvent: function e(t) {
      var i = document.createEvent("CustomEvent");
      i.initCustomEvent("outlineloaded", true, true, { outlineCount: t });
      this.container.dispatchEvent(i);
    },
    _bindLink: function e(t, i) {
      var n = this.linkService;
      if (i.custom == true) {
        t.href = n.getCustomDestinationHash(i.dest);
        t.onclick = function e(t) {
          n.customNavigateTo(i.dest);
          return false;
        };
      } else {
        if (i.url) {
          pdfjsLib.addLinkAttributes(t, { url: i.url });
          return;
        }
        t.href = n.getDestinationHash(i.dest);
        t.onclick = function e(t) {
          n.navigateTo(i.dest);
          return false;
        };
      }
    },
    _addToggleButton: function e(t) {
      var i = document.createElement("div");
      i.className =
        this.outlineToggleClass + " " + this.outlineToggleHiddenClass;
      i.onclick = function (e) {
        e.stopPropagation();
        i.classList.toggle(this.outlineToggleHiddenClass);
        if (e.shiftKey) {
          var n = !i.classList.contains(this.outlineToggleHiddenClass);
          this._toggleOutlineItem(t, n);
        }
      }.bind(this);
      t.insertBefore(i, t.firstChild);
    },
    _toggleOutlineItem: function e(t, i) {
      this.lastToggleIsShow = i;
      var n = t.querySelectorAll("." + this.outlineToggleClass);
      for (var a = 0, o = n.length; a < o; ++a) {
        n[a].classList[i ? "remove" : "add"](this.outlineToggleHiddenClass);
      }
    },
    toggleOutlineTree: function e() {
      if (!this.outline) {
        return;
      }
      this._toggleOutlineItem(this.container, !this.lastToggleIsShow);
    },
    render: function e(t) {
      var i = (t && t.outline) || null;
      var n = 0;
      if (this.outline) {
        this.reset();
      }
      this.outline = i;
      if (!i) {
        return;
      }
      var a = document.createDocumentFragment();
      var o = [{ parent: a, items: this.outline }];
      var r = false;
      while (o.length > 0) {
        var s = o.shift();
        var l = s.custom;
        for (var c = 0, u = s.items.length; c < u; c++) {
          var d = s.items[c];
          var f = document.createElement("div");
          f.className = this.outlineItemClass;
          var h = document.createElement("a");
          if (d.custom == null && l != null) d.custom = l;
          this._bindLink(h, d);
          h.textContent = d.title.replace(/\x00/g, "");
          f.appendChild(h);
          if (d.items && d.items.length > 0) {
            r = true;
            this._addToggleButton(f);
            var p = document.createElement("div");
            p.className = this.outlineItemClass + "s";
            f.appendChild(p);
            o.push({ parent: p, custom: d.custom, items: d.items });
          }
          s.parent.appendChild(f);
          n++;
        }
      }
      if (r) {
        if (this.container.classList != null) {
          this.container.classList.add(this.outlineItemClass + "s");
        } else if (this.container.className != null) {
          this.container.className += " picWindow";
        }
      }
      this.container.appendChild(a);
      this._dispatchEvent(n);
    },
  };
  return t;
})();
var DFLightBox = (function e(t) {
  function i(e, i) {
    this.duration = 300;
    var n = this;
    n.lightboxWrapper = t("<div>").addClass("df-lightbox-wrapper");
    n.container = t("<div>")
      .addClass("df-container")
      .appendTo(n.lightboxWrapper);
    n.controls = t("<div>")
      .addClass("df-lightbox-controls")
      .appendTo(n.lightboxWrapper);
    n.closeButton = t("<div>")
      .addClass("df-lightbox-close df-ui-btn")
      .on("click", function () {
        n.close(e);
      })
      .appendTo(n.controls);
    n.lightboxWrapper.append(n.container);
    return n;
  }
  i.prototype.show = function (e) {
    if (this.lightboxWrapper.parent().length == 0)
      t("body").append(this.lightboxWrapper);
    t("html,body").addClass("df-lightbox-open");
    this.lightboxWrapper.fadeIn(this.duration, e);
    return this;
  };
  i.prototype.close = function (e) {
    this.lightboxWrapper.fadeOut(this.duration);
    setTimeout(e, this.duration);
    t("html,body").removeClass("df-lightbox-open");
    return this;
  };
  return i;
})(jQuery);
FLIP.Share = (function e(t) {
  function i(e, i) {
    var n = this;
    var a = "<div>";
    var o = "df-share-button";
    var r = "width=500,height=400";
    n.isOpen = false;
    n.shareUrl = "";
    n.wrapper = t('<div class="df-share-wrapper" style="display: none;">').on(
      "click",
      function (e) {
        n.close();
      }
    );
    n.box = t('<div class="df-share-box">')
      .on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
      })
      .appendTo(n.wrapper)
      .html('<span class="df-share-title">' + i.text.share + "</span>");
    n.urlInput = t('<textarea class="df-share-url">').on("click", function () {
      t(this).select();
    });
    n.facebook = t(a, {
      class: o + " df-share-facebook " + i.icons["facebook"],
    }).on("click", function (e) {
      window.open(
        "https://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(n.shareUrl),
        "Sharer",
        r
      );
    });
    n.google = t(a, { class: o + " df-share-google " + i.icons["google"] }).on(
      "click",
      function (e) {
        window.open(
          "https://plus.google.com/share?url=" + encodeURIComponent(n.shareUrl),
          "Sharer",
          r
        );
      }
    );
    n.twitter = t(a, {
      class: o + " df-share-twitter " + i.icons["twitter"],
    }).on("click", function (e) {
      window.open(
        "http://twitter.com/share?url=" + encodeURIComponent(n.shareUrl),
        "Sharer",
        r
      );
    });
    n.mail = t("<a>", {
      class: o + " df-share-mail " + i.icons["mail"],
      href:
        "mailto:?subject=" +
        i.text["mailSubject"] +
        "&body=" +
        i.text["mailBody"].replace("{{url}}", encodeURIComponent(n.shareUrl)),
      target: "_blank",
    }).on("click", function (e) {
      t(this).attr(
        "href",
        "mailto:?subject=" +
          i.text["mailSubject"] +
          "&body=" +
          i.text["mailBody"].replace("{{url}}", encodeURIComponent(n.shareUrl))
      );
      e.stopPropagation();
    });
    n.box
      .append(n.urlInput)
      .append(n.facebook)
      .append(n.twitter)
      .append(n.mail);
    t(e).append(n.wrapper);
  }
  i.prototype.show = function () {
    this.wrapper.fadeIn(300);
    this.urlInput.val(this.shareUrl);
    this.urlInput.trigger("click");
    this.isOpen = true;
  };
  i.prototype.dispose = function () {
    var e = this;
    e.box.off();
    e.google.off();
    e.twitter.off();
    e.facebook.off();
    e.mail.off();
    e.urlInput.off();
    e.wrapper.off().remove();
  };
  i.prototype.close = function () {
    this.wrapper.fadeOut(300);
    this.isOpen = false;
  };
  i.prototype.update = function (e) {
    this.shareUrl = e;
  };
  return i;
})(jQuery);
FLIP.Popup = (function e(t) {
  function i(e, i) {
    var n = this;
    var a = "<div>";
    var o = "width=500,height=400";
    n.isOpen = false;
    n.wrapper = t('<div class="df-popup-wrapper" style="display: none;">').on(
      "click",
      function (e) {
        n.close();
      }
    );
    n.box = t('<div class="df-popup-box">')
      .on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
      })
      .appendTo(n.wrapper);
    t(e).append(n.wrapper);
  }
  i.prototype.show = function () {
    this.wrapper.fadeIn(300);
    this.isOpen = true;
  };
  i.prototype.dispose = function () {
    var e = this;
    e.box.off();
    e.wrapper.off().remove();
  };
  i.prototype.close = function () {
    this.wrapper.fadeOut(300);
    this.isOpen = false;
  };
  return i;
})(jQuery);
var PDFLinkService = (function () {
  function e() {
    this.baseUrl = null;
    this.pdfDocument = null;
    this.pdfViewer = null;
    this.pdfHistory = null;
    this._pagesRefCache = null;
  }
  e.prototype = {
    dispose: function () {
      this.baseUrl = null;
      this.pdfDocument = null;
      this.pdfViewer = null;
      this.pdfHistory = null;
      this._pagesRefCache = null;
    },
    setDocument: function e(t, i) {
      this.baseUrl = i;
      this.pdfDocument = t;
      this._pagesRefCache = Object.create(null);
    },
    setViewer: function e(t) {
      this.pdfViewer = t;
      this.externalLinkTarget = t.previewObject.options.linkTarget;
    },
    setHistory: function e(t) {
      this.pdfHistory = t;
    },
    get pagesCount() {
      return this.pdfDocument.numPages;
    },
    get page() {
      return this.pdfViewer.currentPageNumber;
    },
    set page(e) {
      this.pdfViewer.currentPageNumber = e;
    },
    navigateTo: function e(t) {
      var i = "";
      var n = this;
      var a = function (e) {
        var o =
          e instanceof Object
            ? n._pagesRefCache[e.num + " " + e.gen + " R"]
            : e + 1;
        if (o) {
          if (
            n.pdfViewer.contentProvider.options.pageSize ==
              FLIP.PAGE_SIZE.DOUBLEINTERNAL &&
            o > 2
          ) {
            o = o * 2 - 1;
          }
          if (o > n.pdfViewer.pageCount) {
            o = n.pdfViewer.pageCount;
          }
          n.pdfViewer.gotoPage(o);
          if (n.pdfHistory) {
            n.pdfHistory.push({ dest: t, hash: i, page: o });
          }
        } else {
          n.pdfDocument.getPageIndex(e).then(function (t) {
            var i = t + 1;
            var o = e.num + " " + e.gen + " R";
            n._pagesRefCache[o] = i;
            a(e);
          });
        }
      };
      var o;
      if (typeof t === "string") {
        i = t;
        o = this.pdfDocument.getDestination(t);
      } else {
        o = Promise.resolve(t);
      }
      o.then(function (e) {
        t = e;
        if (!(e instanceof Array)) {
          return;
        }
        a(e[0]);
      });
    },
    customNavigateTo: function e(t) {
      if (t == "" || t == null || t == "null") return;
      var i = null;
      if (!isNaN(Math.round(t))) {
        i = t;
      } else if (typeof t === "string") {
        i = parseInt(t.replace("#", ""), 10);
        if (isNaN(i)) {
          window.open(
            t,
            FLIP.defaults.linkTarget == FLIP.LINK_TARGET.SELF
              ? "_self"
              : "_blank"
          );
          return;
        }
      }
      if (i != null) this.pdfViewer.gotoPage(i);
    },
    getDestinationHash: function e(t) {
      if (typeof t === "string") {
        return this.getAnchorUrl("#" + escape(t));
      }
      if (t instanceof Array) {
        var i = t[0];
        var n =
          i instanceof Object
            ? this._pagesRefCache[i.num + " " + i.gen + " R"]
            : i + 1;
        if (n) {
          var a = this.getAnchorUrl("#page=" + n);
          var o = t[1];
          if (typeof o === "object" && "name" in o && o.name === "XYZ") {
            var r = t[4] || this.pdfViewer.currentScaleValue;
            var s = parseFloat(r);
            if (s) {
              r = s * 100;
            }
            a += "&zoom=" + r;
            if (t[2] || t[3]) {
              a += "," + (t[2] || 0) + "," + (t[3] || 0);
            }
          }
          return a;
        }
      }
      return this.getAnchorUrl("");
    },
    getCustomDestinationHash: function e(t) {
      return "#" + escape(t);
    },
    getAnchorUrl: function e(t) {
      return (this.baseUrl || "") + t;
    },
    setHash: function e(t) {
      if (t.indexOf("=") >= 0) {
        var i = parseQueryString(t);
        if ("nameddest" in i) {
          if (this.pdfHistory) {
            this.pdfHistory.updateNextHashParam(i.nameddest);
          }
          this.navigateTo(i.nameddest);
          return;
        }
        var n, a;
        if ("page" in i) {
          n = i.page | 0 || 1;
        }
        if ("zoom" in i) {
          var o = i.zoom.split(",");
          var r = o[0];
          var s = parseFloat(r);
          if (r.indexOf("Fit") === -1) {
            a = [
              null,
              { name: "XYZ" },
              o.length > 1 ? o[1] | 0 : null,
              o.length > 2 ? o[2] | 0 : null,
              s ? s / 100 : r,
            ];
          } else {
            if (r === "Fit" || r === "FitB") {
              a = [null, { name: r }];
            } else if (
              r === "FitH" ||
              r === "FitBH" ||
              r === "FitV" ||
              r === "FitBV"
            ) {
              a = [null, { name: r }, o.length > 1 ? o[1] | 0 : null];
            } else if (r === "FitR") {
              if (o.length !== 5) {
                console.error(
                  "PDFLinkService_setHash: " +
                    "Not enough parameters for 'FitR'."
                );
              } else {
                a = [null, { name: r }, o[1] | 0, o[2] | 0, o[3] | 0, o[4] | 0];
              }
            } else {
              console.error(
                "PDFLinkService_setHash: '" + r + "' is not a valid zoom value."
              );
            }
          }
        }
        if (a) {
          this.pdfViewer.scrollPageIntoView(n || this.page, a);
        } else if (n) {
          this.page = n;
        }
        if ("pagemode" in i) {
          var l = document.createEvent("CustomEvent");
          l.initCustomEvent("pagemode", true, true, { mode: i.pagemode });
          this.pdfViewer.container.dispatchEvent(l);
        }
      } else if (/^\d+$/.test(t)) {
        this.page = t;
      } else {
        if (this.pdfHistory) {
          this.pdfHistory.updateNextHashParam(unescape(t));
        }
        this.navigateTo(unescape(t));
      }
    },
    executeNamedAction: function e(t) {
      switch (t) {
        case "GoBack":
          if (this.pdfHistory) {
            this.pdfHistory.back();
          }
          break;
        case "GoForward":
          if (this.pdfHistory) {
            this.pdfHistory.forward();
          }
          break;
        case "NextPage":
          this.page++;
          break;
        case "PrevPage":
          this.page--;
          break;
        case "LastPage":
          this.page = this.pagesCount;
          break;
        case "FirstPage":
          this.page = 1;
          break;
        default:
          break;
      }
      var i = document.createEvent("CustomEvent");
      i.initCustomEvent("namedaction", true, true, { action: t });
      this.pdfViewer.container.dispatchEvent(i);
    },
    cachePageRef: function e(t, i) {
      var n = i.num + " " + i.gen + " R";
      this._pagesRefCache[n] = t;
    },
  };
  return e;
})();
var FindStates = {
  FIND_FOUND: 0,
  FIND_NOTFOUND: 1,
  FIND_WRAPPED: 2,
  FIND_PENDING: 3,
};
var FIND_SCROLL_OFFSET_TOP = -50;
var FIND_SCROLL_OFFSET_LEFT = -400;
var CHARACTERS_TO_NORMALIZE = {
  "‘": "'",
  "’": "'",
  "‚": "'",
  "‛": "'",
  "“": '"',
  "”": '"',
  "„": '"',
  "‟": '"',
  "¼": "1/4",
  "½": "1/2",
  "¾": "3/4",
};
FLIP.PDFFindController = (function e() {
  function t(e) {
    this.pdfViewer = e.pdfViewer || null;
    this.onUpdateResultsCount = null;
    this.onUpdateState = null;
    this.reset();
    var t = Object.keys(CHARACTERS_TO_NORMALIZE).join("");
    this.normalizationRegex = new RegExp("[" + t + "]", "g");
  }
  t.prototype = {
    reset: function e() {
      this.startedTextExtraction = false;
      this.extractTextPromises = [];
      this.pendingFindMatches = Object.create(null);
      this.active = false;
      this.pageContents = [];
      this.pageMatches = [];
      this.pageMatchesLength = null;
      this.matchCount = 0;
      this.selected = { pageIdx: -1, matchIdx: -1 };
      this.offset = { pageIdx: null, matchIdx: null };
      this.pagesToSearch = null;
      this.resumePageIdx = null;
      this.state = null;
      this.dirtyMatch = false;
      this.findTimeout = null;
      this.firstPagePromise = new Promise(
        function (e) {
          this.resolveFirstPage = e;
        }.bind(this)
      );
    },
    normalize: function e(t) {
      return t.replace(this.normalizationRegex, function (e) {
        return CHARACTERS_TO_NORMALIZE[e];
      });
    },
    _prepareMatches: function e(t, i, n) {
      function a(e, t) {
        var i, n, a;
        i = e[t];
        a = e[t + 1];
        if (t < e.length - 1 && i.match === a.match) {
          i.skipped = true;
          return true;
        }
        for (var o = t - 1; o >= 0; o--) {
          n = e[o];
          if (n.skipped) {
            continue;
          }
          if (n.match + n.matchLength < i.match) {
            break;
          }
          if (n.match + n.matchLength >= i.match + i.matchLength) {
            i.skipped = true;
            return true;
          }
        }
        return false;
      }
      var o, r;
      t.sort(function (e, t) {
        return e.match === t.match
          ? e.matchLength - t.matchLength
          : e.match - t.match;
      });
      for (o = 0, r = t.length; o < r; o++) {
        if (a(t, o)) {
          continue;
        }
        i.push(t[o].match);
        n.push(t[o].matchLength);
      }
    },
    calcFindPhraseMatch: function e(t, i, n) {
      var a = [];
      var o = t.length;
      var r = -o;
      while (true) {
        r = n.indexOf(t, r + o);
        if (r === -1) {
          break;
        }
        a.push(r);
      }
      this.pageMatches[i] = a;
    },
    calcFindWordMatch: function e(t, i, n) {
      var a = [];
      var o = t.match(/\S+/g);
      var r, s, l;
      for (var c = 0, u = o.length; c < u; c++) {
        r = o[c];
        s = r.length;
        l = -s;
        while (true) {
          l = n.indexOf(r, l + s);
          if (l === -1) {
            break;
          }
          a.push({ match: l, matchLength: s, skipped: false });
        }
      }
      if (!this.pageMatchesLength) {
        this.pageMatchesLength = [];
      }
      this.pageMatchesLength[i] = [];
      this.pageMatches[i] = [];
      this._prepareMatches(a, this.pageMatches[i], this.pageMatchesLength[i]);
    },
    calcFindMatch: function e(t) {
      var i = this.normalize(this.pageContents[t]);
      var n = this.normalize(this.state.query);
      var a = this.state.caseSensitive;
      var o = this.state.phraseSearch;
      var r = n.length;
      if (r === 0) {
        return;
      }
      if (!a) {
        i = i.toLowerCase();
        n = n.toLowerCase();
      }
      if (o) {
        this.calcFindPhraseMatch(n, t, i);
      } else {
        this.calcFindWordMatch(n, t, i);
      }
      this.updatePage(t);
      if (this.resumePageIdx === t) {
        this.resumePageIdx = null;
        this.nextPageMatch();
      }
      if (this.pageMatches[t].length > 0) {
        this.matchCount += this.pageMatches[t].length;
        this.updateUIResultsCount();
      }
    },
    extractText: function e() {
      if (this.startedTextExtraction) {
        return;
      }
      this.startedTextExtraction = true;
      this.pageContents = [];
      var t = [];
      var i = this.pdfViewer.contentProvider.pdfDocument.numPages;
      for (var n = 0; n < i; n++) {
        this.extractTextPromises.push(
          new Promise(function (e) {
            t.push(e);
          })
        );
      }
      var a = this;
      function o(e) {
        a.pdfViewer.getPageTextContent(e).then(function i(n) {
          var r = n.items;
          var s = [];
          for (var l = 0, c = r.length; l < c; l++) {
            s.push(r[l].str);
          }
          a.pageContents.push(s.join(""));
          t[e](e);
          console.log("extracting Page" + e);
          if (e + 1 < a.pdfViewer.contentProvider.pdfDocument.numPages) {
            o(e + 1);
          }
        });
      }
      o(0);
    },
    executeCommand: function e(t, i) {
      if (this.state === null || t !== "findagain") {
        this.dirtyMatch = true;
      }
      this.state = i;
      this.updateUIState(FindStates.FIND_PENDING);
      this.firstPagePromise.then(
        function () {
          this.extractText();
          clearTimeout(this.findTimeout);
          if (t === "find") {
            this.findTimeout = setTimeout(this.nextMatch.bind(this), 250);
          } else {
            this.nextMatch();
          }
        }.bind(this)
      );
    },
    updatePage: function e(t) {
      if (this.selected.pageIdx === t) {
        this.pdfViewer.currentPageNumber = t + 1;
      }
      var i = this.pdfViewer.getPageView(t);
      if (i.textLayer) {
        i.textLayer.updateMatches();
      }
    },
    nextMatch: function e() {
      var t = this.state.findPrevious;
      var i = this.pdfViewer.currentPageNumber - 1;
      var n = this.pdfViewer.contentProvider.pageCount;
      this.active = true;
      if (this.dirtyMatch) {
        this.dirtyMatch = false;
        this.selected.pageIdx = this.selected.matchIdx = -1;
        this.offset.pageIdx = i;
        this.offset.matchIdx = null;
        this.hadMatch = false;
        this.resumePageIdx = null;
        this.pageMatches = [];
        this.matchCount = 0;
        this.pageMatchesLength = null;
        var a = this;
        for (var o = 0; o < n; o++) {
          this.updatePage(o);
          if (!(o in this.pendingFindMatches)) {
            this.pendingFindMatches[o] = true;
            this.extractTextPromises[o].then(function (e) {
              delete a.pendingFindMatches[e];
              a.calcFindMatch(e);
            });
          }
        }
      }
      if (this.state.query === "") {
        this.updateUIState(FindStates.FIND_FOUND);
        return;
      }
      if (this.resumePageIdx) {
        return;
      }
      var r = this.offset;
      this.pagesToSearch = n;
      if (r.matchIdx !== null) {
        var s = this.pageMatches[r.pageIdx].length;
        if ((!t && r.matchIdx + 1 < s) || (t && r.matchIdx > 0)) {
          this.hadMatch = true;
          r.matchIdx = t ? r.matchIdx - 1 : r.matchIdx + 1;
          this.updateMatch(true);
          return;
        }
        this.advanceOffsetPage(t);
      }
      this.nextPageMatch();
    },
    matchesReady: function e(t) {
      var i = this.offset;
      var n = t.length;
      var a = this.state.findPrevious;
      if (n) {
        this.hadMatch = true;
        i.matchIdx = a ? n - 1 : 0;
        this.updateMatch(true);
        return true;
      }
      this.advanceOffsetPage(a);
      if (i.wrapped) {
        i.matchIdx = null;
        if (this.pagesToSearch < 0) {
          this.updateMatch(false);
          return true;
        }
      }
      return false;
    },
    updateMatchPosition: function e(t, i, n, a) {
      if (this.selected.matchIdx === i && this.selected.pageIdx === t) {
        var o = { top: FIND_SCROLL_OFFSET_TOP, left: FIND_SCROLL_OFFSET_LEFT };
        scrollIntoView(n[a], o, true);
      }
    },
    nextPageMatch: function e() {
      if (this.resumePageIdx !== null) {
        console.error("There can only be one pending page.");
      }
      do {
        var t = this.offset.pageIdx;
        var i = this.pageMatches[t];
        if (!i) {
          this.resumePageIdx = t;
          break;
        }
      } while (!this.matchesReady(i));
    },
    advanceOffsetPage: function e(t) {
      var i = this.offset;
      var n = this.extractTextPromises.length;
      i.pageIdx = t ? i.pageIdx - 1 : i.pageIdx + 1;
      i.matchIdx = null;
      this.pagesToSearch--;
      if (i.pageIdx >= n || i.pageIdx < 0) {
        i.pageIdx = t ? n - 1 : 0;
        i.wrapped = true;
      }
    },
    updateMatch: function e(t) {
      var i = FindStates.FIND_NOTFOUND;
      var n = this.offset.wrapped;
      this.offset.wrapped = false;
      if (t) {
        var a = this.selected.pageIdx;
        this.selected.pageIdx = this.offset.pageIdx;
        this.selected.matchIdx = this.offset.matchIdx;
        i = n ? FindStates.FIND_WRAPPED : FindStates.FIND_FOUND;
        if (a !== -1 && a !== this.selected.pageIdx) {
          this.updatePage(a);
        }
      }
      this.updateUIState(i, this.state.findPrevious);
      if (this.selected.pageIdx !== -1) {
        this.updatePage(this.selected.pageIdx);
      }
    },
    updateUIResultsCount: function e() {
      if (this.onUpdateResultsCount) {
        this.onUpdateResultsCount(this.matchCount);
      }
    },
    updateUIState: function e(t, i) {
      if (this.onUpdateState) {
        this.onUpdateState(t, i, this.matchCount);
      }
    },
  };
  return t;
})();
FLIP.TextLayerBuilder = (function e() {
  function t(e) {
    this.textLayerDiv = e.textLayerDiv;
    this.renderingDone = false;
    this.divContentDone = false;
    this.pageIdx = e.pageIndex;
    this.pageNumber = this.pageIdx + 1;
    this.matches = [];
    this.viewport = e.viewport;
    this.textDivs = [];
    this.findController = e.findController || null;
    this.textLayerRenderTask = null;
    this.enhanceTextSelection = e.enhanceTextSelection;
    this._bindMouse();
  }
  t.prototype = {
    _finishRendering: function e() {
      this.renderingDone = true;
      if (!this.enhanceTextSelection) {
        var t = document.createElement("div");
        t.className = "endOfContent";
        this.textLayerDiv.appendChild(t);
      }
    },
    render: function e(t) {
      if (!this.divContentDone || this.renderingDone) {
        return;
      }
      if (this.textLayerRenderTask) {
        this.textLayerRenderTask.cancel();
        this.textLayerRenderTask = null;
      }
      this.textDivs = [];
      var i = document.createDocumentFragment();
      this.textLayerRenderTask = pdfjsLib.renderTextLayer({
        textContent: this.textContent,
        container: i,
        viewport: this.viewport,
        textDivs: this.textDivs,
        timeout: t,
        enhanceTextSelection: this.enhanceTextSelection,
      });
      this.textLayerRenderTask.promise.then(
        function () {
          this.textLayerDiv.appendChild(i);
          this._finishRendering();
          this.updateMatches();
        }.bind(this),
        function (e) {}
      );
    },
    setTextContent: function e(t) {
      if (this.textLayerRenderTask) {
        this.textLayerRenderTask.cancel();
        this.textLayerRenderTask = null;
      }
      this.textContent = t;
      this.divContentDone = true;
    },
    convertMatches: function e(t, i) {
      var n = 0;
      var a = 0;
      var o = this.textContent.items;
      var r = o.length - 1;
      var s =
        this.findController === null
          ? 0
          : this.findController.state.query.length;
      var l = [];
      if (!t) {
        return l;
      }
      for (var c = 0, u = t.length; c < u; c++) {
        var d = t[c];
        while (n !== r && d >= a + o[n].str.length) {
          a += o[n].str.length;
          n++;
        }
        if (n === o.length) {
          console.error("Could not find a matching mapping");
        }
        var f = { begin: { divIdx: n, offset: d - a } };
        if (i) {
          d += i[c];
        } else {
          d += s;
        }
        while (n !== r && d > a + o[n].str.length) {
          a += o[n].str.length;
          n++;
        }
        f.end = { divIdx: n, offset: d - a };
        l.push(f);
      }
      return l;
    },
    renderMatches: function e(t) {
      if (t.length === 0) {
        return;
      }
      var i = this.textContent.items;
      var n = this.textDivs;
      var a = null;
      var o = this.pageIdx;
      var r =
        this.findController === null
          ? false
          : o === this.findController.selected.pageIdx;
      var s =
        this.findController === null
          ? -1
          : this.findController.selected.matchIdx;
      var l =
        this.findController === null
          ? false
          : this.findController.state.highlightAll;
      var c = { divIdx: -1, offset: undefined };
      function u(e, t) {
        var i = e.divIdx;
        n[i].textContent = "";
        d(i, 0, e.offset, t);
      }
      function d(e, t, a, o) {
        var r = n[e];
        var s = i[e].str.substring(t, a);
        var l = document.createTextNode(s);
        if (o) {
          var c = document.createElement("span");
          c.className = o;
          c.appendChild(l);
          r.appendChild(c);
          return;
        }
        r.appendChild(l);
      }
      var f = s,
        h = f + 1;
      if (l) {
        f = 0;
        h = t.length;
      } else if (!r) {
        return;
      }
      for (var p = f; p < h; p++) {
        var g = t[p];
        var v = g.begin;
        var m = g.end;
        var b = r && p === s;
        var w = b ? " selected" : "";
        if (this.findController) {
          this.findController.updateMatchPosition(o, p, n, v.divIdx);
        }
        if (!a || v.divIdx !== a.divIdx) {
          if (a !== null) {
            d(a.divIdx, a.offset, c.offset);
          }
          u(v);
        } else {
          d(a.divIdx, a.offset, v.offset);
        }
        if (v.divIdx === m.divIdx) {
          d(v.divIdx, v.offset, m.offset, "highlight" + w);
        } else {
          d(v.divIdx, v.offset, c.offset, "highlight begin" + w);
          for (var x = v.divIdx + 1, P = m.divIdx; x < P; x++) {
            n[x].className = "highlight middle" + w;
          }
          u(m, "highlight end" + w);
        }
        a = m;
      }
      if (a) {
        d(a.divIdx, a.offset, c.offset);
      }
    },
    updateMatches: function e() {
      if (!this.renderingDone) {
        return;
      }
      var t = this.matches;
      var i = this.textDivs;
      var n = this.textContent.items;
      var a = -1;
      for (var o = 0, r = t.length; o < r; o++) {
        var s = t[o];
        var l = Math.max(a, s.begin.divIdx);
        for (var c = l, u = s.end.divIdx; c <= u; c++) {
          var d = i[c];
          d.textContent = n[c].str;
          d.className = "";
        }
        a = s.end.divIdx + 1;
      }
      if (this.findController === null || !this.findController.active) {
        return;
      }
      var f, h;
      if (this.findController !== null) {
        f = this.findController.pageMatches[this.pageIdx] || null;
        h = this.findController.pageMatchesLength
          ? this.findController.pageMatchesLength[this.pageIdx] || null
          : null;
      }
      this.matches = this.convertMatches(f, h);
      this.renderMatches(this.matches);
    },
    _bindMouse: function e() {
      var t = this.textLayerDiv;
      var i = this;
      t.addEventListener("mousedown", function (e) {
        if (i.enhanceTextSelection && i.textLayerRenderTask) {
          i.textLayerRenderTask.expandTextDivs(true);
          return;
        }
        var n = t.querySelector(".endOfContent");
        if (!n) {
          return;
        }
        var a = e.target !== t;
        a =
          a &&
          window.getComputedStyle(n).getPropertyValue("-moz-user-select") !==
            "none";
        if (a) {
          var o = t.getBoundingClientRect();
          var r = Math.max(0, (e.pageY - o.top) / o.height);
          n.style.top = (r * 100).toFixed(2) + "%";
        }
        n.classList.add("active");
      });
      t.addEventListener("mouseup", function (e) {
        if (i.enhanceTextSelection && i.textLayerRenderTask) {
          i.textLayerRenderTask.expandTextDivs(false);
          return;
        }
        var n = t.querySelector(".endOfContent");
        if (!n) {
          return;
        }
        n.style.top = "";
        n.classList.remove("active");
      });
    },
  };
  return t;
})();
FLIP.ConvertPageLinks = function () {
  var e = arguments[0] / 100,
    t = arguments[1] / 100;
  var i = function (i, n, a, o, r) {
    return { x: i / e, y: n / t, w: a / e, h: o / t, dest: r };
  };
  var n = [];
  var a;
  for (var o = 2; o < arguments.length; o++) {
    a = arguments[o];
    n[o - 2] = i.apply(this, a);
  }
  return n;
};
FLIP.parseLinks = function (e) {
  var t;
  if (e != null && e.length > 0) {
    for (var i = 0; i < e.length; i++) {
      t = e[i];
      if (t != null && t[0] != null && t[0].dest == null) {
        t = FLIP.ConvertPageLinks.apply(this, t);
        e[i] = t;
      }
    }
  }
  return e;
};
(function (e) {
  function t(e) {
    return e == "true" || e == true;
  }
  function i(e) {
    if (e.webgl != null) e.webgl = t(e.webgl);
    if (e.enableDownload != null) e.enableDownload = t(e.enableDownload);
    if (e.search != null) e.search = t(e.search);
    if (e.enableAnalytics != null) e.enableAnalytics = t(e.enableAnalytics);
    if (e.scrollWheel != null) e.scrollWheel = t(e.scrollWheel);
    if (e.autoEnableOutline != null)
      e.autoEnableOutline = t(e.autoEnableOutline);
    if (e.autoEnableThumbnail != null)
      e.autoEnableThumbnail = t(e.autoEnableThumbnail);
    if (e.transparent != null) e.transparent = t(e.transparent);
    if (e.overwritePDFOutline != null)
      e.overwritePDFOutline = t(e.overwritePDFOutline);
    if (e.soundEnable != null) e.soundEnable = t(e.soundEnable);
    if (e.forceFit != null) e.forceFit = t(e.forceFit);
    if (e.enableAnnotation != null) e.enableAnnotation = t(e.enableAnnotation);
    if (e.webglShadow != null) e.webglShadow = t(e.webglShadow);
    if (e.autoPlay != null) e.autoPlay = t(e.autoPlay);
    if (e.autoPlayStart != null) e.autoPlayStart = t(e.autoPlayStart);
    if (e.paddingTop != null) e.paddingTop = parseInt(e.paddingTop, 10);
    if (e.paddingRight != null) e.paddingRight = parseInt(e.paddingRight, 10);
    if (e.paddingBottom != null)
      e.paddingBottom = parseInt(e.paddingBottom, 10);
    if (e.paddingLeft != null) e.paddingLeft = parseInt(e.paddingLeft, 10);
    if (e.zoomRatio != null) e.zoomRatio = parseFloat(e.zoomRatio, 10);
    if (e.stiffness != null) e.stiffness = parseFloat(e.stiffness, 10);
    if (e.autoPlayDuration != null)
      e.autoPlayDuration = parseInt(e.autoPlayDuration, 10);
    if (e.linkTarget != null) e.linkTarget = parseInt(e.linkTarget, 10);
    if (e.pageMode == 0 || e.pageMode == "0") e.pageMode = null;
    if (e.singlePageMode == 0 || e.singlePageMode == "0")
      e.singlePageMode = null;
  }
  function n(e) {
    if (e.parsed == true) return;
    e.parsed = true;
    var t = [];
    i(e);
    if (typeof FlipWPGlobal !== "undefined" && e.wpOptions == "true") {
      try {
        for (var n in e.links) {
          var a = e.links[n];
          var o = [100, 100];
          for (var r = 0; r < a.length; r++) {
            var s = a[r];
            var l = s.substr(1).slice(0, -1).split(",");
            var c = [];
            for (var u = 0; u < 5; u++) {
              c[u] = l[u];
            }
            o.push(c);
          }
          t[parseInt(n, 10) + 1] = o;
        }
      } catch (e) {
        console.error(e.stack);
      }
      e.links = FLIP.parseLinks(t);
    } else {
      e.links = FLIP.parseLinks(e.links);
    }
  }
  FLIP.getOptions = function (t) {
    t = e(t);
    var i = t.attr("id");
    var a = "option_" + i,
      o = t.attr("source") || t.attr("df-source");
    a = a == null || a == "" || window[a] == null ? {} : window[a];
    a.source = o == null || o == "" ? a.source : o;
    var r = {
      webgl: t.attr("webgl"),
      height: t.attr("height"),
      soundEnable: t.attr("sound"),
      bookTitle: t.data("title"),
      transparent: t.attr("transparent"),
      enableDownload: t.attr("download"),
      search: t.attr("search"),
      duration: t.attr("duration"),
      hard: t.attr("hard"),
      openPage: t.data("page"),
      pageMode: t.attr("pagemode"),
      direction: t.attr("direction"),
      backgroundColor: t.attr("backgroundcolor"),
      scrollWheel: t.attr("scrollwheel"),
      backgroundImage: t.attr("backgroundimage"),
      paddingTop: t.attr("paddingtop"),
      paddingRight: t.attr("paddingright"),
      paddingBottom: t.attr("paddingbottom"),
      paddingLeft: t.attr("paddingleft"),
      wpOptions: t.attr("wpoptions"),
    };
    a = e.extend(true, {}, a, r);
    n(a);
    return a;
  };
  FLIP.parseBooks = function () {
    e("._df_button, ._df_thumb, ._df_custom, ._df_book").each(function () {
      var t = e(this);
      var i = t.attr("parsed") || t.attr("df-parsed");
      if (i !== "true") {
        t.attr("df-parsed", "true");
        if (t.hasClass("_df_book")) {
          var n = t.attr("id"),
            a = t.attr("slug");
          var o = FLIP.getOptions(t);
          o.id = n;
          if (a != null) o.slug = a;
          if (n) {
            window[n.toString()] = e(t).flipBook(o.source, o);
          } else {
            e(t).flipBook(o.source, o);
          }
        } else {
          if (t.hasClass("_df_thumb")) {
            var r = e("<div class='_df_book-cover'>");
            var s = t.html().trim();
            t.html("");
            var l = e("<span class='_df_book-title'>").html(s).appendTo(r);
            var c = t.attr("thumb") || t.attr("df-thumb"),
              u = t.attr("thumbtype") || FLIP.defaults.thumbElement || "div",
              d = t.attr("tags") || t.attr("df-tags");
            if (d) {
              d = d.split(",");
              if (d.length > 0) {
                for (var f = 0; f < d.length; f++) {
                  t.append("<span class='_df_book-tag'>" + d[f] + "</span>");
                }
              }
            }
            if (c != null && c.toString().trim() != "") {
              if (u == "img") {
                r.append('<img src="' + c + '" alt="' + s + '"/>');
                t.attr("thumb-type", "img");
              } else {
                r.css({ backgroundImage: "url('" + c + "')" });
              }
            } else {
              r.addClass("_df_thumb-not-found");
            }
            t.append(r);
          }
        }
      }
    });
  };
  e(document).ready(function () {
    if (
      typeof FlipLocation == "undefined" &&
      FLIP.autoDetectLocation != false
    ) {
      e("script").each(function () {
        var t = e(this)[0].src;
        if (
          (t.indexOf("/flip.js") > -1 || t.indexOf("/flip.min.js") > -1) &&
          (t.indexOf("https://") > -1 || t.indexOf("http://") > -1) &&
          t.indexOf("js/flip.") > -1
        ) {
          var i = t.split("/");
          window.FlipLocation = i.slice(0, -2).join("/");
        }
      });
    }
    if (typeof FlipLocation !== "undefined") {
      if (FlipLocation.length > 2 && FlipLocation.slice(-1) !== "/") {
        window.FlipLocation += "/";
      }
      FLIP.defaults.mockupjsSrc = FlipLocation + "js/libs/mockup.min.js";
      FLIP.defaults.pdfjsSrc = FlipLocation + "js/libs/pdf.min.js";
      FLIP.defaults.pdfjsCompatibilitySrc =
        FlipLocation + "js/libs/compatibility.js";
      FLIP.defaults.threejsSrc = FlipLocation + "js/libs/three.min.js";
      FLIP.defaults.pdfjsWorkerSrc =
        FlipLocation + "js/libs/pdf.worker.min.js";
      FLIP.defaults.soundFile = FlipLocation + "sound/turn2.mp3";
      FLIP.defaults.imagesLocation = FlipLocation + "images";
      FLIP.defaults.imageResourcesPath = FlipLocation + "images/pdfjs/";
      FLIP.defaults.cMapUrl = FlipLocation + "js/libs/cmaps/";
      if (typeof FlipWPGlobal !== "undefined") {
        i(FlipWPGlobal);
        e.extend(true, FLIP.defaults, FlipWPGlobal);
      }
    }
    FLIP.preParseHash = window.location.hash;
    e("body").on("click", "._df_button, ._df_thumb, ._df_custom", function (t) {
      t.preventDefault();
      var i = e(this);
      if (!window.dfLightBox) {
        window.dfLightBox = new DFLightBox(function () {
          Array.prototype.forEach.call(
            FLIP.utils.getSharePrefixes(),
            function (e) {
              if (window.location.hash.indexOf("#" + e) == 0)
                window.location.hash = "#_";
            }
          );
          window.dfActiveLightBoxBook.analytics({
            eventAction: "Book Closed",
            options: window.dfActiveLightBoxBook.options,
          });
          window.dfActiveLightBoxBook.dispose();
          window.dfActiveLightBoxBook = null;
        });
      }
      window.dfLightBox.duration = 500;
      if (window.dfActiveLightBoxBook && window.dfActiveLightBoxBook.dispose) {
        window.dfActiveLightBoxBook.dispose();
      } else {
        window.dfLightBox.show(function () {
          var t = FLIP.getOptions(i);
          t.transparent = false;
          t.height = "100%";
          t.id = i.attr("id");
          var n = i.attr("slug");
          if (n != null) t.slug = n;
          t.isLightBox = true;
          window.dfActiveLightBoxBook = e(window.dfLightBox.container).flipBook(
            t.source,
            t
          );
        });
      }
    });
    if (FLIP.utils.isSafari || FLIP.utils.isIOS) {
      e("body").addClass("df-webkit");
    }
    var t = false;
    Array.prototype.forEach.call(FLIP.utils.getSharePrefixes(), function (i) {
      if (
        FLIP.preParseHash &&
        FLIP.preParseHash.indexOf(i) >= 0 &&
        t === false
      ) {
        var n = FLIP.preParseHash.split(i)[1].split("/")[0];
        var a = FLIP.preParseHash.split(i)[1].split("/")[1];
        if (a != null) {
          a = a.split("/")[0];
        }
        var o;
        o = e("[slug=" + n + "]");
        if (o.length == 0) o = e("#" + n);
        if (o.length == 0) o = e("[_slug=" + n + "]");
        if (o.length > 0) {
          if (a != null) {
            o.data("page", a);
          }
          if (o.is("._df_button, ._df_thumb, ._df_custom")) {
            o.trigger("click");
            t = true;
          }
        }
      }
    });
    FLIP.parseBooks();
    if (e("body").hasClass("attachment-pdf")) {
      var n = e("[attachment_pdf_flipbook_lightbox]");
      if (n.length > 0) {
        e(n[0]).trigger("click");
      }
    }
    e("body").on("click", ".df-ui-sidemenu-close", function () {
      var t = e(this);
      t.closest(".df-container")
        .find(".df-ui-outline.df-active , .df-ui-thumbnail.df-active")
        .trigger("click");
    });
  });
 
})(jQuery);
