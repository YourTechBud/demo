node {
    checkout scm

    docker.withRegistry('', 'docker-creds') {
      def customImage = docker.build("noorainp/myproject-backend:v1")
      customImage.push()
    }
    
              
    sh "wget 'https://storage.googleapis.com/space-cloud/linux/space-cli.zip'"
    sh "unzip space-cli.zip"
    sh "./space-cli login --username 'admin' --key '1234' --url 'http://157.245.232.6:31005'"
    sh "./space-cli apply service.yaml"
}