# FietsWandelRouteApp

Deze Mobiele App is een app die mooie fiets- en wandelroutes toont in de regio waar gebruikers wonen of graag willen vertieren. Naast het inrichten van de structuur van de verschillende schermen en de styling van de schermen heb ik ook verschillende Google maps API's geïntegreerd, die als visualisatie van de diverse routes dienen.

# Structuur

Deze mobiele applicatie bestaat uit diverse schermen, te weten:
* Homepage.
* Detailscherm.
* Kaart met route.
* Aanraadscherm.

## Technologieën

* React Native
* JavaScript
* CSS
* Google Maps API
* Directions API
* Cockpit CMS
* Visual Studio Code

De applicatie is met React Native als framework en met JavaScript als programmeertaal gerealiseerd. De data wordt gecrëeerd in en opgehaald vanuit de Cockpit CMS door middel van API calls, waar een aparte klasse voor is gemaakt. De 2 verschillende API's van Google Maps worden door middel van een Google API key aangeroepen voor beschikbaarheid om Componenten van die libraries te gebruiken. Deze API's zorgen voor een mooie visualisatie van een specifieke route op de wereldkaart.

## Methoden en Technieken

De entiteiten met Primary Key en Foreign Key relaties zijn hieronder te zien in een ERD.
[!image](assets/ERD_RouteApp.png)

## Schermen

### Homepage

Op de Homepage staan alle fiets- en wandelroutes, met bijbehorende info en totale afstand. Men kan bij elke route op de knop drukken om naar het detailscherm van die route te gaan. Ook kan men onderaan naar het aanraadscherm gaan.

### Detailscherm

Op het detailscherm zijn alle tussenstops die de route definiëren te vinden met bijbehorende info over plaats en straat. Ook staat de afstand ernaast die tot dan toe is afgelegd vanuit het startpunt van de route. Men kan op dit scherm ook doorgaan naar de Google Maps kaart met de bijbehorende route.

### Kaart met route

Dit scherm bestaat volledig uit een Google Maps Kaart, gerealiseerd door de MapView component uit de react-native-maps library. Op de kaart is de route uitgestippeld met zwarte lijnen en de tussenstops zijn aangegeven door rode markers.

### Aanraadscherm

Het aanraadscherm bestaat uit een form waar de gebruiker moet invullen in welke plaats en straat de gebruiker woont, of de gebruiker wil wandelen of fietsen op die dag, en hoe groot het gebied moet zijn waar tussenstops van routes gevonden kunnen worden, met als middelpunt de plaats waar de gebruiker woont. Als er inderdaad routes met het goede type gevonden worden (F/W) binnen de opgegeven zoekradius worden ze op hetzelfde scherm getoond, waarbij de gebruiker ook weer door kan navigeren naar de bijbehorende detailschermen.

## API

De API zorgt voor het ophalen en opslaan van de collecties Routes en Tussenstops, die opgeslagen zijn in de Cockpit CMS.
