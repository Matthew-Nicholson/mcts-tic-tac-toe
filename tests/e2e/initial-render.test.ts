import { chromium, Browser, Page, BrowserContext } from "playwright";
import { beforeAll, afterAll, beforeEach, afterEach, it, expect } from "vitest";

let browser: Browser;
let context: BrowserContext;
let page: Page;

beforeAll(async () => {
  browser = await chromium.launch();
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  context = await browser.newContext();
  page = await context.newPage();
});

afterEach(async () => {
  await context.close();
});

it('should display "my-component" element', async () => {
  await page.goto("http://localhost:1337");
  const component = await page.$("data-testid=tic-tac-toe");
  expect(component).toBeTruthy();
});
