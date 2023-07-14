import request from "supertest";
import { app } from "../../app";

it("fails when user does not existes with provided email", async () => {
  return await request(app)
    .post("/api/users/signin")
    .send({
      email: "xyz@gmail.com",
      password: "3213qde2e23",
    })
    .expect(400);
});

it("returns 400 when password is incorrect", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "xyz@gmail.com",
      password: "3213qde2e23",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "xyz@gmail.com",
      password: "3213qde",
    })
    .expect(400);
});

it("return cookie in header after signin successfully", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "xyz@gmail.com",
      password: "3213qde",
    })
    .expect(201);

  const respons = await request(app)
    .post("/api/users/signin")
    .send({
      email: "xyz@gmail.com",
      password: "3213qde",
    })
    .expect(200);
  expect(respons.get("Set-Cookie")).toBeDefined();
});
