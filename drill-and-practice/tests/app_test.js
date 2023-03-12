import { app } from "../app.js";
import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";

Deno.test("Home page works", async () => {
  const testClient = await superoak(app);
  const request = testClient
    .get("https://quizzy.fly.dev")
    .set("Origin", "http://localhost:8000");
  await request
    .expect(new RegExp("Quizzy"))
    .expect("Access-Control-Allow-Origin", "http://localhost:8000");
});
