// import React, { useState } from 'react';

// const CheckoutForm = ({ onSubmit, loading }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     address1: '',
//     city: '',
//     state: '',
//     postcode: '',
//     country: 'IN',
//     email: '',
//     phone: '',
//   });
  
//   const [paymentMethod, setPaymentMethod] = useState('cod'); 

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePaymentChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const checkoutData = {
//       billing: { ...formData },
//       shipping: { ...formData },
//       paymentMethod: paymentMethod,
//     };
//     onSubmit(checkoutData);
//   };

//   const paymentMethods = [
//     { id: 'cod', title: 'Cash on delivery', description: 'Pay with cash upon delivery.' },
//     { id: 'bacs', title: 'Direct bank transfer', description: 'Make your payment directly into our bank account.' },
//     { id: 'cheque', title: 'Check payments', description: 'Please send a check to our business address.' },
//   ];

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <h2 className="text-xl font-semibold">Shipping Details</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required className="border p-2 rounded w-full"/>
//         <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required className="border p-2 rounded w-full"/>
//       </div>
      
//       <input type="text" name="address1" placeholder="Address" onChange={handleChange} required className="border p-2 rounded w-full"/>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <input type="text" name="city" placeholder="City" onChange={handleChange} required className="border p-2 rounded w-full"/>
//         <input type="text" name="state" placeholder="State" onChange={handleChange} required className="border p-2 rounded w-full"/>
//         <input type="text" name="postcode" placeholder="Postcode / ZIP" onChange={handleChange} required className="border p-2 rounded w-full"/>
//       </div>

//       <h2 className="text-xl font-semibold mt-6">Contact Information</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border p-2 rounded w-full"/>
//         <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required className="border p-2 rounded w-full"/>
//       </div>

//       <div className="pt-6">
//         <h2 className="text-xl font-semibold">Payment Method</h2>
//         <div className="space-y-4 mt-4 rounded-lg border p-4">
//           {paymentMethods.map((method) => (
//             <div key={method.id} className={`p-4 rounded-lg border ${paymentMethod === method.id ? 'bg-indigo-50 border-indigo-300' : 'bg-white'}`}>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value={method.id}
//                   checked={paymentMethod === method.id}
//                   onChange={handlePaymentChange}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
//                 />
//                 <span className="ml-3 font-medium text-gray-900">{method.title}</span>
//               </label>
//               {paymentMethod === method.id && (
//                 <p className="ml-7 mt-2 text-sm text-gray-600">{method.description}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       <button 
//         type="submit"
//         disabled={loading}
//         className="w-full bg-green-600 text-white py-3 px-4 rounded font-medium hover:bg-green-700 disabled:opacity-50"
//       >
//         {loading ? 'Placing Order...' : 'Place Order'}
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;

import React, { useState } from 'react';

const CheckoutForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    city: '',
    state: '',
    postcode: '',
    country: 'IN',
    email: '',
    phone: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod'); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkoutData = {
      billing: { ...formData },
      shipping: { ...formData },
      paymentMethod: paymentMethod,
    };
    onSubmit(checkoutData);
  };

  const paymentMethods = [
    { id: 'cod', title: 'Cash on delivery', description: 'Pay with cash upon delivery.' },
    { id: 'bacs', title: 'Direct bank transfer', description: 'Make your payment directly into our bank account.' },
    { id: 'cheque', title: 'Check payments', description: 'Please send a check to our business address.' },
    { id: 'phonepe', title: 'PhonePe', description: 'Pay with your PhonePe account.' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Shipping Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required className="border p-2 rounded w-full"/>
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required className="border p-2 rounded w-full"/>
      </div>
      
      <input type="text" name="address1" placeholder="Address" onChange={handleChange} required className="border p-2 rounded w-full"/>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="text" name="city" placeholder="City" onChange={handleChange} required className="border p-2 rounded w-full"/>
        <input type="text" name="state" placeholder="State" onChange={handleChange} required className="border p-2 rounded w-full"/>
        <input type="text" name="postcode" placeholder="Postcode / ZIP" onChange={handleChange} required className="border p-2 rounded w-full"/>
      </div>

      <h2 className="text-xl font-semibold mt-6">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border p-2 rounded w-full"/>
        <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required className="border p-2 rounded w-full"/>
      </div>

      <div className="pt-6">
        <h2 className="text-xl font-semibold">Payment Method</h2>
        <div className="space-y-4 mt-4 rounded-lg border p-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className={`p-4 rounded-lg border ${paymentMethod === method.id ? 'bg-indigo-50 border-indigo-300' : 'bg-white'}`}>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={handlePaymentChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-3 font-medium text-gray-900">{method.title}</span>
              </label>
              {paymentMethod === method.id && (
                <p className="ml-7 mt-2 text-sm text-gray-600">{method.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 px-4 rounded font-medium hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  );
};

export default CheckoutForm;