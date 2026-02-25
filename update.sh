#!/bin/bash
git add .
msg="Update: $(date +'%Y-%m-%d %H:%M:%S')"
git commit -m "$msg"
git push
echo "✅ Website update command sent to Vercel!"
