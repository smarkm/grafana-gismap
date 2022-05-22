build:
	yarn build
	yarn sign --rootUrls https://github.com/smarkm/grafana-gismap
dev:
	rm -rf dist/MANIFEST.txt
	yarn watch
update-release:
	
	git add .github/*
	git commit -m "update"
	git push
	git tag v0.0.3
	git push --tag