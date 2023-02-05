# StackoverflowRecentQuestions
A simple web page to display recent questions that have more than 1 answers and an accepted answer. 

## Install
1. Make sure you have [Node.js](https://nodejs.org/en/) installed. 
2. (Optional) [Visual Stuido 2022 Community](https://visualstudio.microsoft.com/vs/community/). You can run the web page locally from Visual Studio.
3. Clone the respository to local and navigate to folder StackoverflowRecentQuestions/stackexchange and run install command. 

```
npm install
```

You might see 6 high severity vulnerbilities but you can ignore them for now. 

## Build
If you have Visual Studio installed, you can click the .sln file to open the project and then build and run from Visual Studio. If you don't want to use Viusal Studio, you can open command line in the project folder (StackoverflowRecentQuestions/stackexchange), run the following command, the development server will be started. 

```
npm start
```

![image](https://user-images.githubusercontent.com/7350037/216846199-e054961b-85c6-4d3a-af90-9fa54e29b1d9.png)


## Test

1. Navigate to htpp://localhost:3000 and you will see the web page. Enter a number in the Days in the past field and click GET QUESTIONS. You will see something like the following. We will only search questions that have a creation date lies between now and now minus the number of days in the past. We will only load 50 questions at a time, and only questions with accepted answer and more than one answers will be displayed. These questions are displayed in descending order. 

![Main](https://user-images.githubusercontent.com/7350037/216846767-89d240e8-2bbd-4dab-9057-a531c171f97f.png)

2. Click MORE QUESTIONS at the bottom to load next chunk of questions. 

3. Expand one question and you will see questions details (highlighted in light blue) and answers (displayed in card).

![Question details](https://user-images.githubusercontent.com/7350037/216846495-6a0d578b-184f-4a00-a569-2bb02829d46f.png)

4. Hover over the answer card and select the answer that you thinkg is the accepted one. 

![Answer](https://user-images.githubusercontent.com/7350037/216846904-0fd02671-8b6b-49b7-84e9-c48c35c1a74e.png)


