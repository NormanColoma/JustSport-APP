set -e
 
CONNECT_URL="https://saucelabs.com/downloads/sc-4.3.14-linux.tar.gz"
CONNECT_DIR="/tmp/sauce-connect-$RANDOM"
CONNECT_DOWNLOAD="sc-linux.tar.gz"
READY_FILE="connect-ready-$RANDOM"
 
# Get connect
mkdir -p $CONNECT_DIR
cd $CONNECT_DIR
curl $CONNECT_URL -o $CONNECT_DOWNLOAD
tar zxvf $CONNECT_DOWNLOAD --strip-components=1
rm $CONNECT_DOWNLOAD
 
# Start
./bin/sc --readyfile $READY_FILE \
  --tunnel-identifier $TRAVIS_JOB_NUMBER \
  -u NormanColoma -k 923e35c3-a5a6-4518-b002-21b52dd559f1 &
 
# Wait for Connect to be ready before exiting
while [ ! -f $READY_FILE ]; do
  sleep .5
done