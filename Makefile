.PHONY: install
install:
	(cd efreiflix-footer && yarn) & \
	(cd efreiflix-header && yarn) & \
	(cd efreiflix-item && yarn) & \
	(cd efreiflix-player && yarn) & \
	(cd efreiflix-shell && yarn) & \
	wait

.PHONY: start
start:
	(cd efreiflix-footer && yarn start) & \
	(cd efreiflix-header && yarn start) & \
	(cd efreiflix-item && yarn start) & \
	(cd efreiflix-player && yarn start) & \
	(cd efreiflix-shell && yarn start) & \
	wait
