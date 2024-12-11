import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store'; // Import favouritesAtom from the store
import ArtworkCard from '@/components/ArtworkCard'; // Component to display each artwork
import { Row, Col, Card } from 'react-bootstrap';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom); // Get the favourites list from Jotai atom

  // Prevent rendering if favouritesList is not yet initialized
  if (!favouritesList) return null;

  return (
    <>
      <h1>Favourites</h1>
      {favouritesList.length === 0 ? (
        <Card>
          <Card.Body>
            <h4>Nothing here</h4>
            <p>Try adding some artwork to your favourites list!</p>
          </Card.Body>
        </Card>
      ) : (
        <Row className="gy-4">
          {favouritesList.map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
