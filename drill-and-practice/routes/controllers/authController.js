import * as authService from "../../services/authService.js";
import { bcrypt, validasaur } from "../../deps.js";

const validationRules = {
  email: [validasaur.isEmail, validasaur.required],
  password: [validasaur.minLength(4), validasaur.required],
};

const showLogin = ({ render }) => {
  render("login.eta");
};

const showRegister = ({ render }) => {
  render("register.eta");
};

const register = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  console.log(body);
  const params = await body.value;
  console.log(params);
  const userData = {
    email: params.get("email"),
    password: params.get("password"),
  };
  const [passes, errors] = await validasaur.validate(userData, validationRules);

  if (!passes) {
    response.status = 422;
    userData.errors = errors;
    render("register.eta", userData);
  } else {
    const hashedPassword = await bcrypt.hash(userData.password);
    await authService.createUser(userData.email, hashedPassword);
    response.redirect("/auth/login");
  }
};

const login = async ({ request, response, context, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const userDatabase = await authService.findUser(params.get("email"));
  if (userDatabase.length < 1) {
    response.status = 422;
    render("login.eta", { error: { error: "User not found!" } });
    return;
  }

  const user = userDatabase[0];
  const passwordCorrect = await bcrypt.compare(
    params.get("password"),
    user.password
  );

  if (!passwordCorrect) {
    response.status = 422;
    render("login.eta", { errors: { error: "Incorrect password!" } });
    return;
  }

  await context.state.session.set("user", user);
  response.redirect("/topics");
};

export { showLogin, showRegister, register, login };
