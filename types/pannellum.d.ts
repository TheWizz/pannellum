/*
 * From https://pannellum.org/documentation/reference/
 */

export namespace Pannellum {

	interface HotSpot {
		pitch: number;		// Degrees, 0 straight ahead, positive move hotspot up
		yaw: number;		// Degrees, 0 straight ahead, positive move hotspot right
		type?: 'scene' | 'info';
		id?: string;
		scale?:boolean;		// Hotspot is scaled to match changes in the field of view
		text?: string;
		attributes?: object;
		targetPitch?:number;
		targetYaw?:number;
		targetHfov?:number;
		sceneId?: string;	// Scene ID to link to if type is 'scene'
		URL?: string;		// Optional URL to link to if type is 'info'
		cssClass?: string;
		createTooltipFunc?: (wrapper: HTMLDivElement, createTooltipArgs: any) => void;
		createTooltipArgs?: any;	// Passed to createTooltipFunc
		clickHandlerFunc?: (event: MouseEvent) => void;
		clickHandlerArgs?: any;	// Passed to clickHandlerFunc
	}

	interface Scene {
		type?: 'equirectangular' | 'cubemap' | 'multires';	// Default is equirectangular
		hfov: number;
		pitch: number;
		yaw: number;
		type: string;
		panorama: string;
		hotSpots: HotSpot[];
	}

	interface Config {
		autoLoad: boolean;
		compass: boolean;
		default: {
			firstScene: string;
			sceneFadeDuration: number;
		};
		scenes: {
			[sceneId: string]: Scene;
		};
	}

	interface SceneInfo {
		id: string;
		hfov: number;
		pitch: number;
		yaw: number;
		panorama: string;
		hotSpots: HotSpot[];
	}

	interface Renderer {
		constructor(container: HTMLElement);
		destroy(): void;	// Destructor
		init(
			_image: any,
			_imageType: 'equirectangular' | 'cubemap' | 'multires',
			_dynamic: boolean,	// Video (or other dynamic content)
			haov: number, vaov: number, voffset: number,
			callback: Function, params: object
		);
		resize();
		setPose(horizonPitch: number, horizonRoll: number);
		render(pitch: number, yaw: number, hfov: number, params?: {roll?:number, returnImage?:boolean});
		isLoading(): boolean;
		getCanvas(): HTMLCanvasElement;
	}

	interface Viewer {
		constructor(container: HTMLElement | string, initialConfig: any);
		destroy(): void;	// Destructor
		isLoaded(): boolean;
		getPitch(): number;
		setPitch(pitch: number, animated: boolean|number, callback?: Function, callbackArgs?: object): this;
		getPitchBounds(): number[];	// 2 elem, min and max pitch
		setPitchBounds(bounds: number[]): this;
		getYaw(): number;
		setYaw(pitch: number, animated: boolean|number, callback?: Function, callbackArgs?: object);
		getPitchBounds(): number[];	// 2 elem, min and max pitch
		setYawBounds(bounds: number[]);
		getHfov(): number
		setHfov(hfov: number, animated: boolean|number, callback?: Function, callbackArgs?: object): number
		getHfovBounds(): number[];	// 2 elem, min and max pitch
		setHfovBounds(bounds: number[]): this;
		lookAt(pitch: number, yaw: number, hfov: number, animated: boolean|number, callback?: Function, callbackArgs?: object): this;
		startAutoRotate(speed?: number, pitch?: number): this;
		stopAutoRotate(): this;
		stopMovement(): this;
		getRenderer(): Renderer;
		mouseEventToCoords(event: MouseEvent): number[]; 	// Two elements: Pitch, Yaw
		addHotSpot(config: HotSpot, sceneId?: string): this;
		removeHotSpot(hotSpotId: string, sceneId?: string);
		resize();	// Call after resizing container
	}
}

export type PannellumMaker = { viewer: (container: HTMLElement | string, initialConfig: any) => Pannellum.Viewer };

declare global {
	interface Window {
		pannellum: PannellumMaker;
	}
}
