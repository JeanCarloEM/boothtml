if (typeof module === 'undefined') {
  var FC = {};
}

(function (M) {
  M.obrigatorios = ['rendimento', 'origem'];

  M.isNum = function (c) {
    return (!isNaN(c) && isFinite(c) && (c !== null) && (c !== null) && (typeof c !== undefined) && (typeof c !== "undefined"));
  };

  M.validateNums = function (V) {
    var ERRO = [];
    var c = ['pm', 'pa', 'nm', 'na', 'mi', 'mf', 'i', 'ir', 'ca', 'cm'];
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

    for (var i = 0; i < c.length; c++) {
      if (!M.isNum(V(c[i]))) {
        ERRO.push('Campo "' + names[c[i]] + '" não é um número válido: "' + V(c[i]) + '".');
      }
    }

    return ERRO;
  };

  M.obrigatorio = function (V, list, nome) {
    list = M.obrigatorios.concat(list);

    var ERRO = [];

    for (var i = 0; i < list.length; i++) {
      if (M.obrigatorios.indexOf(list[i].trim()) >= 0) {
        if ((typeof V(list[i]) === 'undefined') || (!V(list[i])) || ((V(list[i]) + "").trim().length === 0)) {
          switch (list[i].trim()) {
            case 'origem':
              ERRO.push('Uso incorreto do sistema, originação não comunicada. Se você não fez nada errado contacte o administrador. \'' + list[i] + "':'" + V(list[i]) + "'");
              break;

            default:
              ERRO.push('Para calcular o(a) ' + nome + ', é obrigatório selecionar #{' + list[i] + '}.');
              break;
          }
        }
      } else if (V(list[i]) <= 0) {
        var add = (list[i] === 'nm') ? ' ou #{idade} e #{idadeap}' : '';
        ERRO.push('Para calcular o(a) ' + nome + ', é obrigatório informar #{' + list[i] + '}' + add + ', com valor maior que zero: \'' + V(list[i]) + '\'.');
      }
    }

    return ERRO;
  };

  M.XOR = function (V, l1, l2, nome) {
    l1 = M.obrigatorio(V, l1, nome);
    l2 = M.obrigatorio(V, l2, nome);

    if ((l1.length === 0) && (l2.length === 0)) {
      return ['Por favor, dos campos coloridos, preencha apenas aqueles com a mesma cor!'];
    }

    if ((l1.length > 0) && (l2.length > 0)) {
      return l1.concat(l2);
    }

    return [];
  };

  M.OR = function (V, l1, l2, nome) {
    l1 = M.obrigatorio(V, l1, nome);
    l2 = M.obrigatorio(V, l2, nome);

    if ((l1.length > 0) && (l2.length > 0)) {
      return ['Por favor, dos campos coloridos, preencha ao menos uma das cores!'].concat(l1.concat(l2));
    }

    return [];
  };

  M.prepare = {
    pm: function (V) {
      return M.XOR(V, ['pa', 'nm'], ['mf'], 'valor do depósito mensal (pm)');
    },

    xai: function (V) {
      return M.obrigatorio(V, ['pa', 'na'], 'o quanto devo acumular (xai)');
    },

    fv: function (V) {
      return M.obrigatorio(V, ['nm', 'pm'], 'quanto vou acumular (mf)');
    },

    pa: function (V) {
      return M.obrigatorio(V, ['nm', 'pm'], 'valor da Apoentadora (pa)');
    },
    nmx: function (V, modo, server) {
      return M.obrigatorio(V, (!modo ? ['idade'] : []).concat(['pm', 'mf']), 'quando vou realizar meu sonho (nm)');
    },
    nmflex: function (V) {
      return M.obrigatorio(V, ['pm', 'pa'], 'quando vou ser livre (nm)');
    },
    na: function (V) {
      return M.obrigatorio(V, ['nm', 'pa'], 'por quanto tempo serei livre (nm)').concat(M.OR(V, ['pm'], ['mi'], 'por quanto tempo serei livre (nm)'));
    },

    none: function (V) {
      return ['Função não localizada!'];
    }
  };
})((typeof module !== 'undefined') ? module.exports : FC);