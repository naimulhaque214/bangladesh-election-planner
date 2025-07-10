#!/bin/bash

# Bangladesh Election Campaign Planner - Setup Verification Script
# Author: Naimul Haque (naimulhaque214)

echo "🔍 Verifying Bangladesh Election Campaign Planner setup..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📋 Setup verification for Bangladesh Election Campaign Planner${NC}"
echo ""

# Step 1: Check project structure
echo -e "${BLUE}📁 Checking project structure...${NC}"

# Essential directories
directories=("components" "components/ui" "data" "utils" "styles" ".github/workflows")
all_dirs_ok=true

for dir in "${directories[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✅ $dir/${NC}"
    else
        echo -e "${RED}❌ $dir/ (missing)${NC}"
        all_dirs_ok=false
    fi
done

# Essential files
files=("package.json" "App.tsx" "main.tsx" "index.html" "README.md" "LICENSE")
all_files_ok=true

echo ""
echo -e "${BLUE}📄 Checking essential files...${NC}"
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file (missing)${NC}"
        all_files_ok=false
    fi
done

# Step 2: Check Node.js and npm
echo ""
echo -e "${BLUE}🔧 Checking development environment...${NC}"

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js not found${NC}"
    echo -e "${YELLOW}   Install Node.js from https://nodejs.org${NC}"
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✅ npm: v$NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm not found${NC}"
fi

# Step 3: Check package.json and dependencies
echo ""
echo -e "${BLUE}📦 Checking dependencies...${NC}"

if [ -f "package.json" ]; then
    if [ -d "node_modules" ]; then
        echo -e "${GREEN}✅ Dependencies installed${NC}"
    else
        echo -e "${YELLOW}⚠️  Dependencies not installed${NC}"
        echo -e "${BLUE}   Run: npm install${NC}"
    fi
    
    # Check key dependencies
    if grep -q "react" package.json; then
        echo -e "${GREEN}✅ React configured${NC}"
    else
        echo -e "${RED}❌ React missing from package.json${NC}"
    fi
    
    if grep -q "typescript" package.json; then
        echo -e "${GREEN}✅ TypeScript configured${NC}"
    else
        echo -e "${RED}❌ TypeScript missing from package.json${NC}"
    fi
    
    if grep -q "vite" package.json; then
        echo -e "${GREEN}✅ Vite configured${NC}"
    else
        echo -e "${RED}❌ Vite missing from package.json${NC}"
    fi
else
    echo -e "${RED}❌ package.json not found${NC}"
fi

# Step 4: Check TypeScript configuration
echo ""
echo -e "${BLUE}⚙️  Checking configuration files...${NC}"

config_files=("tsconfig.json" "vite.config.ts" ".eslintrc.cjs" "postcss.config.js")
for config in "${config_files[@]}"; do
    if [ -f "$config" ]; then
        echo -e "${GREEN}✅ $config${NC}"
    else
        echo -e "${YELLOW}⚠️  $config (missing)${NC}"
    fi
done

# Step 5: Check React components
echo ""
echo -e "${BLUE}🧩 Checking React components...${NC}"

components=("components/CampaignPlanner.tsx" "components/MapView.tsx" "components/AreaSelector.tsx" "components/RouteOptimizer.tsx" "components/PopulationStats.tsx")
for component in "${components[@]}"; do
    if [ -f "$component" ]; then
        echo -e "${GREEN}✅ $component${NC}"
    else
        echo -e "${RED}❌ $component (missing)${NC}"
    fi
done

# Check UI components
ui_count=$(find components/ui -name "*.tsx" 2>/dev/null | wc -l)
if [ "$ui_count" -gt 20 ]; then
    echo -e "${GREEN}✅ UI components: $ui_count components${NC}"
else
    echo -e "${YELLOW}⚠️  UI components: $ui_count components (expecting 20+)${NC}"
fi

# Step 6: Check data and utilities
echo ""
echo -e "${BLUE}📊 Checking data and utilities...${NC}"

