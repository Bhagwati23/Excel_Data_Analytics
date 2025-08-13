import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { fetchUserFiles } from '../store/slices/filesSlice';
import { 
  Upload, 
  BarChart3, 
  FileText, 
  Clock, 
  Plus,
  Search,
  FileSpreadsheet
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { files, isLoading, total } = useSelector((state: RootState) => state.files);

  useEffect(() => {
    dispatch(fetchUserFiles({ page: 1, limit: 5 }));
  }, [dispatch]);

  const stats = [
    {
      title: 'Total Files',
      value: total,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Uploads',
      value: user?.uploadCount || 0,
      icon: Upload,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Data Size',
      value: `${((user?.totalDataSize || 0) / (1024 * 1024)).toFixed(2)} MB`,
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentFiles = files.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.username}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your data analysis projects
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card-hover">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-hover">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload New File
            </h3>
            <p className="text-gray-600 mb-4">
              Start analyzing a new Excel file by uploading it to the platform
            </p>
            <button
              onClick={() => navigate('/upload')}
              className="btn-primary w-full"
            >
              Upload File
            </button>
          </div>
        </div>

        <div className="card-hover">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              View All Files
            </h3>
            <p className="text-gray-600 mb-4">
              Browse through all your uploaded files and analysis history
            </p>
            <button
              onClick={() => navigate('/files')}
              className="btn-secondary w-full"
            >
              Browse Files
            </button>
          </div>
        </div>
      </div>

      {/* Recent Files */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Files</h2>
          <button
            onClick={() => navigate('/files')}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View All
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading files...</p>
          </div>
        ) : recentFiles.length > 0 ? (
          <div className="space-y-4">
            {recentFiles.map((file) => (
              <div
                key={file._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => navigate(`/analysis/${file._id}`)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.originalName}</p>
                    <p className="text-sm text-gray-500">
                      {file.sheets.length} sheet(s) • {((file.fileSize / 1024).toFixed(1))} KB
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileSpreadsheet className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No files uploaded yet</p>
            <button
              onClick={() => navigate('/upload')}
              className="btn-primary"
            >
              Upload Your First File
            </button>
          </div>
        )}
      </div>

      {/* Getting Started Tips */}
      <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Getting Started Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
            <p>Upload Excel files (.xls, .xlsx, .csv) up to 10MB</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
            <p>Choose from 6 different chart types including 3D visualizations</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
            <p>Select X and Y axes from your column headers</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
            <p>Download charts as PNG or PDF for presentations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
