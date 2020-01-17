import { Constants } from './Constants';

export const calculateWidthToPercent = (overallWidth, mouseX, barWidth, type) => {
    let percent = 0.00;
    switch (type) {
        case Constants.MOVE_TYPE.LEFT:
            percent = (mouseX) / (overallWidth);
            break;
        case Constants.MOVE_TYPE.RIGHT:
            percent = (mouseX - barWidth) / (overallWidth);
            break;
        case Constants.MOVE_TYPE.CENTER:
            percent = (mouseX - barWidth * 0.5) / (overallWidth);
            break;
        default:
            if (percent < 0.00) {
                percent = 0.00;
            } else if (percent > 1.00) {
                percent = 1.00;
            }
            break;
    }

    return percent;
}

export const calculateTime = (seconds) => {
    let date = new Date(seconds * 1000);
    let hh = date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours();
    let mm = date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes();
    let ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let ms = date.getMilliseconds();
    
    return hh + ":" + mm + ":" + ss + "." + ms;
}