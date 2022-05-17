import _ from "lodash";
import colorCombination from "../constants/colors";
import { fabric } from "fabric";
import dimensions from '../constants/dimensions';
import { datidifondiSICAVitaliani, indicatoriSSN, leLocalUtilities, leprivatizzazioniInItalia1992, mercatiFinanziari, mercatiFinanziariBianco, palazzo, reportAlitalia, reportEditoria, reportFerrovieEuropee, reportGDO, reportLegnoArredo, reportModa, reportOspeDaliPrivati, reportSettoreVinicolo, reportSistemaBancarioItaliano, reportTelco, reportTV, SoftwareEWebCompanies, triangoloVuoto } from "../svg/images";

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getDateHash() {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let result = `-${year}${month}${date}-${hours}${minutes}`;
  return result;
}

const calcolaColoreAnno = (anno) => {
  if (anno.toString().length != 4) {
    throw new Error("Attenzione, l'anno è indicato nella maniera errata. Corretta: AAAA");
  }
  const yearKey = Math.ceil((anno % 100) / 10) * 10;
  return colorCombination.anni[yearKey];
}

function generateBottom(anno, canvas, tipologie) {
  if (tipologie.includes("Mercati finanziari")) {
    var color_text = "black";
  } else {
    var color_text = "white";
  }

  var text = new fabric.Text(anno.toString(), {
    fontSize: 28,
    fill: color_text,
    fontStyle: "italic",
    fontFamily: "LibreBaskerville",
    left: (dimensions.canvasWidth / 4) * 3 + 50,
    top: dimensions.canvasHeight - dimensions.footerHeight / 2,
    originX: "center",
    originY: "center",
  });

  canvas.add(text);
}

function generateLogo(canvas, tipologie) {
  /* triangolino in alto a destra */
  if (tipologie.includes("Report di settore")) {
    /* logo sopra triangolino*/
    if (tipologie.includes("Dati di Fondi e SICAV italiani")) {
      var svgImageReport = datidifondiSICAVitaliani;
    } else if (tipologie.includes("Report Ospedali privati")) {
      var svgImageReport = reportOspeDaliPrivati;
    } else if (tipologie.includes("Indicatori per il Servizio Sanitario Nazionale")) {
      var svgImageReport = indicatoriSSN;
    } else if (tipologie.includes("Le local utilities")) {
      var svgImageReport = leLocalUtilities;
    } else if (tipologie.includes("Le privatizzazioni in Italia dal 1992")) {
      var svgImageReport = leprivatizzazioniInItalia1992;
    } else if (tipologie.includes("Report Alitalia")) {
      var svgImageReport = reportAlitalia;
    } else if (tipologie.includes("Report Editoria")) {
      var svgImageReport = reportEditoria;
    } else if (tipologie.includes("Report Ferrovie europee")) {
      var svgImageReport = reportFerrovieEuropee;
    } else if (tipologie.includes("Report GDO")) {
      var svgImageReport = reportGDO;
    } else if (tipologie.includes("Report Legno - Arredo")) {
      var svgImageReport = reportLegnoArredo;
    } else if (tipologie.includes("Report Moda")) {
      var svgImageReport = reportModa;
    } else if (tipologie.includes("Report Sistema bancario italiano")) {
      var svgImageReport = reportSistemaBancarioItaliano;
    } else if (tipologie.includes("Report Telco")) {
      var svgImageReport = reportTelco;
    } else if (tipologie.includes("Report TV")) {
      var svgImageReport = reportTV;
    } else if (tipologie.includes("Software & Web Companies")) {
      var svgImageReport = SoftwareEWebCompanies;
    } else if (tipologie.includes("Report settore vinicolo")) {
      var svgImageReport = reportSettoreVinicolo;
    } else {
      //triangolo vuoto
      var svgImageReport = triangoloVuoto;
    }

    fabric.loadSVGFromString(
      svgImageReport,
      function (objects, options) {
        var Obj = fabric.util.groupSVGElements(objects, options);
        Obj.set({
          originX: "center",
          originY: "center",
          width: 50,
          height: 50,
          left: dimensions.canvasWidth - 55,
          top: 55,
        });
        Obj.scaleX = 0.7;
        Obj.scaleY = 0.7;
        canvas.add(Obj);
        canvas.renderAll();
      },
      function (item, object) {
        object.set("svgid", item.getAttribute("id"));
      }
    );
  } else {
    if (tipologie.includes("L'industria italiana")) {
      /* triangolino n.1: industria italiana */
      var svgImageindustriaitaliana =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168.43 168.43"><defs><style>.cls-1{fill:#df985a;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="VERE"><polygon class="cls-1" points="168.43 0 168.43 168.43 0 0 168.43 0"/></g></g></svg>';
    } else if (tipologie.includes("Mercati finanziari")) {
      /* triangolino n.2 mercati finanziari */
      var svgImageindustriaitaliana =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168.43 168.43"><defs><style>.cls-1{fill:#bd9554;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="VERE"><polygon class="cls-1" points="168.43 0 168.43 168.43 0 0 168.43 0"/></g></g></svg>';
    } else if (tipologie.includes("Raffronti internazionali")) {
      /* triangolino n.3: raffronti internazionali*/
      var svgImageindustriaitaliana =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168.43 168.43"><defs><style>.cls-1{fill:#1f2945;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="VERE"><polygon class="cls-1" points="168.43 0 168.43 168.43 0 0 168.43 0"/></g></g></svg>';
    } else {
      /* triangolino n.5: reporto di settori*/
      var svgImageindustriaitaliana =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168.43 168.43"><defs><style>.cls-1{fill:#bda386;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="VERE"><polygon class="cls-1" points="168.43 0 168.43 168.43 0 0 168.43 0"/></g></g></svg>';
    }

    fabric.loadSVGFromString(
      svgImageindustriaitaliana,
      function (objects, options) {
        var Obj = fabric.util.groupSVGElements(objects, options);
        Obj.set({
          originX: "center",
          originY: "center",
          width: 50,
          height: 50,
          left: dimensions.canvasWidth - 50,
          top: 50,
        });
        Obj.scaleX = 0.9;
        Obj.scaleY = 0.9;
        canvas.add(Obj);
        canvas.renderAll();
      },
      function (item, object) {
        object.set("svgid", item.getAttribute("id"));
      }
    );
  }

  /* palazzo a centro pagina*/
  var svgImagePalazzo = palazzo;

  fabric.loadSVGFromString(
    svgImagePalazzo,
    function (objects, options) {
      var Obj = fabric.util.groupSVGElements(objects, options);
      Obj.set({
        originX: "center",
        originY: "center",
        width: 50,
        height: 50,
        left: dimensions.canvasWidth / 2,
        top: (dimensions.canvasHeight / 3) * 2,
      });
      Obj.scaleX = 0.9;
      Obj.scaleY = 0.9;
      canvas.add(Obj);
      canvas.renderAll();
    },
    function (item, object) {
      object.set("svgid", item.getAttribute("id"));
    }
  );

  /*logo in mezzo al footer pagina*/
  if (tipologie.includes("Mercati finanziari")) {
    //versione in nero per pagina bianca
    var svgImageMercatiFinanziari = mercatiFinanziari;
  } else {
    //versione in bianco per pagina di altri colori
    var svgImageMercatiFinanziari = mercatiFinanziariBianco;
  }

  fabric.loadSVGFromString(
    svgImageMercatiFinanziari,
    function (objects, options) {
      var Obj = fabric.util.groupSVGElements(objects, options);
      Obj.set({
        originX: "center",
        originY: "center",
        width: 50,
        height: 50,
        left: dimensions.canvasWidth / 4,
        top: dimensions.canvasHeight - dimensions.footerHeight / 2,
      });
      Obj.scaleX = 0.8;
      Obj.scaleY = 0.8;
      canvas.add(Obj);
      canvas.renderAll();
    },
    function (item, object) {
      object.set("svgid", item.getAttribute("id"));
    }
  );
}

