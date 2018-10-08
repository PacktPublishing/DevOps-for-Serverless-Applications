pipeline {
    agent any

    triggers {
        pollSCM('*/5 * * * *')
    }

    stages {

        stage('init'){

            sh '''
                npm install
                gcloud auth activate-service-account --key-file=${WORKSPACE}/My-Serverless-Project-1d8bacd4886d.json
            ''';
        }

        stage('Unit Tests') {
            steps {
                sh '''# executing unit test
                      ${WORKSPACE}/node_modules/.bin/ava test/unit.http.test.js
                '''
            }
        }

        stage('Deploy to DEV and Integration Test') {           
                steps {
                   sh '''
                    # executing integration test
                    gcloud config set project ${YOUR_GCP_DEV_PROJECT_ID}
                    export BASE_URL=http://localhost:8010/${YOUR_GCP_DEV_PROJECT_ID}/${YOUR_GCF_REGION}
                    ${WORKSPACE}/node_modules/.bin/functions start
                    ${WORKSPACE}/node_modules/.bin/functions deploy helloHttp --trigger-http
                    ${WORKSPACE}/node_modules/.bin/ava test/integration.http.test.js
                    '''
                }
        }
        stage('Deploy to SIT and System Test') {
                steps {
                   sh '''
                   # deploying to GCP project and executing system test
                   gcloud config set project ${YOUR_GCP_SIT_PROJECT_ID}
                   gcloud beta functions deploy helloHttp --trigger-http
                   export BASE_URL=https://${YOUR_GCF_REGION}-${YOUR_GCP_PROJECT_ID}.cloudfunctions.net/helloHttp
                   ${WORKSPACE}/node_modules/.bin/ava test/system.http.test.js
                   '''
                }
        }
        stage('Deploy to UAT') {
            steps {
                   sh '''
                   # deploying to GCP project and executing system test
                   gcloud config set project ${YOUR_GCP_UAT_PROJECT_ID}
                   gcloud beta functions deploy helloHttp --trigger-http
                   export BASE_URL=https://${YOUR_GCF_REGION}-${YOUR_GCP_UAT_PROJECT_ID}.cloudfunctions.net/helloHttp
                   ${WORKSPACE}/node_modules/.bin/ava test/system.http.test.js
                   '''
                }
        }
        stage('Promotion') {
            steps {
                timeout(time: 1, unit:'DAYS') {
                    input 'Deploy to Production?'
                }
            }
        }
        stage('Deploy to Production') {
            steps {
                   sh '''
                   # deploying to GCP project and executing system test
                   gcloud beta functions deploy helloHttp --trigger-http
                   gcloud config set project ${YOUR_GCP_PROD_PROJECT_ID}
                   export BASE_URL=https://${YOUR_GCF_REGION}-${YOUR_GCP_PROD_PROJECT_ID}.cloudfunctions.net/helloHttp
                   ${WORKSPACE}/node_modules/.bin/ava test/system.http.test.js
                   '''
                }
        }
    }
    post {
        failure {
            mail to: 'your_email@gmail.com', subject: 'Build failed', body: 'Please fix!'
        }
    }
}
