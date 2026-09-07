/**
 * 访客统计前端 —— 每个页面引入一次
 *
 * 填充三类元素（存在哪个填哪个）：
 *   #stat-uv       首页"visitors"数字
 *   #stat-pv       首页"views"数字
 *   #visit-count   日志页的"👣 本站访客 N"徽章
 *
 * 同一次会话只上报一次，刷新不重复计数。
 */
(function () {
  // ↓↓↓ 部署 Cloudflare Worker 后，把这里换成你的 workers.dev 地址 ↓↓↓
  var API = 'https://jimmy-stats.YOUR-SUBDOMAIN.workers.dev';
  // ↑↑↑ 例：https://jimmy-stats.jimmy-adams.workers.dev

  var elUV = document.getElementById('stat-uv');
  var elPV = document.getElementById('stat-pv');
  var badge = document.getElementById('visit-count');

  // 还没部署：安静地什么都不做（不清空页面上的占位符之外的东西）
  if (API.indexOf('YOUR-SUBDOMAIN') > -1) {
    if (badge) badge.remove();
    return;
  }

  function render(d) {
    if (!d) return;
    if (elUV && typeof d.uv === 'number') elUV.textContent = d.uv.toLocaleString('en-US');
    if (elPV && typeof d.pv === 'number') elPV.textContent = d.pv.toLocaleString('en-US');
    if (badge && typeof d.uv === 'number') {
      badge.textContent = '\u{1F463} 本站访客 ' + d.uv.toLocaleString('en-US');
    }
  }

  var first = !sessionStorage.getItem('__visited');
  var url = API + (first ? '/hit' : '/count');
  var opts = { method: 'GET' };

  if (first) {
    opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: location.pathname,
        ref: document.referrer,
        ua: navigator.userAgent
      })
    };
  }

  fetch(url, opts)
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (first) sessionStorage.setItem('__visited', '1');
      render(d);
    })
    .catch(function () {
      // 后端不可用时不显示任何数字，也不影响页面
      if (badge) badge.remove();
      if (elUV) elUV.textContent = '—';
      if (elPV) elPV.textContent = '—';
    });
})();
