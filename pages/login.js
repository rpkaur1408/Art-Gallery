import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from 'react';
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';  // Import your atoms
import { getFavourites, getHistory } from '@/lib/userData';  // Import the functions

export default function Login(props) {

  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);  // Use the atom for favourites
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);  // Use the atom for search history
  const router = useRouter();

  // Function to update the atoms with the fetched data
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

  // Handle login form submission
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Call authenticateUser to authenticate the user
      await authenticateUser(user, password);
      
      // Update atoms with the user's data
      await updateAtoms();

      // Redirect to /favourites page after successful login
      router.push("/favourites");
    } catch (err) {
      // If an error occurs, display the error message
      setWarning(err.message || "An unknown error occurred");
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={handleSubmit}>
        <Form.Group >
          <Form.Label>User:</Form.Label>
          <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        {warning && (
          <>
            <br />
            <Alert variant="danger">
              {warning}
            </Alert>
          </>
        )}

        <br />
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
    </>
  );
}
