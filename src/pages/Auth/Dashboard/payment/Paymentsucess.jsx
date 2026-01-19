import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Useaxiossecuire from "../../../../hooks/Useaxiossecuire";

const PaymentSuccess = () => {
  const [paymentInfo, setPaymentInfo] = useState({});
  const [searchParams] = useSearchParams();
  const axiossecure = Useaxiossecuire();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiossecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          if (res.data?.paymentinfo) {
            setPaymentInfo(res.data.paymentinfo);
          }
        });
    }
  }, [sessionId, axiossecure]);

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h2>

      <p>Transaction ID: {paymentInfo.transactionid}</p>
      <p>Amount Paid: ${paymentInfo.amount}</p>

      <Link to="/dashboard/my-club">
        <button className="px-6 py-2 mt-4 bg-indigo-600 text-white rounded">
          Go Back
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
