// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
// TODO: refactor this

export default {

  getAmountAndUnit: function (val, decimals, truncated) {
    var unit = "";
    if (val >= 1000000000) {
      val = val / 1000000000;
      unit = "billion";
      if (truncated) {
        unit = "b";
      }
    } else if (val >= 1000000) {
      val = val / 1000000;
      unit = "million";
      if (truncated) {
        unit = "m";
      }
    } else if (val >= 1000) {
      val = val / 1000;
      unit = "k"
    }

    return [val.toFixed(decimals || 0), unit];
  },
  decimal: function (val) {

    if (!val) {
      return "";
    }

    var amountAndUnit = this.getAmountAndUnit(val, 1);
    return "$" + amountAndUnit[0] + " " + amountAndUnit[1];
  },
  noDecimal: function (val) {

    if (!val) {
      return "N/A";
    }

    var amountAndUnit = this.getAmountAndUnit(val, 0);
    return "$" + amountAndUnit[0] + " " + amountAndUnit[1];
  },
  truncated: function (val) {

    if (!val) {
      return "N/A";
    }

    var amountAndUnit = this.getAmountAndUnit(val, 1, true);
    return "$" + amountAndUnit[0] + " " + amountAndUnit[1];
  }
};