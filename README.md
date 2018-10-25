# Arctiq Weather App - utilized in an OpenShift Pipeline
Simple Node.js Command Line Weather Application

* Built upon bmorielli25's [weather-app](https://github.com/bmorelli25/simple-nodejs-weather-app)

This repo was used to build an app and promote across different OpenShift clusters in this [demo](https://www.arctiq.ca/our-blog/2018/10/6/multi-cloud-application-container-deployment-pipeline/)

### Pre-requisites

* [Skopeo Jenkins slave image for image promotion] (https://github.com/redhat-cop/containers-quickstarts/tree/master/jenkins-slaves/jenkins-slave-image-mgmt)
* 3 OpenShift clusters:
    * DEV/QA Cluster
    * PROD A Cluster
    * PROD B Cluster
* Replace cluster URLs in <your-openshift-console> snippets.

### How to run:

`oc create -f jenkins/pipeline.yaml`

### Run the pipeline and see the weather!

![gif](https://github.com/arctiqteam/weather-app/blob/master/giphy.gif?raw=true 'website gif')