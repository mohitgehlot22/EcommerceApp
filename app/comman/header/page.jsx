'use client'
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCart } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
import Link from 'next/link';

export default function Header() {


    let wishlistdat = JSON.parse(localStorage.getItem('wishlistdatalocl'));

    let adddata = JSON.parse(localStorage.getItem('AddToCartData'));


    return (
        <>
            {[true].map((expand) => (
                <Navbar key={expand} expand={expand} className="mb-3 shadow position-sticky top-0 z-3 bg-light">
                    <Container>
                        <Navbar.Brand href="#">
                            <Link  href={'/'} >  
                               <h1><span className='word fw-bold'>E</span>-commerce </h1>
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start"

                            className="offcanwas"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                  <h1><span className='word fw-bold'>E</span>-commerce </h1>
                                </Offcanvas.Title>
                                
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <span className='fw-bold ms-3 mx-2 mx-lg-4  my-1'>
                                        <Link  href='/'>
                                           <AiOutlineHome className='fs-3' />
                                        </Link>
                                    </span>
                                    <span  className='fw-bold mx-2 mx-lg-4 my-1'>
                                        <Link href='/wishlist'>
                                           <AiOutlineHeart className='fs-3' />
                                        </Link>
                                    </span>
                                    <span  className='fw-bold mx-2 mx-lg-4 my-1'>
                                        <Link href='/addtocart'>
                                           <BsCart className='fs-3' />
                                        </Link> 
                                    </span>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}
