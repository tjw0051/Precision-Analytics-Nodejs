# Precision Analytics

This API was created out of a need for a lightweight analytics tool for logging individual events in detail, rather than fancy graphs and vague heuristics.

A single server can manage multiple event types across multiple applications. The format for event logging is given in the following JSON format:

```
{
	"app":"test",
	"type":"Search Error",
	"params": {"CUSTOM_KEY":"CUSTOM_VALUE", ...}
}
```

## Authentication

An authentication file must be included in the root directory of the server. This file provides the authentication keys for login to MongoDB and API authentication for client access (TBD).

```
{
	"username":"",
	"password":""
}
```

# Database Login
## Admin Login

```
mongo -u "USERNAME" -p "PASSWORD" -authenticationDatabase "admin"
```

# Terminal Testing
## Test POST LogEvent

```
curl -i -X POST -H "Content-Type:application/json" http://localhost:8080/api/logevent -d '{"app":"test","type":"Search Error", "params": {"make":"mazda", "reg": "x868unw"}}'
```

## Test GET all LogEvent

```
curl http://localhost:8080/api/logevent
```

## Test POST clearlog


