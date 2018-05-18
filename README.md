# lock-walker

Visualize dependency tree in `package-lock.json` and make it searchable.

Try our hosted version at [https://compulim.github.io/lock-walker/](https://compulim.github.io/lock-walker/).

This app is built with [React](https://reactjs.org/) + [Redux](https://redux.js.org/) + [glamor](https://github.com/threepointone/glamor) and is run purely in a browser. We will not send your `package-lock.json` thru the network.

# Background

We maintain many open source projects. But from time to time, our projects may eventually depended on outdated dependencies, some may also contains security vulnerabilities.

We built `lock-walker` in search for an easier way to look at a few things:

* Find out what packages need to be updated to pass security check
* De-dupe packages with multiple versions by upgrading some of its dependents
* Find out what caused version conflicts
* Make `package-lock.json` way more useful

# Contributions

Like us? [Star](https://github.com/compulim/lock-walker/stargazers) us.

Want to make it better? [File](https://github.com/compulim/lock-walker/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/lock-walker/pulls) a pull request.
