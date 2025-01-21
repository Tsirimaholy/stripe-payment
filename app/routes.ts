import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("register", "routes/register.tsx"),
  route("prices", "routes/prices.tsx"),
  route("subscribe", "routes/subscribe.tsx"),
  route("account", "routes/account.tsx"),
  route("webhook", "routes/webhook.ts"),
] satisfies RouteConfig;
