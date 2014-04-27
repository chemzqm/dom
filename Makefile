
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

watch:
	@component build --dev -w

test:
	@component test phantom

test-browser:
	@component test browser

clean:
	rm -fr build components template.js

.PHONY: clean test
