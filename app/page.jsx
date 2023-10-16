'use client'
import { Col, Row, Image } from 'react-bootstrap';
import { ApiMainUrl } from './mainapi/page';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineToTop } from 'react-icons/ai';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {

  let url = ApiMainUrl;
  let [productsdata, setproductSdata] = useState([])
  let [categoriesdata, setcategories] = useState([])

  const notify = () => toast.success("Add To WishList");
  const Already = () => toast.error("Already Data Exist");
  let Getdata = () => {

    axios.get(url + `products?limit=100`)
      .then((res) => {
        return res.data
      }).then((finaldat) => {
        setproductSdata(finaldat.products);
      })
  }

  let catdatas = (dada) => {
    axios.get(url + `products/category/${dada}`)
      .then((res) => {
        return res.data
      }).then((finaldat) => {
        setproductSdata(finaldat.products);

      })

    window.scrollTo({
      top: 0,
      left: 0
    })
  }

  let categories = () => {
    axios.get(url + `products/categories`)
      .then((res) => {
        return res.data
      }).then((finaldat) => {
        setcategories(finaldat);
      })
  }



  useEffect(() => {
    Getdata()
  }, [])

  useEffect(() => {
    categories()
  }, [])


  let WishListdata = (wishlistdata) => {

    let getaddtocarddata = JSON.parse(localStorage.getItem('AddToCartData')) ?? [];

    let addtocardalert = ()=> toast.info('This Data Is Already Add To Card.')

    if (getaddtocarddata.some((item) => item.id == wishlistdata.id)) {
      addtocardalert()
    } else {

      let getwishlistdatas = JSON.parse(localStorage.getItem('wishlistdatalocl')) ?? [];
      if (getwishlistdatas.some((item) => item.id == wishlistdata.id)) {
        Already()
      } else {
        notify()
        let olddata = [...getwishlistdatas, wishlistdata];
        localStorage.setItem('wishlistdatalocl', JSON.stringify(olddata))
      }
    }

  }

  return (
    <div className='container py-lg-5'>
      <Row>
        <Col className='col-lg-3 col-12 py-lg-5'>
          <div className='catdata shadow-lg pt-lg-5'>
            <div className='text-center'>
              <span onClick={() => Getdata()} className='rounded btn my-2 text-center catbtn fw-bold bg-danger text-light py-1 text-capitalize'>All products </span>
              {
                categoriesdata.map((v, i) => {
                  return (
                    <span onClick={() => catdatas(v)} key={i} className='rounded btn my-2 text-center catbtn fw-bold bg-danger text-light py-1 text-capitalize'>
                      {v}
                    </span>
                  )
                })
              }

            </div>
          </div>
        </Col>
        <Col className='col-lg-9 col-12'>
          <Row>
            {
              productsdata.map((v, i) => {
                return (
                  <Col key={i} className='col-lg-4 col-12 my-3'>

                    <div className="card">
                      <div className='card-bg' onClick={() => WishListdata(v)}>
                        <AiOutlineHeart className='fs-3 card-icon' />
                      </div>
                      <Link href={`/${v.id}`}>
                        <Image src={v.thumbnail} style={{width : '100%', height: '250px' }} className="img-fluid" />
                        <div className="card-body">
                          <h6 className="card-title">{v.title}</h6>
                          <p className="card-text">{v.description}</p>
                          <h6>
                            Price : $ {v.price}
                          </h6>
                          <Link href={`/${v.id}`}>
                            <button className='btn catbtn text-light fw-bold'>
                              View More
                            </button>
                          </Link>
                        </div>
                      </Link>
                    </div>

                  </Col>
                )
              })
            }

          </Row>
        </Col>
      </Row>
      <button onClick={()=>{
          window.scrollTo({
            top: 0,
            left: 0
          })}} className='text-light topbtn btn fs-3 fw-bold btncolors'>
              <AiOutlineToTop/>
      </button>
      <ToastContainer position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </div>
  )
}
