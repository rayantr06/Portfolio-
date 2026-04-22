import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.APP_BASE_URL || "http://127.0.0.1:3005";
const outputDir = process.env.SCREENSHOT_DIR
  ? path.resolve(process.env.SCREENSHOT_DIR)
  : path.resolve("docs/screenshots");
const edgePath =
  process.env.EDGE_PATH ||
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";

async function ensureLoaded(page, extraSelector) {
  await page.waitForLoadState("networkidle");

  if (extraSelector) {
    await page.waitForSelector(extraSelector, { timeout: 15000 });
  }
}

async function capture(page, name, selector) {
  await ensureLoaded(page, selector);
  await page.screenshot({
    path: path.join(outputDir, name),
    fullPage: true,
  });
}

const browser = await chromium.launch({
  executablePath: edgePath,
  headless: true,
});

const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  colorScheme: "light",
});

const page = await context.newPage();

const uniqueEmail = `rayan.portfolio.${Date.now()}@example.com`;
const testimonialMessage =
  "Portfolio clair, bien structure et facile a parcourir sur toutes les pages.";

try {
  await page.goto(`${baseUrl}/login`);
  await capture(page, "login.png", 'h1:text("Connexion")');

  await page.goto(`${baseUrl}/inscription`);
  await capture(page, "inscription.png", 'h1:text("Inscription")');

  await page.fill('input[name="prenom"]', "Rayan");
  await page.fill('input[name="nom"]', "Terki");
  await page.fill('input[name="email"]', uniqueEmail);
  await page.fill('input[name="password"]', "secure123");

  await Promise.all([
    page.waitForURL(`${baseUrl}/`, { timeout: 20000 }),
    page.click('button[type="submit"]'),
  ]);

  await capture(
    page,
    "accueil.png",
    'text=Developpeur IA et application full stack',
  );

  await page.goto(`${baseUrl}/projets`);
  await capture(page, "projets.png", 'text=Gestion de tournoi de golf');

  await page.goto(`${baseUrl}/projets/ramypulse`);
  await capture(page, "projet-ramypulse.png", 'text=Ouvrir le depot GitHub');

  await page.goto(`${baseUrl}/temoignages/nouveau`);
  await ensureLoaded(page, 'text=Nouveau temoignage');
  await page.fill('textarea[name="message"]', testimonialMessage);
  await page.screenshot({
    path: path.join(outputDir, "temoignage-formulaire.png"),
    fullPage: true,
  });

  await Promise.all([
    page.waitForURL(`${baseUrl}/temoignages`, { timeout: 20000 }),
    page.click('button[type="submit"]'),
  ]);

  await capture(page, "temoignages.png", `text=${testimonialMessage}`);
} finally {
  await browser.close();
}
