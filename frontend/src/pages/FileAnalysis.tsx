import React from 'react';
import { useParams } from 'react-router-dom';

const FileAnalysis: React.FC = () => {
  const { fileId } = useParams();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          File Analysis
        </h1>
        <p className="text-lg text-gray-600">
          File ID: {fileId}
        </p>
        <p className="text-gray-500 mt-4">
          This page will contain the chart generation interface and analysis tools.
        </p>
      </div>
    </div>
  );
};

export default FileAnalysis;
