pipeline {
    agent any

    environment {
        IMAGE_NAME = "sahilmor16/todo-app"
        
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/sahilmor16/simple-todo-test-devops-1.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:latest .'
                sh 'docker tag $IMAGE_NAME:$IMAGE_TAG $IMAGE_NAME:latest'

            }
        }

        stage('Push to Docker Hub') {
            steps {
            withDockerRegistry(url: 'https://index.docker.io/v1/', credentialsId: 'dockerhub-creds') {
                sh 'docker push $IMAGE_NAME:$BUILD_NUMBER'
                sh 'docker push $IMAGE_NAME:latest'
                }
            }
        }


        stage('Deploy using Ansible') {
            steps {
                sh 'ansible-playbook -i ansible/inventory.ini ansible/deploy.yml'
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD Pipeline Executed Successfully"
        }
        failure {
            echo "❌ Pipeline Failed"
        }
    }
}
