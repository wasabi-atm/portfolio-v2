import { BUILDER_API_KEY } from './constants.js';

export async function fetchJson(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`Fetch error: ${r.status}`);
    return r.json();
}

export async function fetchBuilder(model, params = {}) {
    const u = new URL(`https://cdn.builder.io/api/v2/content/${model}`);
    u.searchParams.set('apiKey', BUILDER_API_KEY);

    // flattening query params like 'query.data.slug'
    const qp = (obj) => {
        for (const [k, v] of Object.entries(obj)) {
            u.searchParams.set(k, v);
        }
    };
    qp(params);

    // default fields
    if (!params.limit) u.searchParams.set('limit', 100);

    const data = await fetchJson(u.toString());
    return data.results || [];
}
