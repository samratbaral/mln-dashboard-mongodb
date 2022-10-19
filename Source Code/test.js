
const test = require('ava')

test('Test #1', t => {
	t.pass();
});

test('Test #2', async t => {
	const bar = Promise.resolve('bar');
	t.is(await bar, 'bar');
});

