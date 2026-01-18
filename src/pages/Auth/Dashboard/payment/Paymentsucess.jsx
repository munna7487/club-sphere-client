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
          console.log("Payment Success:", res.data);

          // Save payment info to state
          if (res.data && res.data.paymentinfo) {
            setPaymentInfo(res.data.paymentinfo);
          }
        })
        .catch((err) => console.error("Payment Error:", err));
    }
  }, [sessionId, axiossecure]);

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h2>

      {paymentInfo && (
        <div className="mb-4">
          <p>Transaction ID: {paymentInfo.transactionid || "N/A"}</p>
          <p>User ID: {paymentInfo.userid || "N/A"}</p>
          <p>Amount Paid: ${paymentInfo.amount || "N/A"}</p>
        </div>
      )}

      <Link to="/dashboard/my-club">
        <button className="px-6 py-2 bg-indigo-600 text-white rounded">
          Go Back
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
