#!/bin/bash

# SADECI Platform - Setup Verification Script
# This script verifies that your development environment is properly configured

set -e

echo "🔍 SADECI Platform - Setup Verification"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node --version)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')

# Validate NODE_MAJOR is numeric
if ! [[ "$NODE_MAJOR" =~ ^[0-9]+$ ]]; then
    echo -e "${RED}✗${NC} Unable to parse Node.js version: $NODE_VERSION"
    exit 1
fi

if [ "$NODE_MAJOR" -ge 18 ]; then
    echo -e "${GREEN}✓${NC} Node.js version: $NODE_VERSION (>= v18.0.0)"
else
    echo -e "${RED}✗${NC} Node.js version: $NODE_VERSION (requires >= v18.0.0)"
    exit 1
fi

# Check bun version
echo ""
echo "📦 Checking bun version..."
BUN_VERSION=$(bun --version)
echo -e "${GREEN}✓${NC} bun version: $BUN_VERSION"

# Check if node_modules exists
echo ""
echo "📁 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules directory exists"
else
    echo -e "${YELLOW}⚠${NC} node_modules not found. Running bun install..."
    bun install
fi

# Check if .env file exists
echo ""
echo "⚙️  Checking environment configuration..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
else
    echo -e "${YELLOW}⚠${NC} .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠${NC} Please update .env with your API base URL"
fi

# Run linter
echo ""
echo "🔍 Running linter..."
LINT_OUTPUT=$(bun run lint 2>&1)
LINT_EXIT=$?

if [ $LINT_EXIT -eq 0 ]; then
    echo -e "${GREEN}✓${NC} ESLint passed - no issues found"
else
    echo -e "${RED}✗${NC} ESLint failed - please fix linting errors"
    echo ""
    echo "$LINT_OUTPUT"
    exit 1
fi

# Build project
echo ""
echo "🏗️  Building project..."
BUILD_OUTPUT=$(bun run build 2>&1)
BUILD_EXIT=$?

if [ $BUILD_EXIT -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Build successful - dist/ directory created"
else
    echo -e "${RED}✗${NC} Build failed - please check for errors"
    echo ""
    echo "$BUILD_OUTPUT"
    exit 1
fi

# Check dist directory
if [ -d ".next" ]; then
    echo -e "${GREEN}✓${NC} Build artifacts generated"
else
    echo -e "${RED}✗${NC} .next/ directory not found after build"
    exit 1
fi

# Summary
echo ""
echo "========================================"
echo -e "${GREEN}✅ All checks passed!${NC}"
echo ""
echo "Your development environment is ready."
echo ""
echo "Next steps:"
echo "  1. Update .env with your API base URL if not already done"
echo "  2. Start the development server: bun run dev"
echo "  3. Open http://localhost:3000 in your browser"
echo ""
echo "For more information, see:"
echo "  - README.md - Project overview and quick start"
echo "  - CONTRIBUTING.md - Development guide"
echo "  - API_SPEC.md - API documentation"
echo ""
