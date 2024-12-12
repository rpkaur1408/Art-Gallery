// import React, { useState, useEffect } from 'react'; 
// import { Navbar, Nav, Form, Button, NavDropdown, Container } from 'react-bootstrap';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useAtom } from 'jotai';
// import { searchHistoryAtom } from '@/store'; // Import searchHistoryAtom
// import { addToHistory } from '@/lib/userData'; // Import addToHistory function
// import { readToken, removeToken } from '@/lib/authenticate'; // Import authentication functions

// export default function MainNav() {
//   const router = useRouter();
//   const [searchField, setSearchField] = useState('');
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [token, setToken] = useState(null); // State to store token (user login status)
//   const [, setSearchHistory] = useAtom(searchHistoryAtom); // Access the atom

//   // Handle form submission
//   const handleSearchSubmit = async (e) => {
//     e.preventDefault();
//     const query = `title=true&q=${encodeURIComponent(searchField)}`;
//     const updatedHistory = await addToHistory(query); // Get updated history
//     setSearchHistory(updatedHistory); // Update the atom with the new history
//     router.push(`/artwork?${query}`);
//     setIsExpanded(false);
//   };

//   const logout = () => {
//     removeToken(); // Remove token to logout
//     setToken(null); // Clear token state
//     router.push('/login'); // Redirect to login page
//     setIsExpanded(false); // Collapse navbar menu
//   };

//   useEffect(() => {
//     // Check if there's a token (user is logged in)
//     const userToken = readToken();
//     setToken(userToken); // Set token state based on stored token
//   }, []); // Run once when component mounts

//   return (
//     <>
//       <Navbar className="fixed-top navbar-dark bg-primary" expand="lg" expanded={isExpanded}>
//         <Container>
//           <Link href="/" passHref legacyBehavior>
//             <Navbar.Brand>Rehatpreet Kaur {token && <>- Welcome {token.userName}</>}</Navbar.Brand>
//           </Link>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//               <Link href="/" passHref legacyBehavior>
//                 <Nav.Link onClick={() => setIsExpanded(false)} className={router.pathname === '/' ? 'active' : ''}>
//                   Home
//                 </Nav.Link>
//               </Link>
//               {token && (
//                 <Link href="/search" passHref legacyBehavior>
//                   <Nav.Link onClick={() => setIsExpanded(false)} className={router.pathname === '/search' ? 'active' : ''}>
//                     Advanced Search
//                   </Nav.Link>
//                 </Link>
//               )}
//             </Nav>

//             {/* Conditionally render search form if logged in */}
//             {token && (
//               <Form className="d-flex" onSubmit={handleSearchSubmit}>
//                 <Form.Control
//                   type="search"
//                   placeholder="Search"
//                   className="me-2"
//                   aria-label="Search"
//                   value={searchField}
//                   onChange={(e) => setSearchField(e.target.value)}
//                 />
//                 <Button type="submit" variant="outline-light">Search</Button>
//               </Form>
//             )}

//             {/* Render user menu if logged in */}
//             <Nav className="ml-auto">
//               {!token ? (
//                 <>
//                   <Link href="/register" passHref legacyBehavior>
//                     <Nav.Link onClick={() => setIsExpanded(false)} className="active">
//                       Register
//                     </Nav.Link>
//                   </Link>
//                   <Link href="/login" passHref legacyBehavior>
//                     <Nav.Link onClick={() => setIsExpanded(false)} className="active">
//                       Login
//                     </Nav.Link>
//                   </Link>
//                 </>
//               ) : (
//                 <NavDropdown title={token.userName} id="user-dropdown">
//                   <Link href="/favourites" passHref legacyBehavior>
//                     <NavDropdown.Item onClick={() => setIsExpanded(false)}>
//                       Favourites
//                     </NavDropdown.Item>
//                   </Link>
//                   <Link href="/history" passHref legacyBehavior>
//                     <NavDropdown.Item onClick={() => setIsExpanded(false)}>
//                       Search History
//                     </NavDropdown.Item>
//                   </Link>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item onClick={logout}>
//                     Logout
//                   </NavDropdown.Item>
//                 </NavDropdown>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       <br />
//       <br />
//     </>
//   );
// }


import Link from "next/link";
import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { isAuthenticated, removeToken, readToken } from "@/lib/authenticate";
export default function MainNav() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();
  const [searchValue, setValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  async function submitForm(e) {
    e.preventDefault();

    setValue("");
    setIsExpanded(false);
    let queryString = `title=true&q=${searchValue}`;
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?title=true&q=${searchValue}`);
  }

  function logout() {}
  return (
    <>
      <Navbar
        className="fixed-top navbar-dark bg-primary"
        expand="lg"
        expanded={isExpanded}>
        <Container>
          <Navbar.Brand>REHATPREET KAUR</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          />
          {isAuthenticated() ? (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link legacyBehavior passHref href="/">
                  <Nav.Link
                    onClick={() => {
                      setIsExpanded(false);
                    }}>
                    Home
                  </Nav.Link>
                </Link>

                <Link legacyBehavior passHref href="/search">
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={() => {
                      setIsExpanded(false);
                    }}>
                    Advanced Search
                  </Nav.Link>
                </Link>
              </Nav>
              &nbsp;
              <Form className="d-flex" onSubmit={submitForm}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setValue(e.target.value)}
                />
                <Button className="btn btn-success" type="submit">
                  Search
                </Button>
              </Form>
              &nbsp; &nbsp;
              <NavDropdown
                title={readToken().userName}
                id="basic-nav-dropdown"
                style={{ color: "white" }}>
                <Link legacyBehavior passHref href="/favourites">
                  <NavDropdown.Item
                    onClick={() => {
                      setIsExpanded(false);
                    }}>
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link legacyBehavior passHref href="/history">
                  <NavDropdown.Item
                    active={router.pathname === "/history"}
                    onClick={() => {
                      setIsExpanded(false);
                    }}>
                    Search History
                  </NavDropdown.Item>
                </Link>
                <Link href="/login" legacyBehavior passHref>
                  <NavDropdown.Item
                    onClick={() => {
                      setIsExpanded(false);
                      removeToken();
                    }}
                    active={router.pathname === "/login"}>
                    Logout
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Navbar.Collapse>
          ) : (
            <></>
          )}
          ;
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}