'use client'
import Link from 'next/link';
import { useState } from 'react';
import { Image } from 'react-bootstrap';
import { FiDelete } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineToTop } from 'react-icons/ai';

export default function WishList() {

  let wishdata = JSON.parse(localStorage.getItem('wishlistdatalocl')) ?? [];
  let Addcard = () => toast.success('This item is Add To Cart Data');
  let [wishitem, setwishitem] = useState(wishdata)



  let RemoveData = (removeid) => {

    let removedatas = wishdata.filter((v) => {
      if (removeid !== v.id) {
        return v
      }
    })
    localStorage.setItem('wishlistdatalocl', JSON.stringify(removedatas))

    let itmegetdata = JSON.parse(localStorage.getItem('wishlistdatalocl'))

    setwishitem(itmegetdata)
  }

  let AddToCart = (adddata) => {
    Addcard()
    let GetAddData = JSON.parse(localStorage.getItem('AddToCartData')) ?? [];
    if (GetAddData.some((item) => item.id == adddata.id)) {
    } else {
      let AllData = [adddata, ...GetAddData]
      localStorage.setItem('AddToCartData', JSON.stringify(AllData))
    }
    RemoveData(adddata.id)
  }

  return (
    <>
      {

        (wishitem == '')
          ?
          <h1 className='text-center pt-5'>
            Data Not Found
          </h1>
          :
          wishitem.map((v, i) => {
            return (
              <div key={i} className='container shadow-lg my-5 p-3 position-relative'>
                <div className='row'>
                  <div className='col-lg-4 col-12'>
                    <Image src={v.thumbnail} className='img-fluid imgwishlist' style={{ width: '100%', height: '300px' }} />
                  </div>
                  <div className='col-lg-8 col-12'>
                    <p className='m-0 fw-semibold text-center pb-4'>
                      {v.brand}
                    </p>
                    <span className='fw-bold'>
                      {v.title}
                    </span>
                    <p className='m-0'>
                      {v.description}
                    </p>
                    <div className='row py-2'>
                      <div className='col-6'>
                        <span className='fw-semibold'>Price</span> :  ${v.price} &nbsp;
                        <span className='fw-semibold'>Discount</span> : <span className='text-decoration-line-through'>{v.discountPercentage}</span>%
                      </div>
                      <div className='col-6 text-center'>
                        <span className='fw-semibold'>
                          Rating
                        </span> {v.rating}
                      </div>
                      <div className='col-6 py-2'>
                        <span className='fw-bold'>Stock : </span> {v.stock}
                      </div>
                    </div>
                    <button onClick={() => RemoveData(v.id)} className='btn btncolor text-light fw-bold fs-5'>
                      <FiDelete />
                    </button>
                    <button onClick={() => AddToCart(v)} className='btn btncolors my-5 text-light fw-bold'>
                      Add To Cart
                    </button>
                    <button className='btn btncolors my-5 text-light fw-bold mx-3'>
                      <Link href={`/${v.id}`}>
                        Show More...
                      </Link>
                    </button>
                  </div>
                </div>
                <button onClick={() => {
                  window.scrollTo({
                    top: 0,
                    left: 0
                  })
                }} className='text-light topbtn btn fs-3 fw-bold btncolors'>
                  <AiOutlineToTop />
                </button>
              </div>
            )
          })
      }
      <ToastContainer />
    </>
  )
}
