class KinectDevice {
    constructor(
        public serialNum: string,
        public isOpened: boolean,
        public historyVideoPath: string = ''
    ){}
}
export { KinectDevice };