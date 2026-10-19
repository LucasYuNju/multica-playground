import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

test("page, photos, navigation, and contact work at each viewport", async ({
  page,
}, testInfo) => {
  await page.goto("/")
  await expect(page).toHaveTitle("Alex Morgan — Photographer")
  await expect(page.locator("h1")).toHaveText("A feeling,held in a frame.")
  await expect(page.locator(".photo-card")).toHaveCount(6)
  for (const id of ["work", "about", "sessions", "contact"]) {
    await page.locator(`nav a[href='#${id}']`).click()
    await expect(page).toHaveURL(new RegExp(`#${id}$`))
    await expect(page.locator(`#${id}`)).toBeInViewport()
  }
  await expect(page.locator(".contact-email")).toHaveAttribute(
    "href",
    "mailto:hello@example.com?subject=Photography%20enquiry"
  )
  for (const link of await page.locator(".session-link").all()) {
    await expect(link).toHaveAttribute(
      "href",
      /^mailto:hello@example.com\?subject=.+%20enquiry$/
    )
  }
  await page.emulateMedia({ reducedMotion: "reduce" })
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded()
    await expect(image).toHaveJSProperty("complete", true)
    await expect(image).not.toHaveJSProperty("naturalWidth", 0)
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    )
  ).toBe(true)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({
    path: testInfo.outputPath(`${testInfo.project.name}-full.png`),
    fullPage: true,
  })
})

test("narrow phones and tablets do not overflow", async ({ page }) => {
  await page.goto("/")
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 })
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      ),
      `overflow at ${width}px`
    ).toBe(true)
  }
})

test("filters and keyboard photo viewer preserve context and focus", async ({
  page,
}) => {
  await page.goto("/")
  await page.getByRole("button", { name: "People", exact: true }).click()
  await expect(page.locator(".photo-card")).toHaveCount(1)
  await expect(
    page.getByRole("button", { name: "People", exact: true })
  ).toHaveAttribute("aria-pressed", "true")
  await page
    .getByRole("button", { name: "View In a quiet moment", exact: true })
    .click()
  await expect(page.getByRole("dialog")).toBeVisible()
  await expect(
    page.getByRole("button", { name: "Close photograph" })
  ).toBeFocused()
  await page.keyboard.press("ArrowRight")
  await expect(page.locator("#photo-title")).toHaveText("In a quiet moment")
  await page.keyboard.press("Escape")
  await expect(page.getByRole("dialog")).toHaveCount(0)
  await expect(
    page.getByRole("button", { name: "View In a quiet moment", exact: true })
  ).toBeFocused()
  await page.getByRole("button", { name: "Places", exact: true }).click()
  await expect(page.locator(".photo-card")).toHaveCount(3)
  await page.getByRole("button", { name: "Everyday", exact: true }).click()
  await expect(page.locator(".photo-card")).toHaveCount(2)
  await page.getByRole("button", { name: /All work/ }).click()
  await expect(page.locator(".photo-card")).toHaveCount(6)
  await page
    .getByRole("button", { name: "View Where the land ends", exact: true })
    .click()
  await page.getByRole("button", { name: "Next photograph" }).click()
  await expect(page.locator("#photo-title")).toHaveText("In a quiet moment")
  await page.keyboard.press("ArrowLeft")
  await expect(page.locator("#photo-title")).toHaveText("Where the land ends")
  await page.keyboard.press("ArrowLeft")
  await expect(page.locator("#photo-title")).toHaveText("Nothing in a hurry")
  await page.getByRole("button", { name: "Close photograph" }).focus()
  await page.keyboard.press("Shift+Tab")
  await expect(
    page.getByRole("button", { name: "Next photograph" })
  ).toBeFocused()
  await page.getByRole("button", { name: "Close photograph" }).click()
  await expect(page.getByRole("dialog")).toHaveCount(0)
  await expect(
    page.getByRole("button", { name: "View Where the land ends", exact: true })
  ).toBeFocused()
})

test("page and open photo viewer pass WCAG AA automated checks", async ({
  page,
}) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto("/")
  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect(page.locator("h1")).toBeVisible()
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations
  ).toEqual([])
  await page
    .getByRole("button", { name: "View Where the land ends", exact: true })
    .click()
  await expect(page.getByRole("dialog")).toBeVisible()
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations
  ).toEqual([])
  expect(errors).toEqual([])
})
