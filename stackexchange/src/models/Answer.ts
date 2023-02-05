export interface IAnswer {
    /** Answer ID */
    answer_id: number;
    /** Whether this answer is accepted */
    is_accepted: boolean;
    /** answer in raw HTML markup */
    body: string;
}