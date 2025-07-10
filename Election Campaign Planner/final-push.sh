#!/bin/bash

# Bangladesh Election Campaign Planner - Final Push Script
# Author: Naimul Haque (naimulhaque214)

set -e

echo "🚀 Final push to GitHub for Bangladesh Election Campaign Planner..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Repository details
REPO_NAME="bangladesh-election-planner"
GITHUB_USERNAME="naimulhaque214"
REPO_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo -e "${BLUE}📋 Final setup for: ${GITHUB_USERNAME}/${REPO_NAME}${NC}"
echo ""

# Step 1: Run structure cleanup
echo -e "${BLUE}🧹 Running structure cleanup...${NC}"
if [ -f "./cleanup-structure.sh" ]; then
    chmod +x ./cleanup-structure.sh
    ./cleanup-structure.sh
else
    # Manual cleanup if script doesn't exist
    if [ -d "workflows" ]; then
        echo -e "${YELLOW}   Removing incorrectly placed workflows/ directory...${NC}"
        rm -rf workflows/
    fi
    
    # Remove incorrectly placed files under LICENSE
    if [ -f "LICENSE/Code-component-28-49.tsx" ]; then
        echo -e "${YELLOW}   Removing incorrectly placed component files...${NC}"
        rm -f "LICENSE/Code-component-28-49.tsx"
        rm -f "LICENSE/Code-component-28-75.tsx"
        if [ -d "LICENSE" ] && [ -z "$(ls -A LICENSE)" ]; then
            rmdir LICENSE
        fi
    fi
    
    # Ensure .github/workflows directory exists
    mkdir -p .github/workflows
fi

# Step 2: Make all scripts executable
echo -e "${BLUE}🔧 Making scripts executable...${NC}"
chmod +x *.sh

# Step 3: Initialize git repository if needed
if [ ! -d ".git" ]; then
    echo -e "${BLUE}📂 Initializing Git repository...${NC}"
    git init
    git branch -M main
else
    echo -e "${GREEN}✅ Git repository already initialized${NC}"
fi

# Step 4: Configure git remote
echo -e "${BLUE}🔗 Setting up remote origin...${NC}"
if git remote get-url origin &> /dev/null; then
    CURRENT_REMOTE=$(git remote get-url origin)
    if [[ $CURRENT_REMOTE != $REPO_URL ]]; then
        echo -e "${YELLOW}   Updating remote origin...${NC}"
        git remote set-url origin ${REPO_URL}
    else
        echo -e "${GREEN}✅ Remote origin already correct${NC}"
    fi
else
    echo -e "${YELLOW}   Adding remote origin...${NC}"
    git remote add origin ${REPO_URL}
fi

# Step 5: Add all files
echo -e "${BLUE}📁 Adding all files to git...${NC}"
git add .

# Step 6: Create comprehensive commit
echo -e "${BLUE}💾 Creating comprehensive commit...${NC}"
if git diff --staged --quiet; then
    echo -e "${YELLOW}   No new changes to commit${NC}"
    
    # Try to push if we have commits
    if git rev-parse --verify HEAD &> /dev/null; then
        echo -e "${BLUE}🚀 Pushing existing commits...${NC}"
    else
        echo -e "${RED}❌ No commits found${NC}"
        exit 1
    fi
else
    git commit -m "🎯 Bangladesh Election Campaign Planner - Simplified Version

📊 Election Campaign & Leaflet Distribution Planning App for Bangladesh

✨ Core Features:
• Interactive constituency map with Leaflet integration
• Multi-area selection with demographic analytics
• Advanced route planning and optimization algorithms
• Real-time population density visualization
• Mobile-responsive design with Tailwind CSS

🛠️ Technical Implementation:
• React 18 + TypeScript for type-safe development
• Tailwind CSS v4 with custom design system
• Shadcn/ui component library for consistent UI
• Leaflet maps with OpenStreetMap integration
• Recharts for interactive data visualization
• Genetic algorithm for route optimization (simplified)

📋 Professional Setup:
• Complete GitHub Actions CI/CD pipeline
• ESLint + Prettier + TypeScript configuration
• Comprehensive documentation (README, CONTRIBUTING, CHANGELOG)
• Environment variable management
• Automated deployment scripts
• Industry-standard project structure

