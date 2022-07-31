import { createAction, props } from '@ngrx/store';
import { KinectDevice } from '../devices-container/KinectDevice';

export const update = createAction("[Devices] Update", props<{ devices: KinectDevice[] }>());