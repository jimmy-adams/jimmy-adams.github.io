/**
 * Stadium Data — 五大联赛代表球场真实数据
 *
 * 数据来源：各俱乐部官网 / StadiumDB / 公开资料（截至 2025/26 赛季）
 * 字段说明：
 *   - name:      球场官方名称
 *   - team:      主队
 *   - league:    所属联赛
 *   - city:      城市
 *   - country:   国家
 *   - capacity:  座位数（2025/26 赛季）
 *   - opened:    启用年份
 *   - nickname:  别称
 *   - lat/lng:   坐标（用于地图展示）
 *   - favorite:  是否为我支持的主队
 *   - visited:   该城市是否在我旅行地图中（用于联动）
 */

const STADIUMS = [
  // ===== 我支持的主队 (5) =====
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
    visited: false
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
    visited: false
  },
  {
    name: "Allianz Arena",
    team: "Bayern Munich",
    league: "Bundesliga",
    city: "Munich",
    country: "Germany",
    capacity: 75024,
    opened: 2005,
    nickname: "TheInflatable Boat (ETFE façade)",
    lat: 48.2188, lng: 11.6246,
    favorite: true,
    visited: false
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
    visited: false
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
    visited: true   // ← Paris 已在旅行地图中 ✈
  },

  // ===== 英超代表 =====
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
    visited: false
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
    visited: false
  },

  // ===== 西甲代表 =====
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
    visited: false
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
    visited: false
  },

  // ===== 意甲代表 =====
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
    visited: false
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
    visited: false
  },

  // ===== 德甲代表 =====
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
    visited: false
  },

  // ===== 法甲代表 =====
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
    visited: false
  }
];

// 联赛品牌色（用于球场卡片顶部色条）
const LEAGUE_COLORS = {
  "Premier League": "#37003C",
  "La Liga":        "#EE8707",
  "Serie A":        "#008FD7",
  "Bundesliga":     "#D20515",
  "Ligue 1":        "#091C3E"
};
