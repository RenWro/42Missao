#!/bin/bash
num_files=$(find . -maxdepth 1 -type f | wc -l)
num_dirs=$(ls -d | wc -l)
echo "Numero de arquivos: $num_files"
echo "Numero de diretorios: $num_dirs"
