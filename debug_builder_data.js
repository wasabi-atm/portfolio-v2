
const API_KEY = '90c23362a6384ffabd3fd5a5978de250';
const MODEL = 'blogs';
const SLUG = 'carte-1-1-update';

async function run() {
    const url = `https://cdn.builder.io/api/v2/content/${MODEL}?apiKey=${API_KEY}&query.data.slug=${SLUG}&limit=1`;
    console.log('Fetching:', url);
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
            const item = data.results[0];
            console.log('Keys in data:', Object.keys(item.data));
            console.log('Full Data Keys:', JSON.stringify(item.data, null, 2));
        } else {
            console.log('No results found for slug:', SLUG);
        }
    } catch (e) {
        console.error(e);
    }
}

run();
