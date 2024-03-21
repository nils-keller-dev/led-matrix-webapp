#!/bin/bash

BUILD_DIR="dist"
PI_USER="admin"
PI_HOST="192.168.178.43"
PI_TARGET_DIR="/home/admin/rpi-led-matrix-application/webapp"

echo "Building the project..."
npm run build || { echo "Build failed"; exit 1; }

echo

echo "Deleting old files on Raspberry Pi..."
ssh $PI_USER@$PI_HOST "rm -rf $PI_TARGET_DIR/*" || { echo "Failed to delete old files"; exit 1; }

echo "Done."

echo

echo "Transferring files to Raspberry Pi..."
scp -r $BUILD_DIR/* $PI_USER@$PI_HOST:$PI_TARGET_DIR/ || { echo "File transfer failed"; exit 1; }

echo

echo "Deployment completed successfully."