/**
 * Genera lo sfondo unico o doppio in base alle tipologie
 * @param {Array} tipologieRequest
 * @param {fabric.Canvas} canvas
 */
function generateBackground(tipologieRequest, canvas) {
  if (_.intersection(tipologieRequest, Object.keys(colorCombination.tipologie)).length != tipologieRequest.length) {
    //throw Boom.badRequest("Attenzione, una delle tipologie indicate è errata");
  }

  let matchedColors = _.intersection(tipologieRequest, Object.keys(colorCombination.tipologie)).map((el) => colorCombination.tipologie[el]);

  var singleRectangle = new fabric.Rect({
    left: 0,
    top: 0,
    width: dimensions.canvasHeight,
    height: dimensions.canvasHeight,
    fill: matchedColors[0],
    strokeWidth: 0,
  });
  canvas.add(singleRectangle);
  return;
}

function generateTitle(titolo, canvas, tipologie) {
  var len = titolo.length;
  var fz1 = 28;
  if (len < 320) fz1 = 28;
  else fz1 = Math.round(26.5 - (len - 320) / 30);

  if (tipologie.includes("Mercati finanziari")) {
    var color_text = "black";
  } else {
    var color_text = "white";
  }

  var text = new fabric.Textbox(titolo, {
    width: (dimensions.canvasWidth / 7) * 5,
    height: (dimensions.canvasHeight / 11) * 7,
    fontFamily: "LibreBaskerville",
    fontSize: fz1,
    left: dimensions.canvasWidth / 7,
    top: dimensions.canvasWidth / 7,
    fill: color_text,
    originX: "left",
    originY: "top",
  });
  canvas.add(text);
}

export default { makeid, getDateHash, generateBottom, generateTitle, generateBackground, generateLogo };
