Assuming your issues have URLs like https://foo.onjira.com/browse/BAR-666, here is the block you would have in config.json:
```
    "plugins": {
        "jira_issue": {
             "prefix": "BAR",
             "baseurl": "https://foo.onjira.com/browse/"
        }
    }
```
