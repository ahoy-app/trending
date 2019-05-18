.PHONY: init

init:
	yarn

run: rabbit mongo start

dev: rabbit mongo test

demo: docker.clean rabbit mongo
	yarn initDb

pre-commit: prettify lint test.ci
	# This is not executed by hooks.
	# Just helps developer to automate clean, lint and test

start:
	yarn start

test:
	yarn test

test.ci:
	yarn test:ci

prettify:
	yarn prettify

lint:
	yarn lint
