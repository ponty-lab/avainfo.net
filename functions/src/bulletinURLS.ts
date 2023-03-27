export const bulletinUrls: Record<string, any> = {
  AD: {
    source: "Govern d'Andorra Servei Meteorològic Nacional",
    defaultLang: "fr",
    lang: ["fr"],
    url: {
      xml: "https://www.meteo.ad/xml/neige.xml",
      bulletin: "https://www.meteo.ad/fr/etatneige",
      pdf: "http://www.meteo.ad/uploads/neu/estatNeu${num}${lang}.pdf",
      latest: "https://www.meteo.ad/$fr/etatneige",
    },
  },
  Albina: {
    source: "Avalanche.report",
    defaultLang: "en",
    lang: ["en", "fr", "de"],
    timeZone: "Europe/Vienna",
    treeline: 2100,
    url: {
      xml: "https://avalanche.report/albina_files/latest/${lang}.xml",
      bulletin: "https://avalanche.report/bulletin/${date}?region=${id}",
      pdf: "https://static.avalanche.report/bulletin/${date}/${date}_${regionID}_${lang}.pdf",
      latest: "https://avalanche.report/bulletin/$latest?region=${id}",
    },
  },
  "AT-02": {
    source: "Lawinenwarndienst Kärnten",
    defaultLang: "en",
    lang: ["en", "de"],
    timeZone: "Europe/Vienna",
    treeline: 1750,
    url: {
      xml: "https://www.avalanche-warnings.eu/public/kaernten/caaml/${lang}",
      bulletin: "https://lawine-kaernten.at/avalanche-bulletin.html",
      pdf: "http://avalanche-warnings.eu/public/pdf/${id}/${lang}",
      latest: "https://lawine-kaernten.at/avalanche-bulletin.html",
    },
  },
  "AT-03": {
    source: "Lawinenwarndienst Niederösterreich",
    defaultLang: "de",
    lang: ["de"],
    timeZone: "Europe/Vienna",
    treeline: 1750,
    url: {
      xml: "https://www.avalanche-warnings.eu/public/niederoesterreich/caaml/${lang}",
      bulletin:
        "https://www.lawinenwarndienst-niederoesterreich.at/lagebericht/aktueller-prognosebericht/",
      pdf: "http://avalanche-warnings.eu/public/pdf/${id}/${lang}",
      latest:
        "https://www.lawinenwarndienst-niederoesterreich.at/lagebericht/aktueller-prognosebericht/",
    },
  },
  "AT-04": {
    source: "Lawinenwarndienst Oberösterreich",
    defaultLang: "de",
    lang: ["de"],
    timeZone: "Europe/Vienna",
    treeline: 1750,
    url: {
      xml: "https://www.avalanche-warnings.eu/public/oberoesterreich/caaml/${lang}",
      bulletin: "https://oberoesterreich.avalanche-warnings.eu/",
      pdf: "http://avalanche-warnings.eu/public/pdf/${id}/${lang}",
      latest: "https://oberoesterreich.avalanche-warnings.eu/",
    },
  },
  "AT-05": {
    source: "Lawinenwarndienst Salzburg",
    defaultLang: "en",
    lang: ["en", "de"],
    timeZone: "Europe/Vienna",
    treeline: 1750,
    url: {
      xml: "https://www.avalanche-warnings.eu/public/salzburg/caaml/${lang}",
      bulletin: "https://lawine.salzburg.at/lawinenbericht/aktuell",
      pdf: "http://avalanche-warnings.eu/public/pdf/${id}/${lang}",
      latest: "https://lawine.salzburg.at/lawinenbericht/aktuell",
    },
  },
  "AT-06": {
    source: "Lawinenwarndienst Steiermark",
    defaultLang: "en",
    lang: ["en", "de"],
    timeZone: "Europe/Vienna",
    treeline: 1750,
    url: {
      xml: "https://www.avalanche-warnings.eu/public/steiermark/caaml/${lang}",
      bulletin:
        "https://www.lawine-steiermark.at/lagebericht/avalanche-bulletin",
      pdf: "http://avalanche-warnings.eu/public/pdf/${id}/${lang}",
      latest: "https://www.lawine-steiermark.at/lagebericht/avalanche-bulletin",
    },
  },
  "AT-08": {
    source: "Landeswarnzentrale Vorarlberg",
    defaultLang: "en",
    lang: ["en", "de"],
    timeZone: "Europe/Vienna",
    treeline: 1750,
    url: {
      xml: "https://www.avalanche-warnings.eu/public/vorarlberg/caaml/${lang}",
      bulletin: "https://warnung.vorarlberg.at/lwd_lagebericht_${lang}.html",
      pdf: "http://avalanche-warnings.eu/public/pdf/${id}/${lang}",
      latest: "https://warnung.vorarlberg.at/lwd_lagebericht_${lang}.html",
    },
  },
  "DE-BY": {
    source: "Lawinenwarnzentrale Bayern",
    defaultLang: "en",
    lang: ["en", "de"],
    timeZone: "Europe/Vienna",
    treeline: 1750,
    url: {
      xml: "https://www.avalanche-warnings.eu/public/bayern/caaml/${lang}",
      bulletin: "https://www.lawinenwarndienst-bayern.de/res/start_sommer.php",
      pdf: "http://avalanche-warnings.eu/public/pdf/${id}/${lang}",
      latest: "https://www.lawinenwarndienst-bayern.de/res/start_sommer.php",
    },
  },
  CH: {
    source: "WSL Institute for Snow and Avalanche Research SLF",
    defaultLang: "en",
    lang: ["en", "fr", "de"],
    timeZone: "Europe/Geneva",
    treeline: 2200,
    url: {
      json: "https://api.slf.ch/bulletin/eaws/current",
      bulletin:
        "https://www.slf.ch/en/avalanche-bulletin-and-snow-situation.html#avalanchedanger",
      pdf: "https://www.slf.ch/fileadmin/user_upload/import/lwdarchiv/public/2023/nb/en/pdf/${dateTime}_gk_c_${lang}_complete.pdf",
      latest:
        "https://www.slf.ch/en/avalanche-bulletin-and-snow-situation.html#avalanchedanger",
    },
  },
  "ES-CT-L": {
    source: "Conselh Generau d'Aran",
    defaultLang: "en",
    lang: ["en", "fr", "de"],
    timeZone: "Europe/Madrid",
    treeline: 2300,
    url: {
      xml: "http://statics.lauegi.report/albina_files/latest/ES-CT-L_${lang}.xml",
      bulletin: "https://lauegi.report/bulletin/${date}",
      pdf: "http://statics.lauegi.report/albina_files_local/${date}/${date}_ES-CT-L_${lang}.pdf",
      latest: "https://lauegi.report/bulletin/latest",
    },
  },
  FR: {
    source: "Météo-France",
    defaultLang: "fr",
    lang: ["fr"],
    timeZone: "Europe/Lyon",
    treeline: 2000,
    url: {
      xml: "https://donneespubliques.meteofrance.fr/donnees_libres/Pdf/BRA",
      bulletin: "https://meteofrance.com/meteo-montagne",
      pdf: "https://donneespubliques.meteofrance.fr/donnees_libres/Pdf/BRA.${massif}.${heures}.pdf",
      latest: "https://meteofrance.com/meteo-montagne",
    },
  },
  IT: {
    source: "Avalanche.report",
    excludedRegions: ["IT-32", "IT-57-MC-02"],
    defaultLang: "en",
    lang: ["en", "fr", "de"],
    timeZone: "Europe/Rome",
    treeline: 2100,
    url: {
      xml: "https://bollettini.aineva.it/albina_files/latest/${lang}.xml",
      bulletin:
        "https://bollettini-${lang}.aineva.it/bulletin/${date}?region=${id}",
      pdf: "https://bollettini.aineva.it/albina_files/${date}/${date}_${regionID}_${lang}.pdf",
      latest: "https://bollettini.aineva.it/bulletin/latest?region=${id}",
    },
  },
  SI: {
    source: "Avalanche Warning Service Slovenia",
    excludedRegions: ["SI1", "SI5"],
    defaultLang: "sl",
    lang: ["sl"],
    timeZone: "Europe/Ljubljana",
    treeline: 1700,
    url: {
      xml: "https://meteo.arso.gov.si/uploads/probase/www/avalanche/text/sl/bulletinAvalanche.xml",
      bulletin: "https://vreme.arso.gov.si/plazovi",
      latest: "https://vreme.arso.gov.si/plazovi",
    },
  },
  /*   
       "GB": {
           "source": "Scottish Avalanche Information Service",
           "url": {
               "en": "https://www.sais.gov.uk/"
           }
       },
       "NO": {
           "source": "Varsom: En tjeneste levert av NVE, i samarbeid med Statens vegvesen og Meteorologisk institutt",
           "url": {
               "no": "https://varsom.no/"
           }
       },
       "CZ": {
           "source": "Horská služba",
           "url": {
               "cz": "https://www.horskasluzba.cz/cz/avalanche-json"
           }
       },
       "ES-CT": {
           "source": "Institut Cartogràfic i Geològic de Catalunya",
           "url": "https://bpa.icgc.cat"
       },
       "ES": {
           "source": "Agencia Estatal de Meteorología",
           "url": {
               "es": "http://www.aemet.es/xml/montana/p18tarn1.xml"
           }
       },
       "IS": {
           "source": "Veðurstofa Íslands",
           "url": {
               "is": "https://xmlweather.vedur.is/avalanche?op=xml&type=status&lang=en"
           }
       },

       "SK": {
           "source": "SLP HZS",
           "url": {
               "sk": "https://caaml.hzs.sk/"
           }
       } */
};

export const austrianURLS = Object.fromEntries(
  Object.entries(bulletinUrls).filter(([key, value]) => key.match(/(AT|DE).*/))
);
