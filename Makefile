site:
	rm -rf _site
	mkdir -p _site/examples
	cp -R web/* _site/
	for f in examples/*.html; do \
	    sed 's|../muboard.js|https://cdn.jsdelivr.net/npm/muboard@0.1.0|' "$$f" > \
	        _site/examples/"$$(basename "$$f")"; done
	cp muboard.html muboard.js muboard.min.js _site/
	cp muboard.html _site/index.html

live:
	git branch -D live || true
	git switch -f --orphan live
	mv _site/* .
	git config user.name "live"
	git config user.email "live@localhost"
	git add .
	git commit -m "Publish live ($$(date -u +"%Y-%m-%d %H:%M:%S"))"
	git log
	git push -f origin live

pushlive:
	cd /tmp && rm -rf muboard
	cd /tmp && git clone https://github.com/susam/muboard
	cd /tmp/muboard && npm install
	cd /tmp/muboard && npm test
	cd /tmp/muboard && npm run docs
	cd /tmp/muboard && make site live

