import { useState } from "react";
import { useRouter } from "next/router";
import { authenticateUser } from "@/lib/authenticate";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom, isLoggedInAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { Alert, Form, Button, Card } from "react-bootstrap";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const router = useRouter();

  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await authenticateUser(userName, password);

    if (success) {
      await updateAtoms();
      setIsLoggedIn(true); 
      router.push("/favourites");
    } else {
      setWarning("Invalid login credentials");
    }
  };

  return (
    <Card bg="light">
      <Card.Body>
        <h2>Login</h2>
        Enter your login information below:
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="userName">
            <Form.Label>User:</Form.Label>
            <Form.Control
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {warning && <Alert variant="danger">{warning}</Alert>}

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
