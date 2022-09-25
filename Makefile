install-npm:
	npm ci || npm install

install-yarn:
	yarn install --frozen-lockfile || yarn install

rm-rf-dist:
	rm -rf dist

pretty:
	npx prettier --write src

lint:
	npx eslint --fix "src/**"

pre-commit: pretty lint

build-prod: rm-rf-dist pretty lint
	npx tsc && vite build

build-dev: rm-rf-dist pretty lint
	npx vite build --mode development

preview:
	npx vite preview

start:
	npx vite --host 0.0.0.0 --port 4000
