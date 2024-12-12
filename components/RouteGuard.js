import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { isAuthenticated } from '@/lib/authenticate';
import { getFavourites, getHistory } from '@/lib/userData'; 

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [, setFavourites] = useAtom(favouritesAtom); // Atom setter for favourites
    const [, setSearchHistory] = useAtom(searchHistoryAtom); // Atom setter for search history

    // Function to update atoms
    async function updateAtoms() {
        try {
            const favourites = await getFavourites();  // Get favourites for the logged-in user
            const history = await getHistory();  // Get search history for the logged-in user
            setFavouritesList(favourites);  // Update the favourites atom
            setSearchHistory(history);  // Update the search history atom
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(() => {
        // On initial load - run auth check
        authCheck(router.pathname);

        // Populate atoms on mount
        updateAtoms();

        // On route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);

        // Unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };
    }, []);

    function authCheck(url) {
        // Redirect to login page if accessing a private page and not logged in
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/login');
        } else {
            setAuthorized(true);
        }
    }

    return <>{authorized && props.children}</>;
}
