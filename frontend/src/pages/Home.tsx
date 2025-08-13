import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { 
  Upload, 
  BarChart3, 
  PieChart, 
  ScatterChart, 
  Box, 
  Download,
  FileSpreadsheet,
  Zap,
  Shield,
  Users
} from 'lucide-react';

const Home: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const features = [
    {
      icon: FileSpreadsheet,
      title: 'Excel File Upload',
      description: 'Upload any Excel file (.xls, .xlsx, .csv) and automatically parse the data for analysis.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: BarChart3,
      title: '2D & 3D Charts',
      description: 'Generate beautiful bar, line, pie, scatter charts and 3D visualizations.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: PieChart,
      title: 'Dynamic Axis Selection',
      description: 'Choose X and Y axes from your column headers for flexible data visualization.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Download,
      title: 'Downloadable Charts',
      description: 'Export your charts as PNG or PDF files for presentations and reports.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Secure authentication with role-based access control for users and admins.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: Zap,
      title: 'AI Integration',
      description: 'Optional AI-powered insights and summary reports for your data analysis.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  const chartTypes = [
    { name: 'Bar Charts', icon: BarChart3, description: 'Perfect for comparing categories' },
    { name: 'Line Charts', icon: BarChart3, description: 'Great for showing trends over time' },
    { name: 'Pie Charts', icon: PieChart, description: 'Ideal for showing proportions' },
    { name: 'Scatter Plots', icon: ScatterChart, description: 'Excellent for correlation analysis' },
    { name: '3D Column Charts', icon: Box, description: 'Advanced 3D visualizations' },
    { name: '3D Scatter Plots', icon: Box, description: 'Multi-dimensional data analysis' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your{' '}
            <span className="text-gradient">Excel Data</span>
            <br />
            Into Beautiful Charts
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload any Excel file, choose your axes, and generate interactive 2D and 3D charts 
            in seconds. Perfect for data analysis, presentations, and reports.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Link
                  to="/upload"
                  className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload File</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="btn-secondary text-lg px-8 py-3"
                >
                  Go to Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn-primary text-lg px-8 py-3"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="btn-secondary text-lg px-8 py-3"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Data Analysis
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to turn your raw data into meaningful insights and stunning visualizations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card-hover group">
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Chart Types Section */}
      <section className="bg-white rounded-2xl shadow-soft p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Supported Chart Types
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from a wide variety of chart types to best represent your data.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chartTypes.map((chart, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <chart.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {chart.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {chart.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in just three simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Excel File</h3>
            <p className="text-gray-600">
              Drag and drop your Excel file (.xls, .xlsx, .csv) or browse to select it.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Chart Options</h3>
            <p className="text-gray-600">
              Select your chart type and choose X and Y axes from your column headers.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Generate & Download</h3>
            <p className="text-gray-600">
              Generate your chart and download it as PNG or PDF for your needs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl text-white p-12">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Data?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of users who are already creating beautiful charts and insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <Link
              to="/upload"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
            >
              Start Analyzing
            </Link>
          ) : (
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
            >
              Get Started Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

