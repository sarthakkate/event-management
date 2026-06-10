#!/bin/bash
# Event Management System - Quick Setup Script for macOS/Linux
# This script automates the initial setup process

echo ""
echo "========================================"
echo "Event Management System - Setup Script"
echo "========================================"
echo ""

# Check Node.js
echo "Checking for Node.js..."
if ! command -v node &> /dev/null; then
    echo "Error: Node.js not found. Please install from https://nodejs.org/"
    exit 1
fi
echo "Node.js is installed: $(node --version)"

# Check MongoDB
echo "Checking for MongoDB..."
if ! command -v mongod &> /dev/null; then
    echo "Warning: MongoDB not found locally."
    read -p "Do you want to use MongoDB Atlas instead? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Please install MongoDB from https://www.mongodb.com/try/download/community"
        exit 1
    fi
fi

# Navigate to server directory
cd server || exit 1

# Install dependencies
echo ""
echo "Installing server dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 1
fi
echo "Dependencies installed successfully"

# Create .env file
echo ""
echo "Setting up environment configuration..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo ".env file created. Please edit it with your configuration."
    echo ""
    echo "Opening .env for editing..."
    # Try to open with default editor
    ${EDITOR:-nano} .env
else
    echo ".env file already exists"
fi

# Summary
echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Review server/.env configuration"
echo "2. Start MongoDB (or use MongoDB Atlas)"
echo "3. Run: npm start (in server directory)"
echo "4. Open client/pages/index.html in your browser"
echo ""
echo "For more information, see QUICK_START.md"
echo ""
