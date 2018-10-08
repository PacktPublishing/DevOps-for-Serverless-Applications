pipeline {
    agent any

    triggers {
        pollSCM('*/5 * * * *')
    }

    stages {

        stage('Unit Tests') {
            steps {
                sh '''npm install;
                      ./node_modules/mocha/bin/mocha test/test.js
                      '''
            }
        }
        stage('Deploy to Dev') {
            environment {
                OW_AUTH = credentials('OPENWHISK_DEV_AUTH')
                OW_APIHOST = credentials('OW_APIHOST')
            }
                steps {
                   sh '''serverless deploy -v'''
                }
        }
        stage('Deploy to SIT') {
            environment {
                OW_AUTH = credentials('OPENWHISK_SIT_AUTH')
                OW_APIHOST = credentials('OW_APIHOST')
            }
                steps {
                   sh '''serverless deploy -v'''
                }
        }
        stage('Deploy to Pre-Prod') {
            environment {
                OW_AUTH = credentials('OPENWHISK_PRE_PROD_AUTH')
                OW_APIHOST = credentials('OW_APIHOST')
            }
                steps {
                   sh '''serverless deploy -v'''
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
            environment {
                OW_AUTH = credentials('OPENWHISK_PROD_AUTH')
                OW_APIHOST = credentials('OW_APIHOST')
            }
            steps {
               sh '''serverless deploy -v'''
            }
        }
    }
    post {
        failure {
            mail to: 'shzshi@gmail.com', subject: 'Build failed', body: 'Please fix!'
        }
    }
}
