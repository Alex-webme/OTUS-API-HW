import axios from "axios";

describe("API tests", () => {
  it("Register a new user", async () => {
    const config = {
      method: "POST",
      url: "https://bookstore.demoqa.com/account/v1/user",
      data: {
        userName: "DemoUser003",
        password: "DemoPass003!",
      },
    };
    const response = await axios(config);
    expect(response.status).toEqual(201);
  });

  it("User already exists", async () => {
    const config = {
      method: "POST",
      url: "https://bookstore.demoqa.com/account/v1/user",
      data: {
        userName: "DemoUser001",
        password: "DemoPass001!",
      },
    };
    try {
      const response = await axios(config);
    } catch (error) {
      expect(error.response.status).toEqual(406);
      expect(error.response.data.message).toEqual("User exists!");
    }
  });

  it("User not found / wrong password", async () => {
    const config = {
      method: "POST",
      url: "https://bookstore.demoqa.com/account/v1/authorized",
      data: {
        userName: "DemoUser001",
        password: "WrongPassword!",
      },
    };
    try {
      const response = await axios(config);
    } catch (error) {
      expect(error.response.status).toEqual(404);
      expect(error.response.data.message).toEqual("User not found!");
    }
  });

  it("Generate Token when a user is registered", async () => {
    const config = {
      method: "POST",
      url: "https://bookstore.demoqa.com/account/v1/generatetoken",
      data: {
        userName: "DemoUser001",
        password: "DemoPass001!",
      },
    };
    const response = await axios(config);
    expect(response.status).toEqual(200);
    expect(response.data.status).toEqual("Success");
    expect(response.data.result).toEqual("User authorized successfully.");
  });

  it("Generate Token when a user doesn't exist", async () => {
    const config = {
      method: "POST",
      url: "https://bookstore.demoqa.com/account/v1/generatetoken",
      data: {
        userName: "DemoUser888",
        password: "DemoPass888!",
      },
    };
    const response = await axios(config);
    expect(response.status).toEqual(200);
    expect(response.data.token).toEqual(null);
    expect(response.data.status).toEqual("Failed");
    expect(response.data.result).toEqual("User authorization failed.");
  });
});
