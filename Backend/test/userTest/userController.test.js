import { authUser, registerUser, getUserById } from "../../controllers/userController";
import * as userService from "../../Service/userService";
import generateToken from "../../utils/generateToken";

jest.mock("../../Service/userService");
jest.mock("../../utils/generateToken");

describe("User Controller", () => {
  describe("authUser", () => {
    let req, res;

    beforeEach(() => {
      req = { body: { email: "test@test.com", password: "test123" } };
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    it("Login Successfully", async () => {
      const user = { _id: "123", name: "Test", email: "test@test.com", isAdmin: false };
      userService.authenticateUser.mockResolvedValue(user);

      await authUser(req, res);

      expect(generateToken).toHaveBeenCalledWith(res, "123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        _id: "123",
        name: "Test",
        email: "test@test.com",
        isAdmin: false,
      });
    });

    it("User Input Invalid Email or Password", async () => {
      userService.authenticateUser.mockResolvedValue(null);

      await authUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid email or password",
      });
    });

  });

  describe("registerUser", () => {
    let req, res;

    beforeEach(() => {
      req = { body: { name: "Test", email: "test@test.com", password: "test123", isAdmin: false } };
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    it("Register Successfully", async () => {
      const user = { _id: "123", name: "Test", email: "test@test.com", isAdmin: false };
      userService.createUser.mockResolvedValue(user);

      await registerUser(req, res);

      expect(generateToken).toHaveBeenCalledWith(res, "123");
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        _id: "123",
        name: "Test",
        email: "test@test.com",
        isAdmin: false,
      });
    });

    it("User Input Invalid Parameters", async () => {
      userService.createUser.mockRejectedValue(null);

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invaild Parameters",
      });
    });
  });

  describe("getUserById", () => {
    let req, res;

    beforeEach(() => {
      req = { params: { id: "123" } };
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    it("User Found and Collected", async () => {
      const user = { _id: "123", name: "Test", email: "test@test.com", isAdmin: false };
      userService.getUser.mockResolvedValue(user);

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("User Found Found", async () => {
      userService.getUser.mockResolvedValue(null);

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "User Not Found",
      });
    });
  });
});