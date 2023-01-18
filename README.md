# Data Eden Reactivity Experiments

This repo holds a proof of concept meant to demonstrate how we might added reactivity to data-eden. At its core, we provide a strawman runtime API in the form of `buildCachedFetch`, a function that creates a custom `fetch` function and ties it to the data eden caching layer so that fetch requests ultimately return values from the cache, and which can be kept in sync via the reactivity layer.

To provide this reactivity layer, we define a `ReactiveAdapter` interface and then expose two framework-specific packages (`@data-eden/react` and `@data-eden/ember`) that implement the interface using reactivity layers most easily suited to each framework (`@preact/signals` in the case of React, `TrackedStorage` in the case of Ember).

This repo also contains two example apps (one for each framework) that demonstrate the same basic use case:

- Fetch a user from an API, populating the cache and returning a reactive value
- Render the user
- Update the user via fetch request from a separate, totally unrelated component
- Update the user in the cache
- Demonstrate that the original value updates accordingly, without any re-sync with the cache, or re-fetch

In order to achieve this reactivity, we take a "sidecar" approach, wherein each cached entity has a `ReactiveSignal` embedded into it via a symbol defined in `@data-eden/reactivity`. The cached entity is then wrapped in a Proxy that will read and update the signal on property access, causing any changes to the cached entity to be tracked by the respective reactivitiy layer.
