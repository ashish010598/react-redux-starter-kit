#!/bin/bash
read -p "Enter path name : " _path
read -p "Enter env [QA, PROD, DEV] name: " _env

echo "$_env build will be deployed on $_path folder"

REACT_APP_ENV=$_env REACT_APP_BASE_HREF=/longurl/$_path PUBLIC_URL=. npm run build


cd build;
sed -i -e "s/__UPDATEURL__/$_path/g" .htaccess
mkdir $_path
cd ..
mv ./build/* ./build/$_path/
mv ./build/.htaccess ./build/$_path/

echo "Password: A!rt3l_online"
scp -r ./build/* ows_user@10.5.204.111:/app/docroot/html/longurl/;
ssh ows_user@10.5.204.111 "chmod -R 755 /app/docroot/html";
