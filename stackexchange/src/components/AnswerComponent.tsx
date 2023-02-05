import React, { useState } from 'react';
import { IAnswer } from '../models/Answer';
import Card from '@mui/material/Card';
import { Alert, CardContent } from '@mui/material';

export interface IAnswerComponentProps
{
    /** Answer object */
    answer: IAnswer;
}

/**Answer component
 * @param {Object} prop - Prop for Answer component
 * @param {Object} prop.answer - Answer object for the current answer component
 * @returns {JSX.Element} Answer component
 */
function AnswerComponent(prop: IAnswerComponentProps) {

    const [showResut, setShowResult] = useState<boolean>(false);

    const answerClickedHandler = () => setShowResult(true);
    const mouseLeftHandler = () => setShowResult(false);

    return (
        <Card sx={{ width: 4 / 5, marginTop: 5, marginLeft: 'auto', marginRight: 'auto', ':hover': { boxShadow: 20 } }}
            variant="outlined" onClick={answerClickedHandler} onMouseLeave={mouseLeftHandler}>
            <CardContent>
                {showResut ? <Alert severity={prop.answer.is_accepted ? "success" : "error"}>
                    {prop.answer.is_accepted ? "This is accepted answer." : "This is not accepted answer!"}</Alert> : null}
                <div dangerouslySetInnerHTML={{ __html: prop.answer.body }} />
            </CardContent>
        </Card>
    );
}

export default AnswerComponent;