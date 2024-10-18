import React, { useEffect, useState } from 'react';
import './OrderDetails.css';
import success from '../../assets/images/verify.png';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../../config';

const OrderDetails = () => {
    const { printId } = useParams();
    const [name, setName] = useState('');
    const [orderDetails, setOrderDetails] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user_details'));
        const userName = data.first_name;
        setName(userName);
        getBookingDetail(printId);
    }, [printId]);

    const getBookingDetail = async (printId) => {
        const formData = new FormData();
        formData.append('print_job_id', printId);
        
        try {
            const response = await fetch(`${BASE_URL}get_booking_detail/`, {
                method: 'POST',
                body: formData,
            });
            const orderData = await response.json();
            if (response.ok && orderData.success) {
                console.log("response", orderData);
                setOrderDetails(orderData.data);  // Update state here
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    // Logging orderDetails to see updated value
    useEffect(() => {
        console.log("OrderDetails", orderDetails);
    }, [orderDetails]);

    return (
        <div className='screenContainer'>
            <h3 className='top'>Thank You {name}</h3>
            <div className='detailsCard'>
                <h3>Print Job Details</h3>
                <div className='detailsContainer'>
                    <div className='paymentContainer'>
                        <div className='text-center mt-4'>Payment Details</div>
                        <div className='info'>
                            <h4>Payment</h4>
                            <div className='arrow'>---</div>
                            <div className='data'>
                                <div className='success'>
                                <img src={success} />
                                </div>
                            </div>
                        </div>
                        <div className='info'>
                            <h4>Amount</h4>
                            <div className='arrow'>---</div>
                            <div className='data'>₹{orderDetails.payment?.amount || 'N/A'}</div>
                        </div>
                        <div className='info'>
                            <h4>Transaction Id</h4>
                            <div className='arrow'>---</div>
                            <div className='data txnid'>{orderDetails.payment?.transaction_id || 'N/A'}</div>
                        </div>
                    </div>
                    <div className='paymentContainer'>
                        <div className='text-center mt-4'> Document Details</div>
                        {orderDetails.print_job?.is_printed && (
                            <div className='info'>
                                <h4>Printed</h4>
                                <div className='arrow'>---</div>
                                <div className='data'>
                                    <div className='success'>
                                       <img src={success} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='info'>
                            <h4>Pages Count</h4>
                            <div className='arrow'>---</div>
                            <div className='data'>
                                {orderDetails.print_job?.bw_pages + orderDetails.print_job?.color_pages || 0}
                            </div>
                        </div>
                        <div className='info'>
                            <h4>Document Link</h4>
                            <div className='arrow'>---</div>
                            <div className='data text-blue-400'>
                                <a href={`${BASE_URL}${orderDetails.print_job?.document_url}`} target='_blank' rel='noopener noreferrer'>View</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='homebtn' onClick={() => navigate('/home')}>
                <h4>Back to home</h4>
            </div>
        </div>
    );
};

export default OrderDetails;
