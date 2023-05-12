import axios from "axios";
// import Stripe from "stripe";
// import { v4 as uuidv4 } from "uuid";

const paymentAPI = process.env.PAYMENT_URI + "/payment";
// const stripe = new Stripe(process.env.STRIPESECRET);

export const getFromUser = async (req, res) => {
  const { email } = req.params;
  axios
    .get(`${paymentAPI}/${email}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const getPaymentbyId = async (req, res) => {
  const { id } = req.params;
  axios
    .get(`${paymentAPI}/payment/${id}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const createPayment = async (req, res) => {
  const payment = req.body;
  axios
    .post(`${paymentAPI}/create`, payment)
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((error) => {
      res.status(409).json({ message: error.message });
    });
};

export const getAllPayments = async (req, res) => {
  axios
    .get(paymentAPI)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

// export const chargeUser = async (req, res) => {
//   axios
//     .post(`${paymentAPI}/pay`, req.body)
//     .then((response) => {
//       const { email, amount } = req.body;
//       const idempotencyKey = uuidv4();
//       return stripe.customers
//         .create({
//           email: email,
//         })
//         .then((customer) => {
//           stripe.charges.create(
//             {
//               amount: amount * 100,
//               currency: "usd",
//               customer: customer.id,
//               receipt_email: email,
//               description: "Test Payment",
//             },
//             { idempotencyKey }
//           );
//         })
//         .then((result) => res.status(200).json(result))
//         .catch((err) => console.log(err));
//     })
//     .catch((error) => {
//       res.status(404).json({ message: error.message });
//     });
// };

export const getPaymentbyOrderId = async (req, res) => {
  const { orderId } = req.params;
  axios
    .get(`${paymentAPI}/orderId/${orderId}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};
