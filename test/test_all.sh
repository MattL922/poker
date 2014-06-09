#!/bin/bash

cd ~/poker/test

node shuffle.js
#if [ $? -gt 0 ]; then
#    echo "[x] shuffle.js"
#    exit $?
#fi
#echo -e "[\xE2\x9C\x93] shuffle.js"

node evaluator.js
#if [ $? -gt 0 ]; then
#    echo "[x] shuffle.js"
#    exit $?
#fi
#echo -e "[\xE2\x9C\x93] evaluator.js"

#echo "All tests passed!"

