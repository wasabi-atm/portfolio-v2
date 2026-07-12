export const BUILDER_API_KEY = "90c23362a6384ffabd3fd5a5978de250";

export async function fetchBuilder(model, params = {}) {
  try {
    const u = new URL(`https://cdn.builder.io/api/v2/content/${model}`);
    u.searchParams.set("apiKey", BUILDER_API_KEY);
    
    // Add default limit if not provided
    if (!params.limit) {
      u.searchParams.set("limit", "100");
    }

    // Set search params (flat query formatting)
    for (const [k, v] of Object.entries(params)) {
      u.searchParams.set(k, typeof v === "object" ? JSON.stringify(v) : v);
    }

    const res = await fetch(u.toString(), { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error(`Error fetching Builder.io model ${model}:`, err);
    return [];
  }
}