if [ -f "data/bangladeshConstituencies.ts" ]; then
    echo -e "${GREEN}✅ Bangladesh constituencies data${NC}"
else
    echo -e "${RED}❌ Bangladesh constituencies data missing${NC}"
fi

if [ -f "utils/geneticAlgorithm.ts" ]; then
    echo -e "${GREEN}✅ Genetic algorithm utilities${NC}"
else
    echo -e "${RED}❌ Genetic algorithm utilities missing${NC}"
fi

# Step 7: Test build process
echo ""
echo -e "${BLUE}🏗️  Testing build process...${NC}"

if [ -d "node_modules" ] && [ -f "package.json" ]; then
    echo -e "${BLUE}   Running npm run build...${NC}"
    if npm run build > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Build successful${NC}"
        
        if [ -d "dist" ]; then
            echo -e "${GREEN}✅ Distribution files created${NC}"
        else
            echo -e "${YELLOW}⚠️  No dist directory found${NC}"
        fi
    else
        echo -e "${RED}❌ Build failed${NC}"
        echo -e "${YELLOW}   Run 'npm run build' manually to see errors${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Cannot test build - install dependencies first${NC}"
fi

# Step 8: Check Git setup
echo ""
echo -e "${BLUE}📋 Checking Git setup...${NC}"

if [ -d ".git" ]; then
    echo -e "${GREEN}✅ Git repository initialized${NC}"
    
    if git remote get-url origin &> /dev/null; then
        REMOTE_URL=$(git remote get-url origin)
        echo -e "${GREEN}✅ Remote origin: $REMOTE_URL${NC}"
    else
        echo -e "${YELLOW}⚠️  No remote origin configured${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Git repository not initialized${NC}"
    echo -e "${BLUE}   Run: git init${NC}"
fi

# Step 9: Overall status
echo ""
echo -e "${BLUE}📊 Project Statistics:${NC}"
echo "   📁 $(find . -name '*.tsx' -o -name '*.ts' 2>/dev/null | wc -l) TypeScript files"
echo "   🧩 $(find components -name '*.tsx' 2>/dev/null | wc -l) React components"
echo "   🎨 $(find components/ui -name '*.tsx' 2>/dev/null | wc -l) UI components"
echo "   📄 $(find . -maxdepth 1 -name '*.md' 2>/dev/null | wc -l) documentation files"

echo ""
echo -e "${BLUE}🎯 Final Status:${NC}"

if $all_dirs_ok && $all_files_ok; then
    echo -e "${GREEN}🎉 SETUP COMPLETE! Your Bangladesh Election Campaign Planner is ready!${NC}"
    echo ""
    echo -e "${BLUE}🚀 Next Steps:${NC}"
    if [ ! -d "node_modules" ]; then
        echo "   1. 📦 Run: npm install"
        echo "   2. 🏃 Run: npm run dev"
    else
        echo "   1. 🏃 Run: npm run dev"
        echo "   2. 🌐 Open http://localhost:5173"
    fi
    echo "   3. 🔧 Run: ./final-push.sh (to push to GitHub)"
    echo "   4. 🏗️  Run: npm run build (for production)"
else
    echo -e "${YELLOW}⚠️  SETUP INCOMPLETE - Some files or directories are missing${NC}"
    echo ""
    echo -e "${BLUE}🔧 Recommended Actions:${NC}"
    echo "   1. Check missing files and directories above"
    echo "   2. Ensure you have all project files"
    echo "   3. Re-run this verification script"
fi

echo ""
echo -e "${BLUE}💡 Need Help?${NC}"
echo "   • Check README.md for detailed setup instructions"
echo "   • Run 'npm run dev' to start development server"
echo "   • Run './final-push.sh' to push to GitHub"
echo "   • Visit the app at http://localhost:5173 after running dev server"

echo ""
echo -e "${GREEN}✨ Bangladesh Election Campaign Planner - Ready for Action! 🇧🇩${NC}"