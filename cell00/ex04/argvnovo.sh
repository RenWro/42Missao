case 
#!/bin/bash
if [ $# -eq 0 ]; then
echo "Nao tem argumentos=)"
exit 1
fi
echo "$1"
if [ $# -ge 2 ]; then
echo "$2"
fi
if [ $# -ge 3 ]; then
echo "$3"
fi
