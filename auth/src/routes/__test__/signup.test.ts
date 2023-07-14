import request from "supertest";
import { app } from "../../app";
import { response } from "express";

it("returns a 201 on successfully signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "shahid@gmail.com",
      password: "131ee242321w",
    })
    .expect(201);
});

it("returns 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "shahid",
      password: "333kadqdke29owqw0",
    })
    .expect(400);
});

it("returns 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "shahid@gmail.com",
      password: "",
    })
    .expect(400);
});

it("returns 400 with no email password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("disallow duplicate emails return 400 on duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "shahid@gmail.com",
      password: "131ee242321w",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "shahid@gmail.com",
      password: "131ee242321w",
    })
    .expect(400);
});

it("set a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "shahid@gmail.com",
      password: "131ee242321w",
    })
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined();
});
