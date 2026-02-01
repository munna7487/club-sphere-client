import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../hooks/UseAuth';
import Useaxiossecuire from '../../../hooks/Useaxiossecuire';

const Paymenthistory = () => {
  const { user } = UseAuth();
  const axiossecure = Useaxiossecuire();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiossecure.get(
        `/payments?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Payment History ({payments.length})
      </h2>

      {payments.map((p) => (
        <div key={p._id} className="border p-3 mb-2 rounded">
          <p>Club: {p.clubname}</p>
          <p>Amount: ${p.amount}</p>

          
          <p>Status: {p.paymentstatus}</p>
          <p>Transaction: {p.transactionid}</p>
        </div>
      ))}
    </div>
  );
};

export default Paymenthistory;
