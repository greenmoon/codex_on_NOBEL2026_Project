#!/bin/sh
set -eu

sound_file="/System/Library/Sounds/Glass.aiff"

if [ ! -r "$sound_file" ]; then
  echo "JB_DONE sound file is unavailable: $sound_file" >&2
  exit 1
fi

play_sound() {
  /usr/bin/afplay "$sound_file" 2>/dev/null
}

if ! play_sound; then
  echo "JB_DONE sound playback needs access to the macOS audio service." >&2
  exit 1
fi

/bin/sleep 0.12

if ! play_sound; then
  echo "JB_DONE second alert sound could not be played." >&2
  exit 1
fi
