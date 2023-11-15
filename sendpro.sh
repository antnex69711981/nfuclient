#! /bin/bash

export serverport=2205
export serveruser="mis"
export serverhost="aiot0616.antnex.com.tw"
export serverpwd=""
export sourcePath="./build/production/antnex/*"
export targetPath="/opt/web/source"

echo ""
echo "source: $sourcePath"
# echo "User  : $serveruser"
# echo "Host  : $serverhost"
# echo "target: $targetPath"
echo "target: $serveruser@$serverhost:$targetPath"
echo ""

read -p "Press enter to continue..."

# echo $serverpwd|pbcopy
scp -r -P $serverport $sourcePath $serveruser@$serverhost:$targetPath