export function getCurrentAuthority() {
  return ["admin"];
}

export function check(authority) {
  const current = getCurrentAuthority(); //本账号的权限、角色
  return current.some(item => authority.includes(item));
}

export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
