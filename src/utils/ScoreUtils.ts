import {Score} from "@/interfaces/Score";
import {ArrayUtils} from "@/utils/ArrayUtils";
import {ScoreSum} from "@/interfaces/ScoreSum";

export class ScoreUtils {
    public static getScoreSum(scoreList: Score[]): ScoreSum[] {
        const temp = ArrayUtils.groupBy(scoreList, (item: Score) => {
            return item.term
        })
        let result: ScoreSum[] = []
        let ownKeys = Reflect.ownKeys(temp);
        for (let i = 0; i < ownKeys.length; i++) {
            let scores = Reflect.get(temp, ownKeys[i]) as Score[];
            let mulSum = 0
            let scoreSum = 0
            let failed = 0
            let subjectNum = 0
            for (let j = 0; j < scores.length; j++) {
                if (scores[j].grade < 60) {
                    failed++
                } else {
                    let mul = scores[j].grade * scores[j].score;
                    mulSum += mul
                    scoreSum += scores[j].score
                }
            }
            let gpa = mulSum/(10*scoreSum);
            let term = ownKeys[i]
            let termData = {
                term: term,
                scoreList: scores,
                failNum: failed,
                gotScore: scoreSum,
                gpa: gpa
            } as ScoreSum
            result.push(termData)
        }
        return result
    }
}