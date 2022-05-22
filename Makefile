build:
	yarn build
	yarn sign --rootUrls https://github.com/smarkm/grafana-gismap
dev:
	rm -rf dist/MANIFEST.txt
	yarn watch
update-release:
	git tag v0.0.3
	git push --tag