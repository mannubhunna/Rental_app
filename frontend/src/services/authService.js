const USERS_KEY = "tricity_admin_users";
const SESSION_KEY = "tricity_admin_session";

const defaultAdmin = {
  id: 1,
  name: "Admin User",
  email: "admin@tricity.com",
  password: "Admin@123",
};

const initUsers = () => {
  const existing = localStorage.getItem(USERS_KEY);
  if (!existing) {
    localStorage.setItem(USERS_KEY, JSON.stringify([defaultAdmin]));
  }
};

export const getUsers = () => {
  initUsers();
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const signup = ({ name, email, password }) => {
  initUsers();
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("An account with this email already exists.");
  }
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const login = ({ email, password, rememberMe }) => {
  initUsers();
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) throw new Error("Invalid email or password.");
  const session = { id: user.id, name: user.name, email: user.email };
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
};

export const getSession = () => {
  const raw =
    localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const isAuthenticated = () => !!getSession();
