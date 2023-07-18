/*
 * @param   i     float   taxa a.m. de atualizacao (rendimento) do montante
 * @param   ip    float   taxa a.a. de correcao/atualizacao da parcela de aposentadoria/depósito
 */
function estimarFluxo(mi, mf, prazo, i, ip, pm) {
  var ERRO = {};

  if ((!isNum(mi)) || (!isNum(mf)) || (!isNum(prazo)) || (!isNum(i)) || (!isNum(ip))) {
    var pars = ["mf", "prazo", "i", "ip"];
    var vars = [mi, mf, prazo, i, ip];
    var msg = "";
    for (var j = 0; j < pars.length; j++) {
      msg += " \n\t- " + pars[j] + " = " + "'" + vars[j] + "'";
    }
    addErro("Valores passados para calcular parcela não são numéricos: \n" + msg, ERRO);
    return false;
  }

  /* CHECKAGEM GERAL */
  var ck = check(mi, i, ip, null, prazo, null, null, null, mf);

  if (ck !== false) {
    return ck;
  }

  if ((!isNum(mi)) && (!isNum(pm))) {
    addErro("Os valores de 'mi' e 'pm' não podem ao mesmo tempo, ser diferentes de número: mi = " + mi + ", pm = " + pm + "!", ERRO);
    return false;
  }

  mi = isNum(mi) ? mi : 0;

  var modo = (mi > mf) ? "zerar" : ((mi < mf) ? "acumular" : ((isNum(pm) && (pm > 0)) ? "x0" : null));

  if (modo = null) {
    addErro("Montante inicial e final possuem o mesmo valor e não foi fornecido parcela positiva: " + mi + " = " + mf + ", parcela = " + pm + "!", ERRO);
    return false;
  }

  if (modo === "x0") {
    var montante = FV(0, i, ip, pm, prazo);
    montante = montante.xm[montante.xm.length - 1];
  } else {
    var montante = mi;
  }

  var per = 0.5; /* PERCENTUAL DE RAJUSTE DA PARCELA */
  var pestima = (modo === "x0") ? pm : Math.round((montante / prazo) * (1 - per), 2); /* PARCELA ESTIMADA */
  var k = 0; /* CONTADOR DE INTERACOES */
  var _r = montante ? { "xm": montante } : 0;
  var sentido = 0;
  /*var subOrSomar = isNum(pm) ? ((pm < 0) ? -1 : 1) : ((mi > mf) ? -1 : 1);*/

  /* CALCULA ATEH CHEGAR NO VALOR */
  do {
    if (k > _NAX_ITER_) {
      console.error("Passou de " + _NAX_ITER_ + " iterações!");
      break;
    }

    k++;
    var novo_sentido = (_r.xm[_r.xm.length - 1] > 0) ? -1 : 1;

    if ((sentido !== 0) && (novo_sentido != sentido)) {
      per /= 2;
    }

    /* DESCOBRIR O MONTANTE INICIAL QUE PERMITIRA CHEGA AO MF COM A PARCELA  */
    if (sentido !== 0) {
      if (modo === "x0") {
        montante *= (1 + (per * novo_sentido));
      } else {
        pestima *= (1 + (per * novo_sentido));
      }
    }

    sentido = novo_sentido;

    /* CALCULOS DAS PARCELAS E MONTANTES */
    _r = FV(montante, i, ip, pestima, prazo);

    console.log(pestima + " > " + _r.xm[_r.xm.length - 1]);
  } while (Math.abs(Math.abs(_r.xm[_r.xm.length - 1]) + Math.abs(mf)) > _MARGEM_DIFF_);

  return _r;
}