import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { useRouter } from 'next/router';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

export const Header = ({ user, noBorder }) => {
  const { isAuthenticated, role } = user || {};
  const router = useRouter();

  const dashboardPath =
    role === 'participant'
      ? '/pa/dashboard'
      : role === 'researcher'
      ? '/re/dashboard'
      : '';

  const onSignOut = () => {
    sessionStorage.clear();
    router.push('/api/auth/sign_out');
  };

  const borderStyle = {
    ...(!noBorder && {
      borderBottom: '1px solid #cbd0dd',
    }),
  };

  return (
    <Navbar
      expand='md'
      className={`bg-white ${styles.OutterWrapper}`}
      style={borderStyle}
    >
      <div className={`core-container ${styles.Wrapper}`}>
        <Navbar.Brand href='/' as={Link} className={styles.LogoContainer}>
          <Image
            src='/alexa_logos/dark.png'
            alt='Antaris logo'
            fill
            className={styles.Logo}
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls='basic-navbar-nav'
          className='border border-0'
        />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className={`me-auto gap-2 ms-2 ${styles.Nav}`}>
            <Nav.Link href='/' as={Link}>
              Documentation
            </Nav.Link>
            <Nav.Link href='/' as={Link}>
              Tutorials
            </Nav.Link>
          </Nav>
          <Nav className={`gap-2 ${styles.Nav}`}>
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} href={dashboardPath}>
                  Dashboard
                </Nav.Link>
                <Button onClick={onSignOut}>Sign out</Button>
              </>
            ) : (
              <>
                <NavDropdown
                  title='Sign in as'
                  id='basic-nav-dropdown'
                  align='end'
                >
                  <NavDropdown.Item as={Link} href='/re/signin'>
                    Researcher
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href='/pa/signin'>
                    Participant
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title='Sign up as'
                  id='basic-nav-dropdown'
                  align='end'
                >
                  <NavDropdown.Item as={Link} href='/re/signup'>
                    Researcher
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href='/pa/signup'>
                    Participant
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};
