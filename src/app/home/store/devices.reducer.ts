import { Action, createReducer, on } from '@ngrx/store';
import { KinectDevice } from '../devices-container/KinectDevice';
import { update } from './devices.action';

export const initialState: KinectDevice[] = [];

const reducer = createReducer<KinectDevice[], Action>(initialState,
    on(update, (state, { devices }) => devices)
);

export function devicesReducer(state: KinectDevice[] | undefined, action: Action) {
    return reducer(state, action);
}