# Nested Index Set
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=584865046)

<!-- TODO: Description -->

## Installation

```sh
npm install @chrislloyd/nested-index-set --registry=https://npm.pkg.github.com
```

Reference:
* [NPM](https://docs.npmjs.com)
* [GitHub Packages](https://docs.github.com/packages)

## Usage

`NestedIndexSet` is intended to model a CSS `z-index` domain. They let you statically capture relationships between indexes without having to dynamically create indexes. A basic example is figuring out a `z-index` for a Modal. Using a fixed number (i.e. `999`) doesn't capture the intent that it should sit _above_ other element's on the page. For example:

```tsx
import NestedIndexSet from '@chrislloyd/nested-index-set';

// The min/max values are the (approximate) values of CSS' integer types. See
// https://stackoverflow.com/questions/491052/minimum-and-maximum-value-of-z-index
const page = NestedIndexSet.fromRange(-2147483648, 2147483647); // index=0

export const z = page.above(); // index=1073741824
export function Modal() {
    return <div style={{ zIndex: z.index }} />;
}
```

If the `Modal` is changed to be below a `Menu`, we'd simply update that reference:

```tsx
const menu = page.above();
export const z = menu.below();
```

All indexes that depend on `z` are guarenteed to still work as intended.

### Integration

`NestedIndexSet` can be used in brown-field sites where you may already have fixed `z-index` and want to incrementallly capture the relationship between them. For example:

```tsx
// previously:
// --menu-z-index: 998;
// --menu-z-index: 999;
const menu = new NestedIndexSet(0, 998, 999); // index=999
const modal = new NestedIndexSet(998, 999, 2147483647); // index=9999
```

If you start off by expressing the values in this way, you can then incrementally update your site to use a more expressive setup like in the previous example. `menu.max` and `modal.index` being the same value is a good hint that those indexes are defined in terms of one another.

### Static vs. Dynamic

There's nothing about NestedIndexSet that _requires_ static usage (i.e. values computed in module scope rather than at runtime) however that is it's primary usage. By specifying indexes in module scope, it makes the indexes more portable to more environments (server rendering, codegen etc.). It's more akin to traditional CSS.

## Background

NestedIndexSets are inspired by Nested Sets from relational databases. By capturing the bounds of an index, it lets us specify `z-index` values as a tree rather than global magic variables.

```
               below                             above

| ----------------------------- page ----------------------------- |
                                  | ------------ menu ------------ | 
                                  | --- modal --- |
```

There are other ways of capturing these relationships but they either:

* Don't guarentee uniqueness (i.e. two elements can occupy the same index)
* Aren't available statically

Reference:
* [Nested sets model](https://en.wikipedia.org/wiki/Nested_set_model)
* [Managing zIndex in React](https://medium.com/@AsTexKG/managing-zindex-in-react-248f96eb1970)

## Contributing

I ([@chrislloyd](mailto:chris@chrislloyd.net)) have minimal time to dedicate to open source contributors. This package is provided "as is" and is primarily intended for my own benefit. PRs are welcome, however.

Reference:
* [Development Containers](https://containers.dev)
* [GitHub Codespaces](https://docs.github.com/codespaces)
* [GitHub Pull Requests](https://docs.github.com/pull-requests)
