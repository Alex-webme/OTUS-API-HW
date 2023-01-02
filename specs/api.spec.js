import axios from "axios";

describe("API tests", () => {
  it("Checki if API is working", async () => {
    const config = {
      method: "GET",
      url: "https://bookstore.demoqa.com/bookstore/v1/books",
    };
    const responce = await axios(config);
    expect(responce.status).toEqual(200);
  });

  it("Register a new user", async () => {
    const config = {
      method: "POST",
      url: "https://bookstore.demoqa.com/account/v1/user",
      data: {
        userName: "Rodriguez",
        password: "Password888!",
      },
    };
    const responce = await axios(config);
    expect(responce.status).toEqual(201);
  });

  it("User already exists", async () => {
    const config = {
      method: "POST",
      url: "https://bookstore.demoqa.com/account/v1/user",
      data: {
        userName: "Rodriguez",
        password: "Password888!",
      },
    };
    const responce = await axios(config);
    expect(responce.status).toEqual(406);
  });

  it("User not found / wrong password", async () => {
    const config = {
      method: "POST",
      url: "https://bookstore.demoqa.com/account/v1/authorized",
      data: {
        userName: "Rodriguez",
        password: "WrongPassword!",
      },
    };
    const responce = await axios(config);
    expect(responce.status).toEqual(404);
  });

  it("Generate Token when a user is registered", async () => {
    const config = {
      method: "POST",
      url: "https://bookstore.demoqa.com/account/v1/generatetoken",
      data: {
        userName: "Rodriguez",
        password: "Password888!",
      },
    };
    const responce = await axios(config);
    expect(responce.status).toEqual(200);
  });

  it("Generate Token when a user doesn't exist", async () => {
    const config = {
      method: "POST",
      url: "https://bookstore.demoqa.com/account/v1/generatetoken",
      data: {
        userName: "Mitchell",
        password: "randomPass777!",
      },
    };
    const responce = await axios(config);
    expect(responce.status).toEqual(400);
  });
});
