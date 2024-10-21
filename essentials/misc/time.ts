export const fiveSecondsMs = 5000;
export const tenSecondsMs = 10000;
export const fifteenSecondsMs = 15000;
export const twentySecondsMs = 20000;
export const twentyFiveSecondsMs = 25000;
export const thirtySecondsMs = 30000;
export const sixtySecondsMs = 60000;
export const oneMinuteMs = 60000;
export const fiveMinutesMs = 60000 * 5;
export const tenMinutesMs = 60000 * 10;
export const thirtyMinutesMs = 60000 * 30;
export const sixtyMinutesMs = 60000 * 60;
export const oneHourMs = 60000 * 60;
export const fiveHoursMs = 60000 * 60 * 5;
export const tenHoursMs = 60000 * 60 * 10;
export const oneHundredHoursMs = 60000 * 60 * 100;
export const aBloodyLongTimeMs = 600000 * 60 * 100;

export const daysInMs = (days: number) => hoursInMs(days * 24);

export const minutesInSeconds = (mins: number) => mins * 60;

export const minutesInMs = (mins: number) => minutesInSeconds(mins) * 1000;

export const hoursInSeconds = (hours: number) => hours * minutesInSeconds(60);

export const hoursInMs = (hours: number) => hoursInSeconds(hours) * 1000;

export const secondsInMs = (seconds: number) => seconds * 1000;

export const utcToMs = (utc: number) => utc * 1000;

export const secondsToHours = (seconds: number) => seconds / 3600;
