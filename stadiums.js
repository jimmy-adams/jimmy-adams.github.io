/**
 * Stadium Data — Top 5 European Leagues Stadiums with Real Media Assets
 *
 * Sources: official club websites, Wikipedia, StadiumDB (2025/26 season)
 * Images: verified Wikimedia Commons thumbnails
 * Videos: official YouTube channels of the five supported clubs
 *
 * Fields:
 *   - name / team / league / city / country / capacity / opened / nickname / lat / lng
 *   - favorite:  whether the stadium is home to a club I support
 *   - visited:   whether the city already appears on my travel map
 *   - image:     verified Wikimedia Commons photo URL
 *   - video:     official YouTube video ID (for favorite clubs only)
 *   - intro:     detailed English introduction
 *   - facts:     extra key facts (architect / record attendance / highlight)
 */

const STADIUMS = [
  // ===== Clubs I support (5) =====
  {
    name: "Old Trafford",
    team: "Manchester United",
    league: "Premier League",
    city: "Manchester",
    country: "England",
    capacity: 74879,
    opened: 1910,
    nickname: "Theatre of Dreams",
    lat: 53.4631, lng: -2.2913,
    favorite: true,
    visited: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/2023_07_31_arne_mueseler_00060-Verbessert-RR_%2853106651455%29.jpg/1280px-2023_07_31_arne_mueseler_00060-Verbessert-RR_%2853106651455%29.jpg",
    video: "JUw49Bqe-Qs",
    intro: "Old Trafford opened in 1910, designed by the Scottish architect Archibald Leitch, and remains one of English football's most iconic theatres. Sir Bobby Charlton gave it the nickname 'Theatre of Dreams'. Badly damaged by bombing during the Second World War, it was rebuilt and expanded around the famous Stretford End. It has staged the 1966 World Cup semi-final, Euro '96, the 2003 Champions League final and football at the 2012 Olympics.",
    facts: { architect: "Archibald Leitch", record: "76,962 (vs Plymouth Argyle, FA Cup 1939)", highlight: "Sir Bobby Charlton's 'Theatre of Dreams'" }
  },
  {
    name: "Santiago Bernabéu",
    team: "Real Madrid",
    league: "La Liga",
    city: "Madrid",
    country: "Spain",
    capacity: 81044,
    opened: 1947,
    nickname: "New Bernabéu (renovated 2025)",
    lat: 40.4530, lng: -3.6883,
    favorite: true,
    visited: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/M-estadio-santiago-bernabeu-diciembre-2024-c.jpg/1280px-M-estadio-santiago-bernabeu-diciembre-2024-c.jpg",
    video: "UekCfdIBDV8",
    intro: "Named after the legendary Real Madrid president Santiago Bernabéu, the stadium opened on 14 December 1947. After an epic 2019–2025 renovation, the new Bernabéu features a retractable roof, a retractable pitch and a 360° LED perimeter skin, making it one of the most advanced football venues in the world. It has hosted the 1982 World Cup final, the 1964 European Championship final and the 2024 Champions League final, and it has watched over the club's 15 European Cups.",
    facts: { architect: "Manuel Muñoz Monasterio & Luis Alemany Soler", record: "c. 129,690 (1982 World Cup, with standing room)", highlight: "2025 retractable roof and 360° LED facade" }
  },
  {
    name: "Allianz Arena",
    team: "Bayern Munich",
    league: "Bundesliga",
    city: "Munich",
    country: "Germany",
    capacity: 75024,
    opened: 2005,
    nickname: "The Inflatable Boat (ETFE façade)",
    lat: 48.2188, lng: 11.6246,
    favorite: true,
    visited: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Allianz_Arena_2008-02-09.jpg/1280px-Allianz_Arena_2008-02-09.jpg",
    video: "wphLZwdWzsY",
    intro: "The Allianz Arena opened in 2005 to replace the Olympic Stadium, designed by the celebrated Swiss practice Herzog & de Meuron. Its signature is the 2,760 ETFE pneumatic panels that wrap the exterior — the world's first stadium able to light up in different colours across its entire surface. On Bayern home nights it glows solid red. It staged the opening match and the final of the 2006 FIFA World Cup.",
    facts: { architect: "Herzog & de Meuron", record: "75,000+ (all-seater era)", highlight: "World's first full-colour-changing exterior" }
  },
  {
    name: "San Siro (Stadio Giuseppe Meazza)",
    team: "Inter Milan",
    league: "Serie A",
    city: "Milan",
    country: "Italy",
    capacity: 75923,
    opened: 1926,
    nickname: "La Scala del Calcio",
    lat: 45.4781, lng: 9.1240,
    favorite: true,
    visited: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Stadio_Meazza_2021_3.jpg/1280px-Stadio_Meazza_2021_3.jpg",
    video: "G66doY-FtTU",
    intro: "San Siro opened in 1926, financed by AC Milan president Piero Pirelli, and was renamed in honour of Inter and Italy legend Giuseppe Meazza in 1947. Today it is shared by AC Milan and Inter. Its most distinctive features are the 11 cylindrical towers and spiral ramps that climb the bowl, which the Italian press have called 'La Scala del Calcio'. The stadium has hosted four Champions League finals and matches at the 1990 World Cup.",
    facts: { architect: "Ulisse Stacchini", record: "c. 82,000 (historical peak with standing)", highlight: "Shared home of Inter and AC Milan" }
  },
  {
    name: "Parc des Princes",
    team: "Paris Saint-Germain",
    league: "Ligue 1",
    city: "Paris",
    country: "France",
    capacity: 47929,
    opened: 1972,
    nickname: "Le Parc",
    lat: 48.8414, lng: 2.2530,
    favorite: true,
    visited: true,   // ← Paris is already on the travel map ✈
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Paris_Le_Parc_des_Princes.jpg/1280px-Paris_Le_Parc_des_Princes.jpg",
    video: "AuMvehOLijc",
    intro: "The Parc des Princes opened in 1972 on a site that had hosted a velodrome since 1897. It was designed by Roger Taillibert, the architect also responsible for Montreal's Olympic Park. It is the largest football stadium in Paris and has been PSG's home since 1974. It hosted matches at the 1998 World Cup, Euro 2016 and the 2024 Olympics. Paris itself is already on my travel map, so this ground feels like a natural stop on the same route.",
    facts: { architect: "Roger Taillibert", record: "c. 50,000 (historical peak)", highlight: "Paris ✈ on the travel map · Roger Taillibert design" }
  },

  // ===== Premier League representatives =====
  {
    name: "Emirates Stadium",
    team: "Arsenal",
    league: "Premier League",
    city: "London",
    country: "England",
    capacity: 60704,
    opened: 2006,
    nickname: "The Emirates",
    lat: 51.5549, lng: -0.1084,
    favorite: false,
    visited: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/London_Emirates_Stadium_arsenal.jpg/1280px-London_Emirates_Stadium_arsenal.jpg",
    video: null,
    intro: "The Emirates Stadium opened in 2006, replacing the club's much-loved former home Highbury. Located in Holloway, North London, it is known for its steep bowl and the 'Arsenalisation' art installations that celebrate the club's history. It is one of the most important examples of the modern Premier League stadium era.",
    facts: { architect: "Populous (formerly HOK Sport)", record: "60,161 (Premier League peak)", highlight: "Replaced the legendary Highbury" }
  },
  {
    name: "Anfield",
    team: "Liverpool",
    league: "Premier League",
    city: "Liverpool",
    country: "England",
    capacity: 61276,
    opened: 1884,
    nickname: "The Kop",
    lat: 53.4308, lng: -2.9608,
    favorite: false,
    visited: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Panorama_of_Anfield_with_new_main_stand_%2829676137824%29.jpg/1280px-Panorama_of_Anfield_with_new_main_stand_%2829676137824%29.jpg",
    video: null,
    intro: "Anfield opened in 1884 and was originally Everton's home; Liverpool moved in when the club was founded in 1892. The ground is synonymous with the Kop stand and the pre-match anthem You'll Never Walk Alone. A memorial to the Hillsborough disaster stands outside, making it one of the most emotionally charged venues in English football.",
    facts: { architect: "Original 1884, multiple expansions", record: "c. 61,905 (historical peak with standing)", highlight: "The Kop and You'll Never Walk Alone" }
  },

  // ===== La Liga representatives =====
  {
    name: "Spotify Camp Nou",
    team: "FC Barcelona",
    league: "La Liga",
    city: "Barcelona",
    country: "Spain",
    capacity: 99354,
    opened: 1957,
    nickname: "El Nou Estadi (renovating)",
    lat: 41.3809, lng: 2.1228,
    favorite: false,
    visited: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Camp_Nou_aerial.jpg/1280px-Camp_Nou_aerial.jpg",
    video: null,
    intro: "Camp Nou opened in 1957, designed by architect Francesc Mitjans. With a capacity of roughly 99,354 it is the largest football stadium in Europe. Since 2022 it has been undergoing the vast Espai Barça redevelopment and is expected to reopen in its new form by 2026. The stadium has witnessed the Dream Team, MSN and countless classic Clásicos.",
    facts: { architect: "Francesc Mitjans", record: "120,000+ (historical peak with standing)", highlight: "Europe's largest stadium · Espai Barça renovation" }
  },
  {
    name: "Cívitas Metropolitano",
    team: "Atlético Madrid",
    league: "La Liga",
    city: "Madrid",
    country: "Spain",
    capacity: 70692,
    opened: 2017,
    nickname: "Wanda Metropolitano",
    lat: 40.4358, lng: -3.5999,
    favorite: false,
    visited: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Atleti_vs_Villarreal_-_September_2025.jpg/1280px-Atleti_vs_Villarreal_-_September_2025.jpg",
    video: null,
    intro: "The Metropolitano became Atlético Madrid's home in 2017. The original 'La Peineta' stadium was built in 1994 for the 1997 World Athletics Championships and was later rebuilt and converted into a football-specific arena. It now holds around 70,692 people and is one of the most modern stadiums in Spain.",
    facts: { architect: "Cruz y Ortiz (original) / Populous (conversion)", record: "c. 70,000+", highlight: "Converted from an athletics stadium into Atlético's new home" }
  },

  // ===== Serie A representatives =====
  {
    name: "Stadio Olimpico",
    team: "Roma / Lazio",
    league: "Serie A",
    city: "Rome",
    country: "Italy",
    capacity: 70634,
    opened: 1937,
    nickname: "The Olympic",
    lat: 41.9342, lng: 12.4549,
    favorite: false,
    visited: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Stadio_Olimpico_2024.jpg/1280px-Stadio_Olimpico_2024.jpg",
    video: null,
    intro: "Stadio Olimpico opened in 1937 on the banks of the Tiber in Rome and is shared by city rivals Roma and Lazio. It has been renovated several times, most notably for the 1990 World Cup and the 2009 Champions League final. It hosted the 1990 World Cup final, the 1996 European Championship final and the 2024 European Championship final, making it one of Italy's most important stadiums.",
    facts: { architect: "Del Debbio / later renovations", record: "c. 80,000 (historical peak)", highlight: "Rome & Lazio share it · 2024 Euro final host" }
  },
  {
    name: "Allianz Stadium (Juventus)",
    team: "Juventus",
    league: "Serie A",
    city: "Turin",
    country: "Italy",
    capacity: 41507,
    opened: 2011,
    nickname: "The Stadium",
    lat: 45.1096, lng: 7.6413,
    favorite: false,
    visited: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/2021%E2%80%9322_UEFA_Women%27s_Champions_League_Final_in_Turin%2C_Italy_1.jpg/1280px-2021%E2%80%9322_UEFA_Women%27s_Champions_League_Final_in_Turin%2C_Italy_1.jpg",
    video: null,
    intro: "Juventus Stadium opened in 2011 and was the first modern football-specific stadium in Italy to be built and owned by a club rather than a municipality. It replaced the much-criticised Stadio delle Alpi and is noted for its compact bowl and close-to-the-pitch atmosphere, which made it a model for Italian stadium privatisation.",
    facts: { architect: "Hernando", record: "c. 41,507", highlight: "Italy's first club-owned modern stadium" }
  },

  // ===== Bundesliga representative =====
  {
    name: "Signal Iduna Park",
    team: "Borussia Dortmund",
    league: "Bundesliga",
    city: "Dortmund",
    country: "Germany",
    capacity: 81365,
    opened: 1974,
    nickname: "Westfalenstadion / Yellow Wall",
    lat: 51.4926, lng: 7.4519,
    favorite: false,
    visited: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Signal_iduna_park_stadium_dortmund_4.jpg/1280px-Signal_iduna_park_stadium_dortmund_4.jpg",
    video: null,
    intro: "Signal Iduna Park, still known to many as the Westfalenstadion, opened in 1974 and is the largest football stadium in Germany with a capacity of roughly 81,365. Its most famous feature is the Südtribüne, the 'Yellow Wall' — the largest standing terrace in Europe, holding about 25,000 Dortmund supporters. The match-day atmosphere of flares, yellow flags and the wall of noise is one of football's great spectacles.",
    facts: { architect: "Planungsgruppe Stadion", record: "83,000+ (German record)", highlight: "Europe's largest standing terrace, the 'Yellow Wall'" }
  },

  // ===== Ligue 1 representative =====
  {
    name: "Stade Vélodrome",
    team: "Olympique de Marseille",
    league: "Ligue 1",
    city: "Marseille",
    country: "France",
    capacity: 67394,
    opened: 1937,
    nickname: "Le Vélodrome",
    lat: 43.2692, lng: 5.3959,
    favorite: false,
    visited: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Stade_V%C3%A9lodrome_en_novembre_2021_%281%29.jpg/1280px-Stade_V%C3%A9lodrome_en_novembre_2021_%281%29.jpg",
    video: null,
    intro: "Stade Vélodrome opened in 1937 and is the home of Olympique de Marseille. It has long been the largest club stadium in France and hosted matches at the 1998 World Cup as well as the 2016 European Championship. The Mediterranean heat, the Mediterranean light and the relentless Marseille crowd make it one of the most atmospheric grounds in Ligue 1.",
    facts: { architect: "Henri Ploquin (original)", record: "c. 67,394", highlight: "France's most atmospheric club stadium" }
  }
];

// League brand colours (used for card top bars and chips)
const LEAGUE_COLORS = {
  "Premier League": "#37003C",
  "La Liga":        "#EE8707",
  "Serie A":        "#008FD7",
  "Bundesliga":     "#D20515",
  "Ligue 1":        "#091C3E"
};
