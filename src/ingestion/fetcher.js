// src/ingestion/fetcher.js
const axios   = require('axios');
const cheerio = require('cheerio');
const SOURCES = require('./sources');

// ── API-based fetcher (fast, no browser needed) ──────────────────────────────
const fetchFromAPI = async (source) => {
  try {
    const { data } = await axios.get(source.url, {
      headers: {
        'User-Agent'      : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer'         : 'https://internshala.com',
        'Accept'          : 'application/json, text/javascript, */*'
      }
    });

    const $       = cheerio.load(data);
    const results = [];

    $('.individual_internship').each((i, el) => {
      const rawName      = $(el).find('.company-name').text().trim()
                        || $(el).find('.company_name').text().trim();
      const company_name = rawName.split('\n')[0].trim();
      const role         = $(el).find('.profile').text().trim()
                        || $(el).find('.job-internship-name').text().trim();
      const locationRaw  = $(el).find('.locations_strip').text().trim()
                        || $(el).find('.location_link').text().trim();
      const stipendRaw   = $(el).find('.stipend').text().trim();

      if (!company_name) return; // skip empty cards

      results.push({
        company_name,
        company_type : 'startup',
        industry     : 'Technology',
        city         : locationRaw.split(',')[0]?.trim() || null,
        state        : locationRaw.split(',')[1]?.trim() || null,
        website      : null,
        role         : role || null,
        job_type     : source.job_type,
        is_paid      : !stipendRaw.toLowerCase().includes('unpaid'),
        location     : locationRaw || null,
        source       : source.name,
        apply_url    : 'https://internshala.com' + $(el).find('a').attr('href')
      });
    });

    console.log(`🔍 [${source.name}] Found ${results.length} listings`);
    if (results[0]) console.log('Sample:', JSON.stringify(results[0], null, 2));
    return results;

  } catch (err) {
    console.error(`❌ [${source.name}] API fetch failed:`, err.message);
    return [];
  }
};

// ── Route each source to the right fetcher ───────────────────────────────────
const fetchFromSource = async (source) => {
  return fetchFromAPI(source); // using API approach for all sources
};

// ── Fetch from ALL sources and merge ─────────────────────────────────────────
const fetchAll = async () => {
  const allResults = await Promise.all(SOURCES.map(fetchFromSource));
  return allResults.flat();
};

module.exports = { fetchAll };