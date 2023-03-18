#!/bin/sh

cd "$(dirname "$0")/../frontend" || exit
firebase emulators:start --import _firebase/ --export-on-exit _firebase/
