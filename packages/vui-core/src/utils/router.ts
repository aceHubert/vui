/**
 * go to location
 * @param location url
 * /index -> vue-router push
 * { name:'index'} -> vue-router push
 * { name: 'index', replace:true} -> vue-router replace
 * BACK -> vue-router go(-1)
 * http(x)://www.xx.com -> location href
 * @param $router vue-router instance
 */
export function go(location: string | { path?: string; replace?: boolean; [key: string]: any }, $router: any) {
  if ((typeof location === 'string' && /^javas/.test(location)) || !location) return;
  const useRouter = typeof location === 'object' || ($router && typeof location === 'string' && !/http/.test(location));
  if (useRouter) {
    if (typeof location === 'object' && location.replace === true) {
      delete location.replace;
      $router.replace(location);
    } else {
      location === 'BACK' ? $router.go(-1) : $router.push(location);
    }
  } else {
    window.location.href = location as string;
  }
}

export function getUrl(location: string | {}, $router: any) {
  // Make sure the href is right in hash mode
  if ($router && !$router._history && typeof location === 'string' && !/http/.test(location)) {
    return '#!' + location;
  }
  return location && typeof location !== 'object' ? location : 'javascript:void(0);';
}
