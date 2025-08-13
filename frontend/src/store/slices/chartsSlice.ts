import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { chartsAPI } from '../../services/api';

export interface ChartType {
  value: string;
  label: string;
  dimensions: '2D' | '3D';
}

export interface ChartData {
  type: string;
  data: any;
  options: any;
}

export interface AnalysisHistory {
  _id: string;
  chartType: string;
  xAxis: string;
  yAxis: string;
  chartData: ChartData;
  createdAt: string;
  chartImage?: string;
}

interface ChartsState {
  chartTypes: ChartType[];
  currentChart: ChartData | null;
  analysisHistory: AnalysisHistory[];
  isLoading: boolean;
  error: string | null;
  selectedChartType: string;
  selectedXAxis: string;
  selectedYAxis: string;
  chartOptions: any;
}

const initialState: ChartsState = {
  chartTypes: [],
  currentChart: null,
  analysisHistory: [],
  isLoading: false,
  error: null,
  selectedChartType: '',
  selectedXAxis: '',
  selectedYAxis: '',
  chartOptions: {},
};

// Async thunks
export const fetchChartTypes = createAsyncThunk(
  'charts/fetchChartTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await chartsAPI.getChartTypes();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch chart types');
    }
  }
);

export const generateChart = createAsyncThunk(
  'charts/generateChart',
  async (params: {
    fileId: string;
    sheetIndex: number;
    chartType: string;
    xAxis: string;
    yAxis: string;
    chartOptions?: any;
  }, { rejectWithValue }) => {
    try {
      const response = await chartsAPI.generateChart(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to generate chart');
    }
  }
);

export const fetchAnalysisHistory = createAsyncThunk(
  'charts/fetchAnalysisHistory',
  async (fileId: string, { rejectWithValue }) => {
    try {
      const response = await chartsAPI.getAnalysisHistory(fileId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch analysis history');
    }
  }
);

export const deleteAnalysis = createAsyncThunk(
  'charts/deleteAnalysis',
  async (analysisId: string, { rejectWithValue }) => {
    try {
      await chartsAPI.deleteAnalysis(analysisId);
      return analysisId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete analysis');
    }
  }
);

const chartsSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {
    setSelectedChartType: (state, action: PayloadAction<string>) => {
      state.selectedChartType = action.payload;
    },
    setSelectedXAxis: (state, action: PayloadAction<string>) => {
      state.selectedXAxis = action.payload;
    },
    setSelectedYAxis: (state, action: PayloadAction<string>) => {
      state.selectedYAxis = action.payload;
    },
    setChartOptions: (state, action: PayloadAction<any>) => {
      state.chartOptions = action.payload;
    },
    clearCurrentChart: (state) => {
      state.currentChart = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetChartSelection: (state) => {
      state.selectedChartType = '';
      state.selectedXAxis = '';
      state.selectedYAxis = '';
      state.chartOptions = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Chart Types
      .addCase(fetchChartTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChartTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chartTypes = action.payload.chartTypes;
        state.error = null;
      })
      .addCase(fetchChartTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Generate Chart
      .addCase(generateChart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateChart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentChart = action.payload.chartData;
        state.error = null;
      })
      .addCase(generateChart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Analysis History
      .addCase(fetchAnalysisHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnalysisHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.analysisHistory = action.payload.analysisHistory;
        state.error = null;
      })
      .addCase(fetchAnalysisHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Analysis
      .addCase(deleteAnalysis.fulfilled, (state, action) => {
        state.analysisHistory = state.analysisHistory.filter(
          analysis => analysis._id !== action.payload
        );
      });
  },
});

export const {
  setSelectedChartType,
  setSelectedXAxis,
  setSelectedYAxis,
  setChartOptions,
  clearCurrentChart,
  clearError,
  resetChartSelection,
} = chartsSlice.actions;

export default chartsSlice.reducer;
