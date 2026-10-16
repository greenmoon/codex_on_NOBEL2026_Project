#!/bin/sh
set -eu

sound_file="/System/Library/Sounds/Glass.aiff"

if [ ! -r "$sound_file" ]; then
  echo "JB_DONE sound file is unavailable: $sound_file" >&2
  exit 1
fi

if /usr/bin/afplay "$sound_file" 2>/dev/null; then
  /bin/sleep 0.12
  /usr/bin/afplay "$sound_file"
else
  /usr/bin/osascript -e 'beep 2'
fi
