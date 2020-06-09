import {Pannellum} from "../types/pannellum";

declare global {
	interface Window {
		pannellum: { viewer: (container: HTMLElement | string, initialConfig: any) => Pannellum.Viewer };
	}
}

class PTest {
	private viewer: Pannellum.Viewer;

	readonly config = {
		"type": "equirectangular",
		"panorama": "Ship.jpg",
		showZoomCtrl: false,
		keyboardZoom: false,
		showFullscreenCtrl: false,
		autoLoad: true,
		hotSpots: <Pannellum.HotSpot[]>[]

		/*
		"hotSpots": [
			{
				"pitch": 14.1,
				"yaw": 1.5,
				"cssClass": "custom-hotspot",
				"createTooltipFunc": hotspot,
				"createTooltipArgs": "Baltimore Museum of Art"
			},
			{
				"pitch": -9.4,
				"yaw": 222.6,
				"cssClass": "custom-hotspot",
				"createTooltipFunc": hotspot,
				"createTooltipArgs": "Art Museum Drive"
			},
			{
				"pitch": -0.9,
				"yaw": 144.4,
				"cssClass": "custom-hotspot",
				"createTooltipFunc": hotspot,
				"createTooltipArgs": "North Charles Street"
			}
		]*/
	};

	constructor() {
		const viewer = this.viewer = window.pannellum.viewer('container', this.config);
		viewer.addHotSpot({
			pitch: 20,
			yaw: -30,
			scale: true,
			cssClass: "custom-hotspot",
			createTooltipFunc: hotspot,
			createTooltipArgs: "Baltimore Museum of Art"
		});
	}
}

// Hot spot creation function

function hotspot(hotSpotDiv: HTMLDivElement, args: any) {
	const span = document.createElement('span');
	span.innerHTML = args;
	hotSpotDiv.appendChild(span);
	// span.style.width = span.scrollWidth - 20 + 'px';
	// span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
	// span.style.marginTop = -span.scrollHeight - 12 + 'px';
}

new PTest();
