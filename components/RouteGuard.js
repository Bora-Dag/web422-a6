import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  const PUBLIC_PATHS = ['/', '/login', '/register'];

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  useEffect(() => {
    authCheck(router.pathname);
    router.events.on('routeChangeComplete', authCheck);
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url) {
    const path = url.split('?')[0];
    const token = getToken();

    if (!token && !PUBLIC_PATHS.includes(path)) {
      router.push('/login');
      setAuthorized(false);
      return;
    }

    setAuthorized(true);
    updateAtoms();
  }

  return authorized && children;
}
