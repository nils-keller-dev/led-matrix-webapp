#!/bin/bash

BUILD_DIR="dist"
PI_USER="admin"
PI_HOST="192.168.178.43"
PI_TARGET_DIR="/home/admin/rpi-led-matrix-application/webapp"
DELETE_OLD_FILES=true

for arg in "$@"
do
    if [[ $arg == "--no-delete" ]]; then
        DELETE_OLD_FILES=false
        break
    fi
done

echo "Building the project..."
npm run build || { echo "Build failed"; exit 1; }

echo

if [ "$DELETE_OLD_FILES" = true ]; then
    echo "Deleting old files on Raspberry Pi..."
    ssh $PI_USER@$PI_HOST "rm -rf $PI_TARGET_DIR/*" || { echo "Failed to delete old files"; exit 1; }
    echo "Done."
else
    echo "Skipping deletion of old files."
fi

echo

echo "Transferring files to Raspberry Pi..."
scp -r $BUILD_DIR/* $PI_USER@$PI_HOST:$PI_TARGET_DIR/ || { echo "File transfer failed"; exit 1; }

echo

echo "Deployment completed successfully."
