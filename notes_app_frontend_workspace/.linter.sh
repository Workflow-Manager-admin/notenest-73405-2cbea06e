#!/bin/bash
cd /home/kavia/workspace/code-generation/notenest-73405-2cbea06e/notes_app_frontend_workspace/notes_app_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

