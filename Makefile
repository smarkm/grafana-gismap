build:
	yarn build
	yarn sign --rootUrls https://github.com/smarkm/grafana-gismap
dev:
	rm -rf dist/MANIFEST.txt
	yarn watch
update-release:
	git push -d origin vpre-0.0.3
	git tag -d vpre-0.0.3
	git add .github/*
	git commit -m "update"
	git push
	git tag v0.0.3
	git push --tag