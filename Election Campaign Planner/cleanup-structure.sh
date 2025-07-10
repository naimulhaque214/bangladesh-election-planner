#!/bin/bash

# Bangladesh Election Campaign Planner - Structure Cleanup Script
# Author: Naimul Haque (naimulhaque214)

echo "🧹 Cleaning up project structure..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📋 Structure cleanup for Bangladesh Election Campaign Planner${NC}"
echo ""

# Step 1: Remove incorrectly placed workflow directory
if [ -d "workflows" ]; then
    echo -e "${YELLOW}🗑️  Removing incorrectly placed workflows/ directory...${NC}"
    rm -rf workflows/
    echo -e "${GREEN}✅ Removed workflows/ directory${NC}"
else
    echo -e "${GREEN}✅ No incorrect workflows/ directory found${NC}"
fi

# Step 2: Remove incorrectly placed files under LICENSE
if [ -f "LICENSE/Code-component-28-49.tsx" ]; then
    echo -e "${YELLOW}🗑️  Removing incorrectly placed component files...${NC}"
    rm -f "LICENSE/Code-component-28-49.tsx"
    rm -f "LICENSE/Code-component-28-75.tsx"
    echo -e "${GREEN}✅ Removed incorrectly placed component files${NC}"
else
    echo -e "${GREEN}✅ No incorrectly placed component files found${NC}"
fi

# Step 3: Handle LICENSE directory/file conflict
if [ -d "LICENSE" ]; then
    echo -e "${YELLOW}📄 Converting LICENSE directory to file...${NC}"
    # Remove the directory if it's empty or only contains the files we just deleted
    if [ -z "$(ls -A LICENSE 2>/dev/null)" ]; then
        rmdir LICENSE
        echo -e "${GREEN}✅ Removed empty LICENSE directory${NC}"
    else
        echo -e "${YELLOW}⚠️  LICENSE directory not empty, manual cleanup needed${NC}"
        ls -la LICENSE/
    fi
fi

# Step 4: Ensure LICENSE file exists in root
if [ ! -f "LICENSE" ]; then
    echo -e "${YELLOW}📄 Creating LICENSE file...${NC}"
    cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2025 Naimul Haque

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
    echo -e "${GREEN}✅ Created LICENSE file${NC}"
else
    echo -e "${GREEN}✅ LICENSE file already exists${NC}"
fi

# Step 5: Ensure .github/workflows directory exists
if [ ! -d ".github/workflows" ]; then
    echo -e "${YELLOW}📁 Creating .github/workflows directory...${NC}"
    mkdir -p .github/workflows
    echo -e "${GREEN}✅ Created .github/workflows directory${NC}"
else
    echo -e "${GREEN}✅ .github/workflows directory already exists${NC}"
fi

# Step 6: Move workflow file if it's in the wrong place
if [ -f "workflows/ci.yml" ] && [ ! -f ".github/workflows/ci.yml" ]; then
    echo -e "${YELLOW}📁 Moving workflow file to correct location...${NC}"
    mv workflows/ci.yml .github/workflows/ci.yml
    rmdir workflows 2>/dev/null || true
    echo -e "${GREEN}✅ Moved workflow file to .github/workflows/ci.yml${NC}"
fi

# Step 7: Verify CI workflow is in correct location
if [ ! -f ".github/workflows/ci.yml" ]; then
    echo -e "${RED}❌ GitHub Actions workflow missing${NC}"
    echo -e "${YELLOW}💡 The workflow should be created in .github/workflows/ci.yml${NC}"
else
    echo -e "${GREEN}✅ GitHub Actions workflow in correct location${NC}"
fi

# Step 8: Make scripts executable
echo -e "${BLUE}🔧 Making scripts executable...${NC}"
chmod +x *.sh 2>/dev/null || true
echo -e "${GREEN}✅ Scripts are now executable${NC}"

# Step 9: Clean up any temporary files
if ls .DS_Store >/dev/null 2>&1; then
    echo -e "${YELLOW}🗑️  Removing .DS_Store files...${NC}"
    find . -name ".DS_Store" -delete 2>/dev/null || true
    echo -e "${GREEN}✅ Removed .DS_Store files${NC}"
fi

if ls Thumbs.db >/dev/null 2>&1; then
    echo -e "${YELLOW}🗑️  Removing Thumbs.db files...${NC}"
    find . -name "Thumbs.db" -delete 2>/dev/null || true
    echo -e "${GREEN}✅ Removed Thumbs.db files${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Structure cleanup completed!${NC}"
echo ""

# Step 10: Display current structure verification
echo -e "${BLUE}📁 Verifying project structure:${NC}"
echo ""

# Check key directories
directories=(".github/workflows" "components" "components/ui" "data" "utils" "styles")
for dir in "${directories[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✅ $dir/${NC}"
    else
        echo -e "${RED}❌ $dir/ (missing)${NC}"
    fi
done

echo ""

# Check key files
files=("package.json" "App.tsx" "README.md" "LICENSE" ".github/workflows/ci.yml")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file (missing)${NC}"
    fi
done

echo ""
echo -e "${BLUE}📊 Project Statistics:${NC}"
echo "   📁 $(find components -name '*.tsx' 2>/dev/null | wc -l) React components"
echo "   🎨 $(find components/ui -name '*.tsx' 2>/dev/null | wc -l) UI components"
echo "   📄 $(find . -maxdepth 1 -name '*.md' 2>/dev/null | wc -l) documentation files"
echo "   ⚙️  $(find . -maxdepth 1 -name '*.json' -o -name '*.js' -o -name '*.ts' 2>/dev/null | wc -l) configuration files"

echo ""
echo -e "${BLUE}🚀 Next Steps:${NC}"
echo "   1. Run: npm install"
echo "   2. Run: npm run dev"
echo "   3. Run: ./verify-setup.sh (to check everything)"
echo "   4. Run: ./final-push.sh (to push to GitHub)"

echo ""
echo -e "${GREEN}✨ Your Bangladesh Election Campaign Planner is ready!${NC}"