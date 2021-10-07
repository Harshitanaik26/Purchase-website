require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([[
    1, {priceCents:10000,name:"Album 1"}],
    [2,{priceCents:20000,name:"Album 2"}],
    [3,{priceCents:10000,name:"Track Suite"}],
    [4,{priceCents:20000,name:"Hoodie "}],
    [5,{priceCents:30000,name:"Airpods"}],
    [6,{priceCents:20000,name:"Accessories"}],
    [7,{priceCents:6000,name:"Mask"}]
])

app.post('/create-checkout-session',async(req,res)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            line_items:req.body.items.map(item=>{
                const storeItem = storeItems.get(item.id)
                return{
                    price_data:{
                        currency:'inr',
                        product_data:{
                            name:storeItem.name
                        },
                        unit_amount:storeItem.priceCents
                    },
                    quantity:item.quantity
                }
            }),
            success_url:`${process.env.SERVER_URL}/success.html`,
            cancel_url:`${process.env.SERVER_URL}/cancel.html`
        })
        res.json({url:session.url})
    }catch(e){
        res.status(500).json({error:e.message})
    }
})

app.listen(3000)