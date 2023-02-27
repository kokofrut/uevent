import React, { useState } from 'react';
import PaymentCard from './cardPayment'
import Header from '../../common/header/Header'
import './payment.scss'
function PaymentPage() {
    return (
        <div className="wrapper">
            <Header />
            <div className="payment-wrapper">
                <PaymentCard />
            </div>
        </div>

    )
}

export default PaymentPage