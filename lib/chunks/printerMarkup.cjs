var e=Object.freeze([`BOLD`,`B`,`C`,`BR`,`LOGO`,`CUT`,`PLUGIN`,`CB`,`DB`,`L`,`W`,`QR`,`RIGHT`]),t=e.join(`|`),n=RegExp(`</?(?:${t})\\s*/?\\s*>`,`gi`),r=/^<\/?\s*([A-Z]+)\s*\/?\s*>$/i;function i(e){return String(e??``).replace(RegExp(`\\\\(?=</?\\s*(?:${t})\\b)`,`gi`),``).replace(/\r\n?/g,`
`)}function a(e){return e.replace(/&(?:#(\d+)|#x([\da-f]+)|nbsp|amp|lt|gt|quot|apos);/gi,(e,t,n)=>{let r=t?Number(t):n?parseInt(n,16):null;return r===null?{nbsp:`\xA0`,amp:`&`,lt:`<`,gt:`>`,quot:`"`,apos:`'`}[e.slice(1,-1).toLowerCase()]??e:!Number.isInteger(r)||r<0||r>1114111?e:String.fromCodePoint(r)})}function o(e){let t=e.stack,n=`left`;for(let e=t.length-1;e>=0;--e){if(t[e]===`RIGHT`){n=`right`;break}if(t[e]===`C`||t[e]===`CB`){n=`center`;break}}return{bold:t.includes(`B`)||t.includes(`BOLD`),center:n===`center`,right:n===`right`,doubleHeight:t.includes(`L`)||t.includes(`CB`)||t.includes(`DB`),doubleWidth:t.includes(`W`)||t.includes(`CB`)||t.includes(`DB`)}}function s(e){let t=o(e);return{parts:[],center:t.center,right:t.right}}function c(e,t){e.at(-1).parts.at(-1)?.type===`control`&&e.push(s(t))}function l(e,t,n){let r=o(n),i={type:`text`,text:a(t),bold:r.bold,center:r.center};r.right&&(i.right=!0),r.doubleHeight&&(i.doubleHeight=!0),r.doubleWidth&&(i.doubleWidth=!0),e.at(-1).parts.push(i)}function u(e,t,n){if(n.qrText!==null){n.qrText+=a(t);return}c(e,n);let r=o(n),i=t.split(`
`);i.forEach((t,a)=>{t&&l(e,t,n),a<i.length-1&&(e.at(-1).center||=r.center,e.at(-1).right||=r.right,e.push(s(n)))})}function d(e){let t=i(e),a={stack:[],qrText:null},l=[s(a)],d=0;for(let e of t.matchAll(n)){u(l,t.slice(d,e.index),a);let n=e[0],i=n.match(r)?.[1]?.toUpperCase(),f=/^<\//.test(n);if(i===`BR`){if(a.qrText!==null)a.qrText+=`
`;else{let e=o(a);l.at(-1).center||=e.center,l.at(-1).right||=e.right,l.push(s(a))}}else if(i===`LOGO`&&!f){c(l,a);let e=o(a);l.at(-1).parts.push({type:`logo`,center:e.center,right:e.right})}else if(i===`QR`){if(f){c(l,a);let e=o(a),t={type:`qr`,text:a.qrText??``,center:e.center};e.right&&(t.right=!0),l.at(-1).parts.push(t),a.qrText=null}else a.qrText===null&&(a.qrText=``)}else if(i===`CUT`||i===`PLUGIN`)f||(l.at(-1).parts.length&&l.push(s(a)),l.at(-1).parts.push({type:`control`,control:i.toLowerCase()}));else if(!f)a.stack.push(i);else{let r=a.stack.lastIndexOf(i);r>=0&&a.stack.splice(r,1),(i===`C`||i===`CB`)&&(l.at(-1).center||=!0),i===`RIGHT`&&(l.at(-1).right||=!0),(i===`C`||i===`CB`)&&/^\s*<C(?:B)?\b/i.test(t.slice(e.index+n.length))&&l.push({parts:[],center:!0,right:!1})}d=e.index+n.length}if(u(l,t.slice(d),a),a.qrText!==null){let e=o(a);l.at(-1).parts.push({type:`qr`,text:a.qrText,center:e.center})}return l}var f={order:`10-09-2026 22:10

<BOLD>Bestellungsnummer: 002</BOLD>

Bestellung-ID: ******2aad

<B>Tisch: 13 (Space)</B>

------------------------------------------------

<B>Baldmoeglichst</B>

------------------------------------------------

<B>1 x 63 DRAGON RIVER</B>

<B>1 x Chicken</B>

<B>1 x 58 Curry -Crispy Chicken</B>

<B>1 x Kinder bis 6J Buffet</B>`,receipt:`<LOGO><BR><C>(0° Preview) - Enrico</C><C>This Address doesn't exist 1A<BR>41468 Nowhere</C><C>Tel.: +490000000000</C><C>Email: demo@example.com</C><C>St.-Nr.: 88888888</C><BR><BR><BOLD>Zwischenbon</BOLD><BR><BOLD>Bestellungsnummer: 029</BOLD><BR>Bestellung-ID: e17e<BR>Gedruckt um: 17-11-2025 21:03<BR><BOLD>Ausser Haus</BOLD><BR>Kunde: enrico etst<BR>Abholungszeit: baldmoeglichst (17-11-2025)<BR>Telefonnummer: 00000000000<BR>Zahlungsmethode: Bar<BR>------------------------------------------------<BR>4 001 # DEAL - Smashed Burger. 9.99 39.96<BR> Doppel<BR> Mineralwasser still<BR> Pommes<BR>------------------------------------------------<BR><BR><BOLD>Rechnungsbetrag</BOLD> <B>39.96€</B><BR><BR><BOLD>Zahlungsbetrag</BOLD> <B>39.96€</B><BR>================================================<BR> MWST NETTO STEUER BRUTTO<BR> 19.00% 0.00 0.00 0.00<BR> 7.00% 37.35 2.61 39.96<BR><BR><C>Vielen Dank fuer Ihren Besuch</C><BR><BR>------------------------------------------------<BR><BR>Storniert: 0.00<BR><BR><C><B>To Go</B></C><C><B>enrico etst</B></C><C><B>029</B></C>`,alert:`<C><B>21:00 17-11-2025</B></C><BR><BR><C><B>Neue Lieferbestellung</B></C><BR><BR><B>Kunde:</B><BR><B>TEST ALLO</B><BR><BR><B>Lieferzeit:</B><BR><B>06:00 (18-11-2025)</B><BR><BR><C>Bitte bestaetigen Sie im System!</C><BR><BR>`,controls:`<CB>FEIEYUN small ticket</CB><BR><C><L>Double height</L></C><BR><C><W>Double width</W></C><BR><RIGHT>Right aligned 42.99</RIGHT><BR><QR>https://example.test/order/029</QR><BR><CUT><PLUGIN>`,realWorldDaily:`TAGESABRECHNUNG (Abgeschlossen)
Kopie
Z-Nummer: 003
Gestartet um: 12-02-2025 12:00
Erstellt um: 17-03-2025 18:49
Erstellt von: allo Zhan
Gedruckt um: 19-03-2025 13:40
Gedruckt von:   
Konto: demo@example.com
Gedruckt: 2x

----------------------------------------
SPARTE                              BRUTTO
----------------------------------------
3 Sonstige .                       -40.00  -2%
78 Sonstige                       1475.00  74%
53 Sonstige                        495.00  25%
30 Sonstige                         22.00   1%
1 Rabatt                            -0.25   0%
2 Wraps                             23.00   1%
1 Biryani                           14.00   1%
1 SIGN. COC.                        12.50   1%
----------------------------------------
Umsatz   7.00%                       0.00
Umsatz  19.00%                    2001.25
========================================
Umsatz                              2001.25

Bar (Trinkgeld)                       33.23
Unbar (Trinkgeld)                      0.00
========================================
Trinkgeld                             33.23

Bar                                  1745.68
Karte                                 275.80
Online                                  0.00
Gutschein                              13.00
========================================
Total                                2034.48
----------------------------------------
Umsatz                              2001.25
Trinkgeld                             33.23

========================================
MWST   7.00%       0.00   NETTO:      0.00
MWST  19.00%     319.53   NETTO:   1681.72
MWST   0.00%       0.00   NETTO:     33.23
----------------------------------------
Total                  319.53       1714.95
========================================

                    7.00%        19.00%
DineIn                0.00          2453.25
Pickup                0.00             0.00
----------------------------------------
Total                 0.00          2453.25
========================================

Erste Bonierung:    12:02
Letzte Bonierung:   20:27
----------------------------------------

Heute wurde storniert:              299.90

12:04 1 Bar Item 1                    1.00 (3)
15:31 1 First Item                   10.90
15:33 2 Second Cat item              22.00
11:22 1 36                           36.00 (1)
11:22 1 45                           45.00 (1)
16:27 1 First Item                   27.00 (!!!)
16:27 1 36                           36.00 (!!!)
16:27 10 Second Cat item            110.00 (!!!)
13:53 1 Veg Biryani                   12.00 (!!!)

----------------------------------------
Stornierte Bestellungen

Bestellnummer
001                                  -40.00
001                                  -40.00
012                                 -372.00
----------------------------------------
01hvdv4kjcw318fr8ftg6fvhgl           -452.00

Summe                                -452.00
----------------------------------------

Kassenbuch Bargeld

Kassenstand:                           0.00

Anfangssaldo                       10000.00
Edeka                                 -20.09

Bargeld am Ende des Tags:          11725.59
----------------------------------------

Kundenkarten

Einnahmen:                            210.00
Bareinnahmen:                         210.00
Vouchers:                               0.00
Sonstige Einnahmen:                    0.00
Ausgabe:                               13.00
Anpassung:                              0.00
----------------------------------------

Very Suspicious Company GmbH - Enrico
This Address doesn't exist 1A, 41468 Nowhere
St.-Nr.:    88888888`,daily:`TAGESABRECHNUNG (Vorlaeufig)

Konto: demo@example.com

Gestartet um: 09-08-2026 15:37

Gedruckt um: 11-09-2026 18:35

Gedruckt von:  

----------------------------------------

SPARTE                       BRUTTO

----------------------------------------

1 FUSION RO.                  16.50  38%
1 Chicken B.                   7.99  19%
1 Curry                       18.50  43%
1 All You C.                   0.00   0%
----------------------------------------
Umsatz   7.00%                42.99
Umsatz  19.00%                 0.00
========================================
<BOLD>Umsatz                             42.99</BOLD>
Bar (Trinkgeld)                     0.00
Unbar (Trinkgeld)                   0.00
========================================
Trinkgeld                           0.00
========================================
<BOLD>Bar                                42.99</BOLD>
<BOLD>Karte                               0.00</BOLD>
Online                              0.00
========================================
<B>Total          42.99</B>
----------------------------------------
Umsatz                             42.99
Trinkgeld                           0.00
Bar                                42.99
Bar (Trinkgeld)                     0.00
Unbar (Trinkgeld)                   0.00
Bar Gutschein                       0.00
========================================
Bar abzugeben                      42.99
========================================
MWST   7.00%      2.81  NETTO:     40.18
MWST  19.00%      0.00  NETTO:      0.00
MWST   0.00%      0.00  NETTO:      0.00
----------------------------------------
Total             2.81             40.18
========================================
Zahlungsmethode
Methode (Anz.) Brutto 7% Netto 19% Netto
Bar (1)         42.99    40.18         -
                    MwSt:2.81`,settlement:`<C>Preview - Enrico</C><C>This Address doesn't exist 1A, 41468 Nowhere</C><C>Tel.: +490000000000</C><C>St.-Nr.: 88888888</C><BR><BR>Gedruckt um: 11-09-2026 18:35<BR><BR><BR>Z#   Datum         19.00%     7.00%    Umsatz<BR>------------------------------------------------<BR>005  25-04-2025   4132.42     86.70   4219.12<BR>006  25-04-2025    113.03     12.30    125.33<BR>007  29-04-2025     16.80      0.00     16.80<BR>008  29-04-2025     16.80      0.00     16.80<BR>009  01-05-2025     41.60      0.00     41.60<BR>------------------------------------------------<BR>                  4320.65     99.00   4419.65<BR><BR><BR><BR>MWST                                    Summe<BR>------------------------------------------------<BR>19.00%                                 689.85<BR>7.00%                                    6.48<BR>------------------------------------------------<BR>                                       696.33<BR><BR><BR><BR>Zahlungsmethode                        Umsatz<BR>------------------------------------------------<BR>Bar                                   4258.43<BR>Karte                                   76.50<BR>Gutschein                               84.72<BR>------------------------------------------------<BR>                                      4419.65<BR><BR><BR><BR>                                Summe<BR>------------------------------------------------<BR>Umsatz                                4419.65<BR>Trinkgeld                               26.43<BR>------------------------------------------------<BR>                                      4446.08<BR><BR>`};Object.defineProperty(exports,"i",{enumerable:!0,get:function(){return f}}),Object.defineProperty(exports,"n",{enumerable:!0,get:function(){return i}}),Object.defineProperty(exports,"r",{enumerable:!0,get:function(){return d}}),Object.defineProperty(exports,"t",{enumerable:!0,get:function(){return e}});