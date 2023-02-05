import { IAnswer } from "./Answer";

export interface IQuestion {
    /** Question ID */
    question_id: number;
    /** Question Title */
    title: string;
    /** The count of answers for this question */
    answer_count: number;
    /** Whether this question is answered */
    is_answered: boolean;
    /** If exists, indicates the question has an accepted answer */
    accepted_answer_id?: number;
    /** Question details in raw HTML markup */
    body: string;
    /** The answers array */
    answers?: IAnswer[];
}