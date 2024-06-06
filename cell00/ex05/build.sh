#!/bin/bash
if [ $# -eq 0 ]; then
echo "Não tem argumentos fuén"
exit 1
fi
for arg in "$@"; do
mkdir "ex${arg}"
done
