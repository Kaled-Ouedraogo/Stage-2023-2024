import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { CircularProgress } from '@chakra-ui/react'
const PaypalButton = () => {
    const paypalRef = useRef();
    let i = 0;
    const [paymentState, setPaymentState] = useState(false)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);

    const createPaypalButton = () => {
        return window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Cool looking table",
                            amount: {
                                currency_code: "USD",
                                value: "35.00"
                            },
                        },
                    ],
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log("Successful order: ", order);
                setPaymentState(true);
                setIsLoading(true);
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            },

            onError: (err) => {
                console.error("Error during PayPal payment: ", err);
            }
        });
    };

    useEffect(() => {
        if (i===0)
            createPaypalButton().render(paypalRef.current);
        i++;
    }, []);

    return (
        <div>
            {/* LOADING PROCESS */}
            {isLoading && (
                <div
                    className="fixed inset-0 flex justify-center items-center z-60 w-full width: 100% bg-gray-900 bg-opacity-50 h-full height:100%">
                    <CircularProgress isIndeterminate color='#007BFF'/>
                </div>

            )}
            <div ref={paypalRef}></div>
        </div>
    );
};

export default PaypalButton;
