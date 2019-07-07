import { secondsToTimerFormat } from "./secondsToTimerFormat";

export function formattedDate(date: Date) {
    const day = date.getDate()
    const month = date.getMonth()
    const preDay = day < 10 ? "0" : ""
    const preMonth = (month + 1) < 10 ? "0" : ""
    return preDay + day + "/" + preMonth + (month + 1)
}

export function formattedScore(score: number) {
    return secondsToTimerFormat(score)
}