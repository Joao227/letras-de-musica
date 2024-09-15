const axios = require("axios");
const cheerio = require("cheerio");
const { chromium } = require("playwright")

exports.searchLyrics = async (nameMusic) => {

    const searchURL = `https://www.letras.mus.br/?q=${encodeURIComponent(nameMusic)}`;
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(searchURL, { waitUntil: 'domcontentloaded' });

    await page.waitForSelector('.gs-title', { timeout: 5000 });

    const content = await page.content();

    const $ = cheerio.load(content);
    const urlLyric = $('.gs-title a').attr("href");

    await browser.close();

    if (!urlLyric) {
        throw new Error("Não foi possível encontrar a letra da música.");
    }

    const response = await axios.get(urlLyric);
    const $lyricPage = cheerio.load(response.data);

    let artist = $lyricPage(".textStyle-secondary").text().trim();
    let title = $lyricPage(".textStyle-primary").text().trim();
    let lyrics = $lyricPage(".lyric-original").html();
    lyrics = lyrics.replace(/<br\s*\/?>/gi, '\n').replace(/<p>/gi, '\n').replace(/<\/p>/gi, '\n');

    let songInfo = { "artist": artist, "title": title, "lyrics": lyrics };

    return songInfo;
    
}
