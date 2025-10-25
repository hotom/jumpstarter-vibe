# Jumpstarter Vibe Coding Training - Website Documentation

## Overview

This is a React-based landing page for Jumpstarter Vibe Coding Training. The website features responsive design, social sharing capabilities, and a contact form with database integration. The site also includes user authentication functionality.

## Key Features

1. **Two-Page Application**:
   - Home page (`/`) with hero section, features, courses, and contact form
   - Learn More page (`/learn-more`) with detailed information about "vibe coding"

2. **Contact Form with Database Integration**:
   - Form submissions are stored in a Supabase database
   - Duplicate submission prevention (same email)
   - Modal-based feedback for success/error states

3. **User Authentication**:
   - Email/password authentication using Supabase Auth
   - Login/Signup modal interface
   - Email masking in UI for privacy

4. **Social Sharing**:
   - Sharing buttons for WhatsApp, Facebook, LinkedIn, and X (Twitter)
   - Preview popups with custom messages

5. **Responsive Design**:
   - Mobile-friendly layout
   - Orange and black branding theme
   - Smooth animations and transitions

## Technology Stack

- **Frontend**: React 18.2, React Router DOM 6.20
- **Build Tool**: Vite 5.0
- **Styling**: Modern CSS with animations
- **Database/Authentication**: Supabase
- **Social Sharing**: React Share 5.1

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with auth integration
│   ├── Footer.jsx          # Footer component
│   ├── SocialShare.jsx     # Social sharing buttons with popups
│   ├── DogCarousel.jsx     # Image carousel component
│   └── LoginModal.jsx      # Authentication modal
├── pages/
│   ├── Home.jsx            # Main landing page
│   └── LearnMore.jsx       # Detailed info page
├── hooks/
│   ├── useDogImage.js      # Custom hook for dog image carousel
│   └── useWeather.js       # Custom hook for weather data
├── services/
│   ├── supabase.js         # Supabase client configuration
│   └── contactService.js   # Contact form database operations
├── contexts/
│   └── AuthContext.jsx     # Authentication state management
├── App.jsx                 # Main app component with routing
├── main.jsx                # React entry point
└── index.css               # Global styles
```

## Detailed Feature Breakdown

### 1. Contact Form Integration

The contact form on the Home page is fully integrated with a Supabase database:

**How it works**:
1. User fills out the form (name, email, message)
2. On submission, the form data is sent to the `submitContactForm` service
3. The service first checks if the email already exists in the database
4. If duplicate found, shows "You have already submitted this form before with this email address"
5. If not a duplicate, inserts the data into the `contact_submissions` table
6. Shows success or error modal based on the result

**Database Schema**:
- Table: `contact_submissions`
- Columns: `id` (bigint), `name` (text), `email` (text), `message` (text), `submitted_at` (timestamptz)

**Duplicate Prevention**:
- The system checks for existing submissions with the same email address
- Prevents multiple submissions from the same email
- Shows informational message rather than error state

### 2. User Authentication

Email/password authentication is implemented using Supabase Auth:

**How it works**:
1. User clicks "Login" button in the top right navbar
2. Opens a modal with email/password form
3. User can switch between Login and Signup modes
4. On successful authentication, navbar shows "Hi [masked-email]" and Logout button
5. Session is maintained across page reloads

**Email Masking**:
- Displays only first 3 characters of username and domain
- Example: `tomho529@gmail.com` shows as `tom***@gma***.com`

### 3. Social Sharing

The site uses the `react-share` library for social sharing:

**Supported Platforms**:
- WhatsApp
- Facebook
- LinkedIn
- X (Twitter)

**Features**:
- Preview popups with custom titles and descriptions
- Mobile-optimized sharing experience
- Round style icons

### 4. Responsive Design

The site is fully responsive with:
- Mobile-friendly navigation
- Flexible grid layouts
- Adaptive components for different screen sizes
- Smooth animations and transitions

## Supabase Integration

### Environment Configuration
The application uses environment variables stored in `.env`:
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

### Database Operations
- **Contact Form**: Uses `supabase.from('contact_submissions').insert()` for new submissions
- **Duplicate Check**: Uses `supabase.from('contact_submissions').select('id').eq('email', email)` to check existing submissions
- **Authentication**: Uses `supabase.auth.signInWithPassword()` and `supabase.auth.signUp()`

### Auth State Management
- Uses React Context API for global auth state
- Automatically checks for existing sessions on app load
- Listens for auth state changes to update UI

## Development Workflow

### Running the Application
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`
4. Preview production build: `npm run preview`

### Project Configuration
- Entry point: `index-react.html` (managed by Vite)
- Routing: React Router DOM
- Styling: CSS with custom properties and animations

## User Experience Features

### Form Feedback
- Detailed modal overlays for success/error states
- Clear messaging for duplicate submissions
- Visual indicators for form status

### Authentication Feedback
- Loading states during auth operations
- Error messages for failed login/signup attempts
- Smooth transitions between auth states

### Debugging
- Comprehensive console logging throughout the application
- Detailed logs for form submissions, auth operations, and state changes

## Deployment Notes

1. The site requires HTTP/HTTPS protocol for social sharing features (won't work with `file://`)
2. Supabase credentials must be properly configured in environment variables
3. Email authentication must be enabled in the Supabase dashboard
4. The `contact_submissions` table must exist in the Supabase database with the correct schema

## Current Statistics

Based on the database:
- Total form submissions: 3
- Unique email addresses: 2
- Registered users: 1

## Change History

- 2025-10-25: Removed "Get Started" button from hero section in Home.jsx
- 2025-10-25: Changed website background color from white to black in index.css