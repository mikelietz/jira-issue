Assuming your issues have URLs like https://foo.onjira.com/browse/BAR-666, here is the block you would have in config.json:

```
    "plugins": {
        "jira_issue": {
            "prefix": [ "TEST", "FOO", "BAR" ],
            "hostname": "<whatever>.onjira.com",
            "path": "/rest/api/2.0.alpha1/",
            "username": "<username>",
            "password": "<password>",
            "issue_base_url": "https://<whatever>.onjira.com/browse/"
        }
     }
```
