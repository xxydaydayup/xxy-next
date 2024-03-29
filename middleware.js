export { auth as middleware } from "auth";

// 使用 middleware.js 是为了实现新建和编辑时跳转到登录页面。
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
