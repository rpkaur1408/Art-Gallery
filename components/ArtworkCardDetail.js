import useSWR from 'swr';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store'; // Import favouritesAtom
import { useState, useEffect } from 'react'; // Import useState and useEffect
import { addToFavourites, removeFromFavourites } from '@/lib/userData'; // Import the required functions

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  ); // Use conditional fetching for SWR

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom); // Get favouritesList using useAtom
  const [showAdded, setShowAdded] = useState(false); // Default value set to false

  // Update showAdded state when favouritesList changes
  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  // Handle the favourite button click
  const favouritesClicked = async () => {
    if (showAdded) {
      // If already in favourites, remove it
      setFavouritesList(await removeFromFavourites(objectID));
    } else {
      // If not in favourites, add it
      setFavouritesList(await addToFavourites(objectID));
    }
    setShowAdded(!showAdded); // Toggle the showAdded state
  };

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          <b>Date: </b>
          {data.objectDate || 'N/A'}
          <br />
          <b>Classification: </b>
          {data.classification || 'N/A'}
          <br />
          <b>Medium: </b>
          {data.medium || 'N/A'}
          <br />
          <br />
          <b>Artist: </b>
          {data.artistDisplayName || 'N/A'}{' '}
          {data.artistDisplayName && data.artistWikidata_URL && (
            <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">
              (wiki)
            </a>
          )}
          <br />
          <b>Credit Line: </b>
          {data.creditLine || 'N/A'}
          <br />
          <b>Dimensions: </b>
          {data.dimensions || 'N/A'}
        </Card.Text>
        <Button
          variant={showAdded ? 'primary' : 'outline-primary'} // Change button style based on showAdded
          onClick={favouritesClicked} // Handle button click
        >
          {showAdded ? '+ Favourite (added)' : '+ Favourite'}
        </Button>
      </Card.Body>
    </Card>
  );
}
