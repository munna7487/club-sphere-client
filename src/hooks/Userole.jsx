import UseAuth from './UseAuth';
import Useaxiossecuire from './Useaxiossecuire';
import { useQuery } from '@tanstack/react-query';

const Userole = () => {
  const { user } = UseAuth();
  const axiossecure = Useaxiossecuire();

  const { data: role = 'user', isLoading:roleloading } = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiossecure.get(`/users/${user.email}/role`);
      return res.data.role;
    }
  });

  return { role, roleloading };
};

export default Userole;
