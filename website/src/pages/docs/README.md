# Avalanche Danger Vector Tileset

The **AvaInfo Danger Map** is a Mapbox-hosted vector tileset that provides geometries and metadata for avalanche danger levels in the Alps, as well as information from the bulletin reports. The tileset follows the [Mapbox tile specification](https://docs.mapbox.com/data/tilesets/guides/vector-tiles-standards/) for ease of integration.

## Endpoint

```
mapbox://avainfo.avalanche-map-${date}
```

Use the tileset ID `avainfo.avalanche-map-en-${date}` in a request to [Mapbox Vector Tiles API](https://docs.mapbox.com/help/glossary/vector-tiles-api/). Replace `{date}` with the date format `yyyy-MM-dd`, for example: `avainfo.avalanche-map-en-2022-02-26`.

To get the latest avalanche tileset date, use this URL:

```
https://us-central1-avainfo-net.cloudfunctions.net/fetchLatestTilesetDate
```

## Fields

The Avainfo Danger tileset contains one layer with the following fields adopting the <a href="https://www.avalanches.org/standards/">EAWS standards</a>. Optional fields are marked in _italics_ under their corresponding type.

| Fields                                                | Type     | Description                                                                                                                                                                   |
| :---------------------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `avalancheActivity_<num>_comment`                     | _string_ | Comments describing the avalanche activity                                                                                                                                    |
| `avalancheActivity_<num>_highlights`                  | _string_ | Short highlight of avalanche activity                                                                                                                                         |
| `avalancheActivitys_count`                            | _number_ | The total number of avalancheActivity objects in the array                                                                                                                    |
| `avalancheProblem_<num>_aspects`                      | _string_ | Aspects affected by the avalanche problem. Can be one or more of N, NE, E, SE, S, SW, W, NE                                                                                   |
| `avalancheProblem_<num>_elevation_lowerBound_numeric` | _number_ | The lower elevation bound of the avalanche problem, given in meters                                                                                                           |
| `avalancheProblem_<num>_elevation_lowerBound_string`  | _string_ | Elevation can be "treeline" or a string numerical value in meters, using pattern `treeline\|0\|[1-9][0-9]*[0][0]+m`                                                           |
| `avalancheProblem_<num>_elevation_upperBound_numeric` | _number_ | The upper elevation bound of the avalanche problem, given in meters                                                                                                           |
| `avalancheProblem_<num>_elevation_upperBound_string`  | _string_ | Elevation can be "treeline" or a string numerical value in meters, using pattern `treeline\|0\|[1-9][0-9]*[0][0]m`                                                            |
| `avalancheProblem_<num>_terrainFeature`               | _string_ | Comments on terrain features affected by the avalanche problem                                                                                                                |
| `avalancheProblem_<num>_type`                         | string   | Type of avalanche problem. Can be one of new_snow, wind_slab, persistent_weak_layers, wet_snow, gliding_snow, cornices, no_distinct_avalanche_problem or favourable_situation |
| `avalancheProblem_<num>_validTimePeriod`              | _string_ | The part of the day affected by the avalanche problem. Can be one of earlier, later or allDay                                                                                 |
| `avalancheProblems_count`                             | _number_ | The total number of avalancheProblem objects in the array                                                                                                                     |
| `bulletinDate`                                        | string   | Bulletin date in format yyyy-MM-dd                                                                                                                                            |
| `bulletinID`                                          | string   | Unique ID for bulletin report                                                                                                                                                 |
| `bulletinURI`                                         | string   | URL link to access the bulletin report                                                                                                                                        |
| `dangerRating_<num>_elevation_lowerBound_numeric`     | _number_ | The lower elevation bound of the danger rating, given in meters                                                                                                               |
| `dangerRating_<num>_elevation_lowerBound_string`      | _string_ | Elevation can be "treeline" or a string numerical value in meters, using pattern `treeline\|0\|[1-9][0-9]*[0][0]+m`                                                           |
| `dangerRating_<num>_elevation_upperBound_numeric`     | _number_ | The upper elevation bound of the danger rating given in meters                                                                                                                |
| `dangerRating_<num>_elevation_upperBound_string`      | _string_ | Elevation can be "treeline" or a string numerical value in meters, using pattern `treeline\|0\|[1-9][0-9]*[0][0]+m`                                                           |
| `dangerRating_<num>_mainValue_numeric`                | number   | Danger Rating. Can be one of 1, 2, 3, 4 or 5                                                                                                                                  |
| `dangerRating_<num>_mainValue_string`                 | number   | Danger Rating. Can be one of low, moderate, considerable, high or very high                                                                                                   |
| `dangerRating_<num>_validTimePeriod`                  | string   | The part of the day affected by the danger rating. Can be one of earlier, later or allDay                                                                                     |
| `dangerRatings_<num>_count`                           | number   | The total number of dangerRating objects in the array                                                                                                                         |
| `highlights`                                          | _string_ | Optional short text to highlight an exceptionally dangerous situation                                                                                                         |
| `lang`                                                | string   | Two-letter language code (ISO 639-1)                                                                                                                                          |
| `maxDangerRating_allDay_numeric`                      | number   | Maximum danger rating for the day. Can be one of 1, 2, 3, 4, 5                                                                                                                |
| `maxDangerRating_allDay_string`                       | number   | Maximum danger rating for the day. Can be one of low, moderate, considerable, high or very high                                                                               |
| `maxDangerRating_earlier_numeric`                     | _number_ | Maximum danger rating for the morning. Can be one of 1, 2, 3, 4, 5                                                                                                            |
| `maxDangerRating_earlier_string`                      | _number_ | Maximum danger rating for the morning. Can be one of low, moderate, considerable, high or very high                                                                           |
| `maxDangerRating_later_numeric`                       | _number_ | Maximum danger rating for the afternoon. Can be one of 1, 2, 3, 4, 5                                                                                                          |
| `maxDangerRating_later_string`                        | _number_ | Maximum danger rating for the afternoon. Can bene of low, moderate, considerable, high or very high                                                                           |
| `pdfURI`                                              | string   | URL link to access the pdf version of the bulletin report                                                                                                                     |
| `publicationTime`                                     | string   | Time and date when the bulletin was issued by the AWS to the public. ISO 8601 timestamp in UTC or with time zone information.                                                 |
| `regionID`                                            | string   | ID of region following <a href="https://gitlab.com/eaws/eaws-regions">EAWS schema</a>                                                                                         |
| `regionName`                                          | string   | Name of region                                                                                                                                                                |
| `snowpackStructureComment`                            | _string_ | Details on snowpack structure                                                                                                                                                 |
| `snowpackStructureHighlights`                         | _string_ | Brief summary of snowpack structure                                                                                                                                           |
| `source`                                              | string   | Name of bulletin provider                                                                                                                                                     |
| `tendencyComment`                                     | _string_ | Comments on expected avalanche situation tendency after the bulletin's period of validity                                                                                     |
| `tendencyType`                                        | _string_ | Can be one of decreasing, steady or increasing                                                                                                                                |
| `validEndTime`                                        | string   | Validity end time of bulletin report as date-time string                                                                                                                      |
| `validStartTime`                                      | string   | Validity start time of bulletin report as date-time string                                                                                                                    |
| `weather_<num>_highlight`                             | _string_ | Short highlights of the weather forecast highlights                                                                                                                           |
| `weather_<num>_comment`                               | _string_ | Comments on the weather forecast                                                                                                                                              |
| `weather_<num>_snow`                                  | _string_ | Specific comments about snow conditions                                                                                                                                       |
| `weather_<num>_temp`                                  | _string_ | Specific comments about temperature                                                                                                                                           |
| `weather_<num>_wind`                                  | _string_ | Specific comments about wind conditions                                                                                                                                       |
| `weathers_count`                                      | _number_ | The total number of weather objects in the array                                                                                                                              |

## Data sources and updates

The AvaInfo Danger Map vector tileset is based on bulletin reports made openly available by national and regional avalanche warning services in the following languages:

| Region                    | Data Source                                                      | Available languages |
| :------------------------ | :--------------------------------------------------------------- | :------------------ |
| **Andorra (AD)**          |
| `AD`                      | https://www.meteo.ad/fr/etatneige                                | FR                  |
| **Austria (AT)**          |
| `Tirol`                   | https://avalanche.report                                         | EN                  |
| `Kärnten`                 | https://lawinenwarndienst.ktn.gv.at/                             | DE                  |
| `Salzburg`                | https://lawine.salzburg.at/                                      | EN                  |
| `Styria`                  | https://www.lawine-steiermark.at/                                | EN                  |
| `Vorarlberg`              | https://warndienste.cnv.at/dibos/lawine/index.html               | EN                  |
| **Switzerland (CH)**      |
| `CH`                      | https://www.slf.ch/en/avalanche-bulletin-and-snow-situation.html | EN                  |
| **Germany (DE)**          |
| `Bavaria`                 | https://www.lawinenwarndienst-bayern.de                          | EN                  |
| **Spain (ES)**            |
| `Val d'Aran`              | https://lauegi.conselharan.org/                                  | EN                  |
| **France (FR)**           |
| `FR`                      | https://meteofrance.com/meteo-montagne                           | FR                  |
| **Italy (IT)**            |
| `Bolzano`                 | https://avalanche.report                                         | EN                  |
| `Trentino`                | https://avalanche.report                                         | EN                  |
| `Piemonte`                | https://bollettini.aineva.it/                                    | EN                  |
| `Valle d’Aosta`           | https://bollettini.aineva.it/                                    | EN                  |
| `Lombardia`               | https://bollettini.aineva.it/                                    | EN                  |
| `Veneto`                  | https://bollettini.aineva.it/                                    | EN                  |
| `Friuli – Venezia Giulia` | https://bollettini.aineva.it/                                    | EN                  |
| `Marche`                  | https://bollettini.aineva.it/                                    | EN                  |
| **Slovenia (SI)**         |
| `SI`                      | http://meteo.arso.gov.si/                                        | SI                  |

### Data updates

AvaInfo Danger Map vector layers are published during the winter season only.

Avalanche Warning Services typically issue a bulletin report at 17:00/18:00 each day, with additional updates at 8:00/9:00 the following morning and on rare occasions at other times. Changes to the bulletin reports are regularly monitored throughout the day, and the tilesets are updated to reflect the latest information.

### Licence

GNU General Public License v3.0 or later

See [COPYING](https://github.com/ponty-lab/avainfo.net/blob/main/COPYING.txt) to see the full text.

## Warning

The Avalanche Danger tilesets are generated from third-party data and may be outdated or inaccurate.Using the tileset for any purpose is at your own risk, and AvaInfo is not responsible for any actions you take based on any information contained in this tileset. If you have any concerns about the accuracy or currency of the information in the tileset, please refer to the original bulletin reports.
