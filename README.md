# lambda-serverless-template
Welcome to a crash course in building a Lambda function, and setting up a GitHub Action to push your code directly to AWS Lambda. You are welcome to use this repo as a template for future serverless projects.
## Setup
1. Fork this repository, and then clone it into your local environment.
2. In terminal, run `npm install`.
3. If you are here for the UtahJS meetup you can stop here. The rest of the README is what we will be covering in the code along.

## AWS Lambda
1. Login into AWS and make sure you have the Oregon region selected. (US-WEST-2)
2. Go to Search -> Type in Lambda and select it from the list of Services that appear.
3. on the Function Creation Screen select `Author from scratch` if it's not already selected by default.
4. Enter a `Function Name` of your choice. Write it down, we are going to need it later.
5. For Runtime, select `Node.js` option from the `Latest Supported` section of the dropdown menu. For purposes of the code along we will be using Node for our Lambda function, however you can change the `deploy-to-lambda` GitHub Action to support any of the programming languages supported by Lambda that you want to use.
6. For Architecture, select `arm64` - I recommend using arm for your Lambda functions unless their is a specific reason that you need x86_64. If you ever use Lambdas at a production scale, arm costs less per Gb/s (the way AWS measures Lambda use and cost) than x86_64. We won't be leaving AWS free tier, but thats something good to know for future use.
7. For Execution role, select `Create a new role with basic Lambda permissions`. Make a note of the execution role name (it will be something like `functionName-role-lettersAnd1234`).
    **What exactly is the Execution Role for?** - The Execution role is what gives the Lambda permissions to talk to AWS Services. By default the role will come with basic permissions to upload logs to Amazon CloudWatch Logs. This will let Lambda output any stacktraces from its execution to CloudWatch where you can read them. If you want to do anything like uploading or grabbing images from an s3 bucket in your Lambda, you would add the permissions for it here.
8. In `Advanced Settings`, select the checkbox for `Enable function URL`. For Auth type, select `NONE` for purposes of the code along. Leave everything else default.
9. Click `Create function`
10. Go to Search -> Enter `IAM` and select it from the Service list. Welcome to Identity and Access Management!
11. Click on `Users` under Access management.
12. Click on `Create user`.
13. On the User details screen, enter a User name of your choice. We will be setting up this user to allow GitHub push your code directly to your Lambda function. Click `Next`.
14. On the next screen select `Attach policies directly` then click `Create policy`. This will open a new window where we will create a new custom policy to attach the rights for our user.
    - **Rights never get attached directly to users. Rights get attached to policies, and then policies can be attached to users or roles.**
15. In the new window, select the JSON Policy editor and paste in the following:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "lambda:UpdateFunctionCode"
            ],
            "Resource": "arn:aws:lambda:REGION:ACCOUNT_ID:function:FUNCTION_NAME"
        }
    ]
}

```
16. Replace the resource ARN above with the ARN of your Lambda function. You can find it by returning to your Lambda function's page on AWS. Search -> Lambda -> Select Lambda -> Select the function name from the list.
17. Save the policy. (Click next)
18. On the next screen give your policy a name. (I recommend `GitHub-Deploy-to-Lambda`)
19. Click `Create Policy`.
20. Return to the Create User window and click the refresh button on the policy list page.
21. Search your policy name on the policy list page and select it from the list. (Select the checkbox)
22. Click next. On the next window click `Create User`.
23. On the Users list page, refresh the list page and click on the link for your new user.
24. Under Summary, click on `Create access key`.
25. On the next screen, select `Other`, than click Next.
26. For description tag, enter `Github-key` and click next. 
27. Leaving this window open, visit your fork of this repository on Github, aand then select `Settings` for the repo. From the left side of the screen, select `Secrets and vairables` -> `Actions` under Security.
28. Add the following as Repository secrets from the window you left open on AWS:
    - AWS_ACCESS_KEY_ID: Paste in the Access Key from AWS
    - AWS_SECRET_ACCESS_KEY: Paste in the Secret Access Key from AWS
29. Go to `.github/workflows/deploy-to-lambda.yml` On line 34, change `functionNameHere` to the name of your function. In `index.mjs`, change the message returned to a message of your choice. Commit and push up both files to your fork.
30. Your repo should now be fully connected to push code to AWS Lambda. If it's properly configured you should see a green checkmark by your commit to main. 

## Contributors
- Ben Eccles @beneccles

