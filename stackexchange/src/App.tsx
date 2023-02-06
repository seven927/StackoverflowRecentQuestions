import React, { useState } from 'react';
import './App.css';
import { IQuestion } from './models/Question';
import Textfield from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import QuestionComponent from './components/QuestionComponent';
import { GetStackOverflowQuestions, IGetStackoverflowQuestionsParam } from './StackExchangeProxy';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function App() {
    const [endDate] = useState<Date>(new Date());
    const [daysInPast, setDaysInPast] = useState<number>(0);
    const [emptyField, setEmptyField] = useState<boolean>(false);
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadFailed, setLoadFailed] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMoreQuestions, setHasMoreQuestions] = useState<boolean>(false);

    const getStartDate = () =>
    {
        var startDate = new Date(endDate);
        startDate.setTime(startDate.getTime() - daysInPast * 24 * 3600 * 1000);
        return startDate;
    }

    const loadQuestions = async (initialLoad: boolean)=>
    {
        setIsLoading(true);
        const startDate = getStartDate();

        const params: IGetStackoverflowQuestionsParam = { startDate: startDate, endDate: endDate, page: initialLoad? 1: page };
        const response = await GetStackOverflowQuestions(params);
        if (response)
        {
            const questions = response.items.filter((question) => question.accepted_answer_id && question.answers && question.answers.length > 1);
            if (response.has_more) {
                setPage(response.page + 1);
                setHasMoreQuestions(true);
            }
            else {
                setHasMoreQuestions(false);
            }
            if (initialLoad) {
                setQuestions(questions);
            }
            else
            {
                setQuestions((prevQuestions) => {
                    return [...prevQuestions, ...questions];
                });
            }
        }
        else
        {
            setLoadFailed(true);
        }
        setIsLoading(false);
    }

    const fieldChangeHandler = (event: React.ChangeEvent<HTMLInputElement>)=>
    {
        if (event.target.value === "") {
            setEmptyField(true);
        }
        else {
            setEmptyField(false);
            setDaysInPast(parseInt(event.target.value));
        }
    }

    const closeFailedRequestAlertHandler = (_event?: React.SyntheticEvent | Event, reason?: string) =>
    {
        //Keep toast until timeout or end users close it
        if (reason === "clickaway")
        {
            return;
        }
        setLoadFailed(false);
    }

    return (
        <div className="App">
            <h1>Recent Stackoverflow Questions</h1>
            <Divider sx={{ marginBottom: 3 }}>Criteria</Divider>
            <Box className="input-box">
                <Textfield label="Days in the past" variant="filled" defaultValue={0} error={emptyField} required onChange={fieldChangeHandler} disabled={isLoading} />
                <Button sx={{ marginLeft: 5 }} variant="contained" disabled={emptyField||isLoading} onClick={()=>loadQuestions(true)}>Get questions</Button>
            </Box>
            {questions.length > 0 ? <Divider sx={{ marginTop: 5 }}> Question List</Divider> : null}
            <List component="div">{questions.map((question) => <QuestionComponent key={question.question_id} question={question} />)}</List>
            {hasMoreQuestions ? <Button sx={{ marginTop: 5 }} variant="contained" onClick={() => loadQuestions(false)} disabled={isLoading}>More questions...</Button> : null}
            <Snackbar open={loadFailed} autoHideDuration={3000} onClose={closeFailedRequestAlertHandler }>
                <Alert onClose={closeFailedRequestAlertHandler} severity="error">Fail to load questions!</Alert>
            </Snackbar>
        </div>
    );
}


export default App;
