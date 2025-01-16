import axios from 'axios'

const paystackInitializePaymentUrl = "https://api.paystack.co/transaction/initialize"

export const initializePayment = async (email: string, amount: number) => {
    const response = await axios.post(
        paystackInitializePaymentUrl,
        {
            email,
            amount: amount * 100,
            currency: 'NGN'
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        }
    )

    return response.data
}