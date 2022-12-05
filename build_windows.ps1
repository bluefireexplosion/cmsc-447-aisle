echo "Insure Xlaunch is running before running this or it won't work"
echo "Xlaunch is necessary for Windows"
docker build -t electron-wrapper .\docker
echo "INSURE XLAUNCH is RUNNING before running this or it won't work"
echo "Xlaunch is necessary for Windows"
wsl ip route show
$Server = Read-Host -Prompt 'Input the IP at the top of the IPs above plus a :0.0 at the end:'
set-variable -name DISPLAY -value $Server
docker run -ti --rm -e DISPLAY=$DISPLAY --rm -it electron-wrapper bash
echo "Now entering devenv via docker..."