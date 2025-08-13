import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { uploadFile } from '../store/slices/filesSlice';
import { Upload, FileSpreadsheet, X, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const FileUpload: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.files);
  
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    // Validate file type
    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    
    const isValidType = allowedTypes.includes(file.type) || 
      file.name.endsWith('.xls') || 
      file.name.endsWith('.xlsx') || 
      file.name.endsWith('.csv');

    if (!isValidType) {
      toast.error('Please select a valid Excel file (.xls, .xlsx, .csv)');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploadProgress(0);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await dispatch(uploadFile(selectedFile)).unwrap();
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      toast.success('File uploaded successfully!');
      navigate('/dashboard');
    } catch (error) {
      setUploadProgress(0);
      toast.error('Upload failed. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Upload Excel File
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your Excel file (.xls, .xlsx, .csv) to start analyzing data and generating charts.
          Maximum file size: 10MB
        </p>
      </div>

      {/* Upload Area */}
      <div className="card">
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragActive
              ? 'border-primary-400 bg-primary-50'
              : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!selectedFile ? (
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drag and drop your Excel file here
                </p>
                <p className="text-gray-500 mb-4">
                  or click to browse files
                </p>
                <label className="btn-primary cursor-pointer inline-block">
                  <input
                    type="file"
                    className="hidden"
                    accept=".xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                    onChange={handleFileInput}
                  />
                  Choose File
                </label>
              </div>
              <div className="text-sm text-gray-500">
                <p>Supported formats: .xls, .xlsx, .csv</p>
                <p>Maximum size: 10MB</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FileSpreadsheet className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  File Selected Successfully
                </p>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <span>{selectedFile.name}</span>
                  <span>•</span>
                  <span>{((selectedFile.size / 1024).toFixed(1))} KB</span>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={removeFile}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Remove File</span>
                </button>
                <button
                  onClick={handleUpload}
                  disabled={isLoading}
                  className="btn-primary flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload File</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Upload Progress */}
        {uploadProgress > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Upload Progress</span>
              <span className="text-sm text-gray-500">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            {uploadProgress === 100 && (
              <div className="flex items-center justify-center space-x-2 mt-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Upload Complete!</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileSpreadsheet className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Excel Parsing</h3>
          <p className="text-gray-600 text-sm">
            Automatically parse Excel files and extract data from all sheets
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Upload className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Quick Upload</h3>
          <p className="text-gray-600 text-sm">
            Drag and drop or browse to upload files in seconds
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Instant Processing</h3>
          <p className="text-gray-600 text-sm">
            Files are processed immediately and ready for analysis
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
