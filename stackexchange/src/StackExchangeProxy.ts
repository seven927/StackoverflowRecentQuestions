import { IQuestion } from "./models/Question";

export interface IGetStackoverflowQuestionsParam
{
    startDate: Date;
    endDate: Date;
    page: number;
}

export interface IStackoverflowResponse
{
    has_more: boolean;
    items: IQuestion[];
    quota_max: number;
    quota_remaining: number;
    page: number;
}

/**
 * Search Stackoverflow questions. This will check the question creation date and sort the questions in descending order. 
 * A filter is put in place to only load data we need. Check IStackoverflowResponse to see what data is returned. 
 * @param {Object} param - Parameters object
 * @param {Date} param.startDate - Start date to search questions
 * @param {Date} param.endDate - End date to search questions
 * @param {number} options.page - page number used in the request
 * @returns {Object} - questions array
 */
export function GetStackOverflowQuestions(param: IGetStackoverflowQuestionsParam) {
    const { startDate, endDate, page } = param;
    let startDatePiece = Math.floor(startDate.getTime() / 1000);
    const endDatePiece = Math.floor(endDate.getTime() / 1000);
    if (startDatePiece === endDatePiece)
    {
        //Round start to the start of the day
        startDatePiece = startDatePiece - (startDatePiece % 86400);
    }
    const url = "https://api.stackexchange.com/2.3/questions?pagesize=50&order=desc&sort=creation&site=stackoverflow&filter=!-NHuCSHw)YEfhBHd*TSKbbh2K(ew(7159"
        + "&page=" + page + "&fromdate=" + startDatePiece + "&todate=" + endDatePiece;


    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("request failed");
            }
            return response.json();
        })
        .then((data: IStackoverflowResponse) => {
            return data;
        })
        .catch((err) => {
            console.log(err.message);
        });
}