🌍 Bangladesh-Specific:
• Complete constituency boundary data
• Population and demographic information
• Culturally appropriate UI/UX design
• Optimized for local campaign planning needs

🚀 Production Ready:
• Automated testing and quality checks
• GitHub Pages deployment configuration
• Professional documentation and guidelines
• MIT licensed for open collaboration
• Simplified without transportation mode requirements

Author: Naimul Haque (naimulhaque214)
Repository: https://github.com/naimulhaque214/bangladesh-election-planner"
fi

# Step 7: Push to GitHub
echo -e "${BLUE}🚀 Pushing to GitHub...${NC}"
echo ""

if git push -u origin main; then
    echo ""
    echo -e "${GREEN}🎉 SUCCESS! Repository pushed to GitHub!${NC}"
    echo ""
    echo -e "${BLUE}📍 Your repository is now live:${NC}"
    echo -e "${GREEN}   🌐 https://github.com/${GITHUB_USERNAME}/${REPO_NAME}${NC}"
    echo ""
    echo -e "${BLUE}📋 What's included:${NC}"
    echo "   ✅ Complete React + TypeScript application"
    echo "   ✅ Interactive map with Bangladesh constituencies"
    echo "   ✅ Simplified route planning algorithms"
    echo "   ✅ Professional documentation"
    echo "   ✅ CI/CD pipeline with GitHub Actions"
    echo "   ✅ Clean project structure"
    echo "   ✅ Ready for deployment"
    echo ""
    echo -e "${BLUE}🚀 Next Steps:${NC}"
    echo "   1. 🌐 Visit your repository on GitHub"
    echo "   2. ⚙️  Enable GitHub Pages in Settings → Pages"
    echo "   3. 📥 Clone locally: git clone ${REPO_URL}"
    echo "   4. 📦 Install dependencies: npm install"
    echo "   5. 🏃 Start development: npm run dev"
    echo "   6. 🏗️  Build for production: npm run build"
    echo ""
    echo -e "${GREEN}🎊 All done! Your Bangladesh Election Campaign Planner is ready!${NC}"
    echo ""
    echo -e "${BLUE}💡 Pro Tips:${NC}"
    echo "   • Run ./verify-setup.sh to check everything"
    echo "   • Use ./deploy.sh for production builds"
    echo "   • Check CONTRIBUTING.md for development guidelines"
    echo "   • Review README.md for complete documentation"
    
else
    echo ""
    echo -e "${RED}❌ Failed to push to GitHub${NC}"
    echo ""
    echo -e "${YELLOW}🔧 Troubleshooting:${NC}"
    echo ""
    echo -e "${BLUE}1. Repository Setup:${NC}"
    echo "   • Create repository 'bangladesh-election-planner' on GitHub"
    echo "   • Make sure it's public or you have push access"
    echo ""
    echo -e "${BLUE}2. Authentication:${NC}"
    echo "   • Configure Git: git config --global user.name 'Your Name'"
    echo "   • Configure Git: git config --global user.email 'your.email@example.com'"
    echo "   • Setup GitHub authentication (Personal Access Token or SSH)"
    echo ""
    echo -e "${BLUE}3. Manual Push:${NC}"
    echo "   git remote -v  # Check remote URL"
    echo "   git status     # Check git status"
    echo "   git push -u origin main  # Manual push"
    echo ""
    echo -e "${BLUE}4. Alternative:${NC}"
    echo "   • Push via GitHub Desktop"
    echo "   • Use GitHub CLI: gh repo create"
    echo ""
    echo -e "${YELLOW}💬 Need help? Check the error message above for specific issues.${NC}"
fi

echo ""
echo -e "${BLUE}📊 Repository Statistics:${NC}"
echo "   📁 $(find . -name '*.tsx' -o -name '*.ts' | wc -l) TypeScript files"
echo "   🧩 $(find components -name '*.tsx' 2>/dev/null | wc -l) React components"
echo "   📋 $(wc -l < README.md 2>/dev/null || echo 0) lines of documentation"
echo "   ⚙️  $(find . -name '*.json' -o -name '*.js' -o -name '*.yml' | wc -l) configuration files"