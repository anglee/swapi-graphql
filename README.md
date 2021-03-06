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

----
data

```
const data = {
  users: [
    {
      id: '1',
      name: 'A1'
    },
    {
      id: '2',
      name: 'B2'
    }
  ],
  teams: [
    {
      name: 'T1',
      members: ['1']
    },
    {
      name: 'T2',
      members: ['1', '2']
    }
  ]
};
```

----
query

```
{
  user(id: "1") {
    name
  }
}
```

response

```
{
  "data": {
    "user": {
      "name": "A1"
    }
  }
}
```

----
query

```
{
  allUsers {
    id,
    name
  }
}
```

response

```
{
  "data": {
    "allUsers": [
      {
        "id": "1",
        "name": "A1"
      },
      {
        "id": "2",
        "name": "B2"
      }
    ]
  }
}
```

----
query

```
{
  allTeams {
    name
    members {
      name
    }
  }
}
```

response

```
{
  "data": {
    "allTeams": [
      {
        "name": "T1",
        "members": [
          {
            "name": "A1"
          }
        ]
      },
      {
        "name": "T2",
        "members": [
          {
            "name": "A1"
          },
          {
            "name": "B2"
          }
        ]
      }
    ]
  }
}
```