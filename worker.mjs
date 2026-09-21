export class VisitCounter {
  constructor(state) {
    this.sql = state.storage.sql;
    this.sql.exec('CREATE TABLE IF NOT EXISTS counter (id INTEGER PRIMARY KEY, total INTEGER NOT NULL)');
    this.sql.exec('INSERT OR IGNORE INTO counter (id, total) VALUES (1, 0)');
  }

  async fetch(request) {
    const query = request.method === 'POST'
      ? 'UPDATE counter SET total = total + 1 WHERE id = 1 RETURNING total'
      : 'SELECT total FROM counter WHERE id = 1';
    return Response.json({ count: this.sql.exec(query).one().total });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/visits') return env.ASSETS.fetch(request);
    if (!['GET', 'POST'].includes(request.method)) return new Response(null, { status: 405 });
    if (request.method === 'POST' && (request.headers.get('Origin') !== url.origin || request.headers.get('X-Visit-Counter') !== '1')) {
      return new Response(null, { status: 403 });
    }
    const counted = /(?:^|;\s*)portfolio_visit=1(?:;|$)/.test(request.headers.get('Cookie') || '');
    const increment = request.method === 'POST' && !counted;
    try {
      const counter = env.VISITS.get(env.VISITS.idFromName('portfolio-total'));
      const response = await counter.fetch(new Request(request.url, { method: increment ? 'POST' : 'GET' }));
      const headers = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      if (request.method === 'POST') headers.set('Set-Cookie', 'portfolio_visit=1; Path=/; Max-Age=1800; HttpOnly; Secure; SameSite=Lax');
      return new Response(response.body, { headers });
    } catch {
      return Response.json({ error: 'Counter unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
    }
  }
};
