import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { filesAPI } from '../../services/api';

export interface FileSheet {
  name: string;
  headers: string[];
  data: string[][];
  rowCount: number;
  columnCount: number;
}

export interface FileData {
  _id: string;
  filename: string;
  originalName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
  sheets: FileSheet[];
  isProcessed: boolean;
  processingError?: string;
  createdAt: string;
  updatedAt: string;
}

interface FilesState {
  files: FileData[];
  currentFile: FileData | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
  searchQuery: string;
}

const initialState: FilesState = {
  files: [],
  currentFile: null,
  isLoading: false,
  error: null,
  total: 0,
  page: 1,
  totalPages: 1,
  searchQuery: '',
};

// Async thunks
export const uploadFile = createAsyncThunk(
  'files/uploadFile',
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await filesAPI.uploadFile(formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'File upload failed');
    }
  }
);

export const fetchUserFiles = createAsyncThunk(
  'files/fetchUserFiles',
  async (params: { page?: number; limit?: number; search?: string }, { rejectWithValue }) => {
    try {
      const response = await filesAPI.getUserFiles(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch files');
    }
  }
);

export const fetchFileDetails = createAsyncThunk(
  'files/fetchFileDetails',
  async (fileId: string, { rejectWithValue }) => {
    try {
      const response = await filesAPI.getFileDetails(fileId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch file details');
    }
  }
);

export const deleteFile = createAsyncThunk(
  'files/deleteFile',
  async (fileId: string, { rejectWithValue }) => {
    try {
      await filesAPI.deleteFile(fileId);
      return fileId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete file');
    }
  }
);

export const getFileStats = createAsyncThunk(
  'files/getFileStats',
  async (fileId: string, { rejectWithValue }) => {
    try {
      const response = await filesAPI.getFileStats(fileId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch file statistics');
    }
  }
);

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setCurrentFile: (state, action: PayloadAction<FileData | null>) => {
      state.currentFile = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1; // Reset to first page when searching
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearFiles: (state) => {
      state.files = [];
      state.currentFile = null;
      state.total = 0;
      state.page = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload File
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files.unshift(action.payload.file);
        state.total += 1;
        state.error = null;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch User Files
      .addCase(fetchUserFiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files = action.payload.files;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(fetchUserFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch File Details
      .addCase(fetchFileDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFileDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentFile = action.payload.file;
        state.error = null;
      })
      .addCase(fetchFileDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete File
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.files = state.files.filter(file => file._id !== action.payload);
        if (state.currentFile?._id === action.payload) {
          state.currentFile = null;
        }
        state.total -= 1;
      })
      // Get File Stats
      .addCase(getFileStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFileStats.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getFileStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentFile,
  setSearchQuery,
  setPage,
  clearError,
  clearFiles,
} = filesSlice.actions;

export default filesSlice.reducer;
