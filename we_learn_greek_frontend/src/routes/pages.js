import { lazy } from 'react';
import { NAV_LINKS, ROUTES } from '../constants/routes';

/** React.lazy page that can also be fetched ahead of time with `.preload()`. */
function lazyPage(importer) {
  const Page = lazy(importer);
  Page.preload = importer;
  return Page;
}

export const pages = {
  Login: lazyPage(() => import('../pages/Login')),
  Register: lazyPage(() => import('../pages/Register')),
  Nouns: lazyPage(() => import('../pages/WordList')),
  Verbs: lazyPage(() => import('../pages/VerbList')),
  GreekDefinitions: lazyPage(() => import('../pages/GreekToGreekList')),
  WordRoots: lazyPage(() => import('../pages/TransparentLanguageSelect')),
  WordRootsLanguage: lazyPage(() => import('../pages/TransparentWords')),
  MyWords: lazyPage(() => import('../pages/SavedWords')),
  About: lazyPage(() => import('../pages/About')),
  Contact: lazyPage(() => import('../pages/Contact')),
  Privacy: lazyPage(() => import('../pages/Privacy')),
  Terms: lazyPage(() => import('../pages/Terms')),
  Support: lazyPage(() => import('../pages/Support')),
  NotFound: lazyPage(() => import('../pages/NotFound')),
};

const PAGE_BY_PATH = {
  [ROUTES.login]: pages.Login,
  [ROUTES.register]: pages.Register,
  [ROUTES.nouns]: pages.Nouns,
  [ROUTES.verbs]: pages.Verbs,
  [ROUTES.greekToGreek]: pages.GreekDefinitions,
  [ROUTES.wordRoots]: pages.WordRoots,
  [ROUTES.myWords]: pages.MyWords,
  [ROUTES.about]: pages.About,
  [ROUTES.contact]: pages.Contact,
  [ROUTES.privacy]: pages.Privacy,
  [ROUTES.terms]: pages.Terms,
  [ROUTES.support]: pages.Support,
};

/** Start downloading the page behind a link, so navigating to it is instant. */
export function preloadRoute(to) {
  const path = (typeof to === 'string' ? to : to?.pathname ?? '').split('?')[0];
  const page =
    PAGE_BY_PATH[path] ?? (path.startsWith(`${ROUTES.wordRoots}/`) ? pages.WordRootsLanguage : null);
  page?.preload().catch(() => {}); // a failed prefetch is retried by the real navigation
}

/** Spread onto a <Link>: prefetch when the user shows intent (hover, keyboard focus, touch). */
export function prefetchOn(to) {
  const run = () => preloadRoute(to);
  return { onMouseEnter: run, onFocus: run, onTouchStart: run };
}

/** After the first page is interactive, quietly fetch the main tool pages in the background. */
export function preloadMainPagesWhenIdle() {
  const connection = navigator.connection;
  if (connection?.saveData || /2g/.test(connection?.effectiveType ?? '')) return; // respect data saver
  const schedule = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1500));
  schedule(() => NAV_LINKS.forEach(({ to }) => preloadRoute(to)));
}
