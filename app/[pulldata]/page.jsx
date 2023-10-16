'use client'
import React, { useEffect, useState } from 'react';
import { ApiMainUrl } from '../mainapi/page';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewMore({ params }) {

    let id = params.pulldata;
    let [itemsdata, setitemdata] = useState([]);
    let [img, setimg] = useState([])
    let [imgurl, SrcChenge] = useState()
    let mainurl = ApiMainUrl;

    let itemdata = () => {
        axios.get(mainurl + `products/${id}`).then((res) => {
            setitemdata(res.data);
            setimg(res.data.images);
            SrcChenge(res.data.thumbnail)
        })
    }

    useEffect(() => {
        itemdata()
    }, [])

    let alertadd = ()=> toast.info('Cart Data is Already Available');
    let caradd = ()=> toast.success('This Data is Add To Card');


    let AddDtatCard = (Adddatastorage)=>{
      
        let StorageAddData  = JSON.parse(localStorage.getItem('AddToCartData')) ?? [] ;

        if(StorageAddData.some((item)=>item.id == Adddatastorage.id)){
            alertadd()
        }else{
            caradd()
            let AllAddData = [Adddatastorage,...StorageAddData];
            localStorage.setItem('AddToCartData',JSON.stringify(AllAddData)) ;
        }
    }

    return (
        <>
            <ToastContainer/>
            <section className='container'>
                <div className='row'>
                    <div className='col-lg-6 col-12 p-4'>
                        <div className='w-100'>
                            <img src={imgurl} style={{ height: '400px' }} className='img-fluid imgfull rounded' alt="" />
                        </div>
                    </div>
                    <div className='col-lg-6 col-12 p-4'>
                        <h5 className='text-center py-3'>{itemsdata.brand}</h5>
                        <div className='row py-2'>
                            <div className="col-6 py-2">
                                <span className='fw-bold fw-6 py-3'>{itemsdata.title}</span>
                            </div>
                            <div className='col-6 py-2'>
                                <span className='fw-bold fw-6 py-2'> Price  : $ {itemsdata.price}</span>
                                <span className='fw-bold fw-6 py-2 px-1'>
                                    Discount
                                    <span className="text-decoration-line-through"> {itemsdata.discountPercentage}% </span>
                                </span>
                            </div>
                            <div className="col-6 py-2">
                                <span className='fw-bold fw-6 py-2 '>Rating : {itemsdata.rating}</span>
                            </div>
                            <div className='col-6 py-2'>
                                <span className='fw-bold fw-6 py-2'>Stock : {itemsdata.stock}</span>
                            </div>
                        </div>
                        <p className='fw-semibold py-2'> {itemsdata.description}</p>
                        <button onClick={()=>AddDtatCard(itemsdata)} className='btn catbtn text-light fw-bold'>Add To Cart</button>
                    </div>
                </div>
                <hr />
                <div className='row py-5'>

                    {

                        img.map((v, i) => {
                            return (
                                <div className='col'>
                                    <img onClick={() => SrcChenge(v)} key={i} src={v} className='img-fluid imgs shadow-lg' style={{ height: '200px' }} alt="" />
                                </div>
                            )
                        })
                    }


                </div>
            </section>
        </>
    )
}
