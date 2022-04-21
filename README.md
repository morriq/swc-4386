# test-case

pnpm i
pnpm build
pnpm serve

in console error should appear:

> (index):1 Uncaught ReferenceError: application is not defined

type window.a and you'll see content which should appear in window.application

Downgrade swc/core to 168 and repeat to see it works as it should.
