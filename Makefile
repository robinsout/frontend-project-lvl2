publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	jest
test-coverage:
	jest --coverave