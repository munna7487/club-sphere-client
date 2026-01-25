import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Useaxiossecuire from '../hooks/Useaxiossecuire';


const Createclub = () => {
  const axiossecure = Useaxiossecuire();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ['approved-clubs'],
    queryFn: async () => {
      const res = await axiossecure.get('/approved-clubs');
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }
 
  return (
    <div>
      <div className='flex justify-between items-center my-6'>
        <div className=''>
          <h3 className='text-cyan-600 text-4xl font-bold'>Explore Clubs</h3>
    <h2 className='text-2xl'>Find your next community</h2>
        </div>
        <div className='flex justify-between items-center'>
          <div><label className="input">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label></div>
          <div><div className="dropdown dropdown-center">
            <div tabIndex={0} role="button" className="btn m-1">Click  ⬇️</div>
            <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
            </ul>
          </div></div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-6">Approved Clubs</h1>

      {clubs.length === 0 ? (
        <p className="text-gray-500">No approved clubs found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition"
            >
              {/* IMAGE */}
              <figure className="h-48 overflow-hidden">
                <img
                  src={club.bannerUrl}
                  alt={club.clubName}
                  className="h-full w-full object-cover"
                />
              </figure>

              {/* BODY */}
              <div className="card-body">
                <h2 className="card-title text-lg">{club.clubName}</h2>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {club.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-outline">
                    {club.category}
                  </span>
                  <span className="badge badge-outline">
                    {club.location}
                  </span>
                </div>

                <p className="mt-2 font-semibold text-primary">
                  Membership Fee: ${club.membershipFee}
                </p>

                <div className="mt-3">
                  <span className="badge badge-success">
                    Approved
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Createclub;
