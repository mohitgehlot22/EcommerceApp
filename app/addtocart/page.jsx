  'use client'
import Link from 'next/link';
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
export default function AddToCart() {

     let CardDatatAddTo = JSON.parse(localStorage.getItem('AddToCartData')) ?? [];

     let [showdata,setdataadd] = useState(CardDatatAddTo)

     let DeleteData = (deleteid)=>{

        let filterdataadd = CardDatatAddTo.filter((v,i)=>{
            if(v.id !== deleteid){
                return v ;
            }
        })
        localStorage.setItem('AddToCartData',JSON.stringify(filterdataadd))
        let getdata = JSON.parse(localStorage.getItem('AddToCartData')) ?? [] ;
        setdataadd(getdata);
     }

  return (
  
    <>
      {
      (showdata=='')
        ?
          <h1 className='text-center pt-5'>Data Not-Found</h1>
        :

      <div className='container'>
        <div className='row'>
          {
            showdata.map((v,i) => {
              return (
                <div key={i} className='col-lg-4 col-12 my-3'>
                  <div className="card">
                    <img src={v.thumbnail}  style={{height:'250px'}} className="img-fluid" alt="..." />
                    <div  className="card-body">
                      <h5 className="card-title"> {v.title} </h5>
                      <p className="card-text"> {v.description} </p>
                      <button onClick={()=>DeleteData(v.id)} className="btn btncolors rounnded text-light">
                        <AiFillDelete />
                      </button>
                      <button className="btn btncolors rounnded text-light mx-2">
                        <Link href={`/${v.id}`}>
                            Show More...
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
      }
    </>
  )
}
