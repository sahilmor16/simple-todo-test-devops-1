pipeline {
    agent any

    environment {
        IMAGE = "sahilmor16/todo-app"
        EC2_PRIVATE_IP = credentials('EC2_PRIVATE_IP')
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
                sh 'docker build -t $IMAGE:$BUILD_NUMBER .'
                sh 'docker tag $IMAGE:$BUILD_NUMBER $IMAGE:latest'
            }
        }


        stage('Push to Docker Hub') {
            steps {
            withDockerRegistry(url: 'https://index.docker.io/v1/', credentialsId: 'dockerhub-creds') {
                sh 'docker push $IMAGE:$BUILD_NUMBER'
                sh 'docker push $IMAGE:latest'
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
