(function ($, w, _, XLOG, XWARN, XERROR, XDEBUG) {
  w.iframeModeWindow = true;

  w.rand = function (max) {
    var r = Math.floor((1 + Math.random()) * 0x10000);
    return ((isFinite(max) && !isNaN(max)) && max > 0) ? r % (max + 1) : r;
  };

  w.guid = function () {
    function s4() {
      return  w.rand()
              .toString(16)
              .substring(1);
    }
    return String.fromCharCode((w.rand(1) === 1) ? 65 : 97) + w.rand(26) + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
  };

  w.isNum = function (c) {
    return (!isNaN(c) && isFinite(c) && (c !== null) && (c !== null) && (typeof c !== undefined) && (typeof c !== "undefined"));
  };

  _._REQUEST = function (name, url) {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    } catch (e) {
      if (!url)
        url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
              results = regex.exec(url);
      if (!results)
        return null;
      if (!results[2])
        return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  };

  _.Node.prototype.getId = function () {
    var id = $(this).attr('id');

    if (!id) {
      id = w.guid();
      $(this).attr('id', id);
    }

    return id;
  };

  w.ajusteMobileVH = function () {
    /*
     * https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
     * We execute the same script as before
     */
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  w._section_scroll = function () {
    var el = $(this);
    if (el.scrollTop() > 7) {
      $("body > header").addClass('rolado');
    } else {
      $("body > header").removeClass('rolado');
    }
  };

  (function ($, w, _) {
    w.md5 = function (d) {
      result = M(V(Y(X(d), 8 * d.length)));
      return result.toLowerCase();
    };
    function M(d) {
      for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)
        _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _);
      return f;
    }
    function X(d) {
      for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)
        _[m] = 0;
      for (m = 0; m < 8 * d.length; m += 8)
        _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
      return _;
    }
    function V(d) {
      for (var _ = "", m = 0; m < 32 * d.length; m += 8)
        _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
      return _;
    }
    function Y(d, _) {
      d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
      for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
        var h = m, t = f, g = r, e = i;
        f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e);
      }
      return Array(m, f, r, i);
    }
    function md5_cmn(d, _, m, f, r, i) {
      return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m);
    }
    function md5_ff(d, _, m, f, r, i, n) {
      return md5_cmn(_ & m | ~_ & f, d, _, r, i, n);
    }
    function md5_gg(d, _, m, f, r, i, n) {
      return md5_cmn(_ & f | m & ~f, d, _, r, i, n);
    }
    function md5_hh(d, _, m, f, r, i, n) {
      return md5_cmn(_ ^ m ^ f, d, _, r, i, n);
    }
    function md5_ii(d, _, m, f, r, i, n) {
      return md5_cmn(m ^ (_ | ~f), d, _, r, i, n);
    }
    function safe_add(d, _) {
      var m = (65535 & d) + (65535 & _);
      return(d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m;
    }
    function bit_rol(d, _) {
      return d << _ | d >>> 32 - _;
    }
  }($, w, _));

  _.noneAll = function () {
    $('input.none[type=radio]').attr('checked', 'checked');
  };

  w.scrollTo = function (event, obj, step, target) {
    if (event) {
      if (event.target && (($(event.target).attr('href') + " ").charAt(0) === '#')) {
        event.preventDefault();
      }

      w.setTimeout(function () {
        var e = $(event.target ? event.target : event)[0];
        var sec = event.target ? e : event;

        if (!sec) {
          return false;
        }

        do {
          if (!sec) {
            return false;
          }
          sec = sec.parentNode;
        } while ((!$(sec).hasClass("global")) || (sec.nodeName.toLowerCase() !== 'section'));

        sec = $(sec);
        e = $(e);

        var target = (((e[0].nodeName.toLowerCase() === 'a') && (e.attr('href').charAt(0) === '#')) ? e.attr('href') : e.attr('move'));

        //pos = w.isNum(pos) ? pos : (pos ? $(pos).offset().top : e.offset().top);

        if ((e[0].nodeName.toLowerCase() === 'a') && (e.attr('href').charAt(0) === '#')) {
          if (event.target) {
            event.preventDefault();
          }
        }

        w.scrollTo(false, sec, 18, w.isNum(target) ? target : ((event.target && target) ? $(target) : e));
      }, 1);
    } else if ((!event) && (typeof obj === 'object') && (w.isNum(step)) && (step >= 0) && ((typeof target === 'object') || (w.isNum(target)))) {
      obj = $(obj);

      if (w.isNum(target)) {
        obj.scrollTop(obj.scrollTop() + (Math.abs(obj.scrollTop() - target) / (step + 1)) * (target < obj.scrollTop() ? -1 : 1));
      } else {
        obj.scrollTop(obj.scrollTop() + (target.offset().top / (step + 1)));
      }

      w.setTimeout(function () {
        w.scrollTo(false, obj, step - 1, target);
      }, 10);
    }
  };

  w.gads = function () {
    return ($('body').attr('data-originador').toLowerCase().trim() === 'gads');
  };

  w.gtag_conversion = function (tipo, data, url) {
    /*
     * NAO CONTABILIZAR SE NÃO FOR GADS, OU SE FOR LOCALHOST OU SE CORDOVA
     */
    if ((!w.gads()) || (C.local) || (w.isCordova())) {
      return false;
    }
    var callback = function () {
      if (typeof (url) != 'undefined') {
        window.location = url;
      }
    };

    /* CONTABILIZA COMO CONVERSÕES APENAS ACÇÕES EXECUTADA A CADA 7 DIAS */
    var lastConvert = _.localStorage.getItem('getag_conversion-' + tipo + '-lastime');
    var timestamp = Math.round((new Date()).getTime() / 1000);
    if ((typeof lastConvert === 'undefined') || (!lastConvert) || (!w.isNum(lastConvert)) || (lastConvert <= 1586304000) || ((w.isNum(lastConvert) && (lastConvert > 1586304000) && (timestamp > (lastConvert + (7 * 24 * 60 * 60)))))) {
      _.localStorage.setItem('getag_conversion-' + tipo + '-lastime', timestamp);
    } else {
      return false;
    }

    data.event_callback = (typeof data.event_callback !== 'function') ? callback : data.event_callback;
    gtag('event', 'conversion', data);
    return false;
  };

  w.gtag_c_calculo = function (url) {
    return w.gtag_conversion('calculo', {'send_to': 'AW-808111354/rB7rCJPW3csBEPqZq4ED'}, url);
  };

  w.gtag_c_vote = function (url) {
    return w.gtag_conversion('voto', {
      'send_to': 'AW-808111354/KU5MCOTJtswBEPqZq4ED',
      'value': 1.0,
      'currency': 'BRL'
    }, url);
  };

  w.gtag_c_share = function (url) {
    return w.gtag_conversion('share', {
      'send_to': 'AW-808111354/aPO9CO3EqcwBEPqZq4ED',
      'value': 1.0,
      'currency': 'BRL'
    });
  };

  w.gtag_c_like = function (url) {
    return w.gtag_conversion('like', {
      'send_to': 'AW-808111354/iQX5CJPGmswBEPqZq4ED',
      'value': 1.0,
      'currency': 'BRL'
    }, url);
  };

  w.like_vote_conversion = function (tipo) {
    if (($('ul.menu li i.fa-thumbs-up.likedo').length === 0) && ($('.starvoto.votado').length === 0)) {
      try {
        if (tipo === 'like') {
          w.gtag_c_like();
        } else if (tipo === 'vote') {
          w.gtag_c_vote();
        }
      } catch (e) {

      }
    }
  };

  w.storeName = function (nome) {
    return 'livrame_calc_' + nome;
  };

  w.storeRaw = function (nome, val, dias) {
    dias = ((w.isNum(dias) && (dias > 0)) || (dias === false)) ? dias : 1;
    var timestamp = Math.round((new Date()).getTime() / 1000);

    if (typeof val !== 'undefined') {
      _.localStorage.setItem(w.storeName(nome), JSON.stringify({
        validade: dias === false ? false : timestamp + (dias * 24 * 60 * 60),
        date: timestamp,
        value: val
      }));
    }

    var r = _.localStorage.getItem(w.storeName(nome));

    if ((typeof r === 'string') && (r.length > 0)) {
      r = JSON.parse(r);
      if ((typeof r === 'object') && (w.has('validade', r)) && (w.has('value', r))) {

        if ((r.validade1 !== false) && (r.validade < timestamp)) {
          _.localStorage.removeItem(w.storeName(nome));
          return null;
        }

        return r;
      }
    }

    return null;
  };

  w.store = function (nome, val, dias) {
    var r = w.storeRaw(nome, val, dias);
    return ((typeof r === 'object') && (w.has('validade', r)) && (w.has('value', r))) ? r.value : undefined;
  };

  w.storeRemove = function (nome) {
    return _.localStorage.removeItem(w.storeName(nome));
  };

  w.storeValidade = function (nome, val, dias) {
    var r = w.storeRaw(nome, val, dias);
    return ((typeof r === 'object') && (w.has('validade', r)) && (w.has('value', r))) ? r.validade : undefined;
  };

  w.storeDate = function (nome, val, dias) {
    var r = w.storeRaw(nome, val, dias);
    return ((typeof r === 'object') && (w.has('validade', r)) && (w.has('value', r))) ? r.date : undefined;
  };

  w.newEL = function (tag, arr) {
    var s = document.createElement(tag);
    if (typeof arr === 'object') {
      s = Object.assign(s, arr);
    }

    return s;
  };

  w.newJs = function (src, arr) {
    arr = (typeof arr === 'object') ? arr : {};
    arr = w.has('type', arr) ? arr : Object.assign(arr, {type: 'text/javascript'});
    arr.src = src;
    $("head").append(w.newEL('script', arr));
  };

  w.newCss = function (href, arr) {
    arr = (typeof arr === 'object') ? arr : {};
    arr.href = href;
    arr.rel = 'stylesheet' /
            $("head").append(w.newEL('script', arr));
  };

  /* https://developers.facebook.com/docs/javascript/quickstart */
  w.fbAsyncInit = function () {
    _.FB.init({
      appId: '2493012747583084',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v6.0'
    });
  };


  w.asyncSetTimeout = function (func, ms) {
    (new Promise(r => setTimeout(async function () {
        func();
      }, ms)));
  };

  /*
   *
   * @param {type} k
   * @param {type} obj
   * @returns {undefined}
   */
  w.has = function (k, obj) {
    try {
      return ((k.trim() !== '') && (((typeof obj === 'object') && (Object.prototype.hasOwnProperty.call(obj, k))) || ((Array.isArray(obj)) && (k in obj))));
    } catch (e) {
      return false;
    }
  };

  _.calculador = function () {};

  (function ($, w, _, C) {
    /*
     * https://ourcodeworld.com/articles/read/390/how-to-know-if-your-application-is-running-in-cordova-or-a-web-browser
     */
    if (!C.has('isCordova', w)) {
      w.isCordova = function () {
        return (C.has('cordova', w) || (typeof _.cordova == "object") || (!!window.cordova) || (document.location.protocol !== "http:" && document.location.protocol !== "https:") || (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1));
      };
    }

    w.shareInfo = {
      facebook: false,
      twitter: false,
      linkedin: false,
      texto: _.share_data.texto,
      url: w.location.protocol + "//" + ((w.location.hostname === 'localhost') ? 'livra.me' : w.location.hostname) + '/',
      hashtag: ["#livrame", "#calculadoraDeInvestimento", "#viverDeRenda", "#viverDaBolsa"],
      fb: function () {
        XLOG('API Facebook carregada!');
        w.shareInfo.facebook = true;
        w.addCallBackSharer();
      },
      tw: function () {
        XLOG('API Twitter carregada!');
      },
      lkin: function () {
        XLOG('API linkedin carregada!');
      }
    };

    w.shareIframeEvents = function () {
      if (!w.shareIframeExists_val) {
        $(w).on('message', w.shareIframe);
      }

      w.shareIframeExists_val = true;
    };

    w.shareIframe = function (e) {
      w.shareIframeRemove();

      if ((typeof e.data === 'object') && (w.has('shareResult', e.data))) {
        if (C.local)
          console.log(e);
        XLOG('Mensagem de ' + e.data.social + ' recebido: ' + (e.data.shareResult ? 'compartilhado' : 'não compartilhado'));

        var el = $('body > div.share.painel.' + e.data.social);

        if (w.iframeModeWindow || (el.length > 0)) {
          el = el[0];

          if (e.data.shareResult) {
            var callback = w.iframeModeWindow ? w.social_callback : el.callback;

            if ((typeof callback === 'function')) {
              callback();
            } else {
              XERROR('Retorno de ' + e.data.social + ' sem callback correspondente!');
            }
          } else {
            var no = w.iframeModeWindow ? w.social_callback_no : el.callback_no;

            if (typeof no === 'function') {
              no();
            } else {
              XWARN('Retorno de ' + e.data.social + ' sem no-callback correspondente!');
            }
          }
        } else {
          XERROR('Retorno de ' + e.data.social + ' sem iframe correspondente!');
        }
      }
    };

    w.limitCalculo = function () {
      var r = (!w.checkMultCalculos() && ((C.incDayCalc(true) >= 7) || (C.incHourCalc(true) >= 3)));

      if (r) {
        $('body').addClass('lmt');
      } else {
        $('body').removeClass('lmt');
      }

      return r;
    };

    w.shareSucess = function (rede, callback) {
      if ((typeof rede === 'string') && (['facebook', 'twitter', 'linkedin'].indexOf(rede) >= 0)) {
        XLOG('Compartilhamento com ' + rede + ' [Efetivado].');

        w.store('share_' + rede, true, 10);

        w.limitCalculo();

        if (typeof callback === 'function') {
          callback(rede);
        }

        w.gtag_c_share();

        w.asyncSetTimeout(function () {
          $.ajax({
            type: 'POST',
            url: ((C.local) ? 'calculo' : w.location.protocol + "//" + w.location.hostname + '/calculo') + '/notify/share',
            data: {'social': rede},
            dataType: 'json'
          });
        }, 1);
      }
    };

    w.shareFacebook = function (callback, no) {
      if (w.shareInfo.facebook) {
        XLOG('Compartilhamento com Facebook selecionado.');

        _.FB.ui({
          method: 'share',
          hashtag: w.shareInfo.hashtag,
          href: w.shareInfo.url,
        }, function (response) {
          if (response && !response.error_message) {
            w.shareSucess('facebook', callback);
          } else if (typeof no === 'function') {
            no();
          }
        });
      }
    };

    /*
     * https://developer.twitter.com/en/docs/twitter-for-websites/web-intents/overview
     * https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/javascript-factory-function
     * https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/javascript-api
     */
    w.shareTwitter = function (callback, no) {
      return w.shareIframeModelo('twitter', callback, no);
    };

    w.shareLinkedin = function (callback, no) {
      return w.shareIframeModelo('linkedin', callback, no);
    };

    w.shareIframeRemove = function () {
      $('body > div.share.painel').remove();
    };

    w.socialWindow = function (url, nome) {
      var width = (window.innerWidth > 360) ? 420 : window.innerWidth;
      var height = (window.innerHeight > 640) ? 640 : window.innerHeight;
      w.open(url, (typeof nome === 'string') ? nome : 'intent', 'status=yes,resizable=yes,location=yes,directories=no,scrollbars=yes,menubar=no,width=' + width + ',height=' + height).focus();
    };

    w.shareIframeModelo = function (social, callback, no) {
      var url = window.location.protocol + "//" + window.location.hostname + ((window.location.hostname === 'localhost') ? '/aposentar/www' : '') + '/social/' + social + '/share';
      w.shareIframeRemove();
      XLOG('Compartilhamento com ' + social + ' selecionado');

      if (w.iframeModeWindow) {
        w.social_callback = function () {
          w.shareSucess(social, callback);
        };
        w.social_callback_no = no;
        w.socialWindow(url);
        return false;
      }

      var div = w.newEL('div', {
        'className': 'share painel ' + social,
        'callback': function () {
          w.shareSucess(social, callback);
        },
        'callback_no': no
      });

      div.append(w.newEL('iframe', {
        'src': url
      }));

      var dcenter = w.newEL('div', {
        className: 'center'
      });

      var btb = w.newEL('div', {
        innerHTML: 'Cancelar',
        className: 'btb',
        click: w.shareIframeRemove
      });

      dcenter.append(btb);
      div.append(dcenter);

      $(div).insertBefore($('body > div.calc_load'));
      $(btb).on('click', w.shareIframeRemove);
    };

    w.sharer = function (callback, no) {
      var el = $(this);

      switch ((el.attr('data-social') + "").trim().toLowerCase()) {
        case 'facebook':
          w.shareFacebook(callback, no);
          break;

        case 'twitter':
          w.shareTwitter(callback, no);
          break;

        case 'linkedin':
          w.shareLinkedin(callback, no);
          break;
      }
    };

    /*
     * ADICIONA O EVENTO CLICK PARA COMPARTILHAMENTO
     */
    w.addCallBackSharer = function (query, callback, no) {
      query = (typeof query === 'string') ? query : '';

      _.sharerCallAddCounter = (w.isNum(_.sharerCallAddCounter) ? _.sharerCallAddCounter : 0) + 1;

      $('.social' + query).not('[callevent]').attr('callevent', _.sharerCallAddCounter);

      $('.social' + query + '[callevent=\'' + _.sharerCallAddCounter + '\']').on('click', function (e) {
        if (this.tagName === 'a') {
          e.preventDefault();
        }
        w.sharer.bind(this)(callback, no);
      });
    };

    w.hideAlerts = function (c) {
      var not = $(".alerte");

      if (not.attr('not') === c) {
        not.removeClass('show');
        $(".alerte > .colunabarra").removeClass('show');
        not.attr('not', '');
      }
    };

    w.changePage = function (e) {
      w.setTimeout(function () {
        $("body > header").removeClass('rolado');
        $('body > section.global.calc input[type=radio]').prop('checked', false);
        w.scrollTo(0, $('body > section.global.calc'), 18, 0);
        w.scrollTo(0, $('body > section.global.main'), 18, 0);
      }, 100);
    };

    w.checkMultCalculos = function (objeto) {
      objeto = (objeto !== 'undefined') ? false : objeto;
      var check = function (nome, on) {
        var x = $('section.global.sharerpage .status .' + nome + ' i');
        if (on) {
          x.removeClass('far');
          x.addClass('fas');
        } else {
          x.removeClass('fas');
          x.addClass('far');
        }
      };

      var p = {
        voto: (parseInt(w.store('voto')) > 3),
        like: w.store('like'),
        facebook: w.store('share_facebook'),
        twitter: w.store('share_twitter'),
        linkedin: w.store('share_linkedin')
      };

      check('like', p.like);
      check('voto', p.voto);
      check('facebook', p.facebook);
      check('twitter', p.twitter);
      check('linkedin', p.linkedin);

      $('table.status tr:first-of-type td:last-of-type').html((p.like || p.voto) ? '<i class="fas fa-check"></i>' : '');
      $('table.status tr:last-of-type td:last-of-type').html((p.facebook || p.twitter || p.linkedin) ? '<i class="fas fa-check"></i>' : '');

      if (objeto) {
        return p;
      }

      var r = ((p.like || p.voto) && (p.facebook || p.twitter || p.linkedin));

      if (r && (typeof C.pending === 'object') && (w.has('this', C.pending))) {
        w.setTimeout(function () {
          C.do.bind($(C.pending)[0])();
        }, 50);
      }

      return r;
    };

    w.postRun = function () {
      w.newJs('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js', {async: true});
      w.newCss('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css', {async: true});

      w.newJs('https://connect.facebook.net/pt_BR/sdk.js?version=v6.0', {async: true, defer: true, 'facebook-jssdk': true, 'onload': w.shareInfo.fb});

      w.newJs('https://www.googletagmanager.com/gtag/js?id=UA-161393901-1', {"async": true});
      /* w.newJs('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {'data-ad-client': 'ca-pub-2864905777530426', "async": true}); */

      w.checkMultCalculos();
      w.shareIframeEvents();
      w.addCallBackSharer();
      w.asyncSetTimeout(w.addCallBackSharer, 500);

      if (!w.isCordova()) {
        w.setTimeout(function () {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', 'UA-161393901-1');
          gtag('config', 'AW-808111354');
        }, 1000);


        w.asyncSetTimeout(function () {
          $.ajax({
            type: 'GET',
            url: '?get=entenda&v=' + $('body').attr('entenda'),
            success: function (response, status) {
              if (status === 'success') {
                if (response.indexOf('<section id=') >= 0) {
                  var referenceNode = $('section.faixa.entenda.replace')[0];
                  if (referenceNode) {
                    $(response).insertBefore($(referenceNode.nextSibling));
                    $('section.faixa.entenda.replace').remove();
                    $('section.splash p.descri').css('display', 'block');
                    w.setTimeout('Zepto(window).resize();', 50);
                  }
                } else {
                  XERROR('Conteúdo explicativo inválido');
                  XDEBUG(response);
                }
              }
            },
            error: function (x) {
              XERROR('Não foi possível baixar conteúdo explicativo!');
            },
            complete: function () {
              XLOG('Conteúdo explicativo baixado.');
            }
          });
        }, 50);
      }
    };

    w.hideErros = function (c) {
      var nots = (typeof c === 'object' || Array.isArray(c)) ? c : ((typeof c === 'string') && (c.trim().length > 0)) ? $(".notifi[not='" + c + "']") : $(".notifi");

      $.each(nots, function (i, not) {
        not = $(not);
        not.removeClass('show');
        $(".notifi > .colunabarra").removeClass('show');
        w.setTimeout(function () {
          not.attr('not', '');
          not.html(' ');
        }, 600);
      });
    };

    w.showErros = function (e, tipo) {
      tipo = ((typeof tipo === 'string') && (tipo.charAt(0) === '.')) ? tipo : '';

      var names = {
        'pm': 'Depósito Mensal',
        'pa': 'Valor da Aposentadoria',
        'nm': 'Tempo de depósito',
        'na': 'Tempo de Aposentadoria',
        'mi': 'Quanto tenho agora',
        'mf': 'Quanto terei',
        'i': 'Rendimento Mensal',
        'ir': 'Imposto de Renda',
        'ca': 'Inflação na Aposentadoria',
        'cm': 'Inflação no Depósito',
        'idade': 'Quantos anos Tenho',
        'idadeap': 'Quero ser livre aos...',
        'rendimento': 'Rentabilidade Padrão'
      };

      var not = $($(".notifi" + tipo + "")[0]);
      not.html('');

      not.attr('not', w.guid());

      /* REMOVE ERROS DUPLICADOS */
      e = e.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });

      for (var i = 0; i < e.length; i++) {
        e[i] = e[i].replace(/\#\{([^\}]+)\}/ig, function (m, c) {
          C.VError(c, true);
          return "'" + names[c] + "'";
        });

        not.append("<div class='colunabarra'>" + e[i] + "</div>");
      }

      $(".notifi" + tipo + " > .colunabarra").on('click', function () {
        w.hideErros(not.attr('not'));
      });

      not.addClass('show');
      $(".notifi" + tipo + " > .colunabarra").addClass('show');

      w.setTimeout(function () {
        window.hideErros([not]);
      }, 5000 + (e.length * 1500));
    };

    w.showAlert = function (e) {
      w.showErros(e, '.alerte');
    };

    $(document).ready(function ($) {
      w.asyncSetTimeout(function () {
        (function (callback) {
          if (w.has('precess_ids', _) && (typeof _.precess_ids === 'function')) {            
            _.precess_ids(function (data) {              
              document.body.innerHTML += data;

              if (typeof _.termo_hist_run === 'function') {
                _.termo_hist_run();
              }

              if (typeof _.termo_main_run === 'function') {
                _.termo_main_run();
              }

              w.setTimeout(function () {
                create_termo_toc();
                callback();
              });
            }, 25);
          } else {
            callback();
          }
        }(function () {
          /* SE PREPARA PARA EVITAR PROBLEMA COM CORDOVA */
          if (w.isCordova()) {
            $('body').removeAttr('data-originador');
            $('body').removeAttr('data-cmpl');
            $('body').removeAttr('data-device-id');
            $('body').addClass('cordova');

            var a = $('a.sobre, a.doe, a.termos, a.avisos, a.avisos, a.anuncie, footer .menulist a');
            for (var i = 0; i < a.length; i++) {
              if (($(a[i]).attr('href').indexOf('http') === -1) && ($(a[i]).attr('href').indexOf('//') === -1)) {
                $(a[i]).attr('href', 'https://livra.me/' + $(a[i]).attr('href'));
                $(a[i]).attr('target', '_blank');
              }
            }
          }

          if ($('section > footer').length > 0) {
            $('section > footer').html(($('section > footer').html() + ' ').replace(/\#\(HOSTNAME\)/ig, window.location.hostname));
          }

          if ($('section.calc').length > 0) {
            $('section.calc').append($('section > footer')[0].outerHTML);
          }

          w.masterheaderFEITO = false;

          $(w).resize(function () {
            w.ajusteMobileVH();
          });

          $('body > section.global').scroll(w._section_scroll);

          $('section.perguntas label').on('click', function () {
            $('section.form div.input').removeClass('error resultado');
            $('section.form input').val('');
            $('section.calc section.resultado').remove();
          });

          $('label.btb.back').on('click', function () {
            $('input[type=radio]').removeAttr('checked');
            $('input.none[type=radio]').attr('checked', true);
          });

          $('[move]').on('click', function (e) {
            w.scrollTo.bind(this)(e);
          });

          $('.calc div.input > input').on('focus', function (e) {
            $(e.target.parentNode).removeClass('error resultado');
          });

          $('.calc div.input.currency > input').on('enter', function (e) {
            $(this).attr('type', 'number');
          });

          $('.calc div.input.currency > input').on('blur', function (e) {
            $(this).attr('type', 'currency');
          });

          $('.calc div.input > input').on('blur', function (e) {
            /* VALIDAR INPUTS */
          });

          $('.calc div.input > input[name=i]').on('blur', function (e) {
            // PV = FV / (1+i)n
            if (C.V('i') > 0) {
              $('.calc div.input > input[name=ia]').val(C.floatCasas((100 * Math.pow(1 + C.V('i'), 12)) - 100, 1));
            } else {
              $('.calc div.input > input[name=ia]').val('');
            }
          });

          $('.calc div.input > input[name=ia]').on('blur', function (e) {
            // PV = FV / (1+i)n
            if (C.V('ia') > 0) {
              $('.calc div.input > input[name=i]').val(C.floatCasas(C.floatCasas((Math.pow(1 + C.V('ia'), 1 / 12) - 1) * 100, 1)));
            } else {
              $('.calc div.input > input[name=i]').val('');
            }
          });

          $('section.calculadora.form div.input > input').on('blur', function (e) {
            C.round(e.target, e.target.getAttribute('name'));
          });

          $('input[type=currency].coin').on('focus', C.coinOnFocus);
          $('input[type=currency].coin').on('blur', C.coinOnBlur);

          $('a[href]').on('click', function (e) {
            w.scrollTo.bind(this)(e);
          });

          $('ul.menu li a[href]').each(function (k, i) {
            $(i).attr('href', $(i).attr('href').replace(/\#\(HOST\)/i, window.location.protocol + "//" + window.location.hostname));
          });

          $('ul.menu li i.fa-play').on('click', function (e) {
            w.changePage.bind(this)(e);
            $('input#calc_show').prop('checked', 1);
          });

          $('ul.menu li i.fa-home').on('click', function (e) {
            w.changePage.bind(this)(e);
            $('input#calc_show').prop('checked', false);
          });

          $('ul.menu li label').on('click', function (e) {
            var a = $("#" + this.parentNode.getId() + " > a");

            if (a.attr('href')) {
              a.click();
            } else {
              if (a.hasClass('start')) {
                w.changePage.bind(this)(e);
                $('input#calc_show').attr('checked', 1);
              } else
              if (a.hasClass('home')) {
                w.changePage.bind(this)(e);
                $('input#calc_show').removeAttr('checked');
              }
            }
          });

          $('input#calc_show').on('change', function (e) {
            w.changePage.bind(this)(e);
          });

          $('ul.menu li i.fa-thumbs-up').on('click', function (e) {
            var el = $(this);

            if (el.hasClass('likedo')) {
              return;
            }

            var pai = $(this.parentNode);
            pai.addClass('conn');

            $.ajax({
              type: 'POST',
              url: '#like',
              data: {'likebtb': $('header.first').attr('code')},
              dataType: 'json',
              success: function (response, status) {
                if (status === 'success') {
                  if (!Array.isArray(response)) {
                    XDEBUG(response);
                    w.showErros(['OPS! Algo o servidor não respondeu direito! Tente novamente mais tarde. Se o erro persistir, por favor nos comunique!']);
                  } else {
                    if (typeof response[0] === 'object') {
                      w.showErros([response[0].ERRO]);
                    } else {
                      $('ul.menu li.likes span').html(response[0]);

                      el.addClass('likedo fas');
                      $('ul.menu li.likes span').addClass('likedo');

                      w.like_vote_conversion('like');
                      w.store('like', true, 7);
                      w.checkMultCalculos();
                    }
                  }
                }
              },
              error: function (x) {
                XDEBUG(x.response);
                w.showErros(['OPS! O servidor está mal educado hoje! Tente novamente mais tarde. Se o erro persistir, por favor nos comunique!']);
              },
              complete: function () {
                XLOG('Requisição Like Concluída.');
                pai.removeClass('conn');
              }
            });
          });

          $('.starvoto > i').on('click', function (e) {
            var pai = $('.starvoto');

            if (pai.hasClass('votado')) {
              return;
            }

            var el = $(this);
            pai.addClass('conn');

            if ((parseInt(el.attr('data-v')) < 4) && (!confirm("Nota " + el.attr('data-v') + ' para o sistema, certeza? :( \nNão é possível mudar a nota depois!'))) {
              return;
            }

            $.ajax({
              type: 'POST',
              url: '#vote',
              data: {'starvoto': $('header.first').attr('code2'), 'nota': el.attr('data-v')},
              dataType: 'json',
              success: function (response, status) {
                if (status === 'success') {
                  if (!Array.isArray(response)) {
                    XDEBUG(response);
                    w.showErros(['OPS! Algo o servidor não respondeu direito! Tente novamente mais tarde. Se o erro persistir, por favor nos comunique!']);
                  } else {
                    if (typeof response[0] === 'object') {
                      w.showErros([response[0].ERRO]);
                    } else {
                      pai.addClass('votado');
                      $('.starvoto > i[data-v="' + (el.attr('data-v')) + '"]').addClass('votado');

                      w.like_vote_conversion('vote');
                      w.store('voto', el.attr('data-v'), 7);
                      w.checkMultCalculos();
                    }
                  }
                }
              },
              error: function (x) {
                XDEBUG(x.response);
                w.showErros(['OPS! O servidor está mal educado hoje! Tente novamente mais tarde. Se o erro persistir, por favor nos comunique!']);
              },
              complete: function () {
                XLOG('Requisição starvoto Concluída.');
                pai.removeClass('conn');
              }
            });
          });

          /* EXECUTAR CALCULO */
          $('div.input > i').on('click', C.do);
          $('.calculadora.form .btb.executar').on('click', C.do);

          $('<img/>').attr('src', 'assets/img/eyJ1cmwiOiJodHRwczovL3B4aGVyZS5jb20vcHQvcGhvdG8vMTQ0NjY2OSIsICJsaWNlbnNlIjogImNjMCIsICJ0aW1lIjoxNTQ5NDA1MjQ5fQ==.jpg').on('load', function () {
            this.remove();

            w.setTimeout(function () {
              $('.__loader').removeClass('show');
              $('body').addClass('showed');

              w.setTimeout(function () {
                $('.__loader').css("display", 'none');
              }, 1000);

              $(w).resize();

              w.setTimeout('Zepto(window).resize();', 100);

              var videos = $('video');
              for (var i = 0; i < videos.length; i++) {
                videos[i].play();
              }

              w.setTimeout(function () {
                $('.__loader').css('display', 'none');
                w.setTimeout(function () {
                  w.showAlert(['Estamos em versão BETA, comunique problemas para <a href="mailto:beta@livra.me">beta@livra.me</a>. Obrigado!']);
                }, 1500);
                w.asyncSetTimeout(w.postRun, 25);
                w.setTimeout('Zepto(window).resize();', 200);
              }, 25);
            }, 25);
          });
        }));
      }, 25);
    });
  }($, w, _, function ($, C, w, _, i18n) {
    var STR = i18n();

    C.local = (window.location.hostname === 'localhost');

    /*
     *
     * @param {type} k
     * @param {type} obj
     * @returns {undefined}
     */
    C.has = function (k, obj) {
      return w.has(k, obj);
    };


    C.A = function (t, a, vlr) {
      t = t.trim().toLowerCase();

      if ((typeof vlr !== "undefined") && (vlr !== null)) {
        $('.calc div.input.' + t + ' > input').attr(a, vlr);
      }

      return parseFloat($('.calc div.' + t + ' > input').attr(a).trim());
    };

    C.VError = function (t, v) {
      t = t.trim().toLowerCase();

      if (v) {
        $('.calc div.input.' + t).addClass('error');
      } else {
        $('.calc div.input.' + t).removeClass('error');
      }
    };

    C.V = function (t, vlr) {
      t = t.trim().toLowerCase();

      if (t === 'origem') {
        return w.location.hostname;
      }

      if (t === 'originador') {
        return $('body').attr('data-originador');
      }

      if ((typeof vlr !== "undefined") && (vlr !== null)) {
        $('.calc div.input.' + t + ' > input').val(vlr);
      }

      if (t === 'rendimento') {
        return $('.rendimento input[name=rendimento]:checked').attr('data-v');
      }

      var temp = ($('.calc div.' + t + ' > input').val() + "").trim();
      temp = (temp === '') ? 0 : temp;

      return parseFloat((['i', 'ca', 'cm', 'ia', 'ir'].indexOf(t) >= 0) ? (temp / 100) : ((['nm', 'na'].indexOf(t) >= 0) ? temp * 12 : ((['mf', 'mi', 'pm', 'pa'].indexOf(t) >= 0) ? C.coinLocalStringToNumber(temp) : temp)));
    };

    C.livre = function () {
      return (['full', 'xai'].indexOf($('input[name=modselect]:checked').val()) >= 0);
    };

    C.getStart = function (c, sum) {
      return (w.isNum(c) ? c : (C.livre()
              ? 0
              : (C.V('idade') + (w.isNum(sum) ? sum : 0))));
    };

    C.chart = function (el, startIn, pontos, title, xm, xa, target, xm_color, xm_bg, xa_color, xa_bg, xm_label, xa_label) {
      startIn = C.getStart(null, startIn);

      el = $(el);

      var dt = [[], []];
      var labels = [];

      for (var i = 0; i < xm.length; i += 12) {
        labels.push(" " + ((i / 12) + startIn) + " ");
        dt[0].push(Math.abs(xm[i]));
        dt[1].push(null);
      }

      if (xa.length > 0) {
        dt[1][dt[1].length - 1] = dt[0][dt[0].length - 1];
      }

      for (var j = 12; j < xa.length; j += 12) {
        labels.push(" " + (((i + j) / 12) + startIn) + " ");
        dt[0].push(null);
        dt[1].push(Math.abs(xa[j]));
      }

      var data = dt;//[[], []];

      var sets = [{
          backgroundColor: xm_bg,
          borderColor: xm_color,
          'data': data[0],
          label: xm_label,
          fill: 'start',
          lineTension: 0.5
        }
      ];

      if (xa.length > 0) {
        sets.push({
          backgroundColor: xa_bg,
          borderColor: xa_color,
          'data': data[1],
          label: xa_label,
          fill: 'start',
          lineTension: 0.5
        });
      }

      C.chartPrint(el, target, title, sets, labels);
    };

    C.chartMultLines = function (el, startIn, title, lines, target, colors, bgs, lbl) {
      startIn = C.getStart(null, startIn);

      el = $(el);

      var dt = [];
      var labels = [];

      for (var k = 0; k < lines.length; k++) {
        dt.push([]);

        for (var i = 0; i < lines[k].length; i++) {
          if (k === 0) {
            labels.push(" " + (i + startIn) + " ");
          }

          dt[k].push(lines[k][i]);
        }
      }

      var sets = [];

      for (var k = 0; k < dt.length; k++) {
        sets.push({
          backgroundColor: bgs[k],
          borderColor: colors[k],
          'data': dt[k],
          label: lbl[k],
          fill: 'start',
          lineTension: 0.5
        });
      }

      C.chartPrint(el, target, title, sets, labels);
    };

    C.chartPrint = function (el, target, title, sets, lbl) {
      el = $(el);
      new _.Chart($('#' + el[0].getId() + ' ' + target)[0].getId(), {
        type: 'line',
        data: {
          labels: lbl,
          datasets: sets
        },
        options: _.Chart.helpers.merge({
          tooltips: {
            intersect: true
          },
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.4,
          spanGaps: false,
          elements: {
            line: {
              tension: 0.5
            }
          },
          plugins: {
            filler: {
              propagate: false
            }
          },
          scales: {
            xAxes: [{
                ticks: {
                  autoSkip: true,
                  maxRotation: 0
                }
              }],
            yAxes: [{
                ticks: {
                  autoSkip: true,
                  maxRotation: 0
                }
              }]
          }
        }, {
          title: {
            text: title,
            display: true
          }
        })
      });
    };

    C.floatCasas = function (c, d) {
      d = w.isNum(d) ? d : 2;
      return parseFloat(parseFloat(c).toFixed(d));
    };

    /*
     *
     * @param {type} r
     * @returns {undefined}
     */
    C.makeTable = function (r) {
      var SEPARADOR = ';';
      var ENDLINE = "\r\n";

      var _row = function (prazo, mes, montante, parcela, rent, capital, lucro, lucro_real) {
        mes = w.isNum(mes) ? mes : '';
        var perlucro = (w.isNum(capital) && w.isNum(lucro) && (capital > 0)) ? w.formatReal(lucro / capital * 100) + '%' : '';
        var perlucroReal = (w.isNum(capital) && w.isNum(lucro_real) && (capital > 0)) ? w.formatReal(lucro_real / capital * 100) + '%' : '';

        montante = w.isNum(montante) ? w.formatReal(montante) : '';
        parcela = w.isNum(parcela) ? w.formatReal(parcela) : '';
        rent = w.isNum(rent) ? w.formatReal(rent) : '';
        capital = w.isNum(capital) ? w.formatReal(capital) : '';
        lucro = w.isNum(lucro) ? w.formatReal(lucro) : '';
        lucro_real = w.isNum(lucro_real) ? w.formatReal(lucro_real) : '';

        return prazo + SEPARADOR + mes + SEPARADOR + montante + SEPARADOR + parcela + SEPARADOR + capital + SEPARADOR + rent + SEPARADOR + lucro + SEPARADOR + perlucro + SEPARADOR + lucro_real + SEPARADOR + perlucroReal + ENDLINE;
      };

      var CSV = 'Prazo' + SEPARADOR + 'Mês' + SEPARADOR + 'Montante' + SEPARADOR + 'Parcela' + SEPARADOR + 'Capital' + SEPARADOR + 'Rentabilidade' + SEPARADOR + 'Lucro Nominal' + SEPARADOR + '% Lucro Nominal' + SEPARADOR + 'Lucro Desinflacionado' + SEPARADOR + '% Lucro Desinflacionado' + ENDLINE;

      for (var j = 0; j < 2; j++) {
        var p = (j === 0) ? (C.has('pm', r) ? r.pm : []) : (C.has('pa', r) ? r.pa : []);
        var x = (j === 0) ? (C.has('xm', r) ? r.xm : []) : (C.has('xa', r) ? r.xa : []);
        var a = (j === 0) ? (C.has('am', r) ? r.am : []) : (C.has('aa', r) ? r.aa : []);
        var l = (j === 0) ? (C.has('lm', r) ? r.lm : []) : (C.has('la', r) ? r.la : []);
        var re = (j === 0) ? (C.has('rm', r) ? r.rm : []) : (C.has('ra', r) ? r.ra : []);
        var v = (j === 0) ? (C.has('vm', r) ? r.vm : []) : (C.has('va', r) ? r.va : []);

        if (j === 0) {
          CSV += _row('Período de Capitalização');
        } else {
          CSV += _row('Período de Descapitalização');
        }

        for (var i = 0; i < x.length; i++) {
          if (i % 12 === 0) {
            CSV += _row("Ano " + Math.round(((i / 12) + 1) + ((j === 1) ? ((C.has('pm', r, ) ? r.pm.length : 0) / 12) : 0)));
          }

          CSV += _row(
                  i + 1 + ((j === 1) ? (C.has('pm', r, ) ? r.pm.length : 0) : 0),
                  i + 1,
                  x[i],
                  p[i],
                  re[i],
                  a[i],
                  l[i],
                  v[i]
                  );
        }

        CSV += _row(
                i + 1 + (C.has('pm', r, ) ? r.pm.length : 0),
                i + 1,
                x[i - 1] - Math.abs(p[i - 1])
                );
      }


//Generate a file name
      var fileName = "TabelaDeFluxo";

      //Initialize file format you want csv or xls
      var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

      // Now the little tricky part.
      // you can use either>> window.open(uri);
      // but this will not work in some browsers
      // or you will not get the correct file extension

      //this trick will generate a temp <a /> tag
      var link = document.createElement("a");
      link.href = uri;

      //set the visibility hidden so it will not effect on your web-layout
      link.style = "visibility:hidden";
      link.download = fileName + ".csv";

      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    C.titleMod = function (r, mod) {
      if (mod === 1) {
        var src = r[2].img;
        var title = r[2].name;
        var descri = r[2].descri;
      } else {
        var src = false;
        var title = 'Minha Solicitação';
        var descri = '';
      }

      return "<div class='titlemod'>\
      " + (mod ? "<div class='sugest'><span>SUGESTÃO | PATROCINADO</span></div><br />" : '') + "\
      " + (src ? "<img src='" + src + "' />" : "") + "\
      <h3>" + title + "</h3>\
      " + (descri ? "<p>" + descri + "</p>" : "") + "\
      </div>";
    };

    C.likethis = function () {
      var text = "Eu descobri quando e como ser livre financeiramente, e você? %E2%80%94 ";
      var link = window.location.protocol + "//" + window.location.hostname;
      var f = "https://facebook.com/sharer/sharer.php?u=" + link + "&quote=" + text;
      var t = "https://twitter.com/share?url=" + link + "&text=" + text;
      var l = "https://www.linkedin.com/shareArticle?mini=true&url=" + link + "&title=Livra.me&summary=" + text + "&source=";
      var w = "https://api.whatsapp.com/send?text=" + text + link;

      return "<div class='likethis'>\
        <h6>Isso te ajudou?</h6>\
        <a class='social doe btb fas fa-hand-holding-usd' href='" + ((C.local) ? '' : '/') + "doe' target='_blank'><span>Doe</span></a><div data-social='facebook' class='social facebook btb fab fa-facebook-f'></div><div data-social='twitter' class='social twitter btb fab fa-twitter'></div><div data-social='linkedin' class='social linkedin btb fab fa-linkedin-in'></div><a href='" + w + "' target='_blank' class='social whats btb fab fa-whatsapp'></a>\
        " + ('') + "\
        </div>";
    };

    C.mount = function (fullresult, r, el, imode) {
      if (typeof r !== 'object') {
        return;
      }

      var result_html = '<div class="result ' + el + '"><div class="mainpanel colunabarra"></div></div>';
      var table_html = '<div class="table ' + el + '"><div class="mainpanel colunabarra"></div></div>';
      var graficos_html = '<div class="graficos ' + el + '"><div class="charts"><div class="montante"><canvas></canvas></div><div class="parcelas"><div class="depositos"><canvas></canvas></div><div class="retiradas"><canvas></canvas></div></div><div class="oscilacao"><canvas></canvas></div></div><label for="show_table_' + el + '" class="fas fa-table btb config show_table"><span class="fontpadrao">Tabela CSV/Excel</span></label></div>';

      var resultado = $("section.calc > section.resultado." + el + " > .colunabarra");

      if (resultado.length === 0) {
        $("section.calc > .form").after('<section class="calculadora resultado ' + el + '"><div class="mainpanel colunabarra"></div></section>');
        resultado = $("section.calc > section.resultado." + el + " > .colunabarra");
      }

      resultado.html('<input id="show_table_' + el + '" type="checkbox" class="show_table ' + el + '" />' + result_html + graficos_html + table_html);

      var graficos = $("section.calc > section.resultado." + el + " > .colunabarra div.graficos");

      var table = $("section.calc > section.resultado." + el + " > .colunabarra div.table");

      if (table.length === 0) {
        $("section.calc > .graficos." + el).after();
        table = $("section.calc > section.resultado." + el + " > .colunabarra div.table");
      }

      table.html('');

      $('#' + graficos[0].getId() + ' label.show_table.btb').on('click', function () {
        if (table.html() === '') {
          C.makeTable(r, table);
        }
      });


      //    (el, pontos, xm, xa, target, xm_color, xm_bg, xa_color, xa_bg, xm_label, xa_label) {
      if ((C.has('pm', r)) || (C.has('pa', r))) {
        C.chart(graficos, null, 5, 'Montante', C.has('xm', r) ? r.xm : [], C.has('xa', r) ? r.xa : [], '.charts .montante > canvas', 'rgba(43,146,219,1)', 'rgba(43,146,219,.5)', 'rgba(211,100,132,1)', 'rgba(211,100,132,.5)', 'Acumulado no Depósito', 'Acumulado na Aposentadoria');
        C.chart(graficos, null, 5, 'Parcela', C.has('pm', r) ? r.pm : [], [], '.charts .depositos > canvas', 'rgba(43,146,219,1)', 'rgba(43,146,219,0)', null, null, 'Depósito', '');
      }

      if (C.has('pa', r)) {
        C.chart(graficos, Math.round(((C.has('pm', r)) ? r.pm.length : 0) / 12), 5, 'Parcela', r.pa, [], '.charts .retiradas > canvas', 'rgba(211,100,132,1)', 'rgba(211,100,132,0)', null, null, 'Aposentadoria', '');
      }

      /* TABELA COMPARATIVA DE JUROS, INFLACAO E RENTABILIDADE */
      var renta = {j: [], c: [], r: []};
      var p1 = ['pm', 'pa'];
      var p2 = ['cm', 'ca'];
      var continus = 0;

      for (var v = 0; v < p1.length; v++) {
        if (C.has(p1[v], r)) {
          for (var i = 0; i < (r[p1[v]].length / 12); i++) {
            renta.j.push(C.floatCasas((Math.pow(C.FV(1, r.i, 12), i + continus + 1) - 1) * 100, 2));
            renta.c.push(C.floatCasas((Math.pow(r[p2[v]] + 1, i + continus + 1) - 1) * 100, 2));
            renta.r.push(C.floatCasas(renta.j[renta.j.length - 1] - renta.c[renta.c.length - 1], 4));
          }

          continus = i;
        }
      }

      C.chartMultLines(graficos, null, '% Rentabilidade x % Inflação', [renta.j, renta.c, renta.r], '.charts .oscilacao > canvas', ['rgba(43,146,219,1)', 'rgba(211,100,132,1)', 'rgba(81, 176, 83, 1)'], ['rgba(43,146,219,0)', 'rgba(211,100,132,.0)', 'rgba(81, 176, 83, 0)'], ['Rentabilidade', 'Inflacção', 'Rentabilidade Real']);

      var mod = $('input[name=modselect]:checked').val().trim().toLowerCase();
      mod = (mod === 'full') ? fullresult[3] : mod;

      var FRASE = (mod === 'pm') ? ((C.has('pa', r) ? STR.pm.pa : STR.pm.xai))
              : ((mod === 'pa') ? ((C.V('pm') > 0) ? STR.pa.pm : STR.pa.mi) : STR[mod]
                      );

      if (mod === 'nma') {
        FRASE = ((C.has('naoda', r) && r.naoda) ? STR.nma_falha : STR.nma_sucesso) + FRASE;
      }

      if (mod === 'nmo') {
        FRASE = ((C.has('naoda', r) && r.naoda) ? STR.nmo_falha : ((fullresult[3] === 'nmo') ? STR.nmo2 : STR.nmo));
      }

      $('#' + resultado[0].getId() + ' div.result').html(C.titleMod(fullresult, imode) + w.strReplace(FRASE, {
        pa: C.V('ir') > 0 ? C.remakeVlrIR(C.V('pa'), C.V('ir')) : C.V('pa'),
        pai: C.has('pa', r) ? r.pa[0] : '',
        paf: C.has('pa', r) ? r.pa[r.pa.length - 1] : '',
        na: C.getStart(null, C.has('pm', r) ? Math.round((C.has('nmtotal', r) ? r.nmtotal : r.pm.length) / 12) : 0) + (C.has('pa', r) ? Math.round((C.has('natotal', r) ? r.natotal : r.pa.length) / 12) : 0),
        pm: C.has('pm', r) ? r.pm[0] : '',
        nm: (C.has('pm', r) ? C.getStart(null, C.has('pm', r) ? Math.round((C.has('nmtotal', r) ? r.nmtotal : r.pm.length) / 12) : 0) : ''),
        na_exclusivo: C.has('pa', r) ? Math.round(r.pa.length / 12) : '',
        cm: C.has('cm', r) ? r.cm : '',
        ca: C.has('ca', r) ? r.ca : '',
        xai: C.has('xm', r) ? r.xm[r.xm.length - 1] : (C.has('xa', r) ? r.xa[0] : ''),
        xaf: C.has('xa', r) ? r.xa[r.xa.length - 1] : '',
        xmf: C.has('xm', r) ? (C.V('ir') > 0 ? C.remakeVlrIR(r.xm[r.xm.length - 1], C.V('ir')) : r.xm[r.xm.length - 1]) : '',
        mi: C.V('mi'),
        mf: C.V('mf'),
        paa: (C.has('pa', r) && C.has('cm', r)) ? C.descapitalizar(r.pa[0], r.cm, Math.round((C.has('pm', r) ? r.pm.length : r.xm.length) / 12)) : '',
        pacor: C.has('npa', r) ? r.npa : 'paa',
        xmff: (C.has('xm', r) && C.has('cm', r)) ? C.descapitalizar(r.xm[r.xm.length - 1], r.cm, Math.round((C.has('pm', r) ? r.pm.length : r.xm.length) / 12)) : '',
        to: C.has('target', r) ? r.target : '',
        descap: C.has('descap', r) ? r.descap : ''
      }, C.likethis()));

      w.setTimeout(function () {
        w.addCallBackSharer();
      }, 250);

      w.setTimeout(function () {
        w.addCallBackSharer();
      }, 750);
    };

    w.formatReal = function (v) {
      return C.floatCasas(v).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    };


    w.strReplace = function (str, p, banner) {
      while ((new RegExp('\\$\\{(\\w+)(\\(([^|]+)\\|([^\\)]+)\\))?\\}', 'ig')).test(str)) {
        str = str.replace(new RegExp('\\$\\{(\\w+)(\\(([^|]+)\\|([^\\)]+)\\))?\\}', 'ig'), function (match, p1, p2, p3, p4, offset, string) {
          if (p1 === 'banner') {
            return banner;
          }

          /* TROCA POR INDICE DO VETOR */
          var np = w.isNum(p[p1]) ? p[p1] : p[p[p1]];
          np = (p1 == 'nm' && !np) ? (C.V('nm') / 12) : np;
          var vlr = Math.abs(parseFloat(np));
          vlr = ((p1 == 'na') || (p1 == 'nm') || (p1 == 'na_exclusivo')) ? (vlr + " anos") : (
                  w.formatReal((((p1 == 'i') || (p1 == 'ca') || (p1 == 'cm')) ? vlr * 100 : vlr), 2)
                  );

          return (((typeof p3 !== 'undefined') && (typeof p4 !== 'undefined')) ? (!C.livre() ? p4 : p3) + " " : "") + "<span class='vlr'>" + vlr + "</span>";
        });
      }

      return str;
    };

    C.processResult = function () {
      try {
        if (Array.isArray(w.resultado) && (w.resultado.length > 0)) {
          if (C.local) {
            XLOG(w.resultado);
          }

          var erro = [];
          for (var i = 0; i < w.resultado.length; i++) {
            if (w.resultado[i].hasOwnProperty('ERRO')) {
              erro = erro.concat(w.resultado[i].ERRO);
            }
          }

          if (erro.length > 0) {
            w.showErros(erro);
          } else {
            /* INDIVIDUAL O CALCULO? BOTAO ESPECIFICO? */
            if (w.resultado[3]) {
              XLOG("Requisição de botão específico.");

              var input = $("section.form div.input > input[f=" + (((w.resultado[3] === 'nmo') || (w.resultado[3] === 'nma')) ? 'nm' : w.resultado[3]) + ']');
              $(input[0].parentNode).addClass('resultado');

              switch (input.attr('f').trim().toLowerCase()) {
                case 'pm':
                  input.val(Math.abs(w.resultado[0].pm[0]));
                  break;

                case 'nm':
                  input.val(Math.round(w.resultado[0].pm.length / 12));
                  break;

                case 'pa':
                  input.val(Math.abs(w.resultado[0].pa[0]));
                  break;

                case 'na':
                  input.val(Math.round(w.resultado[0].pa.length / 12));
                  break;

                case 'mi':
                  input.val(Math.abs(w.resultado[0].xa[0]));
                  break;

                case 'mf':
                  input.val(Math.abs(w.resultado[0].xm[w.resultado[0].xm.length - 1]));
                  break;
              }

              $(['pm', 'pa', 'mi', 'mf']).each(function (k, i) {
                C.coinOnBlur($("section.form div.input > input[f=" + i + "]")[0]);
              });
            }

            /* TEM QUE SER DEPOIS DO PREENCHIMENTO DA SOLUÇÃO */
            for (var i = 0; i < 2; i++) {
              C.mount(w.resultado, w.resultado[i], 'mod' + (i + 1), i);
            }
          }
        }

        w.setTimeout(function () {
          $('body').removeClass('calcing');

          /* w.resultado[3] indica se foi executado por um botacao especifico */
          //if (Array.isArray(w.resultado) && (w.resultado.length > 0) && (!w.resultado[3])) {
          w.scrollTo($('div.result.mod2')[0]);
          //}
        }, 200);
      } catch (e) {
        w.showErros(['[PR] Que feio! Não estávamos preparados para este tipo de erro. Se o erro persistir, por favor nos avise!']);
        $('body').removeClass('calcing');
        throw e;
      }
    };

    C.descapitalizar = function (xf, i, t) {
      if (i > 0) {
        return xf / Math.pow(1 + i, t);
      }

      return xf;
    };

    C.validateFields = function () {
      var fail = [];

      $.each($('section.calculadora.form div.input > input'), function (k, e) {
        C.round(e, C.V(e.getAttribute('name')));
      });

      return fail;
    };

    C.round = function (e, v) {
      if (v < 0) {
        fail.push('Não é permitido informar valores negativos em nenhum dos campos!');
        $(e.parentNode).addClass('error');
      } else
      if (v > 0) {
        if (['ir', 'ia', 'i', 'ca', 'cm'].indexOf(e.getAttribute('name').trim().toLowerCase()) >= 0) {
          $(e).val((v * 100).toFixed(1));
        } else {
          $(e).val(Math.round(C.floatCasas(C.coinLocalStringToNumber($(e).val()))));
        }
      }
    };

    C.coinLocalStringToNumber = function (s) {
      return parseFloat(String(s).replace(/[^0-9,\-]+/g, ""));
    };

    C.coinOnFocus = function (e) {
      var value = e.target.value;
      e.target.value = value ? C.coinLocalStringToNumber(value) : '';
    };

    C.coinOnBlur = function (e) {
      e = e.target ? e.target : e;
      var value = e.value;

      const options = {
        maximumFractionDigits: 2,
        currency: 'BRL',
        style: "currency",
        currencyDisplay: "symbol"
      };

      e.value = value
              ? C.coinLocalStringToNumber(value).toLocaleString(undefined, options)
              : '';
    };

    /*
     * @param   x0    float   o montante inicial
     * @param   i     float   taxa a.m. de atualizacao (rendimento) do montante
     * @param   t    float   o numero de meses *
     */
    C.FV = function (x0, i, t) {
      return x0 * Math.pow(1 + i, t);
    };

    C.incDayCalc = function (readonly) {
      if (!readonly) {
        var count = 0;
        var data = C.storeDate('count_day');

        if (w.isNum(data) && (data > 0)) {
          data = (new Date(data * 1000)).getDate();

          if ((new Date()).getDate() === data) {
            count = C.store('count_day');
            count = w.isNum(count) ? count : 0;
          }
        }

        C.store('count_day', count + 1, 1);
      }

      return C.store('count_day');
    };

    C.incHourCalc = function (readonly) {
      if (!readonly) {
        var count = 0;
        var data = C.storeDate('count_hours');

        if (w.isNum(data) && (data > 0)) {
          data = (new Date(data * 1000)).getHours();

          if ((new Date()).getHours() === data) {
            count = C.store('count_hours');
            count = w.isNum(count) ? count : 0;
          }
        }

        C.store('count_hours', count + 1, 1 / 24);
      }

      return C.store('count_hours');
    };

    C.do = function () {
      if (w.limitCalculo()) {
        C.pending = this.getId();
        return false;
      }

      C.pending = false;

      $('.calc div.input').removeClass('error');
      $('.calc div.input').removeClass('resultado');

      var err = C.validateFields();

      if (err.length > 0) {
        w.showErros(err);
        return;
      }

      var modo = '';
      var individual = false;

      if ($(this).hasClass('executar')) {
        modo = $('input[name=modselect]:checked').val();
      } else {
        var div = $(this)[0].parentNode;
        var input = $("#" + div.getId() + " > input");
        individual = modo = input.attr('f');
      }

      var r = null;

      /* TRATANDO OS CAMPOS IDADE */
      if (((C.V('idade') + "").trim().length > 1) && ((C.V('idadeap') + "").trim().length > 1)) {
        C.V('nm', C.V('idadeap') - C.V('idade'));
      }

      if (C.V('nm') < 0) {

      }

      /* REMOVE O EFEITO DE PISCA-PISCA DOS CAMPOS */
      $('section.form div.input').removeClass('resultado');

      w.resultado = null;

      switch (modo) {
        case 'pm':
          C.pm(individual);

          break;

          /* OBJETIVO */
        case 'nmo':
          C.nmo(individual ? 'nmo' : false);

          break;

          /* APOSENTADORIA */
        case 'nma':
          C.nma(individual ? 'nma' : false);

          break;

          /* IDENTIFICA QUAL DOS DOIS, OBJETIVO OU APOSENTADORIA (nmo/nma) */
        case 'nm':
          if ((C.V('pa') > 0) && (C.V('na') > 0)) {
            C.nma(individual ? 'nma' : false);
          } else {
            C.nmo(individual ? 'nmo' : false);
          }

          break;

        case 'pa':
          C.pa(individual);

          break;

        case 'na':
          C.na(individual);

          break;

        case 'mi':
          C.xai(individual);
          break;

        case 'mf':
          C.fv(individual);
          break;

        case 'xai':
          C.xai(individual);

          break;

        case 'xmf':
          C.fv(individual);

          break;
      }
    };

    C.remakeVlrIR = function (vlr, ir) {
      return vlr / (1 - ir);
    };

    C.pdrCall = function (i, f, p, checker, callback) {
      var fields = ['pm', 'nm', 'pa', 'na', 'mi', 'mf'];
      p.push({modo: i});

      /* LIMPA OS CAMPOS QUE NÃO SERÃO USADOS */
      for (var j = 0; j < fields.length; j++) {
        if (p.indexOf(fields[j]) < 0) {
          if (((fields[j] !== 'nm') && (fields[j] !== 'na')) || (((fields[j] === 'nm') || (fields[j] !== 'na')) && (p.indexOf('idade') < 0) && (p.indexOf('idadeap') < 0))) {
            C.V(fields[j], '');
          }
        }
      }

      var err = checker(C.V, i, false);

      if (err && (err.length > 0)) {
        w.showErros(err);
      } else {
        return C.calc([i], f, p, callback);
      }
    };

    C.nmo = function (i) {
      return C.pdrCall(i, 'nmx', ['mi', 'mf', 'i', 'cm', 'pm', 'ir', {corrigir: 1}, {idade: C.V('idade')}], _.FC.prepare.nmx);
    };


    C.nma = function (i) {
      return C.pdrCall(i, 'nmflex', [{idade: C.V('idade') * 12}, 'mi', 'na', 'i', 'cm', 'pm', 'ca', 'pa', 'ir', {start: C.V('idade') * 12}], _.FC.prepare.nmflex);
    };

    C.na = function (i) {
      return C.pdrCall(i, 'na', ['mi', 'i', 'cm', 'pm', 'nm', 'ca', 'pa', 'ir'], _.FC.prepare.na);
    };

    C.xai = function (i) {
      return C.pdrCall(i, 'xai', ['mf', 'i', 'ca', 'pa', 'na', 'ir'], _.FC.prepare.xai, function (r) {
        w.resultado = [];

        /* CONER PM/M TO PA/XA */
        for (var i = 0; i < r.length; i++) {
          if (i < 2) {
            w.resultado.push({
              xa: r[i].xm,
              pa: r[i].pm,
              i: r[i].i,
              ca: r[i].cm,
              ir: r[i].ir
            });
          } else {
            w.resultado.push(r[i]);
          }
        }
      });
    };

    C.pa = function (i) {
      return C.pdrCall(i, 'pa', ['mi', 'i', 'cm', 'ca', 'na', 'pm', 'nm'], _.FC.prepare.pa);
    };

    C.pm = function (i) {
      return C.pdrCall(i, 'pm', ['mi', 'i', 'cm', 'nm', 'ca', 'na', 'pa', 'mf', 'ir'], _.FC.prepare.pm);
    };

    C.fv = function (i) {
      return C.pdrCall(i, 'fv', ['mi', 'i', 'cm', 'pm', 'nm'], _.FC.prepare.fv);
    };

    C.paramMake = function (list) {
      var p = {};

      for (var i = 0; i < list.length; i++) {
        if (list[i] === 'na') {
          p[list[i]] = ((C.V('na') === 0) && (C.V('idadeap') > 0)) ? ((100 * 12) - (C.V('idadeap') * 12)) : C.V('na');
        } else if (typeof list[i] === 'object') {
          p = Object.assign(p, list[i]);
        } else {
          p[list[i]] = C.V(list[i]);
        }
      }

      if (list.indexOf('ir') >= 0) {
        if (list.indexOf('pa') >= 0) {
          p.pa = C.remakeVlrIR(p.pa, p.ir);
        }

        if (list.indexOf('mf') >= 0) {
          p.mf = C.remakeVlrIR(p.mf, p.ir);
        }
      }

      p.rendimento = $('.rendimento input[name=rendimento]:checked').attr('data-v');
      p.originador = $('body').attr('data-originador');
      p.origem = w.isCordova() ? 'cordova' : w.location.hostname;

      return p;
    };

    C.storeValidade = function (nome, val, dias) {
      return w.storeValidade(nome, val, dias);
    };

    C.storeDate = function (nome, val, dias) {
      return w.storeDate(nome, val, dias);
    };

    C.store = function (nome, val, dias) {
      var r = null;

      if ((typeof val !== 'undefined') &&
              (!((Array.isArray(val)) && (((val[0].hasOwnProperty('ERRO') && (val[0].ERRO.length > 0))) || ((val[1].hasOwnProperty('ERRO') && (val[1].ERRO.length > 0))))))
              ) {
        r = w.store(nome, val, dias);
      } else {
        r = w.store(nome);
      }

      if (C.local) {
        return r;
      }

      return null;
    };

    C.deviceIdentificado = function () {
      var codigo = _.localStorage.getItem('user_device_id');
      return ((typeof codigo !== 'string') || (codigo.trim().length < 32)) ? 0 : 1;
    };

    C.deviceID = function () {
      if (!C.deviceIdentificado()) {
        codigo = $('body').attr('data-device-id');
        codigo = ((typeof codigo !== 'string') || (codigo.trim().length < 32)) ? (Math.round((new Date()).getTime() / 1000) + '-' + w.guid()) : codigo;
        codigo = codigo.trim();
        _.localStorage.setItem('user_device_id', codigo);
      }

      return _.localStorage.getItem('user_device_id');
    };

    C._novoUsuario = function (nome, dias) {
      var timestamp = Math.round((new Date()).getTime() / 1000);
      var registrado = _.localStorage.getItem(nome);

      var retorno = 0;

      if ((typeof registrado === 'undefined') || (!registrado) || (!w.isNum(registrado)) || (registrado <= 1586304000) || ((w.isNum(registrado) && (registrado > 1586304000) && (timestamp > (registrado + (dias * 24 * 60 * 60)))))) {
        _.localStorage.setItem(nome, timestamp);
        retorno = 1;
      }

      return retorno;
    };

    C.novoUsuarioSemana = function () {
      return C._novoUsuario('novoUsuarioSemana', 7);
    };

    C.novoUsuarioMes = function () {
      return C._novoUsuario('novoUsuarioMes', 30);
    };

    C.save = function (p, valor) {
      var id = {};

      $.each([
        'fname',
        'pm',
        'pa',
        'nm',
        'na',
        'mi',
        'mf',
        'i',
        'ir',
        'ca',
        'cm',
        'start',
        'idade',
        'idadeap',
        'rendimento',
        'modo'
      ], function (i, b) {
        if (b in p) {
          id[b] = p[b];
        }
      });

      var hash = C.genId(JSON.stringify(id));

      var r = C.store(hash, valor, .05);

      if (typeof r === 'string') {
        r = JSON.parse(r);
      }

      return r;
    };

    C.genId = function (t) {
      return 'c' + w.md5(t);
    };

    C.calc = function (i, f, p, callback, append, showed) {
      if (showed !== true) {
        $('body').addClass('calcing');
        w.setTimeout(function () {
          C.calc(i, f, p, callback, append, true);
        }, 20);

        return;
      }

      p = C.paramMake(p);
      w.resultado = [];
      append = (typeof append === 'object') ? append : {};

      var command = Object.assign({fname: f}, p, append);
      var pval = C.save(command);

      if (Array.isArray(pval) && (pval.length > 2)) {
        w.resultado = pval;
        w.setTimeout(C.processResult, 20);
      } else {
        XLOG('Solicitando cálculo ao servidor...');

        command.originador = $('body').attr('data-originador');
        command.cmpl = $('body').attr('data-cmpl');
        command.novo_semana = C.novoUsuarioSemana();
        command.novo_mes = C.novoUsuarioMes();
        command.device_novo = C.deviceIdentificado() ? 0 : 1;
        command.device_id = C.deviceID();

        $.ajax({
          type: 'POST',
          url: (C.local) ? 'calculo' : w.location.protocol + "//" + w.location.hostname + '/calculo' + '/' + w.guid(),
          data: command,
          dataType: 'json',
          timeout: 1000 * 90,
          success: function (response, status) {
            if (status === 'success') {
              if (!Array.isArray(response)) {
                try {
                  var c = JSON.parse(response);
                  response = c;
                } catch (e) {

                }
              }

              if (!Array.isArray(response)) {
                if ((typeof response === 'object') && (C.has('ERRO', response))) {
                  w.showErros(response.ERRO);
                } else {
                  if (C.local) {
                    XDEBUG(typeof response);
                    XDEBUG(response);
                  }
                  w.showErros(['[RESP-E] OPS! Algo o servidor não respondeu direito! Tente novamente mais tarde. Se o erro persistir, por favor nos comunique!']);
                }
              } else {
                C.save(command, response);

                w.gtag_c_calculo();

                /* INCREMENTA A COTAGEM DE CALCULOR POR DIA E POR HORA */
                C.incDayCalc();
                C.incHourCalc();

                if (typeof callback === 'function') {
                  callback(response.concat(i));
                } else {
                  w.resultado = response.concat(i);
                }
              }
            }
          },
          error: function (e, x) {
            if (C.local) {
              XDEBUG(x);
              XDEBUG(e);
            }
            w.showErros(['[AJAX-E] OPS! O servidor está mal educado hoje! Tente novamente mais tarde. Se o erro persistir, por favor nos comunique!']);
          },
          complete: function () {
            XLOG('Requisição Concluída.');
            w.setTimeout(C.processResult, 20);
          }
        });
      }
    };

    return C;
  }($, _.calculador, w, _, function (lang) {
    return {
      pm: {
        pa: "<p class='azul'>Necessário depositar <span class='pm'>R$ ${pm}</span> mensalmente.</p>\
        <p class='pequeno'>Por causa da inflação, o valor da aposentadoria que hoje é <span class='pa'>R$ ${pa}</span> bruto, será aos <span class='nm'>${nm}</span>, <span class='pa'>R$ ${pai}</span>.</p>\
        <p class='pequeno red enfase'>Para aposentar com <span class='pa'>R$ ${pai}</span> mensais <span class='na'>${na(por|até os)}</span>,\
           será necessário juntar <span class='pm'>R$ ${pm}</span> mensalmente <span class='nm'>${nm(durante|até os)}</span>, corrigindo o depósito em <span class='cm'>${cm}%</span> a.a..</p>\
           <p class='pequeno'>A aposentadoria será corrigida à <span class='cm'>${ca}%</span> a.a., terminando em <span class='pa'>R$ ${paf}</span> mensais.</p>\
           <p class='pequeno'>Com <span class='nm'>${nm}</span> terá juntado <span class='pa'>R$ ${xai}</span> e, terminará a aposentadoria com <span class='pa'>R$ ${xaf}</span>.</p>\
  ",
        xai: "<p class='azul'>Necessário depositar <span class='pm'>R$ ${pm}</span> mensalmente.</p><p class='pequeno'>Por causa da inflação, o valor que hoje é <span class='pa'>R$ ${mf}</span> será em <span class='nm'>${nm}</span>, <span class='xa'>R$ ${xai}</span>.</p>\
        <p class='pequeno red enfase'>Para alcançar <span class='xa'>R$ ${xai}</span> <span class='na'>${na(por|até os)}</span>,\
           será necessário juntar <span class='pm'>R$ ${pm}</span> mensalmente <span class='nm'>${nm(durante|até os)}</span>, corrigindo o depósito em <span class='cm'>${cm}%</span> a.a..</p>"
      },
      xmf: "<p>Juntarei <span class='xa'>R$ ${xai}</span>.</p>${banner}\
            <p class='pequeno'>Juntando <span class='pm'>R$ ${pm}</span> mensamente <span class='nm'>${nm(durante|até os)}</span>, com correção anual de <span class='cm'>${cm}%</span>, será possível atingir <span class='xa'>R$ ${xai}</span>.</p> ",
      mf: "<p>Juntarei <span class='xa'>R$ ${xai}</span>.</p>${banner}\
            <p class='pequeno'>Juntando <span class='pm'>R$ ${pm}</span> mensamente <span class='nm'>${nm(durante|até os)}</span>, com correção anual de <span class='cm'>${cm}%</span>, será possível atingir <span class='xa'>R$ ${xai}</span>.</p> ",

      mi: "<p>Preciso ter agora <span class='xa'>R$ ${xai}</span>.</p>${banner}\
           <p class='pequeno'>A aposentadoria será corrigida à <span class='cm'>${ca}%</span> a.a., terminando em <span class='pa'>R$ ${paf}</span> mensais.</p>\
           <p class='pequeno'>Iniciando com <span class='pa'>R$ ${xai}</span> terminarei a aposentadoria com <span class='pa'>R$ ${xaf}</span>.</p>",
      pa: {
        pm: "<p>Aposentarei com <span class='pa'>R$ ${paa}</span>.</p>${banner}\
            <p class='pequeno red enfase'>Juntando <span class='pm'>R$ ${pm}</span> mensamente <span class='nm'>${nm(durante|até os)}</span>, com correção anual de <span class='cm'>${cm}%</span>, será possível aposentar com <span class='pa'>R$ ${paa}</span> mensais, valor de hoje, <span class='na'>${na(por|até os)}</span>\
            <p class='pequeno'>Por causa da inflação, o valor da aposentadoria que hoje é <span class='pa'>R$ ${paa}</span>, <span class='nm'>${nm(em|aos)}</span> será de <span class='pa'>R$ ${pai}</span>.</p>\
            <p class='pequeno'>A aposentadoria será corrigida à <span class='cm'>${ca}%</span> a.a., terminando em <span class='pa'>R$ ${paf}</span> mensais.</p>\
        ",
        mi: "<p>Com <span class='mi'>R$ ${mi}</span> será possível aposentar com <span class='pa'>R$ ${pai}</span> mensais <span class='na'>${na(por|até os)}</span>\
            <p class='pequeno'>Por causa da inflação, o valor da aposentadoria que será <span class='pa'>R$ ${pai}</span> em <span class='nm'>${nm}</span>, equivale hoje à <span class='pa'>R$ ${paa}</span>.</p>\
            <p class='pequeno'>A aposentadoria será corrigida à <span class='cm'>${ca}%</span> a.a., terminando em <span class='pa'>R$ ${paf}</span> mensais.</p>\
            "
      },
      xai: "<p class=''>Preciso acumular <span class='pa'>R$ ${xai}</span>.</p>${banner}\
<p class='pequeno'>Para aposentar hoje, com <span class='pa'>R$ ${pai}</span> mensais <span class='na'>${na(por|até os)}</span>, é necessário possuir <span class='pa'>R$ ${xai}</span>.</p><p class='pequeno'>A aposentadoria será corrigida à <span class='ca'>${ca}%</span> a.a., terminando em <span class='pa'>R$ ${paf}</span> mensais.</p>",

      nmo_falha: "<p>Ah, que pena!</p><p class='pequeno'>Desse jeito não vai conseguir!</p>\
            <p class='pequeno'>Sem correção do objetivo, realizará seu sonho aos <span class='nm'>${nm}</span>.</p>\
            <p class='pequeno red enfase'>Aos <span class='nm'>${nm}</span> atingirá <span class='xm'>R$ ${xmf}</span>, possuindo hoje <span class='mi'>R$ ${mi}</span> e, guardando <span class='pm'>R$ ${pm}</span> mensalmente</span> com correção do depósito em <span class='cm'>${cm}%</span> a.a..</p>\
            <p class='pequeno'>Por causa da inflação, o valor de <span class='xm'>R$ ${xmf}</span>, será aos <span class='nm'>${nm}</span>, o equivalente à <span class='descap'>R$ ${descap}</span> de hoje.</p>\
            ",
      nmo: "<p>Parabéns! Realizará seu sonho aos <span class='nm'>${nm}</span>.</p>\
            <p class='pequeno'>Por causa da inflação, o valor que hoje é <span class='descap'>R$ ${descap}</span>, será aos <span class='nm'>${nm}</span>, o equivalente à <span class='xm'>R$ ${xmf}</span>.</p>\
            <p class='pequeno red enfase'>Aos <span class='nm'>${nm}</span> atingirá <span class='xm'>R$ ${xmf}</span>, possuindo hoje <span class='mi'>R$ ${mi}</span> e, guardando <span class='pm'>R$ ${pm}</span> mensalmente</span> com correção do depósito em <span class='cm'>${cm}%</span> a.a..</p>\
            ",
      nmo2: "<p>Parabéns! Realizará seu sonho em <span class='nm'>${nm}</span> anos.</p>\
            <p class='pequeno'>Por causa da inflação, o valor acumulado em <span class='nm'>${nm}</span> anos, <span class='xm'>R$ ${xmf}</span>, será equivalente ao valor de hoje <span class='descap'>R$ ${descap}</span>.</p>\
            <p class='pequeno red enfase'>Em <span class='nm'>${nm}</span> anos atingirá <span class='xm'>R$ ${xmf}</span>, possuindo hoje <span class='mi'>R$ ${mi}</span> e, guardando <span class='pm'>R$ ${pm}</span> mensalmente</span> com correção do depósito em <span class='cm'>${cm}%</span> a.a..</p>\
            ",

      nma: "${banner}\
          <p class='pequeno'>Por causa da inflação, o valor da aposentadoria que hoje é <span class='pa'>R$ ${pa}</span> será aos <span class='nm'>${nm}</span>, <span class='pa'>R$ ${pacor}</span>.</p>\
          <p class='pequeno red enfase'>Poderá se aposentar de <span class='nm'>${nm}</span> à <span class='na'>${na}</span>, com <span class='pa'>R$ ${pai}</span> mensais, corrigidos à <span class='cm'>${ca}%</span> a.a., tendo iniciado a aplicação com <span class='mi'>R$ ${mi}</span> e depósitado mensalmente <span class='pm'>R$ ${pm}</span> até os <span class='nm'>${nm}</span>, com correção de <span class='cm'>${cm}%</span> a.a..</p>\
          <p class='pequeno'>A aposentadoria será corrigida à <span class='cm'>${ca}%</span> a.a., terminando em <span class='pa'>R$ ${paf}</span> mensais.</p>\
          <p class='pequeno'>Aos <span class='nm'>${nm}</span> terá juntado <span class='pa'>R$ ${xai}</span> e, terminará a aposentadoria com <span class='pa'>R$ ${xaf}</span>.</p>",

      nma_falha: '<p>Ah, que pena!</p><p class="pequeno">Desse jeito não vai conseguir! O mais perto da liberdade será aos <span class="nm">${nm}</span>!</p>',
      nma_sucesso: '<p>Livre aos <span class="nm">${nm}</span>!</p>',

      /* <p class='pequeno'>Por causa da inflação, o valor da aposentadoria que hoje é <span class='pa'>R$ ${pa}</span> será aos <span class='nm'>${pai}</span>, <span class='pa'>R$ ${pacor}</span>.</p>\ */
      na: "<p>Livre por <span class='nm'>${na_exclusivo}</span>!</p>${banner}\
      <p class='pequeno'>Por causa da inflação, o valor da aposentadoria que hoje é <span class='pa'>R$ ${pa}</span> será aos <span class='nm'>${nm}</span>, <span class='pa'>R$ ${pai}</span>.</p>\
      <p class='pequeno red enfase'>Poderá se aposentar de <span class='nm'>${nm}</span> à <span class='na'>${na}</span>, com <span class='pa'>R$ ${pai}</span> mensais, corrigidos à <span class='cm'>${ca}%</span> a.a., tendo iniciado a aplicação com <span class='mi'>R$ ${mi}</span> e depósitado mensalmente <span class='pm'>R$ ${pm}</span> até os <span class='nm'>${nm}</span>, com correção de <span class='cm'>${cm}%</span> a.a..</p>\
      <p class='pequeno'>A aposentadoria será corrigida à <span class='cm'>${ca}%</span> a.a., terminando em <span class='pa'>R$ ${paf}</span> mensais.</p>\
      <p class='pequeno'>Aos <span class='nm'>${nm}</span> terá juntado <span class='pa'>R$ ${xai}</span> e, terminará a aposentadoria com <span class='pa'>R$ ${xaf}</span>.</p>"
    };
  })));
})(Zepto || jQuery, window, this, console.log, console.warn, console.erro, function (x) {
  return (window.location.hostname.trim().toLowerCase() === 'localhost') ? console.error(x) : null;
});