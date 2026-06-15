/**
 * Travel Data — 旅行足迹数据
 *
 * 格式说明：
 *   - lat: 纬度
 *   - lng: 经度
 *   - city: 城市名
 *   - country: 国家
 *   - date: 访问时间
 *   - emoji: 代表该城市的 emoji
 *   - story: 旅行故事（支持 HTML）
 *   - photo: 照片 URL（可用本地路径或网络图片）
 *
 * 💡 修改这个文件即可更新你的旅行地图，无需改动其他代码！
 */

const TRAVEL_DATA = [
  {
    lat: 48.8566,
    lng: 2.3522,
    city: "Paris",
    country: "France",
    date: "2024-06",
    emoji: "🗼",
    story: "在塞纳河畔散步，找到了一家隐藏的咖啡馆，拿铁和可颂绝配。",
    photo: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=250&fit=crop"
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    city: "Tokyo",
    country: "Japan",
    date: "2024-03",
    emoji: "🗾",
    story: "迷失在新宿的巷弄里，转角遇到一家只有 8 个座位的拉面店，味噌拉面改变了我的人生。",
    photo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop"
  },
  {
    lat: 40.7128,
    lng: -74.0060,
    city: "New York",
    country: "USA",
    date: "2023-11",
    emoji: "🗽",
    story: "中央公园的秋叶、百老汇的灯光、凌晨两点的 pizza slice —— 这座城市从不睡觉。",
    photo: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=250&fit=crop"
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    city: "London",
    country: "UK",
    date: "2023-08",
    emoji: "🇬🇧",
    story: "大英博物馆待了一整天，傍晚在泰晤士河边看日落，伦敦眼缓缓转动。",
    photo: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop"
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    city: "Sydney",
    country: "Australia",
    date: "2023-02",
    emoji: "🦘",
    story: "邦迪海滩的日出、歌剧院的剪影、还有那只抢了我三明治的海鸥。",
    photo: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=250&fit=crop"
  },
  {
    lat: 22.3193,
    lng: 114.1694,
    city: "Hong Kong",
    country: "China",
    date: "2024-01",
    emoji: "🌃",
    story: "太平山顶的夜景、庙街夜市的煲仔饭、天星小轮上的海风。",
    photo: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=400&h=250&fit=crop"
  },
  {
    lat: 41.9028,
    lng: 12.4964,
    city: "Rome",
    country: "Italy",
    date: "2023-05",
    emoji: "🏛",
    story: "斗兽场的壮阔、许愿池的硬币、以及此生最好吃的 carbonara。",
    photo: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=250&fit=crop"
  },
  {
    lat: 13.7563,
    lng: 100.5018,
    city: "Bangkok",
    country: "Thailand",
    date: "2022-12",
    emoji: "🛕",
    story: "大金塔的震撼、水上市场的热闹、路边摊的 pad thai 让人停不下来。",
    photo: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&h=250&fit=crop"
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    city: "Rio de Janeiro",
    country: "Brazil",
    date: "2022-07",
    emoji: "🎭",
    story: "基督像俯瞰全城、科帕卡巴纳的沙滩排球、还有热情的桑巴节奏。",
    photo: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=250&fit=crop"
  },
  {
    lat: 64.1466,
    lng: -21.9426,
    city: "Reykjavik",
    country: "Iceland",
    date: "2024-09",
    emoji: "🌋",
    story: "极光在头顶舞动、蓝湖温泉的蒸汽、黑沙滩上的巨浪 —— 像另一个星球。",
    photo: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=400&h=250&fit=crop"
  }
];

// 计算总里程（简单估算）
function calculateTotalDistance() {
  let total = 0;
  for (let i = 1; i < TRAVEL_DATA.length; i++) {
    const prev = TRAVEL_DATA[i - 1];
    const curr = TRAVEL_DATA[i];
    total += haversine(prev.lat, prev.lng, curr.lat, curr.lng);
  }
  return Math.round(total);
}

// Haversine 公式计算两点间距离（km）
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// 统计国家数
function countCountries() {
  const countries = new Set(TRAVEL_DATA.map(d => d.country));
  return countries.size;
}
