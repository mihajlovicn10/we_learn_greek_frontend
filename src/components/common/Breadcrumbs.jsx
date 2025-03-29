import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex py-3 px-4 bg-gray-100 rounded-md mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-500 font-medium">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          // Capitalize and format the breadcrumb name
          const formattedName = name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return (
            <li key={name}>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                {isLast ? (
                  <span className="text-blue-500 font-medium">{formattedName}</span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-700 hover:text-blue-500 font-medium"
                  >
                    {formattedName}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;