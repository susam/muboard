site:
	rm -rf _site/ && mkdir -p _site/examples/
	git -C _site/ clone -b 1.2.0 --depth 1 https://github.com/susam/texme.git
	git -C _site/ clone -b v4.0.12 --depth 1 https://github.com/markedjs/marked.git
	git -C _site/ clone -b 3.2.0 --depth 1 https://github.com/mathjax/mathjax.git
	rm -rf _site/texme/.git
	rm -rf _site/marked/.git/
	rm -rf _site/mathjax/.git/
	cp web/* _site/
	cp muboard.js _site/
	for f in examples/*.html; do \
	    sed -e 's|\.\./muboard.js|muboard.js|' \
	        -e 's|<script|<script src="options.js"></script><script|' \
	        "$$f" > _site/"$${f#*/}"; done
	sed 's|<script>window.*</script>|<script src="options.js"></script>|' \
	    muboard.html > _site/index.html

pushlive:
	pwd | grep live$$ || false
	git init
	git config user.name live
	git config user.email live@localhost
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
