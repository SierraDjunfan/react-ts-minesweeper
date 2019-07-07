
export function secondsToTimerFormat(seconds: number) {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds - minutes * 60
    const preMin = minutes < 10 ? "0" : ""
    const preSec = secs < 10 ? "0" : ""
    return preMin + minutes + ":" + preSec + secs
}
