const getSources = function () {
    return Object.keys(sources).map(function(key){
        return `<option value="${key}">${sources[key]}</option>\n`;
    });
}

const sources = {
    'abc-news': 'ABC News',
    'abc-news-au': 'ABC News (AU)',
    'aftenposten': 'Aftenposten',
    'al-jazeera-english': 'Al Jazeera English',
    'ansa': 'ANSA.it',
    'argaam': 'Argaam'
}

/*
Ars Technica
Ars Technica
ars-technica
Ary News
Ary News
ary-news
Associated Press
Associated Press
associated-press
Australian Financial Review
Australian Financial Review
australian-financial-review
Axios
Axios
axios
BBC News
BBC News
bbc-news
BBC Sport
BBC Sport
bbc-sport
Bild
Bild
bild
Blasting News (BR)
Blasting News (BR)
blasting-news-br
Bleacher Report
Bleacher Report
bleacher-report
Bloomberg
Bloomberg
bloomberg
Breitbart News
Breitbart News
breitbart-news
Business Insider
Business Insider
business-insider
Business Insider (UK)
Business Insider (UK)
business-insider-uk
Buzzfeed
Buzzfeed
buzzfeed
CBC News
CBC News
cbc-news
CBS News
CBS News
cbs-news
CNBC
CNBC
cnbc
CNN
CNN
cnn
CNN Spanish
CNN Spanish
cnn-es
Crypto Coins News
Crypto Coins News
crypto-coins-news
Daily Mail
Daily Mail
daily-mail
Der Tagesspiegel
Der Tagesspiegel
der-tagesspiegel
Die Zeit
Die Zeit
die-zeit
El Mundo
El Mundo
el-mundo
Engadget
Engadget
engadget
Entertainment Weekly
Entertainment Weekly
entertainment-weekly
ESPN
ESPN
espn
ESPN Cric Info
ESPN Cric Info
espn-cric-info
Financial Post
Financial Post
financial-post
Financial Times
Financial Times
financial-times
Focus
Focus
focus
Football Italia
Football Italia
football-italia
Fortune
Fortune
fortune
FourFourTwo
FourFourTwo
four-four-two
Fox News
Fox News
fox-news
Fox Sports
Fox Sports
fox-sports
Globo
Globo
globo
Google News
Google News
google-news
Google News (Argentina)
Google News (Argentina)
google-news-ar
Google News (Australia)
Google News (Australia)
google-news-au
Google News (Brasil)
Google News (Brasil)
google-news-br
Google News (Canada)
Google News (Canada)
google-news-ca
Google News (France)
Google News (France)
google-news-fr
Google News (India)
Google News (India)
google-news-in
Google News (Israel)
Google News (Israel)
google-news-is
Google News (Italy)
Google News (Italy)
google-news-it
Google News (Russia)
Google News (Russia)
google-news-ru
Google News (Saudi Arabia)
Google News (Saudi Arabia)
google-news-sa
Google News (UK)
Google News (UK)
google-news-uk
Göteborgs-Posten
Göteborgs-Posten
goteborgs-posten
Gruenderszene
Gruenderszene
gruenderszene
Hacker News
Hacker News
hacker-news
Handelsblatt
Handelsblatt
handelsblatt
IGN
IGN
ign
Il Sole 24 Ore
Il Sole 24 Ore
il-sole-24-ore
Independent
Independent
independent
Infobae
Infobae
infobae
InfoMoney
InfoMoney
info-money
La Gaceta
La Gaceta
la-gaceta
La Nacion
La Nacion
la-nacion
La Repubblica
La Repubblica
la-repubblica
Le Monde
Le Monde
le-monde
Lenta
Lenta
lenta
L'equipe
L'equipe
lequipe
Les Echos
Les Echos
les-echos
Libération
Libération
liberation
Marca
Marca
marca
Mashable
Mashable
mashable
Medical News Today
Medical News Today
medical-news-today
Metro
Metro
metro
Mirror
Mirror
mirror
MSNBC
MSNBC
msnbc
MTV News
MTV News
mtv-news
MTV News (UK)
MTV News (UK)
mtv-news-uk
National Geographic
National Geographic
national-geographic
National Review
National Review
national-review
NBC News
NBC News
nbc-news
News24
News24
news24
New Scientist
New Scientist
new-scientist
News.com.au
News.com.au
news-com-au
Newsweek
Newsweek
newsweek
New York Magazine
New York Magazine
new-york-magazine
Next Big Future
Next Big Future
next-big-future
NFL News
NFL News
nfl-news
NHL News
NHL News
nhl-news
NRK
NRK
nrk
Politico
Politico
politico
Polygon
Polygon
polygon
RBC
RBC
rbc
Recode
Recode
recode
Reddit /r/all
Reddit /r/all
reddit-r-all
Reuters
Reuters
reuters
RT
RT
rt
RTE
RTE
rte
RTL Nieuws
RTL Nieuws
rtl-nieuws
SABQ
SABQ
sabq
Spiegel Online
Spiegel Online
spiegel-online
Svenska Dagbladet
Svenska Dagbladet
svenska-dagbladet
T3n
T3n
t3n
TalkSport
TalkSport
talksport
TechCrunch
TechCrunch
techcrunch
TechCrunch (CN)
TechCrunch (CN)
techcrunch-cn
TechRadar
TechRadar
techradar
The American Conservative
The American Conservative
the-american-conservative
The Economist
The Economist
the-economist
The Globe And Mail
The Globe And Mail
the-globe-and-mail
The Guardian (AU)
The Guardian (AU)
the-guardian-au
The Guardian (UK)
The Guardian (UK)
the-guardian-uk
The Hill
The Hill
the-hill
The Hindu
The Hindu
the-hindu
The Huffington Post
The Huffington Post
the-huffington-post
The Irish Times
The Irish Times
the-irish-times
The Jerusalem Post
The Jerusalem Post
the-jerusalem-post
The Lad Bible
The Lad Bible
the-lad-bible
The New York Times
The New York Times
the-new-york-times
The Next Web
The Next Web
the-next-web
The Sport Bible
The Sport Bible
the-sport-bible
The Telegraph
The Telegraph
the-telegraph
The Times of India
The Times of India
the-times-of-india
The Verge
The Verge
the-verge
The Wall Street Journal
The Wall Street Journal
the-wall-street-journal
The Washington Post
The Washington Post
the-washington-post
The Washington Times
The Washington Times
the-washington-times
Time
Time
time
USA Today
USA Today
usa-today
Vice News
Vice News
vice-news
Wired
Wired
wired
Wired.de
Wired.de
wired-de
Wirtschafts Woche
Wirtschafts Woche
wirtschafts-woche
Xinhua Net
Xinhua Net
xinhua-net
Ynet
Ynet
ynet
*/