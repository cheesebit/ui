<p align="center">
  <a href="http://ui.cheesebit.io/" rel="noopener" target="_blank"><img width="150" src="https://cheesebit-static.s3.amazonaws.com/img/cheese-primary.svg" alt="Cheesebit UI logo"></a></p>
</p>

<h1 align="center">Cheesebit UI</h1>

[![build status](https://img.shields.io/travis/cheesebit/ui?style=flat-square)](https://gitlab.com/cheesebit/cheesebit-ui)
[![Coverage Status](https://img.shields.io/coveralls/github/cheesebit/ui?style=flat-square)](https://coveralls.io/github/cheesebit/ui)
[![npm package](https://img.shields.io/npm/v/@cheesebit/ui?style=flat-square)](https://coveralls.io/github/cheesebit/ui)

## Welcome

Hi there, thank you very much for being here.

This is my very own library of components I'm building for my own
delight and/or to be used in one of my projects.

I've put my heart here and I do hope someone can make good use of it - for
learning or productivity purposes - as much as I did (actually still do).

You will see that the components are organized in a quite interesting structure,
inspired in the book [_Atomic Design_](https://atomicdesign.bradfrost.com/), by
[Brad Frost](https://twitter.com/brad_frost).

Helpful feedbacks are totally appreciated.

This is (and it might always be) an ongoing work, since I will keep adding,
changing, upgrading, improving and fixing components as they go live in my own
applications.

Checkout our docs and demo [here](https://ui.cheesebit.io).

## Technical references

- [A modern CSS reset](https://dev.to/hankchizljaw/a-modern-css-reset-6p3)
- CSS naming/architectures
  - [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
  - [RSCSS](https://rscss.io/)
  - [SMACSS](http://smacss.com/)
- [Atomic Design](https://atomicdesign.bradfrost.com/)
- [Testing Library](https://testing-library.com/)
- [Preventing Content Reflow From Lazy-Loaded Images](https://css-tricks.com/preventing-content-reflow-from-lazy-loaded-images/)

## Head-scratching that are/were...

### ... solved
1. Functions provided as reducer for `useReducer` is called twice due to development behavior of Strict mode. Since it can’t automatically detect side effects, it tries to help you to spot them by intentionally double-invoking functions like `useState`, `useMemo`, or `useReduce` (among others) [as per React docs](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects) . You can check the discussion [here](https://github.com/facebook/react/issues/16295).

### ... still open 
1. [Testing Library](https://testing-library.com/) is indeed a very helpful tool when it comes to unit testing React components, but it's still unclear for me how to test things such as screen resize, dimension related tests. HoCs like [`ResizeWatcher`](https://github.com/cheesebit/ui/tree/master/src/hocs/resize-watcher) and [`OverflowWatcher`](https://github.com/cheesebit/ui/tree/master/src/hocs/overflow-watcher)are still pending to be properly unit-tested.

## Who am I?

I'm [Welington](https://www.linkedin.com/in/welingtonsilva/), Frontend Engineer
at Hotmart.

I started my journey as a Software Engineer 9+ years ago; in the last 5+ years I have been focusing on UI/Frontend development.

<small id="logo-source">*Icon made by <a alt="" aria-label="Smashicons" href="https://www.flaticon.com/authors/smashicons" rel="noopener noreferrer" target="_blank" title="Smashicons">Smashicons</a> from <a alt="" aria-label="Flaticon" href="https://www.flaticon.com/" rel="noopener noreferrer" target="_blank" title="Flaticon">www.flaticon.com</a></small>

