@Library('porscheinformatik') _

def clarity_addons_styleguide

pipeline {
    agent { label 'docker' }
    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        skipStagesAfterUnstable()
    }

    stages {
        stage ('Build Docker') {
            steps {
                ansiColor('xterm') {
                    script {
                        clarity_addons_styleguide = docker.build("clr/clarity_addons_styleguide:latest", "--no-cache --build-arg=HTTP_PROXY=${HTTP_PROXY} --build-arg=HTTPS_PROXY=${HTTPS_PROXY} --build-arg=NO_PROXY=${NO_PROXY} .")
                    }
                }
            }
        }
        stage('Deployment') {
            steps {
                script {
                    if (params.GERRIT_EVENT_TYPE == null || params.GERRIT_EVENT_TYPE == 'change-merged') {
                        echo "Change merged, master build detected, will deploy image to docker registry and openshift."
                        docker.withRegistry('https://docker.porscheinformatik.com') {
                            clarity_addons_styleguide.push("latest")
                        }
                        /* inform openshift for new modelVersion */
                        withCredentials([string(credentialsId: 'OPENSHIFT_TOKEN_CLARITY_ADDONS', variable: 'OPENSHIFT_TOKEN_CLR_ADD')]) {
                            sh 'oc import-image clarity_addons_styleguide -n poi-clarity-addons-dev --server=https://manage.ocp.porscheinformatik.cloud:8443 --token=${OPENSHIFT_TOKEN_CLR_ADD}'
                            openshiftWaitForDeployment("${OPENSHIFT_TOKEN_CLR_ADD}", "poi-clarity-addons-dev", "clr-addons-styleguide")
                        }
                    } else {
                        echo "Verifier build, no image deploy."
                    }
                }
            }
        }
        stage('GitHub Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'GITHUB_CRED_CLARITY_ADDONS', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                    sh("git tag -a some_tag -m '" + params.GERRIT_CHANGE_COMMIT_MESSAGE + "'")
                    sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/porscheinformatik/clarity-addons.git --tags')
                }
            }
        }
    }
}
