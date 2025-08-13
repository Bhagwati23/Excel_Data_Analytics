# Data Analysis Platform - Frontend

A modern React frontend for the data analysis platform with Excel file processing and chart generation capabilities.

## Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **User Authentication**: Login/register with JWT authentication
- **File Upload**: Drag & drop Excel file upload with validation
- **Dashboard**: User dashboard with file statistics and recent uploads
- **Chart Generation**: Interface for creating 2D and 3D charts
- **Admin Panel**: User management and platform statistics
- **Responsive Design**: Mobile-first approach with modern UI components

## Tech Stack

- **Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS with custom components
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Charts**: Chart.js and Three.js (for 3D)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running (see backend README)

## Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Open browser:**
   Navigate to `http://localhost:3000`

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── Auth/          # Authentication components
│   │   └── Layout/        # Layout and navigation
│   ├── pages/             # Page components
│   │   ├── Auth/          # Login/Register pages
│   │   └── Admin/         # Admin panel pages
│   ├── services/          # API services
│   ├── store/             # Redux store and slices
│   │   └── slices/        # Redux slices for state management
│   ├── App.tsx            # Main app component
│   ├── index.tsx          # App entry point
│   └── index.css          # Global styles and Tailwind
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── postcss.config.js      # PostCSS configuration
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Features Overview

### Authentication
- User registration and login
- JWT token management
- Protected routes
- Role-based access control

### File Management
- Excel file upload (.xls, .xlsx, .csv)
- File validation and size limits
- Drag and drop interface
- Upload progress tracking

### Dashboard
- User statistics overview
- Recent file uploads
- Quick action buttons
- Getting started tips

### Chart Generation
- Multiple chart types (2D & 3D)
- Dynamic axis selection
- Chart customization options
- Analysis history tracking

### Admin Panel
- User management
- Platform statistics
- File monitoring
- System administration

## Component Architecture

### Layout Components
- **Layout**: Main layout with navigation and footer
- **ProtectedRoute**: Route protection for authenticated users
- **AdminRoute**: Route protection for admin users

### Authentication Components
- **Login**: User login form
- **Register**: User registration form

### Page Components
- **Home**: Landing page with features and CTA
- **Dashboard**: User dashboard with stats and actions
- **FileUpload**: File upload interface
- **FileAnalysis**: Chart generation interface
- **AdminPanel**: Admin management interface

## State Management

The app uses Redux Toolkit for state management with the following slices:

### Auth Slice
- User authentication state
- Login/logout actions
- Profile management
- Token handling

### Files Slice
- File upload state
- File listing and management
- Upload progress tracking
- File operations

### Charts Slice
- Chart generation state
- Chart type selection
- Analysis history
- Chart options

## API Integration

The frontend communicates with the backend through:

- **Auth API**: User authentication and management
- **Files API**: File upload and management
- **Charts API**: Chart generation and analysis
- **Admin API**: Administrative functions

## Styling

### Tailwind CSS
- Custom color palette with primary/secondary colors
- Responsive design utilities
- Custom component classes
- Animation and transition utilities

### Custom Components
- Button variants (primary, secondary, danger)
- Form inputs with validation states
- Card components with hover effects
- Loading states and animations

## Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Mobile navigation menu
- Touch-friendly interactions
- Adaptive component sizing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions
- Proper error handling

### Performance
- Lazy loading for routes
- Optimized bundle splitting
- Efficient state updates
- Minimal re-renders

## Deployment

### Build Process
1. Run `npm run build`
2. Deploy `build/` folder to hosting service

### Recommended Platforms
- **Netlify**: Easy deployment with Git integration
- **Vercel**: Fast deployment and previews
- **AWS S3**: Static hosting with CloudFront
- **GitHub Pages**: Free hosting for open source

### Environment Setup
- Set production API URL
- Configure CORS settings
- Enable HTTPS
- Set up domain and DNS

## Contributing

1. Follow the existing code style
2. Use TypeScript for all new components
3. Add proper error handling
4. Include responsive design
5. Test on multiple devices

## Troubleshooting

### Common Issues
- **CORS errors**: Ensure backend CORS is configured
- **Build failures**: Check Node.js version compatibility
- **Styling issues**: Verify Tailwind CSS is properly configured
- **API errors**: Check backend server status

### Development Tips
- Use React DevTools for debugging
- Monitor Redux state changes
- Check browser console for errors
- Verify API endpoints are accessible

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please contact the development team.
