

# Guide to run the server of Front-End

# 🏦 MoneySprout Banking App

A modern React Native banking application built with Expo, featuring authentication, goal tracking, educational content, and financial management tools.

# Contributors
   ## Back-End:Jonathan Gonzalez Morere, Github : jonathan-gonzalez19
   ## Front-End:Addis Sahle, Github : addis06

## ✨ Features

### 🔐 Authentication System
- **Sign-in/Sign-out functionality**
- **Protected routes** with authentication guards
- **User session management**
- **Demo credentials**: `alex@example.com` / `password`

### 💰 Financial Management
- **Add to Savings**: Track your savings goals
- **Check Goals**: Monitor progress with interactive sliders
- **Progress tracking** with visual indicators
- **Monthly savings goals**

### 📚 Educational Content
- **Video learning modules** with YouTube integration
- **Categorized content**: Basics, Budgeting, Saving, Debt, Investing
- **Progress tracking** for completed videos
- **Start/Continue learning** functionality

### 📊 Dashboard & Analytics
- **Home screen** with personalized greetings
- **Recent activity** tracking
- **Progress statistics**: Total saved, goals completed, videos watched
- **Streak tracking** for daily engagement

### 🎯 Goal Management
- **Interactive goal status**: Completed, In Progress, Paused
- **Daily progress sliders**
- **Visual progress indicators**
- **Goal completion celebrations**

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Banking-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run web
   ```

4. **Open in browser**
   - Navigate to `http://localhost:8081` (or the port shown in terminal)
   - Sign in with: `alex@example.com` / `password`

## 🏗️ Project Structure

```
Banking-App/
├── app/                    # Expo Router pages
│   ├── (tabs)/           # Tab navigation screens
│   │   ├── index.tsx     # Home screen
│   │   ├── goals.tsx     # Add savings
│   │   ├── check-goals.tsx # Goal tracking
│   │   ├── videos.tsx    # Educational content
│   │   ├── profile.tsx   # User profile
│   │   └── explore.tsx   # Explore features
│   ├── signin.tsx        # Authentication screen
│   └── _layout.tsx       # Root layout
├── components/            # Reusable components
│   ├── AuthGuard.tsx     # Authentication guard
│   └── ui/               # UI components
├── services/             # Context providers
│   ├── AppContext.tsx    # Global app state
│   └── AuthContext.tsx   # Authentication state
├── constants/            # App constants
├── hooks/               # Custom hooks
└── assets/              # Images and fonts
```

## 🔧 Technologies Used

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **Expo Router** - File-based routing
- **React Context** - State management
- **Linear Gradient** - Visual effects
- **React Native Safe Area** - Safe area handling

## 📱 Available Scripts

- `npm run web` - Start web development server
- `npm run ios` - Start iOS simulator
- `npm run android` - Start Android emulator
- `npm start` - Start Expo development server

## 🔐 Authentication Flow

1. **Initial Load**: App shows sign-in screen
2. **Sign In**: Enter credentials to access main app
3. **Protected Routes**: All tabs require authentication
4. **Sign Out**: Available in Profile tab with confirmation

## 🎯 Goal Management

- **Initial Goals**: Set up when user first signs in
- **Status Tracking**: Completed, In Progress, Paused
- **Daily Progress**: Interactive sliders for daily updates
- **Visual Feedback**: Progress bars and completion indicators

## 📚 Learning Modules

- **Video Categories**: Organized by financial topics
- **Progress Tracking**: Track completed videos
- **YouTube Integration**: Direct links to educational content
- **Learning Path**: Structured progression through topics

# Guide to initialize the back-end and Run the ChatBot

#Move to the back-end folder
```

cd backend
```

# Set up virtual environment
```
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
```

# Install dependencies
```
pip install -r requirements.txt
```
# Configure environment
```
cp .env.example .env
```
# Edit .env with your Google API key

# Run the server
```
python app.py
```
#If eveyrthing is working you should be able to text with the chatbot in the website


