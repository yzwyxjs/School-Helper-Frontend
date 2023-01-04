import {Score} from "@/interfaces/Score";

export interface ScoreSum {
    term: string
    gotScore: number
    failNum: number
    year: string
    gpa: number
    scoreList: Score[]
}