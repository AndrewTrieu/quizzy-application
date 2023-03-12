const { test, expect } = require("@playwright/test");

test("Main page is working", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Quizzy Application");
});

test("Main page has statistics", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h2")).toHaveText("Statistics");
});

test("Login page is working", async ({ page }) => {
  await page.goto("/auth/login");
  await expect(page.locator("h1")).toHaveText("Login");
});

test("Registration page is working", async ({ page }) => {
  await page.goto("/auth/register");
  await expect(page.locator("h1")).toHaveText("New user registration");
});

test("Can logout", async ({ page }) => {
  await page.goto("/logout");
  await expect(page.locator("h1")).toHaveText("Quizzy Application");
});

test("Can login as admin", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await expect(page.locator("h1")).toHaveText("Topics");
});

test("Can add a new topic", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await page.goto("/topics");
  await page.locator("input[type=text]").type("Test topic");
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.locator("h1")).toHaveText("Topics");
  await expect(page.getByRole("link", { name: "Test topic" })).toHaveText(
    "Test topic"
  );
});

test("Can see added topic", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await page.goto("/topics");
  await expect(page.locator("h1")).toHaveText("Topics");
  await expect(page.getByRole("link", { name: "Test topic" })).toHaveText(
    "Test topic"
  );
});

test("Can add a question to a topic", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await page.goto("/topics");
  await page.getByRole("link", { name: "Test topic" }).click();
  await page.locator("input[type=text]").type("Test question");
  await page.locator("input[type=submit]").click();
  await expect(page.getByRole("link", { name: "Test question" })).toHaveText(
    "Test question"
  );
});

test("Can add an answer to a question", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await page.goto("/topics");
  await page.getByRole("link", { name: "Test topic" }).click();
  await page.getByRole("link", { name: "Test question" }).click();
  await page.locator("input[type=text]").type("Test answer");
  await page.getByRole("button", { name: "Add" }).click();
  console.log(await page.content());
  await expect(
    page.getByText("Content: Test answer; Correctness: false Delete option")
  ).toHaveText("Content: Test answer; Correctness: false Delete option");
});

test("Can delete a topic", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await page.goto("/topics");
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.locator("h1")).toHaveText("Topics");
  await expect(page.locator("p")).toHaveText("No available topics.");
});
