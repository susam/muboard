site:
	rm -rf _site
	mkdir -p _site/examples
	cp -R web/* _site/
	for f in examples/*.html; do \
	    sed 's|../muboard.js|https://cdn.jsdelivr.net/npm/muboard@0.4.0|' "$$f" > \
	        _site/examples/"$$(basename "$$f")"; done
	cp muboard.html muboard.js muboard.min.js _site/
	cp muboard.html _site/index.html

pushlive:
	git init
	git config user.name "live"
	git config user.email "live@localhost"
	git remote add origin https://github.com/susam/muboard.git
	git checkout -b live
	git add .
	git commit -m "Publish live ($$(date -u +"%Y-%m-%d %H:%M:%S"))"
	git log
	git push -f origin live

live: site
	rm -rf /tmp/live
	mv _site /tmp/live
	REPO_DIR="$$PWD"; cd /tmp/live && make -f "$$REPO_DIR/Makefile" pushlive
