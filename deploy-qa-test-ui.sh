#git pull;
#sed -e 's/mode: [^\']*'/mode:"'dev'",/g' src/config/config.js > src/config/config_copy.js
#mv src/config/config_copy.js src/config/config.js
#npm run build-prod-qa;
npm run build-test;
echo "!RonM@n-U! DEpL0ymEnT SeRvEr"
scp -r build/. ows_user@10.5.204.111:/app/docroot/html/longurl/dummy-dashboard/;
ssh ows_user@10.5.204.111 "chmod -R 755 /app/docroot/html/longurl/dummy-dashboard/";
