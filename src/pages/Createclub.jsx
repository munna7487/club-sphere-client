import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Useaxiossecuire from '../hooks/Useaxiossecuire';
import { Link } from 'react-router-dom';

const Createclub = () => {
  const axiossecure = Useaxiossecuire();
  const [searchText, setSearchText] = useState('');
  const [selectedClubName, setSelectedClubName] = useState('All');

  const { data: clubs = [], isLoading, isError } = useQuery({
    queryKey: ['approved-clubs'],
    queryFn: async () => {
      const res = await axiossecure.get('/approved-clubs');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4">Loading clubs...</p>
      </div>
    );
  }

  if (isError || !clubs) {
    return (
      <div className="text-center py-10 text-error">
        Failed to load clubs. Please try again.
      </div>
    );
  }

  // Unique club names for dropdown
  const clubNames = clubs.map(club => club.clubName?.trim()).filter(Boolean);

  // Filter clubs
  let filteredClubs = clubs.filter(club => {
    const matchesSearch = club.clubName
      ?.toLowerCase()
      .includes(searchText.toLowerCase().trim());
    const matchesSelected =
      selectedClubName === 'All' || club.clubName === selectedClubName;
    return matchesSearch && matchesSelected;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header + Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h3 className="text-cyan-600 text-3xl md:text-4xl font-bold">
            Explore Clubs
          </h3>
          <p className="text-lg md:text-xl text-base-content/70 mt-1">
            Find your next community
          </p>
        </div>

        {/* Search + Dropdown */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <label className="input input-bordered flex items-center gap-2 w-full sm:w-64">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="search"
              className="grow"
              placeholder="Search clubs..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </label>

          <div className="dropdown dropdown-end w-full sm:w-auto">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-outline w-full sm:w-64 justify-between"
            >
              {selectedClubName}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-64 max-h-80 overflow-auto z-50"
            >
              <li>
                <button onClick={() => setSelectedClubName('All')}>All</button>
              </li>
              {clubNames.map((name) => (
                <li key={name}>
                  <button onClick={() => setSelectedClubName(name)}>{name}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Clubs Grid */}
      {filteredClubs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-base-content/70">No clubs found</p>
          <p className="mt-2 text-sm">
            {searchText || selectedClubName !== 'All'
              ? 'Try different search or select another club'
              : 'No approved clubs available right now'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredClubs.map((club) => (
            <div
              key={club._id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 rounded-lg overflow-hidden"
            >
              <figure className="relative h-48 overflow-hidden">
                <img
                  src={club.bannerUrl || 'https://via.placeholder.com/400x200?text=Club+Banner'}
                  alt={club.clubName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </figure>
              <div className="card-body p-5">
                <h2 className="card-title text-xl line-clamp-2">{club.clubName}</h2>

                {/* Description limited to 40 chars */}
                <p className="text-sm text-base-content/70 min-h-[4.5rem]">
                  {club.description
                    ? club.description.length > 40
                      ? club.description.slice(0, 40) + '...'
                      : club.description
                    : 'No description available'}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {club.category && (
                    <div className="badge badge-outline badge-sm">{club.category}</div>
                  )}
                  {club.location && (
                    <div className="badge badge-outline badge-sm">{club.location}</div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="font-semibold text-primary">
                    ${club.membershipFee || 0}
                  </p>
                  <div className="badge badge-success badge-outline">Approved</div>
                </div>

                <Link
                  to={`/club/${club._id}`}
                  className="mt-3 btn btn-primary w-full hover:bg-cyan-600 transition-colors"
                >
                  View Club
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Createclub;
