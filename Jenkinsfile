#!/usr/bin/env groovy

import org.yaml.snakeyaml.Yaml
import hudson.model.*
import hudson.EnvVars
import groovy.json.JsonSlurperClassic
import groovy.json.JsonBuilder
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import java.net.URL
import java.text.SimpleDateFormat
node
{

  stage('Checkout SCM')
  {
         checkout scm
         cloneurl = sh(returnStdout: true, script: 'git config remote.origin.url').trim()
         cloneBranch = env.BRANCH_NAME
         gitCommitID = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
  }
  stage('Build Job')
  {
    build job: 'thanks_static_preprod', parameters: [string(name: 'urlToClone', value: cloneurl), string(name: 'branchToClone', value: cloneBranch), string(name: 'gitID', value: gitCommitID)]
  }
}
@NonCPS
List<List<?>> ParseYml(file)
    {
        def scripts = env.WORKSPACE + '/scripts'
        Yaml parser = new Yaml()
        def RootPath = env.WORKSPACE
        println RootPath
        List example = parser.load(("${RootPath}/${file}" as File).text)
        return example

}