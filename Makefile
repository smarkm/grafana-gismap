build:
	yarn build
	yarn sign --rootUrls https://github.com/smarkm/grafana-gismap
dev:
	rm -rf dist/MANIFEST.txt
	yarn watch
update-release:
	git push -d origin v0.0.3
	git tag -d v0.0.3
	git tag v0.0.3
	git push --tag