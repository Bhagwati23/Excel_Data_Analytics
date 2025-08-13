import React from 'react';

const AdminPanel: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Admin Panel
        </h1>
        <p className="text-lg text-gray-600">
          Welcome to the admin panel. Here you can manage users and view platform statistics.
        </p>
        <p className="text-gray-500 mt-4">
          This page will contain user management tools and platform analytics.
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
