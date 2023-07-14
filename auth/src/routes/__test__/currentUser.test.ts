import request from "supertest";
import { app } from "../../app";

it("should respond with details the current user", async () => {
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "shahidkhan@gmail.com",
      password: "131ee242321w",
    })
    .expect(201);
  const cookie = authResponse.get("Set-Cookie");
  const responsee = await request(app)
    .get("/api/users/cuser")
    .set("Cookie", cookie)
    .send({})
    .expect(200);

  expect(responsee.body.currentUser.email).toEqual("shahidkhan@gmail.com");
  console.log("cuser", responsee.body);
});
