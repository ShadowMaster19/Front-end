# 🚀 GitHub Setup Guide

## Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Repository name**: `banking-app` (or your preferred name)
5. **Description**: "Modern React Native banking app with authentication and financial management"
6. **Make it Public** (or Private if you prefer)
7. **Don't initialize** with README (we already have one)
8. **Click "Create repository"**

## Step 2: Push Your Code to GitHub

Run these commands in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/banking-app.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Open in GitHub Codespaces

1. **Go to your repository** on GitHub
2. **Click the green "Code" button**
3. **Select "Codespaces" tab**
4. **Click "Create codespace on main"**

## Step 4: Codespace Setup

The Codespace will automatically:
- ✅ Install Node.js 18
- ✅ Install all dependencies (`npm install`)
- ✅ Start the development server (`npm run web`)
- ✅ Forward port 8081 for web access

## Step 5: Access Your App

1. **Wait for setup to complete** (about 2-3 minutes)
2. **Click "Open in Browser"** when prompted for port 8081
3. **Or manually navigate** to the forwarded port URL

## 🎯 What You'll Get

### ✅ **Fully Configured Development Environment**
- VS Code with React Native extensions
- TypeScript support
- Prettier formatting
- Expo tools

### ✅ **Automatic Setup**
- Dependencies installed
- Development server running
- Port forwarding configured

### ✅ **Ready to Develop**
- All features working
- Authentication system
- Goal tracking
- Video learning modules

## 🔧 Available Commands in Codespace

```bash
# Start web development server
npm run web

# Start iOS simulator (if available)
npm run ios

# Start Android emulator (if available)
npm run android

# Install new dependencies
npm install package-name

# Run TypeScript check
npx tsc --noEmit
```

## 📱 Testing the App

1. **Sign In**: Use `alex@example.com` / `password`
2. **Navigate Tabs**: Home, Seed, Add Savings, Check Goals, Learn, Profile
3. **Test Features**: Add goals, watch videos, track progress
4. **Sign Out**: Test the sign-out functionality

## 🚀 Next Steps

### **Customize the App**
- Modify colors in `constants/Colors.ts`
- Add new videos in `app/(tabs)/videos.tsx`
- Update goals in `services/AuthContext.tsx`

### **Deploy to Production**
- Use Expo EAS Build for mobile apps
- Deploy web version to Vercel/Netlify
- Set up environment variables

### **Collaborate**
- Share the repository with team members
- Use GitHub Issues for bug reports
- Create feature branches for new development

## 🆘 Troubleshooting

### **Port Issues**
If port 8081 is busy, the app will automatically use the next available port (8082, 8083, etc.)

### **Dependencies Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Build Issues**
```bash
# Clear Expo cache
npx expo start --clear
```

---

**🎉 Your banking app is now ready for development in GitHub Codespaces!** 