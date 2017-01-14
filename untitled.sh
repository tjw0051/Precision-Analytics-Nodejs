#	Database Login

mongo -u "489nvn0jlajnvu4" -p "d58fn84v843soalne456" -authenticationDatabase "admin"

# Test POST LogEvent

curl -i -X POST -H "Content-Type:application/json" http://localhost:8080/api/logevent -d '{"_id":"5879543737b259abc0627a2a","app":"test","type":"Search Error", "params": {"make":"mazda", "reg", "x868unw"},"__v":0}'

# Test GET all LogEvent

curl http://localhost:8080/api/logevent

# Test POST clearlog


