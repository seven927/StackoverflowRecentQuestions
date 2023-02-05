import React, { useState } from 'react';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import { IQuestion } from '../models/Question';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { IAnswer } from '../models/Answer';
import AnswerComponent from './AnswerComponent';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

export interface IQuestionComponentProps
{
    /** Question object */
    question: IQuestion;
}

/**Questoin component
 * @param {Object} prop - Prop for Question component
 * @param {Object} prop.question - Question object for the current question component
 * @returns {JSX.Element} Question component
 */
function QuestionComponent(prop: IQuestionComponentProps) {

    const [expand, setExpand] = useState<boolean>(false);

    return (
        <Box className="question-box">
            <ListItemButton onClick={ ()=>setExpand(!expand)}>
                <ListItemText primary={prop.question.title} />
                { expand? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={expand}>
                <Divider>
                    <Chip label="Question Details:" />
                </Divider>
                <Box className="question-details block-center">
                    <div dangerouslySetInnerHTML={{ __html: prop.question.body }} />
                </Box>
                <Divider sx={{marginTop: 3}}>
                    <Chip label="Answers: (Select the one you think is accepted)" />
                </Divider>
                <List>{prop.question.answers?.map((answer: IAnswer) => <AnswerComponent key={answer.answer_id} answer={ answer }></AnswerComponent>)}</List>
            </Collapse>
        </Box>
    );
}

export default QuestionComponent;