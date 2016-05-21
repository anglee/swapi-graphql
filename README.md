# swapi-graphql

```
npm install
npm run dev
```

go to [http://localhost:3000/graphql](http://localhost:3000/graphql)

Make query = `{hello}`

or just curl in cli

```
http http://localhost:3000/graphql?query={hello}

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 26
Content-Type: application/json; charset=utf-8
Date: Sat, 21 May 2016 14:07:46 GMT
ETag: W/"1a-ib55vSxh8MVQdVAxzWt/SA"
X-Powered-By: Express

{
    "data": {
        "hello": "world"
    }
}
```

