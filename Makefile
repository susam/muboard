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
	pwd | grep live$$ || false
	git init
	git config user.name susam
	git config user.email susam@susam.in
	# Prepare live branch.
	git checkout -b live
	git add .
	git commit -m "Publish live ($$(date -u +"%Y-%m-%d %H:%M:%S"))"
	git log
	# Publish main website to https://muboard.net/.
	git remote add origin https://github.com/susam/muboard.git
	git push -f origin live
	# Publish mirror to https://muboard.github.io/.
	git rm CNAME
	git commit -m "Remove CNAME file from mirror"
	git remote add mirror https://github.com/muboard/muboard.github.io.git
	git push -f mirror live

live: site
	rm -rf /tmp/live
	mv _site /tmp/live
	REPO_DIR="$$PWD"; cd /tmp/live && make -f "$$REPO_DIR/Makefile" pushlive
