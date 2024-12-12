import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from 'react';
import { registerUser } from "@/lib/authenticate";  
import { useRouter } from 'next/router';

export default function Register() {
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");  
  const router = useRouter();

  // Handle registration form submission
  async function handleSubmit(e) {
    e.preventDefault();

    // Check if passwords match
    if (password !== password2) {
      setWarning("Passwords do not match");
      return;
    }

    try {
      // Call registerUser to register the user
      await registerUser(user, password, password2);

      // Redirect to /login page after successful registration
      router.push("/login");
    } catch (err) {
      // If an error occurs, display the error message
      setWarning(err.message || "An unknown error occurred");
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>
          Register for an account:
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            id="userName"
            name="userName"
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </Form.Group>

        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            id="password2"
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
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
        <Button variant="primary" className="pull-right" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}
