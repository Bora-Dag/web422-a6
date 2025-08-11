import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom, isLoggedInAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchField.trim() !== '') {
      const queryString = `title=true&q=${searchField}`;
      setSearchHistory(await addToHistory(queryString));
      router.push(`/artwork?${queryString}`);
      setSearchField('');
      setIsExpanded(false);
    }
  };

  const logout = () => {
    setIsExpanded(false);
    removeToken();
    setIsLoggedIn(false); 
    router.push('/login');
  };

  return (
    <>
      <Navbar expanded={isExpanded} className="fixed-top navbar-dark bg-primary" expand="lg">
        <Container>
          <Navbar.Brand>Bora Dag</Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(isExpanded ? false : true)}
          />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  onClick={() => setIsExpanded(false)}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>

              {isLoggedIn && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/search"}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>

            {isLoggedIn ? (
              <>
                &nbsp;
                <Form className="d-flex" onSubmit={handleSubmit}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                  />
                  <Button type="submit" variant="success">Search</Button>
                </Form>
                &nbsp;

                <Nav>
                  <NavDropdown title="User" id="user-dropdown">
                    <Link href="/favourites" passHref legacyBehavior>
                      <NavDropdown.Item onClick={() => setIsExpanded(false)}>
                        Favourites
                      </NavDropdown.Item>
                    </Link>

                    <Link href="/history" passHref legacyBehavior>
                      <NavDropdown.Item onClick={() => setIsExpanded(false)}>
                        Search History
                      </NavDropdown.Item>
                    </Link>

                    <NavDropdown.Item onClick={logout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            ) : (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/register"}
                  >
                    Register
                  </Nav.Link>
                </Link>

                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/login"}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <br />
      <br />
    </>
  );
}
